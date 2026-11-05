/* ═══════════════════════════════════════════════════════════════
   chapitres/outils.js — outils de rédaction partagés par tous les chapitres.
   Un chapitre = des rubriques (T) → des pages (pg) → 2 titres maximum par page (S).
   Chargé par chapitre.html avant routes.js et avant le fichier du chapitre.
═══════════════════════════════════════════════════════════════ */
const R = String.raw;

/* Registre des chapitres : chaque fichier de chapitre s'y inscrit avec registerChapitre(id, () => ({...})) */
const CHAPITRES = {};
const registerChapitre = (id, fn) => { CHAPITRES[id] = fn; };

const P  = (...a) => a.map(s => /^<(div|ul|ol|table|svg)/.test(s) ? s : `<p>${s}</p>`).join('');
const B  = (c, t, ...a) => `<div class="bx ${c}"><span class="tg">${t}</span>${P(...a)}</div>`;
const S  = (n, t, ...a) => ({ n, t, h: a.join('') });            // une section (= un titre)
const SK = (n, t, ...a) => ({ n, t, h: a.join(''), kfc: true });  // section de l'activité KFC
const pg = (...s) => { if (s.length > 2) throw new Error('Plus de 2 titres sur une page : ' + s[0].t); return s; };
const T  = (titre, ...pages) => ({ titre, pages });
const TB = (head, rows) => `<div class="ov"><table class="tb"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
const UL = (...a) => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const VID = (src) => src
  ? `<div class="ov"><iframe class="w-full aspect-video rounded-2xl" src="${src}" title="Vidéo" allowfullscreen></iframe></div>`
  : `<div class="vid"><div class="play">▶</div><b class="font-display text-lg">Vidéo bientôt disponible</b><small>La vidéo explicative arrive.</small></div>`;

const CORR = [], QZ = [];
const corr = (sol, hint, tall) => { CORR.push({ sol, hint }); return `<div class="corr${tall ? ' tall' : ''}" data-k="${CORR.length - 1}"></div>`; };
const qz = (num, q, opts, ans, expl) => {
  QZ.push({ ans, expl });
  return `<div class="bx pu"><span class="tg">Question ${num}</span>${P(q)}<div class="opt" data-k="${QZ.length - 1}">${opts.map(o => `<button type="button" class="o">${o}</button>`).join('')}</div><div class="sg hidden"></div></div>`;
};
