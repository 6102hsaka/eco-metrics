import type RequestValidation from "~/model/request-validation";

// Enum representing HTTP status codes for common response types
export enum HttpStatusCode {
    OK = 200, // Success: Standard response for successful HTTP requests
    Created = 201, // Success: Request has been fulfilled, resulting in the creation of a new resource
    NoContent = 204, // Success: Request processed successfully, but no response body needed
    BadRequest = 400, // Client Error: The server cannot or will not process the request due to client error
    Unauthorized = 401, // Client Error: Similar to 403 Forbidden, but specifically for authentication purposes
    Forbidden = 403, // Client Error: The client does not have access rights to the content, i.e., it is forbidden
    NotFound = 404, // Client Error: The requested resource could not be found on the server
    InternalServerError = 500, // Server Error: A generic error message returned when an unexpected condition was encountered
    ServiceUnavailable = 503, // Server Error: The server is not ready to handle the request, typically due to maintenance or overloading
}

/**
 * Throws an error response with a specific status code and message.
 * @param {number} statusCode - HTTP status code for the error response.
 * @param {string} statusMessage - Error message to be included in the response.
 * @throws {Error} - Throws an error object with the specified status code and message.
 */
export const sendErrorResponse = (
    statusCode: number,
    statusMessage: string
) => {
    throw createError({
        statusCode,
        statusMessage,
    });
};

/**
 * Validates the presence of required parameters in a request object.
 * @param {RequestValidation[]} parameters - Array of parameters with validation rules.
 * @throws {Error} - Throws a Bad Request error if any required parameter is missing.
 */
export const checkRequiredParameters = (parameters: RequestValidation[]) => {
    for (const parameter of parameters) {
        if (!parameter.value) {
            sendErrorResponse(
                HttpStatusCode.BadRequest,
                `The parameter '${parameter.key}' is missing in request`
            );
        }
    }
};

/**
 * Validates the values of parameters based on validation rules.
 * @param {RequestValidation[]} parameters - Array of parameters with validation rules.
 * @throws {Error} - Throws a Bad Request error if any parameter value is invalid.
 */
export const validateParametersValue = (parameters: RequestValidation[]) => {
    for (const parameter of parameters) {
        if (!parameter.validator.call(null, parameter.value)) {
            sendErrorResponse(
                HttpStatusCode.BadRequest,
                `Invalid value: ${parameter.value} for '${parameter.key}'`
            );
        }
    }
};
