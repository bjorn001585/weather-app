const env = require("dotenv")
env.config()

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GET_LOCATION: process.env.GET_LOCATION,
    WEATHER_KEY: process.env.WEATHER_KEY,
    WEATHER_DOMAIN: process.env.WEATHER_DOMAIN,
  }
}
