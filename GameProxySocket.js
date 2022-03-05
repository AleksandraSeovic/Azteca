
//--------------------------------------------------------------------------//
function GameProxySocket(app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our GameProxy-specific properties
    this.ApplicationRef = app_reference;
    this.Socket=null;
    this.Connected=false;
    this.Closing=false;
    this.ReplyReceived=false;
}

// Create a GameProxySocket.prototype object that inherits from SObject.prototype.
GameProxySocket.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to GameProxySocket
GameProxySocket.prototype.constructor = GameProxySocket;

//------------------------------------------------------------//
// Registra la richiesta di chiusura del client con il server
GameProxySocket.prototype.Close_Connection = function() {  

    if (this.Connected==true)
    {
        //this.Socket.close();
        //this.Connected=false;
        this.Closing=true;
    }
}
//------------------------------------------------------------//
// Stabilisce la connessione sovket
GameProxySocket.prototype.Setup_Connection = function() {    

    //this.Socket=new WebSocket('ws://81.29.148.30:10001');
    
    var url="wss://"+window.SERVER_URL+":"+window.SERVER_PORT;
    
    this.Socket=new WebSocket(url);
    
    // Handlers install
    this.Socket.onopen = this.onOpenCallback.bind(this);
    this.Socket.onmessage = this.onMessageCallback.bind(this);
    this.Socket.onclose = this.onCloseCallback.bind(this);
    this.Socket.onerror= this.onErrorCallback.bind(this);
}
//--------------------------------------------------------------------------//
// called once when the queued resources all load.
GameProxySocket.prototype.onMessageCallback = function (event) {
    
    this.ServerReply=event.data;
    
    this.ReplyReceived=true;
};
//--------------------------------------------------------------------------//
// called once when the queued resources all load.
GameProxySocket.prototype.onOpenCallback = function (event) {
    this.Connected=true;
};
//--------------------------------------------------------------------------//
// This method is called when the socket connection is closed by the server.
GameProxySocket.prototype.onCloseCallback = function (event) {
    
    this.Connected=false;
    
    // Effettuata dal server?
    if (this.Closing==false)
        this.Goto_Error(StateAlarm.ID_ALARM_SERVER_CLOSE_COMM);
    // Richiesta dal client
    else
        this.Goto_Error(StateAlarm.ID_ALARM_SESSION_CLOSED);
};
//------------------------------------------------------------//
// This method is called if the socket throws an error.
GameProxySocket.prototype.onErrorCallback = function (event) {
    
    this.Connected=false;
    this.Goto_Error(StateAlarm.ID_ALARM_COMM_ERROR);
};
//--------------------------------------------------------------------------//
GameProxySocket.prototype.SendService = function(srvc) {
/*    
    this.DEBUG_LOG("Socket Status "+this.Socket.readyState);
    
    this.Socket.send("InitGame,123456;\n");
*/    
    this.DEBUG_LOG(">> To Server: "+srvc);
    
    this.ReplyReceived=false;
			
    this.ServerReply=null;
    
    if (window.ENCRYPTION==false)
        this.Socket.send(srvc);
    else
        this.Socket.send(DES_Encrypt(srvc));
}
//--------------------------------------------------------------------------//
GameProxySocket.prototype.IsConnected = function() {
    
    return this.Connected;
}
//------------------------------------------------------------//
GameProxySocket.prototype.Goto_Error = function(alarm_to_raise) {    

    this.ApplicationRef.GAMEPROXY().Goto_Error(alarm_to_raise);
}
//--------------------------------------------------------------------------//
GameProxySocket.prototype.SERVER_REPLY = function() {

    if (window.ENCRYPTION==false)
	   return this.ServerReply;
    
    return DES_Decrypt(this.ServerReply);
}
//--------------------------------------------------------------------------//
GameProxySocket.prototype.REPLY_RECEIVED = function() {
    
    return this.ReplyReceived;
}
//--------------------------------------------------------------------------//
GameProxySocket.prototype.Refresh = function(ellapsed_ms) {
    
    this.TimerRefresh(ellapsed_ms);

}
//------------------------------------------------------------//
