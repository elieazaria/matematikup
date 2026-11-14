/* ═══════════════════════════════════════════════════════════════
   CHAPITRE — Généralités sur les fonctions numériques (2nde)
   Format : registerChapitre / T / pg / S / B / P / TB / UL / VID / qz / corr (outils.js)
   Ordre : Activité (La météo de Velo) → Contenus → Quiz → Exercices
   Règle : 2 titres (S) maximum par page
═══════════════════════════════════════════════════════════════ */

registerChapitre('generalites-fonctions', () => ({
  titre: 'Généralités sur les fonctions numériques', partie: 'Analyse',
  resume: 'Définition, image et antécédent, ensemble de définition, variation, maximum et minimum, tableau de variation.',
  topics: [

    T('Activité : La météo de Velo',
      pg(S('✦', 'Activité : La météo de Velo', FRAME('chapitres/activites/meteo-velo.html', 'Activité : La météo de Velo', 1050)))
    ),

    T('Définition',
      pg(
        S('1.1', 'Définition',
          B('or', 'Définition', R`Une fonction numérique \(f\) est une « machine » qui, à chaque nombre réel \(x\) d’un ensemble \(D\), associe un seul nombre réel appelé \(f(x)\). On écrit : \(\boxed{f : x\mapsto f(x)}\)`),
          B('pu', 'Dans l’activité', 'L’heure est l’entrée, la température est la sortie.')))
    ),

    T('Image et antécédent',
      pg(
        S('1.2', 'Image et antécédent',
          B('or', 'Définition', R`Si \(f(a)=b\), alors :`, UL(R`\(b\) est l’<b>image</b> de \(a\) par \(f\) ;`, R`\(a\) est un <b>antécédent</b> de \(b\) par \(f\).`)),
          TB(['', 'Combien il y en a', 'Comment le trouver'], [
            [R`Image de \(a\)`, 'Toujours une seule', R`On calcule \(f(a)\) : on remplace \(x\) par \(a\)`],
            [R`Antécédents de \(b\)`, '0, 1, 2 ou plus', R`On résout l’équation \(f(x)=b\)`]]),
          B('pu', 'Dans l’activité', '15 °C a deux antécédents (9 h et 20 h) ; 30 °C n’en a aucun.')))
    ),

    T('Ensemble de définition',
      pg(
        S('1.3', 'Ensemble de définition',
          B('or', 'Définition', R`L’ensemble de définition de \(f\), noté \(D_f\), est l’ensemble de tous les nombres \(x\) pour lesquels \(f(x)\) existe (on peut calculer \(f(x)\)).`),
          B('gr', 'Les 3 règles à connaître', TB(['Type de fonction', 'Ce qui pose problème', 'Condition à écrire'], [
            [R`Polynôme (ex. \(3x^2-5x+1\))`, 'Rien !', R`\(D_f=\mathbb{R}\)`],
            [R`Fraction (ex. \(\dfrac{12}{x}\))`, 'Diviser par 0', R`dénominateur \(\neq0\)`],
            [R`Racine carrée (ex. \(\sqrt{x}\))`, 'Racine d’un nombre négatif', R`expression sous la racine \(\geq0\)`]])))),
      pg(
        S('➢', 'Méthode en 4 étapes',
          B('gr', 'Méthode', OL('Repère ce qui peut poser problème (une fraction ? une racine ?).', 'Écris la condition (≠ 0 ou ≥ 0).', 'Résous cette condition.', 'Conclus avec un intervalle (ou ℝ privé de quelques nombres).')),
          VID()))
    ),

    T('Variation',
      pg(
        S('1.4', 'Variation d’une fonction',
          P(R`Soit \(f\) une fonction et \(I\) un intervalle inclus dans \(D_f\).`),
          B('or', 'Croissante', R`\(f\) est <b>croissante</b> sur \(I\) si : pour tous \(a<b\) dans \(I\), \(f(a)\leq f(b)\) (elle monte ↗ : elle garde l’ordre).`),
          B('or', 'Décroissante', R`\(f\) est <b>décroissante</b> sur \(I\) si : pour tous \(a<b\) dans \(I\), \(f(a)\geq f(b)\) (elle descend ↘ : elle inverse l’ordre).`),
          B('or', 'Constante', R`\(f\) est <b>constante</b> sur \(I\) si \(f(a)=f(b)\) pour tous \(a\), \(b\) dans \(I\).`))),
      pg(
        S('1.5', 'Maximum et minimum',
          B('or', 'Maximum', R`Le <b>maximum</b> de \(f\) est la plus grande valeur prise par \(f(x)\) (le « sommet »).`),
          B('or', 'Minimum', R`Le <b>minimum</b> de \(f\) est la plus petite valeur prise par \(f(x)\) (le « creux »).`),
          B('bl', 'Tableau de variation', P('Le tableau de variation résume tout avec des flèches :'),
            TB([R`\(x\)`, '6', '', '15', '', '21'], [[R`\(T(x)\)`, '10', '↗', '26', '↘', '12']]),
            R`Lecture : \(T\) croît de \(10\) à \(26\) sur \([6\,;15]\), puis décroît de \(26\) à \(12\) sur \([15\,;21]\). Le maximum est \(26\), atteint en \(x=15\).`)))
    ),

    T('Quiz',
      pg(
        S('★', 'Quiz',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, 'Dans l’activité de Velo, que représente l’entrée de la fonction ?', ['La température', 'L’heure', 'La station météo'], 1,
             'L’heure est l’entrée \\(x\\), la température est la sortie \\(T(x)\\).'),
          qz(2, R`Si \(f(a)=b\), alors :`, [R`\(b\) est l’image de \(a\)`, R`\(a\) est l’image de \(b\)`, R`\(a\) et \(b\) sont des antécédents`], 0,
             R`\(b=f(a)\) est l’image de \(a\) ; \(a\) est un antécédent de \(b\).`),
          qz(3, 'Combien d’antécédents un nombre peut-il avoir ?', ['Toujours un seul', '0, 1, 2 ou plus', 'Toujours deux'], 1,
             'Dans l’activité, 15 °C a deux antécédents et 30 °C n’en a aucun : on peut en avoir 0, 1, 2 ou plus.'),
          qz(4, R`L’ensemble de définition de \(f(x)=\dfrac{12}{x}\) est :`, [R`\(\mathbb{R}\)`, R`\(]-\infty\,;0[\,\cup\,]0\,;+\infty[\)`, R`\([0\,;+\infty[\)`], 1,
             R`On ne peut pas diviser par \(0\) : \(x\neq0\).`),
          qz(5, R`\(f\) est croissante sur \(I\) si, pour tous \(a<b\) dans \(I\) :`, [R`\(f(a)\leq f(b)\)`, R`\(f(a)\geq f(b)\)`, R`\(f(a)=f(b)\)`], 0,
             'Une fonction croissante garde l’ordre : elle monte.'))))
    ),

    T('Exercices',
      pg(
        S('✎', 'Exercices (1)',
          exo(1, R`<b>Image et antécédent.</b> Soit \(f(x)=2x-3\).`, OL(R`Calculer l’image de \(4\) par \(f\).`, R`Calculer \(f(-1)\).`, R`Trouver l’antécédent de \(7\) par \(f\).`)),
          exo(2, R`<b>Ensemble de définition.</b> Déterminer l’ensemble de définition de chaque fonction :`,
            UL(R`\(f(x)=3x^2-5x+1\)`, R`\(g(x)=\dfrac{12}{x}\)`, R`\(h(x)=\sqrt{x}\)`, R`\(k(x)=\dfrac{5}{x-2}\)`, R`\(m(x)=\sqrt{x-4}\)`)))),
      pg(
        S('✎', 'Exercices (2)',
          exo(3, R`<b>Lecture d’un tableau de variation.</b> On donne le tableau de variation d’une fonction \(g\) sur \([-2\,;4]\) :`,
            TB([R`\(x\)`, '−2', '', '1', '', '4'], [[R`\(g(x)\)`, '3', '↘', '−1', '↗', '5']]),
            OL(R`Sur quels intervalles \(g\) est-elle décroissante ? croissante ?`, 'Quel est le minimum de \\(g\\) ? Pour quelle valeur de \\(x\\) est-il atteint ?', 'Quel est le maximum de \\(g\\) ?')),
          exo(4, '<b>Vrai ou faux ?</b> Justifier chaque réponse :',
            UL('Un nombre a toujours une seule image par une fonction.', 'Un nombre a toujours un seul antécédent.', R`\(\sqrt{x}\) est définie pour tout réel \(x\).`)))),
      pg(
        S('✎', 'Exercices (3)',
          exo(5, '<b>Location de vélos.</b>', R`Une location de vélo coûte \(3\,000\) Ar de frais fixes plus \(500\) Ar par heure. Le prix, en Ar, pour \(x\) heures est \(f(x)=500x+3000\), avec \(x\in[0\,;8]\).`,
            OL(R`Calculer \(f(2)\).`, 'Pendant combien d’heures peut-on louer le vélo pour payer \\(6\\,000\\) Ar ?', R`La fonction \(f\) est-elle croissante ou décroissante ? Que signifie-t-elle ici ?`))))
    ),
  ]
}));
