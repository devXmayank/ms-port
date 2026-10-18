const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: String,
    icon: { type: String, default: 'book' },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

categorySchema.index({ order: 1 });

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    type: { type: String, enum: ['pdf', 'link', 'note', 'image', 'video'], required: true },
    storage: { type: String, enum: ['mongo', 'cloudinary', 'external-link'], required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId },
    fileUrl: String,
    fileName: String,
    fileSize: Number,
    downloadable: { type: Boolean, default: true },
    subject: String,
    grade: String,
    examType: { type: String, enum: ['notes', 'test-paper', 'exam-paper', 'practice', 'resource'] },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

materialSchema.index({ title: 'text', description: 'text', subject: 'text' });
materialSchema.index({ category: 1 });
materialSchema.index({ examType: 1, subject: 1, grade: 1 });
materialSchema.index({ createdAt: -1 });

materialSchema.pre('save', function(next) {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now().toString(36);
    }
    this.updatedAt = new Date();
    next();
});

const adminSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    verifiedAt: Date,
    lastLogin: Date,
    createdAt: { type: Date, default: Date.now }
});

const downloadLogSchema = new mongoose.Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
    ip: String,
    userAgent: String,
    timestamp: { type: Date, default: Date.now }
});

downloadLogSchema.index({ timestamp: -1 });

const Category = mongoose.model('Category', categorySchema);
const Material = mongoose.model('Material', materialSchema);
const Admin = mongoose.model('Admin', adminSchema);
const DownloadLog = mongoose.model('DownloadLog', downloadLogSchema);

module.exports = { Category, Material, Admin, DownloadLog };