<template>
    <main class="py-10" v-if="contact">
        <!-- Page header -->
        <div
            class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
        >
            <div class="flex items-center space-x-5">
                <div class="flex-shrink-0">
                    <div class="relative">
                        <img
                            class="h-16 w-16 rounded-full"
                            :src="
                                contact.avatar_url ??
                                'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80'
                            "
                            alt=""
                        />
                        <span
                            class="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div>
                    <h1
                        class="text-2xl font-bold text-gray-900"
                        v-if="contact.first_name && contact.last_name"
                    >
                        {{ contact.first_name }} {{ contact.last_name }}
                    </h1>
                    <p
                        class="text-sm font-medium text-gray-500"
                        v-if="contact.title"
                    >
                        {{ contact.title }}
                    </p>
                    <div class="animate-pulse">
                        <div
                            class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2"
                            v-if="!contact.first_name && !contact.last_name"
                        ></div>
                        <div
                            class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"
                            v-if="!contact.title"
                        ></div>
                    </div>
                </div>
            </div>
            <div
                class="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3"
            >
                <a
                    :href="`tel:${contact.phone}`"
                    class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5 mr-2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                    </svg>
                    Call
                </a>
                <a
                    :href="`mailto:${contact.email}`"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5 mr-2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                    </svg>
                    Email
                </a>
            </div>
        </div>

        <div
            class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
        >
            <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                <!-- Description list-->
                <section aria-labelledby="contact-information-title">
                    <div class="bg-white shadow sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h2
                                id="contact-information-title"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                                Contact Information
                            </h2>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                Personal details about the contact.
                            </p>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl
                                class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2"
                            >
                                <div class="sm:col-span-1">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Name
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ contact.first_name }}
                                        {{ contact.last_name }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Email address
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ contact.email }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Phone
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ contact.phone }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Score
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ contact.score }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-2">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        About
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        Fugiat ipsum ipsum deserunt culpa aute
                                        sint do nostrud anim incididunt cillum
                                        culpa consequat. Excepteur qui ipsum
                                        aliquip consequat sint. Sit id mollit
                                        nulla mollit nostrud in ea officia
                                        proident. Irure nostrud pariatur mollit
                                        ad adipisicing reprehenderit deserunt
                                        qui eu.
                                    </dd>
                                </div>
                                <!-- <div class="sm:col-span-2">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Attachments
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        <ul
                                            role="list"
                                            class="divide-y divide-gray-200 rounded-md border border-gray-200"
                                        >
                                            <li
                                                v-for="attachment in attachments"
                                                :key="attachment.name"
                                                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                            >
                                                <div
                                                    class="flex w-0 flex-1 items-center"
                                                >
                                                    <PaperClipIcon
                                                        class="h-5 w-5 flex-shrink-0 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        class="ml-2 w-0 flex-1 truncate"
                                                        >{{
                                                            attachment.name
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <a
                                                        :href="attachment.href"
                                                        class="font-medium text-blue-600 hover:text-blue-500"
                                                        >Download</a
                                                    >
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>
                                </div> -->
                            </dl>
                        </div>
                    </div>
                </section>

                <!-- Comments-->
                <section aria-labelledby="notes-title">
                    <div
                        class="bg-white shadow sm:overflow-hidden sm:rounded-lg"
                    >
                        <div class="divide-y divide-gray-200">
                            <div class="px-4 py-5 sm:px-6">
                                <h2
                                    id="notes-title"
                                    class="text-lg font-medium text-gray-900"
                                >
                                    Notes
                                </h2>
                            </div>
                            <div class="px-4 py-6 sm:px-6">
                                <ul role="list" class="space-y-8">
                                    <li
                                        v-for="comment in comments"
                                        :key="comment.id"
                                    >
                                        <div class="flex space-x-3">
                                            <div class="flex-shrink-0">
                                                <img
                                                    class="h-10 w-10 rounded-full"
                                                    :src="`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <div class="text-sm">
                                                    <a
                                                        href="#"
                                                        class="font-medium text-gray-900"
                                                        >{{ comment.name }}</a
                                                    >
                                                </div>
                                                <div
                                                    class="mt-1 text-sm text-gray-700"
                                                >
                                                    <p>{{ comment.body }}</p>
                                                </div>
                                                <div
                                                    class="mt-2 space-x-2 text-sm"
                                                >
                                                    <span
                                                        class="font-medium text-gray-500"
                                                        >{{
                                                            comment.date
                                                        }}</span
                                                    >
                                                    {{ " " }}
                                                    <span
                                                        class="font-medium text-gray-500"
                                                        >&middot;</span
                                                    >
                                                    {{ " " }}
                                                    <button
                                                        type="button"
                                                        class="font-medium text-gray-900"
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-6 sm:px-6">
                            <div class="flex space-x-3">
                                <div class="flex-shrink-0">
                                    <img
                                        class="h-10 w-10 rounded-full"
                                        :src="user.imageUrl"
                                        alt=""
                                    />
                                </div>
                                <div class="min-w-0 flex-1">
                                    <form action="#">
                                        <div>
                                            <label for="comment" class="sr-only"
                                                >About</label
                                            >
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                rows="3"
                                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                placeholder="Add a note"
                                            />
                                        </div>
                                        <div
                                            class="mt-3 flex items-center justify-end"
                                        >
                                            <button
                                                type="submit"
                                                class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section
                aria-labelledby="timeline-title"
                class="lg:col-span-1 lg:col-start-3"
            >
                <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2
                        id="timeline-title"
                        class="text-lg font-medium text-gray-900"
                    >
                        Companies ({{ contact?.contact_company?.length ?? 0 }})
                    </h2>

                    <div
                        class="low-root"
                        v-if="contact && contact?.contact_company"
                    >
                        <ul role="list" class="divide-y divide-gray-200">
                            <li
                                v-for="company in contact?.contact_company"
                                :key="company.company.id"
                                class="col-span-1 divide-y divide-gray-200 bg-white"
                            >
                                <router-link
                                    :to="'/companies/' + company.company.id"
                                    class="flex w-full hover:bg-gray-50 items-center justify-between space-x-6 p-6"
                                >
                                    <div class="flex-1 truncate">
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <h3
                                                class="truncate text-sm font-medium text-gray-900"
                                            >
                                                {{ `${company.company.name}` }}
                                            </h3>
                                            <!-- <span class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">{{ contact.role }}</span> -->
                                        </div>
                                        <p
                                            class="mt-1 truncate text-sm text-gray-500"
                                        >
                                            {{ company.company.industry?.name }}
                                        </p>
                                    </div>
                                    <img
                                        class="h-10 w-10 flex-shrink-0 rounded-full bg-white"
                                        :src="company.company.avatar_url"
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
                            >Add company</ButtonComponent
                        >
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
    const user = {
        name: "Whitney Francis",
        email: "whitney@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    };

    const eventTypes = {
        applied: { icon: "", bgColorClass: "bg-gray-400" },
        advanced: { icon: "", bgColorClass: "bg-blue-500" },
        completed: { icon: "", bgColorClass: "bg-green-500" },
    };

    const attachments = [
        { name: "resume_front_end_developer.pdf", href: "#" },
        { name: "coverletter_front_end_developer.pdf", href: "#" },
    ];

    const timeline = [
        {
            id: 1,
            type: eventTypes.applied,
            content: "Applied to",
            target: "Front End Developer",
            date: "Sep 20",
            datetime: "2020-09-20",
        },
        {
            id: 2,
            type: eventTypes.advanced,
            content: "Advanced to phone screening by",
            target: "Bethany Blake",
            date: "Sep 22",
            datetime: "2020-09-22",
        },
        {
            id: 3,
            type: eventTypes.completed,
            content: "Completed phone screening with",
            target: "Martha Gardner",
            date: "Sep 28",
            datetime: "2020-09-28",
        },
        {
            id: 4,
            type: eventTypes.advanced,
            content: "Advanced to interview by",
            target: "Bethany Blake",
            date: "Sep 30",
            datetime: "2020-09-30",
        },
        {
            id: 5,
            type: eventTypes.completed,
            content: "Completed interview with",
            target: "Katherine Snyder",
            date: "Oct 4",
            datetime: "2020-10-04",
        },
    ];

    const comments = [
        {
            id: 1,
            name: "Leslie Alexander",
            date: "4d ago",
            imageId: "1494790108377-be9c29b29330",
            body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
        },
        {
            id: 2,
            name: "Michael Foster",
            date: "4d ago",
            imageId: "1519244703995-f4e0f30006d5",
            body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
        },
        {
            id: 3,
            name: "Dries Vincent",
            date: "4d ago",
            imageId: "1506794778202-cad84cf45f1d",
            body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
        },
    ];

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

    let contact: any = ref({});

    const contactId = useRoute().params.id;

    onMounted(async () => {
        const { data, error } = await supabase
            .from("contacts")
            .select(
                `*,
                contact_company (
                    *,
                    company (
                        *,
                        industry (*)
                    )
                )
                `
            )
            .eq("id", contactId)
            .limit(1)
            .single();
        console.log(data);

        contact.value = data;
    });
</script>
