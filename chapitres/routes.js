/* ═══════════════════════════════════════════════════════════════
   chapitres/routes.js — table "classe:n" → fichier de chapitre.
   « classe » et « n » viennent des liens de classe.html : chapitre.html?classe=1ere-S&n=12
   (n = numéro de la carte dans la classe, en commençant à 1).
   Le fichier chargé est chapitres/<identifiant>.js
   Pour AJOUTER un chapitre : créer chapitres/<identifiant>.js puis ajouter une ligne ici.
═══════════════════════════════════════════════════════════════ */
const ROUTES = {
  "1ere-S:1":   "fonctions",            // 1ère S   › Analyse › Fonction numérique d'une variable réelle
  "1ere-S:11":  "suites-generalites",   // 1ère S   › Algèbre › Généralités sur les suites numériques
  "1ere-L:5":   "suites-generalites",   // 1ère L   › Algèbre › Suites numériques
  "1ere-OSE:6": "suites-generalites",   // 1ère OSE › Algèbre › Généralités sur les suites numériques
  "1ere-S:12":  "suites-arith-geo",     // 1ère S   › Algèbre › Suites arithmétiques et géométriques
  "1ere-L:6":   "suites-arith-geo",     // 1ère L   › Algèbre › Suites arithmétiques et suites géométriques
  "1ere-OSE:7": "suites-arith-geo",     // 1ère OSE › Algèbre › Suites arithmétiques/Suites géométriques
};
