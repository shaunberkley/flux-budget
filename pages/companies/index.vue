<template>
    <main class="py-10">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-4">
            <ul
                v-if="companies"
                role="list"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                <router-link
                    :to="'companies/' + company.id"
                    tag="li"
                    v-for="company in companies"
                    :key="company.id"
                    class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                >
                    <div class="flex flex-1 flex-col p-8">
                        <Avatar class="mx-auto border bg-white" size="lg">
                            <AvatarImage
                                :src="company.avatar_url"
                                alt="Avatar"
                            />
                            <AvatarFallback
                                class="mx-auto h-32 w-32 flex-shrink-0 rounded-full border p-2 flex justify-center items-center text-4xl font-serif font-extrabold text-gray-500"
                                >{{
                                    company.name
                                        .split(" ")
                                        .map((n: string[]) => n[0])
                                        .join(".")
                                }}</AvatarFallback
                            >
                        </Avatar>
                        <h3 class="mt-6 text-sm font-medium text-gray-900">
                            {{ company.name }}
                        </h3>
                        <dl
                            class="mt-1 flex flex-grow flex-col justify-between"
                        >
                            <dt class="sr-only">Title</dt>
                            <dd class="text-sm text-gray-500">
                                {{ company.title }}
                            </dd>
                        </dl>
                        <div
                            class="flex items-center justify-center space-x-2 mt-4"
                        >
                            <div class="relative flex flex-shrink-0 -space-x-1">
                                <router-link
                                    :to="'/contacts/' + contact.id"
                                    class="hover:z-20"
                                    v-for="contact in company.contacts"
                                >
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger
                                                ><img
                                                    class="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                                                    :src="contact.avatar_url"
                                                    :alt="`${contact.first_name} ${contact.last_name}`"
                                            /></TooltipTrigger>
                                            <TooltipContent>
                                                {{ contact.first_name }}
                                                {{ contact.last_name }}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <!-- <TooltipComponent
                                        min-width="w-fit mt-1 !whitespace-nowrap"
                                        tooltipPadding="p-2"
                                    >
                                        <template #tooltipItem>
                                            <img
                                                class="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                                                :src="contact.avatar_url"
                                                :alt="`${contact.first_name} ${contact.last_name}`"
                                            />
                                        </template>
                                        <template #tooltipContent>
                                            
                                        </template>
                                    </TooltipComponent> -->
                                </router-link>
                            </div>

                            <span
                                v-if="company.contacts.length > 4"
                                class="flex-shrink-0 text-xs font-medium leading-5"
                                >+{{ company.contacts.length - 4 }}</span
                            >
                            <span
                                v-if="company.contacts.length < 1"
                                class="flex-shrink-0 text-xs leading-5"
                                >No contacts</span
                            >
                        </div>
                    </div>
                    <div class="-mt-px flex divide-x divide-gray-200">
                        <div class="-ml-px flex w-0 flex-1">
                            <router-link
                                :to="`companies/${company.id}`"
                                class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                            >
                                <span>View</span>
                            </router-link>
                        </div>
                    </div>
                </router-link>
            </ul>

            <!-- Skeleton loader -->
            <div
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                v-if="!companies.length"
            >
                <div
                    v-for="card in [1, 2, 3, 4]"
                    class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow"
                >
                    <div class="animate-pulse">
                        <div class="flex flex-1 flex-col p-8">
                            <div
                                class="flex justify-center items-center mx-auto h-32 w-32 flex-shrink-0 rounded-full border p-2"
                            >
                                <svg
                                    class="w-12 h-12 text-gray-200 dark:text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 640 512"
                                >
                                    <path
                                        d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
                                    />
                                </svg>
                            </div>
                            <div
                                class="mt-6 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mx-auto"
                            ></div>
                            <div
                                class="flex justify-center items-center flex-shrink-0 -space-x-1"
                            >
                                <div
                                    class="h-6 w-6 max-w-none rounded-full bg-gray-100"
                                    v-for="card in [1, 2, 3, 4]"
                                >
                                    <svg
                                        class="text-gray-700"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="-mt-px flex border-t">
                            <div class="-ml-px flex w-0 flex-1">
                                <div
                                    class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-5 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >
                                    <div
                                        class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mx-auto"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Skeleton loader end -->
        </div>
    </main>
</template>

<script setup lang="ts">
    // Create a single supabase client for interacting with your database
    let companies: any = ref({});

    onMounted(async () => {
        setCompanies();
        supabase
            .channel("schema-db-changes")
            .on(
                "postgres_changes",
                {
                    schema: "public", // Subscribes to the "public" schema in Postgres
                    event: "*", // Listen to all changes
                },
                (payload) => {
                    setCompanies();
                    console.log(payload);
                }
            )
            .subscribe();
    });

    async function setCompanies() {
        const { data, error } = await supabase.from("companies").select(
            `*,       
                profiles (*),
                notes (*),
                contacts (*)
            `
        );

        companies.value = data;
    }
</script>
