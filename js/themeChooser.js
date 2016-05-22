var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};
firebase.initializeApp(config);
var uid;

$(document).ready(function(){

	if(!firebase.auth().currentUser){
		// window.location.href="index.html";
	}
	var activeThemes;
	firebase.database().ref("users").once("value", function(snapshot){
		activeThemes = snapshot.child(firebase.auth().currentUser.uid+"/active").val();
		populateThemes(activeThemes);
	});
	
});

function displayChoices(){
	$("#themes").lightbox_me({
        centered: true
    });
}
function closeChoices(){
	$("#themes").trigger("close");
}
function populateThemes(active){
	for (var theme in themes){
		if(theme=="default"){
			continue;
		}
		var isActive = false;
		for(var key in active){
			if (active[key]==theme){
				isActive=true;
				break;
			}
		}

		if(isActive){
			$("#themes").append('<div class="theme '+theme+' active" onclick="addTheme(&quot;'+theme+'&quot;)">'+theme+'</div>');
		} else {
			$("#themes").append('<div class="theme '+theme+'" onclick="addTheme(&quot;'+theme+'&quot;)">'+theme+'</div>')
		}
	}
	$("#themes").append('<br><br><br><a class="button big" onclick="closeChoices()">ALL GOOD</a><br><br><br>');
}

function addTheme(theme){
	if ($("."+theme).hasClass("active")){
		$("."+theme).removeClass("active");
		firebase.database().ref("users").once("value", function(snapshot){
			var value = snapshot.child(firebase.auth().currentUser.uid).child("active").val()
			for (var key in value) {
				if (value[key]!=theme){
					continue
				} else {
					firebase.database().ref("users").child(firebase.auth().currentUser.uid).child("active").child(key).remove();
				}
			}
			
		});
	} else {
		var pushRef = firebase.database().ref("users").child(firebase.auth().currentUser.uid).child("active").push();
			$("."+theme).addClass("active");
			pushRef.set(theme);
	}
}