let selects = document.querySelectorAll('.form-select');
let filters = document.querySelectorAll('.offers__select');
let filterYear = document.querySelector('.offers__year');
let filterMake = document.querySelector('.offers__make');
let filterModel = document.querySelector('.offers__model');
let filterTrim = document.querySelector('.offers__trim');
let filterMileage = document.querySelector('.offers__mileage');
let filtersBtn = document.querySelector('.offers__btn');
let checkbox = document.querySelector('.offers__checkbox');
let filterOffers = document.querySelector('.offers__sort');
let arrowUp = document.querySelector('.arrowUp');
let arrowDown = document.querySelector('.arrowDown');
let sortOptions = document.querySelectorAll('.offers__sort-opt');

// sortOptions.forEach(el => setOptBg(el));

// function setOptBg(el) {
//   el.addEventListener('click', function() {
//     console.log(this);
//     this.classList.add('hidden');
//   })
// }

let allCars = document.querySelectorAll('.car');
let allCarsYear = document.querySelectorAll('.car__year');
let allCarsMake = document.querySelectorAll('.car .card-title');
let allCarsTrim = document.querySelectorAll('.car__trim');
let allCarsMileage = document.querySelectorAll('.car__mileage');
let allCarsSold = document.querySelectorAll('.car__sold-mark');

let selectedYear = filterYear.value;
let selectedMake = filterMake.value;
let selectedModel = filterModel.value;
let selectedTrim = filterTrim.value;
let selectedMileage = filterMileage.value;
let selectedFilter = filterMileage.value;

let subscrWrap = document.querySelector('.subscribe__input-wrap');
let subscrInput = document.querySelector('.subscribe__input');
let subscrInputMsg = document.querySelector('.subscribe__input-message');
let subscrBtn = document.querySelector('.subscribe__btn');

let accordeonBtns = document.querySelectorAll('.accordion-button');

document.addEventListener('click', deactSelects1);
document.addEventListener('contextmenu', deactSelects2);
document.addEventListener('visibilitychange', deactSelects2);

filtersBtn.innerHTML = `${allCars.length} cars`;

filtersBtn.addEventListener('click', filterCars);

filters.forEach(el => activate(el));

checkbox.addEventListener('click', switcher);

subscrInput.addEventListener('focus', styleInputOnFocus);
subscrInput.addEventListener('blur', (e) => e.target.placeholder = 'Enter your email');
subscrInput.addEventListener('input', validateMailOnInput);

subscrBtn.addEventListener('click', validateMailOnClick);

accordeonBtns.forEach(el => accordOnClick(el));

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

  allCars.forEach(function(el) {
    el.classList.remove('hidden');

    el.classList.contains('unavailable') ?
    el.classList.add('hidden') : 0
  });
  
  if (selectedYear !== '0') {
    allCarsYear.forEach(el =>
      el.innerHTML !== selectedYear ?
      el.closest('.car').classList.add('hidden') : 0);
  }

  if (selectedMake !== '0') {
    allCarsMake.forEach(el =>
      el.innerHTML.split(' ')[0] !== selectedMake ?
      el.closest('.car').classList.add('hidden') : 0);
  }

  if (selectedModel !== '0') {
    allCarsMake.forEach(function(el) {
      let val = el.innerHTML.split(' ').slice(1).join(' ');
      val !== selectedModel ? el.closest('.car').classList.add('hidden') : 0
    }
  )}

  if (selectedTrim !== '0') {
    allCarsTrim.forEach(el =>
      el.innerHTML !== selectedTrim ?
      el.closest('.car').classList.add('hidden') : 0);
  }

  if (selectedMileage !== '0') {
    let mileageRange = selectedMileage.split('-');

    allCarsMileage.forEach(function(el) {
      let formMileage = el.innerHTML.split(',').join('');

      !isInRange(formMileage, mileageRange[0]) || isInRange(formMileage, mileageRange[1]) ?
      el.closest('.car').classList.add('hidden') : 0
    }    
  )}

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
filterMileage.addEventListener('change', function() {
  selectedMileage = this.value;
})
filterOffers.addEventListener('change', function() {
  selectedFilter = this.value;
  let sortType = /ascending/;

  selectedFilter.match(sortType) ?
  [
    arrowUp.classList.add('active'),
    arrowDown.classList.remove('active')
  ] :
  [
    arrowUp.classList.remove('active'),
    arrowDown.classList.add('active')
  ]
})

function isInRange(a, b) {
  return a - b > 0;
}

function switcher() {
  let label = this.nextElementSibling;
  
  label.classList.contains('active') ?
  label.classList.remove('active') :
  label.classList.add('active')

  allCarsSold.forEach(el => el.closest('.car').classList.toggle('unavailable'))
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

function accordOnClick(el) {
  el.addEventListener('click', function() {
    let checkClasses = '';
    this.classList.contains('active') ? checkClasses = 'y' : 'n'

    accordeonBtns.forEach(btn => btn.classList.remove('active'));

    checkClasses === "y" ?
    this.classList.remove('active') :
    this.classList.add('active')
  })
}

//-------------------------------------------     select       -----------------------------
var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("offers__sort-wrap");

for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
document.addEventListener("click", closeAllSelect);