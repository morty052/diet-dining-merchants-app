import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cupdzqjnmpepddawtukr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cGR6cWpubXBlcGRkYXd0dWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MzAzNDIsImV4cCI6MjAyNTIwNjM0Mn0.O8JgpKLSgk3tz7GUeIk-WFeD4jpbr40ppd3mih_y8dM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getImageurl = async (path: string | undefined) => {
  const { data } = supabase.storage
    .from("temp_images/public")
    .getPublicUrl(path as string);
  return data.publicUrl;
};
