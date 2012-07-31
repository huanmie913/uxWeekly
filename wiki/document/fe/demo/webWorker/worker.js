
onmessage = function(event){
	var message = "In worker on message method :" + event.data;
	postMessage(message);
};

function sendMsgToMain(){
	postMessage("sent message from worker");
}

setInterval(sendMsgToMain,5000)
