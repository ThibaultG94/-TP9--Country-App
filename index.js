let countries = [];
const countriesContainer = document.querySelector(".countries-container");

async function fetchCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));

  // console.log(countries);
}

async function countryDisplay(tri) {
  await fetchCountry();

  countriesContainer.innerHTML = countries
    .filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (tri == "decroissant") {
        return parseFloat(b.population) - parseFloat(a.population);
      } else if (tri == "croissant") {
        return parseFloat(a.population) - parseFloat(b.population);
      } else if ((tri = "alphabetique")) {
        // return parseFloat(a.name.common) - parseFloat(b.name.common);
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
            <img src="${country.flags.png}" alt="Drapeau de ${country.name.common}">
            <h2>${country.name.common}</h2>
            <h4>${country.capital}</h4>
            <p>Population : ${countryPopulation}</p>
        </div>
    `;
    })
    .join("");
}

window.addEventListener("load", () => {
  countryDisplay("decroissant");
});

inputRange.addEventListener("input", (e) => {
  rangeValue.innerHTML = e.target.value;
  countryDisplay("decroissant");
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

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
