import { createClient } from "@supabase/supabase-js";
import { userProfileStore } from "../store/index";
import { useAuthStore } from "../store/auth";
import type { Database } from "../types/supabase";

const supabaseUrl = "https://kyozgsosnylxasrxivzc.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5b3pnc29zbnlseGFzcnhpdnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3OTIzMjgsImV4cCI6MTk4ODM2ODMyOH0.o7qyqv1yCTwzIHS905a55vO6bM2F8CbbS9Kri82bIwE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function setProfileData(userId?: string) {
    const { data } = await supabase
        .from("profiles")
        .select(
            `
                *
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
