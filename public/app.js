const API = window.location.origin;
let currentPage = 1, totalPages = 1, currentCategory = 'all', currentExamType = 'all', currentProjectStatus = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initTelegramPopup();
    initNavbar();
    initMobileMenu();
    if (document.getElementById('hc')) initHero3D();
    if (document.querySelector('.stats-bar')) loadStats();
    if (document.getElementById('cg')) loadCategories();
    if (document.getElementById('fp')) loadFeaturedProjects();
    if (document.getElementById('projectsGrid')) { loadProjects(); initProjectFilters(); }
    if (document.getElementById('materialsList')) { loadMaterials(); initMaterialFilters(); initCategoryPills(); }
    if (document.getElementById('materialsSearch')) initMaterialSearch();
    if (document.getElementById('contactForm')) initContactForm();
    if (document.getElementById('lm')) loadLatestMaterials();
    initAIChat();
    initScrollAnimations();
    initSmoothScroll();
    initDownloadToast();
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
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 0), new THREE.MeshPhysicalMaterial({ color: 0xc9a668, metalness: 0.7, roughness: 0.15, transparent: true, opacity: 0.55, flatShading: true, clearcoat: 0.6 }));
    group.add(core);
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.22, 0), new THREE.MeshBasicMaterial({ color: 0xe8d5a3, wireframe: true, transparent: true, opacity: 0.25 }));
    group.add(shell);
    const nodeCount = 60, radius = 2.3, nodes = [];
    for (let i = 0; i < nodeCount; i++) { const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = radius + (Math.random() - 0.5) * 0.6; nodes.push(new THREE.Vector3(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph))); }
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
    if (window.gsap && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); gsap.to(group.scale, { scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }, x: 0.5, y: 0.5, z: 0.5, ease: 'none' }); gsap.to('#hc', { scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }, opacity: 0, y: 150 }); }
}

async function loadStats() {
    try { const r = await fetch('/api/stats'), d = await r.json(); animateValue('sm', 0, d.materials, 1500); animateValue('sc', 0, d.categories, 1500); animateValue('sp', 0, d.projects, 1500); animateValue('sd', 0, d.downloads, 1500); } catch (e) {}
}

function animateValue(id, start, end, duration) {
    const el = document.getElementById(id); if (!el) return;
    const st = performance.now();
    (function upd(ct) { const p = Math.min((ct - st) / duration, 1), v = Math.floor(start + (end - start) * (1 - Math.pow(1 - p, 3))); el.textContent = v.toLocaleString(); if (p < 1) requestAnimationFrame(upd); })(st);
}

async function initCategoryPills() {
    const box = document.getElementById('categoryFilters'); if (!box) return;
    if (box.dataset.loaded === '1') return;
    try {
        const cats = await (await fetch('/api/categories')).json();
        if (!Array.isArray(cats)) return;
        cats.forEach(c => {
            if (box.querySelector(`[data-slug="${c.slug}"]`)) return;
            const btn = document.createElement('button');
            btn.className = 'filter-pill material-filter-category';
            btn.dataset.slug = c.slug;
            btn.dataset.category = c.slug;
            btn.textContent = c.name;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.material-filter-category').forEach(x => x.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = c.slug;
                currentPage = 1;
                loadMaterials();
                const tt = document.getElementById('currentCategoryTitle'), dd = document.getElementById('currentCategoryDesc');
                if (tt) tt.textContent = c.name;
                if (dd) dd.textContent = c.description || 'Browse materials in this category.';
                try { history.pushState({}, '', '/materials?category=' + c.slug); } catch (e) {}
            });
            box.appendChild(btn);
        });
        box.dataset.loaded = '1';
        const urlParams = new URLSearchParams(location.search), ac = urlParams.get('category');
        if (ac) {
            const active = box.querySelector(`[data-slug="${ac}"]`);
            if (active) { box.querySelectorAll('.material-filter-category').forEach(x => x.classList.remove('active')); active.classList.add('active'); currentCategory = ac; }
        }
    } catch (e) {}
}

async function loadCategories() {
    const grid = document.getElementById('cg'); if (!grid) return;
    try { const cats = await (await fetch('/api/categories')).json(); grid.innerHTML = cats.length ? cats.map(c => `<a href="/materials?category=${c.slug}" class="category-card"><div class="category-icon"><i class="fas fa-${c.icon || 'folder'}"></i></div><h3>${esc(c.name)}</h3><p>${esc(c.description || 'Browse materials')}</p><span class="category-count">Explore →</span></a>`).join('') : '<div class="empty-state"><i class="fas fa-folder-open"></i><h3>No categories</h3></div>'; } catch (e) { grid.innerHTML = '<div class="empty-state"><p>Failed to load.</p></div>'; }
}

async function openProjectModal(slug) {
    if (!slug || slug === 'undefined') return;
    try {
        const res = await fetch(`/api/projects/${slug}`); if (!res.ok) { showToast('Project not found', 'error'); return; }
        const p = await res.json(); if (p.error) { showToast('Project not found', 'error'); return; }
        const sb = s => ({ 'live': 'status-live', 'in-progress': 'status-in-progress', 'completed': 'status-completed', 'planning': 'status-planning', 'on-hold': 'status-on-hold', 'disabled': 'status-disabled' }[s] || '');
        const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
        overlay.innerHTML = `<div class="modal" style="max-width:650px"><button class="modal-close">&times;</button>${p.thumbnail ? `<img src="${p.thumbnail}" alt="${esc(p.title)}" style="width:100%;max-height:300px;object-fit:cover;border-radius:var(--radius);margin-bottom:20px">` : ''}<span class="project-status ${sb(p.status)}" style="margin-bottom:12px;display:inline-block">${(p.status || 'planning').replace('-', ' ')}</span><h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:12px">${esc(p.title)}</h2><p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">${esc(p.description || '')}</p>${p.longDescription ? `<p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">${esc(p.longDescription)}</p>` : ''}${p.progress > 0 ? `<div style="margin-bottom:20px"><div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px"><span style="color:var(--text-dim)">Progress</span><span style="color:var(--accent)">${p.progress}%</span></div><div class="progress-bar-container"><div class="progress-bar" style="width:${p.progress}%"></div></div></div>` : ''}${p.techStack && p.techStack.length ? `<div style="margin-bottom:20px"><h4 style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-bottom:8px">Tech Stack</h4><div style="display:flex;gap:6px;flex-wrap:wrap">${p.techStack.map(t => `<span class="tech-tag">${esc(t)}</span>`).join('')}</div></div>` : ''}<div style="display:flex;gap:16px;margin-bottom:20px;font-size:12px;color:var(--text-dim)"><span><i class="fas fa-eye"></i> ${p.views || 0} views</span><span>Created: ${new Date(p.createdAt).toLocaleDateString()}</span></div><div style="display:flex;gap:10px;flex-wrap:wrap">${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fab fa-github"></i> View Code</a>` : ''}<button class="btn btn-outline modal-close-btn">Close</button></div></div>`;
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
        const d = await (await fetch('/api/projects?limit=3')).json(), projects = d.projects || [];
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
    return `<div class="project-card" data-slug="${p.slug || ''}" style="cursor:pointer">${p.thumbnail ? `<img src="${p.thumbnail}" alt="${esc(p.title)}" class="project-thumbnail" loading="lazy">` : `<div class="project-thumbnail-placeholder"><i class="fas fa-code"></i></div>`}<div class="project-body"><h3>${esc(p.title)}</h3><p>${esc(p.description || '').substring(0, 120)}${(p.description || '').length > 120 ? '...' : ''}</p><div class="project-meta"><div class="project-tech">${(p.techStack || []).slice(0, 3).map(t => `<span class="tech-tag">${esc(t)}</span>`).join('')}</div><span class="project-status ${sb(p.status)}">${(p.status || 'planning').replace('-', ' ')}</span></div>${p.progress > 0 ? `<div class="progress-bar-container"><div class="progress-bar" style="width:${p.progress}%"></div></div>` : ''}</div></div>`;
}

function initProjectFilters() { document.querySelectorAll('.project-filter').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('.project-filter').forEach(x => x.classList.remove('active')); this.classList.add('active'); currentProjectStatus = this.dataset.status; currentPage = 1; loadProjects(); })); }

async function loadMaterials() {
    const list = document.getElementById('materialsList'); if (!list) return;
    list.innerHTML = '<div class="empty-state"><p>Loading...</p></div>';
    try {
        let url = `/api/materials?page=${currentPage}&limit=20`;
        if (currentCategory !== 'all' && currentCategory) url += `&category=${encodeURIComponent(currentCategory)}`;
        if (currentExamType !== 'all') url += `&examType=${currentExamType}`;
        const si = document.getElementById('materialsSearch'); if (si?.value.trim()) url += `&search=${encodeURIComponent(si.value.trim())}`;
        const d = await (await fetch(url)).json(); totalPages = d.pages;
        if (!d.materials.length) { list.innerHTML = '<div class="empty-state"><i class="fas fa-file-alt"></i><h3>No materials</h3></div>'; return; }
        list.innerHTML = d.materials.map((m, i) => renderMaterialRow(m, i)).join('');
        attachMaterialEvents();
        renderPagination('materialsPagination', d.page, d.pages);
    } catch (e) { list.innerHTML = '<div class="empty-state"><p>Failed to load.</p></div>'; }
}

function renderMaterialRow(m, i) {
    const isLink = m.type === 'link' || m.storage === 'external-link';
    const isPdf = m.type === 'pdf' && (m.fileUrl || m.fileId);
    const hasFile = m.fileUrl || m.fileId;
    const typeLabel = m.type || 'note';
    const path = m.customPath ? `/${m.customPath}` : `/materials?open=${m.slug}`;
    const updated = m.updatedAt && m.createdAt && (new Date(m.updatedAt).getTime() - new Date(m.createdAt).getTime() > 60000) ? `<span style="color:var(--accent);font-size:11px"><i class="fas fa-sync"></i> Updated ${new Date(m.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>` : '';
    const action = isLink
        ? (m.fileUrl ? `<a class="btn btn-outline btn-sm open-btn" href="${m.fileUrl}" target="_blank" rel="noopener noreferrer" title="Open link"><i class="fas fa-external-link-alt"></i></a>` : '')
        : (isPdf
            ? `<a class="btn btn-outline btn-sm" href="/api/materials/id/${m._id}/view" target="_blank" rel="noopener" title="Open PDF"><i class="fas fa-eye"></i></a><button class="btn btn-outline btn-sm dl-btn" data-id="${m._id}" data-filename="${esc(m.fileName || 'download')}" title="Download"><i class="fas fa-download"></i></button>`
            : (hasFile ? `<button class="btn btn-outline btn-sm dl-btn" data-id="${m._id}" data-filename="${esc(m.fileName || 'download')}" title="Download"><i class="fas fa-download"></i></button>` : ''));
    return `<div class="material-row" data-slug="${m.slug || ''}" data-path="${esc(m.customPath || '')}" data-share="${m.customPath || m.shareableLink || m.slug}" data-title="${esc(m.title)}" style="animation-delay:${i * 0.05}s"><div class="material-info"><h3>${esc(m.title)}</h3><div class="meta"><span>${esc(m.category?.name || 'General')}</span>${m.subject ? `<span>${esc(m.subject)}</span>` : ''}${m.grade ? `<span>Grade ${esc(m.grade)}</span>` : ''}${m.customPath ? `<span style="font-family:var(--font-mono);color:var(--accent)">${path}</span>` : ''}${updated}</div></div><span class="material-type-badge badge-${typeLabel}">${typeLabel}</span><span class="material-date">${new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span><div style="display:flex;gap:6px">${action}<button class="btn btn-outline btn-sm share-btn" data-share="${m.customPath || m.shareableLink || m.slug}" data-title="${esc(m.title)}" title="Share"><i class="fas fa-share-alt"></i></button></div></div>`;
}

function attachMaterialEvents() {
    document.querySelectorAll('#materialsList .material-row, #lm .material-row').forEach(row => { row.addEventListener('click', function(e) { if (e.target.closest('button') || e.target.closest('a')) return; const slug = this.dataset.slug; if (slug && slug !== 'undefined' && slug !== 'null') openMaterialModal(slug); }); });
    document.querySelectorAll('.dl-btn').forEach(b => b.addEventListener('click', function(e) { e.stopPropagation(); downloadMaterial(this.dataset.id, this.dataset.filename); }));
    document.querySelectorAll('.open-btn').forEach(b => b.addEventListener('click', function(e) { e.stopPropagation(); showDownloadToast('Opening link…'); }));
    document.querySelectorAll('.share-btn').forEach(b => b.addEventListener('click', function(e) { e.stopPropagation(); const sharePath = this.dataset.share; const title = this.dataset.title || 'Study material'; showShareSheet(sharePath, title); }));
}

function initMaterialFilters() {
    document.querySelectorAll('.material-filter-category').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('.material-filter-category').forEach(x => x.classList.remove('active')); this.classList.add('active'); currentCategory = this.dataset.slug || this.dataset.category; currentPage = 1; loadMaterials(); }));
    document.querySelectorAll('.material-filter-exam').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('.material-filter-exam').forEach(x => x.classList.remove('active')); this.classList.add('active'); currentExamType = this.dataset.examtype; currentPage = 1; loadMaterials(); }));
}

function initMaterialSearch() { const si = document.getElementById('materialsSearch'); if (!si) return; let t; si.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { currentPage = 1; loadMaterials(); }, 400); }); }

async function loadLatestMaterials() {
    const list = document.getElementById('lm'); if (!list) return;
    try { const d = await (await fetch('/api/materials?limit=5')).json(); if (!d.materials?.length) { list.innerHTML = '<div class="empty-state"><p>No materials yet.</p></div>'; return; } list.innerHTML = d.materials.map((m, i) => renderMaterialRow(m, i)).join(''); attachMaterialEvents(); } catch (e) { list.innerHTML = ''; }
}

async function openMaterialModal(slug) {
    if (!slug || slug === 'undefined' || slug === 'null') return;
    try {
        const m = await (await fetch(`/api/materials/${encodeURIComponent(slug)}`)).json(); if (m.error) return showToast('Not found', 'error');
        const isLink = m.type === 'link' || m.storage === 'external-link';
        const isPdf = m.type === 'pdf' && (m.fileUrl || m.fileId);
        const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
        const sharePath = m.customPath || m.shareableLink || m.slug;
        const updatedBadge = m.updatedAt && m.createdAt && (new Date(m.updatedAt).getTime() - new Date(m.createdAt).getTime() > 60000) ? `<span><i class="fas fa-sync"></i> Updated ${new Date(m.updatedAt).toLocaleDateString()}</span>` : '';
        let action = '';
        if (isLink && m.fileUrl) action = `<a class="btn btn-primary" href="${m.fileUrl}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Open Link</a>`;
        else if (isPdf) action = `<a class="btn btn-primary" href="/api/materials/id/${m._id}/view" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Open PDF</a><button class="btn btn-outline md-btn" data-id="${m._id}" data-filename="${esc(m.fileName || 'download')}"><i class="fas fa-download"></i> Download</button>`;
        else if (m.fileUrl || m.fileId) action = `<button class="btn btn-primary md-btn" data-id="${m._id}" data-filename="${esc(m.fileName || 'download')}"><i class="fas fa-download"></i> Download</button>`;
        overlay.innerHTML = `<div class="modal"><button class="modal-close">&times;</button><span class="material-type-badge badge-${m.type || 'note'}" style="margin-bottom:16px;display:inline-block">${m.type || 'note'}</span><h2 style="font-family:var(--font-display);font-size:26px;margin-bottom:12px">${esc(m.title)}</h2><p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">${esc(m.description)}</p><div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px;font-size:12px;color:var(--text-secondary)">${m.category ? `<span><strong>Category:</strong> ${esc(m.category.name)}</span>` : ''}${m.subject ? `<span><strong>Subject:</strong> ${esc(m.subject)}</span>` : ''}${m.grade ? `<span><strong>Grade:</strong> ${esc(m.grade)}</span>` : ''}</div>${m.customPath ? `<div style="font-family:var(--font-mono);font-size:11px;color:var(--accent);margin-bottom:14px">Path: <strong>/${esc(m.customPath)}</strong></div>` : ''}<div style="display:flex;gap:12px;margin-bottom:16px;font-size:11px;color:var(--text-dim)"><span><i class="fas fa-eye"></i> ${m.views || 0}</span><span><i class="fas fa-download"></i> ${m.downloads || 0}</span><span>${new Date(m.createdAt).toLocaleDateString()}</span>${updatedBadge}</div><div style="display:flex;gap:10px;flex-wrap:wrap">${action}<button class="btn btn-outline modal-share-btn" data-share="${esc(sharePath)}" data-title="${esc(m.title)}"><i class="fas fa-share-alt"></i> Share</button><button class="btn btn-outline mc-btn">Close</button></div></div>`;
        document.body.appendChild(overlay); document.body.style.overflow = 'hidden';
        const close = () => { overlay.remove(); document.body.style.overflow = ''; };
        overlay.querySelector('.modal-close').addEventListener('click', close); overlay.querySelector('.mc-btn').addEventListener('click', close);
        overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function esc2(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc2); } });
        overlay.querySelectorAll('.md-btn').forEach(btn => btn.addEventListener('click', () => downloadMaterial(btn.dataset.id, btn.dataset.filename)));
        const ob = overlay.querySelector('a[href*="/view"]'); if (ob) ob.addEventListener('click', () => showDownloadToast('Opening PDF…'));
        const sb = overlay.querySelector('.modal-share-btn'); if (sb) sb.addEventListener('click', function() { showShareSheet(this.dataset.share, this.dataset.title); });
    } catch (e) { showToast('Failed to load', 'error'); }
}


function downloadMaterial(id, filename) {
    showDownloadToast('Your download will start shortly…');
    const a = document.createElement('a');
    a.href = `/api/materials/id/${id}/download`;
    a.download = filename || 'download';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function renderPagination(cid, page, pages) {
    const c = document.getElementById(cid); if (!c || pages <= 1) { if (c) c.innerHTML = ''; return; }
    let h = `<button class="page-btn" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>`;
    for (let i = 1; i <= pages; i++) { if (i === 1 || i === pages || (i >= page - 2 && i <= page + 2)) h += `<button class="page-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`; else if (i === page - 3 || i === page + 3) h += '<span class="page-btn" style="border:none;cursor:default;color:var(--text-dim)">...</span>'; }
    h += `<button class="page-btn" data-page="${page + 1}" ${page === pages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>`; c.innerHTML = h;
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
            if (r.ok) { showToast('Message sent!', 'success'); f.reset(); }
            else if (r.status === 429) { showToast(data.error || "You've reached your daily message limit. Try again tomorrow.", 'error'); }
            else { showToast(data.error || 'Failed to send message', 'error'); }
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

function initDownloadToast() {
    document.addEventListener('click', function(e) {
        const a = e.target.closest('a[href*="/download"]');
        if (a) showDownloadToast('Your download will start shortly…');
    }, true);
}

function showDownloadToast(msg) {
    let t = document.getElementById('dl-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'dl-toast';
        t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:#141317;color:#e8e4dd;border:1px solid rgba(201,166,104,0.4);padding:12px 20px;border-radius:12px;font-size:13px;z-index:100000;opacity:0;transition:all .3s;box-shadow:0 10px 30px rgba(0,0,0,0.5);font-family:Inter,sans-serif;pointer-events:none';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
    clearTimeout(t._h);
    t._h = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; }, 3000);
}

function showShareSheet(sharePath, title) {
    const fullUrl = `${window.location.origin}${sharePath.startsWith('/') ? sharePath : '/' + sharePath}`;
    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        navigator.share({ title: title || 'Study material', text: title || 'Check this out on CODE & CLASSROOM', url: fullUrl })
            .then(() => showDownloadToast('Shared!'))
            .catch(() => {});
        return;
    }
    const existing = document.getElementById('share-sheet');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.id = 'share-sheet';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:100001;display:flex;align-items:flex-end;justify-content:center;padding:0;animation:fadeIn .25s ease';
    const enc = encodeURIComponent(fullUrl);
    const encText = encodeURIComponent((title || 'Study material') + ' — CODE & CLASSROOM');
    const apps = [
        { name: 'WhatsApp', icon: 'fab fa-whatsapp', color: '#25D366', url: `https://wa.me/?text=${encText}%20${enc}` },
        { name: 'Telegram', icon: 'fab fa-telegram', color: '#229ED9', url: `https://t.me/share/url?url=${enc}&text=${encText}` },
        { name: 'X / Twitter', icon: 'fab fa-twitter', color: '#e8e4dd', url: `https://twitter.com/intent/tweet?url=${enc}&text=${encText}` },
        { name: 'Facebook', icon: 'fab fa-facebook', color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${enc}` },
        { name: 'Reddit', icon: 'fab fa-reddit', color: '#FF4500', url: `https://www.reddit.com/submit?url=${enc}&title=${encText}` },
        { name: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0A66C2', url: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}` },
        { name: 'Email', icon: 'fas fa-envelope', color: '#c9a668', url: `mailto:?subject=${encText}&body=${enc}` }
    ];
    const grid = apps.map(a => `<a href="${a.url}" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;gap:8px;text-decoration:none;color:var(--text);padding:12px 8px;border-radius:12px;transition:background .2s" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'"><div style="width:52px;height:52px;border-radius:50%;background:${a.color}22;border:1px solid ${a.color}55;display:flex;align-items:center;justify-content:center;font-size:22px;color:${a.color}"><i class="${a.icon}"></i></div><span style="font-size:11px;color:var(--text-secondary);text-align:center">${a.name}</span></a>`).join('');
    overlay.innerHTML = `<div style="background:#141317;border:1px solid rgba(255,255,255,0.08);border-top-left-radius:20px;border-top-right-radius:20px;width:100%;max-width:520px;padding:20px 24px 28px;box-shadow:0 -20px 60px rgba(0,0,0,0.5);animation:slideUp .3s cubic-bezier(0.19,1,0.22,1)"><div style="width:40px;height:4px;background:rgba(255,255,255,0.15);border-radius:2px;margin:0 auto 16px"></div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h3 style="font-family:var(--font-display);font-size:16px;color:var(--text);margin:0">Share this material</h3><button id="share-close" style="background:none;border:none;color:#5c5954;font-size:22px;cursor:pointer;line-height:1">&times;</button></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px">${grid}</div><div style="display:flex;gap:8px;background:#0d0c0f;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:8px 8px 8px 14px"><input readonly value="${fullUrl.replace(/"/g, '&quot;')}" id="share-url-input" style="flex:1;background:transparent;border:none;color:#a8a39a;font-size:12px;outline:none;font-family:JetBrains Mono,monospace"><button id="share-copy" style="padding:8px 16px;background:#c9a668;color:#0d0c0f;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap">Copy</button></div></div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    overlay.querySelector('#share-close').addEventListener('click', close);
    overlay.querySelector('#share-copy').addEventListener('click', () => {
        const input = overlay.querySelector('#share-url-input');
        input.select();
        navigator.clipboard.writeText(fullUrl).then(() => {
            showDownloadToast('Link copied to clipboard');
            overlay.querySelector('#share-copy').textContent = 'Copied!';
            setTimeout(close, 700);
        }).catch(() => {
            try { document.execCommand('copy'); showDownloadToast('Link copied to clipboard'); setTimeout(close, 700); } catch (e) { showDownloadToast('Failed to copy'); }
        });
    });
    document.addEventListener('keydown', function esc3(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc3); } });
}


function initTelegramPopup() {
    if (localStorage.getItem('telegram-popup-dismissed') === '1') return;
    fetch('/api/admin/telegram-info').then(r => r.json()).then(info => {
        if (!info.channelUrl) return;
        var popup = document.createElement('div');
        popup.id = 'tg-popup';
        popup.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(120%);max-width:460px;width:calc(100% - 32px);background:#141317;border:1px solid rgba(201,166,104,0.35);border-radius:16px;padding:16px 18px;box-shadow:0 20px 60px rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;gap:14px;transition:transform .4s cubic-bezier(0.19,1,0.22,1);font-family:Inter,sans-serif';
        popup.innerHTML = '<div style="width:44px;height:44px;flex-shrink:0;border-radius:50%;background:rgba(201,166,104,0.15);display:flex;align-items:center;justify-content:center;color:#c9a668;font-size:20px"><i class="fab fa-telegram"></i></div><div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;color:#e8e4dd;margin-bottom:2px">Join Our Telegram</div><div style="font-size:11px;color:#8a8780;line-height:1.4">Get updates & latest uploads first</div></div><a href="' + info.channelUrl + '" target="_blank" rel="noopener" style="padding:8px 14px;background:#c9a668;color:#0d0c0f;border-radius:20px;text-decoration:none;font-size:11px;font-weight:700;white-space:nowrap">Join</a><button id="tg-close" style="background:none;border:none;color:#5c5954;font-size:18px;cursor:pointer;padding:0 4px;line-height:1">&times;</button>';
        document.body.appendChild(popup);
        requestAnimationFrame(() => { popup.style.transform = 'translateX(-50%) translateY(0)'; });
        popup.querySelector('#tg-close').addEventListener('click', () => {
            popup.style.transform = 'translateX(-50%) translateY(120%)';
            localStorage.setItem('telegram-popup-dismissed', '1');
            setTimeout(() => popup.remove(), 400);
        });
        popup.querySelector('a').addEventListener('click', () => {
            localStorage.setItem('telegram-popup-dismissed', '1');
        });
    }).catch(() => {});
}


function showToast(msg, type = 'info') { const existing = document.querySelector('.toast'); if (existing) existing.remove(); const toast = document.createElement('div'); toast.className = `toast toast-${type}`; toast.textContent = msg; document.body.appendChild(toast); setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000); }

function esc(str) { if (!str) return ''; const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }