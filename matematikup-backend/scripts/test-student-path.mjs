
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

async function main() {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error("Identifiants de test manquants.");
  }

  // 1. Authentifier l'élève
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    throw new Error(`Authentification : ${authError.message}`);
  }

  console.log("Connexion réussie :", authData.user.id);

  // 2. Créer le parcours scolaire
  const { data, error } = await supabase.rpc(
    "start_student_path",
    {
      p_system_code: "MG",
      p_level_code: "3E",
    }
  );

  if (error) {
    throw new Error(`Création du parcours : ${error.message}`);
  }

  console.log("Parcours créé avec succès :");
  console.log(JSON.stringify(data, null, 2));

  await supabase.auth.signOut();
}

main().catch((error) => {
  console.error("Erreur :", error.message);
  process.exitCode = 1;
});
