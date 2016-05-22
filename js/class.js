var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};

var classID;

function editUnit(unitID){
	localStorage.setItem("unit", unitID)
}
function newUnit(){
	var numUnits;
	firebase.database().ref("classes/"+classID).once("value", function(snapshot){
		var units = snapshot.child("units").val();
		if(units.length){
			numUnits = units.length;
		} else {
			numUnits = 0;
		}
		localStorage.setItem("unit", numUnits);
	});
}
function editUnit(unitID){
	localStorage.setItem("unit", unitID);
}

$(document).ready(function(){
	classID = localStorage.getItem("class");
	firebase.database().ref("classes").once("value", function(snapshot){
		var title = snapshot.child(classID).val().title;
		$("#classtitle").html(title);
		var units = snapshot.child(classID).child("units").val();
		if(units){
			for (var u in units){
				var unit = units[u];
				$("#lessons").prepend('<li class="lessonitem"><div class="lessonitemleft">\
<h1 class="lessontitle">'+unit.name+'</h1>\
<span class="tag theme">DIFFICULTY</span></div>\
</div>\
<div class="lessonitemright">\
<a href="newlesson.html" onclick="editUnit('+u+')" class="button">EDIT</a>\
</div>\
</li>')
			}
		}
	});
});