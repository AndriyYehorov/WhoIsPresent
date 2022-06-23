function getAttendanceNow() {	

	let regex = /meet.google.com/;

	if (regex.test(window.location.href)) {
			
		let namesList = document.getElementsByClassName("zWGUib");					
				
		let presentPeople = [];
				
		for (let i=0;i<namesList.length;i++) {
				presentPeople[presentPeople.length] = namesList[i].innerText;
		}
			
		return presentPeople;
	}
	
	else{		
		return undefined;
	}	
}

chrome.alarms.onAlarm.addListener(function(alarm) {
	
	if (alarm.name == "Check") {					
			
		chrome.tabs.executeScript({code: '(' + getAttendanceNow + ')();'}, 
		
		(results) => {				
			
			if (results == undefined) {return undefined;} 
					
			let presentPeopleNow = results[0];				
					
			let timeNow = new Date();
				
			let formatedTime;
				
			if (timeNow.getMinutes()<10){formatedTime = timeNow.getHours().toString()+":0"+timeNow.getMinutes().toString();}
				
			else { formatedTime = timeNow.getHours().toString()+":"+timeNow.getMinutes().toString();}				
				
			chrome.storage.local.get("attenders", ({ attenders }) => {				
					
				for (let elem of presentPeopleNow) {
							
					let foundIndex = -1;
						
					if (attenders  == undefined) {
						attenders  = [];
					}
						
					for (let i=0;i<attenders.length;i++) {
						if (attenders[i].name == elem) {
							foundIndex = i;
						}
					}
						
					if (foundIndex == -1) {					
						attenders[attenders.length] = {"name": elem, "firstTimeSeen": formatedTime  ,"lastTimeSeen": formatedTime};
					}
						
					else{
						attenders[foundIndex].lastTimeSeen = formatedTime;
					}
						
				}					
			
				chrome.storage.local.set({attenders});

			});
		});				
	}
});