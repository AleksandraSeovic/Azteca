//---------------------------------------------------------------------------//
var SObject_VERBOSE=false;
//---------------------------------------------------------------------------//
var SObject = function () {
  
    this.ID = UniqueID();
    
    //this.ProxyData=null;    // :GameProxyData
	this.ServerData=null;   // :Array;
    this.ParseIndex=0;      // :uint;		
    
    this.GPTimer=0;
};
//---------------------------------------------------------------------------//
SObject.prototype.ArmaTimer = function(p_pTimer,p_MS){
    
    //if (window.MOBILE==true)
        //p_MS=parseInt(p_MS/2);
    //p_MS=this.DeviceEllapsedTime(p_MS);
    
    p_pTimer=p_MS;
    return p_pTimer;
};
//---------------------------------------------------------------------------//
SObject.prototype.TimerDec = function(p_pTimer,p_ElapsedMS){
    
    if (p_pTimer>=p_ElapsedMS)
        p_pTimer-=p_ElapsedMS;
    else
        p_pTimer=0;    
    return p_pTimer;
};
//---------------------------------------------------------------------------//
SObject.prototype.TimerRefresh = function(p_ElapsedMS){
  
    this.GPTimer = this.TimerDec(this.GPTimer,p_ElapsedMS);
};
//---------------------------------------------------------------------------//
SObject.prototype.DeviceSteps = function(parm){
  
    return parseInt( (parm/window.CPU_BENCH) );
};
//---------------------------------------------------------------------------//
SObject.prototype.DeviceRotation = function(parm){
  
    return (parm*window.CPU_BENCH);
};
//---------------------------------------------------------------------------//
SObject.prototype.DeviceInc = function(parm){
  
    return (parm*window.CPU_BENCH);
};
//---------------------------------------------------------------------------//
SObject.prototype.DeviceEllapsedTime = function(parm){
  
    return (parm/window.CPU_BENCH);
};
//------------------------------------------------------------//
SObject.prototype.ParseServer_Init = function(chunk_to_parse){
    
    this.ParseIndex=1;	// Skip nome comando

    this.ServerData=chunk_to_parse.split(",");

    if (this.ServerData.length==0)
        return false;

    return true;
}
//------------------------------------------------------------//
SObject.prototype.ParseServer_EOF = function(){    
    
    if (this.ParseIndex>=this.ServerData.length)
        return true;
    return false;
}
//------------------------------------------------------------//
SObject.prototype.ParseServer_SEEK = function(p_abs_Offset){        
    
    if (p_abs_Offset>=this.ServerData.length)
        return false;

    this.ParseIndex=p_abs_Offset;
    return true;
}
//------------------------------------------------------------//
SObject.prototype.ParseServer_Dump_UINT = function(p_abs_Offset){        
    
    var dump;

    if (p_abs_Offset==-1)
        dump=parseInt(this.ServerData[this.ParseIndex++]);
    else
        dump=parseInt(this.ServerData[p_abs_Offset]);

    return dump;
}
//------------------------------------------------------------//
SObject.prototype.ParseServer_Dump_STRING = function(p_abs_Offset){        
    
    var dump_str;

    if (p_abs_Offset==-1)
        dump_str=this.ServerData[this.ParseIndex++];
    else
        dump_str=this.ServerData[p_abs_Offset];

    return dump_str;
}
//---------------------------------------------------------------------------//
SObject.prototype.ASSERT = function(p_Assertion,p_pTrace){
    
    if (p_Assertion==false){
        
        console.log("ASSERTION fail "+this.ID);
        
        if (p_pTrace!=null){
    
            console.log(p_pTrace);
        }
    }
};
//---------------------------------------------------------------------------//
SObject.prototype.DEBUG_LOG = function(p_Log){
    
    if (SObject_VERBOSE==true)
        console.log(p_Log);
}
//---------------------------------------------------------------------------//

/*
// Define the Person constructor
var Person = function(firstName) {
  this.firstName = firstName;
};

// Add a couple of methods to Person.prototype
Person.prototype.walk = function(){
  console.log("I am walking!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
};
*/