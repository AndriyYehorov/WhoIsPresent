function refresh(){
	window.location = window.location;	
}

let intervalID = setInterval(refresh,60000);

function checkAtt() {     			
	chrome.alarms.create("PressButton", {delayInMinutes: 0.016} ); 
	chrome.alarms.create("Check", {delayInMinutes: 0.032, periodInMinutes: 1.0});	
	setTimeout(refresh,2000);		
}

function stopAtt() {     		
	chrome.alarms.clear("Check");	
	clearInterval(intervalID);	
}

function clearAtt() {     			
	attenders = [];
	chrome.storage.local.set({attenders});
	refresh();
}

function saveAtt() {     			
	chrome.alarms.create("Save", {delayInMinutes: 0.016} );
}

function displayAtt(){
	chrome.storage.local.get("attenders", ({ attenders }) => {
	
		let htmlCode = "<h2>Присутні</h2><table border='1' ><tr><th>Ім'я</th><th>Перший раз був</th><th>Останній раз був</th></tr>";
				
		if (attenders != undefined) {        
			
			for (let elem of attenders) {    
				
				htmlCode += "<tr><td>" + elem.name  + "</td><td>" + elem.firstTimeSeen  + "</td><td>" + elem.lastTimeSeen + "</td></tr>";
			}
		}
		
		htmlCode += "</table>";
		
		document.getElementById("tableWithAttenders").innerHTML = htmlCode;
	});
}

document.getElementById('attendanceCheck').addEventListener('click', checkAtt); 
document.getElementById('attendanceStop').addEventListener('click', stopAtt); 
document.getElementById('attendanceClear').addEventListener('click', clearAtt); 
document.getElementById('attendanceSave').addEventListener('click', saveAtt); 

displayAtt();


