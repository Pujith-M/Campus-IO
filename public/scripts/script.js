$(document).ready(function () {
	setTimeout(function() {
	    $(".alert").alert("close");
	}, 3000);
});

$("#myMessage").keypress(function (e) {
    if(e.which == 13 && !e.shiftKey) {        
        $(this).closest("form").submit();
        e.preventDefault();
        return false;
    }
});

function showSupportDetails() {
	$("#supportDetails").attr("hidden", false);
}

function hideSupportDetails() {
	$("#supportDetails").attr("hidden", true);
}