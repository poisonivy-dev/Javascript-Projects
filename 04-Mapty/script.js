"use strict";

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
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    }, ${this.date.getDate()}`;
  }
}
class Running extends Workout {
  type = "running";
  constructor(coords, dist, duration, cadence) {
    super(coords, dist, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
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
    this.calcSpeed();
    this._setDescription();
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
  #mapZoomLevel = 13;
  constructor() {
    this._getPosition();
    //get data from local Storage

    this._getLocalStorage();
    //event listeners
    form.addEventListener("submit", this._newWorkout.bind(this));
    //changing fields if input type is changes
    inputType.addEventListener("change", this._toggleElevation);
    //moving to particular workout location
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
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
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

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

    //Adding markers of workouts in local storage
    this.#workouts.forEach((workout) => {
      this._renderWorkoutMaker(workout);
    });
  }
  _showForm(mapEv) {
    this.#MapEvent = mapEv;

    //open the form
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _hideForm() {
    //hide form and clear the data
    inputDistance.value = "";
    inputDuration.value = "";
    inputElevation.value = "";
    inputCadence.value = "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(function () {
      form.style.display = "grid";
    }, 1000);
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
    this._renderWorkout(workout);

    //hide the form
    this._hideForm();

    //set local storage to all workouts
    this._setLocalStorage();
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
        `${workout.type === "running" ? "🏃‍♂️" : "🚴"} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === "running" ? "🏃‍♂️" : "🚴"
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === "running")
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    else {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevRate}</span>
      <span class="workout__unit">m</span>
    </div>`;
    }

    form.insertAdjacentHTML("afterend", html);
  }
  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (workout) => workout.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
  _setLocalStorage() {
    localStorage.setItem("workout", JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    //data coming from local storage will not inherit the methods that it did before. It is now a regular object.
    //Manually convert the data to corresponding object if you want to use the inherited methods
    const data = JSON.parse(localStorage.getItem("workout"));

    //if undefined
    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach((workout) => {
      this._renderWorkout(workout);
    });
  }

  reset() {
    localStorage.removeItem("workout");
    //reload page programmatically
    location.reload();
  }
}

const app = new App();
