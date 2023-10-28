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

const CACHE_DURATION = 12 * 60 * 60 * 1000;

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

    const key = `${lat}-${lon}-aqi`;

    // Check if data is already in cache
    const cachedData = cache.get(key);
    if (cachedData) {
        return cachedData;
    }

    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    const URL = "http://api.openweathermap.org/data/2.5/air_pollution";

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
            aqi: response.data.list[0].main.aqi,
            components: response.data.list[0].components,
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
