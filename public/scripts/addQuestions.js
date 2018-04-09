var questionContainer = document.getElementById("questionContainer");
var addOptions = document.getElementById("addOptions");
function addTextField() {
	questionContainer.appendChild(document.createTextNode("hahhaha"));
	var input = document.createElement("input");
	input.type = "text";
	input.name = "member";
	input.class="form-control";
	input.id="exampleFormControlTextarea1";
	input.rows="3";
	questionContainer.appendChild(input);
	// Append a line break 
	questionContainer.appendChild(document.createElement("br"));
}
addOptions.addEventListener('click', function() {
	addTextField();
});