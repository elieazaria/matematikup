/* ═══════════════════════════════════════════════════════════════
   CHAPITRE 1 — Fonction numérique d'une variable réelle
═══════════════════════════════════════════════════════════════ */
registerChapitre('fonctions', () => ({
  titre: 'Fonction numérique d’une variable réelle', partie: 'Analyse',
  resume: 'Ensemble de définition, parité, limites, continuité, dérivabilité, variations, tangente et traçage d’une courbe.',
  topics: [

    T('Ensemble de définition',
      pg(
        S('1', 'Ensemble d’existence d’une fonction',
          B('or', 'Définition', R`Une fonction numérique d’une variable réelle associe à chaque réel \(x\), au plus un réel, noté \(f(x)\).`,
            R`Le domaine de définition de \(f\) est : \(\;\boxed{D_f=\{x\in\mathbb{R}\ ;\ f(x)\ \text{existe}\}}\)`,
            R`\(x\) est la variable et \(f(x)\) est l’image de \(x\).`),
          B('or', 'Définition · Antécédent', R`Soit \(f\) une fonction définie sur un ensemble \(D_f\) et \(y\) un réel. On appelle antécédent de \(y\) par \(f\), tout réel \(x\) de \(D_f\) dont l’image par \(f\) est \(y\), c’est-à-dire tout réel \(x\) vérifiant \(f(x)=y\).`,
            R`Si \(f\) est donnée par une formule, \(D_f\) est l’ensemble des \(x\) dans lesquels le calcul de \(f(x)\) est possible.`)),
        S('2', 'Fonction polynomiale',
          B('or', 'Définition', R`On appelle fonction polynomiale toute fonction \(f(x)\) de la forme \(a_nx^n+a_{n-1}x^{n-1}+\cdots+a_0\) où \(a_i\in\mathbb{R}\) et \(n\neq0\). Les \(a_i\) sont les coefficients de \(f(x)\) et \(n\) est son degré.`,
            R`\(D_f=\{\forall x\in\mathbb{R}\ ;\ f(x)\ \text{est définie}\}=\boxed{]-\infty;+\infty[}\)`),
          B('bl', 'Exemple', R`\(f(x)=x^3+2x^2-x+1\)`))),
      pg(
        S('3', 'Fonction rationnelle',
          B('or', 'Définition', R`Soient \(P(x)\) et \(Q(x)\) deux polynômes. On appelle fonction rationnelle toute fonction de la forme \(R(x)=\dfrac{P(x)}{Q(x)}\).`,
            R`\(R(x)\) est défini si et seulement si \(Q(x)\neq0\).`, R`\(\boxed{D_f=\{\forall x\in\mathbb{R}\ ;\ Q(x)\neq0\}}\)`),
          B('bl', 'Exemple', R`\(f(x)=\dfrac{x^2+2x-3}{x-2}\)`, R`\(f(x)\) est définie si \(x-2\neq0\Leftrightarrow x\neq2\)`,
            R`\(D_f=\{\forall x\in\mathbb{R}\ ;\ x\neq2\}=\boxed{]-\infty;2[\,\cup\,]2;+\infty[}\)`))),
      pg(
        S('4', 'Fonction irrationnelle',
          B('or', 'Définition', R`On appelle fonction irrationnelle toute fonction où les termes radicalisés contiennent \(x\).`,
            R`\(I(x)=\sqrt{P(x)}\quad\text{ou}\quad\dfrac{\sqrt{P(x)}}{Q(x)}\quad\text{ou}\quad\dfrac{P(x)}{\sqrt{Q(x)}}\)`),
          B('or', 'Cas 1', R`Si \(I(x)=\sqrt{P(x)}\), \(\;\boxed{D_f=\{\forall x\in\mathbb{R}\ ;\ P(x)\geq0\}}\)`),
          B('bl', 'Exemple', R`\(I(x)=\sqrt{x-1}\)`, R`\(D_f=\{x\in\mathbb{R}\ ;\ x-1\geq0\}=\{x\in\mathbb{R}\ ;\ x\geq1\}=\boxed{[1;+\infty[}\)`),
          B('or', 'Cas 2', R`Si \(I(x)=\dfrac{\sqrt{P(x)}}{Q(x)}\), \(\;\boxed{D_f=\{\forall x\in\mathbb{R}\ ;\ P(x)\geq0\ \text{et}\ Q(x)\neq0\}}\)`),
          B('bl', 'Exemple', R`\(I(x)=\dfrac{\sqrt{2x-1}}{x-2}\)`, R`\(D_f=\{x\in\mathbb{R}\ ;\ 2x-1\geq0\ \text{et}\ x-2\neq0\}=\{x\in\mathbb{R}\ ;\ x\geq\tfrac12\ \text{et}\ x\neq2\}=\boxed{\left[\tfrac12;2\right[\,\cup\,]2;+\infty[}\)`),
          B('or', 'Cas 3', R`Si \(I(x)=\dfrac{P(x)}{\sqrt{Q(x)}}\), \(\;\boxed{D_f=\{\forall x\in\mathbb{R}\ ;\ Q(x)>0\}}\)`),
          B('bl', 'Exemple', R`\(I(x)=\dfrac{x^2+2x-1}{\sqrt{x-2}}\)`, R`\(D_f=\{x\in\mathbb{R}\ ;\ x-2>0\}=\{x\in\mathbb{R}\ ;\ x>2\}=\boxed{]2;+\infty[}\)`))),
      pg(
        S('★', 'Quiz',
          qz(1, R`Le \(D_f\) d’une fonction est toujours écrit sous forme d’un intervalle.`, ['Oui', 'Non'], 1,
             R`Non : \(D_f\) est souvent une réunion d’intervalles, par exemple \(]-\infty;2[\,\cup\,]2;+\infty[\).`),
          `<div class="bx pu"><span class="tg">Question 2 · Associer chaque formule à son type</span>
            <div class="row"><span>\(f(x)=\dfrac{\sqrt{2x-1}}{x-2}\)</span><select data-ans="3"><option value="">Fonction…</option><option value="1">Fonction polynôme</option><option value="2">Fonction rationnelle</option><option value="3">Fonction irrationnelle</option></select></div>
            <div class="row"><span>\(f(x)=\dfrac{x^2+2x-3}{x-2}\)</span><select data-ans="2"><option value="">Fonction…</option><option value="1">Fonction polynôme</option><option value="2">Fonction rationnelle</option><option value="3">Fonction irrationnelle</option></select></div>
            <div class="row"><span>\(f(x)=x^3+2x^2-x+1\)</span><select data-ans="1"><option value="">Fonction…</option><option value="1">Fonction polynôme</option><option value="2">Fonction rationnelle</option><option value="3">Fonction irrationnelle</option></select></div>
            <button type="button" class="go chk">Vérifier</button></div>`,
          qz(3, R`Le domaine de définition de \(f(x)=\dfrac{x^3+x-1}{x+2}\) est :`,
             [R`\(]-\infty;2[\,\cup\,]2;+\infty[\)`, R`\(]2;+\infty[\)`, R`\(]-\infty;-2[\,\cup\,]-2;+\infty[\)`], 2,
             R`Le dénominateur s’annule en \(x=-2\) : \(D_f=\mathbb{R}\setminus\{-2\}\).`))),
      pg(
        S('✎', 'Exercices',
          P(R`Trouver le domaine de définition de chaque fonction suivante :`),
          B('gr', 'Exercice 1', R`\(x^2+3x-5\)`, corr(R`Fonction polynomiale : \(D_f=\mathbb{R}=]-\infty;+\infty[\).`, 'Quel type de fonction est-ce ?')),
          B('gr', 'Exercice 2', R`\(\dfrac{x^3+3x-2}{3x+2}\)`, corr(R`Fonction rationnelle : \(3x+2\neq0\Leftrightarrow x\neq-\tfrac23\).<br>\(D_f=\left]-\infty;-\tfrac23\right[\,\cup\,\left]-\tfrac23;+\infty\right[\).`, 'Le dénominateur doit être différent de 0.')),
          B('gr', 'Exercice 3', R`\(\dfrac{x-2}{x^2+2x+1}\)`, corr(R`\(x^2+2x+1=(x+1)^2\neq0\Leftrightarrow x\neq-1\).<br>\(D_f=\mathbb{R}\setminus\{-1\}=]-\infty;-1[\,\cup\,]-1;+\infty[\).`, 'Reconnaître une identité remarquable au dénominateur.')),
          B('gr', 'Exercice 4', R`\(\sqrt{x^2-2x-3}\)`, corr(R`Il faut \(x^2-2x-3\geq0\). \(\Delta=16\), racines \(-1\) et \(3\).<br>\(x^2-2x-3=(x+1)(x-3)\geq0\) pour \(x\leq-1\) ou \(x\geq3\).<br>\(D_f=]-\infty;-1]\,\cup\,[3;+\infty[\).`, 'Cas 1 : le radicande doit être positif ou nul. Étudier le signe du trinôme.')),
          B('gr', 'Exercice 5', R`\(\dfrac{\sqrt{x^2+2x-3}}{x-2}\)`, corr(R`Il faut \(x^2+2x-3\geq0\) et \(x\neq2\). \(\Delta=16\), racines \(-3\) et \(1\) : \(x\leq-3\) ou \(x\geq1\).<br>\(D_f=]-\infty;-3]\,\cup\,[1;2[\,\cup\,]2;+\infty[\).`, 'Cas 2 : deux conditions à combiner.'))))
    ),

    T('Parité',
      pg(
        S('1', 'Fonction paire',
          P(R`La parité d’une fonction est nécessaire si nous voulons construire la courbe d’une fonction \(f(-x)\) à partir d’une courbe de la fonction \(f(x)\).`),
          B('or', 'Définition', R`\(f\) est paire si et seulement si \(\boxed{\forall x\in D_f,\ f(-x)=f(x)}\)`),
          B('bl', 'Exemple', R`\(f(x)=x^2+1\)`)),
        S('2', 'Fonction impaire',
          B('or', 'Définition', R`\(f\) est impaire si et seulement si \(\boxed{\forall x\in D_f,\ f(-x)=-f(x)}\)`),
          B('bl', 'Exemple', R`\(f(x)=x^3\)`))),
      pg(
        S('3', 'Fonction ni paire ni impaire',
          B('or', 'Définition', R`\(f\) est ni paire ni impaire si \(\exists x\in D_f\) et \(-x\notin D_f\) : \(f\) n’est ni paire ni impaire.`,
            R`Autrement dit, \(\boxed{f(-x)\neq f(x)}\) et \(\boxed{f(-x)\neq -f(x)}\).`)),
        S('4', 'Interprétation graphique',
          P(R`Soit \(\mathcal{C}_f\) la courbe représentative de \(f\) dans un repère orthogonal.`),
          B('or', 'Fonction paire', R`\(f\) paire \(\Longleftrightarrow\) \(\mathcal{C}_f\) symétrique par rapport à l’axe des ordonnées.`),
          B('or', 'Fonction impaire', R`\(f\) impaire \(\Longleftrightarrow\) \(\mathcal{C}_f\) symétrique par rapport à l’origine \(O\).`))),
      pg(
        S('5', 'Axe et centre de symétrie',
          P(R`Soit \(\mathcal{C}_f\) la courbe représentative de \(f\) dans un repère orthogonal.`),
          B('or', 'Axe de symétrie', R`La droite \(x=a\) est un axe de symétrie de \(\mathcal{C}_f\) \(\Longleftrightarrow\)`, R`\(\boxed{\forall x\in D_f,\ \big(2a-x\in D_f\ \text{et}\ f(2a-x)=f(x)\big)}\)`),
          B('or', 'Centre de symétrie', R`Le point \(\Omega(a\,;\,b)\) est un centre de symétrie de \(\mathcal{C}_f\) \(\Longleftrightarrow\)`, R`\(\boxed{\forall x\in D_f,\ \big(2a-x\in D_f\ \text{et}\ f(2a-x)+f(x)=2b\big)}\)`))),
      pg(
        S('★', 'Quiz',
          qz(1, R`\(f\) est paire si \(f(-x)=f(x)\).`, ['Vrai', 'Faux'], 0, R`C’est la définition d’une fonction paire (sur un ensemble \(D_f\) symétrique par rapport à 0).`),
          qz(2, 'La courbe représentative d’une fonction impaire est :', ['Symétrique par rapport à l’axe des abscisses', 'Symétrique par rapport à l’axe des ordonnées', 'Symétrique par rapport à l’origine', 'Asymétrique'], 2,
             R`Une fonction impaire vérifie \(f(-x)=-f(x)\) : sa courbe est symétrique par rapport à l’origine \(O\).`))),
      pg(
        S('✎', 'Exercices (1)',
          B('gr', 'Exercice 1', R`Étudier les parités des fonctions suivantes :`,
            `<div class="ex"><p>\\(f(x)=1-x^2\\)</p><p>\\(h(x)=x-1\\)</p><p>\\(T(x)=x(x^2-1)\\)</p><p>\\(G(x)=x^3+x\\)</p><p>\\(Q(x)=|x|+1\\)</p><p>\\(w(x)=\\dfrac{x\\sqrt{2}}{2}\\)</p></div>`,
            corr(R`Toutes ces fonctions sont définies sur \(\mathbb{R}\) (ensemble symétrique).<br>
              • \(f(-x)=1-x^2=f(x)\) : <b>paire</b>.<br>
              • \(h(-x)=-x-1\) est différent de \(h(x)\) et de \(-h(x)=-x+1\) : <b>ni paire ni impaire</b>.<br>
              • \(T(x)=x^3-x\), \(T(-x)=-x^3+x=-T(x)\) : <b>impaire</b>.<br>
              • \(G(-x)=-x^3-x=-G(x)\) : <b>impaire</b>.<br>
              • \(Q(-x)=|-x|+1=Q(x)\) : <b>paire</b>.<br>
              • \(w(-x)=-w(x)\) : <b>impaire</b>.`, 'Calculer \\(f(-x)\\) puis comparer à \\(f(x)\\) et à \\(-f(x)\\).', true)))),
      pg(
        S('✎', 'Exercices (2 et 3)',
          B('gr', 'Exercice 2', R`Le plan est muni d’un repère orthonormé \((O,\vec{i},\vec{j})\).`, R`Pour chaque fonction, montrons que \((\triangle)\) est un axe de symétrie :`,
            `<div class="ex"><p>\\(f(x)=x^2-4x-1\\), \\((\\triangle):x=2\\)</p><p>\\(h(x)=x^2-2x+1\\), \\((\\triangle):x=1\\)</p><p>\\(g(x)=\\dfrac{1}{x^2+1}\\), \\((\\triangle):x=0\\)</p></div>`,
            corr(R`Les trois fonctions sont définies sur \(\mathbb{R}\) : \(2a-x\in D_f\) pour tout \(x\).<br>
              • \(f(4-x)=(4-x)^2-4(4-x)-1=x^2-4x-1=f(x)\) ✔<br>
              • \(h(2-x)=(2-x)^2-2(2-x)+1=x^2-2x+1=h(x)\) ✔<br>
              • \(g(-x)=\dfrac{1}{x^2+1}=g(x)\) ✔`, R`Calculer \(f(2a-x)\) et vérifier que c’est \(f(x)\).`, true)),
          B('gr', 'Exercice 3', R`Le plan est muni d’un repère orthonormé \((O,\vec{i},\vec{j})\).`, R`Pour chaque fonction, montrons que \(\Omega\) est un centre de symétrie :`,
            `<div class="ex"><p>\\(f(x)=x^3+3x^2+3x+2\\) \\(\\mid\\) \\(\\Omega(-1\\,;\\,1)\\)</p><p>\\(h(x)=\\dfrac{x^2}{x-2}\\) \\(\\mid\\) \\(\\Omega(2\\,;\\,4)\\)</p><p>\\(g(x)=\\dfrac{-1}{1-x}\\) \\(\\mid\\) \\(\\Omega(1\\,;\\,0)\\)</p></div>`,
            corr(R`• \(f(x)=(x+1)^3+1\), \(D_f=\mathbb{R}\). \(f(-2-x)=(-1-x)^3+1=-(x+1)^3+1\), donc \(f(x)+f(-2-x)=2=2\times1\) ✔<br>
              • \(D_h=\mathbb{R}\setminus\{2\}\) et \(4-x\neq2\Leftrightarrow x\neq2\) ✔. \(h(x)+h(4-x)=\dfrac{x^2-(4-x)^2}{x-2}=\dfrac{8x-16}{x-2}=8=2\times4\) ✔<br>
              • \(D_g=\mathbb{R}\setminus\{1\}\), \(2-x\neq1\Leftrightarrow x\neq1\) ✔. \(g(2-x)=\dfrac{-1}{x-1}=\dfrac{1}{1-x}\), donc \(g(x)+g(2-x)=0=2\times0\) ✔`, R`Vérifier \(2a-x\in D_f\), puis calculer \(f(2a-x)+f(x)\) et le comparer à \(2b\).`, true))))
    ),

    T('Limites et branches infinies',
      pg(
        S('✦', 'Activité',
          B('pu', 'Situation', R`Aina utilise son téléphone pendant une journée. Après plusieurs heures d’utilisation, elle remarque que le niveau de sa batterie diminue.`,
            R`Pour étudier cette évolution, on considère un modèle simplifié dans lequel le niveau de la batterie dépend du temps d’utilisation. On suppose que le niveau de batterie est donné par : \(\boxed{f(t)=\dfrac{100}{t+1}}\)`,
            R`où \(t\) représente le temps d’utilisation en heures ; \(f(t)\) représente le niveau de batterie en pourcentage.`),
          B('gr', 'Question 1', 'Quel est le niveau de batterie au début de l’utilisation ?', corr(R`\(f(0)=\dfrac{100}{0+1}=100\) : la batterie est à 100 %.`, R`Au début, \(t=0\).`)),
          B('gr', 'Question 2', 'Calculer le niveau de batterie après 1 h, 2 h, 4 h et 9 h d’utilisation.', corr(R`\(f(1)=50\ \%\) ; \(f(2)=\dfrac{100}{3}\approx33{,}3\ \%\) ; \(f(4)=20\ \%\) ; \(f(9)=10\ \%\).`, R`Remplacer \(t\) dans \(\dfrac{100}{t+1}\).`)),
          B('gr', 'Question 3', 'Compléter le tableau suivant :',
            `<div class="ov"><table class="tb"><tr><th>Temps \\(t\\) en h</th><th>0</th><th>1</th><th>2</th><th>4</th><th>9</th><th>12</th></tr><tr><th>Batterie \\(f(t)\\) %</th><td style="height:40px"></td><td></td><td></td><td></td><td></td><td></td></tr></table></div>`,
            corr(R`\(100\ ;\ 50\ ;\ 33{,}3\ ;\ 20\ ;\ 10\ ;\ 7{,}7\) (car \(f(12)=\dfrac{100}{13}\)).`, 'Utiliser les résultats de la question 2.')),
          B('gr', 'Question 4', 'Que remarquez-vous concernant le niveau de batterie lorsque le temps d’utilisation augmente ?', corr('Le niveau de batterie diminue, de plus en plus lentement.', 'Regarder comment les valeurs du tableau évoluent.')),
          B('gr', 'Question 5', 'Le niveau de batterie peut-il atteindre 0 % dans ce modèle ?', corr(R`Non : \(\dfrac{100}{t+1}>0\) pour tout \(t\geq0\), la batterie n’atteint jamais 0 %.`, 'Une fraction de numérateur 100 peut-elle être nulle ?')),
          B('gr', 'Question 6', 'Vers quelle valeur le niveau de batterie semble-t-il se rapprocher lorsque le temps augmente indéfiniment ?', corr(R`Vers \(0\) : on écrira \(\lim\limits_{t\to+\infty}f(t)=0\).`, 'Regarder les dernières valeurs du tableau.')))),
      pg(
        S('1', 'Définition',
          B('or', 'Définition', R`Soit \(f(x)\) une fonction définie sur son ensemble \(D_f\) et \(x_0\in D_f\).`,
            R`La limite d’une fonction \(f\) est la valeur vers laquelle les images \(f(x)\) se rapprochent lorsque \(x\) se rapproche d’un nombre donné ou tend vers l’infini. Autrement dit, étudier la limite d’une fonction consiste à observer le comportement de ses images lorsque la variable se rapproche d’une valeur.`,
            R`On écrit \(\lim\limits_{x\to x_0}f(x)=l\) ou \(\lim\limits_{x\to x_0}f(x)=\infty\) et on lit « limite de \(f(x)\) quand \(x\) tend vers \(x_0\) ».`)),
        S('2', 'Limite à gauche et limite à droite',
          P(R`Pour étudier le comportement d’une fonction au voisinage d’un réel \(a\), on peut distinguer deux directions :`),
          B('or', 'Limite à gauche', R`\(x\) se rapproche de \(a\) en prenant des valeurs inférieures à \(a\) (\(x<a\)). On écrit \(\boxed{\lim\limits_{x\to a^-}f(x)}\)`),
          B('or', 'Limite à droite', R`\(x\) se rapproche de \(a\) en prenant des valeurs supérieures à \(a\) (\(x>a\)). On écrit \(\boxed{\lim\limits_{x\to a^+}f(x)}\)`))),
      pg(
        S('3', 'Limite finie en ∞',
          B('or', 'Définition', R`On dit que \(f(x)\) tend vers un réel \(l\) lorsque \(x\) tend vers \(\infty\) si les valeurs de \(f(x)\) se rapprochent de \(l\) lorsque \(x\) devient de plus en plus grand.`, R`On écrit : \(\boxed{\lim\limits_{x\to\infty}f(x)=l}\)`),
          B('gr', 'Interprétation graphique', R`Soit \(f\) une fonction et \(\mathcal{C}_f\) sa courbe représentative. Si \(\lim\limits_{x\to\infty}f(x)=l\), on dit que la droite \(\Delta\) d’équation \(y=l\) est une asymptote horizontale à \(\mathcal{C}_f\) en \(\infty\).`)),
        S('4', 'Limite infinie en \\(a\\)',
          B('or', 'Définition', R`On dit que \(f\) tend vers \(\infty\) si les valeurs de \(f(x)\) deviennent aussi grandes que l’on veut lorsque \(x\) se rapproche de \(a\). On écrit : \(\boxed{\lim\limits_{x\to a}f(x)=\infty}\)`),
          B('gr', 'Interprétation graphique', R`Soit \(f\) une fonction et \(\mathcal{C}_f\) sa courbe représentative. Si \(\lim\limits_{x\to a}f(x)=\infty\), on dit que la droite \(\Delta\) d’équation \(x=a\) est une asymptote verticale à \(\mathcal{C}_f\) en \(a\).`))),
      pg(
        S('5', 'Limite infinie en ∞',
          B('or', 'Définition', R`Lorsque les valeurs de \(f(x)\) deviennent arbitrairement grandes (ou très petites) lorsque \(x\) tend vers \(\infty\), on écrit : \(\boxed{\lim\limits_{x\to\infty}f(x)=\infty}\)`),
          B('gr', 'Interprétation graphique', R`\(\lim\limits_{x\to\infty}f(x)=\infty\) et \(\lim\limits_{x\to\infty}\big(f(x)-(ax+b)\big)=0\ \Longleftrightarrow\) la droite d’équation \(y=ax+b\) est une asymptote oblique pour \((\mathcal{C})\).`)),
        S('6', 'Limites usuelles à connaître',
          TB(['Limite', 'Résultat'], [
            [R`\(\lim\limits_{x\to+\infty}x,\ x^2,\ x^3\)`, R`\(+\infty\)`],
            [R`\(\lim\limits_{x\to-\infty}x^2\) (puissance paire)`, R`\(+\infty\)`],
            [R`\(\lim\limits_{x\to-\infty}x,\ x^3\) (puissance impaire)`, R`\(-\infty\)`],
            [R`\(\lim\limits_{x\to+\infty}\frac1x\) et \(\lim\limits_{x\to-\infty}\frac1x\)`, R`\(0\)`],
            [R`\(\lim\limits_{x\to0^+}\frac1x\)`, R`\(+\infty\)`],
            [R`\(\lim\limits_{x\to0^-}\frac1x\)`, R`\(-\infty\)`],
            [R`\(\lim\limits_{x\to0}\frac1{x^2}\)`, R`\(+\infty\) (des deux côtés)`]]))),
      pg(
        S('7', 'Les 4 règles pour calculer une limite',
          TB(['Situation', 'Règle'], [
            [R`Polynôme en \(\pm\infty\)`, 'On garde le terme de plus haut degré seulement.'],
            [R`Fraction en \(\pm\infty\)`, 'On garde le terme de plus haut degré du numérateur et celui du dénominateur, puis on simplifie.'],
            [R`En un point \(a\) de \(D_f\)`, R`On remplace : \(\lim\limits_{x\to a}f(x)=f(a)\).`],
            [R`En un point \(a\) qui annule le dénominateur (numérateur \(\neq0\))`, R`Le résultat est \(+\infty\) ou \(-\infty\). On étudie le signe du numérateur et celui du dénominateur à gauche et à droite de \(a\).`]])),
        S('8', 'Exemples',
          B('bl', 'Exemple 1', R`\(\lim\limits_{x\to+\infty}\big(3x^2-5x+1\big)\). On garde le terme de plus haut degré : \(3x^2\to+\infty\).`),
          B('bl', 'Exemple 2', R`\(\lim\limits_{x\to-\infty}\big(-2x^3+x\big)\). On garde \(-2x^3\). Quand \(x\to-\infty\), \(x^3\to-\infty\) ; multiplié par \(-2\) (négatif), cela donne \(+\infty\).`),
          B('bl', 'Exemple 3', R`\(\lim\limits_{x\to+\infty}\dfrac{2x+3}{x-1}\). Termes de plus haut degré : \(2x\) et \(x\). Le quotient est \(\dfrac{2x}{x}=2\). Donc la limite est \(2\).`),
          B('bl', 'Exemple 4', R`\(\lim\limits_{x\to-\infty}\dfrac{x+1}{x^2+3}\). Termes de plus haut degré : \(x\) et \(x^2\). Le quotient est \(\dfrac{x}{x^2}=\dfrac1x\to0\).`))),
      pg(
        S('9', 'Branche parabolique',
          B('or', 'Direction \\(x\'Ox\\)', R`Si \(\lim\limits_{x\to\pm\infty}f(x)=\pm\infty\) et \(\lim\limits_{x\to\pm\infty}\dfrac{f(x)}{x}=0\), branche parabolique de direction \(x'Ox\).`),
          B('or', 'Direction \\(y\'Oy\\)', R`Si \(\lim\limits_{x\to\pm\infty}f(x)=\pm\infty\) et \(\lim\limits_{x\to\pm\infty}\dfrac{f(x)}{x}=\pm\infty\), branche parabolique de direction \(y'Oy\).`),
          B('or', 'Direction de la droite \\(y=ax\\)', R`Si \(\lim\limits_{x\to\pm\infty}f(x)=\pm\infty\), \(\lim\limits_{x\to\pm\infty}\dfrac{f(x)}{x}=a\) et \(\lim\limits_{x\to\pm\infty}\big(f(x)-ax\big)=\pm\infty\), branche parabolique de direction la droite \(y=ax\).`))),
      pg(
        S('★', 'Quiz',
          qz(1, R`Soit une fonction \(f\) telle que \(\lim\limits_{x\to+\infty}f(x)=3\). Quelle est l’interprétation géométrique ?`,
             [R`La droite \(x=3\) est une asymptote verticale.`, R`La droite \(y=3\) est une asymptote horizontale.`, R`La droite \(y=x+3\) est une asymptote oblique.`], 1,
             R`Une limite finie \(l\) en l’infini donne l’asymptote horizontale \(y=l\).`)))
    ),

    T('Continuité',
      pg(
        S('1', 'Continuité d’une fonction',
          B('or', 'Définition', R`Soit \(f\) une fonction définie sur l’ensemble d’existence \(D_f\) et \(x_0\) un réel tel que \(x_0\in D_f\).`),
          B('or', 'Continuité à droite', R`\(f\) est continue à droite en \(x_0\) si \(f(x_0)\) existe et \(\boxed{\lim\limits_{x\to x_0^+}f(x)=f(x_0)}\)`),
          B('or', 'Continuité à gauche', R`\(f\) est continue à gauche en \(x_0\) si \(f(x_0)\) existe et \(\boxed{\lim\limits_{x\to x_0^-}f(x)=f(x_0)}\)`),
          B('gr', 'Continuité en \\(x_0\\)', R`\(f\) continue en \(x_0\ \Longleftrightarrow\ f\) est continue à gauche et à droite`)),
        S('2', 'Continuité sur un intervalle \\(I\\)',
          B('or', 'Définition', R`Soit \(f\) une fonction définie sur un intervalle \(I\) et \(x_0\in I\). Dire que \(f\) continue en \(x_0\) sur l’intervalle \(I\) signifie que \(f\) est continue en tout nombre de \(I\).`,
            R`\(\boxed{f\ \text{continue dans}\ I\ \Longleftrightarrow\ \forall x_0\in I,\ f\ \text{continue en}\ x_0}\)`))),
      pg(
        S('3', 'Propriétés',
          B('or', 'Propriétés', R`La somme de deux fonctions continues sur \(I\) est continue sur \(I\).`, R`Le produit de deux fonctions continues sur \(I\) est continu sur \(I\).`,
            R`Le quotient de deux fonctions continues sur \(I\) est continu sur \(I\).`,
            R`\(f\) continue en \(I\) et \(g\) continue en \(I\), la composée de deux fonctions \(f\circ g\) est continue dans \(I\).`)),
        S('4', 'Prolongement par continuité',
          B('or', 'Définition', R`Soit \(f\) une fonction continue sur \(I\) sauf en \(x_0\) mais la limite de \(f\) en \(x_0\) est égale à \(\alpha\in\mathbb{R}\), alors la fonction \(\overline{f}\) telle que \(\overline{f}(x)=f(x)\) si \(x\neq x_0\) et \(\overline{f}(x_0)=\alpha\), définie et continue sur \(I\), est appelée prolongement par continuité de \(f\).`))),
      pg(
        S('5', 'Théorème de valeur intermédiaire',
          B('or', 'Théorème', R`Soit \(f\) une fonction continue dans l’intervalle \([a\,;b]\) vérifiant \(f(a)\leq0\) et \(f(b)\geq0\), alors il existe \(c\in[a\,;b]\) vérifiant \(\boxed{f(c)=0}\).`)))
    ),

    T('Dérivabilité',
      pg(
        S('✦', 'Activité',
          B('pu', 'Situation', 'Peut-on connaître la vitesse exacte du véhicule à un instant précis, et non sur un intervalle de temps ?',
            R`Un véhicule se déplace sur une route dont la position, en fonction du temps, est modélisée par : \(\boxed{f(t)=t^2}\) où \(t\) représente le temps en secondes et \(f(t)\) la distance parcourue en mètres.`,
            R`On souhaite étudier l’évolution de la position du véhicule à l’instant \(t=2\).`),
          B('pu', 'Partie A – Observer les variations', 'Les questions suivantes préparent la notion de nombre dérivé.'),
          B('gr', 'Question 1', R`Calculer la position du véhicule aux instants suivants : \(t=1\), \(t=2\), \(t=3\).`, corr(R`\(f(1)=1\) m ; \(f(2)=4\) m ; \(f(3)=9\) m.`, R`Calculer \(t^2\).`)),
          B('gr', 'Question 2', R`Calculer la variation de position entre \(t=2\) et \(t=3\). (La variation de position est la différence entre la position finale et la position initiale.)`, corr(R`\(f(3)-f(2)=9-4=5\) m.`, 'Position finale − position initiale.')),
          B('gr', 'Question 3', R`Calculer la vitesse moyenne entre \(t=2\) et \(t=3\), sachant que : \(v_m=\dfrac{\text{variation de position}}{\text{variation de temps}}\)`, corr(R`\(v_m=\dfrac{5}{1}=5\) m/s.`, R`La variation de temps vaut \(3-2=1\) s.`)),
          B('gr', 'Question 4', R`Refaire le calcul entre \(t=2\) et \(t=2{,}5\) puis entre \(t=2\) et \(t=2{,}1\).`, corr(R`• \([2\,;2{,}5]\) : \(\dfrac{6{,}25-4}{0{,}5}=4{,}5\) m/s.<br>• \([2\,;2{,}1]\) : \(\dfrac{4{,}41-4}{0{,}1}=4{,}1\) m/s.`, R`\(f(2{,}5)=6{,}25\) et \(f(2{,}1)=4{,}41\).`)),
          B('gr', 'Question 5', R`Que remarquez-vous lorsque le deuxième instant se rapproche de \(2\) ?`, corr(R`Les vitesses moyennes (\(5\ ;\ 4{,}5\ ;\ 4{,}1\)) se rapprochent de \(4\) m/s : c’est la vitesse à l’instant \(t=2\), c’est-à-dire le nombre dérivé \(f'(2)=4\).`, 'Regarder la suite des vitesses moyennes calculées.')))),
      pg(
        S('1', 'Nombre dérivé d’une fonction en un point',
          B('or', 'Définition', R`Soit \(f\) une fonction définie sur un intervalle \(I\) contenant \(a\).`,
            R`Pour un réel \(h\neq0\), on appelle taux d’accroissement de \(f\) entre \(a\) et \(a+h\) le nombre : \(\boxed{\dfrac{f(a+h)-f(a)}{h}}\)`,
            R`Si la limite suivante existe et est finie : \(\lim\limits_{h\to0}\dfrac{f(a+h)-f(a)}{h}\), alors on dit que \(f\) est dérivable en \(a\). Cette limite est appelée nombre dérivé de \(f\) en \(a\) et se note \(f'(a)\).`,
            R`Ainsi : \(\boxed{f'(a)=\lim\limits_{h\to0}\dfrac{f(a+h)-f(a)}{h}}\)`),
          B('bl', 'Exemple', R`Soit \(f(x)=x^2\). Calculons son nombre dérivé en \(a=2\).`,
            R`\(f'(2)=\lim\limits_{h\to0}\dfrac{(2+h)^2-2^2}{h}=\lim\limits_{h\to0}\dfrac{4+4h+h^2-4}{h}=\lim\limits_{h\to0}(4+h)=4\)`, R`Donc \(\boxed{f'(2)=4}\)`)),
        S('2', 'Interprétation géométrique',
          B('gr', 'Interprétation géométrique', R`Si \(f\) est dérivable en \(a\), alors :`,
            R`• \(f'(a)\) représente le coefficient directeur de la tangente à la courbe de \(f\) au point d’abscisse \(a\).`,
            R`• L’équation de cette tangente est : \(\boxed{y=f'(x_0)(x-x_0)+f(x_0)}\)`))),
      pg(
        S('3', 'Dérivabilité à gauche et à droite',
          B('or', 'À gauche', R`\(f\) est dérivable à gauche en \(x_0\ \Longleftrightarrow\ \lim\limits_{x\to x_0^-}\dfrac{f(x)-f(x_0)}{x-x_0}=f'(x_0)\in\mathbb{R}\)`),
          B('or', 'À droite', R`\(f\) est dérivable à droite en \(x_0\ \Longleftrightarrow\ \lim\limits_{x\to x_0^+}\dfrac{f(x)-f(x_0)}{x-x_0}=f'(x_0)\in\mathbb{R}\)`),
          B('gr', 'En \\(x_0\\)', R`\(f\) est dérivable en \(x_0\ \Longleftrightarrow\ f\) est dérivable à gauche et à droite.`)),
        S('4', 'Interprétation graphique',
          B('gr', 'Cas 1', R`Si \(\lim\limits_{x\to x_0^-}\dfrac{f(x)-f(x_0)}{x-x_0}=l\in\mathbb{R}\ \neq\ \lim\limits_{x\to x_0^+}\dfrac{f(x)-f(x_0)}{x-x_0}=l'\in\mathbb{R}\), alors la courbe \((\mathcal{C}_f)\) représentative de \(f\) admet deux demi-tangentes à gauche et à droite au point d’abscisse \(x_0\).`),
          B('gr', 'Cas 2', R`Si \(\lim\limits_{x\to x_0^-}\dfrac{f(x)-f(x_0)}{x-x_0}=+\infty\), alors la courbe \((\mathcal{C}_f)\) représentative de \(f\) admet une demi-tangente verticale dirigée vers le bas.`),
          B('gr', 'Cas 3', R`Si \(\lim\limits_{x\to x_0^+}\dfrac{f(x)-f(x_0)}{x-x_0}=+\infty\), alors la courbe \((\mathcal{C}_f)\) représentative de \(f\) admet une demi-tangente verticale dirigée vers le haut.`))),
      pg(
        S('5', 'Théorèmes',
          B('or', 'Théorème 1', R`Si \(f\) est dérivable en \(a\), alors \(f\) est continue en \(a\).`),
          B('or', 'Théorème 2', R`\(f\) est dérivable sur un intervalle ouvert \(I\) si elle est dérivable en tout point de \(I\).`),
          B('or', 'Théorème 3', R`\(f\) est dérivable sur \([a\,;b]\) si elle est dérivable sur \(]a\,;b[\).`)))
    ),

    T('Fonction dérivée',
      pg(
        S('1', 'Fonction dérivée',
          B('or', 'Définition', R`Soit \(f\) une fonction dérivable en tout point d’un intervalle \(I\).`,
            R`La fonction qui, à chaque réel \(x\) de \(I\), associe le nombre dérivé \(f'(x)\) est appelée fonction dérivée de \(f\).`,
            R`Elle est notée \(f'\) et définie par : \(\boxed{f':x\mapsto f'(x)}\)`)),
        S('2', 'Dérivées usuelles',
          TB([R`\(f(x)\)`, R`\(f'(x)\)`, 'Dérivable sur'], [
            [R`\(k\) (constante)`, R`\(0\)`, R`\(\mathbb{R}\)`],
            [R`\(ax+b\)`, R`\(a\)`, R`\(\mathbb{R}\)`],
            [R`\(x^n\ (n\in\mathbb{N}^*)\)`, R`\(nx^{n-1}\)`, R`\(\mathbb{R}\)`],
            [R`\(\dfrac1x\)`, R`\(-\dfrac{1}{x^2}\)`, R`\(\mathbb{R}^*\)`],
            [R`\(\dfrac{1}{x^n}\)`, R`\(-\dfrac{n}{x^{n+1}}\)`, R`\(\mathbb{R}^*\)`],
            [R`\(\sqrt{x}\)`, R`\(\dfrac{1}{2\sqrt{x}}\)`, R`\(]0\,;+\infty[\)`],
            [R`\(\sin x\)`, R`\(\cos x\)`, R`\(\mathbb{R}\)`],
            [R`\(\cos x\)`, R`\(-\sin x\)`, R`\(\mathbb{R}\)`],
            [R`\(\tan x\)`, R`\(1+\tan^2x=\dfrac{1}{\cos^2x}\)`, R`\(x\neq\dfrac{\pi}{2}+k\pi\)`],
            [R`\(\sqrt[n]{x}\ (n\geq2)\)`, R`\(\dfrac{1}{n\sqrt[n]{x^{n-1}}}\)`, R`\(]0\,;+\infty[\)`]])))
    ),

    T('Opérations sur les dérivées',
      pg(
        S('3', 'Opérations sur les dérivées',
          P(R`Soient \(u\) et \(v\) deux fonctions dérivables sur \(I\), \(k\in\mathbb{R}\) et \(n\in\mathbb{N}^*\).`),
          B('or', 'Somme', R`\(\boxed{(u+v)'=u'+v'}\)`),
          B('or', 'Produit', R`\(\boxed{(u\times v)'=u'v+v'u}\)`),
          B('or', 'Inverse', R`\(\boxed{\left(\dfrac1v\right)'=-\dfrac{v'}{v^2}}\quad(v\neq0)\)`),
          B('or', 'Quotient', R`\(\boxed{\left(\dfrac uv\right)'=\dfrac{u'v-v'u}{v^2}}\quad(v\neq0)\)`),
          B('or', 'Puissance', R`\(\boxed{(u^n)'=nu'u^{n-1}}\)`),
          B('or', 'Racine', R`\(\boxed{\left(\sqrt{u}\right)'=\dfrac{u'}{2\sqrt{u}}}\)`))),
      pg(
        S('4', 'Exemples',
          B('bl', 'Exemple 1', R`\(f(x)=3x^2-5x+1\).`, R`\(f'(x)=3\times2x-5=6x-5\).`),
          B('bl', 'Exemple 2', R`\(g(x)=x^3-3x^2+2\).`, R`\(g'(x)=3x^2-3\times2x=3x^2-6x=3x(x-2)\).`),
          B('bl', 'Exemple 3', R`\(h(x)=\dfrac{2x-1}{x-1}\).`, R`On pose \(u=2x-1\) (\(u'=2\)) et \(v=x-1\) (\(v'=1\)).`,
            R`\(h'(x)=\dfrac{u'v-uv'}{v^2}=\dfrac{2(x-1)-(2x-1)\times1}{(x-1)^2}=\dfrac{2x-2-2x+1}{(x-1)^2}=\boxed{\dfrac{-1}{(x-1)^2}}\)`),
          B('bl', 'Exemple 4', R`\(k(x)=(x^2+1)(x-3)\).`, R`\(u=x^2+1\) (\(u'=2x\)), \(v=x-3\) (\(v'=1\)).`,
            R`\(k'(x)=u'v+uv'=2x(x-3)+(x^2+1)=2x^2-6x+x^2+1=\boxed{3x^2-6x+1}\)`)))
    ),

    T('Variation d’une fonction',
      pg(
        S('1', 'Variation d’une fonction',
          P(R`Soit \(f\) une fonction définie sur un intervalle \(I\).`),
          B('or', 'Strictement croissante', R`\(f\) est strictement croissante sur \(I\) lorsque, pour tous réels \(a\) et \(b\) de \(I\), si \(a<b\), alors \(f(a)<f(b)\).`),
          B('or', 'Strictement décroissante', R`\(f\) est strictement décroissante sur \(I\) lorsque, pour tous réels \(a\) et \(b\) de \(I\), si \(a<b\), alors \(f(a)>f(b)\).`),
          B('gr', 'Sur un intervalle \\(I\\)', R`• si \(f'(x)>0\) sur \(I\), alors \(f\) est croissante sur \(I\) ;`, R`• si \(f'(x)<0\) sur \(I\), alors \(f\) est décroissante sur \(I\) ;`,
            R`• si \(f'(x)=0\) en \(x_0\) et change de signe, alors \(f(x_0)\) est un extremum local (maximum ou minimum) et la tangente y est horizontale.`))),
      pg(
        S('2', 'Tableau de variation',
          B('or', 'Définition', 'Un tableau de variation permet de résumer le sens de variation d’une fonction sur un intervalle donné.'),
          B('gr', 'Pour construire un tableau de variation', '1. Déterminer l’ensemble de définition de la fonction.', R`2. Calculer sa fonction dérivée \(f'(x)\).`,
            R`3. Étudier le signe de \(f'(x)\).`, R`4. Déduire le sens de variation de \(f\).`, '5. Calculer les valeurs de la fonction aux bornes et aux points importants.')))
    ),

    T('Équation de la tangente',
      pg(
        S('1', 'Équation de la tangente',
          B('or', 'Définition', R`La tangente à la courbe de \(f\) au point d’abscisse \(a\) est la droite qui « touche » la courbe en ce point avec la même pente que la courbe. Sa pente est le nombre dérivé \(f'(a)\).`,
            R`Équation de la tangente : \(\boxed{y=f'(a)(x-a)+f(a)}\)`)),
        S('2', 'Méthode en 3 étapes',
          B('gr', 'Méthode', R`1. Calculer \(f(a)\).`, R`2. Calculer \(f'(x)\), puis \(f'(a)\).`, '3. Remplacer dans la formule et simplifier.'),
          B('bl', 'Exemple', R`Soit \(f(x)=x^2-3x+2\), au point d’abscisse \(a=2\).`, R`1. \(f(2)=4-6+2=0\)`, R`2. \(f'(x)=2x-3\), donc \(f'(2)=1\)`, R`3. \(y=1\cdot(x-2)+0\), soit \(\boxed{y=x-2}\)`)))
    ),

    T('Positions relatives de deux courbes',
      pg(
        S('1', 'Position relative par rapport à une droite',
          B('or', 'Principe', R`Pour savoir si la courbe de \(f\) est au-dessus ou en dessous d’une droite d’équation \(y=ax+b\), on étudie le signe de : \(\boxed{f(x)-(ax+b)}\)`),
          B('or', 'Si c’est positif', 'la courbe est au-dessus de la droite ;'),
          B('or', 'Si c’est négatif', 'la courbe est en dessous ;'),
          B('or', 'Si c’est nul', 'la courbe et la droite se coupent (ou se touchent) en ce point.')),
        S('2', 'Méthode en 3 étapes',
          B('gr', 'Méthode', R`1. Écrire la différence \(f(x)-(ax+b)\) et la simplifier.`, '2. La factoriser, puis faire un tableau de signes.', '3. Conclure sur chaque intervalle.'))),
      pg(
        S('3', 'Exemples',
          B('bl', 'Exemple 1', R`Soit \(f(x)=x^2-3x+2\) et sa tangente en \(a=2\), d’équation \(y=x-2\).`,
            R`\(f(x)-(x-2)=x^2-3x+2-x+2=x^2-4x+4=\boxed{(x-2)^2}\)`, 'Un carré est toujours positif ou nul.',
            R`Conclusion : la courbe est au-dessus de sa tangente pour tout \(x\), et elle la touche seulement en \(x=2\).`),
          B('bl', 'Exemple 2', R`Soit \(f(x)=x^3\) et sa tangente en \(a=1\), d’équation \(y=3x-2\).`,
            R`\(f(x)-(3x-2)=x^3-3x+2=\boxed{(x-1)^2(x+2)}\)`, R`\((x-1)^2\) est positif ou nul, donc le signe dépend de \((x+2)\).`,
            R`Conclusion : la courbe est au-dessus de la tangente pour \(x>-2\), en dessous pour \(x<-2\), et elle la coupe en \(x=-2\) et la touche en \(x=1\).`)))
    ),

    T('Points particuliers',
      pg(
        S('★', 'Points particuliers dans une courbe',
          TB(['Point', 'Comment le trouver'], [
            ['Intersection avec l’axe des ordonnées', R`Si \(0\in D_f\) : le point \((0\,;f(0))\)`],
            ['Intersection avec l’axe des abscisses', R`On résout \(f(x)=0\) : les points \((x\,;0)\)`],
            ['Extremums locaux', R`Points \((x_0\,;f(x_0))\) où \(f'(x_0)=0\) avec changement de signe (tangente horizontale)`],
            ['Autres points utiles', 'Quelques valeurs calculées avec un tableau de valeurs']])))
    ),

    T('Traçage d’une courbe',
      pg(
        S('1', 'Méthode de traçage',
          B('gr', 'Pour tracer la courbe de \\(f\\)', R`1. Déterminer l’ensemble de définition \(D_f\).`, '2. Étudier la parité de \\(f\\) (symétrie de la courbe).'.replace(/\\\\/g, '\\'),
            '3. Calculer les limites aux bornes de \\(D_f\\) (asymptotes, branches infinies).', R`4. Calculer \(f'(x)\) et étudier son signe.`, '5. Dresser le tableau de variation.',
            '6. Déterminer les points particuliers : intersections avec les axes, extremums locaux.', '7. Placer les points, puis tracer la courbe.'))),
      pg(
        S('2', 'Exemple',
          B('bl', 'Exemple', R`Tracer la courbe de \(f(x)=x^3-3x\).`, R`1. \(D_f=\mathbb{R}\) (fonction polynomiale).`,
            R`2. \(f(-x)=-x^3+3x=-f(x)\) : \(f\) est impaire, la courbe est symétrique par rapport à l’origine \(O\).`,
            R`3. \(\lim\limits_{x\to+\infty}f(x)=+\infty\) et \(\lim\limits_{x\to-\infty}f(x)=-\infty\) (terme de plus haut degré : \(x^3\)).`,
            R`4. \(f'(x)=3x^2-3=3(x-1)(x+1)\).`),
          B('bl', 'Tableau de variation',
            TB([R`\(x\)`, R`\(]-\infty\,;-1[\)`, R`\(]-1\,;1[\)`, R`\(]1\,;+\infty[\)`], [[R`\(f'(x)\)`, R`\(+\)`, R`\(-\)`, R`\(+\)`], [R`\(f\)`, R`\(\nearrow\)`, R`\(\searrow\)`, R`\(\nearrow\)`]]),
            R`\(f(-1)=2\) : maximum local. \(f(1)=-2\) : minimum local.`),
          B('bl', 'Points particuliers', R`Axe des ordonnées : \(f(0)=0\), le point \((0\,;0)\).`,
            R`Axe des abscisses : \(x^3-3x=x(x^2-3)=0\), donc \(x=0\) ou \(x=\pm\sqrt{3}\).`,
            R`Extremums locaux : \((-1\,;2)\) et \((1\,;-2)\), tangente horizontale.`),
          B('bl', 'Courbe', `<div class="ov"><svg viewBox="0 0 320 280" style="display:block;margin:8px auto;width:100%;max-width:24rem;color:#272275" role="img" aria-label="Courbe de f(x)=x³−3x"><line x1="0" y1="140" x2="320" y2="140" stroke="currentColor"/><line x1="160" y1="0" x2="160" y2="280" stroke="currentColor"/><polyline points="20.0,269.5 23.3,247.8 26.7,227.5 30.0,208.5 33.3,190.7 36.7,174.2 40.0,158.9 43.3,144.8 46.7,131.8 50.0,120.0 53.3,109.2 56.7,99.5 60.0,90.8 63.3,83.1 66.7,76.3 70.0,70.5 73.3,65.5 76.7,61.4 80.0,58.1 83.3,55.6 86.7,53.9 90.0,52.8 93.3,52.5 96.7,52.8 100.0,53.8 103.3,55.3 106.7,57.4 110.0,60.0 113.3,63.1 116.7,66.7 120.0,70.7 123.3,75.1 126.7,79.8 130.0,84.9 133.3,90.3 136.7,95.9 140.0,101.8 143.3,107.9 146.7,114.1 150.0,120.5 153.3,126.9 156.7,133.4 160.0,140.0 163.3,146.6 166.7,153.1 170.0,159.5 173.3,165.9 176.7,172.1 180.0,178.2 183.3,184.1 186.7,189.7 190.0,195.1 193.3,200.2 196.7,204.9 200.0,209.3 203.3,213.3 206.7,216.9 210.0,220.0 213.3,222.6 216.7,224.7 220.0,226.2 223.3,227.2 226.7,227.5 230.0,227.2 233.3,226.1 236.7,224.4 240.0,221.9 243.3,218.6 246.7,214.5 250.0,209.5 253.3,203.7 256.7,196.9 260.0,189.2 263.3,180.5 266.7,170.8 270.0,160.0 273.3,148.2 276.7,135.2 280.0,121.1 283.3,105.8 286.7,89.3 290.0,71.5 293.3,52.5 296.7,32.2 300.0,10.5" fill="none" stroke="#FF5A36" stroke-width="3"/><circle cx="44.5" cy="140.0" r="4" fill="#FF5A36"/><circle cx="160.0" cy="140.0" r="4" fill="#FF5A36"/><circle cx="275.5" cy="140.0" r="4" fill="#FF5A36"/><circle cx="93.3" cy="52.5" r="4" fill="#3730A3"/><circle cx="226.7" cy="227.5" r="4" fill="#3730A3"/><g fill="currentColor" font-size="12"><text x="31" y="44">(−1 ; 2)</text><text x="233" y="244">(1 ; −2)</text><text x="308" y="134">x</text><text x="166" y="12">y</text><text x="148" y="154">O</text></g></svg></div>`)))
    ),
  ]
}));
