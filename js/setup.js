var checkLogIn = function () {
	let params = new URLSearchParams(location.search);
    var type = params.get("type");
	if(type != null){
		$("body").empty();
		$("body").removeAttr("id");
		$( "body" ).load( "home.html", function() {
			if(type == "admin"){
				console.log("admin");
				$( ".admin" ).load( "admin.html" );
			}
			else if(type == "pl"){
				$( ".pl" ).load( "pl.html" );
			}
			else if(type == "json"){
				$.getJSON('json/profile.json', function(js) {
				  $('#id').attr("id", js.data[0].empID);
                  $('#fName').html(js.data[0].firstName);
				  $('#lName').html(js.data[0].lastName);
				  if(js.data[0].empType == "admin"){
					$( ".admin" ).load( "admin.html" );
				  }
				  else if(js.data[0].empType == "pl"){
					$( ".pl" ).load( "pl.html" );
				  }
               })
				  .done(function() {
					  $.getJSON('json/homeLoad.json', function(js) {
						  if(js.data != null){
							  $("#ifNoProj").remove();
						  }
						  $.each( js.data, function( id, project){
							$("#projects").append(
							'<div class = "project" id = "' + project.projectID + '"><h1 style="margin: 0px;" onclick = "sendToProjectView(' + project.projectID + ')">' + project.title + '</h1><div>Status: ' + project.status + '</div><div>Due Date: ' + project.finDate + '</div></div><p></p>');
						});
					  })
					  	.fail( function(d, textStatus, error) {
							console.error("getJSON failed, status: " + textStatus + ", error: "+error)
						})
				  })
				  .fail( function(d, textStatus, error) {
					console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})
			}
		});
	}
};

var loadProfile = function (){
	onOffSideMenu();
	if($("#profileBlock").css("display") == "none"){
		$("#projectBlock").css("display", "none");
		if($("#profileInfo").children().length == 0){
			$.getJSON('json/profile.json', function(js) {
                  $("#profileInfo").append(
				  		'<p> Employee ID: ' + js.data[0].empID + '</p><p> Department ID: ' + js.data[0].deptID + ' </p><p> Pay Rate: $' + js.data[0].payrate + '</p><p> Pay Type: ' + js.data[0].hourOrSal + ' </p><p> Last Paycheck: ' + js.data[0].lastPaycheck + '</p><ul> Lead for Projects:</ul>');
               })
			   	.done(function() {
				  $.getJSON('json/homeLoad.json', function(js) {
					  $.each( js.data, function( id, project){
						if(project.projectLead == $($("#profile").children()[0]).attr("id")){
							$("#profileInfo").find("ul").append(
								'<li id = "' + project.projectID + '" onclick = "sendToProjectView(' + project.projectID + ')">' + project.title + '</li>');
						}
					  });
					  $("#profileInfo").append(
							'<button onclick = "loadProfile()">Back to Projects</button>');
					})
					.fail( function(d, textStatus, error) {
						console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})
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
	onOffSideMenu();
	if($("#dueTodayBlock").css("display") == "none"){
		$("#projectBlock").css("display", "none");
		if($("#dueToday").children().length == 0){
			$.getJSON('json/dueToday.json', function(js) {
					$.each( js.data, function( taskid, task){
						if($("#dueToday").find("#"+ task.projectID).length == 0){
							$("#dueToday").append(
							'<h2 onclick = "sendToProjectView(' + task.projectID + ')" ></h2><ul id = "' + task.projectID + '"></ul>');
						}
						$("#dueToday").find("#"+ task.projectID).append(
						'<li id = "' + task.taskID + '">' + task.title + '</li>');
					});	
				  $("#dueToday").append(
				  		'<button onclick = "loadDueToday()">Back to Projects</button>');
               })
			   	.done(function() {
				  $.getJSON('json/homeLoad.json', function(js) {
					  $.each( js.data, function( id, project){
						$($("#dueToday").find("#"+ project.projectID).prev()).html(project.title);
					  });
					})
					.fail( function(d, textStatus, error) {
						console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})
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

var loadFinances = function (){
	onOffSideMenu();
	if($("#financeBlock").css("display") == "none"){
		$("#projectBlock").css("display", "none");
		if($("#finance").children().length == 0){
			$.getJSON('json/finances.json', function(js) {
					$.each( js.data, function( transid, trans){
						if($("#finance").find("#"+ trans.projectID).length == 0){
							$("#finance").append(
							'<h2 onclick = "sendToProjectView(' + trans.projectID + ')" ></h2><p>Budget: $' + project.budget + '</p><p>Current Balance: $' + project.current_balance + '</p><h3>Last 3 Transactions:</h3><div id = "' + projid + '"></div><button type="submit" onclick = "new function(){$(&quot;#form-' + projid + '&quot;).css(&quot;display&quot;, &quot;block&quot;);}">New Transaction</button><form id = "form-'+ projid +'" style = "display: none;"><h3> New Project Transaction </h3><label for="pID">Project ID:</label><br><input type="text" id="pID" name="pID" value = "'+ projid +'" readonly><br><label for="payID">Employee ID:</label><br><input type="text" id="payID" name="payID" value = "' + $("#profile").children("p").attr("id") + '" readonly><br><label for="amount">Amount: (use negative if withdrawl)</label><br><input type="text" id="amount" name="amount" required><br><label for="desc">Description:</label><br><textarea type="text" id="desc" name="desc" rows = 3 required></textarea><br><label for="dest">Destination: </label><br><input type="text" id="dest" name="dest" required><br><button type="submit">Submit</button></form>');
						}
						$("#finance").find("#"+ task.projectID).append(
						'<li id = "' + transid + '">' + trans.date + ' - $' + trans.amount + ': ' + trans.description + '</li>');
					});	
				  $("#finance").append(
				  		'<button onclick = "loadFinances()">Back to Projects</button>');
               })
			   	.done(function() {
				  $.getJSON('json/homeLoad.json', function(js) {
					  $.each( js.data, function( id, project){
						$($("#finance").find("#"+ project.projectID).prev()).html(project.title);
					  });
					})
					.fail( function(d, textStatus, error) {
						console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})
				  })
				  .fail( function(d, textStatus, error) {
					console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})


		}
		
		$("#financeBlock").css("display", "block");
	}
	else{
		$("#financeBlock").css("display", "none");
		$("#projectBlock").css("display", "block");
		
	}
};

var loadNewAcct = function (){
	onOffSideMenu();
	if($("#adminBlock").css("display") == "none"){
		$("#projectBlock").css("display", "none");
		if($("#newAcct").children().length == 0){
			$.getJSON('json/profile.json', function(js) {
                  $("#newAcct").append(
				  '<form><label for="fname">First name:</label><br><input type="text" id="fname" name="fname" required><br><label for="mname">Middle name:</label><br><input type="text" id="mname" name="mname"><br><label for="lname">Last name:</label><br><input type="text" id="lname" name="lname" required><br><label for="deptID">Department ID:</label><br><input type="text" id="deptID" name="deptID" required><br><label for="payrate">Pay Rate: </label><br><input type="text" id="payrate" name="payrate" required><br><input type="radio" id="salary" name="salOrHour" value="Salary"><label for="Salary" required>Salary</label><br><input type="radio" id="hourly" name="salOrHour" value="Hourly"><label for="Hourly" required>Hourly</label><br><input type="submit" value="Submit"></form>');
				  $("#newAcct").append(
				  		'<p></p><button onclick = "loadNewAcct()">Back to Projects</button>');
               })
				  .fail( function(d, textStatus, error) {
					console.error("getJSON failed, status: " + textStatus + ", error: "+error)
					})

		}
		
		$("#adminBlock").css("display", "block");
	}
	else{
		$("#adminBlock").css("display", "none");
		$("#projectBlock").css("display", "block");
		
	}
};

var sendToProjectView = function(id){
	console.log($(id).attr("id"));
	$("#projID").attr("value", $(id).attr("id"));
	document.getElementById("openProject").submit();
};

var onOffSideMenu = function (){
	if($("#side-menu").children("p").attr("onclick") != null){
		$.each($("#side-menu").children("p"), function(id, div){
			$(div).removeAttr("onclick");
		});
	}
	else{
		$("#sm-profile").attr("onclick", "loadProfile()");
		$("#sm-dueToday").attr("onclick", "loadDueToday()");
		$(".pl").attr("onclick", "loadFinances()");
		$(".admin").attr("onclick", "loadNewAcct()");
	}

};

var loadProjView = function (){
	$.getJSON('json/taskList.json', function(js) {
		  $.each( js.data, function( n, task ){
			$("#" + task.status).append('<div class = "task" id = "' + task.taskID + '"><h3>' + task.title + '</h3><p id = "' + task.empID + '"></p><p> Start Date: ' + task.startDate + ' </p><p> Tags: ' + task.tags + ' </p></div>');
		  });
		  $("#projectBlock").append('<button>Back to Home</button>');
	   })
		.done(function() {
			$.getJSON('json/projectEmps.json', function(js) {
			  $.each( $("#projectBlock").children(".row").children().children("div"), function( n, task ){
				$.each(js.data, function (m, emp){
					if($($(task).children()[1]).attr("id") == emp.empID){
						$($(task).children()[1]).append(emp.firstName + " " + emp.lastName);
					}
				});
			  });
		   })
		   	.fail( function(d, textStatus, error) {
				console.error("getJSON failed, status: " + textStatus + ", error: "+error)
			})
		})
		.fail( function(d, textStatus, error) {
			console.error("getJSON failed, status: " + textStatus + ", error: "+error)
		})
};

