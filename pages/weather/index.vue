<template>
    <section
        class="p-4 rounded-lg bg-gradient-to-br from-cyan-200 to-sky-100 text-blue-800"
    >
        <div class="w-72">
            <span>
                <Icon
                    name="material-symbols:location-on-outline"
                    class="text-xl mr-1"
                />
                <span>{{ selectedCity.name }}</span>
            </span>
            <div class="flex flex-col items-center">
                <p class="text-6xl mt-4">
                    {{ weatherData.main.temp || 0 }}
                    <Icon
                        name="streamline:interface-weather-celsius-degrees-temperature-centigrade-celsius-degree-weather"
                        class="text-sm -mt-10 -ml-2"
                    />
                </p>
                <p class="mt-2 mb-6">{{ weatherData.weather[0]?.main }}</p>
            </div>
            <div class="flex justify-between mb-1">
                <span>
                    <Icon name="material-symbols:airwave" class="mr-1" />
                    <span>{{ weatherData.main.pressure || 0 }} hPa</span>
                </span>
                <span>
                    <Icon name="lets-icons:humidity" class="mr-1" />
                    <span>{{ weatherData.main.humidity || 0 }} %</span>
                </span>
                <span>
                    <Icon name="ph:wind" class="text-lg mr-1" />
                    <span>{{ weatherData.wind.speed || 0 }} m/sec</span>
                </span>
            </div>
        </div>
    </section>
</template>

<!-- 54 -->

<script setup lang="ts">
import type City from "~/model/city";
import useSelectedCity from "~/composables/city";

const { selectedCity } = useSelectedCity();

const weatherData = reactive({ weather: [], main: {}, wind: {}, clouds: {} });

const fetchWeatherData = async (city: City) => {
    const { data } = await useFetch("/api/weather", {
        query: { lat: city.lat, lon: city.lon },
    });
    weatherData.weather = data.value.weather;
    weatherData.main = data.value.main;
    weatherData.wind = data.value.wind;
    weatherData.clouds = data.value.clouds;
};

onMounted(() => fetchWeatherData(selectedCity.value));

watch(selectedCity, async (city, _) => {
    fetchWeatherData(city);
});
</script>
