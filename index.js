let countries = [];
const countriesContainer = document.querySelector(".countries-container");
let triValue;

async function fetchCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));

  countryDisplay("decroissant");
}

async function countryDisplay(tri) {
  countriesContainer.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (tri == "decroissant") {
        triValue = "decroissant";
        return parseFloat(b.population) - parseFloat(a.population);
      } else if (tri == "croissant") {
        triValue = "croissant";
        return parseFloat(a.population) - parseFloat(b.population);
      } else if ((tri = "alphabetique")) {
        triValue = "alphabetique";
        let x = a.translations.fra.common.toLowerCase();
        let y = b.translations.fra.common.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
    })
    .slice(0, rangeValue.textContent)
    .map((country) => {
      let countryPopulation = country.population;
      countryPopulation = countryPopulation
        .toString()
        .replace(/,/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return `
        <div class="country-container">
            <img src="${country.flags.svg}" alt="drapeau de ${country.translations.fra.common}">
            <h2>${country.translations.fra.common}</h2>
            <h4>${country.capital}</h4>
            <p>Population : ${countryPopulation}</p>
        </div>
    `;
    })
    .join("");
}

window.addEventListener("load", () => {
  fetchCountry();
});

inputRange.addEventListener("input", (e) => {
  rangeValue.innerHTML = e.target.value;
  countryDisplay(triValue);
});

inputSearch.addEventListener("input", () => {
  countryDisplay(triValue);
});

minToMax.addEventListener("click", () => {
  countryDisplay("croissant");
});

maxToMin.addEventListener("click", () => {
  countryDisplay("decroissant");
});

alpha.addEventListener("click", () => {
  countryDisplay("alphabetique");
});
