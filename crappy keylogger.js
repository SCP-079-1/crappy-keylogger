var events = [];

//get time function
function time() {
  return(Date.now());
}

// sleep/wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//records keypresses
var currentword = []
document.onkeypress = async function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    //console.log(charStr);
    //below is the join letters into words
    currentword.push(charStr)
    var currentwordlength = currentword.length;
    await sleep(1000);
    if (currentwordlength == currentword.length){ //check if there is still the same number of charecters as there were a second ago
    	events.push('Typed "' + currentword.join("") + '" 😃' + time() + " 😃" + window.location.href);
    	currentword = [];
    }
};

//records mouse clicks
document.addEventListener("mousedown", mouseDown);
function mouseDown(event) {
  switch (event.which) {
    case 1:
    	events.push("Left Clicked " + event.clientX + "," + event.clientY + "😃" + time() + "😃" + window.location.href)
    	break;
    case 2:
    	events.push("Middle Clicked " + event.clientX + "," + event.clientY + "😃" + time() + "😃" + window.location.href)
    	break;
    case 3:
    	events.push("Right Clicked " + event.clientX + "," + event.clientY + "😃" + time() + "😃" + window.location.href)
    	break;
    default:
    	events.push("Your weird mouse clicked " + event.clientX + "," + event.clientY + "😃" + time() + "😃" + window.location.href)
  }
}

//record copy and paste
if (window.confirm("Would you like to enable copy and pasteing? You have to allow it on every website.")) {
 	console.log(await window.navigator.clipboard.readText());
 	while(true){
 		var clipboard = await window.navigator.clipboard.readText();
 		await sleep(1500);
 		var newclipboard = await window.navigator.clipboard.readText();
 		if (clipboard != newclipboard){
 			events.push('Copied "' + newclipboard + '"😃' + time() + "😃" + window.location.href)
 		}
 	}
}

//summary() function
function summary(){
	for (i = 0; i < events.length; i++) {
		var str = events[i]
		var things = str.split("😃")
		var timestr = new Date(parseInt(things[1]));
		console.log(things[0] + " at " + timestr + " " + things[2])
	}
}

if (window.confirm("Would you like to console alert every time?")){
	while (true){
		var length1 = events.length;
		await sleep(500)
		if (length1 != events.length){
			var i = events.length - 1
			var str = events[i]
			var things = str.split("😃")
			var timestr = new Date(parseInt(things[1]));
			console.log(things[0] + " at " + timestr + " " + things[2])
		}
	}
}
