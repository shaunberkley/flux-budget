<template>
    <main class="py-10">
        <!-- Page header -->
        <div
            class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
        >
            <div class="">
                <div class="flex items-center gap-4">
                    <AvatarComponent
                        :imageUrl="company?.avatar_url"
                        :name="company?.name"
                        :cssClasses="'h-24 w-24 text-gray-500 border p-2 text-2xl'"
                    ></AvatarComponent>
                    <div>
                        <h1
                            v-if="company?.name"
                            class="text-2xl font-bold text-gray-900"
                        >
                            {{ company?.name }}
                        </h1>
                        <LoadingPulseBarComponent
                            v-if="!company?.name"
                            :cssClasses="'h-5 bg-gray-200 dark:bg-gray-700 w-48 mb-3'"
                        ></LoadingPulseBarComponent>
                        <p
                            v-if="company?.created_at"
                            class="text-sm font-medium text-gray-500"
                        >
                            Created:
                            {{ formatDate(company?.created_at, "MM/dd/yyyy") }}
                        </p>
                        <LoadingPulseBarComponent
                            v-if="!company?.created_at"
                            :cssClasses="'h-2.5 bg-gray-200 dark:bg-gray-700 w-32'"
                        ></LoadingPulseBarComponent>
                    </div>
                </div>
            </div>
            <div
                class="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3"
            >
                <!-- <ButtonComponent :style="'secondary'"
                    >Disqualify</ButtonComponent
                >
                <ButtonComponent :style="'primary'"
                    >Advance to offer</ButtonComponent
                > -->
            </div>
        </div>

        <div
            class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
        >
            <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                <section aria-labelledby="company-information-title">
                    <div class="bg-white shadow sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h2
                                id="company-information-title"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                                Company Information
                            </h2>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl
                                class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2"
                            >
                                <div class="sm:col-span-1">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Industry
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ company?.industry?.name }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Website
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        <a
                                            v-if="!company?.website"
                                            :href="company?.website"
                                            target="_blank"
                                            >{{
                                                company?.website ??
                                                "No website added"
                                            }}</a
                                        >
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Score
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ company?.score }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-2">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        About
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ company?.about ?? "No about added" }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-2">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Tags
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        <ul
                                            v-if="
                                                company?.tags &&
                                                company?.tags.length
                                            "
                                            role="list"
                                            class="divide-y divide-gray-200 rounded-md border border-gray-200"
                                        >
                                            <li
                                                v-for="tag in company?.tags"
                                                :key="tag.tag_info?.id"
                                                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                            >
                                                <div
                                                    class="flex w-0 flex-1 items-center"
                                                >
                                                    <HashtagIcon
                                                        class="h-4 w-4 flex-shrink-0 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        class="ml-2 w-0 flex-1 truncate"
                                                        >{{
                                                            tag.tag_info?.name
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <div
                                                        @click="
                                                            removeTag(tag?.id)
                                                        "
                                                        class="text-xs font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                    >
                                                        Remove
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div
                                            v-if="
                                                !tagEditMode &&
                                                company?.tags &&
                                                company?.tags.length < 1
                                            "
                                        >
                                            No tags added
                                        </div>
                                        <ul
                                            v-if="tagEditMode === true"
                                            role="list"
                                            class="divide-y divide-gray-200 rounded-md border border-gray-200"
                                        >
                                            <li
                                                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                            >
                                                <div
                                                    class="flex w-0 flex-1 items-center"
                                                >
                                                    <HashtagIcon
                                                        class="h-4 w-4 flex-shrink-0 text-gray-400 mr-4"
                                                        aria-hidden="true"
                                                    />
                                                    <!-- <input
                                                        v-model="addTagName"
                                                        type="text"
                                                        name="tag_name"
                                                        id="tag_name"
                                                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    /> -->
                                                    <AutocompleteComponent
                                                        @select="
                                                            tagNameSelected(
                                                                $event
                                                            )
                                                        "
                                                        :items="allTagsItems"
                                                    ></AutocompleteComponent>
                                                </div>
                                                <div
                                                    class="ml-4 flex gap-3 flex-shrink-0"
                                                >
                                                    <div
                                                        @click="addTag()"
                                                        class="text-xs font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                    >
                                                        Add
                                                    </div>
                                                    <div
                                                        @click="
                                                            closeAddTagMode()
                                                        "
                                                        class="text-xs font-medium hover:text-blue-500 cursor-pointer"
                                                    >
                                                        Cancel
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>
                                </div>
                            </dl>
                            <div
                                @click="openAddTagMode()"
                                :class="
                                    tagEditMode
                                        ? 'opacity-50 pointer-events-none'
                                        : ''
                                "
                                class="flex items-center justify-center gap-1 px-4 mt-4 cursor-pointer text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                            >
                                <PlusCircleIcon
                                    class="h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                />
                                Add tag
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Comments-->
                <section aria-labelledby="notes-title" v-if="company?.notes">
                    <div
                        class="bg-white shadow sm:overflow-hidden sm:rounded-lg"
                    >
                        <div class="divide-y divide-gray-200">
                            <div class="px-4 py-5 sm:px-6">
                                <h2
                                    id="notes-title"
                                    class="text-lg font-medium text-gray-900"
                                >
                                    Notes ({{ company?.notes.length }})
                                </h2>
                            </div>
                            <div>
                                <ul role="list" v-if="company?.notes.length">
                                    <li v-for="note in company?.notes">
                                        <router-link
                                            :to="'/notes/' + note.id"
                                            :key="note.id"
                                            class="block cursor-pointer hover:bg-gray-50 px-4 py-4 sm:px-6"
                                        >
                                            <div class="flex space-x-3">
                                                <div>
                                                    <div class="text-sm">
                                                        <h3
                                                            class="font-medium text-gray-900"
                                                        >
                                                            {{
                                                                note.title ??
                                                                "Unnamed note"
                                                            }}
                                                        </h3>
                                                    </div>
                                                    <div
                                                        class="mt-1 text-sm text-gray-700"
                                                    >
                                                        <p>
                                                            {{
                                                                note.content
                                                                    ?.slice(
                                                                        0,
                                                                        150
                                                                    )
                                                                    .toString()
                                                            }}...
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="mt-2 space-x-2 text-xs"
                                                    >
                                                        <span
                                                            class="font-light text-gray-500"
                                                            >Updated
                                                            {{
                                                                formatDate(
                                                                    note.updated_at,
                                                                    "MM/dd/yy hh:mm  aaaaa'm'"
                                                                )
                                                            }}</span
                                                        >
                                                        {{ " " }}
                                                        <span
                                                            class="font-extrabold text-gray-500"
                                                            >&middot;</span
                                                        >
                                                        {{ " " }}
                                                        <span
                                                            class="font-light text-gray-500"
                                                            >Created
                                                            {{
                                                                formatDate(
                                                                    note.created_at,
                                                                    "MM/dd/yy hh:mm  aaaaa'm'"
                                                                )
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section
                aria-labelledby="timeline-title"
                class="lg:col-span-1 lg:col-start-3"
            >
                <div class="bg-white py-5 shadow sm:rounded-lg">
                    <h2
                        id="timeline-title"
                        class="text-lg font-medium text-gray-900 px-4 sm:px-6"
                    >
                        Contacts ({{ company?.contacts?.length }})
                    </h2>

                    <!-- Activity Feed -->
                    <div class="low-root" v-if="company && company?.contacts">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li
                                v-for="contact in company?.contacts"
                                :key="company.email"
                                class="col-span-1 divide-y divide-gray-200 bg-white"
                            >
                                <router-link
                                    :to="'/contacts/' + contact.id"
                                    class="flex w-full hover:bg-gray-50 items-center justify-between space-x-6 p-6"
                                >
                                    <div class="flex-1 truncate">
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <h3
                                                class="truncate text-sm font-medium text-gray-900"
                                            >
                                                {{
                                                    `${contact.first_name} ${contact.last_name}`
                                                }}
                                            </h3>
                                            <!-- <span class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">{{ contact.role }}</span> -->
                                        </div>
                                        <p
                                            class="mt-1 truncate text-sm text-gray-500"
                                        >
                                            {{ contact.title }}
                                        </p>
                                    </div>
                                    <img
                                        class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                        :src="contact.avatar_url"
                                        alt=""
                                    />
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div
                        class="justify-stretch mt-6 flex flex-col px-4 sm:px-6"
                    >
                        <ButtonComponent :style="'primary'"
                            >Add contact</ButtonComponent
                        >
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
    import formatDate from "../../composables/date-format";

    interface Tag {
        created_at: string;
        id: string;
        name: string;
    }

    interface TagInfo {
        id?: string;
        tag_info: Tag | null;
    }

    interface Note {
        id: string;
        author: string;
        created_at: string;
        updated_at: string;
        company?: string;
        contact?: string;
        content?: string;
        tags: Tag[] | null;
        title?: string;
    }

    interface Contact {
        id: string;
        email?: string;
        first_name: string;
        last_name: string;
        avatar_url: string;
        created_at: string;
        company?: string;
        title?: string;
        phone?: string;
    }

    interface Industry {
        created_at: Date;
        id: string;
        name: string;
    }

    interface Company {
        id: string;
        name: string;
        industry?: Industry;
        about?: string;
        email?: string;
        phone?: string;
        title?: string;
        avatar_url?: string;
        website?: string;
        score: 1 | 2 | 3 | 4 | 5;
        created_at: string;
        tags?: TagInfo[];
        company_id?: string;
        company_name?: string;
        notes?: Note[];
        contacts?: Contact[];
    }

    interface AutocompleteItem {
        name: string;
        value: any;
    }

    let company = ref<Company | null>();
    let tagEditMode = ref<boolean>(false);
    let addTagName = ref();
    let allTags = ref<Tag[] | null>();
    let allTagsItems = ref<AutocompleteItem[] | undefined>();

    const companyId = useRoute().params.id;

    onMounted(async () => {
        getCompany();
    });

    async function getCompany() {
        const { data, error } = await supabase
            .from("companies")
            .select(
                `*,
                        notes(*),
                        contacts(*),
                        industry(*),
                        tags:tag_relationships(
                        id,
                        tag_info:tags(*)
                        )
                    `
            )
            .eq("id", companyId)
            .limit(1)
            .single();
        console.log(data);

        company.value = data as Company;

        getAllTags();
    }

    async function addTagRelationShip() {
        console.log("adding a new tag relationship");

        const existingTag: Tag | undefined = JSON.parse(
            JSON.stringify(allTags.value)
        )?.find((t: Tag) => t.name === addTagName.value);

        console.log(
            JSON.parse(JSON.stringify(allTags.value)),
            existingTag,
            addTagName.value
        );

        await supabase
            .from("tag_relationships")
            .upsert({
                tag: existingTag?.id,
                company: companyId,
                created_at: existingTag?.created_at,
            })
            .select(
                `
                  id,
                  tags(*)
                `
            )
            .single()
            .then((tagRelationshipsData: any) => {
                console.log(tagRelationshipsData);
                company.value?.tags?.push({
                    tag_info: tagRelationshipsData.data.tags,
                });
                addTagName.value = "";
                tagEditMode.value = false;
                getCompany();
            });
    }

    async function addNewTag() {
        console.log("adding a new tag");
        await supabase
            .from("tags")
            .upsert({ name: addTagName.value })
            .select()
            .single()
            .then(async (data: any) => {
                console.log(data);
                await supabase
                    .from("tag_relationships")
                    .insert({
                        tag: data.data.id,
                        company: companyId,
                        created_at: data.data.created_at,
                    })
                    .select(
                        `
                            id,
                            tags(*)
                          `
                    )
                    .single()
                    .then((tagRelationshipsData: any) => {
                        console.log(tagRelationshipsData);
                        company.value?.tags?.push({
                            tag_info: tagRelationshipsData.data.tags,
                        });
                        addTagName.value = "";
                        tagEditMode.value = false;
                        getCompany();
                    });
            });
    }

    function tagNameSelected(tagName: string) {
        addTagName.value = tagName;
    }

    async function addTag() {
        console.log(
            JSON.parse(JSON.stringify(allTags.value)),
            addTagName.value
        );
        if (
            JSON.parse(JSON.stringify(allTags.value))?.filter(
                (t: Tag) => t.name === addTagName.value
            ).length > 0
        )
            addTagRelationShip();
        else addNewTag();
    }

    async function removeTag(tagId: string | undefined) {
        console.log(tagId);
        await supabase
            .from("tag_relationships")
            .delete()
            .eq("id", tagId)
            .then(() => getCompany());
    }

    async function getAllTags() {
        const { data } = await supabase.from("tags").select(`
              id,
              name,
              created_at,
              tag_relationships(id)
            `);
        console.log(data);
        allTags.value = data;
        allTagsItems.value = data?.map((tag: Tag) => {
            return {
                name: tag.name,
                value: tag.name,
            };
        });
        console.log(allTagsItems.value);
    }

    function openAddTagMode() {
        tagEditMode.value = true;
    }

    function closeAddTagMode() {
        tagEditMode.value = false;
        addTagName.value = "";
    }
</script>
