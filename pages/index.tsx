import styles from '../styles/Home.module.scss'
import axios from "axios"
import Location from '../interfaces/Weather'
import convertTo from '../util/convertTo'
import getWeatherIcon from '../util/getWeatherIcon'
import { WiStrongWind, WiBarometer, WiRaindrop } from "react-icons/wi"
import copitalize from '../util/copitalize'
import getCurrentDate from '../util/getCurrentDate'
import Head from 'next/head'
import { createRef, useEffect, useState } from 'react'

interface Data { location: Location }

export default function MainApp({ location }: Data) {
    let [ weatherState, setWeatherState ] = useState(location.data[0])
    let Icon = getWeatherIcon(weatherState.weather.code)

    const faviconHref = (value: number) => {
        return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 75 75 %22 fill=%22white%22><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2258%22 stroke=%22black%22 fill=%22white%22>${value}</text></svg>`;
    };

    return <div className={styles["wrapper"]}>
        <Head>
            <link rel="shortcut icon" type="image/svg+xml" href={faviconHref(Math.round(weatherState.temp))} />
            <title>Погода: {copitalize(weatherState.weather.description)}</title>
        </Head>

        <div className={styles["weather-block"]}>
            <div className={styles["weather-today-info"]}>
                <div className={styles["group"]} style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px"
                }}>
                    <div className={styles["group"]}>
                        <div className={styles["geolocation"]}>{location.city_name}, {location.country_code}</div>
                        <div className={styles["color-smoth"]}>{getCurrentDate(weatherState.valid_date).text}</div>
                    </div>

                    <div className={styles["temp"]}>{convertTo(weatherState.temp!)}</div>
                </div>
                <div className={styles["icon"]}><Icon size={150} color="#fff"/></div>
                <div className={styles["group"]}>
                    <div className={styles["title"]}>{copitalize(weatherState.weather.description)}</div>
                    <div className={styles["color-smoth"]}>Вероятность осадков: {weatherState.pop}%</div>
                    <div className={styles["color-smoth"]}>Макс. температура: {convertTo(weatherState.max_temp)}</div>
                    <div className={styles["color-smoth"]}>Мин. температура: {convertTo(weatherState.min_temp)}</div>
                    <div className={styles["color-smoth"]}>Напровление ветра: {weatherState.wind_cdir}</div>
                    <div className={styles["weather-info"]}>
                        <div className={styles["icon"]}>{weatherState.wind_spd} м/с <WiStrongWind size={23}/></div>
                        <div className={styles["icon"]}>{weatherState.rh}% <WiRaindrop size={23}/></div>
                        <div className={styles["icon"]}>{Math.round(weatherState.pres * 0.75006)} мм/рт.с. <WiBarometer size={23}/></div>
                    </div>
                </div>
            </div>
            <div className={styles["other-info"]}>
                <div className={styles["up-info"]}>
                    <span>Можте тут когда то что то появится</span>
                </div>
                <div className={styles["next-days"]}>
                    { location.data.slice(0, 6).map((e, i) => {
                        let Icon = getWeatherIcon(e.weather.code)
                        let parseTime = Date.parse(e.valid_date)
                        let { day, date } = getCurrentDate(parseTime, { days: true })
                        let currentData = new Date().getDate()

                        return <div
                            className={styles["item"]}
                            key={i}
                            onClick={setWeatherState.bind(null, e)}
                        >
                            <div className={styles["date"]}>{date == currentData ? "Сейчас" : `${date} ${day}`}</div>
                            <div className={styles["temp"]}>{convertTo(e.temp)}</div>
                            <Icon size={40} color="#fff"/>
                        </div>
                    }) }
                </div>
            </div>
        </div>
    </div>
}

export async function getServerSideProps() {
    let { data: geoData } = await axios.get(`${process.env.GET_LOCATION}/json`)
    let { data: location } = await axios.get<Location>(`${process.env.WEATHER_DOMAIN}/v2.0/forecast/daily?lang=ru&lat=${geoData.lat}&lon=${geoData.lon}&key=${process.env.WEATHER_KEY}`)

    return {
        props: { location }
    }
}
