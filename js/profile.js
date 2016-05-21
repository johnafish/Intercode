var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};
var points;

$(document).ready(function(){
	firebase.database().ref("/").once("value", function(snapshot){
		$(".welcome").append("<b> "+firebase.auth().currentUser.email+"</b>.");
		points=snapshot.child("users").child(firebase.auth().currentUser.uid).child("score").val();
		if(!points){
			points=0
		}
		$(".points").append("<b> "+points+"</b> points.");
		$("#profile-wrapper").css("display", "block");
		$(".spinner").css("display", "none");
		var users = snapshot.child("users").val();
		var ranking = 1;
		for (var key in users){
			var user = users[key];
			if (user.score>points){
				ranking++
			}
		}
		$(".ranking").append("<b>#"+ranking+"</b> in the world!")
	});
});