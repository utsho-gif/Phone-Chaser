// grabbing api
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ''
    const showError = document.getElementById('show');
    showError.style.display = 'none'
    if(searchText == ''){
        const showError = document.getElementById('show');
        const h2 = document.createElement('h2');
        h2.innerText = 'Please Enter Phone Name Which You Wanna See About!';
        showError.appendChild(h2);
        showError.style.display = 'block';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data =>  displaySearchResult(data.data.slice(0,20)));
        showError.style.display = 'none'
    }
    
   
}

// display result

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const showAnother = document.getElementById('showAno');
    showAnother.style.display = 'none';
    if(phones.length == 0){
        const showAnother = document.getElementById('showAno');
        const h2 = document.createElement('h2');
        h2.innerText = 'Please Enter Valid Phone Name';
        showAnother.style.display = 'block'
        showAnother.appendChild(h2);

    }
    else {
        phones.forEach(phone => {
            showAnother.style.display = 'block';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div id="single-col" class="card h-100">
                <img src="${phone.image}" class="card-img-top single-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h6 class="card-text">Brand Name: ${phone.brand}</h6>
                    <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-outline-primary w-100 h-50 border-2 rounded-pill">Detail</button>
                    
                </div>
            </div>
            `;
            
            searchResult.appendChild(div);
            
        })
        
    }
   
}

// load phone details


const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))


}

// display phone detail
const displayPhoneDetail = phone =>{
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('cardss');
    const sensorsName = phone.mainFeatures.sensors;
    let storeSensorName = '';
    for(const sensorName of sensorsName){
      storeSensorName = `${storeSensorName} ${sensorName},`
    }
    const othersInfo = phone.others;
    let storeOtherInfo = '';
    if(othersInfo.length == 0){
        const p = document.createElement('p');
        phoneDetail.appendChild(p);
    }
    else{
        for(const otherInfo of Object.keys(othersInfo)){
            storeOtherInfo = `${storeOtherInfo} ${otherInfo},`
           }
    }
   
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <h3>${phone.name}</h3>
    <p><span class='fw-bold'>Realase Date:</span>  ${phone.releaseDate}</p>
    <p><span class='fw-bold'>Storage:</span> ${phone.mainFeatures.storage}</p>
    <p><span class='fw-bold'>Memory:</span> ${phone.mainFeatures.memory}</p>
    <p class='text-wrap'><span class='fw-bold'>Sensors:</span> ${storeSensorName}</p>
    <p class='text-wrap'><span class='fw-bold'>Other Information:</span> ${storeOtherInfo}</p>
    `;
    phoneDetail.appendChild(div);
}