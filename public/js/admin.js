(function () {
    var A = window.location.origin, sec = 'dashboard', editId = null, logState = { page: 1, type: 'all', search: '', selected: new Set(), items: [] };

    async function checkAuth() {
        try {
            var r = await fetch(A + '/auth/status');
            var d = await r.json();
            if (!d.authenticated) {
                document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0d0c0f;color:#e8e4dd;font-family:Inter,sans-serif;text-align:center;padding:40px"><div><div style="font-family:Fraunces,serif;font-size:24px;margin-bottom:16px;color:#c9a668">C&amp;C Admin</div><p style="color:#8a8780;margin-bottom:32px">Please sign in to continue.</p><a href="/auth/google" style="display:inline-flex;align-items:center;gap:10px;padding:14px 28px;background:#fff;color:#1a1a1a;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Sign in with Google</a></div></div>';
                return false;
            }
            if (!d.verified) { window.location.href = '/admin-verify'; return false; }
            return true;
        } catch (e) {
            document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0d0c0f;color:#e8e4dd;font-family:Inter,sans-serif"><p>Cannot connect to server.</p></div>';
            return false;
        }
    }

    function switchSection(n) {
        sec = n;
        document.querySelectorAll('.admin-nav button[data-section]').forEach(function (t) { t.classList.remove('active'); });
        var btn = document.querySelector('.admin-nav button[data-section="' + n + '"]');
        if (btn) btn.classList.add('active');
        document.querySelectorAll('.admin-section').forEach(function (t) { t.classList.remove('active'); });
        var el = document.getElementById('sec-' + n);
        if (el) el.classList.add('active');
        var titles = { dashboard: 'Dashboard', categories: 'Categories', projects: 'Projects', materials: 'Materials', messages: 'Messages', broadcast: 'Broadcast', logs: 'Logs', downloads: 'Downloads' };
        var pt = document.getElementById('pageTitle');
        if (pt) pt.textContent = titles[n] || 'Admin';
        if (n === 'dashboard') loadDashboard();
        else if (n === 'categories') loadCategories();
        else if (n === 'projects') loadProjects();
        else if (n === 'materials') loadMaterials();
        else if (n === 'messages') loadMessages();
        else if (n === 'broadcast') loadBroadcast();
        else if (n === 'logs') loadLogs();
        else if (n === 'downloads') loadDownloadLogs();
        var sb = document.querySelector('.admin-sidebar');
        if (sb) sb.classList.remove('open');
    }

    async function loadDashboard() {
        try {
            var t = await (await fetch(A + '/api/admin/stats')).json();
            document.getElementById('dashboardStats').innerHTML =
                '<div class="stat-card"><div class="stat-value">' + (t.materials || 0) + '</div><div class="stat-label">Materials</div></div>' +
                '<div class="stat-card"><div class="stat-value">' + (t.categories || 0) + '</div><div class="stat-label">Categories</div></div>' +
                '<div class="stat-card"><div class="stat-value">' + (t.projects || 0) + '</div><div class="stat-label">Projects</div></div>' +
                '<div class="stat-card"><div class="stat-value">' + (t.downloads || 0) + '</div><div class="stat-label">Downloads</div></div>' +
                '<div class="stat-card"><div class="stat-value">' + (t.views || 0) + '</div><div class="stat-label">Views</div></div>' +
                '<div class="stat-card"><div class="stat-value">' + (t.unreadMessages || 0) + '</div><div class="stat-label">Unread</div></div>';
            var rm = t.recentMaterials || [];
            document.getElementById('recentMaterialsBody').innerHTML = rm.length
                ? rm.map(function (m) { return '<tr><td>' + esc(m.title) + '</td><td>' + esc(m.category && m.category.name ? m.category.name : '—') + '</td><td><span class="badge badge-gold">' + (m.type || 'note') + '</span></td><td>' + new Date(m.createdAt).toLocaleDateString() + '</td></tr>'; }).join('')
                : '<tr class="empty-row"><td colspan="4">No materials</td></tr>';
            try {
                var dbStats = await (await fetch(A + '/api/admin/db-stats')).json();
                var spaceCard = document.createElement('div');
                spaceCard.className = 'stat-card';
                spaceCard.innerHTML = '<div class="stat-value">' + (dbStats.totalSizeMB || 0) + ' MB</div><div class="stat-label">DB Space Used</div>';
                document.getElementById('dashboardStats').appendChild(spaceCard);
                var logCard = document.createElement('div');
                logCard.className = 'stat-card';
                logCard.innerHTML = '<div class="stat-value">' + (dbStats.logCount || 0) + '</div><div class="stat-label">Stored Logs</div>';
                document.getElementById('dashboardStats').appendChild(logCard);
            } catch (e) {}
        } catch (e) { toast('Failed to load dashboard', 'error'); }
    }

    async function loadCategories() {
        try {
            var t = await (await fetch(A + '/api/categories?all=true')).json();
            var list = Array.isArray(t) ? t : [];
            document.getElementById('categoriesBody').innerHTML = list.length
                ? list.map(function (c) { return '<tr><td>' + esc(c.name) + '</td><td style="font-family:var(--font-mono);font-size:10px">' + c.slug + '</td><td>' + c.order + '</td><td><button class="btn btn-sm" data-edit="' + c._id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + c._id + '">Del</button></td></tr>'; }).join('')
                : '<tr class="empty-row"><td colspan="4">No categories</td></tr>';
            document.querySelectorAll('#categoriesBody [data-edit]').forEach(function (b) { b.addEventListener('click', function () { openModal('category', b.dataset.edit); }); });
            document.querySelectorAll('#categoriesBody [data-del]').forEach(function (b) { b.addEventListener('click', function () { deleteItem('categories', b.dataset.del); }); });
        } catch (e) { toast('Failed', 'error'); }
    }

    async function loadProjects() {
        try {
            var t = await (await fetch(A + '/api/projects?limit=100')).json();
            var list = t.projects || [];
            var badges = { 'live': 'badge-green', 'in-progress': 'badge-yellow', 'completed': 'badge-blue', 'planning': 'badge-gold', 'on-hold': 'badge-orange', 'disabled': 'badge-red' };
            document.getElementById('projectsBody').innerHTML = list.length
                ? list.map(function (p) { return '<tr><td>' + esc(p.title) + '</td><td><span class="badge ' + (badges[p.status] || 'badge-gold') + '">' + (p.status || 'planning').replace('-', ' ') + '</span></td><td>' + (p.progress || 0) + '%</td><td>' + (p.views || 0) + '</td><td><button class="btn btn-sm" data-edit="' + p._id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + p._id + '">Del</button></td></tr>'; }).join('')
                : '<tr class="empty-row"><td colspan="5">No projects</td></tr>';
            document.querySelectorAll('#projectsBody [data-edit]').forEach(function (b) { b.addEventListener('click', function () { openModal('project', b.dataset.edit); }); });
            document.querySelectorAll('#projectsBody [data-del]').forEach(function (b) { b.addEventListener('click', function () { deleteItem('projects', b.dataset.del); }); });
        } catch (e) { toast('Failed', 'error'); }
    }

    async function loadMaterials() {
        try {
            var t = await (await fetch(A + '/api/materials?limit=100')).json();
            var list = t.materials || [];
            document.getElementById('materialsBody').innerHTML = list.length
                ? list.map(function (m) {
                    var isPdf = m.type === 'pdf' && (m.fileUrl || m.fileId);
                    var viewBtn = isPdf ? '<a class="btn btn-sm" href="/api/materials/id/' + m._id + '/view" target="_blank" rel="noopener" title="Open PDF"><i class="fas fa-eye"></i></a> ' : '';
                    return '<tr><td>' + esc(m.title) + '<div style="font-family:var(--font-mono);font-size:10px;color:var(--accent);margin-top:2px">/' + (m.customPath || '—') + '</div></td><td>' + esc(m.category && m.category.name ? m.category.name : '—') + '</td><td><span class="badge badge-gold">' + (m.type || 'note') + '</span></td><td>' + (m.downloads || 0) + '</td><td>' + viewBtn + '<button class="btn btn-sm" data-edit="' + m._id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + m._id + '">Del</button></td></tr>';
                }).join('')
                : '<tr class="empty-row"><td colspan="5">No materials</td></tr>';
            document.querySelectorAll('#materialsBody [data-edit]').forEach(function (b) { b.addEventListener('click', function () { openModal('material', b.dataset.edit); }); });
            document.querySelectorAll('#materialsBody [data-del]').forEach(function (b) { b.addEventListener('click', function () { deleteItem('materials', b.dataset.del); }); });
            try {
                var large = await (await fetch(A + '/api/admin/large-pdfs')).json();
                var btn = document.getElementById('compressAllBtn');
                if (btn) { if (Array.isArray(large) && large.length > 0) { btn.style.display = 'inline-flex'; btn.innerHTML = '<i class="fas fa-compress"></i> Compress ' + large.length + ' Large PDF(s)'; } else { btn.style.display = 'none'; } }
            } catch (e) {}
        } catch (e) { toast('Failed', 'error'); }
    }

    async function loadMessages() {
        try {
            var t = await (await fetch(A + '/api/admin/messages')).json();
            var list = Array.isArray(t) ? t : [];
            var unread = list.filter(function (m) { return !m.isRead; }).length;
            var badge = document.getElementById('messagesBadge');
            if (badge) { if (unread > 0) { badge.textContent = unread; badge.style.display = 'flex'; } else badge.style.display = 'none'; }
            document.getElementById('messagesBody').innerHTML = list.length
                ? list.map(function (m) { return '<tr class="' + (m.isRead ? '' : 'unread-row') + '"><td><strong>' + esc(m.name) + '</strong><br><small style="color:var(--text-dim)">' + esc(m.email) + '</small></td><td>' + esc(m.subject || '—') + '</td><td>' + new Date(m.createdAt).toLocaleDateString() + '</td><td><span class="badge ' + (m.isRead ? 'badge-green' : 'badge-yellow') + '">' + (m.isRead ? 'Read' : 'New') + '</span></td><td><button class="btn btn-sm" data-view="' + m._id + '">View</button></td></tr>'; }).join('')
                : '<tr class="empty-row"><td colspan="5">No messages</td></tr>';
            document.querySelectorAll('#messagesBody [data-view]').forEach(function (b) { b.addEventListener('click', function () { viewMessage(b.dataset.view); }); });
        } catch (e) { toast('Failed', 'error'); }
    }

    async function loadDownloadLogs() {
        try {
            var t = await (await fetch(A + '/api/admin/stats')).json();
            var list = t.recentDownloads || [];
            document.getElementById('downloadLogsBody').innerHTML = list.length
                ? list.map(function (d) { return '<tr><td>' + esc(d.material && d.material.title ? d.material.title : 'Unknown') + '</td><td style="font-family:var(--font-mono);font-size:10px">' + (d.ip || '—') + '</td><td style="font-size:10px">' + new Date(d.timestamp).toLocaleString() + '</td></tr>'; }).join('')
                : '<tr class="empty-row"><td colspan="3">No downloads</td></tr>';
        } catch (e) {}
    }

    async function loadLogs() {
        try {
            var q = new URLSearchParams();
            q.set('page', logState.page);
            q.set('type', logState.type);
            if (logState.search) q.set('search', logState.search);
            var d = await (await fetch(A + '/api/admin/logs?' + q.toString())).json();
            logState.items = d.logs || [];
            var body = document.getElementById('logsBody');
            body.innerHTML = logState.items.length
                ? logState.items.map(function (l) {
                    var typeClass = 'log-type-' + l.type;
                    var time = new Date(l.createdAt).toLocaleString();
                    var mat = l.material ? ' <span style="color:var(--accent);font-size:10px">· ' + esc(l.material.title) + '</span>' : '';
                    return '<tr data-logid="' + l._id + '"><td><input type="checkbox" class="log-checkbox" data-id="' + l._id + '"' + (logState.selected.has(l._id) ? ' checked' : '') + '></td><td style="font-size:11px">' + time + (l.isLocalhost ? ' <span style="color:var(--yellow);font-size:9px">LOCAL</span>' : '') + '</td><td><span class="' + typeClass + '" style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em">' + l.type.replace('_', ' ') + '</span></td><td style="font-family:var(--font-mono);font-size:11px">' + esc(l.ipMasked) + '</td><td style="font-size:11px">' + esc(l.device) + '</td><td style="font-size:11px">' + esc(l.browser) + '</td><td style="font-size:11px">' + esc(l.path || '') + mat + '</td></tr>';
                }).join('')
                : '<tr class="empty-row"><td colspan="7">No logs yet</td></tr>';
            body.querySelectorAll('.log-checkbox').forEach(function (cb) { cb.addEventListener('change', function () { if (this.checked) logState.selected.add(this.dataset.id); else logState.selected.delete(this.dataset.id); updateLogSelection(); }); });
            body.querySelectorAll('tr[data-logid]').forEach(function (row) {
                row.style.cursor = 'pointer';
                row.addEventListener('click', function (e) { if (e.target.type === 'checkbox') return; showLogDetail(row.dataset.logid); });
            });
            renderLogPagination(d.page, d.pages);
            updateLogSelection();
            var selAll = document.getElementById('logSelectAll');
            var hdr = document.getElementById('logHeaderCheck');
            if (selAll) selAll.checked = false;
            if (hdr) hdr.checked = false;
        } catch (e) { toast('Failed to load logs', 'error'); }
    }

    function renderLogPagination(page, pages) {
        var c = document.getElementById('logsPagination');
        if (!c) return;
        if (pages <= 1) { c.innerHTML = ''; return; }
        var h = '<button class="page-btn" data-page="' + (page - 1) + '" ' + (page === 1 ? 'disabled' : '') + '><i class="fas fa-chevron-left"></i></button>';
        for (var i = 1; i <= pages; i++) { if (i === 1 || i === pages || Math.abs(i - page) <= 2) h += '<button class="page-btn ' + (i === page ? 'active' : '') + '" data-page="' + i + '">' + i + '</button>'; else if (Math.abs(i - page) === 3) h += '<span style="padding:8px 4px;color:var(--text-dim)">…</span>'; }
        h += '<button class="page-btn" data-page="' + (page + 1) + '" ' + (page === pages ? 'disabled' : '') + '><i class="fas fa-chevron-right"></i></button>';
        c.innerHTML = h;
        c.querySelectorAll('.page-btn:not([disabled])').forEach(function (b) { b.addEventListener('click', function () { logState.page = parseInt(b.dataset.page); loadLogs(); }); });
    }

    function updateLogSelection() {
        var info = document.getElementById('logSelInfo');
        var btn = document.getElementById('logDeleteSelected');
        if (info) info.textContent = logState.selected.size + ' selected';
        if (btn) btn.disabled = logState.selected.size === 0;
    }

    async function showLogDetail(id) {
        try {
            var l = await (await fetch(A + '/api/admin/logs/' + id)).json();
            if (l.error) return toast(l.error, 'error');
            var html = '<h3><i class="fas fa-shield-halved" style="color:var(--accent)"></i> Log detail</h3><div class="log-detail">' +
                row('Type', '<span class="log-type-' + l.type + '" style="font-weight:600;text-transform:uppercase">' + l.type.replace('_', ' ') + '</span>') +
                row('Time', new Date(l.createdAt).toLocaleString()) +
                row('Raw IP', '<span class="ip">' + esc(l.ipRaw || '—') + '</span>') +
                row('IP hash', esc(l.ipHash || '')) +
                row('OS', esc(l.os || '—')) +
                row('Browser', esc(l.browser || '—')) +
                row('Device', esc(l.device || '—')) +
                row('Language', esc(l.lang || '—')) +
                row('Timezone', esc(l.tz || '—')) +
                row('Screen', esc(l.screen || '—')) +
                row('Path', esc(l.path || '—')) +
                row('Referrer', esc(l.referrer || '—')) +
                (l.material ? row('Material', esc(l.material.title) + ' (/' + esc(l.material.customPath || l.material.slug) + ')') : '') +
                row('User Agent', '<span style="font-size:10px">' + esc(l.ua || '') + '</span>') +
                row('Localhost', l.isLocalhost ? 'Yes' : 'No') +
                row('Expires', new Date(l.ttlAt).toLocaleDateString()) +
                '</div><div class="form-actions"><button type="button" class="btn" id="mc">Close</button></div>';
            document.getElementById('modalContent').innerHTML = html;
            document.getElementById('modalOverlay').style.display = 'flex';
            document.getElementById('mc').addEventListener('click', closeModal);
        } catch (e) { toast('Failed to load log', 'error'); }
    }

    function row(k, v) { return '<div class="log-detail-row"><div class="log-detail-key">' + k + '</div><div class="log-detail-val">' + v + '</div></div>'; }

    function renderMarkdownPreview(text) {
        var escaped = esc(text);
        return escaped.replace(/\*([^*\n]+)\*/g, '<strong style="color:var(--accent);font-weight:600">$1</strong>').replace(/_([^_\n]+)_/g, '<em style="color:var(--text-secondary)">$1</em>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">$1</a>').replace(/\n/g, '<br>');
    }

    function loadBroadcast() {
        var ta = document.getElementById('bcText');
        if (ta && !ta.dataset.bound) {
            ta.addEventListener('input', function () { var pv = document.getElementById('bcPreview'); if (pv) pv.innerHTML = this.value.trim() ? renderMarkdownPreview(this.value) : 'Nothing yet. Type a message above or load a template.'; });
            ta.dataset.bound = '1';
        }
        var pb = document.getElementById('bcPreviewBtn');
        if (pb && !pb.dataset.bound) { pb.addEventListener('click', function () { var v = document.getElementById('bcText').value.trim(); document.getElementById('bcPreview').innerHTML = v ? renderMarkdownPreview(v) : 'Nothing to preview.'; }); pb.dataset.bound = '1'; }
        var cb = document.getElementById('bcClearBtn');
        if (cb && !cb.dataset.bound) { cb.addEventListener('click', function () { document.getElementById('bcText').value = ''; document.getElementById('bcPreview').innerHTML = 'Nothing yet. Type a message above or load a template.'; document.getElementById('bcStatus').textContent = ''; }); cb.dataset.bound = '1'; }
        var sb = document.getElementById('bcSendBtn');
        if (sb && !sb.dataset.bound) {           
             sb.addEventListener('click', async function () {
                var ta = document.getElementById('bcText');
                var text = ta.value.trim();
                if (!text) return toast('Write something first', 'error');
                var asImage = document.getElementById('bcAsImage') && document.getElementById('bcAsImage').checked;
                if (!confirm((asImage ? 'Send as image card' : 'Send as text') + ' to your Telegram channel?')) return;
                var btn = this; var orig = btn.innerHTML;
                btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                try {
                    var preview = (text.match(/https?:\/\/\S+/) || [])[0] || '';
                    var body = { text: text, previewUrl: preview, asImage: asImage };
                    if (asImage) {
                        if (ta.dataset.materialId) body.materialId = ta.dataset.materialId;
                        if (ta.dataset.projectId) body.projectId = ta.dataset.projectId;
                    }
                    var r = await fetch(A + '/api/admin/broadcast', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
                    var d = await r.json();
                    var st = document.getElementById('bcStatus');
                    if (d.success) {
                        var modeLabel = d.mode === 'image' ? 'image card' : (d.mode === 'text_fallback' ? 'text (image failed)' : 'text');
                        toast('Sent as ' + modeLabel + '!', 'success');
                        if (st) st.innerHTML = '<span style="color:var(--green)"><i class="fas fa-check-circle"></i> Sent as ' + modeLabel + ' at ' + new Date().toLocaleTimeString() + ' (id ' + d.messageId + ')</span>';
                    } else {
                        toast(d.error || 'Failed to send', 'error');
                        if (st) st.innerHTML = '<span style="color:var(--red)"><i class="fas fa-exclamation-circle"></i> ' + esc(d.error || 'Failed') + '</span>';
                    }
                } catch (e) { toast('Network error', 'error'); }
                btn.disabled = false; btn.innerHTML = orig;
            });
            sb.dataset.bound = '1';
        }
        var lm = document.getElementById('bcLoadMaterialBtn');
        if (lm && !lm.dataset.bound) {
            lm.addEventListener('click', async function () {
                try {
                    var r = await fetch(A + '/api/materials?limit=1'); var d = await r.json(); var m = (d.materials || [])[0];
                    if (!m) return toast('No materials yet', 'error');
                    var p = await (await fetch(A + '/api/admin/telegram-preview-material/' + m._id)).json();
                    document.getElementById('bcText').value = p.text;
                    document.getElementById('bcText').dataset.materialId = m._id;
                    document.getElementById('bcText').dataset.projectId = ''; document.getElementById('bcPreview').innerHTML = renderMarkdownPreview(p.text); document.getElementById('bcStatus').textContent = 'Loaded: ' + m.title;
                } catch (e) { toast('Failed to load', 'error'); }
            });
            lm.dataset.bound = '1';
        }
        var lp = document.getElementById('bcLoadProjectBtn');
        if (lp && !lp.dataset.bound) {
            lp.addEventListener('click', async function () {
                try {
                    var r = await fetch(A + '/api/projects?limit=1'); var d = await r.json(); var p = (d.projects || [])[0];
                    if (!p) return toast('No projects yet', 'error');
                    var pv = await (await fetch(A + '/api/admin/telegram-preview-project/' + p._id)).json();
                    document.getElementById('bcText').value = pv.text;
                    document.getElementById('bcText').dataset.projectId = p._id;
                    document.getElementById('bcText').dataset.materialId = ''; document.getElementById('bcPreview').innerHTML = renderMarkdownPreview(pv.text); document.getElementById('bcStatus').textContent = 'Loaded: ' + p.title;
                } catch (e) { toast('Failed to load', 'error'); }
            });
            lp.dataset.bound = '1';
        }
    }

    function openModal(type, id) {
        editId = id || null;
        var content = document.getElementById('modalContent');
        var html = '';
        if (type === 'category') {
            html = '<h3>' + (id ? 'Edit' : 'Add') + ' Category</h3><form id="mf"><div class="form-group"><label>Name</label><input id="fName" required></div><div class="form-group"><label>Description</label><textarea id="fDesc" rows="2"></textarea></div><div class="form-row"><div class="form-group"><label>Icon</label><input id="fIcon" value="folder"></div><div class="form-group"><label>Color</label><input id="fColor" value="#c9a668"></div></div><div class="form-group"><label>Order</label><input type="number" id="fOrder" value="0"></div><div class="form-actions"><button type="button" class="btn" id="mc">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div></form>';
        } else if (type === 'project') {
            html = '<h3>' + (id ? 'Edit' : 'Add') + ' Project</h3><form id="mf" enctype="multipart/form-data"><div class="form-group"><label>Title</label><input id="fTitle" name="title" required></div><div class="form-group"><label>Description</label><textarea id="fDesc" name="description" rows="3" required></textarea></div><div class="form-group"><label>Category (optional)</label><select id="fCat" name="category"><option value="">None</option></select></div><div class="form-row"><div class="form-group"><label>Status</label><select id="fStatus" name="status"><option value="planning">Planning</option><option value="in-progress">In Progress</option><option value="completed">Completed</option><option value="live">Live</option><option value="on-hold">On Hold</option><option value="disabled">Disabled</option></select></div><div class="form-group"><label>Progress %</label><input type="number" id="fProgress" name="progress" value="0" min="0" max="100"></div></div><div class="form-group"><label>Tech Stack (comma separated)</label><input id="fTechStack" name="techStack" placeholder="HTML, CSS, JavaScript"></div><div class="form-row"><div class="form-group"><label>Live URL</label><input type="url" id="fLiveUrl" name="liveUrl" placeholder="https://"></div><div class="form-group"><label>GitHub URL</label><input type="url" id="fGithubUrl" name="githubUrl" placeholder="https://"></div></div><div class="form-group"><label>Thumbnail Image</label><input type="file" id="fThumbnail" name="thumbnail" accept="image/*"></div>' + (id ? '' : '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="fBroadcast" name="broadcast" value="true" checked style="width:auto"> <i class="fab fa-telegram" style="color:var(--accent)"></i> Broadcast to Telegram channel on create</label></div>') + '<div class="form-actions"><button type="button" class="btn" id="mc">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div></form>';
        } else if (type === 'material') {
            html = '<h3>' + (id ? 'Edit' : 'Add') + ' Material</h3><form id="mf" enctype="multipart/form-data"><div class="form-group"><label>Title</label><input id="fTitle" name="title" required></div><div class="form-group"><label>Custom Link Path</label><input id="fCustomPath" name="customPath" placeholder="e.g. eng-last-letter"><small style="color:var(--text-dim);font-size:11px;display:block;margin-top:6px">Leave blank to auto-generate from title. Material will be available at /eng-last-letter</small></div><div class="form-group"><label>Description</label><textarea id="fDesc" name="description" rows="2" required></textarea></div><div class="form-group"><label>Category</label><select id="fCat" name="category" required></select></div><div class="form-row"><div class="form-group"><label>Exam Type</label><select id="fExamType" name="examType"><option value="notes">Notes</option><option value="test-paper">Test Paper</option><option value="exam-paper">Exam Paper</option><option value="practice">Practice</option><option value="resource">Resource</option></select></div><div class="form-group"><label>Subject</label><input id="fSubject" name="subject"></div></div><div class="form-group"><label>Grade</label><input id="fGrade" name="grade"></div><div class="form-group"><label>File Upload</label><input type="file" id="fFile" name="file"></div><div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="fWatermark" name="addWatermark" value="true" checked style="width:auto"> Add C&amp;C Watermark</label></div><div class="form-group"><label>Or External Link</label><input type="url" id="fExternalLink" name="externalLink" placeholder="https://..."></div>' + (id ? '' : '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="fBroadcast" name="broadcast" value="true" checked style="width:auto"> <i class="fab fa-telegram" style="color:var(--accent)"></i> Broadcast to Telegram channel on create</label></div>') + '<div class="form-actions"><button type="button" class="btn" id="mc">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div></form>';
        }
        content.innerHTML = html;
        document.getElementById('modalOverlay').style.display = 'flex';
        document.getElementById('mc').addEventListener('click', closeModal);
        if (type === 'project' || type === 'material') loadCatOpts();
        if (id) loadEditData(type, id);
        document.getElementById('mf').addEventListener('submit', async function (e) {
            e.preventDefault();
            var submitBtn = this.querySelector('button[type="submit"]');
            var originalHtml = submitBtn.innerHTML;
            submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
            try { await saveForm(type); } finally { submitBtn.disabled = false; submitBtn.innerHTML = originalHtml; }
        });
        if (type === 'material' && !id) {
            var ttl = document.getElementById('fTitle'), cp = document.getElementById('fCustomPath'), auto = true;
            if (cp) cp.addEventListener('input', function () { auto = false; });
            if (ttl) ttl.addEventListener('input', function () { if (auto && cp) cp.value = ttl.value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''); });
        }
    }

    function closeModal() { document.getElementById('modalOverlay').style.display = 'none'; editId = null; }

    async function loadCatOpts() {
        try {
            var t = await (await fetch(A + '/api/categories?all=true')).json();
            var list = Array.isArray(t) ? t : [];
            var opts = list.map(function (c) { return '<option value="' + c._id + '">' + c.name + '</option>'; }).join('');
            var sel = document.getElementById('fCat'); if (sel) sel.innerHTML = '<option value="">None</option>' + opts;
        } catch (e) {}
    }

    async function loadEditData(type, id) {
        try {
            if (type === 'category') {
                var all = await (await fetch(A + '/api/categories?all=true')).json();
                var c = (Array.isArray(all) ? all : []).find(function (x) { return x._id === id; });
                if (c) { document.getElementById('fName').value = c.name || ''; document.getElementById('fDesc').value = c.description || ''; document.getElementById('fIcon').value = c.icon || 'folder'; document.getElementById('fColor').value = c.color || '#c9a668'; document.getElementById('fOrder').value = c.order || 0; }
            } else if (type === 'project') {
                var p = await (await fetch(A + '/api/projects?limit=100')).json();
                var r = (p.projects || []).find(function (x) { return x._id === id; });
                if (r) { document.getElementById('fTitle').value = r.title || ''; document.getElementById('fDesc').value = r.description || ''; if (r.category) document.getElementById('fCat').value = r.category._id || r.category || ''; document.getElementById('fStatus').value = r.status || 'planning'; document.getElementById('fProgress').value = r.progress || 0; document.getElementById('fTechStack').value = (r.techStack || []).join(', '); document.getElementById('fLiveUrl').value = r.liveUrl || ''; document.getElementById('fGithubUrl').value = r.githubUrl || ''; }
            } else if (type === 'material') {
                var m = await (await fetch(A + '/api/materials?limit=100')).json();
                var a = (m.materials || []).find(function (x) { return x._id === id; });
                if (a) { document.getElementById('fTitle').value = a.title || ''; document.getElementById('fDesc').value = a.description || ''; document.getElementById('fCustomPath').value = a.customPath || ''; if (a.category) document.getElementById('fCat').value = a.category._id || a.category || ''; document.getElementById('fExamType').value = a.examType || 'notes'; document.getElementById('fSubject').value = a.subject || ''; document.getElementById('fGrade').value = a.grade || ''; if (a.fileUrl && a.storage === 'external-link') document.getElementById('fExternalLink').value = a.fileUrl; }
            }
        } catch (e) {}
    }

    async function saveForm(type) {
        var paths = { category: '/api/admin/categories', project: '/api/admin/projects', material: '/api/admin/materials' };
        var url = A + paths[type];
        if (editId) url += '/' + editId;
        var method = editId ? 'PUT' : 'POST';
        try {
            if (type === 'category') {
                var payload = { name: (document.getElementById('fName') || {}).value ? document.getElementById('fName').value.trim() : '', description: (document.getElementById('fDesc') || {}).value ? document.getElementById('fDesc').value.trim() : '', icon: (document.getElementById('fIcon') || {}).value ? document.getElementById('fIcon').value.trim() : 'folder', color: (document.getElementById('fColor') || {}).value ? document.getElementById('fColor').value.trim() : '#c9a668', order: parseInt((document.getElementById('fOrder') || {}).value) || 0 };
                if (!payload.name) { toast('Name is required', 'error'); return; }
                var res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (res.ok) { closeModal(); loadCategories(); loadDashboard(); toast('Category saved!', 'success'); }
                else { var err = await res.json(); toast(err.error || 'Failed', 'error'); }
            } else if (type === 'project') {
                var fd = new FormData();
                var title = (document.getElementById('fTitle') || {}).value ? document.getElementById('fTitle').value.trim() : '';
                var desc = (document.getElementById('fDesc') || {}).value ? document.getElementById('fDesc').value.trim() : '';
                if (!title) { toast('Title is required', 'error'); return; }
                if (!desc) { toast('Description is required', 'error'); return; }
                fd.append('title', title); fd.append('description', desc);
                var cat = (document.getElementById('fCat') || {}).value; if (cat) fd.append('category', cat);
                fd.append('status', (document.getElementById('fStatus') || {}).value || 'planning');
                fd.append('progress', (document.getElementById('fProgress') || {}).value || '0');
                var tech = (document.getElementById('fTechStack') || {}).value ? document.getElementById('fTechStack').value.trim() : ''; if (tech) fd.append('techStack', tech);
                var live = (document.getElementById('fLiveUrl') || {}).value ? document.getElementById('fLiveUrl').value.trim() : ''; if (live) fd.append('liveUrl', live);
                var gh = (document.getElementById('fGithubUrl') || {}).value ? document.getElementById('fGithubUrl').value.trim() : ''; if (gh) fd.append('githubUrl', gh);
                var thumb = document.getElementById('fThumbnail'); if (thumb && thumb.files && thumb.files[0]) fd.append('thumbnail', thumb.files[0]);
                var bcP = document.getElementById('fBroadcast'); if (bcP && bcP.checked) fd.append('broadcast', 'true');
                var r = await fetch(url, { method: method, body: fd });
                if (r.ok) { closeModal(); loadProjects(); loadDashboard(); toast('Project saved!', 'success'); }
                else { var err2 = await r.json(); toast(err2.error || 'Failed', 'error'); }
            } else if (type === 'material') {
                var fd2 = new FormData();
                var title2 = (document.getElementById('fTitle') || {}).value ? document.getElementById('fTitle').value.trim() : '';
                var desc2 = (document.getElementById('fDesc') || {}).value ? document.getElementById('fDesc').value.trim() : '';
                var cat2 = (document.getElementById('fCat') || {}).value;
                if (!title2) { toast('Title is required', 'error'); return; }
                if (!desc2) { toast('Description is required', 'error'); return; }
                if (!cat2) { toast('Category is required', 'error'); return; }
                fd2.append('title', title2); fd2.append('description', desc2); fd2.append('category', cat2);
                fd2.append('examType', (document.getElementById('fExamType') || {}).value || 'notes');
                var cp = (document.getElementById('fCustomPath') || {}).value ? document.getElementById('fCustomPath').value.trim() : ''; if (cp) fd2.append('customPath', cp);
                var subj = (document.getElementById('fSubject') || {}).value ? document.getElementById('fSubject').value.trim() : ''; if (subj) fd2.append('subject', subj);
                var grade = (document.getElementById('fGrade') || {}).value ? document.getElementById('fGrade').value.trim() : ''; if (grade) fd2.append('grade', grade);
                var fileEl = document.getElementById('fFile'); if (fileEl && fileEl.files && fileEl.files[0]) fd2.append('file', fileEl.files[0]);
                var wm = document.getElementById('fWatermark'); fd2.append('addWatermark', (wm && wm.checked) || false);
                var ext = (document.getElementById('fExternalLink') || {}).value ? document.getElementById('fExternalLink').value.trim() : ''; if (ext) fd2.append('externalLink', ext);
                var bcM = document.getElementById('fBroadcast'); if (bcM && bcM.checked) fd2.append('broadcast', 'true');
                var res3 = await fetch(url, { method: method, body: fd2 });
                if (res3.ok) { closeModal(); loadMaterials(); loadDashboard(); toast('Material saved!', 'success'); }
                else { var err3 = await res3.json(); toast(err3.error || 'Failed', 'error'); }
            }
        } catch (e) { toast('Network error: ' + e.message, 'error'); }
    }

    async function deleteItem(type, id) {
        if (!confirm('Delete permanently? This cannot be undone.')) return;
        var paths = { categories: '/api/admin/categories', projects: '/api/admin/projects', materials: '/api/admin/materials' };
        try {
            var res = await fetch(A + paths[type] + '/' + id, { method: 'DELETE' });
            if (res.ok) { if (type === 'categories') loadCategories(); else if (type === 'projects') { loadProjects(); loadDashboard(); } else { loadMaterials(); loadDashboard(); } toast('Deleted', 'success'); }
            else { var err = await res.json(); toast(err.error || 'Failed', 'error'); }
        } catch (e) { toast('Network error', 'error'); }
    }

    async function viewMessage(id) {
        try {
            await fetch(A + '/api/admin/messages/' + id + '/read', { method: 'PUT' });
            var list = await (await fetch(A + '/api/admin/messages')).json();
            var m = (Array.isArray(list) ? list : []).find(function (x) { return x._id === id; });
            if (m) {
                document.getElementById('modalContent').innerHTML = '<h3>Message from ' + esc(m.name) + '</h3><p style="color:var(--text-dim);font-size:11px;margin-bottom:14px">' + esc(m.email) + ' · ' + new Date(m.createdAt).toLocaleString() + '</p><p style="margin-bottom:6px"><strong>Subject:</strong> ' + esc(m.subject || 'N/A') + '</p><div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:14px;line-height:1.7;color:var(--text-secondary);font-size:13px">' + esc(m.message) + '</div><div class="form-actions"><button type="button" class="btn" id="mc">Close</button></div>';
                document.getElementById('modalOverlay').style.display = 'flex';
                document.getElementById('mc').addEventListener('click', closeModal);
                loadMessages();
            }
        } catch (e) {}
    }

    async function compressLargePDFs() {
        var btn = document.getElementById('compressAllBtn');
        var large = await (await fetch(A + '/api/admin/large-pdfs')).json();
        if (!Array.isArray(large) || !large.length) return;
        if (!confirm('Compress ' + large.length + ' PDF(s) larger than 10 MB? This may take a moment.')) return;
        var orig = btn.innerHTML; btn.disabled = true; var totalSaved = 0, success = 0, failed = 0;
        for (var i = 0; i < large.length; i++) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (i + 1) + '/' + large.length; try { var r = await (await fetch(A + '/api/admin/materials/' + large[i]._id + '/compress', { method: 'POST' })).json(); if (r.success) { totalSaved += r.saved; success++; } else { failed++; } } catch (e) { failed++; } }
        btn.disabled = false; btn.innerHTML = orig;
        loadMaterials(); loadDashboard();
        var msg = 'Compressed ' + success + ' file(s)'; if (totalSaved > 0) msg += ', saved ' + (Math.round(totalSaved / 1024 / 1024 * 100) / 100) + ' MB'; if (failed > 0) msg += ', ' + failed + ' failed';
        toast(msg, failed > 0 ? 'error' : 'success');
    }

    function toast(msg, type) {
        var existing = document.querySelector('.toast'); if (existing) existing.remove();
        var el = document.createElement('div'); el.className = 'toast toast-' + type; el.textContent = msg; document.body.appendChild(el);
        setTimeout(function () { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(function () { el.remove(); }, 300); }, 2500);
    }

    function esc(s) { if (!s) return ''; var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    document.getElementById('modalOverlay').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    document.querySelectorAll('.admin-nav button[data-section]').forEach(function (b) { b.addEventListener('click', function () { switchSection(b.dataset.section); }); });
    document.getElementById('addCategoryBtn').addEventListener('click', function () { openModal('category'); });
    document.getElementById('addProjectBtn').addEventListener('click', function () { openModal('project'); });
    document.getElementById('addMaterialBtn').addEventListener('click', function () { openModal('material'); });
    document.getElementById('compressAllBtn').addEventListener('click', compressLargePDFs);

    var avatarBtn = document.getElementById('avatarBtn'), avatarMenu = document.getElementById('avatarMenu');
    if (avatarBtn && avatarMenu) {
        avatarBtn.addEventListener('click', function (e) { e.stopPropagation(); avatarMenu.classList.toggle('open'); });
        document.addEventListener('click', function () { avatarMenu.classList.remove('open'); });
        avatarMenu.addEventListener('click', function (e) { e.stopPropagation(); });
    }

    var menuBtn = document.getElementById('menuBtn'), sidebar = document.querySelector('.admin-sidebar');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', function (e) { e.stopPropagation(); sidebar.classList.toggle('open'); });
        document.addEventListener('click', function (e) { if (!sidebar.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) sidebar.classList.remove('open'); });
    }

    function tickClock() {
        var c = document.getElementById('adminClock'); if (!c) return;
        var d = new Date();
        var h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
        c.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }
    tickClock(); setInterval(tickClock, 1000);

    document.querySelectorAll('.filter-pill[data-logtype]').forEach(function (b) {
        b.addEventListener('click', function () {
            document.querySelectorAll('.filter-pill[data-logtype]').forEach(function (x) { x.classList.remove('active'); });
            b.classList.add('active');
            logState.type = b.dataset.logtype; logState.page = 1; logState.selected.clear(); loadLogs();
        });
    });
    var logSearchInput = document.getElementById('logSearch');
    if (logSearchInput) { var st; logSearchInput.addEventListener('input', function () { clearTimeout(st); st = setTimeout(function () { logState.search = logSearchInput.value.trim(); logState.page = 1; loadLogs(); }, 400); }); }
    var selAll = document.getElementById('logSelectAll');
    if (selAll) selAll.addEventListener('change', function () { if (selAll.checked) logState.items.forEach(function (l) { logState.selected.add(l._id); }); else logState.selected.clear(); loadLogs(); });
    var hdrCheck = document.getElementById('logHeaderCheck');
    if (hdrCheck) hdrCheck.addEventListener('change', function () { if (hdrCheck.checked) logState.items.forEach(function (l) { logState.selected.add(l._id); }); else logState.selected.clear(); loadLogs(); });
    var delSel = document.getElementById('logDeleteSelected');
    if (delSel) delSel.addEventListener('click', async function () {
        if (!logState.selected.size) return;
        if (!confirm('Delete ' + logState.selected.size + ' log(s)?')) return;
        try {
            var r = await fetch(A + '/api/admin/logs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: Array.from(logState.selected) }) });
            var d = await r.json();
            if (d.success) { toast('Deleted ' + d.deleted + ' log(s)', 'success'); logState.selected.clear(); loadLogs(); loadDashboard(); }
            else { toast(d.error || 'Failed', 'error'); }
        } catch (e) { toast('Network error', 'error'); }
    });
    var logLocalBtn = document.getElementById('logLocalhostBtn');
    if (logLocalBtn) logLocalBtn.addEventListener('click', async function () {
        if (!confirm('Delete all localhost logs?')) return;
        try { var r = await fetch(A + '/api/admin/logs/localhost', { method: 'DELETE' }); var d = await r.json(); if (d.success) { toast('Deleted ' + d.deleted + ' localhost log(s)', 'success'); loadLogs(); loadDashboard(); } else toast(d.error || 'Failed', 'error'); } catch (e) { toast('Network error', 'error'); }
    });
    var logOldBtn = document.getElementById('logOlderBtn');
    if (logOldBtn) logOldBtn.addEventListener('click', async function () {
        if (!confirm('Delete logs older than 30 days?')) return;
        try { var r = await fetch(A + '/api/admin/logs/older-than/30', { method: 'DELETE' }); var d = await r.json(); if (d.success) { toast('Deleted ' + d.deleted + ' old log(s)', 'success'); loadLogs(); loadDashboard(); } else toast(d.error || 'Failed', 'error'); } catch (e) { toast('Network error', 'error'); }
    });

    (async function () { if (await checkAuth()) { loadDashboard(); loadCategories(); loadMessages(); } })();
})();