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
			else if(type == "json"){
				$.getJSON('json/homeLoad.json', function(js) {
                  $('#fName').html(js.firstName);
				  $('#lName').html(js.lastName);
				  if(js.empType == "admin"){
					$( ".admin" ).load( "admin.html" );
				  }
				  else if(js.empType == "pl"){
					$( ".pl" ).load( "pl.html" );
				  }
				  if(js.ProjectList != null){
					  $("#ifNoProj").remove();
				  }
				  $.each( js.ProjectList, function( id, project){
					$("#projects").append(
					'<div class = "project" id = "' + id + '"><h1 style="margin: 0px;">' + project.title + '</h1><div>Status: ' + project.status + '</div><div>Tasks Complete: ' + project.taskFin + '/' + project.taskTotal + '</div><div>Due Date: ' + project.finDate + '</div></div><p></p>');
				  });
               })
				  .fail( function(d, textStatus, error) {
					console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})
			}
		});
	}
};

var loadProfile = function (){
	if($("#profileBlock").css("display") == "none"){
		$("#projectBlock").css("display", "none");
		if($("#profileInfo").children().length == 0){
			$.getJSON('json/profile.json', function(js) {
                  $("#profileInfo").append(
				  		'<p> Employee ID: ' + js.empID + '</p><p> Department ID: ' + js.deptID + ' </p><p> Department Head: ' + js.deptHead + 'Supervisor Name</p><p> Pay Rate: ' + js.payrate + '</p><p> Pay Type: ' + js.hourOrSal + ' </p><p> Last Paycheck: ' + js.lastPaycheck + '</p><ul> Lead for Projects:</ul>')
				  $.each( js.ProjectList, function( id, name){
					$("#profileInfo").find("ul").append(
						'<li id = "' + id + '">' + name.title + '</li>');
				  });
				  $("#profileInfo").append(
				  		'<button onclick = "loadProfile()">Back to Projects</button>');
               })
				  .fail( function(d, textStatus, error) {
					console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})

		}
		
		$("#profileBlock").css("display", "block");
	}
	else{
		$("#profileBlock").css("display", "none");
		$("#projectBlock").css("display", "block");
		
	}
};

var loadDueToday = function (){
	if($("#dueTodayBlock").css("display") == "none"){
		$("#projectBlock").css("display", "none");
		if($("#dueToday").children().length == 0){
			$.getJSON('json/dueToday.json', function(js) {
				  $.each( js.ProjectList, function( projid, project){
					console.log(project);
					$("#dueToday").append(
						'<h2>' + project.title +'</h2><ul id = "' + projid + '"></ul>');
					$.each( project.TaskList, function( taskid, task){
						console.log(task);
						$("#dueToday").find("#"+ projid).append(
						'<li id = "' + taskid + '">' + task.title + '</li>');
					});	
				  });
				  $("#dueToday").append(
				  		'<button onclick = "loadDueToday()">Back to Projects</button>');
               })
				  .fail( function(d, textStatus, error) {
					console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})

		}
		
		$("#dueTodayBlock").css("display", "block");
	}
	else{
		$("#dueTodayBlock").css("display", "none");
		$("#projectBlock").css("display", "block");
		
	}
};
