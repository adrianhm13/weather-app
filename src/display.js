/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import { getWeather } from './weather';

class Display {
  static renderGeneralInfo(titleTown, sunriseSunset, population, temp) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const titleCity = document.getElementById('title-city');
    const titleTemp = document.getElementById('temp-city');
    const currentTimeText = document.getElementById('current-time');
    const sunriseSunsetText = document.getElementById('sunrise-sunset');
    titleCity.textContent = titleTown;
    titleTemp.textContent = `${temp}°`;
    currentTimeText.textContent = new Date().toLocaleTimeString('en-US', options);
    sunriseSunsetText.textContent = `Sunrise: ${sunriseSunset[0]}, Sunset: ${sunriseSunset[1]}`;
}

  static renderFirstBlockTime(...arg) {
    const titleTime = document.getElementById('title-time');
    const titleTemp = document.getElementById('title-temp');
    const titleTempFeels = document.getElementById('title-tempfeels');
    const titleDesc = document.getElementById('title-desc');
    const icon = document.getElementById('icon-desc');
    titleTime.textContent = arg[0];
    titleTemp.textContent = `${arg[1]}°`;
    titleTempFeels.textContent = `${arg[2]}°`;
    titleDesc.textContent = arg[3].charAt(0).toUpperCase() + arg[3].slice(1);
    icon.src = `https://openweathermap.org/img/wn/${arg[4]}@2x.png`;
    console.log('aaa');
  }

  static renderBlockTimeInfo() {}

  static getButtons() {
    this.inputTown = document.getElementById('input-town');
    this.submit = document.getElementById('submit-town');
    this.submit.addEventListener('click', () => {
      this.getInput();
    });
    console.log(this);
  }

  static getInput() {
    this.town = this.inputTown.value;
    console.log(this.town);
    getWeather(this.town);
  }

  static selectText() {
    this.select();
  }
}

export { Display };
