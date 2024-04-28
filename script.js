'use strict'

//index page
const darkIndex = document.querySelector('.header__dark--index');
const header = document.querySelector('header');
const headerTitle = document.querySelector('.header__title');
const headerDarkTitle = document.querySelector('.header__dark__title');
const headerDarkIcon = document.querySelector('.header__dark__img');
const search = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const searchIcon = document.querySelector('.search__img');
const filter = document.querySelector('.filter');
const filterInfo = document.querySelector('.filter__info');
const filterIcon = document.querySelector('.filter__img');

const countries = document.querySelector('.countries');
const country = document.getElementsByClassName('country');
const countryFlag = document.getElementsByClassName('country__flag');
const countryTitle = document.getElementsByClassName('country__title');
const countryPopluation = document.querySelector('.country__input--pop');
const countryRegion = document.querySelector('.country__input--region');
const countryCapital = document.querySelector('.country__input--capital');
const countryInfo = document.getElementsByClassName('country__info');
const countryInput = document.getElementsByClassName('country__input');
const attribution = document.querySelector('.attribution');

const africa = document.querySelector('.contents__region--africa');
const america = document.querySelector('.contents__region--america');
const asia = document.querySelector('.contents__region--asia');
const europe = document.querySelector('.contents__region--europe');
const oceania = document.querySelector('.contents__region--oceania');

//County page
const darkCountry = document.querySelector('.header__dark--country');
const back = document.querySelector('.back');
const backContainer = document.querySelector('.back__container');
const backIcon = document.querySelector('.back__img');
const backInfo = document.querySelector('.back__info');
const nation = document.querySelector('.nation');
const card = document.querySelector('.card');
const cardInfo = document.getElementsByClassName('card__info ');
const cardInput = document.getElementsByClassName('card__input ');
const neighbor = document.getElementsByClassName('neighbor');
const neighborCountry = document.querySelectorAll('.neighbor__country');




//Dark Mode for Index:
const darkModeIndex = function () {
    document.body.classList.toggle('darkMode--body');

    header.classList.toggle('darkMode--border');
    searchInput.classList.toggle('darkMode--fontWeight');

    [header, search, searchInput, filter].forEach(el => el.classList.toggle('darkMode--dark'));

    [headerTitle, headerDarkTitle, headerDarkIcon, searchIcon, searchInput, filterInfo, filterIcon, attribution].forEach(el => el.classList.toggle('darkMode--white'));


    //HTMLLiveCollection:
    [...country].forEach(el => el.classList.toggle('darkMode--dark'));
    [...countryTitle].forEach(el => el.classList.toggle('darkMode--white'));
    [...countryInfo].forEach(el => el.classList.toggle('darkMode--white'));
    [...countryInput].forEach(el => el.classList.toggle('darkMode--white'));
}

if (darkIndex)
    darkIndex.addEventListener('click', darkModeIndex);



//Dark Mode for Country Page:
const DarkModeCountry = function () {
    document.body.classList.toggle('darkMode--body');
    header.classList.toggle('darkMode--border');

    [header, backContainer].forEach(el => el.classList.toggle('darkMode--dark'));

    [headerTitle, headerDarkTitle, headerDarkIcon, backIcon, backInfo, attribution].forEach(el => el.classList.toggle('darkMode--white'));

    [...cardInfo].forEach(info => info.classList.toggle('darkMode--white'));
    [...cardInput].forEach(info => info.classList.toggle('darkMode--white'));
    neighborCountry.forEach(country => country.classList.toggle('darkMode--dark'));

    neighborCountry.forEach(function (el) {
        el.classList.toggle('darkMode--dark');
        el.classList.toggle('darkMode--text');
    });
};

if (darkCountry)
    darkCountry.addEventListener('click', DarkModeCountry);


//Display Countries:
let capitalCity, nativeNameCommon;


const displayCountries = function (url) {

    fetch(url).then(response => response.json())
        .then(function (response) {
            response.sort(function (a, b) {
                if (a.name.common < b.name.common)
                    return 1

                if (a.name.common > b.name.common)
                    return -1;
            })
                .forEach(function (obj) {

                    const { capital, flags, name, population, region } = obj;

                    //Destructure the country obj:                
                    const { svg: flagURL } = flags;

                    const { common, official, nativeName } = name;
                    if (nativeName) //some countries dont have nativeName
                        [{ common: nativeNameCommon }] = Object.values(nativeName);

                    if (capital) {      //some countries dont have a capital
                        [capitalCity] = capital;
                    }
                    else {
                        capitalCity = '';
                    };

                    const html = `
                    <div class="country">
                    <img src="${flagURL}" class="country__flag" alt="">
                    <h2 class="country__title">${common}</h2>

                    <p class="country__info">
                        Population:
                        <span class="country__input country__input--pop">${population.toLocaleString()}</span>
                    </p>

                    <p class="country__info">
                        Region:
                        <span class="country__input country__input--region">${region}</span>
                    </p>

                    <p class="country__info">
                        Capital:
                        <span class="country__input country__input--capital">${capitalCity}</span>
                    </p>
                    </div>
                    `;

                    if (countries)
                        countries.insertAdjacentHTML('afterbegin', html);

                    //Go to Country page when clicked:

                    [...country].forEach(el => el.addEventListener('click', function (e) {
                        e.preventDefault();

                        const clickedCountry = e.target.closest('.country').querySelector('.country__title').textContent;

                        localStorage.setItem('clickedCountry', clickedCountry);

                        window.location.href = 'country.html';
                    }))
                }
                )
        });
};

displayCountries('https://restcountries.com/v3.1/all');

/////////////////////////////////////////////////////////////
//filter with regions: 

const regionFilter = function (reg) {
    countries.innerHTML = '';
    const regUrl = `https://restcountries.com/v3.1/region/${reg}`;
    displayCountries(regUrl);
};

if (countries) {
    africa.addEventListener('click', () => regionFilter('africa'));
    america.addEventListener('click', () => regionFilter('america'));
    asia.addEventListener('click', () => regionFilter('asia'));
    europe.addEventListener('click', () => regionFilter('europe'));
    oceania.addEventListener('click', () => regionFilter('oceania'));
}



//////////////////////////////////////////////////
//Search for a name:

const nameSearch = function () {
    countries.innerHTML = '';
    const searchUrl = `https://restcountries.com/v3.1/name/${searchInput.value}`;

    displayCountries(searchUrl);
};

//search for the country when user presses enter:
document.addEventListener('keydown', function (e) {
    e.preventDefault;
    if (e.key == 'Enter') {
        nameSearch();
    }
});

//search for the country when user clicks on the maginfier:
if (countries) {
    searchIcon.addEventListener('click', nameSearch);
}






/////////////////////////////////////////////////////////////////////////
//Country page: 



const displayClickedCountry = function () {



    const url = `https://restcountries.com/v3.1/name/${localStorage.clickedCountry}?fullText=true`;

    fetch(url).then(response => response.json())
        .then(function (response) {
            response.forEach(function (obj) {

                const { borders, capital, currencies, flags, languages, name, population, region, subregion, tld } = obj;

                //Destructure the country obj:  


                const [money] = Object.values(currencies);


                const lingo = Object.values(languages);

                const { svg: flagURL } = flags;

                const { common, official, nativeName } = name;
                if (nativeName) //some countries dont have nativeName
                    [{ common: nativeNameCommon }] = Object.values(nativeName);

                if (capital) {      //some countries dont have a capital
                    [capitalCity] = capital;
                }
                else {
                    capitalCity = '';
                };

                /////////////




                const html = `
                    
                        <img class="nation__flag" src=${flagURL}>

                        <div class="card">
                            <h1 class="card__info card__title">${common}</h1>
                            <h2 class="card__info card__info--native">
                                Native Name:
                                <span class="card__input card__input--native">${nativeNameCommon}</span>
                            </h2>

                            <h2 class="card__info card__info--pop">
                                Population:
                                <span class="card__input card__input--pop">${population.toLocaleString()}</span>
                            </h2>

                            <h2 class="card__info card__info--reg">
                                Region:
                                <span class="card__input card__input--reg">${region}</span>
                            </h2>

                            <h2 class="card__info card__info--sub">
                                Sub Region:
                                <span class="card__input card__input--sub">${subregion}</span>
                            </h2>

                            <h2 class="card__info card__info--cap">
                                Capital:
                                <span class="card__input card__input--cap">${capitalCity}</span>
                            </h2>

                            <h2 class="card__info card__info--dom">
                                Top Level Domain:
                                <span class="card__input card__input--dom">${tld[0]}</span>
                            </h2>

                            <h2 class="card__info card__info--cur">
                                Currencies:
                                <span class="card__input card__input--cur">${money.name}</span>
                            </h2>

                            <h2 class="card__info card__info--lang">
                                Languages:
                                <span class="card__input card__input--lang">${lingo.join(', ')}</span>
                            </h2>


                            <div class="borders">
                                <h2 class="card__info">Border Countries:</h2>

                               <div class="neighbor">
                               </div>

                               
                                
                            </div>
                        </div>            
                `;

                nation.insertAdjacentHTML('afterbegin', html);

                if (borders) {
                    borders.forEach(function (cnt) {

                        const htmlBorder = `
                                
                                    <div class="neighbor__country">
                                       ${cnt}
                                    </div>
                                `;
                        [...neighbor].forEach(el => el.insertAdjacentHTML('beforeend', htmlBorder))
                    });
                }

            }
            )
        });
};

if (back) {
    displayClickedCountry();
};









