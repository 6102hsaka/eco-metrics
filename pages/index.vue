<template>
    <section class="flex justify-around items-center pt-16">
        <div class="text-green-700">
            <h1 class="text-4xl tracking-wider font-medium">EcoMetrics</h1>
            <p class="text-lg">
                Stay informed about the air you breathe. Monitor air quality,
                track trends
            </p>
            <app-button
                label="AQI Dashboard"
                class="mt-2.5"
                @click="navigateToAQIDashboard()"
            />
            <app-button
                label="Weather Stats"
                outlined
                class="ml-2.5"
                @click="navigateToWeatherDashboard()"
            />
        </div>
        <img
            src="~/assets/svg/earth.svg"
            width="400"
            height="400"
            alt="hero-image"
        />
    </section>
</template>

<script setup lang="ts">
const router = useRouter();

const navigateToAQIDashboard = () => {
    router.push({ path: "/aqi" });
};

const navigateToWeatherDashboard = () => {
    router.push({ path: "/weather" });
};
</script>
