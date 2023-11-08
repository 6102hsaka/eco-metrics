<template>
    <aside class="w-12 h-42 rounded-md bg-green-100">
        <nav class="flex flex-col gap-6 py-2">
            <NuxtLink
                v-for="link in navLinks"
                :key="link.id"
                :to="link.path"
                class="w-full text-center border-4 border-green-100"
                activeClass="border-x-green-500"
            >
                <Icon
                    :name="link.icon"
                    class="text-lg text-green-900 hover:text-green-500"
                />
            </NuxtLink>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import type AppRoute from "~/model/app-route";

const navLinks: AppRoute[] = [
    {
        id: "1",
        icon: "pajamas:overview",
        path: "/",
        name: "Home",
    },
    {
        id: "2",
        icon: "carbon:dashboard",
        path: "/aqi",
        name: "AQI Dashboard",
    },
    {
        id: "3",
        icon: "carbon:satellite-weather",
        path: "/weather",
        name: "Weather Information",
    },
];
</script>
