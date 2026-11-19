/* ═══════════════════════════════════════════════════════════════
   chapitres/outils.js — outils de rédaction partagés par tous les chapitres.
   Un chapitre = des rubriques (T) → des pages (pg) → 2 titres maximum par page (S).
   Chargé par chapitre.html avant routes.js et avant le fichier du chapitre.
═══════════════════════════════════════════════════════════════ */
const R = String.raw;

/* Registre des chapitres : chaque fichier de chapitre s'y inscrit avec registerChapitre(id, () => ({...}), [dépendances])
   - dépendances (facultatif) : identifiants d'autres chapitres dont ce chapitre réutilise des rubriques.
     chapitre.html charge ces fichiers avant d'afficher, et le chapitre les récupère avec sujets('id'). */
const CHAPITRES = {}, DEPS = {};
const registerChapitre = (id, fn, deps = []) => { CHAPITRES[id] = fn; DEPS[id] = deps; };
const sujets = (id) => CHAPITRES[id]().topics;   // les rubriques d'un autre chapitre (à appeler une seule fois par page)

const P  = (...a) => a.map(s => /^<(div|ul|ol|table|svg)/.test(s) ? s : `<p>${s}</p>`).join('');
const B  = (c, t, ...a) => `<div class="bx ${c}"><span class="tg">${t}</span>${P(...a)}</div>`;
const S  = (n, t, ...a) => ({ n, t, h: a.join('') });            // une section (= un titre)
const SK = (n, t, ...a) => ({ n, t, h: a.join(''), kfc: true });  // section de l'activité KFC (couleurs propres : rouge)
const SA = (n, t, ...a) => ({ n, t, h: a.join(''), ay: true });   // section d'activité Yas (couleurs propres : jaune et bleu)
const YP = (titre, ...a) => `<div class="yp">${titre ? `<h3>${titre}</h3>` : ''}${P(...a)}</div>`;  // carte blanche dans une activité
const pg = (...s) => { if (s.length > 2) throw new Error('Plus de 2 titres sur une page : ' + s[0].t); return s; };
const T  = (titre, ...pages) => ({ titre, pages });
const TB = (head, rows) => `<div class="ov"><table class="tb"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
const UL = (...a) => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const VID = (src) => src
  ? `<div class="ov"><iframe class="w-full aspect-video rounded-2xl" src="${src}" title="Vidéo" allowfullscreen></iframe></div>`
  : `<div class="vid"><div class="play">▶</div><b class="font-display text-lg">Vidéo bientôt disponible</b><small>La vidéo explicative arrive.</small></div>`;

/* Activité dont le contenu n'a pas encore été fourni : garde sa place dans le plan du cours */
const SOON = (msg = 'L’énoncé de cette activité arrive.') =>
  `<div class="vid"><div class="play">✦</div><b class="font-display text-lg">Activité bientôt disponible</b><small>${msg}</small></div>`;

const CORR = [], QZ = [];
const corr = (sol, hint, tall) => { CORR.push({ sol, hint }); return `<div class="corr${tall ? ' tall' : ''}" data-k="${CORR.length - 1}"></div>`; };
const qz = (num, q, opts, ans, expl) => {
  QZ.push({ ans, expl });
  return `<div class="bx pu"><span class="tg">Question ${num}</span>${P(q)}<div class="opt" data-k="${QZ.length - 1}">${opts.map(o => `<button type="button" class="o">${o}</button>`).join('')}</div><div class="sg hidden"></div></div>`;
};
/* Aides d'exercices partagées par plusieurs chapitres */
const BIENTOT = ['📘 La correction arrive bientôt.', '💡 L’indice arrive bientôt.'];
const OL = (...a) => `<ol class="list-decimal pl-6">${a.map(x => `<li>${x}</li>`).join('')}</ol>`;
/* Exercice : énoncé + zone « Ma réponse / Indice / Correction » (correction à venir) */
const exo = (n, ...c) => B('gr', 'Exercice ' + n, ...c, corr(BIENTOT[0], BIENTOT[1], true));

/* Question à réponses multiples : ans = tableau des indices des bonnes réponses */
const qm = (num, q, opts, ans, expl) => {
  QZ.push({ ans, expl });
  return `<div class="bx pu"><span class="tg">Question ${num}</span>${P(q)}<div class="optm" data-k="${QZ.length - 1}">${opts.map(o => `<label class="om"><input type="checkbox"><span>${o}</span></label>`).join('')}</div><button type="button" class="go chkm">Vérifier ma réponse</button><div class="sg hidden"></div></div>`;
};

/* ═══════════════════════════════════════════════════════════════
   ACTIVITÉS ET QUIZ AVEC SCORE
═══════════════════════════════════════════════════════════════ */

/* Activité = page HTML autonome (ses propres couleurs, son propre code), affichée dans un cadre.
   src : chemin depuis chapitre.html (ex. 'chapitres/activites/mon-activite.html') ; h : hauteur de secours en px
   (sur le site en ligne, le cadre ajuste tout seul sa hauteur au contenu). */
const FRAME = (src, titre, h = 900) =>
  `<div class="fr"><iframe src="${src}" title="${titre}" loading="lazy" style="height:${h}px" onload="fitFrame(this)"></iframe></div>`;

/* Échappe le texte venant d'un quiz écrit en texte simple (symboles ∈ ⊆ ∩ … acceptés) */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Regroupe des questions (qz / qm) sous un compteur de score.
   opts.fin    : 4 messages de fin [excellent, très bien, bon début, courage]
   opts.seuils : taux de réussite [excellent, très bien, bon début]  (ex. [0.9, 0.7, 0.5]) */
const QS = [];
const QUIZ = (opts, ...cartes) => {
  QS.push({
    fin: opts.fin || ['Excellent ! Tu maîtrises très bien cette notion. 🏆', 'Très bien ! Continue à t’entraîner.', 'Bon début ! Quelques notions sont à revoir.', 'Ne te décourage pas ! Relis le cours et recommence.'],
    seuils: opts.seuils || [0.9, 0.7, 0.5],
  });
  return `<div class="qzset" data-s="${QS.length - 1}"><div class="qscore"><span class="qs-n">Score : 0 / ${cartes.length}</span><span class="qs-m"></span></div>${cartes.join('')}</div>`;
};

/* Format A — comme application.html / arrangement.html :
   { q, instruction, type: 'single' | 'multi', options: ['…', '…'], correct: [indices], explanation } */
const quizA = (liste, opts = {}) => QUIZ(opts, ...liste.map((x, i) => x.type === 'multi'
  ? qm(i + 1, esc(x.q) + ' <em>' + esc(x.instruction || '') + '</em>', x.options.map(esc), x.correct, esc(x.explanation))
  : qz(i + 1, esc(x.q), x.options.map(esc), x.correct[0], esc(x.explanation))));

/* Format B — comme quiz_ensemble.html :
   { type: 'QCM' | 'Vrai ou faux' | 'Réponses multiples', question, instruction, multiple: true | false,
     options: [ ['texte', true | false, 'explication'], … ] } */
const quizB = (liste, opts = {}) => QUIZ(opts, ...liste.map((x, i) => {
  const textes = x.options.map((o) => esc(o[0]));
  const bonnes = x.options.map((o, j) => (o[1] ? j : -1)).filter((j) => j >= 0);
  const expl = x.options.map((o) => `<b>${esc(o[0])}</b> : ${esc(o[2])}`).join('<br>');
  const num = (i + 1) + (x.type && x.type !== 'QCM' ? ' · ' + esc(x.type) : '');
  return x.multiple
    ? qm(num, esc(x.question) + ' <em>' + esc(x.instruction || '') + '</em>', textes, bonnes, expl)
    : qz(num, esc(x.question), textes, bonnes[0], expl);
}));
