/* ═══════════════════════════════════════════════════════════════
   CHAPITRE 2 — Généralités sur les suites numériques
═══════════════════════════════════════════════════════════════ */
registerChapitre('suites-generalites', () => ({
  titre: 'Notions sur les suites numériques', partie: 'Algèbre',
  resume: 'Définition, vocabulaire et notation, façons de définir une suite, variation d’une suite.',
  topics: [
    T('Leçon',
      pg(
        S('1', 'Définition',
          B('or', 'Définition', R`Soit \(n_0\in\mathbb{N}\) et \(I=\{n\in\mathbb{N},\ n\geq n_0\}\). Une <strong>suite numérique</strong> est une fonction \(u : I\to\mathbb{R}\) qui, à chaque entier \(n\in I\), associe un réel noté \(u_n\).`,
            R`Autrement dit, c’est une liste de nombres, rangés et numérotés : à l’entier 0 correspond le nombre noté \(u_0\), à l’entier 1 correspond le nombre noté \(u_1\), …, à l’entier \(n\) correspond le nombre noté \(u_n\) (appelé <em>terme de la suite de rang \(n\)</em>). La suite est notée \((u_n)\).`)),
        S('2', 'Vocabulaire et notation',
          TB(['Mot', 'Sens', 'Notation'], [
            ['Suite', 'La liste complète', R`\((u_n)\)`],
            ['Terme', 'Un nombre de la liste', R`\(u_n\)`],
            ['Rang ou indice', 'Le numéro du terme', R`\(n\)`],
            ['Premier terme', 'Le début de la liste', R`\(u_0\) (ou \(u_1\))`],
            ['Terme général', R`La formule de \(u_n\)`, R`\(u_n=\dots\)`],
            ['Terme suivant', R`Celui qui vient juste après \(u_n\)`, R`\(u_{n+1}\)`],
            ['Terme précédent', R`Celui qui vient juste avant \(u_n\)`, R`\(u_{n-1}\)`]]))),
      pg(
        S('3', 'Deux façons de définir une suite',
          B('or', 'Forme explicite', R`On donne \(u_n\) en fonction de \(n\).`),
          B('bl', 'Exemple', R`\(u_n=2n+3\). Alors \(u_0=3\), \(u_1=5\), \(u_2=7\)…`),
          B('or', 'Forme récurrente', 'On donne le premier terme et une règle pour passer d’un terme au suivant.'),
          B('bl', 'Exemple', R`\(u_0=2\) et \(u_{n+1}=3u_n-1\). Alors \(u_1=5\), \(u_2=14\)…`)),
        S('4', 'Variation d’une suite',
          B('or', 'Croissante', R`\((u_n)\) est <strong>croissante</strong> si \(u_{n+1}\geq u_n\) pour tout \(n\) (elle monte ou reste pareille).`),
          B('or', 'Décroissante', R`\((u_n)\) est <strong>décroissante</strong> si \(u_{n+1}\leq u_n\) pour tout \(n\) (elle descend ou reste pareille).`),
          B('or', 'Constante', R`\((u_n)\) est <strong>constante</strong> si \(u_{n+1}=u_n\) pour tout \(n\). Si elle est croissante ou décroissante, on dit qu’elle est <strong>monotone</strong>.`),
          B('gr', 'Méthodes pour trouver la variation',
            TB(['Méthode', 'Comment faire', 'Conclusion'], [
              ['La différence', R`Calculer \(u_{n+1}-u_n\)`, 'Si &gt; 0 : croissante. Si &lt; 0 : décroissante.'],
              ['Le quotient (termes tous positifs)', R`Calculer \(u_{n+1}\div u_n\)`, 'Si &gt; 1 : croissante. Si &lt; 1 : décroissante.'],
              [R`La fonction (si \(u_n=f(n)\))`, R`Étudier \(f\) sur \([0\,;+\infty[\)`, R`\(f\) croissante ⇒ suite croissante.`]]))))
    ),

    T('Vidéo', pg(S('▶', 'Vidéo', VID(''))) ),

    T('Exercices',
      pg(
        S('a', 'Exercice a) — forme explicite',
          B('gr', 'Énoncé', R`Soit la suite \((u_n)\) définie pour tout entier \(n\in\mathbb{N}\) par la formule explicite : \(u_n=3n^2-5n+2\).`,
            UL(R`Calculer les termes \(u_0,\ u_1\) et \(u_4\).`, R`Calculer \(u_{10}\).`),
            corr(R`• \(u_0=3\times0^2-5\times0+2=2\)<br>• \(u_1=3-5+2=0\)<br>• \(u_4=3\times16-20+2=30\)<br>• \(u_{10}=3\times100-50+2=252\)`, R`Remplacer \(n\) par la valeur demandée dans la formule.`))),
        S('b', 'Exercice b) — forme récurrente',
          B('gr', 'Énoncé', R`On considère la suite \((v_n)\) définie par son premier terme \(v_0=1\) et par la relation de récurrence valable pour tout entier \(n\geq0\) : \(v_{n+1}=2v_n+3\).`,
            UL(R`Calculer \(v_0,\ v_1\) et \(v_3\).`),
            corr(R`• \(v_0=1\)<br>• \(v_1=2\times1+3=5\)<br>• \(v_2=2\times5+3=13\), puis \(v_3=2\times13+3=29\)`, R`Il faut calculer \(v_1\), puis \(v_2\), pour obtenir \(v_3\).`)))),
      pg(
        S('c', 'Exercice c) — sens de variation',
          B('gr', 'Énoncé', R`Soit la suite \((w_n)\) définie pour tout \(n\in\mathbb{N}\) par : \(w_n=\dfrac{2n+1}{n+2}\).`,
            UL(R`Calculer \(w_0\) et \(w_1\).`, R`Étudier le sens de variation de la suite \((w_n)\) en calculant la différence \(w_{n-1}-w_n\).`),
            corr(R`• \(w_0=\dfrac12\) et \(w_1=\dfrac33=1\).<br>
              Pour \(n\geq1\) : \(w_{n-1}=\dfrac{2n-1}{n+1}\), donc<br>
              \(w_{n-1}-w_n=\dfrac{(2n-1)(n+2)-(2n+1)(n+1)}{(n+1)(n+2)}=\dfrac{-3}{(n+1)(n+2)}\).<br>
              Cette différence est <b>négative</b> : \(w_{n-1}<w_n\) pour tout \(n\geq1\). La suite \((w_n)\) est donc <b>croissante</b>.`, R`Réduire au même dénominateur, puis étudier le signe du numérateur et du dénominateur.`, true)))),
    ),

    T('Quiz',
      pg(
        S('★', 'Quiz',
          qz(1, R`Pour \(u_n=2n+3\), que vaut \(u_2\) ?`, ['5', '7', '9'], 1, R`\(u_2=2\times2+3=7\).`),
          qz(2, R`\(u_0=2\) et \(u_{n+1}=3u_n-1\). Que vaut \(u_1\) ?`, ['5', '6', '−1'], 0, R`\(u_1=3\times2-1=5\).`),
          qz(3, R`Si \(u_{n+1}-u_n>0\) pour tout \(n\), la suite est…`, ['décroissante', 'constante', 'croissante'], 2, 'Une différence positive signifie que chaque terme est plus grand que le précédent.'),
          qz(4, 'Dans quelle méthode faut-il que tous les termes soient positifs ?', ['La différence', R`Le quotient \(u_{n+1}\div u_n\)`, R`L’étude de la fonction \(f\)`], 1, 'On compare le quotient à 1 : cela suppose des termes positifs.')))
    ),
  ]
}));
