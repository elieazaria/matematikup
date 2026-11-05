/* ═══════════════════════════════════════════════════════════════
   CHAPITRE 3 — Suites arithmétiques et suites géométriques
═══════════════════════════════════════════════════════════════ */
registerChapitre('suites-arith-geo', () => ({
  titre: 'Suites arithmétiques et suites géométriques', partie: 'Algèbre',
  resume: 'Activité KFC, suites arithmétiques, suites géométriques, convergence et exercices.',
  topics: [

    T('Activité KFC',
      pg(
        SK('✦', 'Rendez-vous au KFC !',
          `<div class="kp" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
             <div style="display:flex;align-items:center;gap:10px"><img src="KFC_logo.png" alt="Logo KFC" onerror="this.style.display='none'" style="height:54px"><div><div style="font-weight:900;font-size:2rem;color:#ed1c24;font-style:italic;line-height:1">KFC</div><small style="font-weight:700;color:#6b7280">Bucket &amp; Maths · Problème de financement – 1ère S</small></div></div>
             <img src="KFC.jpg" alt="Menu KFC" onerror="this.style.display='none'" style="height:64px;border-radius:10px;border:2px solid #ed1c24;object-fit:cover">
           </div>
           <div class="kn"><b>💡 Le saviez-vous ?</b> Le sigle <strong>KFC</strong> signifie <em>Kentucky Fried Chicken</em>. Cette chaîne de restauration rapide est originaire des <strong>États-Unis</strong> 🇺🇸. Elle a été fondée au milieu du XXe siècle par le Colonel Harland Sanders, célèbre pour sa recette secrète aux 11 herbes et aromates !</div>
           <div class="kp"><h3>Le contexte</h3>
             <p>À chaque vacance, les élèves de la classe de première S organisent un grand goûter. Pour Pâques, direction le <strong>KFC</strong> !</p>
             <p style="margin-top:6px">Vu les tarifs, les chefs de classe lancent une cotisation mensuelle à la caisse d’épargne. La cotisation initiale en Janvier est de <strong>20 000 Ar</strong>.</p>
             <p style="margin-top:6px;font-weight:800">Deux options d’augmentation sont proposées pour les mois suivants :</p>
             <ul style="list-style:none;padding:10px;margin-top:6px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px">
               <li><span style="background:#ed1c24;color:#fff;padding:2px 8px;border-radius:6px;font-weight:900;font-size:.75rem">A</span> <strong>Proposition A :</strong> Augmentation fixe de 1 500 Ar par mois.</li>
               <li style="margin-top:6px"><span style="background:#ed1c24;color:#fff;padding:2px 8px;border-radius:6px;font-weight:900;font-size:.75rem">B</span> <strong>Proposition B :</strong> Augmentation de 15 % par mois.</li>
             </ul></div>`),
        SK('1', 'Calcul des cotisations',
          `<div class="kp"><p style="font-style:italic;color:#6b7280;margin-bottom:10px">Calculez les montants pour Février, Mars et Avril (arrondir à l’entier le plus proche pour la proposition B).</p>
           <form onsubmit="event.preventDefault();checkTable();"><div class="ov"><table>
             <thead><tr><th>Mois</th><th>Proposition A<br><small>(+1500 Ar)</small></th><th>Proposition B<br><small>(+15%)</small></th></tr></thead>
             <tbody>
               <tr style="background:#f3f4f6"><td>Janvier (Initial)</td><td style="color:#ed1c24">20 000</td><td style="color:#ed1c24">20 000</td></tr>
               <tr><td>Février</td><td><input type="number" id="val_A_fev" placeholder="?"></td><td><input type="number" id="val_B_fev" placeholder="?"></td></tr>
               <tr><td>Mars</td><td><input type="number" id="val_A_mars" placeholder="?"></td><td><input type="number" id="val_B_mars" placeholder="?"></td></tr>
               <tr><td>Avril</td><td><input type="number" id="val_A_avril" placeholder="?"></td><td><input type="number" id="val_B_avril" placeholder="?"></td></tr>
             </tbody></table></div>
           <div style="text-align:center;margin-top:12px"><button type="submit" class="kb">Vérifier mes calculs</button><div id="tableFeedback" class="kfb hidden"></div></div></form></div>`)),
      pg(
        SK('2', 'Observation & comparaison',
          `<div class="kp"><form onsubmit="event.preventDefault();checkAnalysis();">
             <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;margin-bottom:12px">
               <h3 style="color:#b91c1c">Mode d’évolution</h3>
               <p style="font-weight:800;margin:6px 0 4px">Pour la Proposition A, on passe d’un mois à l’autre par une…</p>
               <select id="q2_evolA"><option value="">-- Choisir --</option><option value="add">Addition (Suite Arithmétique)</option><option value="mult">Multiplication (Suite Géométrique)</option></select>
               <p style="font-weight:800;margin:10px 0 4px">Pour la Proposition B, on passe d’un mois à l’autre par une…</p>
               <select id="q2_evolB"><option value="">-- Choisir --</option><option value="add">Addition (Suite Arithmétique)</option><option value="mult">Multiplication (Suite Géométrique)</option></select>
             </div>
             <h3 style="color:#b91c1c">Le choix stratégique</h3>
             <p style="margin:6px 0">Regardez les montants au bout de 4 mois. Si les élèves arrêtent de cotiser <strong>avant 4 mois</strong> (court terme), quelle proposition leur coûte le moins cher (montants plus faibles) ?</p>
             <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:10px 0">
               <label class="kopt"><input type="radio" name="strategy" value="A" style="width:auto"> Proposition A</label>
               <label class="kopt"><input type="radio" name="strategy" value="B" style="width:auto"> Proposition B</label>
             </div>
             <button type="submit" class="kb" style="width:100%;border-radius:12px">Valider l’analyse</button><div id="analysisFeedback" class="kfb hidden"></div>
           </form></div>`),
        SK('3', 'Prévision long terme (10 mois)',
          `<div class="kdark"><span style="float:right;background:#facc15;color:#000;font-weight:900;padding:2px 10px;border-radius:6px;transform:rotate(6deg)">Niveau Expert</span>
             <h3>Prévision long terme (10 mois)</h3>
             <p style="margin:6px 0 10px;color:#d1d5db;font-size:.9rem">Peut-on prévoir la cotisation du 10ème mois sans tout calculer ?</p>
             <p style="font-weight:800;margin-bottom:4px;font-size:.9rem">Quelle formule utiliseriez-vous pour la Proposition A (Arithmétique) ?</p>
             <select id="q4_formula" style="color:#000;border:none"><option value="">-- Choisir la formule --</option><option value="geo">Un = U0 × q^n</option><option value="ari">Un = U0 + n × r</option><option value="sum">S = (n+1) × (U0+Un)/2</option></select>
             <button type="button" onclick="checkBonus()" style="margin-top:10px;width:100%;background:#facc15;color:#000;font-weight:900;border-radius:8px;padding:8px">Vérifier le concept</button>
             <div id="bonusFeedback" class="hidden" style="margin-top:8px;text-align:center;font-weight:800"></div></div>`))
    ),

    T('Suites arithmétiques',
      pg(
        S('1.1', 'Définition',
          B('or', 'Définition', R`On dit qu’une suite \((u_n)\) est arithmétique si on passe d’un terme au suivant en ajoutant toujours le même nombre réel \(r\).`,
            R`\(\boxed{u_{n+1}=u_n+r}\)`, R`Le réel \(r\) est alors appelé raison de la suite.`),
          B('bl', 'Exemples', R`1. La suite \(1,\ 6,\ 11,\ 16,\ 21,\dots\) est arithmétique de raison \(5\).`, R`2. La suite des entiers naturels \(0,\ 1,\ 2,\ 3,\ 4,\ 5,\dots\) est arithmétique de raison \(1\).`,
            R`3. La suite des entiers naturels impairs est arithmétique de raison \(2\).`),
          B('or', 'Propriété', R`Une suite \((u_n)\) est arithmétique si et seulement si la différence \(u_{n+1}-u_n\) est une constante pour tout entier \(n\). Dans ce cas, la constante trouvée est la raison de la suite.`),
          B('bl', 'Exemple', R`\(u_n=5n-2\) : \(u_{n+1}-u_n=5(n+1)-2-(5n-2)=5\) (constante).`, R`Suite arithmétique de raison \(r=5\) et \(u_0=-2\).`),
          B('or', 'Termes consécutifs', R`Trois termes consécutifs \(u_{n-1},\ u_n,\ u_{n+1}\) d’une suite arithmétique vérifient \(\boxed{2u_n=u_{n-1}+u_{n+1}}\).`)),
        S('1.2', 'Variations d’une suite arithmétique',
          P(R`Soit \((u_n)\) une suite arithmétique de raison \(r\).`),
          B('gr', 'Variation', R`– Si \(r>0\), alors la suite \((u_n)\) est croissante.`, R`– Si \(r<0\), alors la suite \((u_n)\) est décroissante.`, R`– Si \(r=0\), alors la suite \((u_n)\) est constante.`))),
      pg(
        S('1.3', 'Expression en fonction de \\(n\\)',
          P(R`Soit \((u_n)\) une suite arithmétique de raison \(r\). On a :`),
          B('bl', 'Calcul des premiers termes', R`\(u_1=u_0+r\)`, R`\(u_2=u_1+r=(u_0+r)+r=u_0+2r\)`, R`\(u_3=u_2+r=(u_0+2r)+r=u_0+3r\)`),
          B('or', 'Théorème', R`Généralement : \(\boxed{u_n=u_0+nr}\).`,
            R`Si \((u_n)\) est une suite arithmétique de raison \(r\) et si \(n\) et \(p\) sont deux entiers naturels : \(\boxed{u_n=u_p+(n-p)\,r}\)`),
          B('bl', 'Exemple', R`Soit \((u_n)\) la suite arithmétique de premier terme \(u_0=5\) et de raison \((-1)\).`,
            R`On a : \(u_n=u_0+nr=5+n\times(-1)=5-n\). En particulier : \(u_{50}=5-50=-45\).`),
          B('pu', 'Vidéo', VID(''))),
        S('1.4', 'Somme des termes consécutifs',
          P(R`Soit \((u_n)\) une suite arithmétique de raison \(r\). On note \(S_n\) la somme des \((n+1)\) premiers termes de la suite \((u_n)\), c’est-à-dire : \(S_n=u_0+u_1+\cdots+u_n\)`),
          B('or', 'Formule', R`\(S_n=\text{nombre de termes}\times\dfrac{\text{premier terme}+\text{dernier terme}}{2}\)`, R`\(\boxed{S_n=(n+1)\times\dfrac{u_0+u_n}{2}}\)`),
          B('bl', 'Exemple', R`Somme des entiers de \(0\) à \(100\) : \(u_n=n\), \(S_{100}=101\times\dfrac{0+100}{2}=5050\).`))),
      pg(
        S('✎', 'Exercices',
          B('gr', 'Exercice 1', R`Soit \(u_n=3n-5\).`,
            UL(R`Calcule \(u_0,\ u_1,\ u_2\).`, R`Écris \(u_{n+1}\) en remplaçant \(n\) par \(n+1\).`, R`Calcule \(u_{n+1}-u_n\).`, 'Conclus : nature, raison, variation.'),
            corr(R`1. \(u_0=-5\), \(u_1=-2\), \(u_2=1\).<br>2. \(u_{n+1}=3(n+1)-5=3n-2\).<br>3. \(u_{n+1}-u_n=(3n-2)-(3n-5)=3\) (constante).<br>4. La suite est <b>arithmétique</b> de raison \(r=3\) ; comme \(r>0\), elle est <b>croissante</b>.`, R`Pour la question 3, la différence ne doit plus dépendre de \(n\).`, true)),
          B('gr', 'Exercice 2', R`\(u_0=1\) et \(u_{n+1}=2u_n+3\). Calculer \(u_1,\ u_2,\ u_3\). La suite est-elle arithmétique ?`,
            corr(R`\(u_1=5\), \(u_2=13\), \(u_3=29\).<br>\(u_1-u_0=4\) et \(u_2-u_1=8\) : les différences ne sont pas égales, la suite n’est <b>pas arithmétique</b>.`, 'Comparer les différences successives.')),
          B('gr', 'Exercice 3', 'Trois nombres sont en progression arithmétique. Leur somme est 15 et leur produit est 105. Trouver ces nombres.',
            corr(R`On note \(a-r,\ a,\ a+r\). La somme donne \(3a=15\), donc \(a=5\).<br>Le produit donne \(5(25-r^2)=105\), donc \(r^2=4\), \(r=\pm2\).<br>Les nombres sont <b>3, 5 et 7</b>.`, R`Poser les trois nombres sous la forme \(a-r,\ a,\ a+r\).`)))),
      pg(
        S('★', 'Quiz',
          qz(1, R`La suite \(4,\ 9,\ 14,\ 19,\dots\) est arithmétique de raison :`, ['4', '5', '9'], 1, 'On passe d’un terme au suivant en ajoutant 5.'),
          qz(2, R`La suite \(u_n=7-2n\) est :`, ['croissante', 'décroissante', 'constante'], 1, R`C’est une suite arithmétique de raison \(r=-2<0\) : elle est décroissante.`),
          qz(3, R`\((u_n)\) est arithmétique avec \(u_0=3\) et \(r=2\). Que vaut \(u_{10}\) ?`, ['23', '21', '32'], 0, R`\(u_{10}=u_0+10r=3+20=23\).`),
          qz(4, R`Avec \(u_n=n\), que vaut \(S_4=u_0+u_1+u_2+u_3+u_4\) ?`, ['10', '15', '20'], 0, R`\(S_4=(4+1)\times\dfrac{0+4}{2}=10\).`)))
    ),

    T('Suites géométriques',
      pg(
        S('2.1', 'Définition',
          B('or', 'Définition', R`On dit qu’une suite \((u_n)\) est géométrique si on passe d’un terme au suivant en multipliant toujours par le même nombre réel \(q\).`,
            R`\(\boxed{u_{n+1}=q\times u_n}\)`, R`Le réel \(q\) est alors appelé raison de la suite.`),
          B('bl', 'Exemple', R`La suite \(1,\ 2,\ 4,\ 8,\ 16,\dots\) est géométrique de raison \(2\).`),
          B('or', 'Propriété', R`Une suite \((u_n)\) est géométrique si et seulement si le quotient \(\dfrac{u_{n+1}}{u_n}\) est constant pour tout entier \(n\). Dans ce cas, la constante trouvée est la raison de la suite.`)),
        S('2.2', 'Variation d’une suite géométrique',
          P(R`Soit \((u_n)\) une suite géométrique de raison \(q\) et de premier terme \(u_0>0\).`),
          B('gr', 'Variation', R`– Si \(q>1\), alors la suite \((u_n)\) est croissante.`, R`– Si \(q=1\), la suite \((u_n)\) est constante.`, R`– Si \(0<q<1\), alors la suite \((u_n)\) est décroissante.`,
            R`<small>(Si \(u_0<0\), les sens de variation sont inversés ; si \(q<0\), la suite n’est pas monotone.)</small>`),
          B('bl', 'Exemple', R`Soit \(u\) une suite géométrique de premier terme \(u_0=2\) et \(q=0{,}2\). Quel est son sens de variation ?`,
            R`Comme \(0<0{,}2<1\), la suite est strictement décroissante.`))),
      pg(
        S('2.3', 'Expression en fonction de \\(n\\)',
          P(R`Soit \((u_n)\) une suite géométrique de raison \(q\). On a :`),
          B('bl', 'Calcul des premiers termes', R`\(u_1=u_0\times q\)`, R`\(u_2=u_1\times q=u_0\times q^2\)`, R`\(u_3=u_2\times q=u_0\times q^3\)`),
          B('or', 'Théorème', R`Soit \((u_n)\) une suite géométrique de raison \(q\). Alors : \(\boxed{u_n=u_0\times q^n}\)`,
            R`Plus généralement, si \(n\) et \(p\) sont deux entiers naturels : \(\boxed{u_n=u_p\times q^{n-p}}\).`),
          B('bl', 'Exemple', R`Soit \((u_n)\) la suite géométrique de premier terme \(u_0=3\) et de raison \(2\).`,
            R`On a : \(u_n=u_0\times q^n=3\times2^n\). En particulier : \(u_5=3\times2^5=96\).`)),
        S('2.4', 'Somme de termes consécutifs',
          P(R`Soit \((u_n)\) une suite géométrique de raison \(q\) (avec \(q\neq1\)). On note \(S_n\) la somme des \((n+1)\) premiers termes : \(S_n=u_0+u_1+\cdots+u_n\)`),
          B('or', 'Formule', R`\(S=(\text{premier terme})\times\dfrac{1-q^{\,\text{nombre de termes}}}{1-q}\)`,
            R`\(\boxed{S_n=u_0\times\dfrac{1-q^{\,n+1}}{1-q}}\)`, R`Plus généralement : \(S=u_p\times\dfrac{1-q^{\,n-p+1}}{1-q}\), où le nombre de termes est \(n-p+1\) (indice du dernier terme − indice du premier terme + 1).`),
          B('bl', 'Exemple', R`\(1+2+4+\cdots+2^{10}\) : \(u_0=1\), \(q=2\), \(n=10\).`, R`\(S_{10}=1\times\dfrac{1-2^{11}}{1-2}=2047\).`)))
    ),

    T('Convergence d’une suite',
      pg(
        S('3', 'Comportement quand \\(n\\) devient très grand',
          TB(['Suite', 'Cas', 'Ce qui se passe'], [
            ['Arithmétique', R`\(r>0\)`, R`\(u_n\) devient énorme : \(u_n\to+\infty\)`],
            ['Arithmétique', R`\(r<0\)`, R`\(u_n\) devient très négatif : \(u_n\to-\infty\)`],
            ['Arithmétique', R`\(r=0\)`, R`\(u_n\) ne bouge pas`],
            [R`Géométrique (\(u_0>0\))`, R`\(q>1\)`, R`\(u_n\to+\infty\)`],
            [R`Géométrique (\(u_0>0\))`, R`\(-1<q<1\)`, R`\(u_n\) se rapproche de 0 : \(u_n\to0\)`],
            [R`Géométrique (\(u_0>0\))`, R`\(q=1\)`, R`\(u_n\) ne bouge pas`],
            [R`Géométrique (\(u_0>0\))`, R`\(q\leq-1\)`, R`\(u_n\) saute de plus en plus fort entre positif et négatif : pas de limite`]]),
          P(R`On regarde où va \(u_n\) quand \(n\) devient de plus en plus grand (on écrit \(n\to+\infty\)).`)),
        S('3.1', 'Suite convergente, suite divergente',
          B('or', 'Suite convergente', R`Si \(u_n\) se rapproche d’un nombre réel \(\ell\) (aussi près qu’on veut) quand \(n\) devient très grand, on dit que \((u_n)\) converge vers \(\ell\).`,
            R`On écrit : \(\boxed{\lim\limits_{n\to+\infty}u_n=\ell}\). Le nombre \(\ell\) s’appelle la limite.`),
          B('or', 'Limite infinie', R`Si \(u_n\) devient plus grand que n’importe quel nombre, on écrit \(\lim u_n=+\infty\). Si \(u_n\) devient plus petit que n’importe quel nombre (très négatif), on écrit \(\lim u_n=-\infty\).`),
          B('or', 'Suite divergente', R`Une suite qui ne converge pas est divergente : soit sa limite est \(+\infty\) ou \(-\infty\), soit elle n’a pas de limite (comme \((-1)^n\)).`))),
      pg(
        S('★', 'À retenir',
          B('gr', 'À retenir', '• La limite, si elle existe, est unique.',
            R`• Converger vers \(\ell\) ne veut pas dire atteindre \(\ell\) : par exemple \(\dfrac1n\) se rapproche de \(0\) sans jamais l’atteindre.`,
            R`• Une suite convergente a une limite finie ; une limite égale à \(+\infty\) ou \(-\infty\) est une suite divergente.`)))
    ),

    T('Exercices de synthèse',
      pg(
        S('✎', 'Exercices',
          B('gr', 'Exercice 1', R`Soit \(v_0=4\) et \(v_{n+1}=\tfrac12v_n\).`,
            UL(R`Calcule \(v_1,\ v_2,\ v_3\).`, 'Quelle est la nature de la suite ? Quelle est sa raison ?', R`Écris \(v_n\) en fonction de \(n\), puis calcule \(v_{10}\).`, R`Variation ? Que devient \(v_n\) quand \(n\) devient très grand ?`),
            corr(R`1. \(v_1=2\), \(v_2=1\), \(v_3=0{,}5\).<br>2. On multiplie toujours par \(\tfrac12\) : suite <b>géométrique</b> de raison \(q=\tfrac12\).<br>3. \(v_n=4\times\left(\tfrac12\right)^n\) ; \(v_{10}=\dfrac{4}{1024}=\dfrac1{256}\).<br>4. \(0<q<1\) et \(v_0>0\) : la suite est décroissante, et \(v_n\to0\) (elle converge vers 0).`, R`Chaque terme est la moitié du précédent.`, true)),
          B('gr', 'Exercice 2', R`\(u_n=2n^2-1\). Calculer \(u_0,\ u_1,\ u_2,\ u_3\), puis \(u_{n+1}\).`,
            corr(R`\(u_0=-1\), \(u_1=1\), \(u_2=7\), \(u_3=17\).<br>\(u_{n+1}=2(n+1)^2-1=2n^2+4n+1\).`, R`Développer \((n+1)^2\).`)),
          B('gr', 'Exercice 3', R`Déterminer la nature de chaque suite : a) \(u_n=4n+1\) ; b) \(v_n=7-2n\) ; c) \(w_n=5\times3^n\) ; d) \(t_n=n^2\).`,
            corr(R`a) arithmétique, \(r=4\) ; b) arithmétique, \(r=-2\) ; c) géométrique, \(q=3\) ;<br>d) \(t_0=0,\ t_1=1,\ t_2=4,\ t_3=9\) : différences \(1,3,5\) non constantes, et pas de quotient constant : <b>ni arithmétique ni géométrique</b>.`, 'Une formule en \\(an+b\\) est arithmétique, une formule en \\(a\\times q^n\\) est géométrique.')),
          B('gr', 'Exercice 4', R`\((u_n)\) est arithmétique avec \(u_2=7\) et \(u_5=19\). Trouver \(r\), \(u_0\), \(u_n\), puis \(u_{20}\).`,
            corr(R`\(u_5=u_2+3r\Rightarrow19=7+3r\Rightarrow r=4\).<br>\(u_0=u_2-2r=7-8=-1\).<br>\(u_n=-1+4n\) et \(u_{20}=-1+80=79\).`, R`Utiliser \(u_n=u_p+(n-p)r\).`)),
          B('gr', 'Exercice 5', R`\((v_n)\) est géométrique de raison positive avec \(v_1=6\) et \(v_3=54\). Trouver \(q\), \(v_0\), \(v_n\), puis \(v_5\).`,
            corr(R`\(v_3=v_1\times q^2\Rightarrow q^2=9\), et \(q>0\) donc \(q=3\).<br>\(v_0=\dfrac{v_1}{q}=2\).<br>\(v_n=2\times3^n\) et \(v_5=2\times243=486\).`, R`Utiliser \(v_n=v_p\times q^{n-p}\).`))))
    ),
  ]
}));

/* ═══════════════ ACTIVITÉ KFC : vérifications ═══════════════ */
function validateInput(id, expected) {
  const el = document.getElementById(id);
  const val = parseInt(String(el.value).replace(/\s/g, ''));
  const ok = val === expected;
  el.classList.toggle('correct', ok); el.classList.toggle('incorrect', !ok);
  return ok;
}
function kfcMsg(id, ok, html) {
  const fb = document.getElementById(id);
  fb.classList.remove('hidden', 'good', 'bad'); fb.classList.add(ok ? 'good' : 'bad'); fb.innerHTML = html;
}
function checkTable() {
  let ok = true;
  [['val_A_fev', 21500], ['val_A_mars', 23000], ['val_A_avril', 24500], ['val_B_fev', 23000], ['val_B_mars', 26450]].forEach(([id, v]) => { if (!validateInput(id, v)) ok = false; });
  const el = document.getElementById('val_B_avril'), v = parseInt(el.value);
  const okB = v >= 30417 && v <= 30418;
  el.classList.toggle('correct', okB); el.classList.toggle('incorrect', !okB);
  if (!okB) ok = false;
  kfcMsg('tableFeedback', ok, ok ? 'Parfait ! Les calculs sont exacts. On voit déjà une différence se creuser…' : 'Il y a des erreurs. Vérifiez : A (+1500) et B (×1,15).');
}
function checkAnalysis() {
  let good = true;
  const a = document.getElementById('q2_evolA'), b = document.getElementById('q2_evolB');
  const okA = a.value === 'add', okB = b.value === 'mult';
  a.classList.toggle('correct', okA); a.classList.toggle('incorrect', !okA);
  b.classList.toggle('correct', okB); b.classList.toggle('incorrect', !okB);
  if (!okA || !okB) good = false;
  const r = document.querySelector('input[name="strategy"]:checked'), s = r ? r.value : '';
  if (good && s === 'A') kfcMsg('analysisFeedback', true, 'Excellent !<br>La proposition A est une suite <strong>arithmétique</strong> (addition).<br>La proposition B est une suite <strong>géométrique</strong> (multiplication).<br>Sur le court terme, la A monte moins vite !');
  else if (s === 'B') kfcMsg('analysisFeedback', false, 'Attention à la stratégie : regardez les chiffres. La proposition B monte beaucoup plus vite (exponentielle). Pour payer moins cher au début, il vaut mieux choisir la A.');
  else kfcMsg('analysisFeedback', false, 'Vérifiez vos réponses sur le type d’évolution (addition ou multiplication) et choisissez une proposition.');
}
function checkBonus() {
  const fb = document.getElementById('bonusFeedback'), ok = document.getElementById('q4_formula').value === 'ari';
  fb.classList.remove('hidden');
  fb.style.color = ok ? '#4ade80' : '#f87171';
  fb.textContent = ok ? 'Exactement ! Pour une suite arithmétique : Un = U0 + n × r.' : 'Pas tout à fait. La proposition A ajoute une constante : c’est une suite arithmétique.';
}
