
# MATEMATIKUP — DOCUMENTATION API

## 1. Informations générales

Backend : Supabase
Base de données : PostgreSQL
Authentification : Supabase Auth
API : REST / PostgREST

Base URL :
https://jjmxaevmhxhnzgzkepye.supabase.co

REST :
/rest/v1

RPC :
/rest/v1/rpc

## 2. Authentification

Les opérations utilisent Supabase Auth.

- Inscription : signUp()
- Connexion : signInWithPassword()
- Déconnexion : signOut()
- Utilisateur connecté : getUser()

Les opérations protégées nécessitent une session
utilisateur valide.

## 3. Systèmes scolaires

### GET /rest/v1/school_systems

Retourne les systèmes scolaires actifs.

### GET /rest/v1/school_levels

Retourne les niveaux scolaires.

Paramètres :
- system_id
- code

### GET /rest/v1/academic_years

Retourne les années scolaires.

Paramètres :
- system_id
- is_active

## 4. Profil et parcours

### GET /rest/v1/profiles

Récupération du profil personnel.

### GET /rest/v1/student_paths

Récupération des parcours de l'élève connecté.

### GET /rest/v1/student_enrollments

Récupération des inscriptions scolaires.

## 5. Contenus pédagogiques

### GET /rest/v1/chapters

Liste des chapitres publiés.

Paramètres :
- school_level_id
- is_published

### GET /rest/v1/lessons

Liste des leçons publiées.

Paramètres :
- chapter_id
- is_published

### GET /rest/v1/quizzes

Liste des quiz publiés.

Paramètres :
- chapter_id

### GET /rest/v1/questions

Liste des questions d'un quiz.

Paramètres :
- quiz_id

### GET /rest/v1/question_options

Liste des propositions de réponses.

Paramètres :
- question_id

IMPORTANT :
La table question_answer_keys ne doit jamais
être exposée aux utilisateurs.

## 6. Fonctions RPC

### POST /rest/v1/rpc/start_student_path

Paramètres :

{
  "p_system_code": "FR",
  "p_level_code": "3E"
}

### POST /rest/v1/rpc/change_student_system

Paramètres :

{
  "p_system_code": "MG",
  "p_level_code": "3E"
}

### POST /rest/v1/rpc/renew_student_enrollment

Paramètres :

{
  "p_level_code": "2NDE"
}

### POST /rest/v1/rpc/submit_quiz

Paramètres :

{
  "p_quiz_id": "UUID_DU_QUIZ",
  "p_answers": [
    {
      "question_id": "UUID_QUESTION",
      "option_id": "UUID_OPTION"
    }
  ]
}

La fonction calcule le score côté PostgreSQL
et enregistre la tentative et les réponses.

## 7. Sécurité

- Authentification obligatoire pour les opérations privées.
- Vérification des permissions par RLS.
- Bonnes réponses non accessibles directement.
- Les opérations métier sensibles utilisent des RPC.
- Aucune clé secrète ne doit être exposée au frontend.
