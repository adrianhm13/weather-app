/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import { getWeather } from "./weather";

class Display {
    
    static getButtons() {
        this.inputTown = document.getElementById('input-town');
        this.submit = document.getElementById('submit-town');
        this.submit.addEventListener('click', () => {this.getInput();});
        console.log(this);
    }

    static getInput() {
        this.town = this.inputTown.value;
        console.log(this.town);
    }
    
}

export { Display };