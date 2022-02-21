// let selects = document.querySelectorAll('.form-select');//--------------------------------------------
let selects = document.querySelectorAll('.offers__filter-wrap');//--------------------------------------------
let filters = document.querySelectorAll('.offers__select');//--------------------------------------------

let filtersBtn = document.querySelector('.offers__btn');
let checkbox = document.querySelector('.offers__checkbox');

let arrowUp = document.querySelector('.arrowUp');
let arrowDown = document.querySelector('.arrowDown');

let allCars = document.querySelectorAll('.car');
let allCarsYear = document.querySelectorAll('.car__year');
let allCarsMake = document.querySelectorAll('.car .card-title');
let allCarsTrim = document.querySelectorAll('.car__trim');
let allCarsMileage = document.querySelectorAll('.car__mileage');
let allCarsSold = document.querySelectorAll('.car__sold-mark');

let subscrWrap = document.querySelector('.subscribe__input-wrap');
let subscrInput = document.querySelector('.subscribe__input');
let subscrInputMsg = document.querySelector('.subscribe__input-message');
let subscrBtn = document.querySelector('.subscribe__btn');

let accordeonBtns = document.querySelectorAll('.accordion-button');

let optStyled;
let parent;
let child;

(styleSortingSelect)('.select-styled-wrap.offers__sort-wrap');
(styleSortingSelect)('.select-styled-wrap.offers__filter-wrap');

// document.addEventListener('click', deactSelects1);
// document.addEventListener('contextmenu', deactSelects2);
// document.addEventListener('visibilitychange', deactSelects2);
document.addEventListener("click", closeAllSelect);

filtersBtn.innerHTML = `${allCars.length} cars`;

filtersBtn.addEventListener('click', filterCars);

// filters.forEach(el => activate(el));//-----------------------------

checkbox.addEventListener('click', switcher);

subscrInput.addEventListener('focus', styleInputOnFocus);
subscrInput.addEventListener('blur', (e) => e.target.placeholder = 'Enter your email');
subscrInput.addEventListener('input', validateMailOnInput);

subscrBtn.addEventListener('click', validateMailOnClick);

accordeonBtns.forEach(el => accordOnClick(el));

// function deactSelects1(e) {
//   // !e.target.classList.contains('form-select') ?
//   !e.target.classList.contains('offers__filter-wrap') ?
//   filterTitles.forEach(el => el.classList.add('red')) : 0//-----------------------------------
// }
// function deactSelects2() {
//   selects.forEach(el => el.classList.remove('active'));//---------------------------------
// }

// function activate(el) {
//   el.addEventListener('click', function() {
//     let checkClasses = '';
//     this.classList.contains('active') ? checkClasses = 'y' : 'n'
//     selects.forEach(el => el.classList.remove('active'));//------------------------

//     checkClasses === "y" ?
//     this.classList.remove('active') :
//     this.classList.add('active')
//   })
// }

function filterCars() {
  let carNumber = 0;  

  allCars.forEach(function(el) {
    el.classList.remove('hidden');
    el.classList.contains('unavailable') ?
    el.classList.add('hidden') : 0
  });

  parent.classList.contains('offers__year-wrap') ?
  allCarsYear.forEach(year =>
    [
      year.innerHTML !== child.innerHTML ?
      year.closest('.car').classList.add('hidden') : 0
    ]
  ) : 0

  parent.classList.contains('offers__make-wrap') ?
  allCarsMake.forEach(make =>
    [
      make.innerHTML.split(' ')[0] !== child.innerHTML ?
      make.closest('.car').classList.add('hidden') : 0
    ]
  ) : 0

  parent.classList.contains('offers__model-wrap') ?
  allCarsMake.forEach(model =>
    [
      model.innerHTML.split(' ').slice(1).join(' ') !== child.innerHTML ?
      model.closest('.car').classList.add('hidden') : 0
    ]
  ) : 0

  parent.classList.contains('offers__trim-wrap') ?
  allCarsTrim.forEach(trim =>
    [
      trim.innerHTML !== child.innerHTML ?
      trim.closest('.car').classList.add('hidden') : 0
    ]
  ) : 0
  // allCarsTrim.forEach(trim =>
  //   [
  //     trim.closest('.car').classList.remove('unavailable'),
  //     trim.innerHTML !== this.innerHTML && this.innerHTML !== 'Trim' ?
  //     trim.closest('.car').classList.add('unavailable') : 0
  //   ]
  // );

  allCars.forEach(el => !el.classList.contains('hidden') ? carNumber++ : 0);
  filtersBtn.innerHTML = `${carNumber} cars`;
}

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

function styleSortingSelect(wrap) {
  let sortingSelectWrap = document.querySelectorAll(wrap);
  let srapClass = wrap;
  let filterHead = /Year|Make|Model|Trim|Mileage/;
  
  sortingSelectWrap.forEach(function(sortingSelectWrapEl) {
    let sortingSelect = sortingSelectWrapEl.querySelectorAll('select')[0];
    let selectStyled = document.createElement("DIV");
    let optSelectedStyled = document.createElement("DIV");  
    
    srapClass.match(/sort/) ?
    optSelectedStyled.classList.add('select-styled-optSelected-sort') :
    optSelectedStyled.classList.add('select-styled-optSelected-filter')

    optSelectedStyled.innerHTML = sortingSelect.options[sortingSelect.selectedIndex].innerHTML;
    sortingSelectWrapEl.append(optSelectedStyled);
    
    srapClass.match(/sort/) ?
    selectStyled.classList.add('select-styled', 'select-styled-sort', 'select-styled-hide') :
    selectStyled.classList.add('select-styled', 'select-styled-filter', 'select-styled-hide')
    // let arr = [];
    // arr.push(Array.from(sortingSelect)[0].innerHTML);
    // console.log(Array.isArray(arr));
    // console.log(Array.from(sortingSelect)[0].innerHTML);
    for (let i = 0; i < sortingSelect.length; i++) {
      optStyled = document.createElement("DIV");
      optStyled.innerHTML = sortingSelect.options[i].innerHTML;
      optStyled.addEventListener("click", function() {
        for (let j = 0; j < sortingSelect.length; j++) {
          if (sortingSelect.options[i].innerHTML === this.innerHTML) {
            sortingSelect.selectedIndex = i;
            optSelectedStyled.innerHTML = this.innerHTML;
            
            Array.from(selectStyled).forEach(el => el.classList.remove())
            this.classList.add('same-as-selected');
            
            break;
          }
        }
        checkSortingType(this.innerHTML);

        if (optSelectedStyled.parentElement.classList.contains('offers__filter-wrap')) {
          optSelectedStyled.innerHTML.match(filterHead) ?
          [
            optSelectedStyled.classList.remove('active') ,
            optSelectedStyled.classList.remove('active-opt') 
          ] :
          optSelectedStyled.classList.add('active-opt')
        }

        parent = this.parentNode.parentNode;
        child = parent.querySelector('.active-opt')
      });
      
      selectStyled.append(optStyled);
    }
    
    sortingSelectWrapEl.append(selectStyled);
    optSelectedStyled.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect();
      this.nextSibling.classList.toggle('select-styled-hide');
    });

    srapClass.match(/filter/) ?
    
    optSelectedStyled.addEventListener('click', function() {
      this.innerHTML.match(filterHead) ?
      [
        this.classList.add('active'),
        selectStyled.classList.add('titteHidden')
      ] :
      selectStyled.classList.remove('titteHidden')

    }) : 0
    
    selectStyled.addEventListener('click', function() {
      optSelectedStyled.classList.remove('active');
    })
  })
}

function closeAllSelect() {
  let allSelectItems = document.querySelectorAll('.select-styled');

  allSelectItems.forEach(el => el.classList.add('select-styled-hide'));
}

function checkSortingType(text) {
  let sortType = /ascending/;
        
  text.match(sortType) ?
  [
    arrowUp.classList.add('active'),
    arrowDown.classList.remove('active')
  ] :
  [
    arrowUp.classList.remove('active'),
    arrowDown.classList.add('active')
  ]
}