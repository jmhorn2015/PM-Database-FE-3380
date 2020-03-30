var checkLogIn = function () {
	let params = new URLSearchParams(location.search);
    var type = params.get("type");
	if(type != null){
		$("body").empty();
		$( "body" ).load( "home.html", function() {
			if(type == "admin"){
				console.log("admin");
				$( ".admin" ).load( "admin.html" );
			}
			else if(type == "pl"){
				$( ".pl" ).load( "pl.html" );
			}
		});
	}
};