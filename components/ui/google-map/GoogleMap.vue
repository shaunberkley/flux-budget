<template>
    <div ref="mapDiv" class="w-full rounded-2xl" :class="height"></div>
</template>

<script>
    import { ref, onMounted, toRefs, defineComponent } from "vue";

    export default defineComponent({
        name: "GoogleMap",
        props: {
            address: {
                type: String,
                required: true,
            },
            height: {
                type: String,
                required: false,
                default: "h-[500px]",
            },
        },
        setup(props) {
            const { address } = toRefs(props);
            const mapDiv = ref(null);
            let map;

            onMounted(() => {
                // Move this logic inside the onMounted hook
                if (window.google && window.google.maps) {
                    initMap();
                } else {
                    // Load the Maps API and then initialize the map
                    const script = document.createElement("script");
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${
                        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                    }`;
                    script.onload = initMap;
                    document.head.appendChild(script);
                }
            });

            const initMap = () => {
                map = new google.maps.Map(mapDiv.value, {
                    zoom: 8,
                    center: { lat: -34.397, lng: 150.644 }, // Default center
                });

                const geocoder = new google.maps.Geocoder();
                geocodeAddress(geocoder, map);
            };

            const geocodeAddress = (geocoder, resultsMap) => {
                geocoder.geocode(
                    { address: address.value },
                    (results, status) => {
                        if (status === "OK") {
                            resultsMap.setCenter(results[0].geometry.location);
                            new google.maps.Marker({
                                map: resultsMap,
                                position: results[0].geometry.location,
                            });
                        } else {
                            alert(
                                "Geocode was not successful for the following reason: " +
                                    status
                            );
                        }
                    }
                );
            };

            return { mapDiv };
        },
    });
</script>
