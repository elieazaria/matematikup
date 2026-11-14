/* ═══════════════════════════════════════════════════════════════
   NOTION SUR LA THÉORIE DES ENSEMBLES
   Source : Dénombrement.pdf (partie « Notion sur la théorie des ensembles »).
   Utilisé seul par la 1ère OSE (chapitre 14) et réutilisé dans « Dénombrement » (1ère L et 1ère S).
═══════════════════════════════════════════════════════════════ */
/* ── Questions du quiz : copiées telles quelles depuis quiz_ensemble.html (format B, voir outils.js) ── */
const QUIZ_ENSEMBLES = [
  {
    type: "QCM",
    question: "En mathématiques, qu'appelle-t-on un ensemble ?",
    instruction: "Choisis une seule réponse.",
    multiple: false,
    options: [
      ["Une collection d'objets distincts", true, "Un ensemble regroupe des objets distincts appelés éléments."],
      ["Une collection d'objets identiques", false, "Les éléments d'un ensemble ne sont pas nécessairement identiques."],
      ["Une liste d'objets toujours ordonnés", false, "Un ensemble n'est pas défini par un ordre de ses éléments."],
      ["Une collection contenant toujours des nombres", false, "Un ensemble peut contenir des nombres, des lettres ou d'autres objets."]
    ]
  },
  {
    type: "QCM",
    question: "Quel nom donne-t-on à un ensemble qui contient exactement un élément ?",
    instruction: "Choisis une seule réponse.",
    multiple: false,
    options: [
      ["Une paire", false, "Une paire contient exactement deux éléments."],
      ["Un singleton", true, "Un singleton est un ensemble constitué d'un seul élément."],
      ["Un ensemble vide", false, "L'ensemble vide ne contient aucun élément."],
      ["Un ensemble universel", false, "L'ensemble universel désigne l'ensemble de référence."]
    ]
  },
  {
    type: "Vrai ou faux",
    question: "L'ensemble ∅ contient exactement un élément.",
    instruction: "Choisis vrai ou faux.",
    multiple: false,
    options: [
      ["Vrai", false, "L'ensemble vide ne contient aucun élément."],
      ["Faux", true, "L'ensemble vide ne contient aucun élément et son cardinal est égal à zéro."]
    ]
  },
  {
    type: "QCM",
    question: "Soit E = {1, 2, 3, 4, 5}. Quelle écriture signifie que 3 est un élément de E ?",
    instruction: "Choisis une seule réponse.",
    multiple: false,
    options: [
      ["3 ⊆ E", false, "Le symbole ⊆ exprime une inclusion entre deux ensembles."],
      ["3 ∈ E", true, "Le symbole ∈ signifie que 3 appartient à E."],
      ["E ∈ 3", false, "Cette écriture inverse les rôles."],
      ["3 ∉ E", false, "Le symbole ∉ signifie que 3 n'appartient pas à E."]
    ]
  },
  {
    type: "Réponses multiples",
    question: "Soient A l'ensemble des élèves d'une classe de Première et B l'ensemble des filles de cette classe. Quelles affirmations sont correctes ?",
    instruction: "Plusieurs réponses sont possibles. Sélectionne toutes les bonnes réponses.",
    multiple: true,
    options: [
      ["B ⊆ A", true, "Chaque fille de la classe appartient aussi à l'ensemble des élèves."],
      ["Si x ∈ B, alors x ∈ A", true, "Tout élément de B est également un élément de A."],
      ["A ⊆ B", false, "Tous les élèves ne sont pas nécessairement des filles."],
      ["B ∈ A", false, "B est un ensemble, et non un élève élément de A."]
    ]
  },
  {
    type: "QCM",
    question: "Soit E = {a, b, c, d, e}. Quel est le cardinal de E ?",
    instruction: "Choisis une seule réponse.",
    multiple: false,
    options: [
      ["4", false, "L'ensemble contient cinq éléments distincts."],
      ["5", true, "Les cinq éléments sont a, b, c, d et e."],
      ["6", false, "E contient cinq éléments, et non six."],
      ["0", false, "Le cardinal est nul uniquement pour l'ensemble vide."]
    ]
  },
  {
    type: "Vrai ou faux",
    question: "Si x ∈ A ∩ B, alors x appartient simultanément à A et à B.",
    instruction: "Choisis vrai ou faux.",
    multiple: false,
    options: [
      ["Vrai", true, "L'intersection contient les éléments communs aux deux ensembles."],
      ["Faux", false, "Appartenir à l'intersection signifie appartenir aux deux ensembles."]
    ]
  },
  {
    type: "QCM",
    question: "Soient A = {1, 2, 3, 4} et B = {3, 4, 5}. Quel est A ∪ B ?",
    instruction: "Choisis une seule réponse.",
    multiple: false,
    options: [
      ["{3, 4}", false, "Il s'agit de l'intersection des deux ensembles."],
      ["{1, 2}", false, "Il s'agit de A \\ B."],
      ["{1, 2, 3, 4, 5}", true, "La réunion rassemble tous les éléments sans répétition."],
      ["{1, 2, 3, 4, 3, 4, 5}", false, "Un élément ne se répète pas dans un ensemble."]
    ]
  },
  {
    type: "Réponses multiples",
    question: "Soient A = {1, 2, 3, 4} et B = {3, 4, 5}. Quelles égalités sont exactes ?",
    instruction: "Plusieurs réponses sont possibles.",
    multiple: true,
    options: [
      ["A ∩ B = {3, 4}", true, "3 et 4 sont les seuls éléments communs."],
      ["A \\ B = {1, 2}", true, "1 et 2 appartiennent à A mais pas à B."],
      ["B \\ A = {1, 2}", false, "Les éléments de B qui ne sont pas dans A sont {5}."],
      ["A ∩ B = {1, 2, 3, 4, 5}", false, "Cet ensemble est la réunion A ∪ B."]
    ]
  },
  {
    type: "QCM",
    question: "Soit E = {1, 2, 3, 4, 5, 6} et A = {2, 4, 6}. Quel est le complémentaire de A dans E ?",
    instruction: "Choisis une seule réponse.",
    multiple: false,
    options: [
      ["{2, 4, 6}", false, "C'est l'ensemble A lui-même."],
      ["{1, 3, 5}", true, "Ce sont les éléments de E qui n'appartiennent pas à A."],
      ["{1, 2, 3, 4, 5, 6}", false, "C'est l'ensemble E tout entier."],
      ["∅", false, "Le complémentaire contient ici trois éléments."]
    ]
  }
];

registerChapitre('ensembles', () => ({
  titre: 'Notion sur la théorie des ensembles', partie: 'Traitement de données et probabilités',
  resume: 'Vocabulaire ensembliste, cardinal d’un ensemble fini, intersection, réunion, différence et complémentaire.',
  topics: [

    T('Activité ensemble',
      pg(
        S('✦', 'Activité ensemble', SOON()))),

    T('Notion sur la théorie des ensembles',
      pg(
        S('1', 'Vocabulaires ensemblistes',
          B('or', 'Ensemble', R`En mathématiques, un <strong>ensemble</strong> est une collection d’objets distincts, appelés <strong>éléments</strong>. Il peut s’agir d’objets de toute sorte, comme des nombres, des caractères alphabétiques ou des formes géométriques.`),
          B('or', 'Ensemble vide', R`L’ensemble qui ne contient aucun élément est appelé <strong>ensemble vide</strong> et est noté \(\varnothing\).`,
            R`Un ensemble qui n’a qu’un élément est appelé un <strong>singleton</strong> ; un ensemble à deux éléments est une <strong>paire</strong>.`),
          B('or', 'Élément', R`On dit que \(x\) <strong>appartient</strong> à un ensemble \(E\) si \(x\) est un élément de \(E\) et on note alors \(\boxed{x\in E}\).`,
            R`Par exemple : \(3\in\mathbb{R}\).`),
          B('or', 'Inclusion', R`On dit qu’un ensemble \(A\) est un <strong>sous-ensemble</strong> de \(E\), ou <strong>inclus</strong> dans \(E\), si chaque élément de \(A\) est un élément de \(E\). On note \(\boxed{A\subseteq E}\) (« \(A\) inclus dans \(E\) »).`,
            R`De manière plus concise : \(A\subseteq E\iff\big(\forall x,\ x\in A\Rightarrow x\in E\big)\).`),
          B('bl', 'Exemple', R`Soit \(A\) l’ensemble des élèves de la classe de première et \(B\) l’ensemble des filles de cette même classe.`,
            UL(R`un élève \(\in A\)`, R`\(B\subseteq A\)`)))),
      pg(
        S('2', 'Cardinal d’un ensemble fini',
          B('or', 'Définition', R`Un ensemble \(E\) est <strong>fini</strong> s’il possède un nombre fini d’éléments ; ce nombre est le <strong>cardinal</strong> de \(E\), noté \(\boxed{\operatorname{card}(E)}\).`,
            R`Par convention, \(\operatorname{card}(\varnothing)=0\).`),
          B('bl', 'Exemple', R`L’ensemble des faces d’un dé, \(E=\{1,2,3,4,5,6\}\), vérifie \(\operatorname{card}(E)=6\).`)),
        S('3', 'Intersection, réunion, complémentarité',
          P(R`Soient \(A\) et \(B\) deux sous-ensembles de \(E\).`),
          B('or', 'Intersection', R`On appelle <strong>intersection</strong> de \(A\) et \(B\) l’ensemble, noté \(\boxed{A\cap B}\), des éléments qui sont <strong>à la fois</strong> dans \(A\) et dans \(B\).`,
            R`De manière plus concise : \((x\in A\cap B)\iff(x\in A\ \text{et}\ x\in B)\).`),
          B('or', 'Union (réunion)', R`On appelle <strong>union</strong> de \(A\) et \(B\) l’ensemble noté \(\boxed{A\cup B}\) des éléments qui sont dans \(A\) <strong>ou</strong> dans \(B\).`,
            R`De manière plus concise : \((x\in A\cup B)\iff(x\in A\ \text{ou}\ x\in B)\).`),
          B('or', 'Différence', R`On appelle <strong>différence</strong> de \(B\) dans \(A\), notée \(\boxed{A\setminus B}\), l’ensemble des éléments de \(A\) qui ne sont pas des éléments de \(B\).`,
            R`De manière plus concise : \((x\in A\setminus B)\iff(x\in A\ \text{et}\ x\notin B)\).`),
          B('or', 'Complémentaire', R`On appelle <strong>complémentaire</strong> de \(A\) dans \(E\) l’ensemble \(E\setminus A\), souvent noté \(\boxed{\overline{A}}\) ou \(A^c\).`,
            R`De manière plus concise : \(x\in A^c\iff(x\in E\ \text{et}\ x\notin A)\).`),
          B('bl', 'Exemple', R`Soit \(E=\{1,2,3,4,5,6\}\), \(A=\{1,2,3\}\) et \(B=\{2,4,6\}\).`,
            UL(R`\(A\cap B=\{2\}\)`, R`\(A\cup B=\{1,2,3,4,6\}\)`, R`\(A\setminus B=\{1,3\}\)`, R`\(A^c=E\setminus A=\{4,5,6\}\)`))))),

    /* Quiz « test_ensemble » (fichier quiz_ensemble.html, 10 questions) */
    T('Quiz : ensembles',
      pg(
        S('★', 'Quiz : défi des ensembles',
          P('<strong>10 défis</strong> pour tester tes connaissances sur les ensembles : relève-les et découvre ton score !'),
          quizB(QUIZ_ENSEMBLES, {
            fin: ['Excellent ! Tu maîtrises très bien les ensembles.', 'Très bien ! Continue à t’entraîner.', 'Bon début ! Quelques notions sont à revoir.', 'Ne te décourage pas ! Relis le cours et recommence.'],
            seuils: [0.9, 0.7, 0.5] }))))
  ]
}));
