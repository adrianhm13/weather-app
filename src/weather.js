import { Display } from "./display";

/* eslint-disable no-use-before-define */
async function getWeather(town) {
  try {
    const units = 'metric';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${town}&appid=99e063d251e089131341c84ce050eeb4&units=${units}`,
      { mode: 'cors' }
    );
    const data = await response.json();
    filterData(data);
  } catch (err) {
    console.log(err);
  }
}
function filterData(data) {
  console.log(data);

  // Filter General Data

  const todayData = filterToday(data); // Filter data to get only today (Array with objects, different times of day)
  const titleTown = data.city.name;
  const temp = todayData[0].main.temp.toLocaleString().split('.', 1);
  console.log(temp);
  const sunriseSunset = getSunriseSunset(data); // Transpile Unix to human readable info (Sunrise/Sunset)
  const {population} = data.city;  
   // Render general info about the town
  Display.renderGeneralInfo(titleTown, sunriseSunset, population, temp);
  // Filter data through each block of time
  firstBlockTimeDay(todayData, sunriseSunset, population);
  filterBlockTimeDay(todayData);
}
function firstBlockTimeDay(todayData){
  const timeHour = getTimeDay(todayData[0]);
  const tempFeelsLike = todayData[0].main.feels_like.toLocaleString().split('.', 1);
  const temp = todayData[0].main.temp.toLocaleString().split('.', 1);
  const {description} = todayData[0].weather[0];
  const {icon} = todayData[0].weather[0];
  console.log(`The time it's: ${timeHour}`);
  console.log(`Temps feel like ${tempFeelsLike}`);
  console.log(`Temp it's: ${temp}`);
  console.log(`Description it's: ${description}`);
  console.log(`The icon it's: ${icon}`);
  const arg = [timeHour,temp , tempFeelsLike, description, icon];
  Display.renderFirstBlockTime(...arg);
}
function filterBlockTimeDay(todayData){
  for (let index = 0; index < todayData.length; index += 1) {
    console.log(todayData);
    const timeHour = getTimeDay(todayData[index]);
    const tempFeelsLike = todayData[index].main.feels_like.toLocaleString().split('.', 1);
    const temp = todayData[index].main.temp.toLocaleString().split('.', 1);
    const {description} = todayData[index].weather[0];
    const {icon} = todayData[index].weather[0];
    // console.log(`The time it's: ${timeHour}`);
    // console.log(`Temps feel like ${tempFeelsLike}`);
    // console.log(`Temp it's: ${temp}`);
    // console.log(`Description it's: ${description}`);
    // console.log(`The icon it's: ${icon}`);

    // Render information


    
  }
}
function filterToday(data) {
  const today = getDate();
  const todayData = data.list.filter((day) => day.dt_txt.includes(today));
  return todayData;
}

function getDate() {
  const todayDate = new Date().toISOString().split('T')[0];

  return todayDate;
}

function getSunriseSunset(data) {
  const infoCity = data.city;
  let { sunrise, sunset } = infoCity;
  sunrise = unixToNormal(sunrise);
  sunset = unixToNormal(sunset);
  return [sunrise, sunset];
}

function getTimeDay(todayData) {
  let hour = todayData.dt;
  hour = unixToNormal(hour);
  return hour;
}

function unixToNormal(value) {
  const mseconds = value * 1000;
  const timeObject = new Date(mseconds);
  const humanTimeObject = timeObject.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return humanTimeObject;
}
// eslint-disable-next-line import/prefer-default-export
export { getWeather };
