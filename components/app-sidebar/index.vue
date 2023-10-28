<template>
    <aside class="w-12 rounded-md bg-green-100">
        <nav class="flex flex-col items-center gap-6 py-2">
            <NuxtLink
                v-for="link in navLinks"
                :key="link.id"
                :to="link.path"
                activeClass="border-4"
            >
                <Icon
                    :name="link.icon"
                    class="text-lg text-slate-700 hover:text-green-800"
                />
            </NuxtLink>
        </nav>
    </aside>
</template>

<script setup lang="ts">
const navLinks = [
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
