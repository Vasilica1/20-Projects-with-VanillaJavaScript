const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairsBtn = document.getElementById('show_millionairs');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];

// fetch random user and add money

getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

// update DOM

function updateDOM(providedData = data) {
  // clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML =  `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// double money 

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2}
  }) ;

  updateDOM();
}

// sort by richest

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// format number as money

function formatMoney(number) {
  return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//filter only millionaairs

function showMillionairs() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

//calculate wealth

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(wealth)}</strong>`;
  main.appendChild(wealthEl);
}

//event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairsBtn.addEventListener('click', showMillionairs);
calculateWealthBtn.addEventListener('click', calculateWealth);