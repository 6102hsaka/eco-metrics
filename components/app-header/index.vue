<template>
    <header class="flex justify-between text-green-500">
        <div>
            <p class="font-xl font-semibold">{{ currentDatetime.time }}</p>
            <p class="text-sm font-medium">{{ currentDatetime.date }}</p>
        </div>
        <div class="relative">
            <span class="text-2xl font-semibold">
                {{ cityDropdown.selected.name }}
            </span>
            <Icon
                name="fe:drop-down"
                class="ml-2 text-sm"
                @click="toogleDropdown"
            />
            <div
                v-if="cityDropdown.isOpen"
                class="absolute right-2 top-4 w-40 bg-green-200 rounded shadow-lg"
            >
                <div
                    v-for="city in cities"
                    :key="city.id"
                    class="py-2 px-4 cursor-pointer hover:bg-green-100 flex items-center text-sm text-green-800"
                    @click="selectCity(city)"
                >
                    {{ city.name }}
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { reactive, onUnmounted } from "vue";

import type City from "~/model/city";
import { getCurrentDate, getCurrentTime } from "~/utils/datetime";

const cities: City[] = [
    { id: "1", name: "Kolkata", lat: "22.5726", lon: "88.3639" },
    { id: "2", name: "Delhi", lat: "28.7041", lon: "77.1025" },
    { id: "3", name: "Hyderabad", lat: "17.3850", lon: "78.4867" },
    { id: "4", name: "Bangalore", lat: "12.9716", lon: "77.5946" },
];
const cityDropdown = reactive({
    isOpen: false,
    selected: cities[0],
});

const toogleDropdown = () => {
    cityDropdown.isOpen = !cityDropdown.isOpen;
};

const selectCity = (city: City) => {
    cityDropdown.selected = city;
    cityDropdown.isOpen = false;
};

const currentDatetime = reactive({
    date: getCurrentDate(),
    time: getCurrentTime(),
});

const updateTime = () => {
    currentDatetime.date = getCurrentDate();
    currentDatetime.time = getCurrentTime();
};

const interval = setInterval(updateTime, 1000);

onUnmounted(() => {
    clearInterval(interval);
});
</script>
