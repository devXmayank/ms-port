const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const { Admin } = require('./models');

function configurePassport() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            
            if (email !== process.env.ADMIN_EMAIL) {
                return done(null, false, { message: 'Unauthorized email address' });
            }
            
            let admin = await Admin.findOne({ googleId: profile.id });
            
            if (!admin) {
                admin = await Admin.findOne({ email });
                if (admin) {
                    admin.googleId = profile.id;
                    await admin.save();
                } else {
                    admin = new Admin({
                        googleId: profile.id,
                        email: email
                    });
                    await admin.save();
                }
            }
            
            admin.lastLogin = new Date();
            await admin.save();
            
            return done(null, admin);
        } catch (err) {
            return done(err);
        }
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const admin = await Admin.findById(id);
            done(null, admin);
        } catch (err) {
            done(err);
        }
    });
}

function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    if (req.headers['content-type'] === 'application/json' || req.xhr) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    res.redirect('/admin.html');
}

function requireVerified(req, res, next) {
    if (req.session && req.session.isVerified) {
        return next();
    }
    if (req.headers['content-type'] === 'application/json' || req.xhr) {
        return res.status(401).json({ success: false, message: 'Verification required' });
    }
    res.redirect('/admin-verify.html');
}

async function verifyPassword(password) {
    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) return false;
    return await bcrypt.compare(password, hash);
}

module.exports = { configurePassport, requireAuth, requireVerified, verifyPassword };