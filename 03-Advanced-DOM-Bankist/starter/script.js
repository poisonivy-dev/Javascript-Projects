'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//----IMPLEMENTING SCROLLING--//

btnScrollTo.addEventListener('click', function (e) {
  //----GET COORDINATES -----//
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect()); //coords of button

  //--CURRENT SCROLL-----//
  // console.log('Current Scroll(X/Y)', window.scrollX, scrollY);
  //DEPRECIATED:
  // console.log('Current Scroll(X/Y)', window.pageXOffset, pageYOffset);

  //---KNOW THE VISIBLE VIEWPORT---//
  // console.log(
  //   'viewport visible',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //--  COORDINATES TO SCROLL TO ---//
  // left: position of section from left
  //top: position of section from top
  //scrollX: how much from x side is scrolled
  //scrollY: scroll px from top

  // position of section from top + already scrolled section -- will lead to end of section
  // window.scrollTo(s1coords.left + scrollX, s1coords.top + scrollY);

  // FOR SMOOTH SCROLLING
  //pass an object as argument with properties

  // window.scrollTo({
  //   left: s1coords.left + scrollX,
  //   top: s1coords.top + scrollY,
  //   behavior: 'smooth',
  // });

  //Modern Function
  section1.scrollIntoView({ behavior: 'smooth' });
});
//----------------EVENT DELEGATION---------------//

//IMPLEMENTING EVENT BUBBLING
//IMPLEMENTING SCROLLING TO RELEVANT SECTION WHEN WE CLICK ON BUTTON

//---PAGE NAVIGATION

//--Used the concept of bubbling
//--parent element
//- this method would also handle elements that would later be added dynamically, later through the code
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //whenever click event is happened on links
  if (e.target.classList.contains('nav__link')) {
    //get the id from href --relative href
    //here target would be the link but the handler of parent would be triggered
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Inefficient approach
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     //get the id from href --relative href
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//-------------------TABBED COMPONENTS ----------//
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//---adding event handler function using event delegation

tabsContainer.addEventListener('click', function (e) {
  //does not work if button has an inside element and you click on it
  //in this case :span
  // if (e.target.classList.contains('operations__tab')) {
  //   console.log('yes');
  // }

  //so using the closest() function
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //hiding previously active tab and tabContent
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );

  //adding the tabbed class
  clicked.classList.add('operations__tab--active');

  //adding the relevant content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //HOW TO SELECT, CREATE AND DELETE ELEMENTS

// //SELECTING THE WHOLE WEB DOCUMENT
// //No Need of Query Selector
// console.log(document.documentElement);

// //document head
// console.log(document.head);

// //document body
// console.log(document.body);

// //QUERY SELECTOR
// let header = document.querySelector('.header');
// //QUERY SELECTOR ALL
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// //get Element By ID
// document.getElementById('section--1');

// //getByTagID
// const allButtons = document.getElementsByTagName('button');
// //returns an HTML collection instead of nodeList
// console.log(allButtons);

// /*
// HTML COLLECTION IS DIFFERENT FROM NODE LIST
//   HTML Collection has live changes. If DOM is changed this collection is immediately updated.

//   NodeList does not update itself automatically if dom is changed, because the values inside it were created when the dom element still existed.
// */

// //GET ELEMENT BY CLASS NAME
// //Also returns an HTML collection
// console.log(document.getElementsByClassName('btn'));

// //-------------------CREATING AND INSERTING ELEMENT----------------//

// //.insertAdjacentHTML
// //takes the html to add and the position
// //document.createElement
// //Creates a DOM element but not in the dom yet
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// //------MOVING ELEMENTS ---//
// // prepend() --add as the first child of element
// // header.prepend(message);

// //append() -- add as last child
// header.append(message); //this statement will move the previously added div to last because the DOM ELEMENT is unique
// //header.append(message.cloneNode(true));

// //THUS WE CAN USE APPEND AND PREPEND NOT TO ONLY CREATE BUT ALSO MOVE ELEMENT IF IT ALREADY EXISTS IN DOM

// // before() and after()
// // header.before(message);
// // header.after(message);

// //--DELETING THE ELEMENT --//
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove(); //recent method
//     //old technique:
//     // message.parentElement.removeChild(message);
//   });

// //--------------------STYLED, ATTRIBUTES AND CLASSES--------------------------------//

// //STYLES
// //ELEMENT.STYLE.ATTRIBUTE(CAMEL CASE)
// // WE GET INLINE STYLES THROUGH DOM MANIPULATION

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// //message.style will give us only the styles present in the inline style of element

// //how to get styles from stylesheet
// console.log(getComputedStyle(message).color);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(message.style.height);

// //CSS Custom properties : CSS Variables
// //using setProperty() function
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //ATTRIBUTES

// const logo = document.querySelector('.nav__logo');

// // we can access default properties if we specify them on HTML
// console.log(logo.alt);

// //class name
// console.log(logo.className);
// logo.alt = 'beautiful minimalist logo';

// //setAttribute() and getAttribute();
// //absolute value--same true for href
// console.log(logo.src);
// //relative value
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //--DATA ATTRIBUTES--SPECIAL TYPE OF ATTR//
// //attribute has to start with data
// //we have to convert it to camelCase
// console.log(logo.dataset.versionNumber);

// //----CLASSES---//
// // logo.classList.add();
// // logo.classList.remove();
// // logo.classList.toggle();
// // logo.classList.contains(); //not includes

// //don't use
// // logo.classList = 'jonas'; //will override all classes

// //--------EVENT AND EVENT HANDLER ------//
// //Event: A signal generated by a DOM node
// //Event will always happen even if we're listening for it or not
// //Event Handler: a function that tells how to deal with an event

// //ADD EVENT LISTENER ALLOWS US TO USE MULTIPLE FUNCTIONS ON SAME EVENT
// //example: mouse moving onto the element
// // const h1 = document.querySelector('h1');
// // const alertH1 = function () {
// //   alert('you are reading heading');
// // };
// // h1.addEventListener('mouseenter', alertH1);

// // ---ATTACHING EVENT LISTENER : WAY2 ---//
// //OLD METHOD : IT DOES NOT ALLOW US TO ATTACH MULTIPLE FUNCTIONS. IT WILL OVERRIDE THE PREVIOUS ONE
// //onEvent property
// // h1.onmouseenter = function (e) {};
// // h1.onclick = function () {};

// //--WAY 3 : ADDING ONCLICK ON HTML//
// //EXAMPLE:  <h1 onclick="alert('')"></h1>

// //-- HOW TO REMOVE EVENT HANDLER ONCE IT IS USED --//
// // const alertH1 = function () {
// //   alert('you are reading heading');
// //   h1.removeEventListener('mouseenter', alertH1);
// // };
// // h1.addEventListener('mouseenter', alertH1);

// //-----------EVENT PROPAGATION: CAPTURING AND BUBBLING ----------------//

// //EVENTS HAVE CAPTURING AND BUBBLING PHASE
// //WHEN EVENT OCCURS
// //AN EVENT ELEMENT IS GENERATED

// /*
// 1. CAPTURING PHASE
//    EVENT ELEMENT MOVES TO TARGET ALL THE WAY FROM ITS PARENT

// 2. TARGET PHASE
//      EVENT IS HANDLED HERE

// 3. BUBBLING PHASE
//    EVENT BUBBLE UP TO THE ROOT ELEMENT PASSING FROM ITS PARENT ELEMENTS --NOT SIBLING ELEMENTS

// SINCE EVENT PASSES THROUGH ALL ITS PARENT ELEMENTS, IT MEANS THAT EVENT HAPPENED IN THEM AS WELL
// SO IF WE ATTACH A LISTENER TO THEM AS WELL, THE EVENT LISTENER WILL TRIGGER THE CALLBACK FUNCTION AGAIN
// ALLOWS US TO IMPLEMENT POWERFUL PATTERNS

// NOTE** : NOT ALL ELEMENTS HAVE CAPTURING AND BUBBLING PHASE, SOME ARE HANDLED RIGHT AT TARGET BUT MOST ARE HANDLED THE ABOVE WAY.

// BY DEFAULT,
//     EVENTS CAN ONLY BE HANDLED IN
//         TARGET
//         BUBBLING PHASE

// WE CAN SETUP TO LISTEN TO THEM IN CAPTURING PHASE AS WELL

// */

// //Example : how event is triggered in parent as well
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// //Example of bubbling happening-- when you click link, same will be the target in each handler
// // will print link->container->nav --(e.target would be Features button)
// //e.target() where event happened
// //e.currentTarget() === this, element to which handler is attached to
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   //this points to element on which it is attached
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target);
// });

// //-------STOP PROPAGATION ------------------//
// //WE CAN ALSO STOP THE PROPAGATION
// //not a good idea to stop in general
// // e.stopPropagation();

// //----HANDLE EVENT IN CAPTURING PHASE ----//
// // PASS THIRD PARAMETER TO TRUE IN ADD EVENT LISTENER
// //THIRD ARG : TRUE/FALSE

// //----------------  DOM TRAVERSAL -------------//

// const header1 = document.querySelector('h1');

// // Going downwards:child
// //it will go deep down as necessary
// console.log(header1.querySelectorAll('.highlight'));

// //direct child nodes
// console.log(header1.childNodes);

// //children gives html collection
// console.log(header1.children);

// //first and last element child
// header1.firstElementChild.style.color = 'white';
// header1.lastElementChild.style.color = 'orangered';

// //Going upwards:parents
// console.log(header1.parentNode);
// //we are more interested in:
// console.log(header1.parentElement);

// //---closest() Function----//

// header1.closest('.header').style.background = 'var(--gradient-secondary)';

// //--Siblings :going sideways

// //we can only access direct siblings : previous and the next one
// console.log(header1.previousElementSibling);
// console.log(header1.nextElementSibling);

// //reading all siblings
// console.log(header1.parentElement.children);

// [...header1.parentElement.children].forEach(function (el) {
//   if (el !== header1) el.style.transform = 'scale(0.5)';
// });
