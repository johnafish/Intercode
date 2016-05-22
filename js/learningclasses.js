var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};
firebase.initializeApp(config);

function setClass(c){
	localStorage.setItem("class", c);
	window.location.href="learning.html";
}

$(document).ready(function(){
	firebase.database().ref("classes").once("value", function(snapshot){
		for (var c in snapshot.val()){
			var members = snapshot.child(c).child("members").val();
			var title = snapshot.child(c).child("title").val();
			for (var k in members){
				if (k==firebase.auth().currentUser.uid){
					$("#classes").prepend('<li class="classitem" onclick="setClass('+c+')"><h1 class="classtitle">'+title+'</h1><h2 class="classcode">'+c+'</h2></li>')
				}
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
	$("#joinclass").on("click", function(){
		var classID = $("#classname").val();
		firebase.database().ref("classes").once("value", function(snapshot){
			var classJoining = snapshot.child(classID).val();
			if(classJoining){
				localStorage.setItem("class", classID);
				firebase.database().ref("classes/"+classID).child("members").child(firebase.auth().currentUser.uid).set(1).then(function(){
					window.location.href="learning.html";
				});
			}
		});
	})
})