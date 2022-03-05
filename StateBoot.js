//--------------------------------------------------------------------------//
function StateBoot(app_reference,slot_ref) {    

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    ProgramState.call(this,app_reference,slot_ref);
    
    this.Setup=true;
    this.Loading=true;
}

// Create a StateBoot.prototype object that inherits from ProgramState.prototype.
StateBoot.prototype = Object.create(ProgramState.prototype); // See note below

// Set the "constructor" property to refer to StateBoot
StateBoot.prototype.constructor = StateBoot;
    
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateBoot.prototype.StateInit = function() {
  
    ProgramState.prototype.StateInit.call(this);
    
    this.DEBUG_LOG("- Boot state - init");
};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateBoot.prototype.StateBody = function(ellapsed_ms) {
  
    ProgramState.prototype.StateBody.call(this,ellapsed_ms);
    
    if (this.ApplicationRef.GAMEPROXY().IsIdle()==true)
        this.Step=ProgramState.STEP_FASE_EXIT;
};

//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateBoot.prototype.StateExit = function() {
  
     ProgramState.prototype.StateExit.call(this);
};

//--------------------------------------------------------------------------//