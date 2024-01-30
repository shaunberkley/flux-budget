<template>
    <main class="py-10" v-if="note">
        <!-- Page header -->
        <div
            class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
        >
            <div class="flex items-center space-x-5">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                        {{ note.title ?? "Unnamed note" }}
                    </h1>
                    <p
                        v-if="note.created_at"
                        class="text-sm font-medium text-gray-500"
                    >
                        Created: {{ formatDate(note.created_at, "MM/dd/yyyy") }}
                    </p>
                </div>
            </div>
            <!-- <div
                class="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3"
            >
                <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                    Disqualify
                </button>
                <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                    Advance to offer
                </button>
            </div> -->
        </div>

        <div
            class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
        >
            <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                <!-- Content-->
                <section aria-labelledby="notes-title">
                    <div
                        class="bg-white shadow sm:overflow-hidden sm:rounded-lg"
                    >
                        <div class="px-4 py-6 sm:px-6">
                            <ul role="list" class="space-y-8">
                                <div>
                                    <div class="mt-1 text-sm text-gray-700">
                                        <p>{{ note.content }}</p>
                                    </div>
                                </div>
                            </ul>
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
                        Timeline
                    </h2>

                    <!-- Activity Feed -->
                    <div class="mt-6 flow-root">
                        <ul role="list" class="-mb-8">
                            <li
                                v-for="(item, itemIdx) in timeline"
                                :key="item.id"
                            >
                                <div class="relative pb-8">
                                    <span
                                        v-if="itemIdx !== timeline.length - 1"
                                        class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                    <div class="relative flex space-x-3">
                                        <div>
                                            <span
                                                :class="[
                                                    item.type.bgColorClass,
                                                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                                                ]"
                                            >
                                                <component
                                                    :is="item.type.icon"
                                                    class="h-5 w-5 text-white"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </div>
                                        <div
                                            class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                                        >
                                            <div>
                                                <p
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{ item.content }}
                                                    <a
                                                        href="#"
                                                        class="font-medium text-gray-900"
                                                        >{{ item.target }}</a
                                                    >
                                                </p>
                                            </div>
                                            <div
                                                class="whitespace-nowrap text-right text-sm text-gray-500"
                                            >
                                                <time
                                                    :datetime="item.datetime"
                                                    >{{ item.date }}</time
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="justify-stretch mt-6 flex flex-col">
                        <button
                            type="button"
                            class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Advance to offer
                        </button>
                    </div> -->
                </div>
            </section>
        </div>
    </main>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from "vue";
    // import {
    //     CheckIcon,
    //     HandThumbUpIcon,
    //     UserIcon,
    // } from "@heroicons/vue/20/solid";
    import { useRoute } from "vue-router";
    import formatDate from "../../composables/date-format";

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

    interface note {
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

    export default defineComponent({
        setup(props) {
            let note: any = ref({});

            const noteId = useRoute().params.id;

            onMounted(async () => {
                const { data, error } = await supabase
                    .from("notes")
                    .select(
                        `*,           
                            companies (*),
                            profiles (*),
                            contacts (*)
                        `
                    )
                    .eq("id", noteId)
                    .limit(1)
                    .single();
                console.log(data);

                note.value = data;
            });

            return {
                note,
                comments,
                timeline,
                attachments,
                eventTypes,
                user,
                formatDate,
            };
        },
    });
</script>
