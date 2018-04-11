var optionContainer = document.getElementById("optionContainer");
var addOptions = document.getElementById("addOptions");

var optionCounter = 1;

function addTextField(questionNum) {
	var divUpperElement = document.createElement("div");
	var divInnerElement = document.createElement("div");
	var lableElement = document.createElement("Label");
	var textareaElement = document.createElement("textarea");
	var radioButton = document.createElement("input");

	radioButton.type = "radio";
	radioButton.name = "answer";
	radioButton.required = "true";
	radioButton.id = "q156";
	radioButton.value = "option" + questionNum;

	divInnerElement.className = "input-group-prepend input-group-text";
	divUpperElement.className = "input-group";
	divInnerElement.appendChild(radioButton);
	divUpperElement.appendChild(divInnerElement);


	lableElement.setAttribute("for", "option" + questionNum);
	lableElement.appendChild(document.createTextNode("Option" + questionNum));
	optionContainer.appendChild(lableElement);
	
	textareaElement.type = "text";
	textareaElement.required = "true";
	textareaElement.name = "option" + questionNum;
	textareaElement.className="form-control";
	textareaElement.id="exampleFormControlTextarea1";
	textareaElement.rows="1";
	divUpperElement.appendChild(textareaElement);

	optionContainer.appendChild(divUpperElement);
	optionContainer.appendChild(document.createElement("br"));
}
addTextField(optionCounter++);
addTextField(optionCounter++);

addOptions.addEventListener('click', function() {
	addTextField(optionCounter++);
	if(optionCounter > 5)
		addOptions.style.display = "none";
});