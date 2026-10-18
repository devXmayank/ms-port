# Code & Classroom — backend skeleton

Every service used here has a genuinely free tier with no card required: MongoDB Atlas (M0 cluster), Google OAuth, Cloudinary, and Gemini via Google AI Studio. Nothing in this stack requires payment to run.

## What's here
- `server.js` — the whole Express app: routes, sessions, uploads
- `models.js` — Category, Material, Admin schemas
- `auth.js` — Google sign-in + password second factor
- `public/` — homepage (new design), admin login, password-verify, dashboard

## 1. Install
```
npm install
```
Requires Node 18+ (uses native `fetch`).

## 2. Set up MongoDB
Create a free cluster at mongodb.com/atlas, get the connection string, put it in `.env` as `MONGODB_URI`.

## 3. Set up Google OAuth
1. console.cloud.google.com → new project → APIs & Services → Credentials
2. Create OAuth client ID → Web application
3. Authorized redirect URI: `http://localhost:3000/auth/google/callback` (and your real domain later)
4. Copy client ID/secret into `.env`
5. Set `ADMIN_EMAIL` in `.env` to the one Google account allowed to sign in

## 4. Set the admin password
```
npm run hash-password "your-chosen-password"
```
Paste the output into `ADMIN_PASSWORD_HASH` in `.env`. The plain password is never stored anywhere.

## 5. Set up Cloudinary
Free account at cloudinary.com → dashboard gives you cloud name / API key / API secret → into `.env`.

## 6. Set up the AI assistant (free)
1. Go to aistudio.google.com
2. Sign in with the same Google account, click "Get API key" → "Create API key"
3. No card, no billing setup needed for the free tier
4. Paste it into `GEMINI_API_KEY` in `.env`

The free tier's daily limit is generous for a personal site, but if you ever outgrow it, `GEMINI_MODEL` in `.env` is the only line to change to move to a different Gemini model.

## 7. Run it
```
cp .env.example .env   # then fill in the real values
npm run dev
```
Visit `http://localhost:3000` for the site, `/admin.html` for the login flow.

## How the admin login works
1. `/admin.html` → click "Sign in with Google"
2. Google confirms identity → server checks the email against `ADMIN_EMAIL` → anyone else gets bounced back with an error
3. Match → redirected to `/admin-verify.html` → enter the password from step 4 above
4. Both pass → session cookie issued, `/admin-dashboard.html` unlocks

## What's not built yet (next steps)
- Public materials browser page (filter by category/grade/subject) — currently only the API (`GET /api/materials`) exists
- The AI chat panel's frontend UI wired to `POST /api/chat` (endpoint is ready, front-end widget from the old site needs to be reconnected to it)
- About/projects pages in the new visual style
