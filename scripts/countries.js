window.onload = () => {
    const countryNameInput = document.getElementsByName("countryName")[0];
    // Submit by pressing Enter
    countryNameInput.addEventListener("keydown", (e) => {
        if(e.key == "Enter"){
            getCountryData();
        }
    })
    const countryInfo = document.getElementById("country-info");
    countryInfo.style.display = "none";
    const countryFlag = document.getElementById("country-flag");
    countryFlag.style.display = "none";
}

function numbersformat(num) 
{
    return (num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
  }

function getCountryData(){
    let countryNameInput = countrySearch.countryName.value;
    countrySearch.countryName.value = "";
    if(!correctInput(countryNameInput)) return;

    fetch(`https://restcountries.com/v3/name/${countryNameInput}`)
    .then(res => {
        if(!res.ok){
            alert("Country not found.");
            throw new Error(res.statusText);
        }
        return res.json();
    })
    .then(res => res[0])
    .then(res => {
        const container = document.getElementById("country-info");
        container.style.display = "block";
        container.innerHTML = "";

        const country = {
            "name" : res.name.common, //field
            "officialName" : res.name.official, //field
            "capital" : res.capital[0], //array
            "area": res.area, //field
            "population" : res.population, //field
            "continent": res.continents[0], //array
            "currency": Object.entries(res.currencies)[0][1].name, //array
            "currencySign": Object.entries(res.currencies)[0][1].symbol, //array
            "carCode": res.car.signs[0], //array
            "googleMaps": res.maps.googleMaps, //field
            "flag": res.flags[1] //field
        };



  country.population = numbersformat(country.population)
  country.area = numbersformat(country.area)

        addInfoRow(`Nazwa państwa: ${country.name}`);
        addInfoRow(`Oficjalna nazwa: ${country.officialName}`);
        addInfoRow(`Stolica: ${country.capital}`);
        addInfoRow(`Powierzchnia: ${country.area} km^2`);
        addInfoRow(`Populacja: ${country.population} osób`);
        addInfoRow(`Kontynent: ${country.continent}`);
        addInfoRow(`Waluta: ${country.currency} (${country.currencySign})`);
        addInfoRow(`Kod samochodu: ${country.carCode}`);
        addAnchorRow(`Google Maps: `, country.googleMaps);
        addFlag(country.flag);

        return true;
    })
    .catch(console.error);
}

function addInfoRow(text){
    const container = document.getElementById("country-info");
    const div = document.createElement("div");
    div.innerText = text;
    container.appendChild(div);
}

function addAnchorRow(text, href){
    const container = document.getElementById("country-info");
    const div = document.createElement("div");
    div.innerText = text;
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.innerText = "link";
    anchor.target = "_blank";
    div.appendChild(anchor);
    container.appendChild(div);
}

function addFlag(url){
    fetch(url)
    .then(res => {
        if(!res.ok){
            throw new Error(res.status);
        }
        return res.blob();
    })
    .then(imgBlob => URL.createObjectURL(imgBlob))
    .then(imgObjectUrl => {
        const container = document.getElementById("country-flag");
        container.style.display = "block";
        container.innerHTML = "";
        const img = document.createElement("img");
        img.src = imgObjectUrl;
        container.appendChild(img);
    });
}

function correctInput(text){
    if(text.trim().length < 3) return false;
    else return true;
}
function Filters()
{
    const x = fetch("https://restcountries.com/v3/all")
    .then(res => res.json())
    .then(res => res.map(x => {
    const country = {};
    country.population = x.population;
    country.area = x.area;
    country.capital = x.capital;
    country.name = x.name;
    country.currencies = x.currencies;
    return country;
    }))
    .then(res => res.sort((x, y) => {
    switch(sortBySelect.value){ // wartość wybrana w selekcie
        case "Nazwa":
            return y.population - x.population;
        case "Powierzchnia":
            return y.area - x.area;
        case "Stolica":
            return y.capital - x.capital;
        case "Nazwa":
            return y.name - x.name;
        case "Waluta":
            return y.currencies - x.currencies;
    }
    }))
    .then(console.log);
}


/*
function Filters()
{   
    if (document.getElementById('Filtry').value == "Nazwa") 
    {
        const x = fetch("https://restcountries.com/v3/all")
        .then(res => res.json())
        .then(res => res.map(x => {
        const country = {};
        country.nazwa = x.name.common;
        return country;
        }))
        .then(res => res.sort((x, y) => y.nazwa-x.nazwa))
        .then(console.log);
    }
    if (document.getElementById('Filtry').value == "Stolica") 
    {
        const x = fetch("https://restcountries.com/v3/all")
        .then(res => res.json())
        .then(res => res.map(x => {
            const country = {};
            country.stolica = x.capital[0];
            return country;
            }))
            .then(res => res.sort((x, y) => y.stolica-x.stolica))
            .then(console.log);
    }
    if (document.getElementById('Filtry').value == "Powierzchnia") 
    {
        const x = fetch("https://restcountries.com/v3/all")
        .then(res => res.json())
        .then(res => res.map(x => {
        const country = {};
        country.powierzchnia = x.area;
        return country;
            }))
            .then(res => res.sort((x, y) => y.powierzchnia-x.powierzchnia))
            .then(console.log);
    }
    if (document.getElementById('Filtry').value == "Populacja") 
    {
        const x = fetch("https://restcountries.com/v3/all")
        .then(res => res.json())
        .then(res => res.map(x => {
        const country = {};
        country.populacja = x.population;
        return country;
            }))
            .then(res => res.sort((x, y) => y.populacja-x.populacja))
            .then(console.log);
    }
    if (document.getElementById('Filtry').value == "Waluta") 
    {
        const x = fetch("https://restcountries.com/v3/all")
        .then(res => res.json())
        .then(res => res.map(x => {
        const country = {};
        country.waluta = x.Object.entries(res.currencies)[0][1].name;
        return country;
            }))
            .then(res => res.sort((x, y) => y.waluta-x.waluta))
            .then(console.log);
    }
    
}

*/
