<template>
    <header class="flex justify-between text-green-500">
        <div>
            <p class="font-xl font-semibold">{{ currentDatetime.time }}</p>
            <p class="text-sm font-medium">{{ currentDatetime.date }}</p>
        </div>
        <div class="relative">
            <span class="text-2xl font-semibold">
                {{ selectedCity.name }}
            </span>
            <Icon
                name="fe:drop-down"
                class="ml-2 text-sm"
                @click="toogleDropdown"
            />
            <div
                v-if="isCityDropdownOpen"
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
import type City from "~/model/city";
import useSelectedCity, { cities } from "~/composables/city";
import { getCurrentDate, getCurrentTime } from "~/utils/datetime";

const isCityDropdownOpen = ref(false);
const { selectedCity, setSelectedCity } = useSelectedCity();

const toogleDropdown = () => {
    isCityDropdownOpen.value = !isCityDropdownOpen.value;
};

const selectCity = (city: City) => {
    setSelectedCity(city);
    isCityDropdownOpen.value = false;
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
