export const validateEnv = () => {  
  if (!process.env.DISCORD_TOKEN) {
    console.warn('Discord bot token is missing from .env file.');
    return false;
  }
  if (!process.env.SUPABASE_URL) {
    console.warn('Supabase URL is missing from .env file.');
    return false;
  }
  if (!process.env.SUPABASE_ANON_KEY) {
    console.warn('Supabase Anon Key is missing from .env file.');
    return false;
  }

  return true;
}