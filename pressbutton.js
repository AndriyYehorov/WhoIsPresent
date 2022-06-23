function pressButton() {		
	
	let regex = /meet.google.com/;
	
	if (regex.test(window.location.href)) {
		
		document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc")[1].click();	
	}
	
	else {
		alert("Відкрийте сторінку google meet");			
	}	
}


chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name == "PressButton") {
		
		chrome.tabs.executeScript({code: '(' + pressButton + ')();'});	 		
	}
})