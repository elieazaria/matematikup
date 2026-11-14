/* ═══════════════════════════════════════════════════════════════
   DÉNOMBREMENT (1ère L : chapitre 12 · 1ère S : chapitre 24)
   Sources : Dénombrement.pdf (plan et leçon), Yas_1.pdf (activité « Pourquoi 036 ? »),
             arrangement.html (quiz « Les techniques de dénombrement »).
   Réutilise les fichiers ensembles.js et applications.js (chargés automatiquement, voir la fin du fichier).
═══════════════════════════════════════════════════════════════ */
registerChapitre('denombrement', () => ({
  titre: 'Dénombrement',
  partie: { defaut: 'Traitement de données et probabilités', '1ere-L': 'Traitement de données' },
  resume: 'Théorie des ensembles, applications, principe de dénombrement, permutations, arrangements et combinaisons.',
  topics: [

    ...sujets('ensembles'),       // Activité ensemble · Notion sur la théorie des ensembles · Quiz
    ...sujets('applications'),    // Activité · Applications · Vidéo · Quiz · Exercice 1

    /* ───────────── Principe de dénombrement ───────────── */
    T('Principe de dénombrement',
      pg(
        S('1', 'Principe additif',
          B('or', 'Principe additif', R`Si une action peut se faire de \(n\) façons et une autre action (distincte) de \(p\) façons, alors on peut faire l’une <strong>ou</strong> l’autre de \(\boxed{n+p}\) façons.`),
          B('bl', 'Exemple', R`Un élève choisit entre 3 activités sportives <strong>ou</strong> 2 activités artistiques.`, R`\(\to\ 3+2=5\) choix.`))),
      pg(
        S('✦', 'Activité : la combinatoire au service du style',
          P('Habille Nina, compte ses tenues, puis range-les : suis les consignes dans le cadre ci-dessous.'),
          FRAME('chapitres/activites/combinatoire-style.html', 'La combinatoire au service du style', 1250))),
      pg(
        S('2', 'Principe fondamental du dénombrement (principe multiplicatif)',
          B('or', 'Principe multiplicatif', R`Si une situation se décompose en \(p\) étapes successives, avec \(n_1\) choix possibles à la 1<sup>re</sup> étape, puis \(n_2\) choix à la 2<sup>e</sup> étape (quel que soit le choix fait à la 1<sup>re</sup>), …, puis \(n_p\) choix à la \(p\)-ième étape, alors le nombre total de possibilités est :`,
            R`\(\boxed{n_1\times n_2\times\cdots\times n_p}\)`),
          B('bl', 'Exemple', R`Choisir une tenue parmi 3 jupes, 3 chemises et 2 vestes.`, R`\(\to\ 3\times3\times2=18\) tenues possibles.`)))),

    /* ───────────── Permutation ───────────── */
    T('Permutation',
      pg(
        S('✦', 'Activité COI : le sommet',
          P('Installe les représentants des organisations internationales en respectant les consignes du protocole.'),
          FRAME('chapitres/activites/sommet-coi.html', 'Sommet de la COI', 1150))),
      pg(
        S('3', 'Permutation',
          B('or', 'Définition', R`Le nombre de <strong>permutations</strong> d’un ensemble \(\{a_1,\dots,a_n\}\) de \(n\) objets distincts est le nombre de façons de ranger ces \(n\) objets, c’est-à-dire de les ordonner.`,
            R`Pour un ensemble de \(n\) éléments, le total de permutations est donné par : \(\boxed{P_n=n!}\)`),
          B('gr', 'Pourquoi ?', R`Étant donné \(n\) objets \(\{a_1,\dots,a_n\}\), on a \(n\) choix de placement pour le premier objet \(a_1\), \(n-1\) choix pour le deuxième, et ainsi de suite jusqu’à la dernière position qui n’a qu’une seule option.`,
            R`Ainsi : \(\boxed{n!=n\times(n-1)\times\cdots\times2\times1}\)`),
          B('bl', 'Exemple', R`Combien de façons de ranger 4 livres ?`, R`\(\to\ P_4=4!=24\) façons.`)))),

    /* ───────────── Arrangement (avec l'activité Yas 036) ───────────── */
    T('Arrangement',
      pg(
        SA('✦', 'Pourquoi 036 ?',
          YP('',
            'Un jour, Jao se connecte sur Instagram. Il voit cette annonce :',
            '<img class="ad" src="chapitres/img/yas-036.png" alt="Annonce Yas : Bienvenue 036 ! Nous sommes tous Yas !" onerror="this.style.display=\'none\'">',
            'Jao est étonné. Il se demande : <strong>combien de numéros de téléphone Yas peut-on créer avec le préfixe 036 ?</strong>',
            'Il commence à compter… <strong>MAIS</strong> il se rend compte que c’est impossible à faire un par un. Nous allons aider Jao grâce aux mathématiques.')),
        SA('1', 'Combien de numéros ?',
          YP('Question 1', 'Combien de chiffres compte au total un numéro de téléphone ?',
            corr(R`Un numéro compte <b>10 chiffres</b> : le préfixe <b>036</b> (3 chiffres) suivi de <b>7 autres chiffres</b>.`,
              'Compte les chiffres du préfixe, puis ceux qui restent à choisir.')),
          YP('Question 2', 'Combien de variantes de numéros de téléphone peuvent être créées en utilisant un préfixe de trois chiffres ?',
            corr(R`Il reste 7 chiffres à choisir. Chacun peut prendre 10 valeurs (de 0 à 9), les répétitions sont permises et l’ordre compte : c’est une 7-liste de \(\{0,1,\dots,9\}\).<br>
              Principe multiplicatif : \(10\times10\times10\times10\times10\times10\times10=10^7=\boxed{10\,000\,000}\) numéros.`,
              'Pour chacun des 7 chiffres restants, combien de choix as-tu ? Utilise le principe multiplicatif.')))),
      pg(
        SA('2', 'Numéros interdits et numéros réservés',
          YP('Question 3', 'Pour éviter des numéros trop simples, Yas interdit les numéros dont les 7 chiffres sont tous identiques (exemple : 036 0000000, 036 7777777).',
            'a) Combien de numéros sont interdits ?', 'b) Combien de numéros restent disponibles ?',
            corr(R`a) Un numéro interdit est entièrement déterminé par le chiffre répété : \(0000000,\ 1111111,\ \dots,\ 9999999\). Il y a <b>10 numéros interdits</b>.<br>
              b) \(10^7-10=\boxed{9\,999\,990}\) numéros disponibles.`,
              'Un numéro interdit est déterminé par un seul choix : lequel ?', true)),
          YP('Question 4', 'Yas réserve tous les numéros commençant par 036 000xxxx pour des tests techniques.',
            'a) Combien de numéros sont réservés ?', 'b) Combien de numéros restent disponibles pour les abonnés ?',
            corr(R`a) Après <b>036 000</b>, il reste 4 chiffres libres : \(10^4=\boxed{10\,000}\) numéros réservés.<br>
              b) En ne tenant compte que de la réservation : \(10^7-10^4=\boxed{9\,990\,000}\) numéros.<br>
              <i>Pour aller plus loin :</i> si on cumule avec les numéros interdits de la question 3, attention au numéro <b>036 0000000</b>, qui est à la fois interdit <b>et</b> réservé : on ne le retire qu’une seule fois. Il reste alors \(10^7-10-10\,000+1=9\,989\,991\) numéros.`,
              R`Combien de chiffres restent libres après le début « 036 000 » ?`, true))),
        SA('3', 'Pourquoi une nouvelle plage ?',
          YP('Question 5', 'Explique pourquoi les plages 034 et 038 sont devenues insuffisantes et pourquoi Yas a dû ouvrir la plage 036.',
            corr(R`Chaque préfixe offre au plus \(10^7=10\) millions de numéros. Les deux plages 034 et 038 offrent donc au maximum \(2\times10^7=20\) millions de numéros, et moins encore une fois retirés les numéros interdits ou réservés.<br>
              Or l’annonce indique <b>18 millions de clients</b> (et chacun peut avoir plusieurs lignes) : les deux plages étaient presque saturées.<br>
              Ouvrir la plage <b>036</b> ajoute \(10^7\) numéros, soit \(30\) millions de numéros possibles au total.`,
              R`Combien de numéros un seul préfixe peut-il offrir ? Compare ce nombre à 18 millions de clients.`, true)))),
      pg(
        S('4.1', 'Les p-listes (arrangements avec répétition)',
          P(R`Dans toute la section, \(E\) est un ensemble fini à \(n\) éléments (\(n\in\mathbb{N}^*\)) et \(p\in\mathbb{N}^*\).`),
          B('or', 'Définition', R`Une <strong>\(p\)-liste</strong> d’éléments de \(E\) est une suite ordonnée \((x_1,x_2,\dots,x_p)\) de \(p\) éléments de \(E\), pas forcément distincts.`,
            R`Le nombre de \(p\)-listes d’un ensemble à \(n\) éléments est : \(\boxed{n^p}\)`),
          B('bl', 'Exemple', R`Numéro d’un téléphone à 7 chiffres : \(10^7=10\,000\,000\).`)),
        S('4.2', 'Arrangement',
          B('or', 'Définition', R`L’<strong>arrangement</strong> consiste à choisir \(p\) éléments parmi \(n\) de manière <strong>ordonnée</strong>, mais <strong>sans pouvoir reprendre le même élément</strong>.`,
            R`<small>(L’arrangement, c’est comme une permutation, mais on s’arrête avant d’avoir utilisé tout le monde. L’élément clé est qu’un objet ne peut pas être utilisé deux fois.)</small>`,
            R`\(\boxed{A_n^p=n(n-1)(n-2)\cdots(n-p+1)=\dfrac{n!}{(n-p)!}}\)`),
          B('bl', 'Exemple', R`L’élection du bureau de la classe (un Président et un Secrétaire) parmi 25 élèves. L’ordre est important car (Léa présidente, Tom secrétaire) est différent de (Tom président, Léa secrétaire).`,
            R`\(A_{25}^2=25\times24=600\) bureaux possibles.`)))),

    /* ───────────── Combinaison ───────────── */
    T('Combinaison',
      pg(
        S('4.3', 'Combinaison',
          B('or', 'Définition', R`Soient \(E\) un ensemble à \(n\) éléments et \(p\) un entier tel que \(0\leq p\leq n\). Une <strong>combinaison</strong> de \(p\) éléments de \(E\) est une partie de \(E\) ayant \(p\) éléments (l’ordre ne compte pas, pas de répétition).`,
            R`Leur nombre est : \(\boxed{C_n^p=\dfrac{A_n^p}{p!}=\dfrac{n!}{(n-p)!\,p!}}\)`),
          B('bl', 'Exemple', R`Choisir 3 délégués dans une classe de 30 élèves :`,
            R`\(C_{30}^3=\dfrac{30\times29\times28}{3\times2\times1}=4\,060\)`)))),

    /* ───────────── Exercices (2 à 4 ; l'exercice 1 est dans « Applications ») ───────────── */
    T('Exercices',
      pg(
        S('✎', 'Exercice 2 : principe multiplicatif',
          B('gr', 'Énoncé', 'Un restaurant propose 4 entrées, 5 plats et 3 desserts. Combien de repas complets (1 entrée + 1 plat + 1 dessert) peut-on composer ?',
            corr(R`Trois étapes successives : \(4\) choix d’entrée, \(5\) choix de plat, \(3\) choix de dessert.<br>\(4\times5\times3=\boxed{60}\) repas complets.`,
              'Principe multiplicatif : trois étapes successives.'))),
        S('✎', 'Exercice 3 : nombres à trois chiffres distincts',
          B('gr', 'Énoncé', 'Combien de nombres de 3 chiffres distincts peut-on former avec les chiffres 1 à 9 ? Combien sont pairs ?',
            corr(R`<b>Total</b> : on choisit 3 chiffres parmi 9, dans l’ordre et sans répétition : \(A_9^3=9\times8\times7=\boxed{504}\).<br>
              <b>Nombres pairs</b> : le chiffre des unités doit être pair : 4 choix (2, 4, 6 ou 8). Les deux autres chiffres se choisissent ensuite parmi les 8 chiffres restants, dans l’ordre : \(8\times7=56\).<br>
              \(4\times56=\boxed{224}\) nombres pairs.`,
              'Pour les nombres pairs, commence par le chiffre des unités.', true)))),
      pg(
        S('✎', 'Exercice 4 : comités',
          B('gr', 'Énoncé', 'On forme un comité de 5 personnes parmi 6 filles et 4 garçons. Combien de comités :',
            'a) avec exactement 2 garçons ?', 'b) avec au moins un garçon ?', 'c) avec au moins une fille et au moins un garçon ?',
            corr(R`Il y a \(C_{10}^5=252\) comités possibles au total.<br>
              a) 2 garçons parmi 4 et 3 filles parmi 6 : \(C_4^2\times C_6^3=6\times20=\boxed{120}\).<br>
              b) « Au moins un garçon » est le contraire de « aucun garçon » (5 filles parmi 6 : \(C_6^5=6\)). Donc \(252-6=\boxed{246}\).<br>
              c) Un comité de 5 personnes ne peut pas être composé uniquement de garçons (il n’y en a que 4) : il contient donc toujours au moins une fille. La condition revient à « au moins un garçon » : \(\boxed{246}\).`,
              R`Pour « au moins un », passe par le contraire : total moins « aucun ».`, true))))),

    /* ───────────── Quiz (arrangement.html) ───────────── */
    T('Quiz : dénombrement',
      pg(
        S('★', 'Quiz : les techniques de dénombrement',
          P('<strong>5 questions pour faire le bon choix !</strong>'),
          QUIZ({
            fin: ['Excellent ! Tu maîtrises les trois méthodes de dénombrement. 🏆', 'Très bien ! Tu sais reconnaître les principales situations.', 'Bon début ! Revois les critères de choix et entraîne-toi encore.', 'Ne te décourage pas ! Reprends les exemples du cours et recommence.'],
            seuils: [1, 0.7, 0.4] },
          qz(1, R`Un numéro de téléphone est composé de 7 chiffres. Chaque position peut recevoir un chiffre de 0 à 9. Combien de numéros différents peut-on former ?`,
             [R`\(10\times9\times8\times7\times6\times5\times4\)`, R`\(7\times6\times5\times4\times3\times2\times1\)`, R`\(10^7\)`, R`\(10\times9\times8\times7\)`], 2,
             R`Chaque position possède 10 possibilités. Les chiffres peuvent se répéter et l’ordre compte. On a donc \(10^7=10\,000\,000\) numéros possibles. Il s’agit d’une 7-liste.`),
          qz(2, R`Parmi 25 élèves, on choisit un président et un secrétaire pour le bureau de la classe. Un élève ne peut occuper qu’un seul poste. Combien de bureaux différents peut-on former ?`,
             [R`\(25\times25=625\)`, R`\(25\times24=600\)`, R`\(25\times2=50\)`, R`\(25!\)`], 1,
             R`Le choix est ordonné car les fonctions sont différentes. Un élève ne peut pas occuper les deux postes. Il y a 25 choix pour le président puis 24 pour le secrétaire : \(25\times24=600\). C’est un arrangement de 2 éléments parmi 25.`),
          qz(3, R`Dans une classe de 30 élèves, on choisit 3 délégués sans attribuer de rôle particulier. Combien de groupes différents peut-on former ?`,
             [R`\(30\times29\times28\)`, R`\(30^3\)`, R`\(\dfrac{30\times29\times28}{6}\)`, R`\(30\times3\)`], 2,
             R`L’ordre ne compte pas et un élève ne peut être choisi qu’une seule fois. On utilise une combinaison : \(C_{30}^3=\dfrac{30\times29\times28}{3\times2\times1}=4\,060\).`),
          qz(4, R`On forme un code de 4 lettres à partir des lettres A, B, C, D et E. Les lettres peuvent être répétées et leur position compte. Quelle méthode utilise-t-on ?`,
             ['Une combinaison', 'Un arrangement', 'Une 4-liste', 'Une permutation'], 2,
             R`Le code est ordonné et les lettres peuvent être répétées. Il s’agit donc d’une 4-liste. Le nombre de codes possibles est \(5^4=625\).`),
          qm(5, 'Associe chaque situation à la bonne méthode de dénombrement. <em>Sélectionne les trois affirmations correctes.</em>',
             ['Choisir 2 élèves pour les postes de président et secrétaire : arrangement.',
              'Choisir 4 élèves pour former une équipe sans rôle particulier : combinaison.',
              'Former un code de 3 chiffres avec répétition autorisée : 3-liste.',
              'Classer 3 élèves sur un podium : combinaison.'], [0, 1, 2],
             'Président et secrétaire : l’ordre compte et la répétition est interdite, donc arrangement. Équipe sans rôle : l’ordre ne compte pas, donc combinaison. Code avec répétition : l’ordre compte et la répétition est autorisée, donc 3-liste. Un podium est ordonné : ce n’est pas une combinaison.')))))
  ]
}), ['ensembles', 'applications']);
