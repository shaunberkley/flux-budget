<template>
    <main class="py-10">
        <!-- Page header -->
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-4">
            <ul
                v-if="contacts"
                role="list"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                <router-link
                    :to="'contacts/' + person.id.toString()"
                    tag="li"
                    v-for="person in contacts"
                    :key="person.id"
                    class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                >
                    <div class="flex flex-1 flex-col p-8">
                        <img
                            class="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                            :src="person.avatar_url"
                            :alt="`${person.first_name} ${person.last_name}`"
                        />
                        <h3 class="mt-6 text-sm font-medium text-gray-900">
                            {{ `${person.first_name} ${person.last_name}` }}
                        </h3>
                        <dl
                            class="mt-1 flex flex-grow flex-col justify-between"
                        >
                            <dt class="sr-only">Title</dt>
                            <dd class="text-sm text-gray-500">
                                {{ person.title }}
                            </dd>
                            <dt class="sr-only">Role</dt>
                            <dd class="mt-3">
                                <!-- <router-link
                                    tag="a"
                                    :to="'/companies/' + person.company_id"
                                    class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                                    >{{
                                        person?.company?.name ?? "No Company"
                                    }}</router-link
                                > -->
                                <div v-if="person?.company">
                                    <router-link
                                        :to="
                                            '/companies/' + person?.company?.id
                                        "
                                        class="hover:z-20 flex items-center gap-3 text-left"
                                    >
                                        <img
                                            v-if="person?.company?.avatar_url"
                                            class="h-8 w-8 max-w-none rounded-full ring-2 ring-slate-100"
                                            :src="person?.company?.avatar_url"
                                            :alt="person?.company?.name"
                                        />
                                        <div
                                            v-if="!person?.company?.avatar_url"
                                            class="h-8 w-8 max-w-none text-xs flex items-center justify-center rounded-full ring-2 ring-slate-100 p-2 font-bold"
                                        >
                                            {{
                                                person &&
                                                person.company &&
                                                person.company.name
                                                    ? getCompanyAbbreviation(
                                                          person.company.name
                                                      )
                                                    : ""
                                            }}
                                        </div>
                                        {{
                                            person?.company?.name ??
                                            "No Company"
                                        }}
                                    </router-link>
                                </div>
                                <div v-else>No Company</div>
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <div class="-mt-px flex divide-x divide-gray-200">
                            <div class="flex w-0 flex-1">
                                <a
                                    :href="`mailto:${person.email}`"
                                    class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >
                                    <EnvelopeIcon
                                        class="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <span class="ml-3">Email</span>
                                </a>
                            </div>
                            <div class="-ml-px flex w-0 flex-1">
                                <a
                                    :href="`tel:${person.phone}`"
                                    class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >
                                    <PhoneIcon
                                        class="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <span class="ml-3">Call</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </router-link>
            </ul>
            <!-- Skeleton loader -->
            <div class="flex flex-col gap-6">
                <div
                    class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    v-if="contacts.length"
                    v-for="cardRow in [1, 2, 3]"
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
            </div>
            <!-- Skeleton loader end -->
        </div>
    </main>
</template>

<script setup lang="ts">
    interface Contact {
        id: string;
        first_name: string;
        last_name: string;
        email?: string;
        phone?: string;
        title?: string;
        avatar_url?: string;
        score: 1 | 2 | 3 | 4 | 5;
        created_at: string;
        tags?: string[];
        company_id?: string;
        company_name?: string;
    }
    let contacts: any = ref({});

    onMounted(async () => {
        const { data, error } = await supabase.from("contacts").select(`
                        *,
                        company(*)
                    `);

        console.log(data);

        contacts.value = data;
    });

    function getCompanyAbbreviation(name: string) {
        const abbreviation = name
            .split(" ")
            .map((n: string) => n[0])
            .join(".");

        console.log(abbreviation, name);

        return abbreviation.length > 5 ? name[0] : abbreviation;
    }
</script>
