import { createClient } from "@supabase/supabase-js";

const URL = "https://gxlqlykrysidaailldpe.supabase.co";
const API_KEY = import.meta.env.VITE_SUPABASE;
const supabase = createClient(URL, API_KEY);

export { supabase };