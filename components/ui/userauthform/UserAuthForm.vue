<script setup lang="ts">
    import { ref } from "vue";

    import { cn } from "@/lib/utils";

    const isLoading = ref(false);
    const email = ref("");
    const password = ref("");
    const showError = ref(false);
    const errorMsg = ref("");
    const hideError = () => {
        showError.value = false;
    };

    async function signIn(event: Event) {
        event.preventDefault();
        console.log(event);
        try {
            isLoading.value = true;
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            });

            if (error) throw error;
            // Make sure the session is set before the `auth` middleware runs
            if (data) {
                // await supabase.auth.setSession(data.session);
                await setProfileData(data?.user?.id);
                console.log("nav");
                navigateTo("/dashboard");
            }
        } catch (e) {
            const error = e as Error;
            showError.value = true;
            errorMsg.value = error.message;
            console.log(error.message);
            setTimeout(hideError, 3000);
        } finally {
            isLoading.value = false;
        }
        console.log("sign in");
    }
</script>

<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit="signIn">
            <div class="grid gap-4">
                <div class="grid gap-4">
                    <div>
                        <Label for="email"> Email </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            auto-capitalize="none"
                            auto-complete="email"
                            auto-correct="off"
                            v-model="email"
                            :disabled="isLoading"
                        />
                    </div>
                    <div>
                        <Label for="password"> Password </Label>
                        <Input
                            id="password"
                            placeholder=""
                            type="password"
                            auto-capitalize="none"
                            auto-correct="off"
                            v-model="password"
                            :disabled="isLoading"
                        />
                    </div>
                </div>
                <Button :disabled="isLoading">
                    <ph-circle-notch
                        :size="16"
                        class="mr-2 h-4 w-4 animate-spin"
                        v-if="isLoading"
                    />
                    Log in
                </Button>
            </div>
        </form>
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                    Or
                </span>
            </div>
        </div>
        <Button variant="outline" type="button" :disabled="isLoading">
            <ph-circle-notch
                :size="16"
                class="mr-2 h-4 w-4 animate-spin"
                v-if="isLoading"
            />
            Create Account
        </Button>
    </div>
</template>
