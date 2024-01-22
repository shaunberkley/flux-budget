<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
    import { userProfileStore } from "./store/index";
    import { useAuthStore } from "./store/auth";
    import type { Database } from "./types/supabase";

    const user = ref<Database["public"]["Tables"]["profiles"]["Row"] | null>(
        null
    );

    supabase.auth.onAuthStateChange(async (event) => {
        console.log(event);
        if (event === "SIGNED_IN") {
            await useAuthStore().loadUser();
            useAuthStore().loadRedirectRoute();
            setProfileData();
        } else if (event === "SIGNED_OUT") {
            useAuthStore().clearUser();
        }
    });

    onMounted(async () => {
        console.log(useAuthStore().currentUser);
        if (useAuthStore().currentUser?.user?.id) {
            user.value =
                (await setProfileData()) as Database["public"]["Tables"]["profiles"]["Row"];
        }
    });

    userProfileStore().$subscribe((e: any) => {
        user.value = userProfileStore().profile;
        console.log(user.value);
    });
</script>
