'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
          <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.altSpellings[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${data.languages.nep}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0]}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbour = name => {
//   // const request = new XMLHttpRequest();
//   // request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
//   // request.send();
//   // request.addEventListener('load', function () {
//   //   const [data] = JSON.parse(this.responseText);
//   //   console.log(data);
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // Render Country 1
//     renderCountry(data);
//     // Get neighbour Country
//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request.send();
//     request.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       renderCountry(data, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('usa');
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed,');
//     setTimeout(() => {
//       console.log('3 second passed,');
//       setTimeout(() => {
//         console.log('4 second passed,');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg}(${response.status})`);
//     }
//     return response.json();
//   });
// };
// const getCountryData = function (country) {
// const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//   .then(res => res.json())
//   .then(data => {
//     renderCountry(data[0]);
//     const neighbour = data[0].borders[0];
//     if (!neighbour) return;
//     // Country two
//     return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//   })
//   .then(response => response.json())
//   .then(data => {
//     renderCountry(data[0], 'neighbour');
//   });

//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => renderError(`Something went wrong 💥💥💥 ${err}, Try again`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });
// getJSON(`https://restcountries.com/v3.1/name/${country}`, 'country not found')
//   .then(data => {
//     renderCountry(data[0]);
//     const neighbour = data[0].borders[0];
//     if (!neighbour) throw new Error('No neighbour found');
//     return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//   })
//   .then(data => renderCountry(data[0], 'neighbour'))
//   .catch(err => renderError(`Something went wrong 💥💥💥 ${err}, Try again`))
//   .finally(() => {
//     countriesContainer.style.opacity = 1;
//   });
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) throw new Error('No neighbour found');
//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => renderError(`Something went wrong 💥💥💥 ${err},Try again`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });
// console.log('Test Start');
// setTimeout(() => {
//   console.log('0 sec timer');
// }, 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolve promise 2').then(res => {
//   for (let i = 0; i < 10000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('Your WIN 💥💥');
//     } else {
//       reject(new Error('You lost 💩💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lucky draw ticket is running');
//   setTimeout(() => {
//     if (Math.random >= 0.5) {
//       resolve('You win 🥳🥳');
//     } else {
//       reject('You lose 💩💩');
//     }
//   }, 3000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// // Promisifying set timeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 1 second');
//   });
const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
whereAmI('portugal');
console.log('First');
