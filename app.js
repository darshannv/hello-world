window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimeZone = document.querySelector(".loaction-timezone");
	let temperatureSection = document.querySelector('.temperature-');
	const temperatureSpan = document.querySelector('.temperature span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			//console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "http://cors-anywhere.herokuapp.com/";
			const api = '${proxy}https://api.darksky.net/forecast/d6d771a05b20be68461160396936ee5a/$(lat),$(long)';

			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				//console.log(data);
				const { temperature, summary, icon } = data.currently;
				//set dom elements from api
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimeZone.textContent = data.timezone;
				//celsius calc
				let celsius = (temperature - 32) * (5/9);
				//set icons
				setIcons(icon, document.querySelector(".icon"));

				//change temperature to Fahrenheit
				temperatureSection.addEventListener('click', () => {
					if (temperatureSpan.textContent === "F") {
						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(celsius);
					} else {
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temperature;
					}

				});

			});

		});

	} else {
		h1.textContent = "Hey this is not working"
	}


	function setIcons(icon, iconID) {
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);

	}

});