/* ═══════════════════════════════════════════════════════════════
   CHAPITRE — Logique (2nde)
   Format : registerChapitre / T / pg / S / B / P / TB / UL / VID / qz / corr (outils.js)
   Règle : 2 titres (S) maximum par page ; l’activité 2 intègre activites/soiree.html
═══════════════════════════════════════════════════════════════ */

registerChapitre('logique', () => ({
  titre: 'Logique', partie: 'Algèbre',
  resume: 'Énoncés et propositions, négation, connecteurs « et » et « ou », implication, équivalence et quantificateurs.',
  topics: [

    /* ───────────── ACTIVITÉ 1 ───────────── */
    T('Activité 1',
      pg(
        S('✦', 'Activité 1',
          B('pu', 'Situation', 'Le lycée organise un grand concours de mathématiques réservé aux élèves de seconde.',
            'Pour attirer les participants, le responsable affiche plusieurs messages sur le tableau d’affichage :'),
          B('bl', 'Les six messages', UL(
            '<b>A</b> : « Tiana est inscrit en classe de seconde. »',
            '<b>B</b> : « Tiana a obtenu 14/20 en mathématiques. »',
            '<b>C</b> : « Tiana peut participer au concours. »',
            '<b>D</b> : « Tiana est-il inscrit en classe de seconde ? »',
            '<b>E</b> : « Inscris-toi au concours ! »',
            '<b>F</b> : « 14 est un nombre pair. »')),
          P('On considère les six messages précédents.'),
          B('gr', 'Question a)', 'Pour quelles phrases peut-on déterminer si elles sont vraies ou fausses ?', corr(BIENTOT[0], BIENTOT[1])),
          B('gr', 'Question b)', 'Pourquoi ne peut-on pas attribuer une valeur de vérité à certaines phrases ?', corr(BIENTOT[0], BIENTOT[1])))),
      pg(
        S('✦', 'Suite de l’activité 1',
          B('pu', 'Situation', 'On suppose que Tiana est effectivement inscrit en seconde et qu’il a obtenu 14/20 en mathématiques, et on considère les propositions suivantes :',
            UL('<b>P</b> : « Tiana est inscrit en seconde. »', '<b>Q</b> : « Tiana a obtenu 14/20 en mathématiques. »', '<b>R</b> : « 14 est un nombre pair. »')),
          B('gr', 'Question c)', R`Déterminer la valeur de vérité de chacune des propositions \(P\), \(Q\) et \(R\).`, corr(BIENTOT[0], BIENTOT[1])),
          B('gr', 'Question d)', 'Une proposition peut-elle être à la fois vraie et fausse ?', corr(BIENTOT[0], BIENTOT[1])),
          B('gr', 'Question e)', R`Écrire une phrase qui exprime le contraire de \(P\). Déterminer la valeur de vérité de cette nouvelle phrase.`, corr(BIENTOT[0], BIENTOT[1])),
          B('gr', 'Question f)', 'Que remarquez-vous sur la relation entre une proposition et sa négation ?', corr(BIENTOT[0], BIENTOT[1]))))
    ),

    /* ───────────── ÉNONCÉ ET PROPOSITION ───────────── */
    T('Énoncé et proposition',
      pg(
        S('1', 'Définitions',
          B('or', 'Énoncé', 'Un énoncé est une phrase quelconque qui communique une information, pose une question ou donne un ordre.'),
          B('or', 'Expression', 'Une expression est un ensemble de signes (lettres, symboles, mots…) possédant une signification dans un contexte donné.'),
          B('or', 'Proposition (assertion / affirmation)', R`Une proposition \(P\) est un énoncé auquel on peut attribuer une seule valeur de vérité : <b>VRAI</b> (V) ou <b>FAUX</b> (F), jamais les deux à la fois, et jamais aucune des deux.`),
          B('bl', 'Exemple', R`\(P\) : « le carré d’un nombre réel est strictement positif. »`, R`\(P\) est fausse car \(0^2=0\times0=0\).`),
          B('gr', 'Notation', 'On note souvent les propositions par des lettres : P, Q, R…'),
          VID())),
      pg(
        S('2', 'Tableau de vérité',
          B('or', 'Définition', 'Un tableau de vérité est un tableau qui définit la valeur d’une fonction logique pour chacune des combinaisons possibles des entrées. Par convention, pour faciliter la lecture, on écrit F pour la valeur fausse et V pour la valeur vraie.')),
        S('3', 'La négation « non P »',
          B('or', 'Définition', R`La proposition « non \(P\) », notée \(\overline{P}\), s’appelle « la négation de \(P\) ». Elle est vraie quand \(P\) est fausse, et fausse quand \(P\) est vraie.`),
          B('bl', 'Table de vérité', TB([R`\(P\)`, R`\(\overline{P}\)`], [['V', 'F'], ['F', 'V']])))),
      pg(
        S('★', 'Quiz',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, 'Laquelle des phrases suivantes est une proposition logique ?', ['Fermez la porte !', '18 est un nombre pair.', 'Calcule 12+8.'], 1,
             'Une proposition est vraie ou fausse. « 18 est un nombre pair » est vraie ; les deux autres sont des ordres.'),
          qz(2, 'Une proposition possède toujours une valeur de vérité.', ['Vrai', 'Faux'], 0,
             'Par définition, une proposition est soit vraie, soit fausse.'),
          qz(3, 'Quelle est la valeur de vérité de la proposition : « 21 est divisible par 3 » ?', ['Vraie', 'Fausse', 'Elle est à la fois vraie et fausse.', 'Elle n’a aucune valeur de vérité.'], 0,
             R`\(21=3\times7\) : la proposition est vraie.`),
          qz(4, R`Si une proposition \(P\) est fausse, alors sa négation non \(P\) est vraie.`, ['Vrai', 'Faux'], 0,
             'La négation d’une proposition fausse est vraie.'))))
    ),

    /* ───────────── ACTIVITÉ 2 : LA SOIRÉE ───────────── */
    T('Activité 2',
      pg(
        S('✦', 'Activité 2 : Qui ira à la soirée ?',
          FRAME('chapitres/activites/soiree.html', 'Activité : Qui ira à la soirée ?', 820)))
    ),

    /* ───────────── CONNECTEURS LOGIQUES ───────────── */
    T('Connecteurs logiques « et » et « ou »',
      pg(
        S('1', 'Connecteurs logiques',
          B('or', 'Définition', 'On peut fabriquer de nouvelles propositions à partir de propositions simples grâce à des connecteurs logiques.')),
        S('2', 'La conjonction (connecteur « ET »)',
          B('or', 'Définition', R`La proposition « \(P\) ET \(Q\) », notée \(P\wedge Q\), est vraie seulement si les deux propositions sont vraies en même temps.`),
          B('bl', 'Table de vérité', TB([R`\(P\)`, R`\(Q\)`, R`\(P\wedge Q\)`], [['V', 'V', 'V'], ['V', 'F', 'F'], ['F', 'V', 'F'], ['F', 'F', 'F']])))),
      pg(
        S('3', 'La disjonction (connecteur « OU »)',
          B('or', 'Définition', R`La proposition « \(P\) OU \(Q\) », notée \(P\vee Q\), est fausse seulement si les deux propositions sont fausses en même temps. Il suffit qu’une seule soit vraie pour que ce soit vrai.`),
          B('bl', 'Table de vérité', TB([R`\(P\)`, R`\(Q\)`, R`\(P\vee Q\)`], [['V', 'V', 'V'], ['V', 'F', 'V'], ['F', 'V', 'V'], ['F', 'F', 'F']]))),
        S('4', 'Négation et propriétés',
          B('or', 'Attention !', 'La négation ne signifie pas « opposé ».', 'Exemple : la négation de « ce chat est noir » n’est pas « ce chat est blanc » mais « ce chat n’est pas noir ».'),
          B('or', 'Propriété', R`Soit \(P\) et \(Q\) deux propositions :`,
            R`\(\overline{\overline{P}}\iff P\)`,
            R`\(\overline{P\wedge Q}\iff\overline{P}\vee\overline{Q}\)`,
            R`\(\overline{P\vee Q}\iff\overline{P}\wedge\overline{Q}\)`))),
      pg(
        S('★', 'Quiz',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, 'Le connecteur « et » correspond à quelle opération logique ?', ['La disjonction', 'La conjonction', 'L’implication', 'L’équivalence'], 1,
             'Le connecteur « et » est la conjonction, notée \\(\\wedge\\).'),
          qz(2, 'La proposition « 8 est pair ou 8 est divisible par 4 » est vraie.', ['Oui', 'Non'], 0,
             '8 est pair : une des deux propositions est vraie, donc le « ou » est vrai (et 8 est aussi divisible par 4).'),
          qz(3, 'La proposition « 15 est impair et 15 est divisible par 5 » est :', ['Uniquement vraie si l’une de ces deux propositions est vraie', 'Impossible à déterminer', 'Vraie', 'Fausse'], 2,
             '15 est impair et 15 est divisible par 5 : les deux propositions sont vraies, donc le « et » est vrai.')))),
      pg(
        S('5', R`L’implication \(P\Rightarrow Q\)`,
          B('or', 'Définition', R`On lit « \(P\) implique \(Q\) » ou « si \(P\) alors \(Q\) ». \(P\) est appelée hypothèse et \(Q\) conclusion. Si l’hypothèse est vérifiée, on peut conclure.`,
            R`On dit aussi que \(P\) est une condition suffisante et \(Q\) une condition nécessaire.`),
          B('bl', 'Table de vérité', TB([R`\(P\)`, R`\(Q\)`, R`\(P\Rightarrow Q\)`], [['V', 'V', 'V'], ['V', 'F', 'F'], ['F', 'V', 'V'], ['F', 'F', 'V']])),
          B('gr', 'À retenir', 'Une implication n’est fausse que dans un seul cas : quand l’hypothèse est vraie mais que la conclusion ne l’est pas.')),
        S('6', 'Contraposée et réciproque',
          B('or', 'Contraposée', R`La contraposée de l’implication \(P\Rightarrow Q\) est \(\overline{Q}\Rightarrow\overline{P}\). Si \(Q\) est fausse alors \(P\) est fausse.`,
            R`Exemple : « non (Africain) \(\Rightarrow\) non (Malgache) » est la contraposée de « Malgache \(\Rightarrow\) Africain ».`),
          B('or', 'Réciproque', R`La réciproque de l’implication \(P\Rightarrow Q\) est \(Q\Rightarrow P\). Cette réciproque n’a pas forcément la même valeur de vérité : elle peut être vraie ou fausse.`))),
      pg(
        S('7', 'L’équivalence logique « … si et seulement si … »',
          B('or', 'Définition', R`Si \(P\Rightarrow Q\) et \(Q\Rightarrow P\), on dit que \(P\) et \(Q\) sont équivalents et on note : \(\boxed{P\Leftrightarrow Q}\)`),
          B('bl', 'Table de vérité', TB([R`\(P\)`, R`\(Q\)`, R`\(P\Leftrightarrow Q\)`], [['V', 'V', 'V'], ['V', 'F', 'F'], ['F', 'V', 'F'], ['F', 'F', 'V']])))),
      pg(
        S('★', 'Quiz',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, R`Une proposition \(P\) est équivalente à une proposition \(Q\) lorsque :`, [R`\(P=Q\)`, R`\(P\) implique \(Q\) et \(Q\) implique \(P\)`, R`\(P\) et \(Q\) sont fausses`], 1,
             R`\(P\Leftrightarrow Q\) signifie \(P\Rightarrow Q\) et \(Q\Rightarrow P\).`),
          qz(2, 'L’implication est fausse seulement si :', ['P et Q sont vraies en même temps.', 'P est vraie mais Q est fausse.', 'P est fausse mais Q est vraie.'], 1,
             'Une implication n’est fausse que lorsque l’hypothèse est vraie et la conclusion fausse.'))))
    ),

    /* ───────────── QUANTIFICATEURS ───────────── */
    T('Quantificateurs logiques',
      pg(
        S('1', 'Quantificateurs',
          B('or', 'Quantificateur existentiel', R`Pour démontrer qu’il existe un réel \(x\) (ou un entier \(n\)) qui vérifie une certaine propriété, il suffit de trouver <b>un exemple</b> pour lequel la propriété est vérifiée.`),
          B('or', 'Quantificateur universel', R`Pour démontrer qu’une propriété est vraie pour tout réel \(x\), quel que soit le réel \(x\), il faut montrer qu’elle est vraie <b>en toute généralité</b> et pas uniquement sur quelques exemples.`),
          TB(['Symbole', 'Se lit', 'Signification'], [
            [R`\(\forall\)`, '« Pour tout » ou « Quel que soit »', 'La propriété est vraie pour <b>tous</b> les éléments considérés'],
            [R`\(\exists\)`, '« Il existe »', 'La propriété est vraie pour <b>au moins un</b> élément'],
            [R`\(\exists !\)`, '« Il existe un unique »', 'La propriété est vraie pour <b>un seul et unique</b> élément']])),
        S('2', 'Transformer une phrase en formule',
          TB(['Phrase en français', 'Formule logique'], [
            ['« Tous les élèves de la classe ont réussi le contrôle. »', R`\(\forall x\in\text{Classe},\ x\ \text{a réussi}\)`],
            ['« Il existe un nombre entier dont le carré est 49. »', R`\(\exists n\in\mathbb{N},\ n^2=49\)`],
            ['« Pour tout réel x, x² ≥ 0. »', R`\(\forall x\in\mathbb{R},\ x^2\geq0\)`]]))),
      pg(
        S('3', 'Négation d’une proposition quantifiée',
          B('or', 'Règle', R`Pour nier une phrase avec quantificateur, on échange \(\forall\) et \(\exists\), et on nie la propriété.`,
            R`\(\boxed{\text{non}\big(\forall x,\ P(x)\big)\ \equiv\ \exists x,\ \text{non}\,P(x)}\)`,
            R`\(\boxed{\text{non}\big(\exists x,\ P(x)\big)\ \equiv\ \forall x,\ \text{non}\,P(x)}\)`),
          B('bl', 'Exemple', R`<u>Phrase</u> : « Tous les élèves ont un stylo. » \(\to\ \forall x,\ x\ \text{a un stylo}\)`,
            R`<u>Négation</u> : « Il existe (au moins) un élève qui n’a pas de stylo. » \(\to\ \exists x,\ \text{non}\,(x\ \text{a un stylo})\)`))),
      pg(
        S('★', 'Quiz',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, 'Dans la proposition « Tous les élèves aiment les mathématiques », quel quantificateur est utilisé ?', ['Connecteur logique', 'Quantificateur universel', 'Négation', 'Quantificateur existentiel'], 1,
             '« Tous les élèves » correspond au quantificateur universel \\(\\forall\\).'),
          qz(2, 'Quel est le symbole qui représente le quantificateur existentiel ?', [R`\(\in\)`, R`\(\forall\)`, R`\(\exists\)`, R`\(\Leftrightarrow\)`], 2,
             R`Le symbole \(\exists\) se lit « il existe ».`)))),
      pg(
        S('✎', 'Exercices',
          B('gr', 'Exercice 1', 'Écrire la négation de chacune des propositions suivantes :',
            UL('Le nombre 8 est pair.', '15 est divisible par 3.', 'Tous les élèves ont réussi l’examen.', 'Aucun candidat n’est absent.', 'Il existe un élève qui aime les mathématiques.'),
            corr(BIENTOT[0], BIENTOT[1], true)),
          B('gr', 'Exercice 2', R`Soient \(P\), \(Q\) et \(R\) trois propositions :`,
            UL('<b>P</b> : « 25 est un nombre premier. »', '<b>Q</b> : « 18 est divisible par 3. »', '<b>R</b> : « 13 est un nombre pair. »'),
            R`Donner la valeur de vérité de \(P\wedge Q\), \(P\vee Q\), \(P\wedge R\), \(Q\vee R\), \(P\Rightarrow R\), \(Q\Leftrightarrow R\).`,
            corr(BIENTOT[0], BIENTOT[1], true))))
    ),
  ]
}));
