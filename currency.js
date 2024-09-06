let url = "https://v6.exchangerate-api.com/v6/dc5f38b0698a3a028ab85d23/latest/";
const dropdowns = document.querySelectorAll(".drop-down select");
const conv_btn = document.querySelector("#conv-btn");
const amt = document.querySelector("#amt");

const updateFlag = (eve) => {
    let element = eve.target;
    let code = element.value;
    let country = countryList[code];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}

let i=0;
for(let select of dropdowns){
    for (code in countryList) {
        let newOpt = document.createElement("option");
        newOpt.value=code;
        newOpt.innerText= code;
        if(i==0 && code==="USD"){
            newOpt.selected="selected";
            i++;
        }
        if(i==1 && code === "INR"){
            newOpt.selected="selected";
            i++;            
        }
        select.append(newOpt);
    }
    select.addEventListener("change",updateFlag);
}

const updateRate = async (eve) => {
    eve.preventDefault();
    let amtVal= amt.value;
    if(amtVal<=0){
        amtVal=1;
        amt.value="1";
    }
    let toCountry = document.querySelector("#to-country");
    let fromCountry = document.querySelector("#from-country");
    let response = await fetch(`${url}${fromCountry.value}`);
    let data = await response.json();
    let conv_rates =data["conversion_rates"]; 
    let rate = conv_rates[toCountry.value];
    let text = document.querySelector(".rate");
    text.innerText = `${amtVal} ${fromCountry.value} = ${amtVal * rate} ${toCountry.value}`;
}

conv_btn.addEventListener("click", updateRate)


