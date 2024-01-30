<template>
    <div
        class="w-full flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img
                class="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                alt="Your Company"
            />
            <h2
                class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
                Sign up for your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ " " }}
                <router-link
                    :to="'/sign-in'"
                    class="font-medium text-blue-600 hover:text-blue-500"
                    >Sign In</router-link
                >
            </p>
        </div>

        <div v-if="signedUp" class="flex justify-center">
            <div class="mt-8 mx-auto inline-block">
                <div
                    class="bg-blue-600 text-white text-center py-8 px-4 shadow rounded-lg sm:px-10 flex flex-col items-center gap-4"
                >
                    <div class="bg-white rounded-full p-4">
                        <HandThumbUpIcon
                            class="h-6 w-6 text-blue-600"
                            aria-hidden="true"
                        />
                    </div>
                    <div class="text-lg max-w-[300px]">
                        You're all set! A link to verify your account was sent
                        to your email.
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="!formLoading && !signedUp"
            class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" action="#" method="POST">
                    <div>
                        <label
                            for="firstName"
                            class="block text-sm font-medium text-gray-700"
                            >First Name</label
                        >
                        <div class="mt-1">
                            <InputComponent
                                v-model="firstName"
                                id="firstName"
                                name="firstName"
                                type="text"
                                autocomplete="firstName"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="lastName"
                            class="block text-sm font-medium text-gray-700"
                            >Last Name</label
                        >
                        <div class="mt-1">
                            <InputComponent
                                v-model="lastName"
                                id="lastName"
                                name="lastName"
                                type="text"
                                autocomplete="lastName"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="phone"
                            class="block text-sm font-medium text-gray-700"
                            >Phone</label
                        >
                        <div class="mt-1">
                            <InputComponent
                                v-model="phone"
                                id="phone"
                                name="phone"
                                type="text"
                                autocomplete="phone"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Email address</label
                        >
                        <div class="mt-1">
                            <InputComponent
                                v-model="email"
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                :disabled="true"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                            >Password</label
                        >
                        <div class="mt-1">
                            <InputComponent
                                v-model="password"
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                            />
                        </div>
                    </div>

                    <div>
                        <ButtonComponent
                            :style="'primary'"
                            :disabled="
                                !firstName ||
                                !lastName ||
                                !phone ||
                                !email ||
                                !password
                            "
                            :cssClasses="'w-full border rounded-md px-4 py-2 text-sm font-medium shadow-sm'"
                            @click="signUp()"
                            >Sign Up</ButtonComponent
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>

    <BannerComponent
        :isOpen="bannerOpen"
        :message="errorMessage"
        :timer="bannerTimer"
        @close="bannerOpen = false"
    >
        <template v-slot:icon>
            <ExclamationTriangleIcon
                class="h-6 w-6 text-white"
                aria-hidden="true"
            />
        </template>
    </BannerComponent>
</template>

<script lang="ts">
    import { computed, onMounted, ref, defineComponent } from "vue";
    import { supabase } from "../core/functions/supabase";
    import ExclamationTriangleIcon from "@heroicons/vue/24/outline/ExclamationTriangleIcon";
    import { useRoute, RouterLink } from "vue-router";
    import { HandThumbUpIcon } from "@heroicons/vue/24/outline";
    import type { Company } from "../core/types/companies.model";
    import type { Role } from "../core/types/roles.model";
    import {
        BannerComponent,
        ButtonComponent,
        InputComponent,
    } from "vue-blueprint-js";
    import type { PendingInvite } from "../core/types/invitations.model";

    export default defineComponent({
        components: {
            ButtonComponent,
            BannerComponent,
            InputComponent,
            ExclamationTriangleIcon,
            HandThumbUpIcon,
        },
        setup(props) {
            // Create a single supabase client for interacting with your database

            const firstName = ref<string>("");
            const lastName = ref<string>("");
            const phone = ref<string>("");
            const email = ref<string>("");
            const password = ref<string>("");

            const errorMessage = ref<any>("");
            const bannerOpen = ref<boolean>(false);
            const bannerTimer = ref<number | undefined>();

            const pendingInvite = ref<PendingInvite>();

            const signedUp = ref<boolean>(false);

            const formLoading = ref<boolean>(false);

            const route = useRoute();

            const inviteCode = computed(() =>
                route.query && route.query.inviteCode
                    ? route.query.inviteCode.toString()
                    : null
            );

            onMounted(async () => {
                formLoading.value = true;
                if (inviteCode.value) {
                    const { data, error } = await supabase
                        .from("pending_invites")
                        .select(
                            `
                        *,
                        role_details:roles(*),
                        company_details:companies(*)                        
                    `
                        )
                        .eq("id", inviteCode.value)
                        .limit(1)
                        .single();

                    pendingInvite.value = data as unknown as PendingInvite;

                    if (!pendingInvite.value) {
                        errorMessage.value =
                            "Invalid invite code. Please request another invitation.";
                        bannerTimer.value = undefined;
                        bannerOpen.value = true;
                    } else {
                        formLoading.value = false;
                        email.value = pendingInvite.value.email;
                    }
                } else {
                    errorMessage.value =
                        "Missing invite code. Please request an invitation.";
                    bannerTimer.value = undefined;
                    bannerOpen.value = true;
                }
            });

            async function signUp() {
                const signUpRes = await supabase.auth.signUp({
                    email: email.value,
                    password: password.value,
                });

                if (signUpRes.error) {
                    errorMessage.value = signUpRes.error.message;
                    bannerTimer.value = 5000;
                    bannerOpen.value = true;

                    return;
                }

                const { data, error } = await supabase.from("profiles").insert({
                    id: signUpRes.data.user?.id,
                    first_name: firstName.value,
                    last_name: lastName.value,
                    email: email.value,
                    role: pendingInvite.value?.role,
                    phone: phone.value,
                });

                await supabase
                    .from("pending_invites")
                    .delete()
                    .eq("id", inviteCode.value);

                if (pendingInvite.value?.company) {
                    const role =
                        pendingInvite.value.role_details.name.toLocaleLowerCase();

                    const { data, error } = await supabase
                        .from("notifications")
                        .insert({
                            company: pendingInvite.value?.company,
                            message: `${firstName.value} ${lastName.value} has accepted their invite and created their account as a ${role}.`,
                            router_link: `/users/${signUpRes.data.user?.id}`,
                            profile: pendingInvite.value.invited_by,
                            action: "View",
                        });
                }

                signedUp.value = true;
            }

            return {
                signUp,
                email,
                password,
                firstName,
                lastName,
                phone,
                bannerOpen,
                bannerTimer,
                errorMessage,
                formLoading,
                signedUp,
            };
        },
    });
</script>
