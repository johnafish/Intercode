var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};

var uid;
$(document).ready(function(){
	var level;
	var classCurrent = localStorage.getItem("class");
	firebase.database().ref("/").once("value", function(snapshot){
		uid = firebase.auth().currentUser.uid;
		level = snapshot.child("classes/"+classCurrent+"/members/"+uid).val();
		
		if(!snapshot.child("users/"+uid).child("active")){
			firebase.database().ref("users/"+uid+"/active").push().set("default")
			numThemes = 1
		} else {
			var numThemes = objectToList(snapshot.child("users/"+uid).child("active").val()).length;

		}
		if (numThemes === 1) {
			displayChoices();
		}
		
		$("#main").css("display", "block");
		$(".spinner").css("display", "none");
		try{
			for (var i = 1; i <= level; i++) {
				var lesson = snapshot.child("classes/"+classCurrent+"/units").child(i).val();
				var theme = snapshot.child("users").child(uid).child('units').child(i).child('theme').val();
				if (!theme) {
					var active = snapshot.child("users").child(uid).child("active").val();
					theme = generateUnit(objectToList(active));
					firebase.database().ref("users").child(uid).child('units').child(i).child('theme').set(theme);
				}
				var numLessonsCompleted = snapshot.child("classes/"+classCurrent+"/members").child(uid).child("units").child(i).child("lessons").numChildren();
				if(numLessonsCompleted>0){
					var lastValue = snapshot.child("users").child(uid).child("units").child(i).child("lessons").child(numLessonsCompleted).child("completed").val();
					if(!lastValue){
						numLessonsCompleted-=1;
					}
				}
				var numLessonsTotal = snapshot.child("units").child(i).child("lessons").numChildren();
				console.log(numLessonsCompleted/numLessonsTotal)
				if(!lesson.difficulty){
					lesson.difficulty = "DIFFICULTY"
				}
				console.log(lesson.name, theme.toUpperCase(), lesson.difficulty, i, (numLessonsCompleted/numLessonsTotal))
				createLesson(lesson.name, theme.toUpperCase(), lesson.difficulty, i, (numLessonsCompleted/numLessonsTotal));
			}
		} catch(e){
		}
		
		
	});
});

function createLesson(title, tag, level, unit, progress){
	$("#lessons").append('<li class="lessonitem"><div class="lessonitemleft">\
		<h1 class="lessontitle">'+title+'</h1> \
		<span class="tag '+level+'">'+level+'</span>\
		<span class="tag theme">'+tag+'</span></div>\
	<div class="lessonitemright"><a href="lesson.html" unit="' + unit + '" class="button" onclick="setUnit('+unit+');">GO &#9656;</a><div class="circle circle'+unit+'"><span></span></div></div></li>');
	
	$(".circle"+unit).circleProgress({
		value: progress,
        size: 32,
        fill: {
            color : "green"
        }
    });
    $(".circle"+unit+" span").html(Math.round(100*progress)+"%")
	console.log(progress)
}
function setUnit(unitID) {
	localStorage.setItem("unit", unitID);
}