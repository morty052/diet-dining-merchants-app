import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://cupdzqjnmpepddawtukr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cGR6cWpubXBlcGRkYXd0dWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MzAzNDIsImV4cCI6MjAyNTIwNjM0Mn0.O8JgpKLSgk3tz7GUeIk-WFeD4jpbr40ppd3mih_y8dM"
);

// export const supabase = createClient(
//   "https://6708-102-216-10-2.ngrok-free.app",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
// );

export const get_stores = async () => {
  try {
    const { data } = await supabase.functions.invoke("get_stores");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const get_stores_around_user = async ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      "get_stores_around_user",
      {
        body: {
          latitude,
          longitude,
        },
      }
    );
    if (error) {
      console.log(error);
      throw new Error(error);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const get_single_store = async (store_id: string) => {
  try {
    const { data } = await supabase.functions.invoke("get_single_store", {
      body: { store_id },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const get_single_product = async (product_id: string) => {
  try {
    const { data } = await supabase.functions.invoke("get_single_product", {
      body: { product_id },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
