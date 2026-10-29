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
            connectSrc: ["'self'", "https://accounts.google.com", "https://generativelanguage.googleapis.com", "https://api.groq.com", "blob:"],
            frameSrc: ["'self'", "https://accounts.google.com", "https://www.instagram.com"],
            formAction: ["'self'", "https://www.instagram.com"],
            mediaSrc: ["'self'", "blob:"],
            workerSrc: ["'self'", "blob:"],
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

app.use(session({ secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex'), resave: false, saveUninitialized: false, store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio', ttl: 86400 }), cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' } }));

app.use(passport.initialize());
app.use(passport.session());
const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many requests, please slow down.' } });
app.use('/api/', globalLimiter);
const contactLimiter = rateLimit({ windowMs: 24 * 60 * 60 * 1000, max: 1, keyGenerator: (req) => req.ip, message: { error: 'You can only send one message per day. Please try again later.' } });
const chatLimiter = rateLimit({ windowMs: 60 * 1000, max: 15, keyGenerator: (req) => req.ip, message: { reply: 'Slow down a bit — please wait before sending more messages.' } });
const authLimiter = rateLimit({ windowMs: 900000, max: 10, message: { error: 'Too many attempts' } });
const broadcastLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, keyGenerator: (req) => req.ip, message: { error: 'Too many broadcasts. Wait a minute.' } });
const visitLogLimiter = rateLimit({ windowMs: 60 * 1000, max: 20, keyGenerator: (req) => req.ip, message: { error: 'Too many requests.' } });
const adminLogsLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, keyGenerator: (req) => req.ip, message: { error: 'Too many requests.' } });

const adminSchema = new mongoose.Schema({ googleId: { type: String, unique: true, sparse: true }, email: { type: String, required: true, unique: true, lowercase: true }, verifiedAt: Date, lastLogin: Date, createdAt: { type: Date, default: Date.now } });
const Admin = mongoose.model('Admin', adminSchema);

const categorySchema = new mongoose.Schema({ name: { type: String, required: true }, slug: { type: String, required: true, unique: true, lowercase: true }, description: String, icon: { type: String, default: 'folder' }, color: { type: String, default: '#c9a668' }, parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }, order: { type: Number, default: 0 }, isActive: { type: Boolean, default: true }, createdAt: { type: Date, default: Date.now } });
const Category = mongoose.model('Category', categorySchema);

const projectSchema = new mongoose.Schema({ title: { type: String, required: true }, slug: { type: String, unique: true }, shareableLink: { type: String, unique: true, sparse: true }, description: { type: String, required: true }, longDescription: String, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, status: { type: String, enum: ['planning', 'in-progress', 'completed', 'on-hold', 'live', 'disabled'], default: 'planning' }, progress: { type: Number, min: 0, max: 100, default: 0 }, techStack: [String], liveUrl: String, githubUrl: String, thumbnail: String, images: [String], isFeatured: { type: Boolean, default: false }, views: { type: Number, default: 0 }, viewHistory: [{ ip: String, timestamp: { type: Date, default: Date.now } }], createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now } });
projectSchema.pre('save', function(next) { if (!this.slug) this.slug = this.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') + '-' + crypto.randomBytes(4).toString('hex'); if (!this.shareableLink) this.shareableLink = crypto.randomBytes(8).toString('hex'); if (!this.isNew) this.updatedAt = new Date(); next(); });
const Project = mongoose.model('Project', projectSchema);

function slugify(input) { return String(input || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''); }
function buildPdfName(title, examType) { const base = slugify(title || 'material'); const type = examType || 'notes'; return `${base}-${type}.pdf`; }

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    customPath: { type: String, unique: true, sparse: true, lowercase: true },
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
    if (!this.slug) this.slug = slugify(this.title) + '-' + crypto.randomBytes(4).toString('hex');
    if (!this.shareableLink) this.shareableLink = crypto.randomBytes(8).toString('hex');
    if (!this.customPath && this.title) this.customPath = slugify(this.title);
    if (!this.isNew) this.updatedAt = new Date();
    next();
});
const Material = mongoose.model('Material', materialSchema);

const messageSchema = new mongoose.Schema({ name: String, email: String, subject: String, message: String, isRead: { type: Boolean, default: false }, createdAt: { type: Date, default: Date.now } });
const Message = mongoose.model('Message', messageSchema);

const downloadLogSchema = new mongoose.Schema({ material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' }, ip: String, userAgent: String, timestamp: { type: Date, default: Date.now } });
const DownloadLog = mongoose.model('DownloadLog', downloadLogSchema);

const logSchema = new mongoose.Schema({
    type: { type: String, enum: ['visit', 'download', 'pdf_view', 'login', 'admin_action'], required: true },
    ipHash: { type: String, required: true },
    ipEnc: { type: String, required: true },
    ua: String,
    os: String,
    browser: String,
    device: String,
    lang: String,
    tz: String,
    screen: String,
    path: String,
    referrer: String,
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
    meta: mongoose.Schema.Types.Mixed,
    isLocalhost: { type: Boolean, default: false },
    dedupeKey: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    ttlAt: { type: Date, required: true }
});
logSchema.index({ ttlAt: 1 }, { expireAfterSeconds: 0 });
logSchema.index({ type: 1, createdAt: -1 });
logSchema.index({ isLocalhost: 1, createdAt: -1 });
const Log = mongoose.model('Log', logSchema);

const LOG_SALT = process.env.LOG_SALT || 'change-me-in-env-file-please-use-random';
const LOG_ENC_KEY = process.env.LOG_ENC_KEY && process.env.LOG_ENC_KEY.length === 64 ? Buffer.from(process.env.LOG_ENC_KEY, 'hex') : crypto.createHash('sha256').update(LOG_SALT + '::enc').digest();

function hashIP(ip) { return crypto.createHash('sha256').update(String(ip) + '::' + LOG_SALT).digest('hex'); }
function encryptIP(ip) {
    try {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', LOG_ENC_KEY, iv);
        const enc = Buffer.concat([cipher.update(String(ip), 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();
        return iv.toString('hex') + ':' + tag.toString('hex') + ':' + enc.toString('hex');
    } catch (e) { return ''; }
}
function decryptIP(payload) {
    try {
        if (!payload) return '';
        const [ivHex, tagHex, encHex] = String(payload).split(':');
        if (!ivHex || !tagHex || !encHex) return '';
        const decipher = crypto.createDecipheriv('aes-256-gcm', LOG_ENC_KEY, Buffer.from(ivHex, 'hex'));
        decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
        return Buffer.concat([decipher.update(Buffer.from(encHex, 'hex')), decipher.final()]).toString('utf8');
    } catch (e) { return ''; }
}
function parseUA(ua) {
    const s = String(ua || '');
    let os = 'Unknown';
    if (/Windows NT 10/.test(s)) os = 'Windows 10/11';
    else if (/Windows NT 6\.3/.test(s)) os = 'Windows 8.1';
    else if (/Windows NT 6\.1/.test(s)) os = 'Windows 7';
    else if (/Mac OS X/.test(s)) os = 'macOS';
    else if (/Android/.test(s)) { const m = s.match(/Android\s([\d.]+)/); os = 'Android' + (m ? ' ' + m[1] : ''); }
    else if (/iPhone|iPad|iPod/.test(s)) { const m = s.match(/OS\s([\d_]+)/); os = 'iOS' + (m ? ' ' + m[1].replace(/_/g, '.') : ''); }
    else if (/Linux/.test(s)) os = 'Linux';
    let browser = 'Unknown';
    if (/Edg\//.test(s)) browser = 'Edge';
    else if (/OPR\/|Opera/.test(s)) browser = 'Opera';
    else if (/Chrome\//.test(s) && !/Edg\//.test(s)) { const m = s.match(/Chrome\/([\d]+)/); browser = 'Chrome' + (m ? ' ' + m[1] : ''); }
    else if (/Firefox\//.test(s)) { const m = s.match(/Firefox\/([\d]+)/); browser = 'Firefox' + (m ? ' ' + m[1] : ''); }
    else if (/Safari\//.test(s) && !/Chrome/.test(s)) { const m = s.match(/Version\/([\d.]+)/); browser = 'Safari' + (m ? ' ' + m[1] : ''); }
    let device = 'Desktop';
    if (/iPad|Tablet/i.test(s)) device = 'Tablet';
    else if (/Mobile|iPhone|Android.*Mobile/i.test(s)) device = 'Mobile';
    return { os, browser, device };
}
function isLocalhostIP(ip) { const s = String(ip || ''); return s === '127.0.0.1' || s === '::1' || s === 'localhost' || s.startsWith('192.168.') || s.startsWith('10.') || s.startsWith('::ffff:127.') || s.startsWith('::ffff:192.168.'); }

async function writeLog(req, type, extra) {
    try {
        const ipRaw = (req.ip || req.connection.remoteAddress || '').replace(/^::ffff:/, '');
        if (!ipRaw) return;
        const ua = req.headers['user-agent'] || '';
        const parsed = parseUA(ua);
        const hourBucket = Math.floor(Date.now() / 3600000);
        const materialIdStr = extra && extra.materialId ? String(extra.materialId) : '';
        const dedupeKey = hashIP(ipRaw + '::' + type + '::' + materialIdStr + '::' + hourBucket);
        const ttlAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
        await Log.create({
            type,
            ipHash: hashIP(ipRaw),
            ipEnc: encryptIP(ipRaw),
            ua,
            os: parsed.os,
            browser: parsed.browser,
            device: parsed.device,
            lang: (extra && extra.lang) || '',
            tz: (extra && extra.tz) || '',
            screen: (extra && extra.screen) || '',
            path: (extra && extra.path) || '',
            referrer: (extra && extra.referrer) || '',
            materialId: materialIdStr && mongoose.isValidObjectId(materialIdStr) ? materialIdStr : undefined,
            meta: (extra && extra.meta) || {},
            isLocalhost: isLocalhostIP(ipRaw),
            dedupeKey,
            ttlAt
        });
    } catch (err) {
        if (err && err.code !== 11000) console.error('Log write failed:', err.message);
    }
}

let gfs;
mongoose.connection.once('open', () => {
    gfs = new GridFSBucket(mongoose.connection.db, { bucketName: 'materials' });
    mongoose.connection.db.collection('materials.chunks').createIndex({ files_id: 1, n: 1 }).catch(() => {});
    console.log('GridFS ready');
    Log.init().then(() => console.log('Log indexes ready')).catch(() => {});
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio')
    .then(() => console.log('MongoDB connected'))
    .catch(err => { console.error('MongoDB failed:', err.message); process.exit(1); });

passport.use(new GoogleStrategy({ clientID: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, callbackURL: '/auth/google/callback' }, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        if (email !== process.env.ADMIN_EMAIL) return done(null, false, { message: 'Unauthorized' });
        let admin = await Admin.findOne({ googleId: profile.id });
        if (!admin) { admin = await Admin.findOne({ email }); if (admin) admin.googleId = profile.id; else admin = new Admin({ googleId: profile.id, email }); }
        admin.lastLogin = new Date();
        await admin.save();
        return done(null, admin);
    } catch (err) { return done(err); }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => { try { const user = await Admin.findById(id); done(null, user); } catch (err) { done(err); } });

app.use(express.static(path.join(__dirname, 'public')));
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads', { recursive: true });

const upload = multer({ dest: 'uploads/', limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: (req, file, cb) => { const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip']; cb(null, allowed.includes(file.mimetype)); } });

function requireAuth(req, res, next) { if (req.isAuthenticated()) return next(); if (req.headers['accept']?.includes('json') || req.xhr) return res.status(401).json({ error: 'Auth required' }); res.redirect('/login'); }
function requireVerified(req, res, next) { if (req.session?.isVerified) return next(); if (req.headers['accept']?.includes('json') || req.xhr) return res.status(401).json({ error: 'Verification required' }); res.redirect('/admin-verify'); }

async function sendTelegramNotification(name, email, subject, message) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;
    const text = `📬 *New Message from CODE & CLASSROOM*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📝 *Subject:* ${subject || 'N/A'}\n💬 *Message:* ${message}\n📅 *Date:* ${new Date().toLocaleString()}`;
    try { await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' }) }); } catch (err) { console.error('Telegram notification failed:', err.message); }
}

async function sendTelegramChannel(text, previewUrl) {
    const botToken = process.env.TELEGRAM_CHANNEL_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHANNEL_CHAT_ID;
    if (!botToken || !chatId) return { ok: false, error: 'Channel bot not configured' };
    try {
        const body = { chat_id: chatId, text, parse_mode: 'Markdown' };
        if (!previewUrl) body.disable_web_page_preview = true;
        const r = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        return await r.json();
    } catch (err) { return { ok: false, error: err.message }; }
}

function mdEscape(s) { return String(s || '').replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1'); }

function buildMaterialBroadcast(mat) {
    const base = 'https://mayanksagar.onrender.com';
    const shareId = mat.shareableLink || mat.customPath || mat.slug;
    const link = `${base}/s/${shareId}`;
    const type = (mat.examType || mat.type || 'resource').replace('-', ' ');
    const cat = mat.category && mat.category.name ? mat.category.name : '';
    let msg = `📚 *New Material Added*\n\n`;
    msg += `*${mdEscape(mat.title)}*\n`;
    if (cat) msg += `📂 ${mdEscape(cat)}\n`;
    if (mat.subject) msg += `📖 ${mdEscape(mat.subject)}${mat.grade ? ' · Grade ' + mdEscape(mat.grade) : ''}\n`;
    msg += `🏷 ${mdEscape(type)}\n\n`;
    msg += `🔗 [Open Material](${link})\n\n`;
    msg += `_via CODE & CLASSROOM_`;
    return { text: msg, link };
}

function buildProjectBroadcast(project) {
    const base = 'https://mayanksagar.onrender.com';
    const link = `${base}/s/${project.shareableLink || project.slug}`;
    let msg = `🚀 *New Project Launched*\n\n`;
    msg += `*${mdEscape(project.title)}*\n`;
    msg += `📊 Status: ${mdEscape(project.status || 'planning')}\n`;
    if (project.techStack && project.techStack.length) msg += `🛠 ${mdEscape(project.techStack.slice(0, 5).join(', '))}\n`;
    msg += `\n${mdEscape((project.description || '').slice(0, 200))}\n\n`;
    if (project.liveUrl) msg += `🌐 [Live Demo](${project.liveUrl})\n`;
    if (project.githubUrl) msg += `💻 [Source Code](${project.githubUrl})\n`;
    msg += `\n🔗 [View Project](${link})\n\n`;
    msg += `_via CODE & CLASSROOM_`;
    return { text: msg, link };
}

app.post('/api/logs/visit', visitLogLimiter, async (req, res) => {
    try {
        const b = req.body || {};
        await writeLog(req, 'visit', { path: b.path || req.headers.referer || '/', referrer: b.referrer || '', lang: b.lang || '', tz: b.tz || '', screen: b.screen || '', meta: { platform: b.platform || '' } });
        res.json({ ok: true });
    } catch (e) { res.json({ ok: true }); }
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login?error=1' }), async (req, res) => { await writeLog(req, 'login', { path: '/auth/google/callback' }); res.redirect('/admin-verify'); });
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
    try { const all = await Category.find({ isActive: true }).sort({ order: 1, name: 1 }).lean(); const build = (parentId = null) => all.filter(c => String(c.parent || null) === String(parentId)).map(c => ({ ...c, children: build(c._id) })); res.json(build()); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/categories/:slug', async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).lean();
        if (!category) return res.status(404).json({ error: 'Not found' });
        const [children, contentCount] = await Promise.all([Category.find({ parent: category._id, isActive: true }).sort({ order: 1 }).lean(), Material.countDocuments({ category: category._id })]);
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
        if (req.query.category) { const cRaw = String(req.query.category); const cat = await Category.findOne({ $or: [{ slug: cRaw.toLowerCase() }, { _id: mongoose.isValidObjectId(cRaw) ? cRaw : null }] }).lean(); if (cat) query.category = cat._id; else return res.json({ projects: [], total: 0, page, pages: 0 }); }
        const [projects, total] = await Promise.all([Project.find(query).populate('category', 'name slug color').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Project.countDocuments(query)]);
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
        if (!alreadyViewed) { await Project.findByIdAndUpdate(project._id, { $inc: { views: 1 }, $push: { viewHistory: { ip: visitorIP, timestamp: new Date() } } }); project.views = (project.views || 0) + 1; }
        res.json(project);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/projects/share/:shareableLink', async (req, res) => {
    try { const project = await Project.findOne({ shareableLink: req.params.shareableLink }).populate('category', 'name slug color').lean(); if (!project) return res.status(404).json({ error: 'Not found' }); Project.findByIdAndUpdate(project._id, { $inc: { views: 1 } }).catch(() => {}); res.json(project); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/materials', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const query = {};
        if (req.query.category) { const cRaw = String(req.query.category); const cat = await Category.findOne({ $or: [{ slug: cRaw.toLowerCase() }, { _id: mongoose.isValidObjectId(cRaw) ? cRaw : null }] }).lean(); if (cat) query.category = cat._id; else return res.json({ materials: [], total: 0, page, pages: 0 }); }
        if (req.query.examType) query.examType = req.query.examType;
        if (req.query.subject) query.subject = { $regex: req.query.subject, $options: 'i' };
        if (req.query.grade) query.grade = req.query.grade;
        if (req.query.featured) query.isFeatured = true;
        if (req.query.search) { query.$or = [{ title: { $regex: req.query.search, $options: 'i' } }, { description: { $regex: req.query.search, $options: 'i' } }, { subject: { $regex: req.query.search, $options: 'i' } }]; }
        const [materials, total] = await Promise.all([Material.find(query).populate('category', 'name slug color').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Material.countDocuments(query)]);
        res.json({ materials, total, page, pages: Math.ceil(total / limit) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/materials/:slug', async (req, res) => {
    try {
        const material = await Material.findOne({ $or: [{ slug: req.params.slug }, { customPath: req.params.slug.toLowerCase() }, { shareableLink: req.params.slug }] }).populate('category', 'name slug').lean();
        if (!material) return res.status(404).json({ error: 'Not found' });
        const visitorIP = req.ip || req.connection.remoteAddress;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const alreadyViewed = material.viewHistory?.find(v => v.ip === visitorIP && new Date(v.timestamp) >= today);
        if (!alreadyViewed) { await Material.findByIdAndUpdate(material._id, { $inc: { views: 1 }, $push: { viewHistory: { ip: visitorIP, timestamp: new Date() } } }); material.views = (material.views || 0) + 1; }
        res.json(material);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/materials/share/:shareableLink', async (req, res) => {
    try { const material = await Material.findOne({ shareableLink: req.params.shareableLink }).populate('category', 'name slug').lean(); if (!material) return res.status(404).json({ error: 'Not found' }); Material.findByIdAndUpdate(material._id, { $inc: { views: 1 } }).catch(() => {}); res.json(material); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/materials/id/:id/view', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id).populate('category', 'name slug').lean();
        if (!material) return res.status(404).send('Not found');
        await writeLog(req, 'pdf_view', { materialId: material._id, path: '/api/materials/id/' + material._id + '/view' });
        const rawUrl = `/api/materials/id/${material._id}/raw`;
        const dlUrl = `/api/materials/id/${material._id}/download`;
        const title = htmlEscape(material.title || 'Study Material');
        const desc = htmlEscape((material.description || '').slice(0, 180));
        const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(req.headers['user-agent'] || '');
        const pdfjsUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs`;
        const pdfjsWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;
        const baseStyles = `:root{--bg:#0d0c0f;--bg-elevated:#141317;--bg-card:#1a191e;--text:#e8e4dd;--text-secondary:#8a8780;--text-dim:#5c5954;--accent:#c9a668;--border:rgba(255,255,255,0.06);--radius:12px;--radius-full:100px;--font-display:'Fraunces',Georgia,serif;--font-body:'Inter',sans-serif}*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg);color:var(--text);font-family:var(--font-body);min-height:100vh;display:flex;flex-direction:column}.topbar{position:fixed;top:0;left:0;right:0;z-index:10;background:rgba(13,12,15,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:14px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;transform:translateY(0);transition:transform .35s cubic-bezier(0.19,1,0.22,1),box-shadow .3s}.topbar.hidden{transform:translateY(-100%);box-shadow:none}.topbar.pinned{transform:translateY(0)!important}.hotzone{position:fixed;top:0;left:0;right:0;height:24px;z-index:11;pointer-events:auto}.back{color:var(--text-secondary);text-decoration:none;font-size:13px;display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:var(--radius-full);transition:all .2s;background:none;border:none;cursor:pointer;font-family:var(--font-body)}.back:hover{color:var(--accent);background:rgba(201,166,104,0.1)}.title{flex:1;min-width:200px;font-family:var(--font-display);font-size:16px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.btn{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border-radius:var(--radius-full);font-family:var(--font-body);font-size:12px;font-weight:600;text-decoration:none;transition:all .2s;cursor:pointer;border:none;letter-spacing:0.03em}.btn-primary{background:linear-gradient(135deg,#c9a668,#e8d5a3,#c9a668);color:#0d0c0f}.btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(201,166,104,0.3)}.btn-outline{background:transparent;border:1px solid var(--border);color:var(--text)}.btn-outline:hover{border-color:var(--accent);color:var(--accent)}.btn-sm{padding:7px 12px;font-size:11px}.pin-btn{padding:7px 10px!important}.pin-btn.active{color:var(--accent);border-color:var(--accent);background:rgba(201,166,104,0.1)}.frame-wrap{position:fixed;inset:0;background:#0a0a0c;z-index:1}.frame-wrap iframe{width:100%;height:100%;border:none;display:block}.loader{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:var(--bg);z-index:2;transition:opacity .4s}.loader.hidden{opacity:0;pointer-events:none}.spinner{width:48px;height:48px;border:3px solid rgba(201,166,104,0.15);border-top-color:var(--accent);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.loader-text{font-size:15px;color:var(--text-secondary);text-align:center;padding:0 20px}.loader-text strong{color:var(--accent);display:block;margin-bottom:6px;font-family:var(--font-display);font-size:18px;font-weight:400}.loader-sub{font-size:12px;color:var(--text-dim);margin-top:8px}.error{display:none;flex-direction:column;align-items:center;gap:16px;padding:40px 20px;text-align:center;color:var(--text-secondary);position:fixed;inset:0;background:var(--bg);z-index:2}.error i{font-size:40px;color:#ef4444}.error.show{display:flex}.hint{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:rgba(20,19,23,0.95);border:1px solid var(--border);color:var(--text-secondary);font-size:11px;padding:6px 14px;border-radius:20px;z-index:5;opacity:0;transition:opacity .3s;pointer-events:none;white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis}.hint.show{opacity:1}@media(max-width:600px){.title{font-size:14px;width:100%;order:3;flex-basis:100%}.topbar{padding:12px 14px}.btn{padding:8px 14px;font-size:11px}.hint{font-size:10px;padding:5px 12px}}`;
        const pdfjsStyles = `#pdfContainer{position:fixed;inset:0;top:0;overflow-y:auto;background:#232323;padding:56px 0 24px;-webkit-overflow-scrolling:touch}#pdfContainer canvas{display:block;margin:0 auto 12px;max-width:100%;height:auto;box-shadow:0 2px 12px rgba(0,0,0,0.4);background:#fff}#pdfContainer .pageNum{position:absolute;right:8px;bottom:8px;background:rgba(0,0,0,0.6);color:#fff;font-size:11px;padding:2px 8px;border-radius:10px;font-family:var(--font-body)}@media(max-width:600px){#pdfContainer{padding:52px 0 16px}#pdfContainer canvas{margin-bottom:6px}}`;
        const topbarHtml = `<div class="hotzone" id="hot"></div><div class="topbar" id="top"><a href="/materials" class="back"><i class="fas fa-arrow-left"></i> Back</a><div class="title">${title}</div><button class="btn btn-outline btn-sm pin-btn" id="pinBtn" title="Pin bar"><i class="fas fa-thumbtack"></i></button><a href="${dlUrl}" class="btn btn-primary"><i class="fas fa-download"></i> Download</a></div>`;
        const loaderHtml = `<div class="loader" id="ldr"><div class="spinner"></div><div class="loader-text"><strong>Loading your file…</strong>Please wait a moment</div><div class="loader-sub">Large files may take a few seconds</div></div><div class="error" id="err"><i class="fas fa-exclamation-triangle"></i><div><strong>Could not load preview</strong><div class="loader-sub">Your browser may not support inline PDFs. Please use the Download button above.</div></div></div><div class="hint" id="hint"></div>`;
        const sharedScript = `(function(){var top=document.getElementById('top'),hot=document.getElementById('hot'),pinBtn=document.getElementById('pinBtn'),hint=document.getElementById('hint'),ldr=document.getElementById('ldr'),err=document.getElementById('err');var pinned=false,hideTimer=null,hintTimer=null,done=false;function showBar(){top.classList.remove('hidden');}function hideBar(){if(pinned)return;top.classList.add('hidden');}function scheduleHide(){clearTimeout(hideTimer);hideTimer=setTimeout(hideBar,3000);}function showHint(msg){if(!msg)return;hint.textContent=msg;hint.classList.add('show');clearTimeout(hintTimer);hintTimer=setTimeout(function(){hint.classList.remove('show');},2600);}pinBtn.addEventListener('click',function(){pinned=!pinned;pinBtn.classList.toggle('active',pinned);top.classList.toggle('pinned',pinned);if(pinned){showBar();showHint('Bar fixed — tap pin again to unpin');}else{scheduleHide();showHint('Bar auto-hides — tap top to show again');}});hot.addEventListener('mouseenter',function(){showBar();clearTimeout(hideTimer);});hot.addEventListener('mousemove',function(){showBar();clearTimeout(hideTimer);});document.addEventListener('mousemove',function(e){if(e.clientY<60){showBar();clearTimeout(hideTimer);}});top.addEventListener('mouseenter',function(){clearTimeout(hideTimer);});top.addEventListener('mouseleave',function(){if(!pinned)scheduleHide();});document.addEventListener('touchstart',function(e){if(e.touches[0]&&e.touches[0].clientY<60){showBar();clearTimeout(hideTimer);scheduleHide();}},{passive:true});function hideLoader(){if(done)return;done=true;ldr.classList.add('hidden');showHint('Bar auto-hides — tap top to show again');scheduleHide();}window.hideLoader=hideLoader;window.showBar=showBar;window.scheduleHide=scheduleHide;window.showHint=showHint;window.addEventListener('keydown',function(e){if(e.key==='h'||e.key==='H'){if(pinned)return;if(top.classList.contains('hidden')){showBar();scheduleHide();}else{hideBar();}}});})();`;
        if (isMobile) {
            const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5.0,user-scalable=yes"><title>${title} — CODE & CLASSROOM</title><meta name="description" content="${desc}"><meta property="og:title" content="${title} — CODE & CLASSROOM"><meta property="og:description" content="${desc}"><meta property="og:type" content="article"><meta property="og:image" content="https://i.postimg.cc/90cpDgdd/cropped-circle-image.png"><link rel="icon" type="image/x-icon" href="https://i.postimg.cc/90cpDgdd/cropped-circle-image.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"><style>${baseStyles}${pdfjsStyles}</style></head><body>${topbarHtml}<div id="pdfContainer"></div>${loaderHtml}<script type="module">import * as pdfjsLib from '${pdfjsUrl}';pdfjsLib.GlobalWorkerOptions.workerSrc='${pdfjsWorkerUrl}';(async function(){try{var pdf=await pdfjsLib.getDocument({url:'${rawUrl}'}).promise;var container=document.getElementById('pdfContainer');var dpr=window.devicePixelRatio||1;for(var i=1;i<=pdf.numPages;i++){var page=await pdf.getPage(i);var baseViewport=page.getViewport({scale:1});var cssWidth=Math.min(window.innerWidth,baseViewport.width*1.5);var scale=cssWidth/baseViewport.width;var viewport=page.getViewport({scale:scale*dpr});var canvas=document.createElement('canvas');canvas.width=viewport.width;canvas.height=viewport.height;canvas.style.width=(viewport.width/dpr)+'px';canvas.style.height=(viewport.height/dpr)+'px';container.appendChild(canvas);var ctx=canvas.getContext('2d');await page.render({canvasContext:ctx,viewport:viewport}).promise;var lbl=document.createElement('div');lbl.className='pageNum';lbl.textContent=i+' / '+pdf.numPages;container.appendChild(lbl);}window.hideLoader();}catch(e){window.hideLoader();document.getElementById('err').classList.add('show');}})();</script><script>${sharedScript}</script></body></html>`;
            res.set('Content-Type', 'text/html; charset=utf-8');
            return res.send(html);
        }
        const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title} — CODE & CLASSROOM</title><meta name="description" content="${desc}"><meta property="og:title" content="${title} — CODE & CLASSROOM"><meta property="og:description" content="${desc}"><meta property="og:type" content="article"><meta property="og:image" content="https://i.postimg.cc/90cpDgdd/cropped-circle-image.png"><link rel="icon" type="image/x-icon" href="https://i.postimg.cc/90cpDgdd/cropped-circle-image.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"><style>${baseStyles}</style></head><body>${topbarHtml}<div class="frame-wrap"><iframe id="pdfFrame" src="${rawUrl}" title="${title}" allow="fullscreen"></iframe></div>${loaderHtml}<script>${sharedScript}(function(){var f=document.getElementById('pdfFrame');f.addEventListener('load',window.hideLoader);f.addEventListener('readystatechange',function(){try{if(f.contentDocument&&f.contentDocument.readyState==='complete')window.hideLoader();}catch(e){}});setTimeout(window.hideLoader,12000);f.addEventListener('error',function(){document.getElementById('ldr').classList.add('hidden');document.getElementById('err').classList.add('show');window.showBar();});})();</script></body></html>`;
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (err) { res.status(500).send('Error'); }
});

app.get('/api/materials/id/:id/raw', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).send('Not found');
        const safeName = (material.fileName || 'document.pdf').replace(/[^\w.\-]/g, '_');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${safeName}"`);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Accept-Ranges', 'bytes');
        if (material.storage === 'mongo' && material.fileId && gfs) {
            try {
                const fileDoc = await mongoose.connection.db.collection('materials.files').findOne({ _id: new mongoose.Types.ObjectId(material.fileId) });
                const totalLen = fileDoc && fileDoc.length ? fileDoc.length : (material.fileSize || 0);
                if (totalLen) res.setHeader('Content-Length', totalLen);
                const range = req.headers.range;
                if (range && totalLen) {
                    const parts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(parts[0], 10) || 0;
                    const end = parts[1] ? parseInt(parts[1], 10) : totalLen - 1;
                    if (start >= totalLen) { res.status(416).setHeader('Content-Range', `bytes */${totalLen}`); return res.end(); }
                    res.status(206);
                    res.setHeader('Content-Range', `bytes ${start}-${end}/${totalLen}`);
                    res.setHeader('Content-Length', end - start + 1);
                    const stream = gfs.openDownloadStream(new mongoose.Types.ObjectId(material.fileId), { start, end: end + 1 });
                    stream.on('error', () => { try { res.end(); } catch (e) {} });
                    return stream.pipe(res);
                }
                const stream = gfs.openDownloadStream(new mongoose.Types.ObjectId(material.fileId));
                stream.on('error', () => { try { res.end(); } catch (e) {} });
                return stream.pipe(res);
            } catch (gridErr) {}
        }
        if (material.fileUrl) {
            try {
                const upstream = await fetch(material.fileUrl);
                if (!upstream.ok) throw new Error('Fetch failed');
                const cl = upstream.headers.get('content-length');
                if (cl) res.setHeader('Content-Length', cl);
                const buffer = await upstream.arrayBuffer();
                return res.send(Buffer.from(buffer));
            } catch (fetchErr) { return res.redirect(material.fileUrl); }
        }
        return res.status(404).send('No file');
    } catch (err) { res.status(500).send('Error'); }
});

app.get('/api/materials/id/:id/download', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ error: 'Not found' });
        await writeLog(req, 'download', { materialId: material._id, path: '/api/materials/id/' + material._id + '/download' });
        const visitorIP = req.ip || req.connection.remoteAddress;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const alreadyDownloaded = await DownloadLog.findOne({ material: material._id, ip: visitorIP, timestamp: { $gte: today } });
        if (material.storage === 'mongo' && material.fileId && gfs) {
            try {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="${material.fileName || 'download.pdf'}"`);
                const chunks = mongoose.connection.db.collection('materials.chunks');
                const cursor = chunks.find({ files_id: new mongoose.Types.ObjectId(material.fileId) }).sort({ n: 1 }).allowDiskUse();
                for await (const chunk of cursor) { res.write(chunk.data.buffer); }
                res.end();
                if (!alreadyDownloaded) Material.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }).catch(() => {});
                DownloadLog.create({ material: material._id, ip: visitorIP, userAgent: req.headers['user-agent'] }).catch(() => {});
                return;
            } catch (gridErr) {}
        }
        if (material.fileUrl) {
            if (!alreadyDownloaded) Material.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }).catch(() => {});
            DownloadLog.create({ material: material._id, ip: visitorIP, userAgent: req.headers['user-agent'] }).catch(() => {});
            try { const response = await fetch(material.fileUrl); if (!response.ok) throw new Error('Fetch failed'); const contentType = response.headers.get('content-type') || 'application/pdf'; res.setHeader('Content-Type', contentType); res.setHeader('Content-Disposition', `attachment; filename="${material.fileName || 'download.pdf'}"`); const buffer = await response.arrayBuffer(); res.send(Buffer.from(buffer)); return; }
            catch (fetchErr) { return res.redirect(material.fileUrl); }
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
        const recentDuplicate = await Message.findOne({ email: email.toLowerCase(), message: message, createdAt: { $gte: new Date(Date.now() - 3600000) } });
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
        const slug = slugify(name);
        const existing = await Category.findOne({ slug });
        if (existing) return res.status(400).json({ error: `Category "${name}" already exists` });
        const cat = new Category({ name: name.trim(), slug, description: description || '', icon: icon || 'folder', color: color || '#c9a668', parent: parent || null, order: order || 0 });
        await cat.save();
        res.status(201).json(cat);
    } catch (err) { res.status(400).json({ error: err.message }); }
});
app.put('/api/admin/categories/:id', requireAuth, requireVerified, async (req, res) => { try { res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (err) { res.status(400).json({ error: err.message }); } });
app.delete('/api/admin/categories/:id', requireAuth, requireVerified, async (req, res) => { try { await Category.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(400).json({ error: err.message }); } });

app.post('/api/admin/projects', requireAuth, requireVerified, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
    try {
        const data = { ...req.body };
        if (!data.title || !data.description) return res.status(400).json({ error: 'Title and description are required' });
        if (typeof data.techStack === 'string') data.techStack = data.techStack.split(',').map(t => t.trim()).filter(Boolean);
        if (typeof data.progress === 'string') data.progress = parseInt(data.progress) || 0;
        if (req.files?.thumbnail?.[0]) { const result = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { folder: 'portfolio/projects' }); data.thumbnail = result.secure_url; fs.unlink(req.files.thumbnail[0].path, () => {}); }
        if (req.files?.images?.length) { const uploads = await Promise.all(req.files.images.map(f => cloudinary.uploader.upload(f.path, { folder: 'portfolio/projects' }))); data.images = uploads.map(u => u.secure_url); req.files.images.forEach(f => fs.unlink(f.path, () => {})); }
        const project = new Project(data);
        await project.save();
        if (req.body.broadcast === 'true') { const b = buildProjectBroadcast(project); sendTelegramChannel(b.text, b.link).catch(() => {}); }
        res.status(201).json(await Project.findById(project._id).populate('category', 'name slug'));
    } catch (err) { res.status(400).json({ error: err.message }); }
});
app.put('/api/admin/projects/:id', requireAuth, requireVerified, upload.fields([{ name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
    try {
        const data = { ...req.body };
        if (typeof data.techStack === 'string') data.techStack = data.techStack.split(',').map(t => t.trim()).filter(Boolean);
        if (req.files?.thumbnail?.[0]) { const result = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { folder: 'portfolio/projects' }); data.thumbnail = result.secure_url; fs.unlink(req.files.thumbnail[0].path, () => {}); }
        res.json(await Project.findByIdAndUpdate(req.params.id, data, { new: true }).populate('category', 'name slug'));
    } catch (err) { res.status(400).json({ error: err.message }); }
});
app.delete('/api/admin/projects/:id', requireAuth, requireVerified, async (req, res) => { try { await Project.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(400).json({ error: err.message }); } });

const LOGO_PATH = path.join(__dirname, 'public', 'assets', 'watermark-logo.png');
let logoBufferCache = null;
let watermarkMarkCache = null;

async function getLogoBuffer() {
    if (logoBufferCache) return logoBufferCache;
    const raw = sharp(LOGO_PATH).ensureAlpha();
    const { data, info } = await raw.raw().toBuffer({ resolveWithObject: true });
    const channels = info.channels;
    const bgThreshold = 25;
    for (let i = 0; i < data.length; i += channels) { if (data[i] < bgThreshold && data[i + 1] < bgThreshold && data[i + 2] < bgThreshold) { data[i + 3] = 0; } }
    logoBufferCache = await sharp(data, { raw: { width: info.width, height: info.height, channels } }).png().toBuffer();
    return logoBufferCache;
}
async function createHalo(baseLogoBuffer, blurAmount = 10) {
    const { data, info } = await sharp(baseLogoBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const silhouette = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i += channels) { silhouette[i] = 0; silhouette[i + 1] = 0; silhouette[i + 2] = 0; silhouette[i + 3] = data[i + 3]; }
    return sharp(silhouette, { raw: { width, height, channels } }).blur(blurAmount).png().toBuffer();
}
async function fadeLogo(buffer, opacityFactor) {
    const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
    const channels = info.channels;
    for (let i = 3; i < data.length; i += channels) { data[i] = Math.round(data[i] * opacityFactor); }
    return sharp(data, { raw: { width: info.width, height: info.height, channels } }).png().toBuffer();
}
async function getWatermarkMark() {
    if (watermarkMarkCache) return watermarkMarkCache;
    const baseLogo = await getLogoBuffer();
    const logoMeta = await sharp(baseLogo).metadata();
    const pad = 40;
    const canvasW = logoMeta.width + pad * 2;
    const canvasH = logoMeta.height + pad * 2;
    const halo = await createHalo(baseLogo, 12);
    const fadedHalo = await fadeLogo(halo, 0.6);
    watermarkMarkCache = await sharp({ create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: fadedHalo, top: pad, left: pad }, { input: baseLogo, top: pad, left: pad }]).png().toBuffer();
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
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const footer = 'Downloaded from mayanksagar.onrender.com';
        const footerUrl = 'https://mayanksagar.onrender.com';
        for (const page of pages) {
            const { width, height } = page.getSize();
            const tileW = Math.min(width, height) * 0.22;
            const tileH = tileW / markAspect;
            for (let x = -tileW; x < width + tileW; x += tileW * 1.5) { for (let y = -tileH; y < height + tileH; y += tileH * 1.7) { page.drawImage(embeddedMark, { x, y, width: tileW, height: tileH, opacity: 0.14, rotate: { type: 'degrees', angle: -30 } }); } }
            const centerW = Math.min(width, height) * 0.5;
            const centerH = centerW / markAspect;
            page.drawImage(embeddedMark, { x: (width - centerW) / 2, y: (height - centerH) / 2, width: centerW, height: centerH, opacity: 0.24 });
            const cornerW = Math.min(width, height) * 0.13;
            const cornerH = cornerW / markAspect;
            page.drawImage(embeddedMark, { x: width - cornerW - 18, y: 18, width: cornerW, height: cornerH, opacity: 0.7 });
            const fsz = Math.max(7, Math.min(width, height) * 0.018);
            const tw = font.widthOfTextAtSize(footer, fsz);
            const fx = (width - tw) / 2;
            const fy = 14;
            page.drawText(footer, { x: fx, y: fy, size: fsz, font, color: rgb(0.55, 0.55, 0.55), opacity: 0.7 });
            try {
                const linkAnnot = pdfDoc.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [fx - 2, fy - 2, fx + tw + 2, fy + fsz + 2], Border: [0, 0, 0], A: { Type: 'Action', S: 'URI', URI: pdfDoc.context.obj(footerUrl) } });
                const ref = pdfDoc.context.register(linkAnnot);
                let annotsArray = page.node.Annots && page.node.Annots();
                if (annotsArray && typeof annotsArray.push === 'function') { annotsArray.push(ref); } else { const newArr = pdfDoc.context.obj([ref]); page.node.set(pdfDoc.context.obj('Annots'), newArr); }
            } catch (linkErr) {}
        }
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, pdfBytes);
        return outputPath;
    } catch (err) { console.error('PDF watermark error:', err.message); return inputPath; }
}

const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');
const ILovePDFFile = require('@ilovepdf/ilovepdf-nodejs/ILovePDFFile');

async function compressPDF(inputPath, outputPath) {
    try {
        if (!process.env.ILOVEPDF_PUBLIC_KEY || !process.env.ILOVEPDF_SECRET_KEY) { console.warn('iLovePDF keys missing, skipping compression'); return inputPath; }
        const instance = new ILovePDFApi(process.env.ILOVEPDF_PUBLIC_KEY, process.env.ILOVEPDF_SECRET_KEY);
        const task = instance.newTask('compress');
        await task.start();
        const file = new ILovePDFFile(inputPath);
        await task.addFile(file);
        await task.process({ compression_level: 'recommended' });
        const data = await task.download();
        fs.writeFileSync(outputPath, data);
        const originalSize = fs.statSync(inputPath).size;
        const compressedSize = fs.statSync(outputPath).size;
        console.log(`PDF compressed: ${originalSize} → ${compressedSize} bytes (${Math.round((1 - compressedSize / originalSize) * 100)}% saved)`);
        return compressedSize < originalSize ? outputPath : inputPath;
    } catch (err) { console.error('PDF compression failed:', err.message); return inputPath; }
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
        const tileW = Math.round(Math.min(width, height) * 0.32);
        const tileH = Math.round(tileW / markAspect);
        const tileMark = await sharp(mark).resize(tileW, tileH, { fit: 'fill' }).rotate(-30, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
        const fadedTile = await fadeLogo(tileMark, 0.16);
        const tileMeta = await sharp(fadedTile).metadata();
        const spacingX = tileMeta.width * 1.5;
        const spacingY = tileMeta.height * 1.7;
        for (let y = -tileMeta.height; y < height + tileMeta.height; y += spacingY) { for (let x = -tileMeta.width; x < width + tileMeta.width; x += spacingX) { composites.push({ input: fadedTile, top: Math.round(y), left: Math.round(x) }); } }
        const centerW = Math.round(Math.min(width, height) * 0.55);
        const centerH = Math.round(centerW / markAspect);
        const centerMark = await sharp(mark).resize(centerW, centerH, { fit: 'fill' }).toBuffer();
        const fadedCenter = await fadeLogo(centerMark, 0.32);
        const centerMeta = await sharp(fadedCenter).metadata();
        composites.push({ input: fadedCenter, top: Math.round((height - centerMeta.height) / 2), left: Math.round((width - centerMeta.width) / 2) });
        const cornerW = Math.round(Math.min(width, height) * 0.2);
        const cornerH = Math.round(cornerW / markAspect);
        const cornerMark = await sharp(mark).resize(cornerW, cornerH, { fit: 'fill' }).toBuffer();
        const fadedCorner = await fadeLogo(cornerMark, 0.75);
        const cornerMeta = await sharp(fadedCorner).metadata();
        composites.push({ input: fadedCorner, top: height - cornerMeta.height - 20, left: width - cornerMeta.width - 20 });
        await image.composite(composites).toFile(outputPath);
        return outputPath;
    } catch (err) { console.error('Image watermark error:', err.message); return inputPath; }
}

async function ensureUniqueCustomPath(desired, excludeId) {
    let base = slugify(desired);
    if (!base) base = 'material-' + crypto.randomBytes(3).toString('hex');
    let candidate = base;
    let i = 0;
    while (true) {
        const conflict = await Material.findOne({ customPath: candidate, ...(excludeId ? { _id: { $ne: excludeId } } : {}) }).lean();
        if (!conflict) return candidate;
        i++; candidate = base + '-' + i;
        if (i > 50) { candidate = base + '-' + crypto.randomBytes(3).toString('hex'); return candidate; }
    }
}

app.post('/api/admin/materials', requireAuth, requireVerified, upload.single('file'), async (req, res) => {
    try {
        const data = { ...req.body, downloadable: req.body.downloadable !== 'false' };
        const addWatermark = req.body.addWatermark === 'true' || req.body.addWatermark === true;
        const desiredPath = (req.body.customPath || '').trim() || data.title;
        data.customPath = await ensureUniqueCustomPath(desiredPath);
        if (req.file) {
            const file = req.file;
            let finalPath = file.path;
            if (addWatermark) {
                const watermarkedPath = file.path + '_watermarked';
                if (file.mimetype === 'application/pdf') finalPath = await addPDFWatermark(file.path, watermarkedPath + '.pdf');
                else if (file.mimetype.startsWith('image/')) finalPath = await addImageWatermark(file.path, watermarkedPath + '.png');
            }
            if (file.mimetype === 'application/pdf') {
                const compressedPath = file.path + '_compressed.pdf';
                const result = await compressPDF(finalPath, compressedPath);
                if (result === compressedPath) { if (finalPath !== file.path) fs.unlink(finalPath, () => {}); finalPath = compressedPath; }
                if (gfs) {
                    const pdfName = buildPdfName(data.title, data.examType);
                    const stream = gfs.openUploadStream(pdfName, { contentType: file.mimetype });
                    fs.createReadStream(finalPath).pipe(stream);
                    await new Promise((resolve, reject) => { stream.on('finish', resolve); stream.on('error', reject); });
                    data.storage = 'mongo'; data.fileId = stream.id; data.fileName = pdfName; data.fileSize = fs.statSync(finalPath).size; data.type = 'pdf';
                }
            } else if (file.mimetype.startsWith('image/')) {
                const result = await cloudinary.uploader.upload(finalPath, { folder: 'portfolio/materials' });
                data.storage = 'cloudinary'; data.fileUrl = result.secure_url; data.fileName = file.originalname; data.fileSize = fs.statSync(finalPath).size; data.type = 'image';
            } else {
                const result = await cloudinary.uploader.upload(finalPath, { folder: 'portfolio/materials', resource_type: 'auto' });
                data.storage = 'cloudinary'; data.fileUrl = result.secure_url; data.fileName = file.originalname; data.fileSize = fs.statSync(finalPath).size;
            }
            fs.unlink(file.path, () => {});
            if (finalPath !== file.path) fs.unlink(finalPath, () => {});
        } else if (req.body.externalLink) { data.storage = 'external-link'; data.fileUrl = req.body.externalLink; data.type = 'link'; }
        const material = new Material(data);
        await material.save();
        const populated = await Material.findById(material._id).populate('category', 'name slug');
        if (req.body.broadcast === 'true') { const b = buildMaterialBroadcast(populated); sendTelegramChannel(b.text, b.link).catch(() => {}); }
        res.status(201).json(populated);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/admin/materials/:id', requireAuth, requireVerified, upload.single('file'), async (req, res) => {
    try {
        const updates = { ...req.body, updatedAt: new Date() };
        const addWatermark = req.body.addWatermark === 'true' || req.body.addWatermark === true;
        if (req.body.customPath !== undefined) { const desired = (req.body.customPath || '').trim(); if (desired) updates.customPath = await ensureUniqueCustomPath(desired, req.params.id); else delete updates.customPath; }
        if (req.file) {
            let finalPath = req.file.path;
            if (addWatermark) { const wp = req.file.path + '_wm'; if (req.file.mimetype === 'application/pdf') finalPath = await addPDFWatermark(req.file.path, wp + '.pdf'); else if (req.file.mimetype.startsWith('image/')) finalPath = await addImageWatermark(req.file.path, wp + '.png'); }
            if (req.file.mimetype === 'application/pdf') {
                const compressedPath = req.file.path + '_compressed.pdf';
                const result = await compressPDF(finalPath, compressedPath);
                if (result === compressedPath) { if (finalPath !== req.file.path) fs.unlink(finalPath, () => {}); finalPath = compressedPath; }
                if (gfs) {
                    if (updates.fileId && mongoose.isValidObjectId(updates.fileId)) { try { await gfs.delete(new mongoose.Types.ObjectId(updates.fileId)); } catch (e) {} }
                    const pdfName = buildPdfName(updates.title || req.body.title || 'material', updates.examType || req.body.examType);
                    const stream = gfs.openUploadStream(pdfName, { contentType: req.file.mimetype });
                    fs.createReadStream(finalPath).pipe(stream);
                    await new Promise((r, j) => { stream.on('finish', r); stream.on('error', j); });
                    updates.storage = 'mongo'; updates.fileId = stream.id; updates.fileUrl = undefined; updates.fileName = pdfName; updates.fileSize = fs.statSync(finalPath).size; updates.type = 'pdf';
                }
            } else {
                const result = await cloudinary.uploader.upload(finalPath, { folder: 'portfolio/materials', resource_type: req.file.mimetype === 'application/pdf' ? 'raw' : 'auto' });
                updates.storage = 'cloudinary'; updates.fileUrl = result.secure_url; updates.fileName = req.file.originalname; updates.fileSize = fs.statSync(finalPath).size; updates.type = req.file.mimetype === 'application/pdf' ? 'pdf' : req.file.mimetype.startsWith('image/') ? 'image' : 'document';
            }
            fs.unlink(req.file.path, () => {});
            if (finalPath !== req.file.path) fs.unlink(finalPath, () => {});
        }
        if (updates.externalLink) { updates.storage = 'external-link'; updates.fileUrl = updates.externalLink; updates.type = 'link'; delete updates.externalLink; }
        delete updates.broadcast;
        const material = await Material.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true }).populate('category', 'name slug');
        if (!material) return res.status(404).json({ error: 'Not found' });
        res.json(material);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/admin/materials/:id', requireAuth, requireVerified, async (req, res) => { try { await Material.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(400).json({ error: err.message }); } });

app.get('/api/admin/large-pdfs', requireAuth, requireVerified, async (req, res) => {
    try { const threshold = 10 * 1024 * 1024; const large = await Material.find({ type: 'pdf', storage: 'mongo', fileId: { $exists: true, $ne: null }, fileSize: { $gt: threshold } }).select('title fileName fileSize fileId customPath slug examType').lean(); res.json(large); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/admin/materials/:id/compress', requireAuth, requireVerified, async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ error: 'Not found' });
        if (!material.fileId || !gfs) return res.status(400).json({ error: 'No GridFS file' });
        const chunks = mongoose.connection.db.collection('materials.chunks');
        const cursor = chunks.find({ files_id: new mongoose.Types.ObjectId(material.fileId) }).sort({ n: 1 });
        const tmpIn = path.join('uploads', 'compress_in_' + Date.now() + '.pdf');
        const tmpOut = path.join('uploads', 'compress_out_' + Date.now() + '.pdf');
        const writeStream = fs.createWriteStream(tmpIn);
        for await (const chunk of cursor) writeStream.write(chunk.data.buffer);
        await new Promise(r => writeStream.end(r));
        const result = await compressPDF(tmpIn, tmpOut);
        if (result !== tmpOut || !fs.existsSync(tmpOut)) { fs.unlink(tmpIn, () => {}); return res.status(400).json({ error: 'Compression produced no smaller file' }); }
        try { await gfs.delete(new mongoose.Types.ObjectId(material.fileId)); } catch (e) {}
        const pdfName = material.fileName || buildPdfName(material.title, material.examType);
        const stream = gfs.openUploadStream(pdfName, { contentType: 'application/pdf' });
        fs.createReadStream(tmpOut).pipe(stream);
        await new Promise((resolve, reject) => { stream.on('finish', resolve); stream.on('error', reject); });
        const oldSize = material.fileSize; const newSize = fs.statSync(tmpOut).size;
        material.fileId = stream.id; material.fileSize = newSize; material.fileName = pdfName; material.updatedAt = new Date();
        await material.save();
        fs.unlink(tmpIn, () => {}); fs.unlink(tmpOut, () => {});
        res.json({ success: true, oldSize, newSize, saved: oldSize - newSize });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/db-stats', requireAuth, requireVerified, async (req, res) => {
    try {
        const dbStats = await mongoose.connection.db.stats({ scale: 1024 * 1024 });
        const logCount = await Log.countDocuments();
        res.json({ storageSizeMB: Math.round(dbStats.storageSize * 100) / 100, dataSizeMB: Math.round(dbStats.dataSize * 100) / 100, indexSizeMB: Math.round(dbStats.indexSize * 100) / 100, totalSizeMB: Math.round((dbStats.storageSize + dbStats.indexSize) * 100) / 100, collections: dbStats.collections, objects: dbStats.objects, logCount });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/telegram-info', (req, res) => { res.json({ channelUsername: process.env.TELEGRAM_CHANNEL_USERNAME || '', channelUrl: process.env.TELEGRAM_CHANNEL_USERNAME ? `https://t.me/${process.env.TELEGRAM_CHANNEL_USERNAME}` : '', configured: !!(process.env.TELEGRAM_CHANNEL_BOT_TOKEN && process.env.TELEGRAM_CHANNEL_CHAT_ID) }); });

app.post('/api/admin/broadcast', requireAuth, requireVerified, broadcastLimiter, async (req, res) => {
    try {
        const { text, previewUrl } = req.body;
        if (!text || text.trim().length === 0) return res.status(400).json({ error: 'Message text required' });
        if (text.length > 4000) return res.status(400).json({ error: 'Message too long (max 4000 chars)' });
        const result = await sendTelegramChannel(text, previewUrl);
        if (result.ok) res.json({ success: true, messageId: result.result?.message_id });
        else res.status(400).json({ error: result.description || result.error || 'Telegram send failed' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/telegram-preview-material/:id', requireAuth, requireVerified, async (req, res) => { try { const mat = await Material.findById(req.params.id).populate('category', 'name slug').lean(); if (!mat) return res.status(404).json({ error: 'Not found' }); const b = buildMaterialBroadcast(mat); res.json({ text: b.text, link: b.link }); } catch (err) { res.status(500).json({ error: err.message }); } });
app.get('/api/admin/telegram-preview-project/:id', requireAuth, requireVerified, async (req, res) => { try { const proj = await Project.findById(req.params.id).lean(); if (!proj) return res.status(404).json({ error: 'Not found' }); const b = buildProjectBroadcast(proj); res.json({ text: b.text, link: b.link }); } catch (err) { res.status(500).json({ error: err.message }); } });

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
app.get('/api/admin/messages', requireAuth, requireVerified, async (req, res) => { try { res.json(await Message.find().sort({ createdAt: -1 }).limit(50).lean()); } catch (err) { res.status(500).json({ error: err.message }); } });
app.put('/api/admin/messages/:id/read', requireAuth, requireVerified, async (req, res) => { try { res.json(await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })); } catch (err) { res.status(500).json({ error: err.message }); } });

app.get('/api/admin/logs', requireAuth, requireVerified, adminLogsLimiter, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 25, 100);
        const query = {};
        if (req.query.type && req.query.type !== 'all') query.type = req.query.type;
        if (req.query.local === '1') query.isLocalhost = true;
        if (req.query.search) { const s = String(req.query.search); query.$or = [{ path: { $regex: s, $options: 'i' } }, { ua: { $regex: s, $options: 'i' } }]; }
        const [logs, total] = await Promise.all([
            Log.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate('materialId', 'title slug customPath').lean(),
            Log.countDocuments(query)
        ]);
        const items = logs.map(l => ({
            _id: l._id,
            type: l.type,
            ipMasked: maskIP(decryptIP(l.ipEnc)),
            ipHashShort: l.ipHash ? l.ipHash.slice(0, 12) + '…' : '',
            os: l.os, browser: l.browser, device: l.device,
            lang: l.lang, tz: l.tz, screen: l.screen,
            path: l.path, referrer: l.referrer,
            material: l.materialId ? { _id: l.materialId._id, title: l.materialId.title, slug: l.materialId.slug, customPath: l.materialId.customPath } : null,
            isLocalhost: l.isLocalhost,
            createdAt: l.createdAt
        }));
        res.json({ logs: items, total, page, pages: Math.ceil(total / limit) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/logs/:id', requireAuth, requireVerified, adminLogsLimiter, async (req, res) => {
    try {
        const l = await Log.findById(req.params.id).populate('materialId', 'title slug customPath').lean();
        if (!l) return res.status(404).json({ error: 'Not found' });
        res.json({
            _id: l._id,
            type: l.type,
            ipRaw: decryptIP(l.ipEnc),
            ipHash: l.ipHash,
            ua: l.ua, os: l.os, browser: l.browser, device: l.device,
            lang: l.lang, tz: l.tz, screen: l.screen,
            path: l.path, referrer: l.referrer,
            material: l.materialId || null,
            meta: l.meta, isLocalhost: l.isLocalhost,
            createdAt: l.createdAt, ttlAt: l.ttlAt
        });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/admin/logs', requireAuth, requireVerified, adminLogsLimiter, async (req, res) => {
    try {
        const ids = Array.isArray(req.body.ids) ? req.body.ids.filter(id => mongoose.isValidObjectId(id)) : [];
        if (!ids.length) return res.status(400).json({ error: 'No valid ids' });
        const r = await Log.deleteMany({ _id: { $in: ids } });
        res.json({ success: true, deleted: r.deletedCount });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/admin/logs/localhost', requireAuth, requireVerified, adminLogsLimiter, async (req, res) => {
    try { const r = await Log.deleteMany({ isLocalhost: true }); res.json({ success: true, deleted: r.deletedCount }); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/admin/logs/older-than/:days', requireAuth, requireVerified, adminLogsLimiter, async (req, res) => {
    try {
        const days = parseInt(req.params.days);
        if (!days || days < 1 || days > 365) return res.status(400).json({ error: 'Invalid days' });
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const r = await Log.deleteMany({ createdAt: { $lt: cutoff } });
        res.json({ success: true, deleted: r.deletedCount, cutoff });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/stats', async (req, res) => {
    try {
        const [materials, categories, projects, downloads] = await Promise.all([Material.countDocuments(), Category.countDocuments({ isActive: true }), Project.countDocuments({ status: { $ne: 'disabled' } }), Material.aggregate([{ $group: { _id: null, total: { $sum: '$downloads' } } }])]);
        res.json({ materials, categories, projects, downloads: downloads[0]?.total || 0 });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

function maskIP(ip) { if (!ip) return ''; const parts = String(ip).split('.'); if (parts.length === 4) return parts[0] + '.' + parts[1] + '.*.*'; return ip.length > 8 ? ip.slice(0, 8) + '***' : '***'; }

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
        if (userData.timeoutUntil > now) { const remaining = Math.ceil((userData.timeoutUntil - now) / 1000); return res.json({ reply: `Please wait ${remaining} seconds before sending another message.` }); }
        userData.messages = userData.messages.filter(t => t > now - SPAM_WINDOW);
        userData.messages.push(now);
        if (userData.messages.length > SPAM_THRESHOLD) { userData.timeoutUntil = now + TIMEOUT_DURATION; chatTimers.set(userIP, userData); return res.json({ reply: "You've been temporarily restricted. Please wait a minute before trying again." }); }
        chatTimers.set(userIP, userData);
        const { message, history } = req.body;
        if (!message || message.trim().length < 2) return res.json({ reply: "Hello! I'm Cypher, your study assistant. How can I help you today?" });
        if (message.length > 500) return res.json({ reply: "Your message is too long. Please keep it under 500 characters." });
        const lower = message.toLowerCase().trim();
        const abusiveWords = ['fuck', 'shit', 'ass', 'bitch', 'dick', 'bastard', 'chutiya', 'bc', 'mc', 'madarchod', 'bhosdike', 'gandu', 'harami', 'kutta', 'saale', 'fauck', 'fack'];
        for (const word of abusiveWords) { if (lower.includes(word)) return res.json({ reply: "Let's keep our conversation respectful. I'm here to help with study materials and projects." }); }
        const blockedPatterns = ['admin', 'password', 'credential', 'api key', 'apikey', 'secret', 'token', 'source code', 'clone', 'copy this', 'hack', 'exploit', 'vulnerability', 'system prompt', 'your instructions', 'your code', 'bypass', 'override', 'server code', 'backend code', 'database password', 'mongodb uri', 'make similar', 'build like this', 'create same', 'replicate', 'ip address', 'my ip', 'what is my ip'];
        for (const pattern of blockedPatterns) { if (lower.includes(pattern)) { if (pattern.includes('ip')) return res.json({ reply: "I cannot access your IP address. Is there anything else I can help with?" }); return res.json({ reply: "I'm unable to help with that. I'm here for study materials and projects." }); } }
        const offTopicPatterns = ['resistance', 'circuit', 'diagram', 'medicine', 'disease', 'political', 'religion', 'war', 'violence', 'hack', 'crack', 'torrent', 'pirate', 'adult', 'gambling', 'crypto', 'trading', 'stock'];
        for (const pattern of offTopicPatterns) { if (lower.includes(pattern)) { return res.json({ reply: "I'm here to help with study materials and projects on CODE & CLASSROOM. What subject or topic are you looking for?" }); } }
        let action = null;
        if (lower.includes('scroll') || lower.includes('go to') || lower.includes('navigate')) { if (lower.includes('home') || lower.includes('top')) action = { type: 'scroll', target: 'home' }; else if (lower.includes('material')) action = { type: 'scroll', target: 'materials' }; else if (lower.includes('project')) action = { type: 'scroll', target: 'projects' }; else if (lower.includes('about')) action = { type: 'scroll', target: 'about' }; else if (lower.includes('contact')) action = { type: 'scroll', target: 'contact' }; else if (lower.includes('bottom')) action = { type: 'scroll', target: 'bottom' }; }
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        let aiWorked = false;
        if (GROQ_API_KEY && GROQ_API_KEY.startsWith('gsk_')) {
            try {
                let materials = [], projects = [], categories = [];
                materials = await Material.find().populate('category', 'name slug').sort({ createdAt: -1 }).limit(6).lean();
                projects = await Project.find({ status: { $ne: 'disabled' } }).sort({ createdAt: -1 }).limit(4).lean();
                categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();
                if (lower.includes('find') || lower.includes('search') || lower.includes('looking') || lower.includes('show') || lower.includes('list') || lower.includes('give') || lower.includes('link') || lower.includes('share')) { const terms = lower.replace(/find|search|looking for|need|want|show me|get me|do you have|i need|list|show|recent|latest|give|link|share/gi, '').trim(); if (terms.length > 1) { const filtered = await Material.find({ $or: [{ title: { $regex: terms, $options: 'i' } }, { subject: { $regex: terms, $options: 'i' } }, { description: { $regex: terms, $options: 'i' } }, { grade: { $regex: terms, $options: 'i' } }] }).populate('category', 'name slug').limit(8).lean(); if (filtered.length) materials = filtered; } }
                let dbContext = '';
                if (materials.length) dbContext += `\nMATERIALS:\n${materials.map(m => `- "${m.title}" | ${m.subject || 'N/A'} | Grade ${m.grade || 'N/A'} | Type: ${m.examType || m.type} | Shareable link: /s/${m.shareableLink || m.customPath || m.slug}`).join('\n')}`;
                if (projects.length) dbContext += `\nPROJECTS:\n${projects.map(p => `- "${p.title}" | Status: ${p.status} | Progress: ${p.progress || 0}% | Tech: ${(p.techStack || []).join(', ')} | Shareable link: /s/${p.shareableLink || p.slug}`).join('\n')}`;
                if (categories.length) dbContext += `\nCATEGORIES:\n${categories.map(c => `- ${c.name}: ${c.description || ''} | Link: /materials?category=${c.slug}`).join('\n')}`;
                if (history?.length) dbContext += `\nHISTORY:\n${history.slice(-6).map(h => `${h.role}: ${h.content}`).join('\n')}`;
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 10000);
                const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` }, body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: `You are Cypher, a helpful AI assistant for CODE & CLASSROOM by Mayank Sagar. You have access to the real database below. Always use the database data when answering. If someone asks for materials, projects, or links, use the data provided. When listing materials, always include the shareable link in the exact form /s/<id> shown. Never say you don't have access to links. Never make up fake materials. Keep replies short, 2 to 4 sentences. Use **bold**, *italic*, and [links](URL). Use only professional English with no Hindi. Share socials only when asked: Instagram [@sagar.mayank_](https://instagram.com/sagar.mayank_) and GitHub [cypherXsagar](https://github.com/cypherXsagar). Never share credentials or code.\n\n${dbContext}\n\nUser: ${message}\n\nCypher:` }], max_tokens: 400, temperature: 0.7 }), signal: controller.signal });
                clearTimeout(timeout);
                const data = await resp.json();
                if (data.choices?.[0]?.message?.content) { let reply = data.choices[0].message.content.trim(); if (reply && reply.length > 5) { if (!reply.match(/[.!?)]$/)) reply += '.'; const slangCheck = ['bhai', 'tera', 'badhiya', 'accha', 'yaar', 'arey', 'kya baat', 'bilkul', 'aur bhai', 'ji', 'app', 'mereko', 'skte']; if (slangCheck.some(w => reply.toLowerCase().includes(w))) reply = "Hello! I'm Cypher. How can I help you with study materials or projects today?"; aiWorked = true; const result = { reply }; if (action) result.action = action; return res.json(result); } }
            } catch (e) { console.error('Groq AI error:', e.message); }
        }
        if (!aiWorked) return res.json({ reply: "AI chat is unreachable at the moment. Sorry for the inconvenience." });
    } catch (err) { console.error('Chat error:', err); res.json({ reply: "AI chat is unreachable at the moment. Sorry for the inconvenience." }); }
});

app.get('/s/:shareId', async (req, res) => {
    try {
        const id = String(req.params.shareId || '').toLowerCase();
        const mat = await Material.findOne({ $or: [{ shareableLink: id }, { slug: id }, { customPath: id }] }).lean();
        if (mat) return res.redirect(`/materials?open=${encodeURIComponent(mat.slug)}`);
        const proj = await Project.findOne({ $or: [{ shareableLink: id }, { slug: id }] }).lean();
        if (proj) return res.redirect('/projects');
        res.redirect('/');
    } catch (err) { res.redirect('/'); }
});

function htmlEscape(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

app.get('/admin', requireAuth, requireVerified, (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/admin-verify', requireAuth, (req, res) => { if (req.session?.isVerified) return res.redirect('/admin'); res.sendFile(path.join(__dirname, 'public', 'admin-verify.html')); });
app.get('/login', (req, res) => { if (req.isAuthenticated() && req.session?.isVerified) return res.redirect('/admin'); res.sendFile(path.join(__dirname, 'public', 'login.html')); });
app.get('/materials', (req, res) => res.sendFile(path.join(__dirname, 'public', 'materials.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/privacy', (req, res) => res.sendFile(path.join(__dirname, 'public', 'privacy.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));