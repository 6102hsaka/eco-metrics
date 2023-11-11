<template>
    <section
        class="p-4 text-zinc-50 rounded-lg flex items-center"
        :style="{ backgroundColor: color.light }"
    >
        <div
            class="m-8 p-8 w-32 text-center rounded-lg"
            :style="{ backgroundColor: color.dark }"
        >
            <p class="text-3xl">{{ aqiData.aqi || 0 }}</p>
            <p class="text-sm">AQI</p>
        </div>
        <span class="list-none mx-6">
            <p class="mb-5">co : {{ aqiData.components.co || 0 }}</p>
            <p>no : {{ aqiData.components.no || 0 }}</p>
        </span>
        <span class="list-none mx-6">
            <p class="mb-5">no2 : {{ aqiData.components.no2 || 0 }}</p>
            <p>o3 : {{ aqiData.components.o3 || 0 }}</p>
        </span>
        <span class="list-none mx-6">
            <p class="mb-5">so2 : {{ aqiData.components.so2 || 0 }}</p>
            <p>pm2.5 : {{ aqiData.components.pm2_5 || 0 }}</p>
        </span>
        <span class="list-none mx-6">
            <p class="mb-5">pm10 : {{ aqiData.components.pm10 || 0 }}</p>
            <p>nh3 : {{ aqiData.components.nh3 || 0 }}</p>
        </span>
    </section>
</template>

<script setup lang="ts">
import type City from "~/model/city";
import useSelectedCity from "~/composables/city";

const { selectedCity } = useSelectedCity();

const color = reactive({ light: "#22c55e", dark: "#16a34a" });
const aqiData = reactive({ aqi: 0, components: {} });

const fetchAQI = async (city: City) => {
    const { data } = await useFetch("/api/aqi", {
        query: { lat: city.lat, lon: city.lon },
    });
    aqiData.aqi = data.value.aqi;
    aqiData.components = data.value.components;

    if (data.value.aqi === 1) {
        color.light = "#22c55e";
        color.dark = "#16a34a";
    } else if (data.value.aqi === 2) {
        color.light = "#84cc16";
        color.dark = "#65a30d";
    } else if (data.value.aqi === 3) {
        color.light = "#eab308";
        color.dark = "#ca8a04";
    } else if (data.value.aqi === 4) {
        color.light = "#f97316";
        color.dark = "#ea580c";
    } else {
        color.light = "#ef4444";
        color.dark = "#dc2626";
    }
};

onMounted(() => fetchAQI(selectedCity.value));

watch(selectedCity, async (city, _) => {
    fetchAQI(city);
});
</script>
