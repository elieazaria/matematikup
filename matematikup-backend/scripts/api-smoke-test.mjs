
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);


async function check(result, label) {
  // Attendre réellement la réponse de Supabase
  const { data, error } = await result;

  if (error) {
    throw new Error(`${label}: ${error.message}`);
  }

  if (data === null || data === undefined) {
    throw new Error(`${label}: aucune donnée retournée.`);
  }

  console.log(`ok ${label}`);
  return data;
}


async function main() {
  // 1. Connexion de l'élève
  const { data: auth, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
    });

  if (loginError) {
    throw new Error(`Connexion : ${loginError.message}`);
  }

  console.log(" Authentification");

  const userId = auth.user.id;

  // 2. Profil
  const profile = await check(
    supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", userId)
      .single(),
    "API profil"
  );

  if (profile.role !== "student") {
    throw new Error("Le compte connecté n'est pas un élève.");
  }

  // 3. Systèmes scolaires
  const systems = await check(
    supabase
      .from("school_systems")
      .select("id, code, name")
      .eq("is_active", true),
    "API systèmes scolaires"
  );

  // 4. Parcours actif
  const path = await check(
    supabase
      .from("student_paths")
      .select("id, system_id, status")
      .eq("student_id", userId)
      .eq("status", "active")
      .single(),
    "API parcours scolaire"
  );

  // 5. Inscription active
  const enrollment = await check(
    supabase
      .from("student_enrollments")
      .select("id, school_level_id, academic_year_id")
      .eq("student_path_id", path.id)
      .eq("status", "active")
      .single(),
    "API inscription scolaire"
  );

  // 6. Niveau
  const level = await check(
    supabase
      .from("school_levels")
      .select("code, name")
      .eq("id", enrollment.school_level_id)
      .single(),
    "API niveau scolaire"
  );

  // 7. Chapitres publiés
  const chapters = await check(
    supabase
      .from("chapters")
      .select("id, title, position")
      .eq("school_level_id", enrollment.school_level_id)
      .eq("is_published", true)
      .order("position"),
    "API chapitres"
  );

  if (chapters.length === 0) {
    throw new Error("Aucun chapitre publié pour ce niveau.");
  }

  // 8. Leçons du premier chapitre
  const chapter = chapters[0];

  const lessons = await check(
    supabase
      .from("lessons")
      .select("id, title, position")
      .eq("chapter_id", chapter.id)
      .eq("is_published", true)
      .order("position"),
    "API leçons"
  );

  // 9. Quiz publié
  const quiz = await check(
    supabase
      .from("quizzes")
      .select("id, title, passing_score")
      .eq("chapter_id", chapter.id)
      .eq("is_published", true)
      .single(),
    "API quiz"
  );

  // 10. Questions
  const questions = await check(
    supabase
      .from("questions")
      .select("id, question_text, position, points")
      .eq("quiz_id", quiz.id)
      .order("position"),
    "API questions"
  );

  const questionIds = questions.map(q => q.id);

  // 11. Propositions de réponses
  const options = await check(
    supabase
      .from("question_options")
      .select("id, question_id, option_text, position")
      .in("question_id", questionIds)
      .order("position"),
    "API propositions"
  );

  // Affichage du résumé
  console.log("\n========== MATEMATIKUP API ==========");

  console.log({
    utilisateur: profile.full_name,
    role: profile.role,
    systemes_disponibles: systems.length,
    niveau: level.name,
    chapitre: chapter.title,
    nombre_lecons: lessons.length,
    quiz: quiz.title,
    score_minimum: quiz.passing_score,
    nombre_questions: questions.length,
    nombre_propositions: options.length,
  });

  console.log("\n Tous les tests de lecture API sont réussis.");

  await supabase.auth.signOut();
}

main().catch(error => {
  console.error("\n Échec du test :", error.message);
  process.exitCode = 1;
});
