const apiKey = "cb8d831fda4a43aa83b205831222307";
export const apiKeyUrl = `?key=${apiKey}`;
export const baseUrl = `https://api.weatherapi.com/v1/current.json${apiKeyUrl}`;
export const forecastBaseUrl = `https://api.weatherapi.com/v1/forecast.json${apiKeyUrl}`;
export const locationUrl = "&q=ankara&aqi=no";