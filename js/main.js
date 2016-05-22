var config = {
	apiKey: "AIzaSyAuD-svvtckbaU54PrAh6ntfpr1TuvLDUc",
	authDomain: "intercoding-metro.firebaseapp.com",
	databaseURL: "https://intercoding-metro.firebaseio.com",
	storageBucket: "intercoding-metro.appspot.com",
};
firebase.initializeApp(config);

$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user) {
		if(user){
			window.location.replace("learningclasses.html");
		}
	});


	$("#getstarted").on("click", function(){
		$("#signuparea").removeClass("shake");
		$("#loginarea").removeClass("shake");
		$('#signuparea').lightbox_me({
	        centered: true, 
	        onLoad: function() { 
	            $('#signuparea').find('input:first').focus()
            }
        });
	});

	$("#signup").on("click", function(){
		$(".notloading").css("display", "none");
		$(".spinner").css("display", "block");
		$("#signuparea").removeClass("shake");
		firebase.auth().createUserWithEmailAndPassword($("#signemail").val(), $("#signpassword").val()).then(function(){
			firebase.database().ref("users/"+firebase.auth().currentUser.uid+"/active/").push().set("default")
			console.log("doing stuff");
		}).catch(function(error){
		  	$(".notloading").css("display", "block");
			$(".spinner").css("display", "none");
		  	$("#signuparea").addClass("shake");
		    console.log("Error creating user:", error);
		})
		
	});

	$("#loginlink").on("click", function(){
		$("#loginarea").removeClass("shake");
		$("#signuparea").trigger("close");
		$("#loginarea").lightbox_me({
	        centered: true, 
	        onLoad: function() { 
	            $('#signuparea').find('input:first').focus()
            }
        });
	})

	$("#login").on("click", function(){
		$("#loginarea").removeClass("shake");
		$(".notloading").css("display", "none");
		$(".spinner").css("display", "block");
        firebase.auth().signInWithEmailAndPassword($("#logemail").val(), $("#logpassword").val()).catch(function(error){
        	console.log("Login Failed!", error);
			$(".notloading").css("display", "block");
			$(".spinner").css("display", "none");
			$("#loginarea").addClass("shake");
        });
	});

	$("#resignup").on("click", function(){
		$("#signuparea").removeClass("shake")
		$("#loginarea").trigger("close");
		$("#signuparea").lightbox_me({
	        centered: true, 
	        onLoad: function() { 
	            $('#signuparea').find('input:first').focus()
            }
        });
	});
});