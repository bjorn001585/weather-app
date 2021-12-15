const daysOfTheWeek: Record<number, string> = {
    0: "Воскресенье",
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота"
};

const shortdotw: Record<number, string> = {
    0: "Вс",
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
    6: "Сб"
};

const months: Record<number, string> = {
    0: "Января",
    1: "Февраля",
    2: "Марта",
    3: "Апреля",
    4: "Мая",
    5: "Июня",
    6: "Июля",
    7: "Августа",
    8: "Сентября",
    9: "Октября",
    10: "Ноября",
    11: "Декабря"
};

const shortm: Record<number, string> = {
    0: "Янв",
    1: "Февр",
    2: "Март",
    3: "Апр",
    4: "Мая",
    5: "Июня",
    6: "Июля",
    7: "Авг",
    8: "Сент",
    9: "Окт",
    10: "Нояб",
    11: "Дек"
};

interface Short {
    months?: boolean;
    days?: boolean;
}

interface Result {
    text: string;
    month: string;
    day: string;
    date: number
}

function getCurrentDate(time: Date): Result
function getCurrentDate(time: string): Result
function getCurrentDate(time: number): Result
function getCurrentDate(time: Date, short: Short): Result
function getCurrentDate(time: string, short: Short): Result
function getCurrentDate(time: number, short: Short): Result
function getCurrentDate(time: any, short: any = { months: false, days: true }): Result {
    if(typeof time == "string") time = new Date(time)
    if(typeof time == "number") time = new Date(time)

    let year = time.getFullYear()
    let month = time.getMonth();
    let date = time.getDate();
    let day = time.getDay();

    return {
        text: `${date} ${short.months ? shortm[month] : months[month]}, ${short.days ? shortdotw[day] : daysOfTheWeek[day]} ${year}`,
        month: short.months ? shortm[month] : months[month],
        day: short.days ? shortdotw[day] : daysOfTheWeek[day],
        date
    }
}

export default getCurrentDate