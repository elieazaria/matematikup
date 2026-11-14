
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
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  });

  if (loginError) {
    throw new Error(loginError.message);
  }

  console.log("Élève authentifié.");

  const { data, error } = await supabase.rpc(
    "change_student_system",
    {
      p_system_code: "FR",
      p_level_code: "3E",
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  console.log("Changement effectué :");
  console.log(JSON.stringify(data, null, 2));

  await supabase.auth.signOut();
}

main().catch((error) => {
  console.error("Échec :", error.message);
  process.exitCode = 1;
});
