<template>
    <div
        v-if="!loading"
        class="w-full flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img
                class="mx-auto h-12 w-auto"
                src="../assets/logo.png"
                alt="August Realty Capital"
            />
            <h2
                class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
                Sign in to your account
            </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" v-if="loginMethod === 'email'">
                    <InputComponent
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        label="Email"                        
                        v-model="email"
                    ></InputComponent>

                    <InputComponent
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="password"
                        label="Password"
                        v-model="password"
                    ></InputComponent>

                    <p class="mt-2 text-center text-sm text-gray-600">                                        
                        <div                     
                            @click="switchToMagicLink()"       
                            class="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
                            >Login with magic link</div
                        >
                    </p>

                    <div class="flex items-center justify-between">
                        <div class="text-sm">
                            <router-link
                                :to="'/reset-password'"
                                class="font-medium text-blue-600 hover:text-blue-500"
                                >Forgot your password?</router-link
                            >
                        </div>
                    </div>

                    <div>
                        <ButtonComponent
                            :style="'primary'"
                            :disabled="!email || !password"
                            :cssClasses="'w-full border rounded-md px-4 py-2 text-sm font-medium shadow-sm'"
                            @click="signIn()"
                            >Sign In</ButtonComponent
                        >
                    </div>
                </form>
                <form class="space-y-6" v-else>
                    <InputComponent
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        label="Email"
                        :readOnly="codeSent"
                        v-model="email"
                    ></InputComponent>

                    <p class="mt-2 text-center text-sm text-gray-600">                                        
                        <div                     
                            @click="switchToEmailLogin()"       
                            class="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
                            >Login with email and password</div
                        >
                    </p>

                    <div>
                        <ButtonComponent                        
                            :style="'primary'"
                            :disabled="codeSent"
                            :cssClasses="'w-full border rounded-md px-4 py-2 text-sm font-medium shadow-sm'"
                            @click="sendMagicLink()"
                            >
                                <span v-if="!codeSent">Send magic link</span>
                                <span v-else>Magic link sent!</span>
                            </ButtonComponent
                        >                        
                    </div>
                </form>
            </div>
        </div>
    </div>

    <BannerComponent
        :isOpen="bannerOpen"
        :message="errorMessage"
        :timer="5000"
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
import { defineComponent, onMounted, ref } from "vue";
import { supabase } from "../core/functions/supabase";
import { InputComponent, ButtonComponent, BannerComponent } from "vue-blueprint-js";
import ExclamationTriangleIcon from "@heroicons/vue/24/outline/ExclamationTriangleIcon";
import { redirectByRole, setProfileData } from "../core/functions/user";
import { useAuthStore } from "../store/auth";
import router from "../router";

export default defineComponent({
    components: { ButtonComponent, InputComponent, BannerComponent, ExclamationTriangleIcon },
    setup(props) {
        // Create a single supabase client for interacting with your database
        
        const firstName = ref<string>("");
        const lastName = ref<string>("");
        const phone = ref<string>("");
        const email = ref<string>("");
        const password = ref<string>("");
        const codeSent = ref<boolean>(false)
        const loading = ref<boolean>(false);
        const bannerOpen = ref<boolean>(false);
        const errorMessage = ref<any>("");

        const loginMethod = ref<'email' | 'phone' | 'magicLink'>('email')

        onMounted(() => {
            if(useAuthStore().currentUser?.user?.id) {                
                redirectByRole()
            }
        });

        async function signIn() {
            const {data,error} = await supabase.auth.signInWithPassword({
                    email: email.value,
                    password: password.value,
                })               

            await setProfileData(data?.user?.id)

            if(error) {
                codeSent.value = false                
                errorMessage.value = error.message
                bannerOpen.value = true;
                return
            }            
            router.push({ name: "Dashboard" });
        }        

        async function switchToMagicLink() {
            loginMethod.value = 'magicLink'
        }

        async function switchToPhoneLogin() {
            loginMethod.value = 'phone'
        }

        async function switchToEmailLogin() {
            loginMethod.value = 'email'
        }        

        async function sendPhoneCode() {
            const { data, error } = await supabase.auth.signInWithOtp({
              phone: phone.value,
            })

            codeSent.value = true

        }

        async function sendMagicLink() {
            const { data, error } = await supabase.auth.signInWithOtp({
                email: email.value,
                options:
                {
                    shouldCreateUser: false,

                }
            })

            codeSent.value = true

            if(error) {
                codeSent.value = false
                email.value = ""
                errorMessage.value = (error?.message === 'Signups not allowed for otp' ? 'Email is not associated with an account' : error.message)
                bannerOpen.value = true;
            }
        }

        return {
            signIn,
            email,
            password,
            firstName,
            lastName,
            phone,
            loginMethod,
            codeSent,
            loading,
            bannerOpen,
            errorMessage,
            switchToPhoneLogin,
            switchToEmailLogin,
            switchToMagicLink,
            sendPhoneCode,
            sendMagicLink
        };
    },    
});
</script>
