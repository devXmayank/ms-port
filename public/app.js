const API = window.location.origin;
let currentPage = 1, totalPages = 1, currentCategory = 'all', currentExamType = 'all', currentProjectStatus = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    if (document.getElementById('hc')) initHero3D();
    if (document.querySelector('.stats-bar')) loadStats();
    if (document.getElementById('cg')) loadCategories();
    if (document.getElementById('fp')) loadFeaturedProjects();
    if (document.getElementById('projectsGrid')) { loadProjects(); initProjectFilters(); }
    if (document.getElementById('materialsList')) { loadMaterials(); initMaterialFilters(); }
    if (document.getElementById('materialsSearch')) initMaterialSearch();
    if (document.getElementById('contactForm')) initContactForm();
    if (document.getElementById('lm')) loadLatestMaterials();
    initAIChat();
    initScrollAnimations();
    initSmoothScroll();
});

function initNavbar() {
    const nb = document.getElementById('nb'); if (!nb) return;
    window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 60));
    const cp = window.location.pathname;
    document.querySelectorAll('.navbar-links a').forEach(l => { if (l.getAttribute('href') === cp || (cp === '/' && l.getAttribute('href') === '/')) l.classList.add('active'); });
}

function initMobileMenu() {
    const t = document.getElementById('nt'), m = document.getElementById('nl'); if (!t || !m) return;
    t.addEventListener('click', () => { m.classList.toggle('open'); t.classList.toggle('open'); });
    document.querySelectorAll('.navbar-links a').forEach(l => l.addEventListener('click', () => { m.classList.remove('open'); t.classList.remove('open'); }));
}

function initHero3D() {
    const container = document.getElementById('hc'), canvas = container?.querySelector('canvas');
    if (!canvas || !window.THREE) return;
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const resize = () => { const s = container.clientWidth; renderer.setSize(s, s); };
    resize(); window.addEventListener('resize', resize);
    const light = new THREE.PointLight(0xc9a668, 1.2, 20); light.position.set(5, 5, 5); scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const group = new THREE.Group(); scene.add(group);
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const core = new THREE.Mesh(coreGeo, new THREE.MeshPhysicalMaterial({ color: 0xc9a668, metalness: 0.7, roughness: 0.15, transparent: true, opacity: 0.55, flatShading: true, clearcoat: 0.6 }));
    group.add(core);
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.22, 0), new THREE.MeshBasicMaterial({ color: 0xe8d5a3, wireframe: true, transparent: true, opacity: 0.25 }));
    group.add(shell);
    const nodeCount = 60, radius = 2.3, nodes = [];
    for (let i = 0; i < nodeCount; i++) {
        const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = radius + (Math.random() - 0.5) * 0.6;
        nodes.push(new THREE.Vector3(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)));
    }
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodePts = new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: 0xc9a668, size: 0.045, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    group.add(nodePts);
    const linePositions = [], maxDist = 1.4;
    for (let i = 0; i < nodes.length; i++) { for (let j = i + 1; j < nodes.length; j++) { if (nodes[i].distanceTo(nodes[j]) < maxDist) linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z); } }
    const lineGeo = new THREE.BufferGeometry(); lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineNet = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xc9a668, transparent: true, opacity: 0.12 }));
    group.add(lineNet);
    const dustGeo = new THREE.BufferGeometry(), dustCount = 300, dpos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) { const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 3 + Math.random() * 1.5; dpos[i] = r * Math.sin(ph) * Math.cos(th); dpos[i + 1] = r * Math.sin(ph) * Math.sin(th); dpos[i + 2] = r * Math.cos(ph); }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xc9a668, size: 0.012, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }));
    group.add(dust);
    let mx = 0, my = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { mx = (e.clientX / window.innerWidth) * 2 - 1; my = -(e.clientY / window.innerHeight) * 2 + 1; });
    (function anim() {
        requestAnimationFrame(anim);
        tx += (mx - tx) * 0.02; ty += (my - ty) * 0.02;
        group.rotation.y += 0.0025; group.rotation.x = ty * 0.3; group.rotation.z = tx * 0.2;
        core.rotation.y += 0.0015; core.rotation.x += 0.001;
        shell.rotation.y -= 0.001;
        nodePts.rotation.y += 0.0008;
        lineNet.rotation.y += 0.0008;
        dust.rotation.y -= 0.0004;
        core.scale.setScalar(1 + Math.sin(Date.now() * 0.0006) * 0.03);
        renderer.render(scene, camera);
    })();
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(group.scale, { scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }, x: 0.5, y: 0.5, z: 0.5, ease: 'none' });
        gsap.to('#hc', { scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }, opacity: 0, y: 150 });
    }
}

async function loadStats() {
    try { const r = await fetch('/api/stats'), d = await r.json(); animateValue('sm', 0, d.materials, 1500); animateValue('sc', 0, d.categories, 1500); animateValue('sp', 0, d.projects, 1500); animateValue('sd', 0, d.downloads, 1500); } catch (e) {}
}

function animateValue(id, start, end, duration) {
    const el = document.getElementById(id); if (!el) return;
    const st = performance.now();
    (function upd(ct) { const p = Math.min((ct - st) / duration, 1), v = Math.floor(start + (end - start) * (1 - Math.pow(1 - p, 3))); el.textContent = v.toLocaleString(); if (p < 1) requestAnimationFrame(upd); })(st);
}

async function loadCategoryFilters() {
    try {
        const res = await fetch('/api/categories'), categories = await res.json(), container = document.getElementById('categoryFilters');
        if (!container) return;
        if (Array.isArray(categories)) {
            categories.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = 'filter-pill material-filter-category'; btn.dataset.category = cat._id; btn.dataset.slug = cat.slug; btn.textContent = cat.name;
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.material-filter-category').forEach(b => b.classList.remove('active'));
                    this.classList.add('active'); currentCategory = this.dataset.category; currentPage = 1; loadMaterials();
                    document.getElementById('currentCategoryTitle').textContent = cat.name;
                    document.getElementById('currentCategoryDesc').textContent = cat.description || 'Browse materials in this category.';
                    const url = new URL(window.location); url.searchParams.set('category', cat.slug); window.history.pushState({}, '', url);
                });
                container.appendChild(btn);
            });
        }
        const urlParams = new URLSearchParams(window.location.search), activeCategory = urlParams.get('category');
        if (activeCategory) { const activeBtn = container.querySelector(`[data-slug="${activeCategory}"]`); if (activeBtn) { activeBtn.classList.add('active'); currentCategory = activeBtn.dataset.category; } }
    } catch (err) {}
}

async function loadCategories() {
    const grid = document.getElementById('cg'); if (!grid) return;
    try { const cats = await (await fetch('/api/categories')).json(); grid.innerHTML = cats.length ? cats.map(c => `<a href="/materials?category=${c.slug}" class="category-card"><div class="category-icon"><i class="fas fa-${c.icon||'folder'}"></i></div><h3>${esc(c.name)}</h3><p>${esc(c.description||'Browse materials')}</p><span class="category-count">Explore →</span></a>`).join('') : '<div class="empty-state"><i class="fas fa-folder-open"></i><h3>No categories</h3></div>'; } catch (e) { grid.innerHTML = '<div class="empty-state"><p>Failed to load.</p></div>'; }
}

async function openProjectModal(slug) {
    if (!slug || slug === 'undefined') return;
    try {
        const res = await fetch(`/api/projects/${slug}`); if (!res.ok) { showToast('Project not found', 'error'); return; }
        const p = await res.json(); if (p.error) { showToast('Project not found', 'error'); return; }
        const sb = s => ({ 'live': 'status-live', 'in-progress': 'status-in-progress', 'completed': 'status-completed', 'planning': 'status-planning', 'on-hold': 'status-on-hold', 'disabled': 'status-disabled' }[s] || '');
        const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
        overlay.innerHTML = `<div class="modal" style="max-width:650px"><button class="modal-close">&times;</button>${p.thumbnail?`<img src="${p.thumbnail}" alt="${esc(p.title)}" style="width:100%;max-height:300px;object-fit:cover;border-radius:var(--radius);margin-bottom:20px">`:''}<span class="project-status ${sb(p.status)}" style="margin-bottom:12px;display:inline-block">${(p.status||'planning').replace('-',' ')}</span><h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:12px">${esc(p.title)}</h2><p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">${esc(p.description||'')}</p>${p.longDescription?`<p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">${esc(p.longDescription)}</p>`:''}${p.progress>0?`<div style="margin-bottom:20px"><div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px"><span style="color:var(--text-dim)">Progress</span><span style="color:var(--accent)">${p.progress}%</span></div><div class="progress-bar-container"><div class="progress-bar" style="width:${p.progress}%"></div></div></div>`:''}${p.techStack&&p.techStack.length?`<div style="margin-bottom:20px"><h4 style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-bottom:8px">Tech Stack</h4><div style="display:flex;gap:6px;flex-wrap:wrap">${p.techStack.map(t=>`<span class="tech-tag">${esc(t)}</span>`).join('')}</div></div>`:''}<div style="display:flex;gap:16px;margin-bottom:20px;font-size:12px;color:var(--text-dim)"><span><i class="fas fa-eye"></i> ${p.views||0} views</span><span>Created: ${new Date(p.createdAt).toLocaleDateString()}</span>${p.completedDate?`<span>Completed: ${new Date(p.completedDate).toLocaleDateString()}</span>`:''}</div><div style="display:flex;gap:10px;flex-wrap:wrap">${p.liveUrl?`<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>`:''}${p.githubUrl?`<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fab fa-github"></i> View Code</a>`:''}<button class="btn btn-outline modal-close-btn">Close</button></div></div>`;
        document.body.appendChild(overlay); document.body.style.overflow = 'hidden';
        const closeIt = () => { overlay.remove(); document.body.style.overflow = ''; };
        overlay.querySelector('.modal-close').addEventListener('click', closeIt); overlay.querySelector('.modal-close-btn').addEventListener('click', closeIt);
        overlay.addEventListener('click', function(e) { if (e.target === overlay) closeIt(); });
        document.addEventListener('keydown', function escH(e) { if (e.key === 'Escape') { closeIt(); document.removeEventListener('keydown', escH); } });
    } catch (e) { showToast('Failed to load project', 'error'); }
}

async function loadFeaturedProjects() {
    const grid = document.getElementById('fp'); if (!grid) return;
    try {
        const d = await (await fetch('/api/projects?limit=4')).json(), projects = d.projects || [];
        if (!projects.length) { grid.innerHTML = '<div class="empty-state"><i class="fas fa-code"></i><h3>No projects yet</h3><p>Check back soon for updates.</p></div>'; return; }
        grid.innerHTML = projects.map(p => renderProjectCard(p)).join('');
        document.querySelectorAll('#fp .project-card').forEach(card => { card.addEventListener('click', function(e) { e.preventDefault(); const slug = this.dataset.slug; if (slug) openProjectModal(slug); }); });
    } catch (e) { grid.innerHTML = '<div class="empty-state"><p>Failed to load projects.</p></div>'; }
}

async function loadProjects() {
    const grid = document.getElementById('projectsGrid'); if (!grid) return;
    try {
        let url = `/api/projects?page=${currentPage}&limit=9`; if (currentProjectStatus !== 'all') url += `&status=${currentProjectStatus}`;
        const d = await (await fetch(url)).json(); totalPages = d.pages;
        if (!d.projects.length) { grid.innerHTML = '<div class="empty-state"><i class="fas fa-code-branch"></i><h3>No projects found</h3></div>'; document.getElementById('projectsPagination').innerHTML = ''; return; }
        grid.innerHTML = d.projects.map(p => renderProjectCard(p)).join('');
        document.querySelectorAll('#projectsGrid .project-card').forEach(card => { card.addEventListener('click', function() { const slug = this.dataset.slug; if (slug) openProjectModal(slug); }); });
        renderPagination('projectsPagination', d.page, d.pages);
    } catch (e) { grid.innerHTML = '<div class="empty-state"><p>Failed to load.</p></div>'; }
}

function renderProjectCard(p) {
    const sb = s => ({ 'live': 'status-live', 'in-progress': 'status-in-progress', 'completed': 'status-completed', 'planning': 'status-planning', 'on-hold': 'status-on-hold', 'disabled': 'status-disabled' }[s] || '');
    return `<div class="project-card" data-slug="${p.slug||''}" style="cursor:pointer">${p.thumbnail?`<img src="${p.thumbnail}" alt="${esc(p.title)}" class="project-thumbnail" loading="lazy">`:`<div class="project-thumbnail-placeholder"><i class="fas fa-code"></i></div>`}<div class="project-body"><h3>${esc(p.title)}</h3><p>${esc(p.description||'').substring(0,120)}${(p.description||'').length>120?'...':''}</p><div class="project-meta"><div class="project-tech">${(p.techStack||[]).slice(0,3).map(t=>`<span class="tech-tag">${esc(t)}</span>`).join('')}</div><span class="project-status ${sb(p.status)}">${(p.status||'planning').replace('-',' ')}</span></div>${p.progress>0?`<div class="progress-bar-container"><div class="progress-bar" style="width:${p.progress}%"></div></div>`:''}</div></div>`;
}

function initProjectFilters() { document.querySelectorAll('.project-filter').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('.project-filter').forEach(x => x.classList.remove('active')); this.classList.add('active'); currentProjectStatus = this.dataset.status; currentPage = 1; loadProjects(); })); }

async function loadMaterials() {
    const list = document.getElementById('materialsList'); if (!list) return;
    list.innerHTML = '<div class="empty-state"><p>Loading...</p></div>';
    try {
        let url = `/api/materials?page=${currentPage}&limit=20`; if (currentCategory !== 'all') url += `&category=${currentCategory}`; if (currentExamType !== 'all') url += `&examType=${currentExamType}`;
        const si = document.getElementById('materialsSearch'); if (si?.value.trim()) url += `&search=${encodeURIComponent(si.value.trim())}`;
        const d = await (await fetch(url)).json(); totalPages = d.pages;
        if (!d.materials.length) { list.innerHTML = '<div class="empty-state"><i class="fas fa-file-alt"></i><h3>No materials</h3></div>'; return; }
        list.innerHTML = d.materials.map((m, i) => renderMaterialRow(m, i)).join(''); attachMaterialEvents(); renderPagination('materialsPagination', d.page, d.pages);
    } catch (e) { list.innerHTML = '<div class="empty-state"><p>Failed to load.</p></div>'; }
}

function renderMaterialRow(m, i) {
    const hasFile = m.fileUrl || m.fileId, shareUrl = `${window.location.origin}/s/${m.shareableLink||m.slug}`;
    return `<div class="material-row" data-slug="${m.slug||''}" data-share="${m.shareableLink||''}" style="animation-delay:${i*0.05}s"><div class="material-info"><h3>${esc(m.title)}</h3><div class="meta"><span>${esc(m.category?.name||'General')}</span>${m.subject?`<span>${esc(m.subject)}</span>`:''}${m.grade?`<span>Grade ${esc(m.grade)}</span>`:''}</div></div><span class="material-type-badge badge-${m.type||'note'}">${m.type||'note'}</span><span class="material-date">${new Date(m.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span><div style="display:flex;gap:6px">${hasFile?`<button class="btn btn-outline btn-sm dl-btn" data-id="${m._id}" data-filename="${esc(m.fileName||'download')}" title="Download"><i class="fas fa-download"></i></button>`:''}<button class="btn btn-outline btn-sm share-btn" data-share="${m.shareableLink||m.slug}" title="Copy share link"><i class="fas fa-share-alt"></i></button></div></div>`;
}

function attachMaterialEvents() {
    document.querySelectorAll('#materialsList .material-row, #lm .material-row').forEach(row => { row.addEventListener('click', function(e) { if (e.target.closest('button')) return; const slug = this.dataset.slug; if (slug && slug !== 'undefined' && slug !== 'null') openMaterialModal(slug); }); });
    document.querySelectorAll('.dl-btn').forEach(b => b.addEventListener('click', function(e) { e.stopPropagation(); downloadMaterial(this.dataset.id, this.dataset.filename); }));
    document.querySelectorAll('.share-btn').forEach(b => b.addEventListener('click', function(e) { e.stopPropagation(); const shareUrl = `${window.location.origin}/s/${this.dataset.share}`; navigator.clipboard.writeText(shareUrl).then(() => { showToast('Share link copied! 📋', 'success'); }).catch(() => { showToast('Failed to copy link', 'error'); }); }));
}

function initMaterialFilters() {
    document.querySelectorAll('.material-filter-category').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('.material-filter-category').forEach(x => x.classList.remove('active')); this.classList.add('active'); currentCategory = this.dataset.category; currentPage = 1; loadMaterials(); }));
    document.querySelectorAll('.material-filter-exam').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('.material-filter-exam').forEach(x => x.classList.remove('active')); this.classList.add('active'); currentExamType = this.dataset.examtype; currentPage = 1; loadMaterials(); }));
}

function initMaterialSearch() { const si = document.getElementById('materialsSearch'); if (!si) return; let t; si.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { currentPage = 1; loadMaterials(); }, 400); }); }

async function loadLatestMaterials() {
    const list = document.getElementById('lm'); if (!list) return;
    try { const d = await (await fetch('/api/materials?limit=6')).json(); if (!d.materials?.length) { list.innerHTML = '<div class="empty-state"><p>No materials yet.</p></div>'; return; } list.innerHTML = d.materials.map((m, i) => renderMaterialRow(m, i)).join(''); attachMaterialEvents(); } catch (e) { list.innerHTML = ''; }
}

async function openMaterialModal(slug) {
    if (!slug || slug === 'undefined' || slug === 'null') return;
    try {
        const m = await (await fetch(`/api/materials/${slug}`)).json(); if (m.error) return showToast('Not found', 'error');
        const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
        overlay.innerHTML = `<div class="modal"><button class="modal-close">&times;</button><span class="material-type-badge badge-${m.type||'note'}" style="margin-bottom:16px;display:inline-block">${m.type||'note'}</span><h2 style="font-family:var(--font-display);font-size:26px;margin-bottom:12px">${esc(m.title)}</h2><p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">${esc(m.description)}</p><div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px;font-size:12px;color:var(--text-secondary)">${m.category?`<span><strong>Category:</strong> ${esc(m.category.name)}</span>`:''}${m.subject?`<span><strong>Subject:</strong> ${esc(m.subject)}</span>`:''}${m.grade?`<span><strong>Grade:</strong> ${esc(m.grade)}</span>`:''}</div><div style="display:flex;gap:12px;margin-bottom:16px;font-size:11px;color:var(--text-dim)"><span><i class="fas fa-eye"></i> ${m.views||0}</span><span><i class="fas fa-download"></i> ${m.downloads||0}</span><span>${new Date(m.createdAt).toLocaleDateString()}</span></div><div style="display:flex;gap:10px">${(m.fileUrl||m.fileId)?`<button class="btn btn-primary md-btn" data-id="${m._id}" data-filename="${esc(m.fileName||'download')}"><i class="fas fa-download"></i> Download</button>`:''}<button class="btn btn-outline modal-share-btn" data-share="${m.shareableLink||m.slug}"><i class="fas fa-share-alt"></i> Share</button><button class="btn btn-outline mc-btn">Close</button></div></div>`;
        document.body.appendChild(overlay); document.body.style.overflow = 'hidden';
        const close = () => { overlay.remove(); document.body.style.overflow = ''; };
        overlay.querySelector('.modal-close').addEventListener('click', close); overlay.querySelector('.mc-btn').addEventListener('click', close);
        overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
        const db = overlay.querySelector('.md-btn'); if (db) db.addEventListener('click', () => downloadMaterial(db.dataset.id, db.dataset.filename));
        const sb = overlay.querySelector('.modal-share-btn'); if (sb) sb.addEventListener('click', function() { const shareUrl = `${window.location.origin}/s/${this.dataset.share}`; navigator.clipboard.writeText(shareUrl).then(() => { showToast('Share link copied! 📋', 'success'); }).catch(() => { showToast('Failed to copy', 'error'); }); });
    } catch (e) { showToast('Failed to load', 'error'); }
}

function downloadMaterial(id, filename) { const a = document.createElement('a'); a.href = `/api/materials/id/${id}/download`; a.download = filename || 'download'; a.target = '_blank'; document.body.appendChild(a); a.click(); document.body.removeChild(a); showToast('Download started!', 'success'); }

function renderPagination(cid, page, pages) {
    const c = document.getElementById(cid); if (!c || pages <= 1) { if (c) c.innerHTML = ''; return; }
    let h = `<button class="page-btn" data-page="${page-1}" ${page===1?'disabled':''}><i class="fas fa-chevron-left"></i></button>`;
    for (let i = 1; i <= pages; i++) { if (i === 1 || i === pages || (i >= page - 2 && i <= page + 2)) h += `<button class="page-btn ${i===page?'active':''}" data-page="${i}">${i}</button>`; else if (i === page - 3 || i === page + 3) h += '<span class="page-btn" style="border:none;cursor:default;color:var(--text-dim)">...</span>'; }
    h += `<button class="page-btn" data-page="${page+1}" ${page===pages?'disabled':''}><i class="fas fa-chevron-right"></i></button>`; c.innerHTML = h;
    c.querySelectorAll('.page-btn:not([disabled])').forEach(b => b.addEventListener('click', function() { const np = parseInt(this.dataset.page); if (np !== currentPage && np >= 1 && np <= pages) { currentPage = np; if (document.getElementById('projectsGrid')) loadProjects(); if (document.getElementById('materialsList')) loadMaterials(); window.scrollTo({ top: 400, behavior: 'smooth' }); } }));
}

async function initContactForm() {
    const f = document.getElementById('contactForm'); if (!f) return;
    f.addEventListener('submit', async function(e) {
        e.preventDefault(); const btn = f.querySelector('button[type="submit"]'), ot = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; btn.disabled = true;
        try {
            const r = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: document.getElementById('contactName').value, email: document.getElementById('contactEmail').value, subject: document.getElementById('contactSubject').value, message: document.getElementById('contactMessage').value }) });
            const data = await r.json().catch(() => ({}));
            if (r.ok) {
                showToast('Message sent!', 'success');
                f.reset();
            } else if (r.status === 429) {
                showToast(data.error || "You've reached your daily message limit. Try again tomorrow.", 'error');
            } else {
                showToast(data.error || 'Failed to send message', 'error');
            }
        } catch (er) { showToast('Network error', 'error'); }
        btn.innerHTML = ot; btn.disabled = false;
    });
}

function initAIChat() {
    const toggle = document.getElementById('ct'), panel = document.getElementById('cp'), close = document.getElementById('cx'), input = document.getElementById('ci'), send = document.getElementById('cs'), messages = document.getElementById('cm');
    if (!toggle || !panel) return;
    toggle.addEventListener('click', () => panel.style.display = panel.style.display === 'none' ? 'block' : 'none');
    close.addEventListener('click', () => panel.style.display = 'none');
    async function sendMsg() { const text = input.value.trim(); if (!text) return; messages.innerHTML += `<div style="padding:10px 14px;background:rgba(255,255,255,0.05);border-radius:12px;font-size:12px;align-self:flex-end;max-width:85%">${esc(text)}</div>`; input.value = ''; messages.scrollTop = messages.scrollHeight; const loading = document.createElement('div'); loading.style.cssText = 'padding:10px 14px;background:var(--accent-dim);border-radius:12px;font-size:12px;align-self:flex-start'; loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...'; messages.appendChild(loading); messages.scrollTop = messages.scrollHeight; try { const history = []; messages.querySelectorAll('div').forEach(msg => { const txt = msg.textContent.trim(); if (txt && !txt.includes('Thinking...') && !txt.includes('Sorry') && !txt.includes('Hello! I\'m Cypher')) { if (msg.style.alignSelf === 'flex-end') history.push({ role: 'user', content: txt }); else history.push({ role: 'assistant', content: txt }); } }); const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, history: history.slice(-10) }) }), d = await r.json(); loading.remove(); const replyDiv = document.createElement('div'); replyDiv.style.cssText = 'padding:10px 14px;background:var(--accent-dim);border-radius:12px;font-size:12px;align-self:flex-start;max-width:85%;line-height:1.6'; replyDiv.innerHTML = d.reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--accent);text-decoration:underline" target="_blank">$1</a>').replace(/\n/g, '<br>'); messages.appendChild(replyDiv); if (d.action) { setTimeout(() => { if (d.action.type === 'scroll') { const targets = { home: 0, materials: 'materials', projects: 'projects', about: 'about', contact: 'contact', bottom: document.body.scrollHeight }, t = targets[d.action.target]; if (typeof t === 'number') window.scrollTo({ top: t, behavior: 'smooth' }); else if (t) { const el = document.getElementById(t) || document.querySelector(`.${t}-section`); if (el) el.scrollIntoView({ behavior: 'smooth' }); } } else if (d.action.type === 'navigate') window.location.href = d.action.target; }, 500); } } catch (e) { loading.remove(); messages.innerHTML += '<div style="padding:10px 14px;background:rgba(239,68,68,0.1);border-radius:12px;font-size:12px;align-self:flex-start">Sorry, something went wrong.</div>'; } messages.scrollTop = messages.scrollHeight; }
    send.addEventListener('click', sendMsg); input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(); });
}

function initScrollAnimations() { if (!window.gsap || !window.ScrollTrigger) return; gsap.registerPlugin(ScrollTrigger); gsap.utils.toArray('.category-card, .project-card, .material-row, .stat-item, .section-header').forEach((el, i) => { gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 90%' }, opacity: 0, y: 40, duration: 0.8, delay: i * 0.05, ease: 'power3.out' }); }); }

function initSmoothScroll() { document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) { const t = document.querySelector(this.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } })); }

function showToast(msg, type = 'info') { const existing = document.querySelector('.toast'); if (existing) existing.remove(); const toast = document.createElement('div'); toast.className = `toast toast-${type}`; toast.textContent = msg; document.body.appendChild(toast); setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000); }

function esc(str) { if (!str) return ''; const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }