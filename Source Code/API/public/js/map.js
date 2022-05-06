
var color = "#FF0000";
function initMap() {
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15,
		center: {
			lat: 14.313451,
			lng: 108.966897
		},
		mapTypeId: "satellite",
	});
	fetch('http://aqi18cevku.tk:5000api/0xbb/messenger.json')
		.then(response => response.json())
		.then(dt => {
			for(i in dt.data){
				var gt = [];
				var feed = dt.data[i];
				gt.push(dt.gateWay);
				gt.push(feed.messenger);
				console.log(feed.messenger);
				if(feed.rssi > -25) color = "#0015ff"
				else if(feed.rssi > -30) color = "#00f7ff"
				else if(feed.rssi > -35) color = "#00ff2f"
				else if(feed.rssi > -40) color = "#ff2200"
				else if(feed.rssi > -45) color = "#ff2200"
				else if(feed.rssi > -50) color = "#ff2200"
				else if(feed.rssi > -55) color = "#ff2200"
				else if(feed.rssi > -60) color = "#00ffe5"
				else if(feed.rssi > -65) color = "#2bff00"
				else if(feed.rssi > -70) color = "#c3ff00"
				else if(feed.rssi > -75) color = "#00b7ff"
				else if(feed.rssi > -80) color = "#d9ff00"
				else if(feed.rssi > -85) color = "#eeff00"
				else if(feed.rssi > -90) color = "#ff2200"
				else if(feed.rssi > -95) color = "#ff2200"
				else if(feed.rssi > -100) color = "#ff2200"
				else if(feed.rssi > -110) color = "#ff2200"
				else if(feed.rssi > -105) color = "#ff0000"
				else if(feed.rssi > -115) color = "#ff2200"
				else if(feed.rssi > -120) color = "#ff2200"
				else if(feed.rssi > -125) color = "#ff2200"
				
				const flightPlanCoordinates = gt;
				const flightPath = new google.maps.Polyline({
					path: flightPlanCoordinates,
					geodesic: true,
					strokeColor: color,
					strokeOpacity: 1.0,
					strokeWeight: 2,
				});
				flightPath.setMap(map);
			}

		})
}