import axios, { AxiosError } from "axios";
import cache from "memory-cache";

import type RequestValidation from "~/model/request-validation";
import {
    checkRequiredParameters,
    validateParametersValue,
    sendErrorResponse,
    HttpStatusCode,
} from "~/utils/response";
import {
    isValidLatitude,
    isValidLongitude,
} from "~/utils/coordinates-validator";

const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hr

export default defineEventHandler(async (event) => {
    const { lat, lon } = getQuery(event);

    const validationData: RequestValidation[] = [
        {
            key: "lat",
            value: lat,
            validator: isValidLatitude,
        },
        {
            key: "lon",
            value: lon,
            validator: isValidLongitude,
        },
    ];
    checkRequiredParameters(validationData);
    validateParametersValue(validationData);

    const key = `${lat}-${lon}-weather`;

    // Check if data is already in cache
    const cachedData = cache.get(key);
    if (cachedData) {
        return cachedData;
    }

    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    const URL = "https://api.openweathermap.org/data/2.5/weather";

    try {
        const response = await axios.get(URL, {
            params: {
                lat,
                lon,
                appid: API_KEY,
            },
        });
        if (response.status >= 400) {
            sendErrorResponse(response.status, response.data);
        }
        const data = {
            weather: response.data.weather,
            main: {
                temp: response.data.main.temp - 273,
                feels_like: response.data.main.feels_like - 273,
                temp_min: response.data.main.temp_min - 273,
                temp_max: response.data.main.temp_max - 273,
                pressure: response.data.main.pressure,
                humidity: response.data.main.humidity,
            },
            wind: response.data.wind,
            rain: response.data.rain,
            clouds: response.data.clouds,
        };
        cache.put(key, data, CACHE_DURATION);
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        sendErrorResponse(
            HttpStatusCode.InternalServerError,
            axiosError.message
        );
    }
});
