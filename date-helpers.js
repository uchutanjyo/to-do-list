
const isWeekend = day => {
    
    return day%7 === 0|| day%7 === 6;
}





const getDayName = day => {
    const date = new Date(2018, 0, day);
    const options = {weekday: "short"};
    return new Intl.DateTimeFormat("en-US", {weekday: "short"}).format(date);
}

export {isWeekend, getDayName}