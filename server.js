require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { GridFSBucket } = require('mongodb');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const sharp = require('sharp');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net", "https://unpkg.com", "https://accounts.google.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "blob:", "https:", "https://res.cloudinary.com", "https://i.postimg.cc"],
            connectSrc: ["'self'", "https://accounts.google.com", "https://generativelanguage.googleapis.com", "https://api.groq.com"],
            frameSrc: ["'self'", "https://accounts.google.com"],
            mediaSrc: ["'self'"],
            scriptSrcAttr: ["'unsafe-inline'"]
        }
    },
    crossOriginEmbedderPolicy: false
}));
app.set('trust proxy', 1);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(mongoSanitize());

app.use(session({
    secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio', ttl: 86400 }),
    cookie: { secure: false, httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' }
}));

app.use(passport.initialize());
app.use(passport.session());
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200, // per IP across all routes
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please slow down.' }
});
app.use('/api/', globalLimiter);
const contactLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 1,
    keyGenerator: (req) => req.ip,
    message: { error: 'You can only send one message per day. Please try again later.' }
});

const chatLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 15, // generous, since real users type multiple messages
    keyGenerator: (req) => req.ip,
    message: { reply: 'Slow down a bit — please wait before sending more messages.' }
});

const downloadLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    keyGenerator: (req) => req.ip,
    message: { error: 'Too many download requests. Please wait a moment.' }
});
const authLimiter = rateLimit({ windowMs: 900000, max: 10, message: { error: 'Too many attempts' } });

const adminSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    verifiedAt: Date,
    lastLogin: Date,
    createdAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminSchema);

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: String,
    icon: { type: String, default: 'folder' },
    color: { type: String, default: '#c9a668' },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});
const Category = mongoose.model('Category', categorySchema);

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    shareableLink: { type: String, unique: true, sparse: true },
    description: { type: String, required: true },
    longDescription: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    status: { type: String, enum: ['planning', 'in-progress', 'completed', 'on-hold', 'live', 'disabled'], default: 'planning' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    techStack: [String],
    liveUrl: String,
    githubUrl: String,
    thumbnail: String,
    images: [String],
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    viewHistory: [{ ip: String, timestamp: { type: Date, default: Date.now } }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
projectSchema.pre('save', function(next) {
    if (!this.slug) this.slug = this.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') + '-' + crypto.randomBytes(4).toString('hex');
    if (!this.shareableLink) this.shareableLink = crypto.randomBytes(8).toString('hex');
    this.updatedAt = new Date();
    next();
});
const Project = mongoose.model('Project', projectSchema);

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    shareableLink: { type: String, unique: true, sparse: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    type: { type: String, enum: ['pdf', 'link', 'note', 'image', 'video', 'document'], default: 'note' },
    storage: { type: String, enum: ['mongo', 'cloudinary', 'external-link'], default: 'external-link' },
    fileId: mongoose.Schema.Types.ObjectId,
    fileUrl: String,
    fileName: String,
    fileSize: Number,
    downloadable: { type: Boolean, default: true },
    subject: String,
    grade: String,
    examType: { type: String, enum: ['notes', 'test-paper', 'exam-paper', 'practice', 'resource'], default: 'notes' },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    viewHistory: [{ ip: String, timestamp: { type: Date, default: Date.now } }],
    downloads: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
materialSchema.index({ title: 'text', description: 'text', subject: 'text' });
materialSchema.pre('save', function(next) {
    if (!this.slug) this.slug = this.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') + '-' + crypto.randomBytes(4).toString('hex');
    if (!this.shareableLink) this.shareableLink = crypto.randomBytes(8).toString('hex');
    this.updatedAt = new Date();
    next();
});
const Material = mongoose.model('Material', materialSchema);

const messageSchema = new mongoose.Schema({
    name: String, email: String, subject: String, message: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

const downloadLogSchema = new mongoose.Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
    ip: String, userAgent: String,
    timestamp: { type: Date, default: Date.now }
});
const DownloadLog = mongoose.model('DownloadLog', downloadLogSchema);

let gfs;
mongoose.connection.once('open', () => {
    gfs = new GridFSBucket(mongoose.connection.db, { bucketName: 'materials' });
    
    mongoose.connection.db.collection('materials.chunks').createIndex({ files_id: 1, n: 1 }).catch(() => {});
    
    console.log('GridFS ready');
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio')
    .then(() => console.log('MongoDB connected'))
    .catch(err => { console.error('MongoDB failed:', err.message); process.exit(1); });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        if (email !== process.env.ADMIN_EMAIL) return done(null, false, { message: 'Unauthorized' });
        let admin = await Admin.findOne({ googleId: profile.id });
        if (!admin) {
            admin = await Admin.findOne({ email });
            if (admin) admin.googleId = profile.id;
            else admin = new Admin({ googleId: profile.id, email });
        }
        admin.lastLogin = new Date();
        await admin.save();
        return done(null, admin);
    } catch (err) { return done(err); }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try { const user = await Admin.findById(id); done(null, user); } catch (err) { done(err); }
});

app.use(express.static(path.join(__dirname, 'public')));
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads', { recursive: true });

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'];
        cb(null, allowed.includes(file.mimetype));
    }
});

function requireAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    if (req.headers['accept']?.includes('json') || req.xhr) return res.status(401).json({ error: 'Auth required' });
    res.redirect('/login');
}

function requireVerified(req, res, next) {
    if (req.session?.isVerified) return next();
    if (req.headers['accept']?.includes('json') || req.xhr) return res.status(401).json({ error: 'Verification required' });
    res.redirect('/admin-verify');
}

async function sendTelegramNotification(name, email, subject, message) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) return;
    
    const text = `📬 *New Message from CODE & CLASSROOM*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📝 *Subject:* ${subject || 'N/A'}\n💬 *Message:* ${message}\n📅 *Date:* ${new Date().toLocaleString()}`;
    
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown'
            })
        });
    } catch (err) {
        console.error('Telegram notification failed:', err.message);
    }
}

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login?error=1' }), (req, res) => res.redirect('/admin-verify'));
app.post('/auth/verify', authLimiter, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
    const valid = await bcrypt.compare(req.body.password, process.env.ADMIN_PASSWORD_HASH || '');
    if (!valid) return res.status(401).json({ error: 'Invalid password' });
    req.session.isVerified = true;
    await Admin.findByIdAndUpdate(req.user._id, { verifiedAt: new Date() });
    res.json({ success: true });
});
app.get('/auth/status', (req, res) => res.json({ authenticated: !!req.isAuthenticated(), verified: !!req.session?.isVerified }));
app.get('/auth/logout', (req, res) => { req.session.destroy(() => req.logout(() => res.redirect('/login'))); });

app.get('/api/categories', async (req, res) => {
    try {
        const query = { isActive: true };
        if (req.query.all) delete query.isActive;
        if (req.query.parent) query.parent = req.query.parent === 'null' ? null : req.query.parent;
        else if (!req.query.all) query.parent = null;
        const cats = await Category.find(query).populate('parent', 'name slug').sort({ order: 1, name: 1 });
        res.json(cats);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/categories/tree', async (req, res) => {
    try {
        const all = await Category.find({ isActive: true }).sort({ order: 1, name: 1 }).lean();
        const build = (parentId = null) => all.filter(c => String(c.parent || null) === String(parentId)).map(c => ({ ...c, children: build(c._id) }));
        res.json(build());
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/categories/:slug', async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).lean();
        if (!category) return res.status(404).json({ error: 'Not found' });
        const [children, contentCount] = await Promise.all([
            Category.find({ parent: category._id, isActive: true }).sort({ order: 1 }).lean(),
            Material.countDocuments({ category: category._id })
        ]);
        res.json({ ...category, children, contentCount });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/projects', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const query = {};
        if (req.query.status) query.status = req.query.status;
        if (req.query.featured) query.isFeatured = true;
        if (req.query.category) query.category = req.query.category;
        const [projects, total] = await Promise.all([
            Project.find(query).populate('category', 'name slug color').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
            Project.countDocuments(query)
        ]);
        res.json({ projects, total, page, pages: Math.ceil(total / limit) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/projects/:slug', async (req, res) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug }).populate('category', 'name slug color').lean();
        if (!project) return res.status(404).json({ error: 'Not found' });
        const visitorIP = req.ip || req.connection.remoteAddress;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const alreadyViewed = project.viewHistory?.find(v => v.ip === visitorIP && new Date(v.timestamp) >= today);
        if (!alreadyViewed) {
            await Project.findByIdAndUpdate(project._id, { $inc: { views: 1 }, $push: { viewHistory: { ip: visitorIP, timestamp: new Date() } } });
            project.views = (project.views || 0) + 1;
        }
        res.json(project);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/projects/share/:shareableLink', async (req, res) => {
    try {
        const project = await Project.findOne({ shareableLink: req.params.shareableLink }).populate('category', 'name slug color').lean();
        if (!project) return res.status(404).json({ error: 'Not found' });
        Project.findByIdAndUpdate(project._id, { $inc: { views: 1 } }).catch(() => {});
        res.json(project);
    } catch (err) { res.status(500).json({ error: err.message }); }
});



app.get('/api/materials', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const query = {};
        if (req.query.category) query.category = req.query.category;
        if (req.query.examType) query.examType = req.query.examType;
        if (req.query.subject) query.subject = { $regex: req.query.subject, $options: 'i' };
        if (req.query.grade) query.grade = req.query.grade;
        if (req.query.featured) query.isFeatured = true;
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { subject: { $regex: req.query.search, $options: 'i' } }
            ];
        }
        const [materials, total] = await Promise.all([
            Material.find(query).populate('category', 'name slug color').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
            Material.countDocuments(query)
        ]);
        res.json({ materials, total, page, pages: Math.ceil(total / limit) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/materials/:slug', async (req, res) => {
    try {
        const material = await Material.findOne({ slug: req.params.slug }).populate('category', 'name slug').lean();
        if (!material) return res.status(404).json({ error: 'Not found' });
        const visitorIP = req.ip || req.connection.remoteAddress;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const alreadyViewed = material.viewHistory?.find(v => v.ip === visitorIP && new Date(v.timestamp) >= today);
        if (!alreadyViewed) {
            await Material.findByIdAndUpdate(material._id, { $inc: { views: 1 }, $push: { viewHistory: { ip: visitorIP, timestamp: new Date() } } });
            material.views = (material.views || 0) + 1;
        }
        res.json(material);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/materials/share/:shareableLink', async (req, res) => {
    try {
        const material = await Material.findOne({ shareableLink: req.params.shareableLink }).populate('category', 'name slug').lean();
        if (!material) return res.status(404).json({ error: 'Not found' });
        Material.findByIdAndUpdate(material._id, { $inc: { views: 1 } }).catch(() => {});
        res.json(material);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/materials/id/:id/download', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ error: 'Not found' });
        
        if (material.storage === 'mongo' && material.fileId && gfs) {
            try {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="${material.fileName || 'download.pdf'}"`);
                const chunks = mongoose.connection.db.collection('materials.chunks');
                const cursor = chunks.find({ files_id: new mongoose.Types.ObjectId(material.fileId) }).sort({ n: 1 }).allowDiskUse();
                for await (const chunk of cursor) { res.write(chunk.data.buffer); }
                res.end();
                Material.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }).catch(() => {});
                DownloadLog.create({ material: material._id, ip: req.ip, userAgent: req.headers['user-agent'] }).catch(() => {});
                return;
            } catch (gridErr) {
                console.error('GridFS error:', gridErr.message);
            }
        }
        
        if (material.fileUrl) {
            Material.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }).catch(() => {});
            DownloadLog.create({ material: material._id, ip: req.ip, userAgent: req.headers['user-agent'] }).catch(() => {});
            
            try {
                const response = await fetch(material.fileUrl);
                if (!response.ok) throw new Error('Fetch failed');
                
                const contentType = response.headers.get('content-type') || 'application/pdf';
                res.setHeader('Content-Type', contentType);
                res.setHeader('Content-Disposition', `attachment; filename="${material.fileName || 'download.pdf'}"`);
                
                const buffer = await response.arrayBuffer();
                res.send(Buffer.from(buffer));
                return;
            } catch (fetchErr) {
                return res.redirect(material.fileUrl);
            }
        }
        
        return res.status(404).json({ error: 'No file' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/messages', contactLimiter, async (req, res) => {
    try {
        if (req.body.website) return res.status(200).json({ success: true });
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });
        
        if (name.length < 2 || name.length > 100) return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
        
        if (message.length < 10 || message.length > 5000) return res.status(400).json({ error: 'Message must be between 10 and 5000 characters.' });
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({ error: 'Please provide a valid email address.' });
        
        const disposableDomains = ['mailinator.com', 'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'yopmail.com', 'throwaway.email', 'temp-mail.org', 'sharklasers.com', 'trashmail.com', 'maildrop.cc'];
        const domain = email.split('@')[1]?.toLowerCase();
        if (disposableDomains.includes(domain)) return res.status(400).json({ error: 'Disposable email addresses are not allowed. Please use a real email.' });
        
        const linkCount = (message.match(/https?:\/\//gi) || []).length;
        if (linkCount > 3) return res.status(400).json({ error: 'Too many links in message.' });
        
        const recentDuplicate = await Message.findOne({
            email: email.toLowerCase(),
            message: message,
            createdAt: { $gte: new Date(Date.now() - 3600000) }
        });
        if (recentDuplicate) return res.status(200).json({ success: true, message: 'Message sent!' });
        
        await Message.create({ name: name.trim(), email: email.toLowerCase().trim(), subject: subject?.trim() || '', message: message.trim() });
        
        sendTelegramNotification(name, email, subject, message);
        
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/admin/categories', requireAuth, requireVerified, async (req, res) => {
    try {
        const { name, description, icon, color, parent, order } = req.body;
        if (!name || name.trim().length === 0) return res.status(400).json({ error: 'Category name is required' });
        const slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        const existing = await Category.findOne({ slug });
        if (existing) return res.status(400).json({ error: `Category "${name}" already exists` });
        const cat = new Category({ name: name.trim(), slug, description: description || '', icon: icon || 'folder', color: color || '#c9a668', parent: parent || null, order: order || 0 });
        await cat.save();
        res.status(201).json(cat);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/admin/categories/:id', requireAuth, requireVerified, async (req, res) => {
    try { res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/admin/categories/:id', requireAuth, requireVerified, async (req, res) => {
    try { await Category.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post('/api/admin/projects', requireAuth, requireVerified, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
    try {
        const data = { ...req.body };
        if (!data.title || !data.description) return res.status(400).json({ error: 'Title and description are required' });
        if (typeof data.techStack === 'string') data.techStack = data.techStack.split(',').map(t => t.trim()).filter(Boolean);
        if (typeof data.progress === 'string') data.progress = parseInt(data.progress) || 0;
        if (req.files?.thumbnail?.[0]) {
            const result = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { folder: 'portfolio/projects' });
            data.thumbnail = result.secure_url;
            fs.unlink(req.files.thumbnail[0].path, () => {});
        }
        if (req.files?.images?.length) {
            const uploads = await Promise.all(req.files.images.map(f => cloudinary.uploader.upload(f.path, { folder: 'portfolio/projects' })));
            data.images = uploads.map(u => u.secure_url);
            req.files.images.forEach(f => fs.unlink(f.path, () => {}));
        }
        const project = new Project(data);
        await project.save();
        res.status(201).json(await Project.findById(project._id).populate('category', 'name slug'));
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/admin/projects/:id', requireAuth, requireVerified, upload.fields([{ name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
    try {
        const data = { ...req.body };
        if (typeof data.techStack === 'string') data.techStack = data.techStack.split(',').map(t => t.trim()).filter(Boolean);
        if (req.files?.thumbnail?.[0]) {
            const result = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { folder: 'portfolio/projects' });
            data.thumbnail = result.secure_url;
            fs.unlink(req.files.thumbnail[0].path, () => {});
        }
        res.json(await Project.findByIdAndUpdate(req.params.id, data, { new: true }).populate('category', 'name slug'));
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/admin/projects/:id', requireAuth, requireVerified, async (req, res) => {
    try { await Project.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(400).json({ error: err.message }); }
});

const LOGO_PATH = path.join(__dirname, 'public', 'assets', 'watermark-logo.png');
let logoBufferCache = null;
let watermarkMarkCache = null; // final logo+halo composite, cached

// Step 1: strip the black background from your source logo
async function getLogoBuffer() {
    if (logoBufferCache) return logoBufferCache;
    const raw = sharp(LOGO_PATH).ensureAlpha();
    const { data, info } = await raw.raw().toBuffer({ resolveWithObject: true });
    const channels = info.channels;
    const bgThreshold = 25;
    for (let i = 0; i < data.length; i += channels) {
        if (data[i] < bgThreshold && data[i + 1] < bgThreshold && data[i + 2] < bgThreshold) {
            data[i + 3] = 0;
        }
    }
    logoBufferCache = await sharp(data, { raw: { width: info.width, height: info.height, channels } }).png().toBuffer();
    return logoBufferCache;
}

// Step 2: build a dark halo behind the logo shape (gives contrast on white/light backgrounds)
async function createHalo(baseLogoBuffer, blurAmount = 10) {
    const { data, info } = await sharp(baseLogoBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const silhouette = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i += channels) {
        silhouette[i] = 0; silhouette[i + 1] = 0; silhouette[i + 2] = 0;
        silhouette[i + 3] = data[i + 3]; // keep the shape, force color to black
    }
    return sharp(silhouette, { raw: { width, height, channels } }).blur(blurAmount).png().toBuffer();
}

// Reduces alpha of a PNG buffer by a factor (0-1)
async function fadeLogo(buffer, opacityFactor) {
    const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
    const channels = info.channels;
    for (let i = 3; i < data.length; i += channels) {
        data[i] = Math.round(data[i] * opacityFactor);
    }
    return sharp(data, { raw: { width: info.width, height: info.height, channels } }).png().toBuffer();
}

// Step 3: bake halo + logo into ONE flattened mark, used everywhere (images AND pdf)
async function getWatermarkMark() {
    if (watermarkMarkCache) return watermarkMarkCache;
    const baseLogo = await getLogoBuffer();
    const logoMeta = await sharp(baseLogo).metadata();

    // pad canvas so the blurred halo isn't clipped at the edges
    const pad = 40;
    const canvasW = logoMeta.width + pad * 2;
    const canvasH = logoMeta.height + pad * 2;

    const halo = await createHalo(baseLogo, 12);
    const fadedHalo = await fadeLogo(halo, 0.6); // dark, semi-opaque halo for contrast

    watermarkMarkCache = await sharp({
        create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
    })
        .composite([
            { input: fadedHalo, top: pad, left: pad },
            { input: baseLogo, top: pad, left: pad }
        ])
        .png()
        .toBuffer();

    return watermarkMarkCache;
}

async function addPDFWatermark(inputPath, outputPath) {
    try {
        if (!fs.existsSync(inputPath)) return inputPath;

        const existingPdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const markBuffer = await getWatermarkMark();
        const markPng = await sharp(markBuffer).png().toBuffer();
        const embeddedMark = await pdfDoc.embedPng(markPng);
        const markAspect = embeddedMark.width / embeddedMark.height;

        for (const page of pages) {
            const { width, height } = page.getSize();

            // 1. Diagonal repeated tile — anti-crop
            const tileW = Math.min(width, height) * 0.22;
            const tileH = tileW / markAspect;
            for (let x = -tileW; x < width + tileW; x += tileW * 1.5) {
                for (let y = -tileH; y < height + tileH; y += tileH * 1.7) {
                    page.drawImage(embeddedMark, {
                        x, y, width: tileW, height: tileH,
                        opacity: 0.14,
                        rotate: { type: 'degrees', angle: -30 }
                    });
                }
            }

            // 2. Big centered logo mark
            const centerW = Math.min(width, height) * 0.5;
            const centerH = centerW / markAspect;
            page.drawImage(embeddedMark, {
                x: (width - centerW) / 2,
                y: (height - centerH) / 2,
                width: centerW,
                height: centerH,
                opacity: 0.24
            });

            // 3. Corner mark — bottom right, sharp and legible
            const cornerW = Math.min(width, height) * 0.13;
            const cornerH = cornerW / markAspect;
            page.drawImage(embeddedMark, {
                x: width - cornerW - 18,
                y: 18,
                width: cornerW,
                height: cornerH,
                opacity: 0.7
            });
        }

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, pdfBytes);
        return outputPath;
    } catch (err) {
        console.error('PDF watermark error:', err.message);
        return inputPath;
    }
}


async function addImageWatermark(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        const { width, height } = metadata;
        const mark = await getWatermarkMark();
        const markMeta = await sharp(mark).metadata();
        const markAspect = markMeta.width / markMeta.height;

        const composites = [];

        // 1. Repeated diagonal tile (anti-crop) — bigger and clearer than before
        const tileW = Math.round(Math.min(width, height) * 0.32);
        const tileH = Math.round(tileW / markAspect);
        const tileMark = await sharp(mark)
            .resize(tileW, tileH, { fit: 'fill' })
            .rotate(-30, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toBuffer();
        const fadedTile = await fadeLogo(tileMark, 0.16);
        const tileMeta = await sharp(fadedTile).metadata();
        const spacingX = tileMeta.width * 1.5;
        const spacingY = tileMeta.height * 1.7;
        for (let y = -tileMeta.height; y < height + tileMeta.height; y += spacingY) {
            for (let x = -tileMeta.width; x < width + tileMeta.width; x += spacingX) {
                composites.push({ input: fadedTile, top: Math.round(y), left: Math.round(x) });
            }
        }

        // 2. Big centered mark — the main watermark, clearly visible
        const centerW = Math.round(Math.min(width, height) * 0.55);
        const centerH = Math.round(centerW / markAspect);
        const centerMark = await sharp(mark).resize(centerW, centerH, { fit: 'fill' }).toBuffer();
        const fadedCenter = await fadeLogo(centerMark, 0.32);
        const centerMeta = await sharp(fadedCenter).metadata();
        composites.push({
            input: fadedCenter,
            top: Math.round((height - centerMeta.height) / 2),
            left: Math.round((width - centerMeta.width) / 2)
        });

        // 3. Corner mark — sharper, clearly ownership-branded
        const cornerW = Math.round(Math.min(width, height) * 0.2);
        const cornerH = Math.round(cornerW / markAspect);
        const cornerMark = await sharp(mark).resize(cornerW, cornerH, { fit: 'fill' }).toBuffer();
        const fadedCorner = await fadeLogo(cornerMark, 0.75);
        const cornerMeta = await sharp(fadedCorner).metadata();
        composites.push({
            input: fadedCorner,
            top: height - cornerMeta.height - 20,
            left: width - cornerMeta.width - 20
        });

        await image.composite(composites).toFile(outputPath);
        return outputPath;
    } catch (err) {
        console.error('Image watermark error:', err.message);
        return inputPath;
    }
}


app.post('/api/admin/materials', requireAuth, requireVerified, upload.single('file'), async (req, res) => {
    try {
        const data = { ...req.body, downloadable: req.body.downloadable !== 'false' };
        const addWatermark = req.body.addWatermark === 'true' || req.body.addWatermark === true;
        
        if (req.file) {
            const file = req.file;
            let finalPath = file.path;
            
            if (addWatermark) {
                const watermarkedPath = file.path + '_watermarked';
                
                if (file.mimetype === 'application/pdf') {
                    finalPath = await addPDFWatermark(file.path, watermarkedPath + '.pdf');
                } else if (file.mimetype.startsWith('image/')) {
                    finalPath = await addImageWatermark(file.path, watermarkedPath + '.png');
                }
            }
            
            if (file.mimetype === 'application/pdf' && gfs) {
                const stream = gfs.openUploadStream(file.originalname, { contentType: file.mimetype });
                fs.createReadStream(finalPath).pipe(stream);
                await new Promise((resolve, reject) => { stream.on('finish', resolve); stream.on('error', reject); });
                data.storage = 'mongo'; data.fileId = stream.id; data.fileName = file.originalname; data.fileSize = fs.statSync(finalPath).size; data.type = 'pdf';
            } else if (file.mimetype.startsWith('image/')) {
                const result = await cloudinary.uploader.upload(finalPath, { folder: 'portfolio/materials' });
                data.storage = 'cloudinary'; data.fileUrl = result.secure_url; data.fileName = file.originalname; data.fileSize = fs.statSync(finalPath).size; data.type = 'image';
            } else {
                const result = await cloudinary.uploader.upload(finalPath, { folder: 'portfolio/materials', resource_type: 'auto' });
                data.storage = 'cloudinary'; data.fileUrl = result.secure_url; data.fileName = file.originalname; data.fileSize = fs.statSync(finalPath).size;
            }
            
            fs.unlink(file.path, () => {});
            if (finalPath !== file.path) fs.unlink(finalPath, () => {});
            
        } else if (req.body.externalLink) {
            data.storage = 'external-link'; data.fileUrl = req.body.externalLink; data.type = 'link';
        }
        
        const material = new Material(data);
        await material.save();
        res.status(201).json(await Material.findById(material._id).populate('category', 'name slug'));
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/admin/materials/:id', requireAuth, requireVerified, upload.single('file'), async (req, res) => {
    try {
        const updates = { ...req.body, updatedAt: new Date() };
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'portfolio/materials',
                resource_type: req.file.mimetype === 'application/pdf' ? 'raw' : 'auto'
            });
            updates.storage = 'cloudinary';
            updates.fileUrl = result.secure_url;
            updates.fileName = req.file.originalname;
            updates.fileSize = req.file.size;
            updates.type = req.file.mimetype === 'application/pdf' ? 'pdf' : 'image';
            fs.unlink(req.file.path, () => {});
        }
        
        if (updates.externalLink) {
            updates.storage = 'external-link';
            updates.fileUrl = updates.externalLink;
            updates.type = 'link';
        }
        
        const material = await Material.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        ).populate('category', 'name slug');
        
        if (!material) return res.status(404).json({ error: 'Not found' });
        
        res.json(material);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/admin/materials/:id', requireAuth, requireVerified, async (req, res) => {
    try { await Material.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(400).json({ error: err.message }); }
});

app.get('/api/admin/stats', requireAuth, requireVerified, async (req, res) => {
    try {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const [materials, categories, projects, downloads, views, messages, recentMaterials, recentDownloads] = await Promise.all([
            Material.countDocuments(), Category.countDocuments(), Project.countDocuments(),
            Material.aggregate([{ $group: { _id: null, total: { $sum: '$downloads' } } }]),
            Material.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
            Message.countDocuments({ isRead: false }),
            Material.find().sort({ createdAt: -1 }).limit(5).populate('category', 'name').lean(),
            DownloadLog.find().sort({ timestamp: -1 }).limit(20).populate('material', 'title').lean()
        ]);
        res.json({ materials, categories, projects, downloads: downloads[0]?.total || 0, views: views[0]?.total || 0, unreadMessages: messages, recentMaterials, recentDownloads });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/messages', requireAuth, requireVerified, async (req, res) => {
    try { res.json(await Message.find().sort({ createdAt: -1 }).limit(50).lean()); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/messages/:id/read', requireAuth, requireVerified, async (req, res) => {
    try { res.json(await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/stats', async (req, res) => {
    try {
        const [materials, categories, projects, downloads] = await Promise.all([
            Material.countDocuments(), Category.countDocuments({ isActive: true }), Project.countDocuments({ status: { $ne: 'disabled' } }),
            Material.aggregate([{ $group: { _id: null, total: { $sum: '$downloads' } } }])
        ]);
        res.json({ materials, categories, projects, downloads: downloads[0]?.total || 0 });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

const chatTimers = new Map();
const SPAM_THRESHOLD = 5;
const SPAM_WINDOW = 10000;
const TIMEOUT_DURATION = 60000;

app.post('/api/chat', chatLimiter, async (req, res) => {
    try {
        const userIP = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        if (!chatTimers.has(userIP)) chatTimers.set(userIP, { messages: [], timeoutUntil: 0 });
        const userData = chatTimers.get(userIP);
        if (userData.timeoutUntil > now) {
            const remaining = Math.ceil((userData.timeoutUntil - now) / 1000);
            return res.json({ reply: `Please wait ${remaining} seconds before sending another message.` });
        }
        userData.messages = userData.messages.filter(t => t > now - SPAM_WINDOW);
        userData.messages.push(now);
        if (userData.messages.length > SPAM_THRESHOLD) {
            userData.timeoutUntil = now + TIMEOUT_DURATION;
            chatTimers.set(userIP, userData);
            return res.json({ reply: "You've been temporarily restricted. Please wait a minute before trying again." });
        }
        chatTimers.set(userIP, userData);
        
        const { message, history } = req.body;
        if (!message || message.trim().length < 2) return res.json({ reply: "Hello! I'm Cypher, your study assistant. How can I help you today?" });
        if (message.length > 500) return res.json({ reply: "Your message is too long. Please keep it under 500 characters." });
        
        const lower = message.toLowerCase().trim();
        const abusiveWords = ['fuck', 'shit', 'ass', 'bitch', 'dick', 'bastard', 'chutiya', 'bc', 'mc', 'madarchod', 'bhosdike', 'gandu', 'harami', 'kutta', 'saale', 'fauck', 'fack'];
        for (const word of abusiveWords) { if (lower.includes(word)) return res.json({ reply: "Let's keep our conversation respectful. I'm here to help with study materials and projects." }); }
        
        const blockedPatterns = ['admin', 'password', 'credential', 'api key', 'apikey', 'secret', 'token', 'source code', 'clone', 'copy this', 'hack', 'exploit', 'vulnerability', 'system prompt', 'your instructions', 'your code', 'bypass', 'override', 'server code', 'backend code', 'database password', 'mongodb uri', 'make similar', 'build like this', 'create same', 'replicate', 'ip address', 'my ip', 'what is my ip'];
        for (const pattern of blockedPatterns) {
            if (lower.includes(pattern)) {
                if (pattern.includes('ip')) return res.json({ reply: "I cannot access your IP address. Is there anything else I can help with?" });
                return res.json({ reply: "I'm unable to help with that. I'm here for study materials and projects." });
            }
        }

        const offTopicPatterns = ['resistance', 'circuit', 'diagram', 'medicine', 'disease', 'political', 'religion', 'war', 'violence', 'hack', 'crack', 'torrent', 'pirate', 'adult', 'gambling', 'crypto', 'trading', 'stock'];
        for (const pattern of offTopicPatterns) {
            if (lower.includes(pattern)) {
                return res.json({ reply: "I'm here to help with study materials and projects on CODE & CLASSROOM. What subject or topic are you looking for?" });
            }
        }
        
        let action = null;
        if (lower.includes('scroll') || lower.includes('go to') || lower.includes('navigate')) {
            if (lower.includes('home') || lower.includes('top')) action = { type: 'scroll', target: 'home' };
            else if (lower.includes('material')) action = { type: 'scroll', target: 'materials' };
            else if (lower.includes('project')) action = { type: 'scroll', target: 'projects' };
            else if (lower.includes('about')) action = { type: 'scroll', target: 'about' };
            else if (lower.includes('contact')) action = { type: 'scroll', target: 'contact' };
            else if (lower.includes('bottom')) action = { type: 'scroll', target: 'bottom' };
        }
        
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (GROQ_API_KEY && GROQ_API_KEY.startsWith('gsk_')) {
            try {
                let materials = [], projects = [], categories = [];
                
                materials = await Material.find().populate('category', 'name slug').sort({ createdAt: -1 }).limit(6).lean();
                projects = await Project.find({ status: { $ne: 'disabled' } }).sort({ createdAt: -1 }).limit(4).lean();
                categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();
                
                if (lower.includes('find') || lower.includes('search') || lower.includes('looking') || lower.includes('show') || lower.includes('list') || lower.includes('give') || lower.includes('link') || lower.includes('share')) {
                    const terms = lower.replace(/find|search|looking for|need|want|show me|get me|do you have|i need|list|show|recent|latest|give|link|share/gi, '').trim();
                    if (terms.length > 1) {
                        const filtered = await Material.find({ $or: [{ title: { $regex: terms, $options: 'i' } }, { subject: { $regex: terms, $options: 'i' } }, { description: { $regex: terms, $options: 'i' } }, { grade: { $regex: terms, $options: 'i' } }] }).populate('category', 'name slug').limit(8).lean();
                        if (filtered.length) materials = filtered;
                    }
                }
                
                let dbContext = '';
                if (materials.length) dbContext += `\nMATERIALS:\n${materials.map(m => `- "${m.title}" | ${m.subject||'N/A'} | Grade ${m.grade||'N/A'} | Type: ${m.examType||m.type} | Open link: /materials?open=${m.slug} | Shareable link: /s/${m.shareableLink||m.slug}`).join('\n')}`;
                if (projects.length) dbContext += `\nPROJECTS:\n${projects.map(p => `- "${p.title}" | Status: ${p.status} | Progress: ${p.progress||0}% | Tech: ${(p.techStack||[]).join(', ')}`).join('\n')}`;
                if (categories.length) dbContext += `\nCATEGORIES:\n${categories.map(c => `- ${c.name}: ${c.description||''} | Link: /materials?category=${c.slug}`).join('\n')}`;
                if (history?.length) dbContext += `\nHISTORY:\n${history.slice(-6).map(h => `${h.role}: ${h.content}`).join('\n')}`;
                
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 10000);
                const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                    body: JSON.stringify({
                        model: 'llama-3.1-8b-instant',
                        messages: [{ role: 'user', content: `You are Cypher, a helpful AI assistant for CODE & CLASSROOM by Mayank Sagar. You have access to the real database below. Always use the database data when answering. If someone asks for materials, projects, or links, use the data provided. When listing materials, always include the shareable link as a clickable link using the format [material title](/s/xxx). Never say you don't have access to links or that you can't share links because you have the links right in the database. Never make up fake materials or claim you've sent something since you cannot send anything. Keep replies short, using 2 to 4 sentences. Use **bold**, *italic*, and [links](URL) formatting. Use only professional English with no Hindi. Share socials only when asked: Instagram [@sagar.mayank_](https://instagram.com/sagar.mayank_) and GitHub [cypherXsagar](https://github.com/cypherXsagar). Never share credentials or code.

${dbContext}

User: ${message}

Cypher:` }],
                        max_tokens: 400, temperature: 0.7
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeout);
                const data = await resp.json();
                if (data.choices?.[0]?.message?.content) {
                    let reply = data.choices[0].message.content.trim();
                    if (reply && reply.length > 5) {
                        if (!reply.match(/[.!?)]$/)) reply += '.';
                        const slangCheck = ['bhai', 'tera', 'badhiya', 'accha', 'yaar', 'arey', 'kya baat', 'bilkul', 'aur bhai', 'ji', 'app', 'mereko', 'skte'];
                        if (slangCheck.some(w => reply.toLowerCase().includes(w))) reply = "Hello! I'm Cypher. How can I help you with study materials or projects today?";
                        const result = { reply };
                        if (action) result.action = action;
                        return res.json(result);
                    }
                }
            } catch (e) {}
        }
        
        let reply = "Hello! I'm Cypher, your study assistant. How can I help you today?";
        if (lower.includes('instagram') || lower.includes('ig') || lower.includes('social')) reply = "📸 **Instagram**: [@sagar.mayank_](https://instagram.com/sagar.mayank_)\n💻 **GitHub**: [cypherXsagar](https://github.com/cypherXsagar)";
        else if (lower.includes('github')) reply = "**GitHub**: [cypherXsagar](https://github.com/cypherXsagar)";
        else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) reply = "Hello! I'm Cypher. What can I help you with today?";
        else if (lower.includes('who are you')) reply = "I'm **Cypher**, the AI study assistant for CODE & CLASSROOM.";
        else if (lower.includes('mayank') || lower.includes('owner')) reply = "**Mayank Sagar** created this portfolio.\n\n📸 [Instagram](https://instagram.com/sagar.mayank_)\n💻 [GitHub](https://github.com/cypherXsagar)";
        else if (lower.includes('contact')) reply = "Reach Mayank via **[Contact](/contact)** or [Instagram](https://instagram.com/sagar.mayank_)";
        else if (lower.includes('help') || lower.includes('what can you do') || lower.includes('available') || lower.includes('what do you have')) {
            try {
                const [mats, projs, cats] = await Promise.all([
                    Material.find().populate('category', 'name slug').sort({ createdAt: -1 }).limit(4).lean(),
                    Project.find({ status: { $ne: 'disabled' } }).sort({ createdAt: -1 }).limit(4).lean(),
                    Category.find({ isActive: true }).sort({ order: 1 }).lean()
                ]);
                reply = "Here's what's available:\n\n";
                if (mats.length) reply += `📚 **Recent Materials:**\n${mats.map(m => `• **${m.title}** ${m.subject ? `*(${m.subject})*` : ''}\n  [View →](/materials?open=${m.slug}) | [Share →](/s/${m.shareableLink||m.slug})`).join('\n')}\n\n`;
                if (projs.length) reply += `🚀 **Recent Projects:**\n${projs.map(p => `• **${p.title}** — *${(p.status||'planning').replace('-',' ')}*`).join('\n')}\n  [View all →](/projects)\n\n`;
                if (cats.length) reply += `📂 **Categories:** ${cats.map(c => `[${c.name}](/materials?category=${c.slug})`).join(' | ')}\n\nI can search for specific topics — just ask!`;
            } catch (e) { reply = "I can find materials, show projects, and navigate the site. Just ask!"; }
        } else if (lower.includes('find') || lower.includes('search') || lower.includes('looking') || lower.includes('show') || lower.includes('list') || lower.includes('recent') || lower.includes('latest') || lower.includes('give') || lower.includes('link') || lower.includes('share')) {
            const terms = lower.replace(/find|search|looking for|need|want|show me|get me|do you have|i need|list|show|recent|latest|give|link|share/gi, '').trim();
            try {
                let results = terms.length > 1 ? await Material.find({ $or: [{ title: { $regex: terms, $options: 'i' } }, { subject: { $regex: terms, $options: 'i' } }] }).populate('category', 'name slug').limit(8).lean() : await Material.find().populate('category', 'name slug').sort({ createdAt: -1 }).limit(6).lean();
                reply = results.length ? `📚 **Found:**\n\n${results.map(m => `• **${m.title}** ${m.subject ? `*(${m.subject})*` : ''}${m.grade ? ` - Grade ${m.grade}` : ''}\n  [View →](/materials?open=${m.slug}) | [Share →](/s/${m.shareableLink||m.slug})`).join('\n\n')}` : `Nothing found for *"${terms}"*. Try **[Materials](/materials)**.`;
            } catch (e) { reply = "Visit **[Materials](/materials)**."; }
        } else if (lower.includes('project') || lower.includes('built') || lower.includes('work')) {
            try {
                const projects = await Project.find({ status: { $ne: 'disabled' } }).sort({ createdAt: -1 }).limit(8).lean();
                reply = projects.length ? `🚀 **Projects:**\n\n${projects.map(p => `• **${p.title}** — *${(p.status||'planning').replace('-',' ')}*${p.progress ? ` (${p.progress}%)` : ''}`).join('\n\n')}\n\n**[View all →](/projects)**` : "Check **[Projects](/projects)**.";
            } catch (e) { reply = "Visit **[Projects](/projects)**."; }
        } else if (lower.includes('category') || lower.includes('categories') || lower.includes('subject')) {
            try {
                const cats = await Category.find({ isActive: true }).sort({ order: 1 }).lean();
                reply = cats.length ? `📂 **Categories:**\n\n${cats.map(c => `• **${c.name}**\n  [Browse →](/materials?category=${c.slug})`).join('\n\n')}` : "Browse **[Materials](/materials)**.";
            } catch (e) { reply = "Visit **[Materials](/materials)**."; }
        } else if (lower.includes('free') && (lower.includes('resource') || lower.includes('tool') || lower.includes('learn'))) reply = "**Free resources:**\n• [FreeCodeCamp](https://freecodecamp.org)\n• [MDN Docs](https://developer.mozilla.org)\n• [GitHub Student Pack](https://education.github.com/pack)\n• [W3Schools](https://w3schools.com)";
        else if (lower.includes('thanks') || lower.includes('thank')) reply = "You're welcome! Need anything else?";
        
        const result = { reply };
        if (action) result.action = action;
        res.json(result);
    } catch (err) { res.json({ reply: "I apologize, an error occurred. Please try again." }); }
});

app.get('/s/:shareId', async (req, res) => {
    try {
        let item = await Material.findOne({ $or: [{ shareableLink: req.params.shareId }, { slug: req.params.shareId }] }).lean();
        if (item) return res.redirect(`/materials?open=${item.slug}`);
        item = await Project.findOne({ $or: [{ shareableLink: req.params.shareId }, { slug: req.params.shareId }] }).lean();
        if (item) return res.redirect('/projects');
        res.redirect('/');
    } catch (err) { res.redirect('/'); }
});

app.get('/login', (req, res) => {
    if (req.isAuthenticated() && req.session?.isVerified) return res.redirect('/admin');
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', requireAuth, requireVerified, (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/admin-verify', requireAuth, (req, res) => {
    if (req.session?.isVerified) return res.redirect('/admin');
    res.sendFile(path.join(__dirname, 'public', 'admin-verify.html'));
});

app.get('/materials', (req, res) => res.sendFile(path.join(__dirname, 'public', 'materials.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
