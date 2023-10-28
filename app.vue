<template>
    <div class="flex items-stretch p-2 gap-3">
        <app-sidebar />
        <div class="w-full">
            <app-header />
            <main>
                <NuxtPage />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "EcoMetrics",
    meta: [
        {
            name: "viewport",
            content: "width=device-width,initial-scale=1",
        },
        {
            name: "description",
            content: "Dashboard to visualize environment metrics",
        },
        {
            name: "og:type",
            content: "website",
        },
        {
            name: "og:title",
            content: "EcoMetrics",
        },
        {
            name: "og:description",
            content: "Dashboard to visualize environment metrics",
        },
    ],
});
</script>
