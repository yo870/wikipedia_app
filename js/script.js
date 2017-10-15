$(document).ready(function() {
	$("#searchbox").keypress(function(event){
		if(event.which === 13){
			search();
		}
	});
	$("#searchbutton").on("click", function(){
		search();
	});
});

function search(value) {
	var searchvalue = $("#searchbox").val();
	var address = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + searchvalue;
	if (!!!searchvalue) {alert ("Please input a string in the search box")}
	else {
		$("#resultsection").fadeOut(750,function(){
			$(this).empty();
			getData(address);
			$("#searchbox").val(""); 
		});
	}
}

function getData(address) {
	$.getJSON(address, function(json) {
	    var content = "";
      var description = "";
  	  for (var i = 0; i < json[1].length; i++) {
        if (!!!json[2][i]) {description = "No description to display.";}
        else if (json[2][i].includes('may refer to:')) {description = "This pages lists all potential articles.";}
        else {description = json[2][i];}
        content = content + '<article><a target = "_blank" href = "' + json[3][i] + '"> <h3>' + json[1][i] + '</h3> <h4>' + description + '</h4></a></article>';
      }
		  $("#resultsection").append(content).fadeIn(750);
	});
}
