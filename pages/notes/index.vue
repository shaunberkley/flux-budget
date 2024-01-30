<template>
    <main class="py-10">
        <!-- Page header -->
        <!-- <FilterMenuComponent @sort="sort($event)" /> -->
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-4">
            <ul
                v-if="notes"
                role="list"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                <router-link
                    :to="'notes/' + note.id.toString()"
                    tag="li"
                    v-for="note in notes"
                    :key="note.id"
                    class="col-span-1 flex flex-col rounded-lg bg-white text-left shadow"
                >
                    <div class="flex flex-1 flex-col px-6 pt-6">
                        <h3 class="text-base font-medium text-gray-900">
                            {{ note.title ?? "Unnamed note" }}
                        </h3>
                        <dl
                            class="mt-1 flex flex-shrink-0 flex-col justify-between"
                        >
                            <dt class="sr-only">Content</dt>
                            <dd class="text-xs text-gray-500 mt-3">
                                <span v-if="note.content"
                                    >{{
                                        note.content?.slice(0, 150).toString()
                                    }}...</span
                                >
                                <span v-if="!note.content">Empty note</span>
                            </dd>
                        </dl>
                    </div>
                    <div
                        class="flex justify-between items-center gap-3 px-6 pb-6 mt-6"
                    >
                        <div class="text-[10px] text-gray-500 text-left">
                            <span>Updated:</span>
                            {{
                                formatDate(
                                    note.updated_at,
                                    "MM/dd/yy hh:mm  aaaaa'm'"
                                )
                            }}
                        </div>
                        <div class="flex justify-end items-center gap-3">
                            <dt class="sr-only" v-if="note.company_id">
                                Company
                            </dt>
                            <dd v-if="note.company_id">
                                <router-link
                                    tag="a"
                                    :to="'/companies/' + note.company_id"
                                    class="flex gap-2 justify-center items-center text-xs font-medium"
                                >
                                    <img
                                        v-if="note.company_logo"
                                        class="h-6 w-6 max-w-none rounded-full border ring-2 ring-white p-0.5"
                                        :src="note.company_logo"
                                        :alt="note.company_name"
                                    />
                                    <div
                                        v-if="!note.company_logo"
                                        class="h-6 w-6 rounded-full border ring-2 ring-white flex justify-center items-center text-[6px] font-serif font-extrabold text-gray-500"
                                        :alt="note.company_name"
                                    >
                                        {{
                                            note.company_name
                                                .split(" ")
                                                .map((n: string[]) => n[0])
                                                .join(".")
                                        }}
                                    </div>
                                    <!-- {{ note.company_name ?? "No Company" }} -->
                                </router-link>
                            </dd>
                            <dt class="sr-only" v-if="note.contact_id">
                                Contact
                            </dt>
                            <dd v-if="note.contact_id">
                                <router-link
                                    tag="a"
                                    :to="'/contacts/' + note.contact_id"
                                    class="flex justify-center items-center gap-2 text-xs font-medium"
                                >
                                    <img
                                        class="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                                        :src="note.contact_avatar"
                                        :alt="note.contact_name"
                                    />
                                    <!-- {{ note.contact_name ?? "No Contact" }} -->
                                </router-link>
                            </dd>
                        </div>
                    </div>
                    <div class="flex border-t">
                        <div class="-ml-px flex w-0 flex-1">
                            <a
                                :href="`tel:${note.phone}`"
                                class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                            >
                                <span class="ml-3">View</span>
                            </a>
                        </div>
                    </div>
                </router-link>
            </ul>
        </div>
    </main>
</template>

<script setup lang="ts">
    import formatDate from "../../composables/date-format";

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
    let notes: any = ref({});

    onMounted(async () => {
        const { data, error } = await supabase.from("notes").select();

        console.log(data);

        notes.value = data;
    });

    function sort(sortData: any) {
        console.log(sortData);
        notes.value.sort((one: any, two: any) =>
            one[sortData.field] > two[sortData.field]
                ? sortData.direction === "asc"
                    ? 1
                    : -1
                : sortData.direction === "asc"
                ? -1
                : 1
        );
    }
</script>
