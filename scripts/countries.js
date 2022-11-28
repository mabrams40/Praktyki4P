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
    const favouriteList = document.getElementById("favourite-list");
    favouriteList.style.display = "none";
    // const moreCountries = document.getElementById("more-countries");
    // moreCountries.style.display = "none";
}

function formatNumber(num) 
{
    return (num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
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
            "flag": res.flags[1], //field
            "flagIcon": res.flag //field
        };

        country.population = formatNumber(country.population)
        country.area = formatNumber(country.area)

        addInfoRow(`Nazwa państwa: ${country.name}`);
        addInfoRow(`Oficjalna nazwa: ${country.officialName}`);
        addInfoRow(`Stolica: ${country.capital}`);
        addInfoRow(`Powierzchnia: ${country.area} km^2`);
        addInfoRow(`Populacja: ${country.population} osób`);
        addInfoRow(`Kontynent: ${country.continent}`);
        addInfoRow(`Waluta: ${country.currency} (${country.currencySign})`);
        addInfoRow(`Kod samochodu: ${country.carCode}`);
        addAnchorRow(`Google Maps: `, country.googleMaps);
        addLikeButton(`♥ Do ulubionych`, country);
        addFlag(country.flag);

        return true;
    })
    .catch(console.error);
}

function getCountryData2(a){
    let countryNameInput = a;
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
            "flag": res.flags[1], //field
            "flagIcon": res.flag //field
        };

        country.population = formatNumber(country.population)
        country.area = formatNumber(country.area)

        addInfoRow(`Nazwa państwa: ${country.name}`);
        addInfoRow(`Oficjalna nazwa: ${country.officialName}`);
        addInfoRow(`Stolica: ${country.capital}`);
        addInfoRow(`Powierzchnia: ${country.area} km^2`);
        addInfoRow(`Populacja: ${country.population} osób`);
        addInfoRow(`Kontynent: ${country.continent}`);
        addInfoRow(`Waluta: ${country.currency} (${country.currencySign})`);
        addInfoRow(`Kod samochodu: ${country.carCode}`);
        addAnchorRow(`Google Maps: `, country.googleMaps);
        addLikeButton(`♥ Do ulubionych`, country);
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

function addLikeButton(text, country){
    const container = document.getElementById("country-info");
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = text;
    btn.onclick = () => {
        likeCountry(country);
        btn.disabled = true;
    };
    container.appendChild(btn);
}

function likeCountry(country){
    const container = document.getElementById("favourite-list");
    container.style.display = "block";
    const div = document.createElement("div");
    div.innerText = `${country.flagIcon} ${country.name} (${country.officialName})`;
    container.appendChild(div);
}
    
function searchCountry(rankPlace, name, indicator){
    const container = document.getElementById("country-list");
    const div = document.createElement("div");
    if(typeof indicator === "number"){
        indicator = formatNumber(indicator);
    }
    div.innerText = `${rankPlace}. ${name} (${indicator})`;
    div.onclick = () => {
        getCountryData2(name);
    }
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

let countries = [];
let count = 0;

function getAllCountryData()
{
    const sortBySelect = document.getElementById("filter");
    const countryList = document.getElementById("country-list");
    countryList.innerHTML = "";
    // const moreCountries = document.getElementById("more-countries");
    // moreCountries.style.display = "block";

    countries = fetch("https://restcountries.com/v3/all")
    .then(res => res.json())
    .then(res => res.map(x => {
        const country = {};
        country.population = x.population;
        country.area = x.area;
        country.name = x.name.common;
        country.officialName = x.name.official;
        try{ // Antarctica doesn't have any capital
            country.capital = x.capital[0];
        } catch (error){
            country.capital = "none";
        };
        try{ // Antarctica doesn't have any currency
            country.currency = Object.entries(x.currencies)[0][1].name;
        } catch (error){
            country.currency = "none";
        };
        return country;
    }))
    .then(res => res.sort((x, y) => {
        switch(sortBySelect.value){
            case "populacja":
                return y.population - x.population;
            case "powierzchnia":
                return y.area - x.area;
            // Sorting text values is different
            // case "nazwa":
            //     return y.name - x.name;
            // case "nazwa oficjalna":
            //     return y.officialName - x.officialName;
            // case "stolica":
            //     return y.capital - x.capital;
            // case "waluta":
            //     return y.currencies - x.currencies;
        }
    }));
}

function displayCountries(){
    countries.then(res => {
        const sortBySelect = document.getElementById("filter");
        const el = 8;
        for(let i=count; i<count+el; i++){
            switch(sortBySelect.value){
                case "populacja":
                    searchCountry(i+1, res[i].name, res[i].population);
                    break;
                case "powierzchnia":
                    searchCountry(i+1, res[i].name, res[i].area);
                    break;
            }
        }
        count+=el;
    })
}