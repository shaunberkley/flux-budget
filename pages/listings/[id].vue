<template>
    <main class="text-[#222222]">
        <template v-if="listing">
            <section
                class="max-w-7xl w-full xl:sticky top-16 z-10 mx-auto flex justify-between items-start py-6 px-6 xl:px-0 bg-white"
            >
                <div>
                    <h1 class="text-3xl font-bold text-neutral">
                        {{ listing.name }}
                    </h1>
                    <h2 class="text-lg">
                        {{ listing.address }}
                    </h2>
                </div>
                <div>
                    <button
                        class="text-gray-600 rounded-full p-2 -mt-2 -mr-2"
                        @click="favoriteListing()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            class="h-7 w-7 hover:text-red-600/30 hover:fill-red-600/30"
                            :class="
                                isFavorite ? '!text-red-600 !fill-red-600' : ''
                            "
                            fill="none"
                            stroke="currentcolor"
                            style="stroke-width: 2.5"
                        >
                            <path
                                d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </section>
            <section
                v-if="
                    listing.listing_photos && listing.listing_photos.length > 0
                "
                class="flex gap-2 h-[40vh] lg:h-[40vh] mb-10 max-w-7xl mx-auto xl:rounded-2xl overflow-hidden"
            >
                <div class="h-full lg:w-2/3 w-full">
                    <a
                        href="#item1"
                        @click="carouselOpen = true"
                        class="hover:brightness-75 focus:brightness-75 outline-none active:brightness-75"
                    >
                        <img
                            :src="listing.listing_photos[0].url ?? ''"
                            class="h-full object-cover w-full"
                        />
                    </a>
                </div>
                <div class="hidden lg:flex lg:flex-col gap-2 h-full lg:w-1/3">
                    <div class="w-full lg:h-1/2">
                        <a
                            href="#item2"
                            @click="carouselOpen = true"
                            class="hover:brightness-75 focus:brightness-75 outline-none active:brightness-75"
                        >
                            <img
                                :src="listing.listing_photos[1].url ?? ''"
                                class="h-full object-cover w-full"
                            />
                        </a>
                    </div>
                    <div class="w-full lg:h-1/2">
                        <a
                            href="#item3"
                            @click="carouselOpen = true"
                            class="hover:brightness-75 focus:brightness-75 outline-none active:brightness-75"
                        >
                            <img
                                :src="listing.listing_photos[2].url ?? ''"
                                class="h-full object-cover w-full"
                            />
                        </a>
                    </div>
                </div>
            </section>
            <section
                class="max-w-7xl w-full mx-auto flex flex-col xl:flex-row px-6 xl:px-0 gap-6"
            >
                <div class="xl:w-3/5 divide-y divide-gray-200">
                    <section class="pb-14">
                        <h2 class="font-semibold text-xl mb-3">
                            About this property
                        </h2>
                        <p>
                            {{ listing.description }}
                        </p>
                    </section>
                    <section class="py-14">
                        <h2 class="font-semibold text-xl mb-3">Highlights</h2>
                        <ul
                            class="w-full grid grid-cols-1 sm:grid-cols-3 gap-3"
                        >
                            <li class="p-4 border border-gray-400 rounded-xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    fill="currentcolor"
                                    class="w-8 h-8 mb-2"
                                >
                                    <path
                                        d="M28 2a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H4a2 2 0 0 1-2-1.85V4a2 2 0 0 1 1.85-2H4zM15 13H9v8H4v7h24v-7h-3v4H15zm-3 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM28 4H4v15h3v-6a2 2 0 0 1 1.85-2H15a2 2 0 0 1 2 1.85V23h6v-2a2 2 0 0 1 1.85-2H28zM12 19a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm10-8a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                                    ></path>
                                </svg>
                                <h3 class="font-bold text-lg">Property Type</h3>
                                <p>{{ listing.type }}</p>
                            </li>
                            <li class="p-4 border border-gray-400 rounded-xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    fill="currentcolor"
                                    class="w-8 h-8 mb-2"
                                >
                                    <path
                                        d="M25 1a2 2 0 0 1 2 1.85V29h2v2H3v-2h2V3a2 2 0 0 1 1.85-2H7zm0 2H7v26h18zm-3 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                    ></path>
                                </svg>
                                <h3 class="font-bold text-lg">
                                    Square Footage
                                </h3>
                                <p>{{ listing.square_feet }}</p>
                            </li>
                            <li class="p-4 border border-gray-400 rounded-xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    fill="currentcolor"
                                    class="w-8 h-8 mb-2"
                                >
                                    <path
                                        d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z"
                                    ></path>
                                </svg>
                                <h3 class="font-bold text-lg">Year Built</h3>
                                <p>{{ listing.year_built }}</p>
                            </li>
                        </ul>
                    </section>
                    <section class="pt-14">
                        <h2 class="font-semibold text-xl mb-3">
                            Property Details
                        </h2>
                        <dl class="divide-y divide-gray-100">
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Price
                                </dt>
                                <dd
                                    class="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{ listing.price }}
                                </dd>
                            </div>
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Price per square foot
                                </dt>
                                <dd
                                    class="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{
                                        listing.price && listing.square_feet
                                            ? listing.price /
                                              listing.square_feet
                                            : "N/A"
                                    }}
                                </dd>
                            </div>
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Number of units
                                </dt>
                                <dd
                                    class="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    1
                                </dd>
                            </div>
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Lot size
                                </dt>
                                <dd
                                    class="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    0.45 AC
                                </dd>
                            </div>
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Number of floors
                                </dt>
                                <dd
                                    class="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    2
                                </dd>
                            </div>
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Parking spots
                                </dt>
                                <dd
                                    class="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    5
                                </dd>
                            </div>
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Parking Ratio
                                </dt>
                                <dd
                                    class="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    2/1,000 SF
                                </dd>
                            </div>
                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            >
                                <dt class="font-medium leading-6 text-gray-900">
                                    Attachments
                                </dt>
                                <dd
                                    class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                                >
                                    <ul
                                        role="list"
                                        class="divide-y divide-gray-100 rounded-md border border-gray-200"
                                    >
                                        <li
                                            class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                        >
                                            <div
                                                class="flex w-0 flex-1 items-center"
                                            >
                                                <div
                                                    class="ml-4 flex min-w-0 flex-1 gap-2"
                                                >
                                                    <span
                                                        class="truncate font-medium"
                                                        >property-brochure.pdf</span
                                                    >
                                                    <span
                                                        class="flex-shrink-0 text-gray-400"
                                                        >4.5mb</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="ml-4 flex-shrink-0">
                                                <a
                                                    href="#"
                                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >Download</a
                                                >
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </section>
                </div>
                <div class="xl:w-2/5">
                    <GoogleMap
                        :address="listing.address"
                        class="mb-6 pl-8 block"
                    />
                </div>
            </section>
        </template>

        <template v-else-if="error">
            <div class="error-message">
                {{ error }}
            </div>
        </template>

        <template v-else>
            <LoadingCircle class="mt-[20vh]"></LoadingCircle>
        </template>
    </main>
    <DialogComponent
        title=""
        :isOpen="carouselOpen"
        maxWidth="max-w-full"
        :padding="'p-0 py-6 sm:p-6'"
        @closeModal="carouselOpen = false"
    >
        <section
            v-if="listing?.listing_photos && listing?.listing_photos.length > 0"
        >
            <div class="mt-8 mb-4 carousel w-full max-h-[1000px]">
                <div
                    :id="'item' + (index + 1)"
                    class="carousel-item w-full"
                    v-for="(image, index) in listing?.listing_photos"
                >
                    <img
                        :src="image.url + '' ?? ''"
                        class="h-full object-contain w-full"
                    />
                </div>
            </div>
            <div class="flex justify-center w-full py-2 gap-2">
                <a
                    :href="'#item' + (index + 1)"
                    class="btn btn-xs"
                    v-for="(image, index) in listing?.listing_photos"
                    >{{ index + 1 }}</a
                >
            </div>
        </section>
    </DialogComponent>

    <Dialog v-model:open="carouselOpen">
        <DialogContent>
            <section
                v-if="
                    listing?.listing_photos &&
                    listing?.listing_photos.length > 0
                "
            >
                <div class="mt-8 mb-4 carousel w-full max-h-[1000px]">
                    <div
                        :id="'item' + (index + 1)"
                        class="carousel-item w-full"
                        v-for="(image, index) in listing?.listing_photos"
                    >
                        <img
                            :src="image.url + '' ?? ''"
                            class="h-full object-contain w-full"
                        />
                    </div>
                </div>
                <div class="flex justify-center w-full py-2 gap-2">
                    <a
                        :href="'#item' + (index + 1)"
                        class="btn btn-xs"
                        v-for="(image, index) in listing?.listing_photos"
                        >{{ index + 1 }}</a
                    >
                </div>
            </section>

            <DialogFooter>
                <Button variant="outline" @click="carouselOpen = false">
                    Cancel
                </Button>
                <Button type="submit"> Continue </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- <BannerComponent
        :isOpen="bannerOpen"
        :message="bannerMessage"
        :timer="5000"
        @close="bannerOpen = false"
    >
    </BannerComponent> -->
</template>

<script setup lang="ts">
    import { defineComponent, onMounted, ref } from "vue";
    // import {
    //     HeartIcon,
    //     ArrowsPointingOutIcon,
    //     BuildingOffice2Icon,
    // } from "@heroicons/vue/24/outline";
    // import { HeartIcon as SolidHeart } from "@heroicons/vue/20/solid";
    // import { DialogComponent, BannerComponent } from "vue-blueprint-js";
    import { useRoute } from "vue-router";
    import type { Database } from "../../types/supabase";
    const carouselOpen = ref<boolean>(false);

    const route = useRoute();
    const error = ref<string | null>(null); // to store the error message

    const listingId = route.params.id as string;

    const isFavorite = ref<boolean>(false);

    const bannerOpen = ref<boolean>(false);
    const bannerMessage = ref<any>("");

    const listing = ref<
        | (Database["public"]["Tables"]["listings"]["Row"] & {
              listing_photos?: Database["public"]["Tables"]["listing_photos"]["Row"][];
          })
        | null
    >(null);

    onMounted(async () => {
        await getListing();
    });

    async function favoriteListing() {
        isFavorite.value = !isFavorite.value;
        bannerOpen.value = true;
        bannerMessage.value = `Listing ${
            isFavorite.value ? "favorited!" : "removed from favorites."
        }`;
        try {
            const { data, error: supabaseError } = await supabase
                .from("listing_company")
                .update({ favorite: isFavorite.value })
                .match({
                    listing: listingId,
                    company: "37c5605e-b587-41dd-89eb-3ea0f7af57af",
                });

            if (supabaseError) {
                throw new Error(
                    `Failed to get update listing_company with listing ID of ${listingId} and company ID of ${"37c5605e-b587-41dd-89eb-3ea0f7af57af"}. Error: ${
                        supabaseError.message
                    }`
                );
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                // Handle or log the case where err is not an Error instance
                error.value = "An unknown error occurred.";
            }
            console.error(err);
        }
    }

    async function getListing() {
        try {
            const { data, error: supabaseError } = await supabase
                .from("listings")
                .select(
                    `
                            *,
                            listing_photos(*),
                            listing_company(*)
                        `
                )
                .eq("id", listingId)
                .single();

            if (supabaseError) {
                throw new Error(
                    `Failed to get listing with ID ${listingId}. Error: ${supabaseError.message}`
                );
            }

            if (!data) {
                throw new Error(
                    `No data returned for listing with ID ${listingId}`
                );
            }

            listing.value = data;
            console.log(data);
            isFavorite.value = data.listing_company[0].favorite;
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                // Handle or log the case where err is not an Error instance
                error.value = "An unknown error occurred.";
            }
            console.error(err);
        }
    }
</script>
