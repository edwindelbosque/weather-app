window.addEventListener("load", ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(
		".temperature-description");
	
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let degreeSection = document.querySelector(".temperature");
	const degreeSpan = document.querySelector(".temperature span");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "http://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/02a2a583f6667abba7f55821580b9868/${lat},${long}`;
			
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					const { temperature, summary, icon } = data.currently;
					//Set DOM Elements from the API
					temperatureDegree.textContent = Math.floor(temperature);
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
						//Formula for Celsius
						let celsius = (temperature - 32) * (5 / 9);
						//Set Icon
						setIcons(icon, document.querySelector(".icon"));

						//Change temperature to Celsius/Farenheit
						degreeSection.addEventListener("click", () => {
							if(degreeSpan.textContent === "F") {
								degreeSpan.textContent = "C";
								temperatureDegree.textContent = Math.floor(celsius);
							} else{
								degreeSpan.textContent = "F";
								temperatureDegree.textContent = Math.floor(temperature);
							}
						});
				});
		});
	}

	function setIcons (icon, iconID) {
		const skycons = new Skycons({ color: "white" })
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});