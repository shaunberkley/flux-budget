import { createClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#app";
import { userProfileStore } from "../store/index";
import { useAuthStore } from "../store/auth";

const supabaseUrl = "https://faimdolwnjznwqyksnkq.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhaW1kb2x3bmp6bndxeWtzbmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2Nzg4NjcsImV4cCI6MTk5OTI1NDg2N30.7-3HpslysbQCm5tkTjdwQF0-QMVMAvJIIozBrBjwA7A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function setProfileData(userId?: string) {
    const { data } = await supabase
        .from("profiles")
        .select(
            `
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                created_at,
                updated_at
            `
        )
        .eq("id", userId ?? useAuthStore().currentUser?.user?.id)
        .limit(1)
        .single();
    console.log(data);
    userProfileStore().profile = data as
        | Database["public"]["Tables"]["profiles"]["Row"]
        | null;
    return data;
}

export async function signOut() {
    console.log("out");
    useAuthStore().clearUser();
    userProfileStore().profile = null;
    await supabase.auth.signOut().then((e) => {
        console.log(e);
        navigateTo("/login");
    });
}
