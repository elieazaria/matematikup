/* ═══════════════════════════════════════════════════════════════
   APPLICATIONS (injection, surjection, bijection)
   Source : Dénombrement.pdf (partie « Applications » + exercice 1).
   Utilisé seul par la 1ère OSE (chapitre 15) et réutilisé dans « Dénombrement » (1ère L et 1ère S).
═══════════════════════════════════════════════════════════════ */
/* ── Questions du quiz : copiées telles quelles depuis application.html (format A, voir outils.js) ── */
const QUIZ_APPLICATIONS = [
  {
    q: "Qu'est-ce qu'une application f : E → F ?",
    instruction: "Choisis la bonne réponse.",
    type: "single",
    options: [
      "Une relation qui associe à chaque élément de E un seul élément de F.",
      "Une relation qui associe à chaque élément de E plusieurs éléments de F.",
      "Une relation qui associe uniquement certains éléments de E à F."
    ],
    correct: [0],
    explanation: "Une application doit associer à chaque élément de l'ensemble de départ E un et un seul élément de l'ensemble d'arrivée F."
  },
  {
    q: "Soit f : E → F telle que f(2) = 5. Quelle affirmation est correcte ?",
    instruction: "Choisis la bonne réponse.",
    type: "single",
    options: [
      "2 est l'image de 5.",
      "5 est l'image de 2 et 2 est un antécédent de 5.",
      "5 est un antécédent de 2."
    ],
    correct: [1],
    explanation: "Puisque f(2) = 5, 5 est l'image de 2 par f et 2 est un antécédent de 5."
  },
  {
    q: "Une application f : E → F est injective lorsque…",
    instruction: "Choisis la bonne réponse.",
    type: "single",
    options: [
      "Chaque élément de F possède au moins un antécédent.",
      "Deux éléments distincts de E ont toujours des images différentes.",
      "Chaque élément de F possède exactement un antécédent."
    ],
    correct: [1],
    explanation: "Dans une application injective, deux éléments distincts de E ne peuvent pas avoir la même image. Certains éléments de F peuvent ne pas avoir d'antécédent."
  },
  {
    q: "Dans un lycée, chaque élève possède un numéro matricule unique. Certains numéros de la liste officielle ne sont attribués à aucun élève. De quel type d'application s'agit-il ?",
    instruction: "Choisis la bonne réponse.",
    type: "single",
    options: [
      "Injective",
      "Surjective",
      "Bijective"
    ],
    correct: [0],
    explanation: "Chaque élève possède un matricule différent : l'application est injective. Mais certains numéros n'ont aucun antécédent : elle n'est pas surjective."
  },
  {
    q: "Une application f : E → F est surjective lorsque…",
    instruction: "Choisis la bonne réponse.",
    type: "single",
    options: [
      "Chaque élément de F possède au moins un antécédent dans E.",
      "Chaque élément de F possède au plus un antécédent dans E.",
      "Chaque élément de E possède exactement deux images."
    ],
    correct: [0],
    explanation: "Une application est surjective si tout élément de l'ensemble d'arrivée F est atteint par au moins un élément de E."
  },
  {
    q: "On considère une application f : E → F. Chaque élément de F possède exactement un antécédent dans E. Qu'en déduit-on ?",
    instruction: "Tu peux sélectionner plusieurs réponses.",
    type: "multi",
    options: [
      "L'application est injective.",
      "L'application est surjective.",
      "L'application est bijective."
    ],
    correct: [0, 1, 2],
    explanation: "Chaque élément de F possède au moins un antécédent : l'application est surjective. Il en possède au plus un : elle est injective. Elle est donc bijective."
  },
  {
    q: "Dans une classe, chaque élève possède un carnet de correspondance nominatif et chaque carnet appartient à un seul élève. On suppose que tous les carnets de l'ensemble F sont attribués. Quelle est la nature de cette application ?",
    instruction: "Choisis la bonne réponse.",
    type: "single",
    options: [
      "Injective uniquement",
      "Surjective uniquement",
      "Bijective"
    ],
    correct: [2],
    explanation: "Chaque élève possède un seul carnet et chaque carnet correspond à un seul élève. Tous les éléments de F sont atteints : l'application est à la fois injective et surjective, donc bijective."
  }
];

registerChapitre('applications', () => ({
  titre: 'Applications', partie: 'Traitement de données et probabilités',
  resume: 'Définition d’une application, application injective, surjective et bijective.',
  topics: [

    T('Activité : applications',
      pg(
        S('✦', 'Activité', SOON()))),

    T('Applications',
      pg(
        S('1', 'Définition générale',
          B('or', 'Définition', R`Soient \(E\) et \(F\) deux ensembles finis non vides. Une <strong>application</strong> \(\boxed{f:E\to F}\) est une relation qui, à chaque élément \(x\) de l’ensemble \(E\), associe <strong>un et un seul</strong> élément \(y\) de l’ensemble \(F\).`),
          B('or', 'Vocabulaire', UL(R`\(E\) est l’<strong>ensemble de départ</strong>.`, R`\(F\) est l’<strong>ensemble d’arrivée</strong>.`,
            R`Si \(y=f(x)\), on dit que \(y\) est l’<strong>image</strong> de \(x\) par \(f\) et que \(x\) est un <strong>antécédent</strong> de \(y\).`)),
          B('bl', 'Exemple', R`L’attribution d’un numéro de place en salle d’examen : à chaque élève \(E\) correspond un unique numéro de table \(F\).`)),
        S('2.1', 'Application injective (l’injection)',
          B('or', 'Définition', R`Une application est <strong>injective</strong> si chaque élément de l’ensemble d’arrivée \(F\) possède <strong>au plus un antécédent</strong> dans \(E\) (soit 0, soit 1).`,
            R`En d’autres termes : deux éléments distincts de \(E\) ne peuvent pas avoir la même image.`),
          B('bl', 'Exemple concret : le numéro de matricule', UL(R`\(E\) : les élèves du lycée.`, R`\(F\) : l’ensemble des numéros d’identification.`),
            R`<strong>Pourquoi ?</strong> Chaque numéro appartient à un seul élève. Il est impossible que deux élèves partagent le même matricule. Certains numéros peuvent ne pas être attribués (0 antécédent).`))),
      pg(
        S('2.2', 'Application surjective (la surjection)',
          B('or', 'Définition', R`Une application est <strong>surjective</strong> si chaque élément de l’ensemble d’arrivée \(F\) possède <strong>au moins un antécédent</strong> dans \(E\) (1 ou plus).`,
            R`En d’autres termes : tout l’ensemble d’arrivée est « couvert », il n’y a aucun élément orphelin dans \(F\).`),
          B('bl', 'Exemple : l’orientation par série', UL(R`\(E\) : les élèves de la classe de Terminale.`, R`\(F\) : les séries proposées dans le lycée (ex : \(\{\text{Série L},\ \text{S},\ \text{OSE}\}\)).`),
            R`<strong>Pourquoi ?</strong> Chaque série proposée contient forcément au moins un élève (sinon la série n’existerait pas dans l’établissement). Plusieurs élèves visent la même série.`)),
        S('2.3', 'Application bijective (la bijection)',
          B('or', 'Définition', R`Une application est <strong>bijective</strong> si elle est à la fois injective et surjective. Tout élément de \(F\) possède <strong>un et un seul</strong> antécédent dans \(E\).`),
          B('bl', 'Exemple : le carnet de correspondance', UL(R`\(E\) : les élèves de la classe.`, R`\(F\) : les carnets de correspondance nominatifs.`),
            R`<strong>Pourquoi ?</strong> À chaque élève correspond exactement un carnet, et chaque carnet appartient à exactement un élève. C’est une correspondance parfaite.`),
          B('gr', 'À retenir', UL(R`<strong>Injective</strong> : au plus un antécédent.`, R`<strong>Surjective</strong> : au moins un antécédent.`, R`<strong>Bijective</strong> : exactement un antécédent.`)))),
    ),

    T('Vidéo', pg(S('▶', 'Vidéo', VID(''))) ),

    /* Quiz « application » (fichier application.html, 7 questions) */
    T('Quiz : applications',
      pg(
        S('★', 'Quiz : les applications',
          P('<strong>7 questions</strong> pour tester ta compréhension !'),
          quizA(QUIZ_APPLICATIONS, {
            fin: ['Excellent ! Tu maîtrises les notions d’injection, de surjection et de bijection. 🏆', 'Très bien ! Tu as compris l’essentiel. Continue à t’entraîner.', 'Bon début ! Relis les définitions et essaie encore.', 'Ne te décourage pas ! Reprends les exemples du cours et recommence.'],
            seuils: [1, 0.7, 0.4] }))),
    ),

    T('Exercice 1',
      pg(
        S('✎', 'Exercice 1 : injective, surjective ou bijective ?',
          B('gr', 'Énoncé', R`Soit \(f:\{1,2,3,4\}\to\{a,b,c\}\) avec \(f(1)=a\), \(f(2)=b\), \(f(3)=c\) et \(f(4)=a\).`,
            R`L’application \(f\) est-elle injective, surjective ou bijective ?`,
            corr(R`• <b>Pas injective</b> : \(f(1)=f(4)=a\), donc \(a\) a deux antécédents (1 et 4).<br>
              • <b>Surjective</b> : \(a\) a pour antécédents 1 et 4, \(b\) a pour antécédent 2 et \(c\) a pour antécédent 3 : chaque élément de \(\{a,b,c\}\) a au moins un antécédent.<br>
              • Comme \(f\) n’est pas injective, elle n’est <b>pas bijective</b>.`,
              R`Cherche un élément de l’ensemble d’arrivée qui a deux antécédents, puis vérifie que \(a\), \(b\) et \(c\) sont tous atteints.`, true))))
    ),
  ]
}));
