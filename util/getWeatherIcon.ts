import {
    WiAlien,
    WiDayStormShowers,
    WiDayThunderstorm,
    WiStormShowers,
    WiThunderstorm,
    WiDaySleetStorm,
    WiCloud,
    WiDaySunnyOvercast,
    WiDaySunny,
    WiDayHaze,
    WiDayFog,
    WiDayCloudyHigh,
    WiRainMix,
    WiDaySprinkle,
    WiSnow,
    WiSnowWind,
    WiSleet,
    WiSnowflakeCold,
    WiShowers,
    WiCloudyGusts,
    WiDayRain
} from "react-icons/wi";

import { IconType } from "react-icons/lib"

const icons: Record<number, IconType> = {
    // альтернативные иконки погодных условий
    200: WiDayStormShowers, // Thunderstorm with light rain
    201: WiStormShowers, // Thunderstorm with rain
    202: WiThunderstorm, // Thunderstorm with heavy rain
    230: WiDaySleetStorm, // Thunderstorm with light drizzle
    231: WiDaySleetStorm, // Thunderstorm with drizzle
    232: WiDaySleetStorm, // Thunderstorm with heavy drizzle
    233: WiDaySleetStorm, // Thunderstorm with Hail

    300: WiDaySprinkle, // Light Drizzle
    301: WiDaySprinkle, // Drizzle
    302: WiDaySprinkle, // Heavy Drizzle

    500: WiRainMix, // Light Rain
    501: WiRainMix, // Moderate Rain
    502: WiDayRain, // Heavy Rain
    511: WiRainMix, // Freezing rain
    520: WiDayRain, // Light shower rain
    521: WiRainMix, // Shower rain
    522: WiRainMix, // Heavy shower rain

    600: WiSnow, // Light snow
    601: WiSnow, // Snow
    602: WiSnowWind, // Heavy Snow
    610: WiRainMix, // Mix snow/rain

    611: WiSleet, // Sleet
    612: WiSleet, // Heavy sleet

    621: WiSnowflakeCold, // Snow shower
    622: WiShowers, // Heavy snow shower
    623: WiShowers, // Flurries

    700: WiCloud, // Mist
    711: WiCloud, // Smoke
    721: WiDayHaze, // Haze
    731: WiCloud, // Sand/dust
    741: WiDayFog, // Fog
    751: WiCloud, // Freezing Fog

    800: WiDaySunny, // Clear sky
    801: WiDaySunnyOvercast, // Few clouds
    802: WiDayCloudyHigh, // Scattered clouds
    803: WiCloudyGusts, // Broken clouds
    804: WiDayCloudyHigh, // Overcast clouds

    900: WiAlien, // Unknown Precipitation
};

export default function getWeatherIcon(id: number) {
    return icons[id]
}