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

$(document).ready(function(){
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
		createdClass["members"] = [];
		createdClass["lessons"] = [];
		console.log(createdClass)
		firebase.database().ref("classes/"+ID).set(createdClass).then(function(){
			window.location.replace("class.html");
		});
	})
});