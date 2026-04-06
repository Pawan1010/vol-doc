/* ════════════════════════════════════════════
   CONFIG
════════════════════════════════════════════ */
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwb0LnS9XJw1rS3R6UJzp6YELRJYpx1mOQyLynviF9ooiQP4gndeceu0MHhqko8tmY3hA/exec';


/* ════════════════════════════════════════════
   DATA LAYER
   ─ DOCS is populated by loadDocs() on startup.
   ─ The static array below is a fallback only.
════════════════════════════════════════════ */
const SEGMENTS = [
  { key:'Pigment',      label:'Pigments',       icon:'🧪', desc:'Dry powder colorants',
    a:'var(--pig-a)', b:'var(--pig-b)', deep:'#be185d', deep2:'#e11d48',
    bg:'#fff0f6', mid:'#fce7f3', shadow:'rgba(190,24,93,.3)' },
  { key:'Dispersion',   label:'Dispersions',    icon:'💧', desc:'Pre-dispersed pigment systems',
    a:'var(--dis-a)', b:'var(--dis-b)', deep:'#6d28d9', deep2:'#7c3aed',
    bg:'#f3f0ff', mid:'#ede9fe', shadow:'rgba(109,40,217,.3)' },
  { key:'Presentation', label:'Presentations',  icon:'📊', desc:'Sales & application decks',
    a:'var(--pre-a)', b:'var(--pre-b)', deep:'#b45309', deep2:'#d97706',
    bg:'#fffbeb', mid:'#fef3c7', shadow:'rgba(180,83,9,.3)' },
  { key:'Brochure',     label:'Brochures',      icon:'📄', desc:'Product brochures & catalogs',
    a:'var(--bro-a)', b:'var(--bro-b)', deep:'#0369a1', deep2:'#0284c7',
    bg:'#f0f9ff', mid:'#e0f2fe', shadow:'rgba(3,105,161,.3)' },
  { key:'Plastic',      label:'Plastic Cards',  icon:'🎨', desc:'Shade cards & colour references',
    a:'var(--pla-a)', b:'var(--pla-b)', deep:'#065f46', deep2:'#059669',
    bg:'#ecfdf5', mid:'#d1fae5', shadow:'rgba(6,95,70,.3)' },
  { key:'Regulatory',   label:'Regulatory',     icon:'📋', desc:'Compliance & safety documents',
    a:'var(--reg-a)', b:'var(--reg-b)', deep:'#c2410c', deep2:'#ea580c',
    bg:'#fff7ed', mid:'#ffedd5', shadow:'rgba(194,65,12,.3)' },
];

const DOCS = [
  {id:1,  name:'Pigment Yellow 13',         cat:'Pigment',      type:'TDS',  shade:'Yellow', cas:'5102-83-0',   code:'PY-013',  ci:'C.I. 21100', app:'Coatings',  supplier:'Clariant',     grade:'High Performance', lf:'6 – Very Good',   date:'Nov 2024', icon:'🟡', driveUrl:'', notes:'High heat stability. Suitable for solvent-based systems.'},
  {id:2,  name:'Pigment Yellow 13',         cat:'Pigment',      type:'MSDS', shade:'Yellow', cas:'5102-83-0',   code:'PY-013',  ci:'C.I. 21100', app:'Coatings',  supplier:'Clariant',     grade:'High Performance', lf:'6 – Very Good',   date:'Nov 2024', icon:'🟡', driveUrl:'', notes:'Handle with PPE. Store below 40°C.'},
  {id:3,  name:'Pigment Red 254',           cat:'Pigment',      type:'TDS',  shade:'Red',    cas:'122390-98-1', code:'PR-254',  ci:'C.I. 56110', app:'Plastics',  supplier:'BASF',         grade:'DPP Red',          lf:'8 – Outstanding', date:'Oct 2024', icon:'🔴', driveUrl:'', notes:'Excellent lightfastness. Heat stable to 300°C.'},
  {id:4,  name:'Pigment Red 254',           cat:'Pigment',      type:'MSDS', shade:'Red',    cas:'122390-98-1', code:'PR-254',  ci:'C.I. 56110', app:'Plastics',  supplier:'BASF',         grade:'DPP Red',          lf:'8 – Outstanding', date:'Sep 2024', icon:'🔴', driveUrl:'', notes:'Not classified hazardous under GHS.'},
  {id:5,  name:'Pigment Blue 15:3',         cat:'Pigment',      type:'TDS',  shade:'Blue',   cas:'147-14-8',    code:'PB-153',  ci:'C.I. 74160', app:'Inks',      supplier:'Sun Chemical', grade:'Phthalocyanine',   lf:'7 – Excellent',  date:'Nov 2024', icon:'🔵', driveUrl:'', notes:'Excellent transparency for process printing.'},
  {id:6,  name:'Pigment Green 7',           cat:'Pigment',      type:'TDS',  shade:'Green',  cas:'1328-53-6',   code:'PG-007',  ci:'C.I. 74260', app:'General',   supplier:'Heubach',      grade:'Phthalocyanine',   lf:'8 – Outstanding', date:'Aug 2024', icon:'🟢', driveUrl:'', notes:''},
  {id:7,  name:'Pigment Violet 23',         cat:'Pigment',      type:'MSDS', shade:'Violet', cas:'6358-30-1',   code:'PV-023',  ci:'C.I. 51319', app:'Coatings',  supplier:'Clariant',     grade:'Standard',         lf:'7 – Excellent',  date:'Sep 2024', icon:'🟣', driveUrl:'', notes:'Avoid inhalation of dust.'},
  {id:8,  name:'Sudanyl Blue BN Disp.',     cat:'Dispersion',   type:'TDS',  shade:'Blue',   cas:'—',           code:'SBN-D',   ci:'—',          app:'Coatings',  supplier:'Sudarshan',    grade:'Aqueous',          lf:'—',              date:'Aug 2024', icon:'💧', driveUrl:'', notes:'35% pigment content. pH 8–9.'},
  {id:9,  name:'Sudanyl Red RO Disp.',      cat:'Dispersion',   type:'TDS',  shade:'Red',    cas:'—',           code:'SRO-D',   ci:'—',          app:'Coatings',  supplier:'Sudarshan',    grade:'Aqueous',          lf:'—',              date:'Jul 2024', icon:'💧', driveUrl:'', notes:''},
  {id:10, name:'Sudanyl Yellow GR Disp.',   cat:'Dispersion',   type:'MSDS', shade:'Yellow', cas:'—',           code:'SYG-D',   ci:'—',          app:'Coatings',  supplier:'Sudarshan',    grade:'Solvent-based',    lf:'—',              date:'Aug 2024', icon:'💧', driveUrl:'', notes:'Contains xylene. Adequate ventilation required.'},
  {id:11, name:'Sudanyl Green FG Disp.',    cat:'Dispersion',   type:'TDS',  shade:'Green',  cas:'—',           code:'SGF-D',   ci:'—',          app:'Plastics',  supplier:'Sudarshan',    grade:'Aqueous',          lf:'—',              date:'Oct 2024', icon:'💧', driveUrl:'', notes:'Good shear stability.'},
  {id:12, name:'Coatings Portfolio 2024',   cat:'Presentation', type:'PPT',  shade:'—',      cas:'—',           code:'PRES-001',ci:'—',          app:'Coatings',  supplier:'—',            grade:'—',                lf:'—',              date:'Nov 2024', icon:'📊', driveUrl:'', notes:'Full product range for coatings segment.'},
  {id:13, name:'Plastics Application Deck', cat:'Presentation', type:'PPT',  shade:'—',      cas:'—',           code:'PRES-002',ci:'—',          app:'Plastics',  supplier:'—',            grade:'—',                lf:'—',              date:'Sep 2024', icon:'📊', driveUrl:'', notes:''},
  {id:14, name:'Inks & Printing Overview',  cat:'Presentation', type:'PPT',  shade:'—',      cas:'—',           code:'PRES-003',ci:'—',          app:'Inks',      supplier:'—',            grade:'—',                lf:'—',              date:'Jul 2024', icon:'📊', driveUrl:'', notes:'Covers flexo and gravure applications.'},
  {id:15, name:'Product Brochure 2024',     cat:'Brochure',     type:'PDF',  shade:'—',      cas:'—',           code:'BRO-001', ci:'—',          app:'General',   supplier:'—',            grade:'—',                lf:'—',              date:'Oct 2024', icon:'📄', driveUrl:'', notes:'Corporate full-range brochure.'},
  {id:16, name:'Effect Pigments Brochure',  cat:'Brochure',     type:'PDF',  shade:'Multi',  cas:'—',           code:'BRO-002', ci:'—',          app:'Coatings',  supplier:'—',            grade:'—',                lf:'—',              date:'Jun 2024', icon:'📄', driveUrl:'', notes:''},
  {id:17, name:'RAL Shades — Coatings',     cat:'Plastic',      type:'CARD', shade:'Multi',  cas:'—',           code:'CARD-RAL',ci:'—',          app:'Coatings',  supplier:'—',            grade:'—',                lf:'—',              date:'May 2024', icon:'🎨', driveUrl:'', notes:'195 RAL Classic shades formulated.'},
  {id:18, name:'Pantone Shades — Plastics', cat:'Plastic',      type:'CARD', shade:'Multi',  cas:'—',           code:'CARD-PAN',ci:'—',          app:'Plastics',  supplier:'—',            grade:'—',                lf:'—',              date:'May 2024', icon:'🎨', driveUrl:'', notes:''},
  {id:19, name:'REACH Compliance Doc',      cat:'Regulatory',   type:'REG',  shade:'—',      cas:'—',           code:'REG-001', ci:'—',          app:'General',   supplier:'—',            grade:'—',                lf:'—',              date:'Nov 2024', icon:'📋', driveUrl:'', notes:'Valid until Dec 2025. Annual review required.'},
  {id:20, name:'SDS — EU GHS Format',       cat:'Regulatory',   type:'REG',  shade:'—',      cas:'—',           code:'REG-002', ci:'—',          app:'General',   supplier:'—',            grade:'—',                lf:'—',              date:'Oct 2024', icon:'📋', driveUrl:'', notes:'Compliant with Regulation (EC) 1907/2006.'},
];


/* ════════════════════════════════════════════
   GOOGLE SHEETS INTEGRATION
   loadDocs()      — fetches rows from Sheet on startup
   GDrive.saveDocument() — appends a new row to Sheet
   GDrive.openFile()     — opens the Drive link
════════════════════════════════════════════ */

async function loadDocs() {
  try {
    const res  = await fetch(APPS_SCRIPT_URL + '?action=getDocs');
    const data = await res.json();
    if (data.docs && Array.isArray(data.docs) && data.docs.length > 0) {
      DOCS.length = 0;
      DOCS.push(...data.docs);
    }
  } catch (err) {
    console.warn('Could not load from Google Sheet — showing local data.', err);
  }
  Home.render();
}

const GDrive = {

  pickFile() {
    alert('Google Drive Picker — wire up the Google Picker API to enable this (see integration guide in index.html).');
  },

  async saveDocument() {
    const row = {
      name:     document.getElementById('fName').value.trim(),
      cat:      document.getElementById('fCat').value,
      type:     document.getElementById('fType').value,
      code:     document.getElementById('fCode').value.trim(),
      cas:      document.getElementById('fCAS').value.trim(),
      ci:       document.getElementById('fCI').value.trim(),
      shade:    document.getElementById('fShade').value.trim(),
      app:      document.getElementById('fApp').value,
      supplier: document.getElementById('fSupplier').value.trim(),
      grade:    document.getElementById('fGrade').value.trim(),
      lf:       document.getElementById('fLF').value,
      driveUrl: document.getElementById('fDriveURL').value.trim(),
      notes:    document.getElementById('fNotes').value.trim(),
    };

    if (!row.name || !row.cat || !row.type) {
      alert('Please fill in Name, Category and Doc Type.');
      return;
    }

    // Show saving state
    const btn = document.querySelector('.btn-save');
    btn.textContent = 'Saving…';
    btn.disabled = true;

    try {
      const res  = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body:   JSON.stringify({ action: 'appendRow', row }),
      });
      const data = await res.json();

      if (data.ok) {
        // Refresh the full list from Sheet so new row appears
        await loadDocs();
        UI.closeAll();

        // Reset form
        ['fName','fCode','fCAS','fCI','fShade','fSupplier','fGrade','fDriveURL','fNotes']
          .forEach(id => { document.getElementById(id).value = ''; });
        ['fCat','fType','fApp','fLF']
          .forEach(id => { document.getElementById(id).selectedIndex = 0; });
      } else {
        alert('Save failed: ' + (data.error || 'Unknown error from Apps Script.'));
      }
    } catch (err) {
      alert('Network error — could not reach Google Apps Script.\n\n' + err.message);
    } finally {
      btn.textContent = 'Save Document';
      btn.disabled = false;
    }
  },

  openFile(doc) {
    if (doc.driveUrl && doc.driveUrl.trim() !== '') {
      window.open(doc.driveUrl, '_blank');
    } else {
      alert('No Drive URL linked for this document yet.\nEdit the record in Google Sheets to add one.');
    }
  },
};


/* ════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════ */
const Helpers = {
  segDocs: (key) => DOCS.filter(d => d.cat === key),
  seg:     (key) => SEGMENTS.find(s => s.key === key),

  typeBadge(type) {
    return `<span class="tag tag--${type}">${type}</span>`;
  },

  applyPalette(el, s) {
    el.style.setProperty('--cc-deep',   s.deep);
    el.style.setProperty('--cc-bg',     s.bg);
    el.style.setProperty('--cc-mid',    s.mid);
    el.style.setProperty('--cc-shadow', s.shadow);
  },
};


/* ════════════════════════════════════════════
   HOME MODULE
════════════════════════════════════════════ */
const Home = {
  render() {
    document.getElementById('statTotal').textContent = DOCS.length;
    document.getElementById('statTDS').textContent   = DOCS.filter(d => d.type === 'TDS').length;
    document.getElementById('statMSDS').textContent  = DOCS.filter(d => d.type === 'MSDS').length;

    document.getElementById('tileGrid').innerHTML = SEGMENTS.map((s, i) => {
      const docs = Helpers.segDocs(s.key);
      const tds  = docs.filter(d => d.type === 'TDS').length;
      const msds = docs.filter(d => d.type === 'MSDS').length;

      return `
      <div class="tile" style="animation-delay:${i * 60}ms" onclick="SegView.open('${s.key}')">
        <div class="tile__banner" style="--seg-a:${s.a};--seg-b:${s.b}">
          <div class="tile__icon">${s.icon}</div>
          <div class="tile__name">${s.label}</div>
          <div class="tile__desc">${s.desc}</div>
        </div>
        <div class="tile__stats">
          <div class="tile__stat">
            <div class="tile__stat-num" style="color:${s.deep}">${docs.length}</div>
            <div class="tile__stat-lbl">Total</div>
          </div>
          <div class="tile__stat">
            <div class="tile__stat-num" style="color:#be185d">${tds}</div>
            <div class="tile__stat-lbl">TDS</div>
          </div>
          <div class="tile__stat">
            <div class="tile__stat-num" style="color:#6d28d9">${msds}</div>
            <div class="tile__stat-lbl">MSDS</div>
          </div>
        </div>
      </div>`;
    }).join('');
  },
};


/* ════════════════════════════════════════════
   SEGMENT VIEW MODULE
════════════════════════════════════════════ */
const SegView = {
  activeKey:  null,
  typeFilter: 'all',

  open(key) {
    this.activeKey  = key;
    this.typeFilter = 'all';
    Search.clear();

    const s    = Helpers.seg(key);
    const docs = Helpers.segDocs(key);

    document.getElementById('segName').textContent = s.label;
    document.getElementById('segSub').textContent  = `${docs.length} documents`;

    const badge = document.getElementById('segBadge');
    badge.textContent      = `${s.icon} ${s.key}`;
    badge.style.background = `linear-gradient(135deg,${s.a},${s.b})`;
    badge.style.color      = '#fff';

    const types = ['all', ...new Set(docs.map(d => d.type))];
    document.getElementById('typeRow').innerHTML = types.map(t =>
      `<div class="type-pill${t === 'all' ? ' active' : ''}" data-type="${t}">${t === 'all' ? 'All' : t}</div>`
    ).join('');
    this._styleActivePill(s);
    this._renderStats(s, docs);

    document.getElementById('homeView').classList.remove('active');
    document.getElementById('segView').classList.add('active');
    document.getElementById('searchWrap').style.display = 'block';
    window.scrollTo(0, 0);

    this.renderCards();
  },

  _styleActivePill(s) {
    document.querySelectorAll('.type-pill').forEach(p => {
      if (p.classList.contains('active')) {
        p.style.background  = `linear-gradient(135deg,${s.a},${s.b})`;
        p.style.color       = '#fff';
        p.style.borderColor = 'transparent';
        p.style.boxShadow   = `0 4px 12px ${s.shadow}`;
      } else {
        p.style.cssText = '';
      }
    });
  },

  _renderStats(s, docs) {
    const tds   = docs.filter(d => d.type === 'TDS').length;
    const msds  = docs.filter(d => d.type === 'MSDS').length;
    const other = docs.length - tds - msds;
    document.getElementById('segStats').innerHTML = `
      <div class="seg-stat"><div class="seg-stat__num" style="color:${s.deep}">${docs.length}</div><div class="seg-stat__lbl">Total</div></div>
      <div class="seg-stat"><div class="seg-stat__num" style="color:#be185d">${tds}</div><div class="seg-stat__lbl">TDS</div></div>
      <div class="seg-stat"><div class="seg-stat__num" style="color:#6d28d9">${msds}</div><div class="seg-stat__lbl">MSDS</div></div>
      ${other ? `<div class="seg-stat"><div class="seg-stat__num" style="color:#b45309">${other}</div><div class="seg-stat__lbl">Other</div></div>` : ''}
    `;
  },

  renderCards() {
    if (!this.activeKey) return;
    const s  = Helpers.seg(this.activeKey);
    const lq = Search.query.toLowerCase();

    const list = DOCS.filter(d => {
      if (d.cat !== this.activeKey) return false;
      if (this.typeFilter !== 'all' && d.type !== this.typeFilter) return false;
      if (lq && ![d.name, d.cas, d.shade, d.type, d.code, d.ci, d.app, d.supplier, d.grade, d.notes]
            .some(v => v && v.toLowerCase().includes(lq))) return false;
      return true;
    });

    document.getElementById('listCount').textContent = `${list.length} result${list.length !== 1 ? 's' : ''}`;

    const grid = document.getElementById('cardGrid');
    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state__icon">🔍</div>
          <div class="empty-state__title">No documents found</div>
          <div class="empty-state__sub">Try a different search or type filter</div>
        </div>`;
      return;
    }

    grid.innerHTML = list.map((d, i) => {
      const isSel = Compare.selection.includes(d.id);
      return `
      <div class="card${isSel ? ' selected' : ''}"
        style="--cc-deep:${s.deep};--cc-bg:${s.bg};--cc-mid:${s.mid};animation-delay:${Math.min(i * 30, 200)}ms"
        onclick="Detail.open(${d.id})">
        <div class="card__head">
          <div class="card__icon">${d.icon}</div>
          <div class="card__name">${d.name}</div>
          <div class="card__tags">${Helpers.typeBadge(d.type)}</div>
          <div class="card__meta">${d.date}</div>
          ${d.code && d.code !== '—' ? `<div class="card__code" style="color:${s.deep}">${d.code}</div>` : ''}
          ${d.shade && d.shade !== '—' ? `<div class="card__shade">${d.shade}</div>` : ''}
        </div>
        <div class="card__actions">
          <button class="card__action" onclick="event.stopPropagation();GDrive.openFile(${JSON.stringify(d).replace(/"/g, '&quot;')})">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Open
          </button>
          <button class="card__action card__action--cmp${isSel ? ' on' : ''}" onclick="event.stopPropagation();Compare.toggle(${d.id})">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            ${isSel ? '✓' : 'Cmp'}
          </button>
        </div>
      </div>`;
    }).join('');
  },
};

document.getElementById('typeRow').addEventListener('click', e => {
  const p = e.target.closest('.type-pill');
  if (!p) return;
  document.querySelectorAll('.type-pill').forEach(x => x.classList.remove('active'));
  p.classList.add('active');
  SegView.typeFilter = p.dataset.type;
  SegView._styleActivePill(Helpers.seg(SegView.activeKey));
  SegView.renderCards();
});


/* ════════════════════════════════════════════
   SEARCH MODULE
════════════════════════════════════════════ */
const Search = {
  query: '',
  init() {
    const input = document.getElementById('searchInput');
    input.addEventListener('input', () => {
      this.query = input.value;
      document.getElementById('searchClear').classList.toggle('visible', !!this.query);
      SegView.renderCards();
    });
  },
  clear() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').classList.remove('visible');
    this.query = '';
    SegView.renderCards();
  },
};


/* ════════════════════════════════════════════
   COMPARE MODULE
════════════════════════════════════════════ */
const Compare = {
  selection: [],

  toggle(id) {
    const idx = this.selection.indexOf(id);
    if (idx === -1) {
      if (this.selection.length >= 2) this.selection.shift();
      this.selection.push(id);
    } else {
      this.selection.splice(idx, 1);
    }
    this._updateBar();
    SegView.renderCards();
  },

  clearSelection() {
    this.selection = [];
    this._updateBar();
    SegView.renderCards();
  },

  _updateBar() {
    const bar = document.getElementById('compareBar');
    document.getElementById('selCount').textContent = this.selection.length;
    document.getElementById('selNames').textContent = this.selection.length === 0
      ? 'Select 2 documents to compare'
      : this.selection.map(id => DOCS.find(d => d.id === id)?.name ?? '').join(' vs ');
    document.getElementById('btnCompare').disabled = this.selection.length < 2;
    bar.classList.toggle('visible', this.selection.length > 0);
  },

  openSheet() {
    if (this.selection.length < 2) return;
    const [a, b] = this.selection.map(id => DOCS.find(d => d.id === id));
    const ca = Helpers.seg(a.cat) || SEGMENTS[0];
    const cb = Helpers.seg(b.cat) || SEGMENTS[0];

    const rows = [
      { l:'Category',      va:a.cat,      vb:b.cat      },
      { l:'Doc Type',      va:a.type,     vb:b.type     },
      { l:'Product Code',  va:a.code,     vb:b.code     },
      { l:'CAS No.',       va:a.cas,      vb:b.cas      },
      { l:'Colour Index',  va:a.ci,       vb:b.ci       },
      { l:'Shade',         va:a.shade,    vb:b.shade    },
      { l:'Application',   va:a.app,      vb:b.app      },
      { l:'Supplier',      va:a.supplier, vb:b.supplier },
      { l:'Grade',         va:a.grade,    vb:b.grade    },
      { l:'Lightfastness', va:a.lf,       vb:b.lf       },
      { l:'Updated',       va:a.date,     vb:b.date     },
    ].filter(r => r.va !== '—' || r.vb !== '—');

    document.getElementById('cmpBody').innerHTML = `
      <div class="cmp-pair">
        <div class="cmp-doc" style="background:${ca.bg};border-color:${ca.mid}">
          <div class="cmp-doc__icon">${a.icon}</div>
          <div class="cmp-doc__name" style="color:${ca.deep}">${a.name}</div>
          <div class="cmp-doc__type">${a.type} · ${a.date}</div>
        </div>
        <div class="cmp-vs">VS</div>
        <div class="cmp-doc" style="background:${cb.bg};border-color:${cb.mid}">
          <div class="cmp-doc__icon">${b.icon}</div>
          <div class="cmp-doc__name" style="color:${cb.deep}">${b.name}</div>
          <div class="cmp-doc__type">${b.type} · ${b.date}</div>
        </div>
      </div>
      <table class="cmp-table">
        <thead><tr>
          <th>Field</th>
          <th style="color:${ca.deep}">${a.name.split(' ').slice(0,2).join(' ')}</th>
          <th style="color:${cb.deep}">${b.name.split(' ').slice(0,2).join(' ')}</th>
          <th></th>
        </tr></thead>
        <tbody>${rows.map(r => {
          const same = r.va === r.vb;
          return `<tr>
            <td>${r.l}</td>
            <td style="color:${ca.deep};font-weight:700">${r.va}</td>
            <td style="color:${cb.deep};font-weight:700">${r.vb}</td>
            <td><span class="match-tag ${same ? 'match-tag--eq' : 'match-tag--df'}">${same ? '=' : '≠'}</span></td>
          </tr>`;
        }).join('')}</tbody>
      </table>
      <button class="btn-ai" onclick="Compare.aiCompare()">✦ AI Deep Comparison</button>`;

    UI.closeAll();
    setTimeout(() => UI.openSheet('cmpSheet'), 80);
  },

  aiCompare() {
    const [a, b] = this.selection.map(id => DOCS.find(d => d.id === id));
    UI.closeAll();
    const prompt = `Deep technical comparison of "${a.name}" (${a.type}, CAS:${a.cas}, App:${a.app}, Grade:${a.grade}, LF:${a.lf}) vs "${b.name}" (${b.type}, CAS:${b.cas}, App:${b.app}, Grade:${b.grade}, LF:${b.lf}). Cover: chemical differences, safety, application suitability, regulatory status, and a recommendation.`;
    if (typeof sendPrompt === 'function') sendPrompt(prompt);
    else alert('AI Compare prompt:\n\n' + prompt);
  },
};


/* ════════════════════════════════════════════
   DETAIL MODULE
════════════════════════════════════════════ */
const Detail = {
  open(id) {
    const d = DOCS.find(x => x.id === id);
    if (!d) return;
    const s = Helpers.seg(d.cat) || SEGMENTS[0];

    document.getElementById('detDot').style.background = `linear-gradient(135deg,${s.a},${s.b})`;

    const fields = [
      { l:'Product Code',  v:d.code,     hi:true   },
      { l:'CAS Number',    v:d.cas,      mono:true  },
      { l:'Colour Index',  v:d.ci                   },
      { l:'Shade',         v:d.shade                },
      { l:'Application',   v:d.app                  },
      { l:'Supplier',      v:d.supplier             },
      { l:'Grade',         v:d.grade                },
      { l:'Lightfastness', v:d.lf                   },
      { l:'Date',          v:d.date                 },
    ].filter(f => f.v && f.v !== '—');

    const isSel = Compare.selection.includes(d.id);

    document.getElementById('detBody').innerHTML = `
      <div class="det-hero" style="--cc-bg:${s.bg};--cc-mid:${s.mid}">
        <div class="det-icon" style="--cc-mid:${s.mid};--cc-bg:${s.bg}">${d.icon}</div>
        <div>
          <div class="det-name">${d.name}</div>
          <div class="det-badges">
            ${Helpers.typeBadge(d.type)}
            <span class="tag" style="color:${s.deep};background:${s.bg};border-color:${s.mid}">${d.cat}</span>
          </div>
        </div>
      </div>
      <div class="det-section">
        <div class="det-section__title">Technical Fields</div>
        <div class="det-fields">
          ${fields.map(f => `
            <div class="det-field">
              <div class="det-field__label">${f.l}</div>
              <div class="det-field__value ${f.mono ? 'det-field__value--mono' : ''}"
                   style="${f.hi ? 'color:' + s.deep : ''}">${f.v}</div>
            </div>`).join('')}
          ${d.notes ? `
            <div class="det-field det-field--full">
              <div class="det-field__label">Notes</div>
              <div class="det-field__value det-field__value--note">${d.notes}</div>
            </div>` : ''}
        </div>
      </div>
      <button class="btn-download"
        style="background:linear-gradient(135deg,${s.deep},${s.deep2});box-shadow:0 6px 20px ${s.shadow}"
        onclick="GDrive.openFile(${JSON.stringify(d).replace(/"/g, '&quot;')})">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Open in Drive
      </button>
      <button class="btn-select-detail${isSel ? ' on' : ''}" id="detSelBtn" onclick="Detail.toggleSelect(${d.id})">
        ${isSel ? '✓ Selected for Compare' : '+ Add to Compare'}
      </button>`;

    UI.openSheet('detailSheet');
  },

  toggleSelect(id) {
    Compare.toggle(id);
    const on  = Compare.selection.includes(id);
    const btn = document.getElementById('detSelBtn');
    btn.textContent = on ? '✓ Selected for Compare' : '+ Add to Compare';
    btn.classList.toggle('on', on);
  },
};


/* ════════════════════════════════════════════
   UI / SHEET MODULE
════════════════════════════════════════════ */
const UI = {
  openSheet(id) {
    document.getElementById('overlay').classList.add('visible');
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  closeAll() {
    document.getElementById('overlay').classList.remove('visible');
    ['detailSheet', 'cmpSheet', 'uploadSheet'].forEach(id =>
      document.getElementById(id).classList.remove('open'));
    document.body.style.overflow = '';
  },
};


/* ════════════════════════════════════════════
   NAV MODULE
════════════════════════════════════════════ */
const Nav = {
  goHome() {
    SegView.activeKey  = null;
    SegView.typeFilter = 'all';
    Search.clear();
    document.getElementById('segView').classList.remove('active');
    document.getElementById('homeView').classList.add('active');
    document.getElementById('searchWrap').style.display = 'none';
    this.setActive('home');
    window.scrollTo(0, 0);
  },
  setActive(page) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  },
};


/* ════════════════════════════════════════════
   INIT
   loadDocs() fetches live data from Google Sheet.
   Falls back to the static DOCS array if offline
   or if the Sheet has no rows yet.
════════════════════════════════════════════ */
Search.init();
loadDocs();
