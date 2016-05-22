var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};
firebase.initializeApp(config);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setClass(classID){
	localStorage.setItem("class", classID);
	window.location.replace("class.html");
}



function createLesson(title, tag, level, unit, progress){
	$("#lessons").append('<li class="lessonitem"><div class="lessonitemleft">\
		<h1 class="lessontitle">'+title+'</h1> \
		<span class="tag '+level+'">'+level+'</span>\
		<span class="tag theme">'+tag+'</span></div>\
	<div class="lessonitemright"><a href="lesson.html" unit="' + unit + '" class="button" onclick="setUnit('+unit+');">GO &#9656;</a><div class="circle circle'+unit+'"><span></span></div></div></li>');
}

$(document).ready(function(){
	firebase.database().ref("classes").once("value", function(snapshot){
		for (var c in snapshot.val()){
			if(snapshot.child(c).child("owner").val()==firebase.auth().currentUser.uid){
				var title = snapshot.child(c).child("title").val();
				var numMembers;
				if(snapshot.child(c).child("members").val()){
					numMembers = snapshot.child(c).child("members").val().length;
				} else {
					numMembers = 0;
				}
				$("#classes").prepend('<li class="classitem" onclick="setClass('+c+')"><h1 class="classtitle">'+title+'</h1><h2 class="classcode">'+c+'</h2><h3 class="members">'+numMembers+' Members, 0 Online</h3></li>')
			}
		}
	});

	$(".newclassitem").on("click", function(){
		$('#createclassarea').lightbox_me({
	        centered: true, 
	        onLoad: function() { 
	            $('#createclassarea').find('input:first').focus();
	        }
	    });
	});
	$("#createclass").on("click", function(){
		var classCode = $("#classname").val();
		var ID = getRandomInt(10000,99999);
		var createdClass = {};
		createdClass["title"] = classCode;
		createdClass["owner"] = firebase.auth().currentUser.uid;
		createdClass["members"] = [];
		createdClass["lessons"] = [];
		firebase.database().ref("classes/"+ID).set(createdClass).then(function(){
			window.location.replace("classes.html");
		});
	});
	$("#")
});