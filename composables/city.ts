import type City from "~/model/city";

export const cities: City[] = [
    { id: "1", name: "Kolkata", lat: "22.5726", lon: "88.3639" },
    { id: "2", name: "Delhi", lat: "28.7041", lon: "77.1025" },
    { id: "3", name: "Hyderabad", lat: "17.3850", lon: "78.4867" },
    { id: "4", name: "Bangalore", lat: "12.9716", lon: "77.5946" },
];

const useSelectedCity = () => {
    const selectedCity = useState<City>("selected-city", () => cities[0]);

    const setSelectedCity = (city: City) => {
        selectedCity.value = city;
    };

    return { selectedCity, setSelectedCity };
};

export default useSelectedCity;
