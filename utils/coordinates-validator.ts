/**
 * Validates if the input latitude is a valid numerical value within the range of -90 to 90 degrees.
 * @param {number | string} latitude - Latitude value to be validated (can be number or string).
 * @returns {boolean} - Returns true if the latitude is valid, false otherwise.
 */
export const isValidLatitude = (latitude: number | string): boolean => {
    const parsedLatitude =
        typeof latitude === "string" ? parseFloat(latitude) : latitude;
    return (
        !isNaN(parsedLatitude) && parsedLatitude >= -90 && parsedLatitude <= 90
    );
};

/**
 * Validates if the input longitude is a valid numerical value within the range of -180 to 180 degrees.
 * @param {number | string} longitude - Longitude value to be validated (can be number or string).
 * @returns {boolean} - Returns true if the longitude is valid, false otherwise.
 */
export const isValidLongitude = (longitude: number | string): boolean => {
    const parsedLongitude =
        typeof longitude === "string" ? parseFloat(longitude) : longitude;
    return (
        !isNaN(parsedLongitude) &&
        parsedLongitude >= -180 &&
        parsedLongitude <= 180
    );
};

/**
 * Validates if the input latitude and longitude values are valid coordinates.
 * @param {number | string} latitude - Latitude value to be validated.
 * @param {number | string} longitude - Longitude value to be validated.
 * @returns {boolean} - Returns true if both latitude and longitude are valid, false otherwise.
 */
export const isValidCoordinates = (
    latitude: number | string,
    longitude: number | string
): boolean => {
    return isValidLatitude(latitude) && isValidLongitude(longitude);
};
