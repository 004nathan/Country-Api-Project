let container = document.getElementById("container");
let country;
const WhereAmI = function( latitude,longitude){
    fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=JSON&auth=286037133089325273909x122951 `)
    .then(function (response){
      console.log(response);
      return response.json();
    }).then(function (data){
     console.log(data);
     if(data.city == null && data.city== undefined) {
        throw new Error(`Coordinates wrong!${data[0].status}`)
     }
     else{
        fetch(`https://restcountries.com/v3.1/name/${data.country}`).then(function (response){
             country = data.country;
            console.log(response);
            return response.json();
          }).then(function (data){
        console.log(data)
        renderHtmlPage(data[0],country)
        
     })
    }
})
     .catch(err =>{
        console.log(`Country not found ${err}`)
      })
    .finally(()=>{
      console.log("Api calling finished")
    })
  }
  WhereAmI(52.508, 13.381);
  console.log("Hi")

  function renderHtmlPage(data,country){
     container.innerHTML = `<div id="headingDiv"><h1 class="text">${country}</h1></div>
     <div id="countryDetailDiv">
     <img src="${data.flags.png}" id="flag"/>
     <ul id="countryDetail">
     <ol id="headingli">
     <li>Capital :</li>
     <li>Population :</li>
     <li>Continent  :</li>
     <li>Area :  </li>
     </ol><ol id="answerli"> <li>${data.capital[0]}</li>
     <li> ${data.population}</li>
     <li> ${data.continents[0]}</li>
     <li>${data.area}  Km2</li>
     </ol>
     </ul>
     </div>
     `
  }