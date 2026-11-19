/* ═══════════════════════════════════════════════════════════════
   chapitres/routes.js — table "classe:n" → fichier de chapitre.
   « classe » et « n » viennent des liens de classe.html : chapitre.html?classe=1ere-S&n=12
   (n = numéro de la carte dans la classe, en commençant à 1).
   Le fichier chargé est chapitres/<identifiant>.js
   Pour AJOUTER un chapitre : créer chapitres/<identifiant>.js puis ajouter une ligne ici.
═══════════════════════════════════════════════════════════════ */
const ROUTES = {
  /* ── Analyse ── */
  "1ere-S:1":   "fonctions",            // 1ère S   › Analyse › Fonction numérique d'une variable réelle

  /* ── Algèbre : suites ── */
  "1ere-S:11":  "suites-generalites",   // 1ère S   › Algèbre › Généralités sur les suites numériques
  "1ere-L:5":   "suites-generalites",   // 1ère L   › Algèbre › Suites numériques
  "1ere-OSE:6": "suites-generalites",   // 1ère OSE › Algèbre › Généralités sur les suites numériques
  "1ere-S:12":  "suites-arith-geo",     // 1ère S   › Algèbre › Suites arithmétiques et géométriques
  "1ere-L:6":   "suites-arith-geo",     // 1ère L   › Algèbre › Suites arithmétiques et suites géométriques
  "1ere-OSE:7": "suites-arith-geo",     // 1ère OSE › Algèbre › Suites arithmétiques/Suites géométriques

  /* ── Traitement de données : dénombrement ── */
  "1ere-L:12":   "denombrement",        // 1ère L   › Traitement de données › Dénombrement
  "1ere-S:24":   "denombrement",        // 1ère S   › Traitement de données et probabilités › Dénombrement
  "1ere-OSE:14": "ensembles",           // 1ère OSE › Traitement de données et probabilités › Notion sur la théorie des ensembles
  "1ere-OSE:15": "applications",        // 1ère OSE › Traitement de données et probabilités › Applications
  /* Seconde */
  "2nde:5":      "trinome",               // 2nde     › Analyse › Trinôme du second degré
  "2nde:8":      "generalites-fonctions", // 2nde     › Analyse › Généralités sur les fonctions de référence (cours : généralités sur les fonctions numériques)
  "2nde:11":     "logique",               // 2nde     › Algèbre › Logique
  /* 1ère : généralités et trinôme */
  "1ere-L:1":    "generalites-fonctions", // 1ère L   › Analyse › Généralités sur les fonctions numériques d'une variable réelle
  "1ere-L:7":    "trinome",               // 1ère L   › Algèbre › Équations du second degré
  "1ere-L:8":    "trinome",               // 1ère L   › Algèbre › Inéquations du second degré
  "1ere-S:2":    "trinome",               // 1ère S   › Analyse › Équations du second degré
  /* Probabilité : 1ères et Terminales */
  "1ere-L:13":        "probabilites",   // 1ère L   › Probabilité
  "1ere-S:25":        "probabilites",   // 1ère S   › Probabilité
  "1ere-OSE:16":      "probabilites",   // 1ère OSE › Probabilité
  "terminale-L:11":   "probabilites",   // Tle L    › Probabilité
  "terminale-S:28":   "probabilites",   // Tle S    › Vocabulaire
  "terminale-S:29":   "probabilites",   // Tle S    › Probabilité d'un évènement
  "terminale-S:31":   "probabilites",   // Tle S    › Loi de probabilité
  "terminale-OSE:17": "probabilites",   // Tle OSE  › Vocabulaire
  "terminale-OSE:18": "probabilites",   // Tle OSE  › Probabilité d'un évènement
  "terminale-OSE:20": "probabilites",   // Tle OSE  › Loi de probabilité
};
