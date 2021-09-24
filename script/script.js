(function() {
    window.addEventListener("DOMContentLoaded", getCountriesData);
    const fliterRegion = document.querySelector(".filter-region");
    const filterNav = document.querySelector("#regions");
    const mainMain = document.querySelector("main");
    const main = document.querySelector("#main");
    const form = document.forms[0];
    const lis = filterNav.querySelectorAll("li");
    const mode = document.getElementById("mode");
    const moon = document.getElementById("moon");
    const search = document.getElementById("search");
    const goToTopButton = document.getElementById("top");
    const nav = document.querySelector("nav");
    let goBack = document.getElementById("go-back");

    window.addEventListener("scroll", toggleGoToTopButton);
    mode.addEventListener("click", toggleMode);
    fliterRegion.addEventListener("click", toggleFiterNav);
    form.addEventListener("input", filterBySearch);
    form.addEventListener("submit", function(e){e.preventDefault();});
    filterNav.addEventListener("click", filterByRegion);


    function toggleMode() {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode)) {
            moon.src = "./images/transparent.png"
            goBack.src = "./images/back.png";
            search.src = "./images/search-black.png";
        } else {
            moon.src = "./images/bright.png";
            goBack.src = "./images/back-white.png";
            search.src = "./images/search.png";
        }
    }

    function toggleFiterNav() {
        // filterNav.classList.toggle("hide");
        $(filterNav).slideToggle(200);
    }

    function getCountriesData() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://restcountries.eu/rest/v2/all");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.DONE) {
                let response = xhr.response;
                response = JSON.parse(response);
                mainMain.innerHTML = "";
                response.forEach(country => {
                    const name = country.name;
                    const flag = country.flag;
                    const region = country.region;
                    const capital = country.capital;
                    const population = country.population.toLocaleString();
                    const code = country.alpha3Code;
                    
                    const html = `
                        <div class="flag-container">
                            <img src=${flag}>
                        </div>
                        <div class="details">
                            <h3 class="c-name">${name}</h3>
                            <h4 class="population">Population: <span>${population}</span></h4>
                            <h4 class="region">Region: <span>${region}</span></h4>
                            <h4 class="capital">Capital: <span>${capital}</span></h4>
                        </div>
                    `;

                const div = document.createElement("div");
                div.setAttribute("class", "country");
                div.dataset.code = code;
                div.innerHTML = html;
                mainMain.appendChild(div);
                });
                const countries = document.querySelectorAll(".country");
                countries.forEach(country => {
                    country.addEventListener("click", revealCountryDetail, true);
                });
            }
        }
        xhr.send();
    }
    
    function filterBySearch(e) {
        const countries = document.querySelectorAll(".country");
        const value = form.elements[0].value.toLowerCase();
        countries.forEach(country => {
            const name = country.querySelector(".c-name").textContent.toLowerCase();
            if (name.indexOf(value) === -1) {
                $(country).slideUp(100);
            } else {
                $(country).slideDown(100);
            }
        });
    }

    function filterByRegion(e) {
        $(filterNav).slideUp(200);
        const countries = document.querySelectorAll(".country");
        lis.forEach(li => {
            li.classList.remove("active");
        });
        e.target.classList.add("active");
        const id = e.target.id;
        countries.forEach(country => {
            const region = country.querySelector(".region span").textContent.toLowerCase();
            if (region === id) {
                $(country).slideDown(0);
            } else {
                $(country).slideUp(0);
            }
        });
    }
    function toggleGoToTopButton() {
        if (pageYOffset > 4000) goToTopButton.classList.remove("hide");
        else goToTopButton.classList.add("hide");
    }


    function revealCountryDetail() {
        reveal(this);   
    }
    
    function reveal(trigger) {
        let cName;
        nav.classList.add("hide");
        mainMain.classList.add("hide");
        if (trigger.nodeName == "DIV") {
            cName = trigger.querySelector(".c-name").textContent;
        } else {
            cName = trigger.textContent;
            console.log(cName);
        }
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://restcountries.eu/rest/v2/name/${cName}?fullText=true`);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.DONE) {
                const res = JSON.parse(this.response);
                const responseObject = res[0];
                console.log(responseObject);

                let languages = "";                                             /** Get Languages */
                let languagesObject = responseObject.languages;
                if (languagesObject.length == 1) {
                    languages = languagesObject[0].name;
                } else {
                    languages = languagesObject.reduce((acc, curr) => {
                        return acc + curr.name + ", ";
                    }, "");
                    languages = languages.replace(/, $/, '');
                }
                let currencies = "";                                            /** Get Currencies */
                let currenciesObject = responseObject.currencies;
                if (currenciesObject.length == 1) {
                    currencies = currenciesObject[0].name;
                } else {
                    currencies = currenciesObject.reduce((acc, curr) => {
                        return acc + curr.name + ", ";
                    }, '');
                    languages = languages.replace(/, $/, '');
                }

                const countries = document.querySelectorAll(".country");        /** Border countries */
                let borders = responseObject.borders;
                let buttons = document.createElement("div");
                buttons.setAttribute("class", "border-countries");
                countries.forEach(country => {
                    const code = country.dataset.code;
                    let cName = country.querySelector(".c-name").textContent;
                    if (borders.includes(code)) {
                        const btn = document.createElement("button");
                        btn.innerHTML = cName;
                        btn.addEventListener("click", revealCountryDetail);
                        buttons.appendChild(btn);
                    }
                });

                main.innerHTML = `<section>
                    <a href="./index.html" id="back">
                        <img src="./images/back-white.png" id="go-back" alt="">
                        <span>Back</span>
                    </a>
                    <div id="contain">
                        <div id="detail-flag-container">
                            <img src=${responseObject.flag} alt="">
                        </div>
                        <div class="second">
                            <h2>${responseObject.name}</h2>
                            <div class="country-detail">
                                <div class="section-detail">
                                    <div class="one">
                                        <h4>Native Name: <span>${responseObject.nativeName}</span></h4>
                                        <h4>Population: <span>${responseObject.population.toLocaleString()}</span></h4>
                                        <h4>Region: <span>${responseObject.region}</span></h4>
                                        <h4>Sub Region: <span>${responseObject.subregion}</span></h4>
                                        <h4>Capital: <span>${responseObject.capital}</span></h4>
                                    </div>
                                    <div class="two">
                                        <h4>Top Level Domain: <span>${responseObject.topLevelDomain}</span></h4>
                                        <h4>Currencies: <span>${currencies}</span></h4>
                                        <h4>Languages: <span>${languages}</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="border">
                                <h3>Border Countries</h3>
                                <div class="border-countries"></div>
                            </div>
                        </div>
                    </div>
                </section>`;
                main.querySelector(".border-countries").appendChild(buttons);
                goBack = document.getElementById("go-back");
            }
        }
        xhr.send();
    }
 

}());
