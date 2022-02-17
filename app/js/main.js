let selects = document.querySelectorAll('.form-select');
let filters = document.querySelectorAll('.offers__select');
let filterYear = document.querySelector('.offers__year');
let filterMake = document.querySelector('.offers__make');
let filterModel = document.querySelector('.offers__model');
let filterTrim = document.querySelector('.offers__trim');
let filtersBtn = document.querySelector('.offers__btn');
let checkbox = document.querySelector('.offers__checkbox');

let allCars = document.querySelectorAll('.car');
let allCarsYear = document.querySelectorAll('.car__year');
let allCarsMake = document.querySelectorAll('.car .card-title');
let allCarsTrim = document.querySelectorAll('.car__trim');

let selectedYear = filterYear.value;
let selectedMake = filterMake.value;
let selectedModel = filterModel.value;
let selectedTrim = filterTrim.value;

filtersBtn.innerHTML = `${allCars.length} cars`;

filtersBtn.addEventListener('click', filterCars)

let subscrWrap = document.querySelector('.subscribe__input-wrap');
let subscrInput = document.querySelector('.subscribe__input');
let subscrInputMsg = document.querySelector('.subscribe__input-message');
let subscrBtn = document.querySelector('.subscribe__btn');


document.addEventListener('click', deactSelects1);
document.addEventListener('contextmenu', deactSelects2);
document.addEventListener('visibilitychange', deactSelects2);

filters.forEach(el => activate(el));

checkbox.addEventListener('click', switcher);

subscrInput.addEventListener('focus', styleInputOnFocus);
subscrInput.addEventListener('blur', (e) => e.target.placeholder = 'Enter your email');
subscrInput.addEventListener('input', validateMailOnInput);

subscrBtn.addEventListener('click', validateMailOnClick);

function deactSelects1(e) {
  !e.target.classList.contains('form-select') ?
  selects.forEach(el => el.classList.remove('active')) : 0
}
function deactSelects2() {
  selects.forEach(el => el.classList.remove('active'));
}

function activate(el) {
  el.addEventListener('click', function() {
    let checkClasses = '';
    this.classList.contains('active') ? checkClasses = 'y' : 'n'
    selects.forEach(el => el.classList.remove('active'));

    checkClasses === "y" ?
    this.classList.remove('active') :
    this.classList.add('active')
  })
}

function filterCars() {
  let carNumber = 0;  
  
  allCars.forEach(el => el.classList.remove('hidden'));
  
  if (selectedYear !== '0') {
    allCarsYear.forEach(el => el.innerHTML !== selectedYear ? el.closest('.car').classList.add('hidden') : 0);
  }

  if (selectedMake !== '0') {
    allCarsMake.forEach(el => el.innerHTML.split(' ')[0] !== selectedMake ? el.closest('.car').classList.add('hidden') : 0);
  }

  if (selectedModel !== '0') {
    allCarsMake.forEach(function(el) {
      let val = el.innerHTML.split(' ').slice(1).join(' ');
      console.log(val);
      val !== selectedModel ? el.closest('.car').classList.add('hidden') : 0
    }
  )}

  if (selectedTrim !== '0') {
    allCarsTrim.forEach(el => el.innerHTML !== selectedTrim ? el.closest('.car').classList.add('hidden') : 0);
  }

  allCars.forEach(el => !el.classList.contains('hidden') ? carNumber++ : 0);
  filtersBtn.innerHTML = `${carNumber} cars`;
}

filterYear.addEventListener('change', function() {
  selectedYear = this.value;
})
filterMake.addEventListener('change', function() {
  selectedMake = this.value;
})
filterModel.addEventListener('change', function() {
  selectedModel = this.value;
})

filterTrim.addEventListener('change', function() {
selectedTrim = this.value;
})

function switcher() {
  let label = this.nextElementSibling;
  
  label.classList.contains('active') ?
  label.classList.remove('active') :
  label.classList.add('active')
}

function styleInputOnFocus() {
  this.placeholder = '';
  this.classList.remove('invalid-mail');
  subscrWrap.classList.remove('invalid-mail');
  subscrInputMsg.classList.remove('invalid-mail');
}

function validateMailOnInput() {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  this.value.match(mailformat) ?
  [
    this.classList.add('valid-mail'),
    subscrWrap.classList.add('valid-mail')
  ] :
  [
    this.classList.remove('valid-mail'),
    subscrWrap.classList.remove('valid-mail')
  ]
}

function validateMailOnClick() {
  !subscrInput.classList.contains('valid-mail') ?
  [
    subscrWrap.classList.add('invalid-mail'),
    subscrInput.classList.add('invalid-mail'),
    subscrInputMsg.classList.add('invalid-mail')
  ] :
  [
    subscrInput.value = '',
    subscrInput.classList.remove('valid-mail'),
    subscrWrap.classList.remove('valid-mail')
  ]
}
