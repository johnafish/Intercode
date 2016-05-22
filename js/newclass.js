var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};
firebase.initializeApp(config);
var datasaver;
var myCodeMirror, consoleOut;

function saveLessonToDB(unitID, lessonID){
	var title = $("#lessontitle").html();
	var content = $("#lesson-text").html();
	var code = myCodeMirror.getValue();
	var classID = localStorage.getItem("class");

	lesson = {}
	lesson["code"] = code;
	lesson["text"] = content;

	firebase.database().ref("classes/"+classID+"/units/"+unitID).child("name").set(title);
	firebase.database().ref("classes/"+classID+"/units/"+unitID+"/lessons").child(lessonID).set(lesson, console.log("set"));
}

function saveCode(){
	var unitID = parseInt(localStorage.getItem("unit"));
	var lessonID = parseInt(localStorage.getItem("lesson"));
	saveLessonToDB(unitID, lessonID);
}

function setLessonFromDB(unitID, lessonID){
	var classID = localStorage.getItem("class");

	firebase.database().ref("classes/"+classID+"/units/"+unitID).once("value", function(snapshot){
		if(snapshot.child("name").val()){
			$("#lessontitle").html(snapshot.child("name").val());
		} else {
			$("#lessontitle").html("Unit Title");
		}
		if(snapshot.child("lessons/"+lessonID).val()){
			myCodeMirror.setValue((snapshot.child("lessons/"+lessonID).val().code));
			$("#lesson-text").html(snapshot.child("lessons/"+lessonID).val().text);
		} else {
			myCodeMirror.setValue("#Code goes here");
			$("#lesson-text").html("Lesson goes here");
		}
	});
}

$(document).ready(function(){
	dataSaver = window.setInterval(saveCode, 5000);
	setLessonFromDB(localStorage.getItem("unit"), localStorage.getItem("lesson"));

	$("#next").click(function(){
		saveCode();
		var lessonID = parseInt(localStorage.getItem("lesson"));
		lessonID++;
		localStorage.setItem("lesson", lessonID);
		setLessonFromDB(localStorage.getItem("unit"), lessonID)
	})

	myCodeMirror = CodeMirror.fromTextArea(document.getElementById("yourcode"), {
	    theme: "monokai",
	    value: "hi",
	    mode: "python",
	    lineNumbers: true
    });

	consoleOut = CodeMirror.fromTextArea(document.getElementById("youroutput"), {
		theme: "monokai",
		value: "hi",
		mode: "SQL",
		readOnly: true
	});

})