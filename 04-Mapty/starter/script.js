"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, dist, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = dist; //km
    this.duration = duration; //min
  }
}
class Running extends Workout {
  type = "running";
  constructor(coords, dist, duration, cadence) {
    super(coords, dist, duration);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, dist, duration, elevRate) {
    super(coords, dist, duration);
    this.elevRate = elevRate;
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);
//APPLICATION ARCHITECTURE
class App {
  #map;
  #MapEvent;
  #workouts = [];
  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    //changing fields if input type is changes
    inputType.addEventListener("change", this._toggleElevation);
  }
  _getPosition() {
    // GEOLOCATION API
    //getCurrentPosition accepts two callbacks
    //A success callback -- has an argument position, which we can use
    //An err callback-- when location is not received
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("cannot get your location");
        }
      );
  }
  _loadMap(pos) {
    const { longitude, latitude } = pos.coords;
    const coords = [latitude, longitude];
    //set the map , L is the namespace of leaflet , 2nd arg is the zoom factor
    this.#map = L.map("map").setView(coords, 13);

    //tiles that the map is made out of
    //Leaflet uses openstreetmap , we can change it here.
    //Themes can be changes
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //ADDING AND EVENT LISTENER TO ADD MARKER WHERE USER CLICKS ON MAP
    // Leaflet onclick function
    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapEv) {
    this.#MapEvent = mapEv;

    //open the form
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _toggleElevation() {
    //Toggle hidden class between both fields if select is changed
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }
  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    e.preventDefault();
    //get the position
    const { lat, lng } = this.#MapEvent.latlng;
    //get the data from form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = +inputDuration.value;
    let workout;
    //check if data is valid

    //if workout is running , create running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      //if data is valid
      console.log(allPositive(distance, duration, cadence));
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Inputs should be positive number");

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    //if workout is cycling then create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert("Inputs should be positive number");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    //add new object to workout array
    this.#workouts.push(workout);

    //render workout marker
    this._renderWorkoutMaker(workout);
    //render workout on list

    //hide form and clear the data
    inputDistance.value = "";
    inputDuration.value = "";
    inputElevation.value = "";
    inputCadence.value = "";
  }

  _renderWorkoutMaker(workout) {
    //render workout on map

    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `🏃‍♂️ Workout on ${new Date(
          workout.date
        ).getMonth()}, ${new Date().getDate()}`
      )
      .openPopup();
  }
}

const app = new App();
