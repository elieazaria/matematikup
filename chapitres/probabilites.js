/* ═══════════════════════════════════════════════════════════════
   CHAPITRE — Probabilité
   Format : registerChapitre / T / pg / S / B / P / TB / UL / VID / qz / corr (outils.js)
   Ordre : Activité (roue de Yas) → Vocabulaires → Probabilité d’un événement → Équiprobabilité → Quiz → Exercices
   Règle : 2 titres (S) maximum par page
   Données de la roue (activité) : 14 secteurs, 63 parts égales (1 part = 360°/63)
   PUBG 5 · Tour sup 3+3+3 = 9 · Combo 4 · Netflix 5 · 50 SMS 5 · 1 Go 5 · 100 Mo 5 · Oups 5×5 = 25
═══════════════════════════════════════════════════════════════ */
const GAINS = 'PUBG 60 UC, Tour sup, Combo, Netflix 15 USD, 50 SMS, 100 Mo, 1 Go';

registerChapitre('probabilites', () => ({
  titre: 'Probabilité', partie: { defaut: 'Traitement de données et probabilités', '1ere-L': 'Traitement de données' },
  resume: 'Expérience aléatoire, événements, univers, probabilité d’un événement, loi de probabilité, probabilité forte ou faible et équiprobabilité.',
  topics: [

    T('Activité : La roue de Yas',
      pg(S('✦', 'Activité : La roue de la fortune de Yas', FRAME('chapitres/activites/roue-yas.html', 'Activité : La roue de la fortune de Yas', 1150)))
    ),

    T('Vocabulaires',
      pg(
        S('1', 'Expérience aléatoire et événements',
          B('or', 'Expérience aléatoire', 'Une expérience aléatoire est une expérience dont le résultat ne peut pas être prévu avec certitude, même si l’on connaît toutes les conditions.'),
          B('bl', 'Exemple', 'Faire tourner la roue de la fortune Yas une fois.'),
          B('or', 'Événement', 'Chaque résultat possible de l’expérience est appelé événement.',
            'Dans le cas de la roue de Yas, les événements possibles sont :',
            UL('<b>Événement G</b> : « obtenir un gain » (SMS, data, etc.)', '<b>Événement O</b> : « obtenir Oups » (aucun gain).')))),
      pg(
        S('1.1', 'Univers et éventualités',
          B('or', 'Univers des possibles', R`L’ensemble de tous les résultats possibles s’appelle l’<b>univers des possibles</b>, noté \(\Omega\).`),
          B('bl', 'Exemple', R`\(\Omega=\{\text{PUBG 60 UC, Tour sup, Combo, Netflix 15 USD, 50 SMS, 100 Mo, 1 Go, Oups}\}\)`),
          B('or', 'Événement élémentaire', 'Un événement élémentaire est un événement avec un seul résultat.', R`Exemple : « Obtenir 1 Go ».`),
          B('or', 'Éventualité', R`Une éventualité est un élément de l’univers. Exemple : \(\text{1 Go}\).`)),
        S('1.2', 'Événements particuliers',
          B('or', 'Événement contraire', R`L’événement contraire de \(G\) est l’événement noté \(\overline{G}\) qui est réalisé si \(G\) ne l’est pas.`,
            R`Exemple : \(G\) : « obtenir un gain » ; \(\overline{G}\) : « obtenir Oups ».`),
          B('or', 'Événement impossible', 'Un événement qui ne contient aucun résultat de l’univers. Il ne peut jamais se produire.', 'Exemple : « Obtenir une offre WiFiber. »'),
          B('or', 'Événement certain', 'Un événement qui contient tous les résultats de l’univers. Il se produit obligatoirement à chaque fois.', 'Exemple : « Tomber sur une case Gain OU sur une case Oups. »')))
    ),

    T('Probabilité d’un événement',
      pg(
        S('2', 'Calcul de la probabilité',
          B('or', 'Définition', 'La probabilité d’un événement correspond à la chance qu’il se produise.',
            R`On définit une probabilité \(P\) sur l’univers \(\Omega=\{e_1,e_2,\dots,e_n\}\) en associant à chaque événement élémentaire \(\{e_i\}\) de \(\Omega\) un nombre réel positif \(p_i\) vérifiant :`,
            OL(R`\(0\leq p_i\leq1\)`, R`\(p_1+p_2+\cdots+p_n=1\)`)),
          VID())),
      pg(
        S('2.1', 'Probabilité d’un événement',
          B('or', 'Propriété', R`La probabilité d’un événement \(G\) est la somme des probabilités de toutes les éventualités appartenant à \(G\).`),
          B('bl', 'Exemple', R`\(G\) = « obtenir un gain » \(=\{\text{PUBG 60 UC, Tour sup, Combo, Netflix 15 USD, 50 SMS, 100 Mo, 1 Go}\}\)`,
            'Les secteurs de la roue n’ont pas tous la même taille : on la partage en 63 parts égales (1 part = 360° ÷ 63).',
            R`\(P(G)=\dfrac{5+9+4+5+5+5+5}{63}=\dfrac{38}{63}\approx0{,}60\)`,
            R`\(P(O)=\dfrac{25}{63}\approx0{,}40\) et \(P(G)+P(O)=1\).`)),
        S('2.2', 'Loi de probabilité',
          B('or', 'Définition', 'La loi de probabilité est un tableau qui associe à chaque événement sa probabilité.'),
          B('bl', 'Loi de probabilité de la roue de Yas',
            TB(['Résultat', 'PUBG 60 UC', 'Tour sup', 'Combo', 'Netflix 15 USD', '50 SMS', '100 Mo', '1 Go', 'Oups'],
              [['Probabilité', R`\(\frac{5}{63}\)`, R`\(\frac{9}{63}\)`, R`\(\frac{4}{63}\)`, R`\(\frac{5}{63}\)`, R`\(\frac{5}{63}\)`, R`\(\frac{5}{63}\)`, R`\(\frac{5}{63}\)`, R`\(\frac{25}{63}\)`]]),
            R`La somme des probabilités vaut \(\dfrac{63}{63}=1\).`))),
      pg(
        S('3', 'Probabilité forte et probabilité faible',
          B('or', 'Probabilité forte', 'Un événement a une probabilité forte lorsque sa probabilité est élevée.'),
          B('or', 'Probabilité faible', 'Un événement a une probabilité faible lorsque sa probabilité est petite.'),
          B('bl', 'Exemple', R`Dans la roue de Yas, « Oups » (\(\approx40\ \%\)) a une probabilité plus élevée que chacun des autres résultats, car il occupe un plus grand nombre de secteurs. L’événement « Gain » (\(\approx60\ \%\)) a une probabilité forte.`)))
    ),

    T('Équiprobabilité',
      pg(
        S('4', 'Équiprobabilité',
          B('or', 'Définition', 'Il y a équiprobabilité lorsque tous les événements élémentaires ont la même probabilité de se produire.'),
          B('or', 'Formule', R`En cas d’équiprobabilité : \(\boxed{P(G)=\dfrac{\text{nombre de cas favorables}}{\text{nombre de cas possibles}}=\dfrac{\operatorname{card}G}{\operatorname{card}\Omega}}\)`),
          B('gr', 'Dans le cas de la roue de Yas', 'Si les secteurs d’une roue ne sont pas répartis de manière équitable, alors la situation n’est pas équiprobable.',
            UL('Les événements n’ont pas la même probabilité ;', 'Le jeu n’est donc pas équiprobable, même s’il reste aléatoire.'))))
    ),

    T('Quiz',
      pg(
        S('★', 'Quiz', QUIZ({ seuils: [1, 0.7, 0.4] },
          qz(1, 'Une expérience aléatoire est une expérience dont :', ['le résultat est prévisible avec certitude', 'le résultat ne peut pas être prévu avec certitude', 'on ne connaît pas les conditions'], 1,
             'Même si l’on connaît toutes les conditions, le résultat ne peut pas être prévu avec certitude.'),
          qz(2, 'Dans la roue de Yas, l’univers des possibles contient :', ['2 résultats (Gain, Oups)', '8 résultats différents', '14 résultats'], 1,
             'Il y a 14 secteurs mais 8 résultats différents : « Tour sup » apparaît 3 fois et « Oups » 5 fois.'),
          qz(3, '« Obtenir une offre WiFiber » sur la roue de Yas est :', ['un événement certain', 'un événement impossible', 'un événement élémentaire'], 1,
             'Aucun secteur ne propose WiFiber : l’événement ne contient aucun résultat de l’univers, sa probabilité est 0.'),
          qz(4, 'Une probabilité est toujours :', ['comprise entre 0 et 1', 'supérieure à 1', 'un nombre négatif ou nul'], 0,
             R`Chaque \(p_i\) vérifie \(0\leq p_i\leq1\), et la somme de toutes les probabilités vaut \(1\).`),
          qz(5, 'La roue de Yas est-elle équiprobable ?', ['Oui', 'Non'], 1,
             'Les secteurs n’ont pas tous la même taille et « Oups » occupe 5 secteurs : les résultats n’ont pas la même probabilité.'))))
    ),

    T('Exercices',
      pg(
        S('✎', 'Exercices (1)',
          exo(1, '<b>Vocabulaire.</b> On lance un dé équilibré à 6 faces et on note le numéro de la face du dessus.',
            OL(R`Donner l’univers \(\Omega\).`, 'Donner un événement élémentaire.', 'Donner un événement impossible et un événement certain.', R`Donner l’événement contraire de \(A\) : « obtenir un nombre pair ».`)),
          exo(2, '<b>Loi de probabilité.</b> Sur la roue de Yas (63 parts égales), « Tour sup » occupe 9 parts, « Combo » 4 parts, « Oups » 25 parts et chacun des cinq autres résultats 5 parts.',
            OL('Calculer la probabilité de chaque résultat.', 'Présenter la loi de probabilité dans un tableau.', 'Vérifier que la somme des probabilités est égale à 1.')))),
      pg(
        S('✎', 'Exercices (2)',
          exo(3, '<b>Probabilité d’un événement.</b> Avec la roue de Yas :',
            OL(R`Calculer \(P(G)\), où \(G\) est l’événement « obtenir un gain ».`, R`En déduire \(P(O)\), où \(O\) est l’événement « obtenir Oups ».`, 'Calculer la probabilité d’obtenir « Combo » ou « 1 Go ».', 'Un gain a-t-il une probabilité forte ou faible ? Justifier.')),
          exo(4, '<b>Équiprobabilité.</b> Une urne contient 5 boules rouges, 3 vertes et 2 bleues, indiscernables au toucher. On tire une boule au hasard.',
            OL('Y a-t-il équiprobabilité entre les couleurs ? Et entre les boules ?', 'Calculer la probabilité de tirer une boule rouge.', 'Calculer la probabilité de ne pas tirer une boule verte.'))))
    ),
  ]
}));
