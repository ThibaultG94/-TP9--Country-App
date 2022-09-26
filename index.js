let countries = [];
const countriesContainer = document.querySelector(".countries-container");

async function fetchCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));

  console.log(countries);
}

async function countryDisplay() {
  await fetchCountry();

  countriesContainer.innerHTML = countries
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
  countryDisplay();
});

inputRange.addEventListener("input", (e) => {
  rangeValue.innerHTML = e.target.value;
});

inputSearch.addEventListener("input", (e) => {
  console.log(e.target.value);
});

console.log(inputSearh.value);
// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
