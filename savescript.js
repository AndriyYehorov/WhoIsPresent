function saveAtt(){
	
	let regex = /desk.nuwm.edu.ua/

	if (regex.test(window.location.href)) {
			
		let studentsList = document.getElementsByClassName("trB")	
				
		let textBoxesList = document.querySelectorAll('input[type="text"]')

		let formatedStudentsList = []
				
		for (let i=0;i<studentsList.length;i++) {

			studentSplited = studentsList[i].innerText.split(" ")

			studentFormatted = studentSplited[1].concat(" ",studentSplited[2]," ",studentSplited[0])

			formatedStudentsList[i] = studentFormatted	
		}					

		chrome.storage.local.get("attenders", ({ attenders }) => {			

			for (let elem of formatedStudentsList){

				let foundStatus = 0

				for (attender of attenders){
					
					if (elem==attender.name){foundStatus=1}
				}					

				if (foundStatus == 0){

					index = formatedStudentsList.indexOf(elem)					
					
					textBoxesList[2*index].value = "нб/нп"

					textBoxesList[2*index+1].value = "нб/нп"
				}
			}
		})
	}

	else{
		alert("Відкрийте сторінку журналу")
	}	
}


chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name == "Save") {
		
		chrome.tabs.executeScript({code: '(' + saveAtt + ')()'})			
	}
})