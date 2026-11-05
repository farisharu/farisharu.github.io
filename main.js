/* Portfolio v3: title-select screen. No dependencies. */
(function () {
  document.documentElement.classList.add('js');

  const SVGNS = 'http://www.w3.org/2000/svg';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const appMQ = window.matchMedia('(min-width: 1100px) and (min-height: 620px)');

  const app = document.querySelector('.app');
  const list = document.querySelector('.list');
  const tabs = Array.from(document.querySelectorAll('.list .item'));
  const cards = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
  const views = Array.from(document.querySelectorAll('.view'));
  const panel = document.querySelector('.panel');

  const band = document.querySelector('.band');
  const bandNo = band.querySelector('.band__no');
  const bandTitle = band.querySelector('.band__title');
  const bandGenre = band.querySelector('.band__genre');

  const stage = document.querySelector('.stage');
  const art = stage.querySelector('.stage__art');
  const kanji = stage.querySelector('.stage__kanji');
  const stageGenre = stage.querySelector('.stage__genre');
  const stageCode = stage.querySelector('.stage__code');
  const stageRole = stage.querySelector('.stage__role');
  const fullBtn = stage.querySelector('.stage__full');

  const posNow = document.querySelector('.pos__now');
  const posName = document.querySelector('.pos__name');
  const viewer = document.querySelector('.viewer');
  const viewerImg = viewer.querySelector('.viewer__img');
  const viewerCap = viewer.querySelector('.viewer__cap');

  function el(name, attrs, parent) {
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ---------- decorative barcodes ---------- */
  document.querySelectorAll('.barcode').forEach(b => {
    const code = b.dataset.code || 'FRP';
    const svg = el('svg', { 'aria-hidden': 'true', preserveAspectRatio: 'none' });
    let x = 0;
    for (const ch of code) {
      const v = ch.charCodeAt(0);
      for (let i = 0; i < 4; i++) {
        const w = 1 + ((v >> i) & 1) + ((v >> (i + 3)) & 1);
        el('rect', { x, y: 0, width: w, height: 20, fill: 'currentColor' }, svg);
        x += w + 1 + ((v >> (i + 1)) & 1);
      }
    }
    svg.setAttribute('viewBox', `0 0 ${x} 20`);
    b.appendChild(svg);
  });

  /* ---------- sliced art: diagonal bands of the same image ---------- */
  const N = 7, SLOPE = 16, GAP = 1.3;
  const OFFSETS = [0, 16, -11, 24, -7, 13, -18];
  const span = (100 + SLOPE * 2) / N;
  const sliceImgs = [];
  for (let i = 0; i < N; i++) {
    const top = -SLOPE + i * span;
    const bot = top + span - GAP;
    const s = document.createElement('div');
    s.className = 'slice';
    s.style.setProperty('--i', i);
    s.style.setProperty('--dx', OFFSETS[i] + 'px');
    s.style.setProperty('--clip', `polygon(0% ${top + SLOPE}%, 100% ${top}%, 100% ${bot}%, 0% ${bot + SLOPE}%)`);
    const im = document.createElement('img');
    im.alt = '';
    im.decoding = 'async';
    s.appendChild(im);
    art.appendChild(s);
    sliceImgs.push(im);
  }

  let fullSrc = '', fullAlt = '';
  let artToken = 0;
  function setArt(src, dir) {
    const token = ++artToken;
    if (!reduceMotion) {
      stage.style.setProperty('--dir', dir || 1);
      stage.classList.add('is-out');
    }
    sliceImgs.forEach(im => { im.src = src; });
    const reveal = () => {
      if (token !== artToken) return;
      void stage.offsetWidth;
      stage.classList.remove('is-out');
    };
    const first = sliceImgs[0];
    if (first.decode) first.decode().then(reveal, reveal); else requestAnimationFrame(reveal);
  }

  /* ---------- band text fit ---------- */
  function fitBand() {
    if (!band.offsetParent) return;
    const vertical = getComputedStyle(bandTitle).writingMode.indexOf('vertical') === 0;
    bandTitle.style.fontSize = '100px';
    const cs = getComputedStyle(band);
    const gap = parseFloat(cs.rowGap || cs.gap) || 12;
    let fs;
    if (vertical) {
      const L = bandTitle.offsetHeight;
      const avail = band.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - bandNo.offsetHeight - bandGenre.offsetHeight - gap * 2;
      fs = 100 * avail / L;
      fs = Math.min(fs, (band.clientWidth - 10) / 0.8);
    } else {
      const L = bandTitle.scrollWidth;
      const avail = band.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - bandNo.offsetWidth - bandGenre.offsetWidth - gap * 2;
      fs = 100 * avail / L;
      fs = Math.min(fs, 64);
    }
    bandTitle.style.fontSize = Math.max(22, Math.floor(fs)) + 'px';
  }

  /* ---------- selecting a title ---------- */
  let cur = 0;
  function ensureVisible(item) {
    if (appMQ.matches) {
      const t = item.offsetTop, b = t + item.offsetHeight;
      if (t < list.scrollTop) list.scrollTop = t - 6;
      else if (b > list.scrollTop + list.clientHeight) list.scrollTop = b - list.clientHeight + 6;
    } else {
      const l = item.offsetLeft, r = l + item.offsetWidth;
      if (l < list.scrollLeft) list.scrollLeft = l - 16;
      else if (r > list.scrollLeft + list.clientWidth) list.scrollLeft = r - list.clientWidth + 16;
    }
  }

  function select(i, opts) {
    opts = opts || {};
    i = (i + tabs.length) % tabs.length;
    cur = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', k === i ? 'true' : 'false');
      t.tabIndex = k === i ? 0 : -1;
    });
    cards.forEach((c, k) => { c.hidden = k !== i; });
    const card = cards[i], d = card.dataset;
    const name = card.querySelector('h2').firstChild.textContent.trim();

    bandNo.textContent = d.no;
    bandTitle.textContent = d.band;
    bandGenre.textContent = d.genre;
    stageGenre.textContent = d.genre;
    stageCode.textContent = d.code;
    stageRole.textContent = d.role;
    posNow.textContent = d.no;
    posName.textContent = name;

    card.querySelectorAll('.shots a').forEach(a => a.removeAttribute('aria-current'));
    if (d.kanji) {
      stage.classList.add('is-kanji');
      stage.classList.remove('is-out');
      kanji.textContent = d.kanji;
    } else {
      stage.classList.remove('is-kanji');
      setArt(d.art, opts.dir);
      fullSrc = d.full;
      fullAlt = name;
    }
    fitBand();
    panel.scrollTop = 0;
    ensureVisible(tabs[i]);
    if (opts.focus) tabs[i].focus();
    if (opts.push !== false) history.replaceState(null, '', '#' + card.id);
  }

  tabs.forEach((t, k) => {
    t.addEventListener('click', e => {
      e.preventDefault();
      if (k !== cur) select(k, { dir: k > cur ? 1 : -1 });
    });
  });
  list.addEventListener('keydown', e => {
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in map) { e.preventDefault(); select(cur + map[e.key], { focus: true, dir: map[e.key] }); }
    else if (e.key === 'Home') { e.preventDefault(); select(0, { focus: true, dir: -1 }); }
    else if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1, { focus: true, dir: 1 }); }
  });
  document.querySelectorAll('.pad').forEach(p => {
    p.addEventListener('click', () => {
      const step = parseInt(p.dataset.step, 10);
      select(cur + step, { dir: step });
    });
  });
  document.addEventListener('keydown', e => {
    if (app.dataset.view !== 'titles' || viewer.open) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (list.contains(e.target) || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); select(cur + 1, { dir: 1 }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(cur - 1, { dir: -1 }); }
  });

  /* ---------- screenshots: swap the stage on desktop, open the viewer on phones ---------- */
  function openViewer(src, alt) {
    viewerImg.src = src;
    viewerImg.alt = alt || '';
    viewerCap.textContent = alt || '';
    if (viewer.showModal) viewer.showModal(); else window.open(src, '_blank');
  }
  viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
  fullBtn.addEventListener('click', () => openViewer(fullSrc, fullAlt));
  cards.forEach(card => {
    card.querySelectorAll('.shots a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const img = a.querySelector('img');
        if (appMQ.matches && !card.dataset.kanji) {
          card.querySelectorAll('.shots a').forEach(x => x.removeAttribute('aria-current'));
          a.setAttribute('aria-current', 'true');
          setArt(a.getAttribute('href'), 1);
          fullSrc = a.getAttribute('href');
          fullAlt = img ? img.alt : '';
        } else {
          openViewer(a.getAttribute('href'), img ? img.alt : '');
        }
      });
    });
  });

  /* ---------- screens ---------- */
  const navLinks = Array.from(document.querySelectorAll('.views a'));
  function show(view, push) {
    app.dataset.view = view;
    views.forEach(v => { v.hidden = v.dataset.view !== view; });
    navLinks.forEach(a => a.setAttribute('aria-current', a.dataset.go === view ? 'page' : 'false'));
    if (view === 'titles') requestAnimationFrame(fitBand);
    if (!appMQ.matches) window.scrollTo(0, 0);
    if (push) history.replaceState(null, '', '#' + (view === 'titles' ? cards[cur].id : view));
  }
  document.querySelectorAll('[data-go]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); show(a.dataset.go, true); });
  });

  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const vi = views.findIndex(v => v.dataset.view === h && h !== 'titles');
    if (vi > -1) { show(h, false); return; }
    const ci = cards.findIndex(c => c.id === h);
    show('titles', false);
    select(ci > -1 ? ci : 0, { push: false, dir: 1 });
  }
  window.addEventListener('hashchange', route);
  route();

  let raf = 0;
  const refit = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fitBand); };
  window.addEventListener('resize', refit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
  if (appMQ.addEventListener) appMQ.addEventListener('change', () => { refit(); ensureVisible(tabs[cur]); });
})();
