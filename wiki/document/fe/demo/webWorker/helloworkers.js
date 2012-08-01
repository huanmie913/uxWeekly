
function messageHandler(event){
	var messageSent = event.data;
	var messageReturned = "hello" + messageSent + "from a separate thread";
	this.postMessage(messageReturned);
}

this.addEventListener('message',messageHandler,false);
