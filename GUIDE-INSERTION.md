# Guide : insérer les contenus peu à peu

## 1. Principe

```
chapitre.html            ← la page (ne change plus)
chapitres/
  outils.js              ← outils de rédaction (ne change plus)
  routes.js              ← « classe:n » → fichier du chapitre
  <chapitre>.js          ← un fichier par chapitre
  activites/<nom>.html   ← une activité = une page HTML autonome
  img/                   ← images
```

- Un chapitre = un fichier `.js`. Il contient des **rubriques** (la sidebar), qui contiennent des **pages**, qui contiennent des **sections** (les titres).
- **2 titres maximum par page** : `pg(S(...), S(...))`. Le code refuse un `pg` à 3 titres.
- On insère **un contenu à la fois**, puis on teste (étape 6) avant de passer au suivant.

## 2. Insérer une activité (page HTML autonome)

Exemple : `Sommet_de_la_COI.html`.

1. Renomme le fichier sans espace ni accent : `sommet-coi.html`.
2. Copie-le dans `chapitres/activites/`.
3. Dans le fichier du chapitre, remplace le `SOON()` de l'activité par :
   ```js
   S('✦', 'Activité : titre',
     P('Une phrase de consigne.'),
     FRAME('chapitres/activites/sommet-coi.html', 'Titre accessible', 1100))
   ```
   Le dernier nombre est une hauteur de secours en pixels. En ligne, le cadre ajuste sa hauteur tout seul.
4. L'activité garde ses propres couleurs : ne touche pas à son code.

## 3. Insérer un quiz

Deux formats existent, selon la façon dont `const questions = [ ... ]` est écrit dans le fichier du quiz.

| Si les options ressemblent à… | Fonction |
|---|---|
| `options: ["texte", ...]` + `correct: [0]` + `explanation: "..."` (application.html, arrangement.html) | `quizA` |
| `options: [["texte", true, "explication"], ...]` + `multiple: true/false` (quiz_ensemble.html) | `quizB` |

1. Ouvre le fichier du quiz et copie le tableau `const questions = [ ... ];`.
2. Colle-le **en haut** du fichier du chapitre, avec un nom unique :
   ```js
   const QUIZ_MON_CHAPITRE = [ ...tableau copié... ];
   ```
3. Dans le chapitre :
   ```js
   T('Quiz : mon chapitre',
     pg(S('★', 'Quiz : titre',
       quizB(QUIZ_MON_CHAPITRE, {
         fin: ['Excellent !', 'Très bien !', 'Bon début !', 'Courage !'],
         seuils: [0.9, 0.7, 0.5] })))),
   ```
   `seuils` = taux de réussite pour chacun des 3 premiers messages. Sans option, des messages par défaut sont utilisés.
4. Le score se met à jour tout seul. Seule la **première réponse** à chaque question est comptée.
5. `quizA` et `quizB` sont faits pour du texte simple (∈ ⊆ ∩ …). Pour un quiz avec formules LaTeX, écris les questions à la main avec `qz(...)` et `qm(...)` (voir le quiz de `denombrement.js`), puis regroupe-les avec `QUIZ({...}, qz(...), qm(...))`.

## 4. Insérer une vidéo

Remplace `VID('')` par `VID('https://www.youtube.com/embed/IDENTIFIANT')`.
Emplacements actuels : `applications.js`, `suites-generalites.js`, `suites-arith-geo.js`.

## 5. Ajouter un chapitre

1. Crée `chapitres/mon-chapitre.js` :
   ```js
   registerChapitre('mon-chapitre', () => ({
     titre: 'Titre', partie: 'Analyse', resume: 'Une phrase.',
     topics: [
       T('Rubrique 1',
         pg(S('1', 'Définition', B('or', 'Définition', R`Soit \(f\)…`))),
         pg(S('2', 'Exemple',    B('bl', 'Exemple',    R`…`)))),
       T('Quiz', pg(S('★', 'Quiz', quizA(QUIZ_MON_CHAPITRE)))),
     ]
   }));
   ```
   Blocs : `B('or', …)` définition, `B('bl', …)` exemple, `B('gr', …)` exercice ou méthode, `B('pu', …)` quiz. Chaque bloc prend un titre puis des paragraphes.
   `corr(solution, indice, true)` ajoute la zone « Ma réponse / Indice / Correction » (le `true` agrandit la zone).
2. Ajoute la route dans `chapitres/routes.js` :
   ```js
   "1ere-S:13": "mon-chapitre",
   ```
   `n` = numéro de la carte dans `classe.html`, en comptant tous les chapitres de la classe à partir de 1.
3. Réutiliser des rubriques d'un autre chapitre : `...sujets('autre-chapitre')`, avec `['autre-chapitre']` en 3<sup>e</sup> argument de `registerChapitre`.
4. `partie` peut dépendre de la classe : `partie: { defaut: '…', '1ere-L': '…' }`.

## 6. Contrôle avant de publier

Ouvre le site depuis un serveur (pas par double-clic sur le fichier : les activités n'ajustent leur hauteur que sur un vrai serveur ou en ligne).

- [ ] `chapitre.html?classe=…&n=…` s'ouvre sans « arrive bientôt ».
- [ ] La sidebar liste toutes les rubriques ; un clic sur un sous-titre ouvre la bonne page.
- [ ] Aucune formule affichée en brut (`\(` visible).
- [ ] Chaque page a 2 titres au plus.
- [ ] Les quiz affichent le score et le message final.
- [ ] Les zones « Indice » et « Correction » répondent.
- [ ] Les activités s'ouvrent, répondent et ne coupent pas leur contenu.
- [ ] Affichage correct sur téléphone (390 px de large).

## 7. Ce qui est déjà en place, et ce qu'il reste à insérer

**Déjà en place** (clé de `routes.js` → fichier) :

| Classe et carte | Fichier |
|---|---|
| 2nde : 5 Trinôme · 8 Généralités sur les fonctions · 11 Logique | `trinome.js` · `generalites-fonctions.js` · `logique.js` |
| 1ère L : 1 Généralités sur les fonctions · 7 et 8 Équations / Inéquations du 2nd degré | `generalites-fonctions.js` · `trinome.js` |
| 1ère S : 1 Fonction numérique · 2 Équations du 2nd degré | `fonctions.js` · `trinome.js` |
| 1ère L 12, 1ère S 24 Dénombrement · 1ère OSE 14 et 15 | `denombrement.js` · `ensembles.js` · `applications.js` |
| 1ère L 5-6, 1ère S 11-12, 1ère OSE 6-7 Suites | `suites-generalites.js` · `suites-arith-geo.js` |

**Reste à insérer** (ordre conseillé) :

1. **Activité ensemble** : `ensembles.js`, repérer `SOON()`.
2. **Activité des applications** : `applications.js`, repérer `SOON()`.
3. **Vidéos** : `VID()` ou `VID('')` dans les fichiers de chapitre (voir §4).
4. **Corrections des exercices** : dans `generalites-fonctions.js`, `trinome.js` et `logique.js`, les exercices utilisent `exo(...)` / `corr(BIENTOT…)` (message « arrive bientôt »). Pour une vraie correction, remplace `exo(n, …)` par `B('gr', 'Exercice n', …, corr(solution, indice, true))`.
5. **Autres liens possibles** vers un chapitre existant : une ligne dans `routes.js`. Exemples : `"1ere-OSE:1": "generalites-fonctions"` (généralités sur les fonctions en 1ère OSE) ; `"1ere-L:4": "logique"`, `"1ere-S:10": "logique"`, `"1ere-OSE:3": "logique"` (logique en 1ère, si le même cours convient).
6. **Probabilité** : 1ère L n=13, 1ère S n=25, 1ère OSE n=16 (aucun contenu pour l'instant).
7. **Autres chapitres de `classe.html`** : un chapitre à la fois, dans l'ordre du programme.

## 8. En cas de problème

| Symptôme | Cause probable |
|---|---|
| « Ce chapitre arrive bientôt » | route absente de `routes.js`, ou nom de fichier différent de l'identifiant de `registerChapitre` |
| Page blanche, erreur dans la console | virgule ou parenthèse manquante dans le fichier du chapitre (test rapide : `node --check chapitres/mon-chapitre.js`) |
| « Plus de 2 titres sur une page » | un `pg(...)` contient 3 sections : sépare-les en deux `pg` |
| Image absente d'une activité | chemin à écrire depuis `chapitre.html` (ex. `chapitres/img/mon-image.png`) |
| Quiz sans score | les questions ne sont pas passées par `quizA`, `quizB` ou `QUIZ(...)` |
