/* ═══════════════════════════════════════════════════════════════
   CHAPITRE — Trinôme du second degré (2nde et 1ère)
   Format : registerChapitre / T / pg / S / B / P / TB / UL / VID / qz / corr (outils.js)
   Ordre : Activité Penalty → Contenus → Simulation → Exercices → Quiz
   Règle : 2 titres (S) maximum par page
═══════════════════════════════════════════════════════════════ */

registerChapitre('trinome', () => ({
  titre: 'Trinôme du second degré', partie: { defaut: 'Algèbre', '1ere-S': 'Analyse' },
  resume: 'Forme canonique, discriminant, résolution d’équations, factorisation, signe d’un trinôme et inéquations du second degré.',
  topics: [

    /* ───────────── ACTIVITÉ ───────────── */
    T('Activité : Penalty',
      pg(
        S('✦', 'Activité : Le penalty de Messi',
          FRAME('chapitres/activites/penalty-messi.html', 'Activité : Le penalty de Messi', 900)))
    ),

    /* ───────────── TRINÔME ET FORME CANONIQUE ───────────── */
    T('Trinôme du second degré',
      pg(
        S('1', 'Définition',
          B('or', 'Définition', R`On appelle trinôme du second degré toute expression de la forme : \(\boxed{f(x)=ax^2+bx+c}\) où \(a\), \(b\) et \(c\) sont des nombres réels et \(a\neq0\).`,
            UL(R`\(a\) est le coefficient de \(x^2\) ;`, R`\(b\) est le coefficient de \(x\) ;`, R`\(c\) est le terme constant.`))),
        S('2', 'Forme canonique',
          B('gr', 'Pourquoi utiliser la forme canonique ?', 'Elle permet notamment de :',
            UL(R`Déterminer le sommet de la parabole : \(S(\alpha\,;\,\beta)\) ;`, R`Déterminer le minimum si \(a>0\), ou le maximum si \(a<0\) ;`, 'Étudier les variations de la fonction ;', 'Faciliter la résolution de certaines équations et inéquations.')),
          B('or', 'Définition', 'Tout trinôme du second degré peut s’écrire sous la forme :',
            R`\(\boxed{f(x)=a(x-\alpha)^2+\beta}\) où \(\alpha=-\dfrac{b}{2a}\) et \(\beta=c-\dfrac{b^2}{4a}\).`,
            'Cette écriture est appelée forme canonique.'))),
      pg(
        S('2.1', 'Obtenir la forme canonique',
          P('Elle s’obtient en factorisant \\(a\\) puis en complétant le carré :'),
          B('or', 'Calcul', R`\(f(x)=a\left[\left(x+\dfrac{b}{2a}\right)^2-\dfrac{b^2}{4a^2}\right]+c\)`,
            R`\(f(x)=a\left(x+\dfrac{b}{2a}\right)^2+c-\dfrac{b^2}{4a}\)`),
          B('bl', 'Exemple', R`\(f(x)=x^2-6x+5\)`, R`\(f(x)=(x-3)^2-9+5=\boxed{(x-3)^2-4}\)`,
            R`Ainsi, \(\alpha=3\) et \(\beta=-4\). Comme un carré est toujours positif ou nul, \(f(x)\geq-4\) : le trinôme admet un minimum égal à \(-4\), atteint pour \(x=3\).`)),
        S('2.2', 'Propriétés',
          B('or', 'Si a > 0', R`La parabole est tournée vers le haut ; le trinôme admet un <b>minimum</b> égal à \(\beta\), atteint pour \(x=\alpha\).`),
          B('or', 'Si a < 0', R`La parabole est tournée vers le bas ; le trinôme admet un <b>maximum</b> égal à \(\beta\), atteint pour \(x=\alpha\).`),
          B('gr', 'Sommet', R`Le sommet de la parabole est \(S(\alpha\,;\,\beta)\).`),
          VID()))
    ),

    /* ───────────── ÉQUATION ET DISCRIMINANT ───────────── */
    T('Résolution d’une équation du second degré',
      pg(
        S('3', 'Équation du second degré et discriminant',
          B('or', 'Définition', R`Résoudre une équation du second degré consiste à déterminer les réels \(x\) qui vérifient : \(\boxed{ax^2+bx+c=0}\), avec \(a\neq0\).`)),
        S('3.1', 'Origine du discriminant',
          P('En complétant le carré dans l’équation, on obtient :'),
          B('or', 'Calcul', R`\(a\left(x+\dfrac{b}{2a}\right)^2-\dfrac{b^2-4ac}{4a}=0\)`,
            R`En multipliant par \(4a\) (qui est non nul), on obtient : \(\boxed{(2ax+b)^2=b^2-4ac}\)`),
          B('or', 'Discriminant', R`L’expression \(b^2-4ac\) permet donc de savoir si cette égalité est possible dans les réels. On l’appelle le discriminant et on la note \(\Delta\).`,
            R`\(\boxed{\Delta=b^2-4ac}\)`))),
      pg(
        S('3.2', R`Premier cas : \(\Delta>0\)`,
          B('or', 'Solutions', 'L’équation admet deux solutions réelles distinctes :', R`\(x_1=\dfrac{-b-\sqrt{\Delta}}{2a}\) et \(x_2=\dfrac{-b+\sqrt{\Delta}}{2a}\)`),
          B('bl', 'Exemple 1', R`Résoudre \(x^2-5x+6=0\).`, R`\(a=1\) ; \(b=-5\) ; \(c=6\)`,
            R`\(\Delta=(-5)^2-4\times1\times6=1>0\)`, R`\(x_1=\dfrac{5-1}{2}=2\) ; \(x_2=\dfrac{5+1}{2}=3\)`,
            R`Ensemble des solutions : \(S=\{2\,;\,3\}\).`)),
        S('3.3', R`Deuxième cas : \(\Delta=0\)`,
          B('or', 'Solution double', 'L’équation admet une solution réelle double :', R`\(x_0=-\dfrac{b}{2a}\)`),
          B('bl', 'Exemple 2', R`Résoudre \(x^2-4x+4=0\).`, R`\(\Delta=(-4)^2-4\times1\times4=0\)`, R`\(x_0=\dfrac{4}{2}=2\)`,
            R`Ensemble des solutions : \(S=\{2\}\).`))),
      pg(
        S('3.4', R`Troisième cas : \(\Delta<0\)`,
          B('or', 'Solutions', 'L’équation n’admet aucune solution réelle, car le carré d’un nombre réel ne peut pas être négatif.'),
          B('bl', 'Exemple 3', R`Résoudre \(x^2+2x+5=0\).`, R`\(\Delta=2^2-4\times1\times5=-16<0\)`,
            R`L’équation n’admet aucune solution réelle : \(S=\varnothing\).`),
          VID())),
      pg(
        S('✦', 'Simulation du discriminant',
          FRAME('chapitres/activites/simulation-discriminant.html', 'Simulation du discriminant', 760)))
    ),

    /* ───────────── FACTORISATION ───────────── */
    T('Factorisation d’un trinôme du second degré',
      pg(
        S('4', 'Factorisation d’un trinôme',
          B('or', 'Définition', 'Factoriser un trinôme consiste à l’écrire sous la forme d’un produit de facteurs. La factorisation dans \\(\\mathbb{R}\\) dépend du discriminant.')),
        S('4.1', R`Si \(\Delta>0\)`,
          B('or', 'Propriété', R`Le trinôme possède deux racines réelles distinctes \(x_1\) et \(x_2\). Alors : \(\boxed{f(x)=a(x-x_1)(x-x_2)}\)`),
          B('bl', 'Exemple', R`\(x^2-5x+6\) a pour racines \(2\) et \(3\). Donc : \(x^2-5x+6=(x-2)(x-3)\)`))),
      pg(
        S('4.2', R`Si \(\Delta=0\)`,
          B('or', 'Propriété', R`Le trinôme possède une racine double \(x_0\). Alors : \(\boxed{f(x)=a(x-x_0)^2}\)`),
          B('bl', 'Exemple', R`\(x^2-4x+4\) a pour racine double \(2\). Donc : \(x^2-4x+4=(x-2)^2\)`)),
        S('4.3', R`Si \(\Delta<0\)`,
          B('or', 'Propriété', 'Le trinôme ne possède aucune racine réelle. Il ne peut donc pas être factorisé en produit de facteurs du premier degré à coefficients réels.'),
          B('bl', 'Exemple', R`\(x^2+2x+5\) a un discriminant égal à \(-16\) ; il n’admet pas de factorisation en facteurs du premier degré dans \(\mathbb{R}\).`)))
    ),

    /* ───────────── SIGNE ET INÉQUATIONS ───────────── */
    T('Résolution d’une inéquation du second degré',
      pg(
        S('5', 'Signe d’un trinôme du second degré',
          B('or', 'Principe', R`Le signe d’un trinôme dépend du signe de \(a\) et du discriminant \(\Delta\).`)),
        S('5.1', R`Si \(\Delta>0\)`,
          B('or', 'Propriété', R`Le trinôme possède deux racines distinctes \(x_1\) et \(x_2\), avec \(x_1<x_2\). Il est du signe de \(a\) à l’extérieur des racines et du signe contraire de \(a\) entre les racines. Il s’annule en \(x_1\) et en \(x_2\).`),
          B('bl', 'Tableau de signe', TB([R`\(x\)`, R`\(-\infty\)`, R`\(x_1\)`, 'entre les racines', R`\(x_2\)`, R`\(+\infty\)`],
            [[R`\(f(x)\)`, R`signe de \(a\)`, R`\(0\)`, R`signe de \(-a\)`, R`\(0\)`, R`signe de \(a\)`]])))),
      pg(
        S('5.2', R`Si \(\Delta=0\)`,
          B('or', 'Propriété', R`Le trinôme possède une racine double \(x_0\). Il garde le signe de \(a\) sur \(\mathbb{R}\), sauf en \(x_0\) où il s’annule.`),
          B('bl', 'Tableau de signe', TB([R`\(x\)`, R`\(-\infty\)`, R`\(x_0\)`, R`\(+\infty\)`], [[R`\(f(x)\)`, R`signe de \(a\)`, R`\(0\)`, R`signe de \(a\)`]]))),
        S('5.3', R`Si \(\Delta<0\)`,
          B('or', 'Propriété', R`Le trinôme ne possède aucune racine réelle. Il garde donc toujours le signe de \(a\).`),
          B('bl', 'Tableau de signe', TB([R`\(x\)`, R`\(\mathbb{R}\)`], [[R`\(f(x)\)`, R`signe de \(a\)`]])))),
      pg(
        S('6', 'Résolution d’une inéquation du second degré',
          B('or', 'Formes possibles', R`Une inéquation du second degré peut être ramenée à l’une des formes suivantes :`,
            R`\(ax^2+bx+c>0\) ; \(ax^2+bx+c<0\)`, R`\(ax^2+bx+c\geq0\) ; \(ax^2+bx+c\leq0\)`),
          B('gr', 'Méthode de résolution',
            OL('Réduire l’inéquation pour obtenir un trinôme d’un côté et zéro de l’autre.', R`Identifier les coefficients \(a\), \(b\) et \(c\).`, R`Calculer le discriminant \(\Delta=b^2-4ac\).`,
              'Déterminer les racines réelles, si elles existent.', 'Construire le tableau de signe du trinôme.', 'Lire les intervalles qui vérifient l’inégalité demandée.', 'Écrire l’ensemble des solutions en utilisant les intervalles.')))),
      pg(
        S('6.1', 'Exemple',
          B('bl', 'Exemple', R`Résoudre dans \(\mathbb{R}\) : \(x^2-5x+6\leq0\).`,
            R`1. Coefficients : \(a=1\), \(b=-5\) et \(c=6\).`, R`2. Discriminant : \(\Delta=(-5)^2-4\times1\times6=1\)`, R`3. Racines : \(x_1=2\) et \(x_2=3\).`, R`4. Tableau de signe (\(a>0\)) :`,
            TB([R`\(x\)`, R`\(-\infty\)`, R`\(2\)`, 'entre 2 et 3', R`\(3\)`, R`\(+\infty\)`], [[R`\(x^2-5x+6\)`, '+', '0', '−', '0', '+']]),
            R`5. On cherche les valeurs pour lesquelles le trinôme est négatif ou nul. Il faut donc retenir l’intervalle entre les deux racines, en incluant les racines puisque le signe est \(\leq\).`,
            R`\(\boxed{S=[2\,;\,3]}\)`)))
    ),

    /* ───────────── EXERCICES ───────────── */
    T('Exercices',
      pg(
        S('✎', 'Niveau 1 · Forme canonique et discriminant',
          exo(1, '<b>Forme canonique.</b> Mettre chacun des trinômes suivants sous forme canonique :', UL(R`\(f(x)=x^2-4x+1\)`, R`\(g(x)=2x^2+8x+3\)`, R`\(h(x)=-x^2+6x-7\)`)),
          exo(2, '<b>Calcul du discriminant.</b> Calculer le discriminant de chaque trinôme, puis préciser le nombre de racines réelles sans nécessairement les calculer.', UL(R`\(f(x)=x^2-3x+2\)`, R`\(g(x)=x^2+4x+4\)`, R`\(h(x)=2x^2+x+3\)`)))),
      pg(
        S('✎', 'Niveau 2 · Résoudre et étudier le signe',
          exo(3, R`<b>Résolution d’équations.</b> Résoudre dans \(\mathbb{R}\) les équations suivantes :`, UL(R`\(x^2-7x+10=0\)`, R`\(2x^2-4x+2=0\)`, R`\(3x^2+2x+5=0\)`)),
          exo(4, R`<b>Tableau de signe.</b> Étudier le signe des trinômes suivants sur \(\mathbb{R}\), puis dresser leur tableau de signe.`, UL(R`\(f(x)=x^2-6x+8\)`, R`\(g(x)=-x^2+4x-3\)`, R`\(h(x)=x^2+2x+5\)`)))),
      pg(
        S('✎', 'Niveau 3 · Inéquations et synthèse',
          exo(5, R`Résoudre dans \(\mathbb{R}\) les inéquations suivantes en utilisant un tableau de signe :`, UL(R`\(x^2-5x+6>0\)`, R`\(-x^2+4x-3\geq0\)`, R`\(2x^2-8x+8\leq0\)`, R`\(x^2+2x+5<0\)`)),
          exo(6, '<b>Problème de synthèse.</b>', R`On considère la fonction \(f\) définie sur \(\mathbb{R}\) par : \(f(x)=2x^2-8x+6\)`,
            OL(R`Déterminer la forme canonique de \(f\).`, 'Calculer le discriminant du trinôme.', R`Résoudre l’équation \(f(x)=0\).`, R`Dresser le tableau de signe de \(f(x)\).`, R`Résoudre \(f(x)\leq0\).`))))
    ),

    /* ───────────── QUIZ ───────────── */
    T('Quiz',
      pg(
        S('★', 'Quiz 1 · Trinôme et forme canonique',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, 'Laquelle de ces expressions est un trinôme du second degré ?', [R`\(5x-3\)`, R`\(x^3-2x+1\)`, R`\(2x^2-x+7\)`], 2,
             R`Un trinôme du second degré s’écrit \(ax^2+bx+c\) avec \(a\neq0\).`),
          qz(2, R`Dans \(f(x)=3x^2-5x+2\), le coefficient de \(x\) est :`, ['3', '−5', '2'], 1,
             R`Le coefficient de \(x\) est \(b=-5\).`),
          qz(3, R`La forme canonique de \(x^2-6x+5\) est :`, [R`\((x-3)^2-4\)`, R`\((x+3)^2-4\)`, R`\((x-3)^2+4\)`], 0,
             R`\(x^2-6x+5=(x-3)^2-9+5=(x-3)^2-4\).`),
          qz(4, R`Si \(a<0\), le sommet \(S(\alpha\,;\,\beta)\) de la parabole correspond à :`, [R`un minimum égal à \(\beta\)`, R`un maximum égal à \(\beta\)`, R`un maximum égal à \(\alpha\)`], 1,
             R`Quand \(a<0\), la parabole est tournée vers le bas : le sommet est un maximum égal à \(\beta\), atteint pour \(x=\alpha\).`)))),
      pg(
        S('★', 'Quiz 2 · Discriminant et équations',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, R`Le discriminant de \(x^2-5x+6\) est :`, ['1', '49', '11'], 0,
             R`\(\Delta=(-5)^2-4\times1\times6=25-24=1\).`),
          qz(2, R`Si \(\Delta<0\), l’équation \(ax^2+bx+c=0\) admet :`, ['deux solutions réelles distinctes', 'une solution réelle double', 'aucune solution réelle'], 2,
             'Le carré d’un réel ne peut pas être négatif : il n’y a aucune solution réelle.'),
          qz(3, R`L’équation \(x^2-4x+4=0\) a pour solution :`, [R`\(x=2\) (solution double)`, R`\(x=-2\)`, R`\(x=2\) et \(x=-2\)`], 0,
             R`\(\Delta=0\) et \(x_0=-\dfrac{b}{2a}=2\).`),
          qz(4, R`Les solutions de \(x^2-5x+6=0\) sont :`, [R`\(2\) et \(3\)`, R`\(-2\) et \(-3\)`, R`\(1\) et \(6\)`], 0,
             R`\(\Delta=1\), donc \(x_1=\dfrac{5-1}{2}=2\) et \(x_2=\dfrac{5+1}{2}=3\).`)))),
      pg(
        S('★', 'Quiz 3 · Factorisation, signe et inéquations',
          QUIZ({ seuils: [0.9, 0.7, 0.5] }, qz(1, R`La factorisation de \(x^2-5x+6\) est :`, [R`\((x-2)(x-3)\)`, R`\((x+2)(x+3)\)`, R`\((x-1)(x-6)\)`], 0,
             R`Les racines sont \(2\) et \(3\) : \(x^2-5x+6=(x-2)(x-3)\).`),
          qz(2, R`\(x^2+2x+5\) (\(\Delta=-16\)) peut-il se factoriser en facteurs du premier degré dans \(\mathbb{R}\) ?`, ['Oui', 'Non'], 1,
             R`Comme \(\Delta<0\), il n’y a aucune racine réelle : pas de factorisation dans \(\mathbb{R}\).`),
          qz(3, R`Si \(\Delta>0\) et \(a>0\), le trinôme est négatif :`, ['à l’extérieur des racines', 'entre les racines', 'jamais'], 1,
             R`Il est du signe de \(-a\) entre les racines, donc négatif quand \(a>0\).`),
          qz(4, R`Les solutions de \(x^2-5x+6\leq0\) sont :`, [R`\([2\,;\,3]\)`, R`\(]-\infty\,;\,2]\cup[3\,;\,+\infty[\)`, R`\(]2\,;\,3[\)`], 0,
             'On retient l’intervalle entre les racines, racines incluses car l’inégalité est large.'))))
    ),
  ]
}));
