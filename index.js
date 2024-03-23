let backgroundImageURL = "";

async function getImage() {
    try {
        const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
        const data = await response.json();
        backgroundImageURL = data.urls.full;
        document.body.style.backgroundImage = `url(${backgroundImageURL})`;
        document.getElementById("author").textContent = `Photo by ${data.user.name}`;
    } catch (error) {
        console.error("Error fetching image: ", error);
        document.body.style.backgroundImage = `url(https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU)`;
    }
}

async function getCryptoData() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=true");
        const data = await response.json();
        const crypto = document.getElementById("crypto");
        const cryptoImage = document.createElement("img");
        cryptoImage.src = data.image.small;

        const cryptoLogo = document.getElementById("cryptoLogo");
        cryptoLogo.appendChild(cryptoImage);
        cryptoLogo.innerHTML += `<p>${data.name}</p>`;

        crypto.innerHTML += `
            <p>Current: $${data.market_data.current_price.usd}</p>
            <p>High: ${data.market_data.high_24h.usd}</p>
            <p>Low: ${data.market_data.low_24h.usd}</p>
        `;
    } catch (error) {
        console.error("Error fetching crypto data: ", error);
        document.getElementById("crypto").textContent = "Error fetching crypto data";
    }
}

function getTime() {
    const time = new Date();
    document.getElementById("time").textContent = time.toLocaleTimeString("en-us", {timeStyle: "medium"});    
}

async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            success => {
                resolve({
                    latitude: success.coords.latitude,
                    longitude: success.coords.longitude
                });
            },
            error => {
                reject(error);
            }
        );
    });
}

async function getWeather() {
    const location = await getLocation();
    const {latitude, longitude} = location;
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather").innerHTML = `
                <p>${data.main.temp}°</p>
                <p>${data.weather[0].description}</p>
            `;
        });
}


getImage();
getCryptoData();
setInterval(getTime, 1000);
getWeather();