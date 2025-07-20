import { supabase } from '../lib/supabaseClient';

interface SignUpParams {
  email: string;
  password: string;
}

export const signUp = async ({ email, password }: SignUpParams) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signIn = async () => {
  // ...
};
