//--------------------------------------------------------------------------//
function StateGameOver(app_reference,slot_ref) {        

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //ProgramState.call(this,stage_container,stage_renderer,slot_ref);
    ProgramState.call(this,app_reference,slot_ref);
}

// Create a StateGameOver.prototype object that inherits from ProgramState.prototype.
StateGameOver.prototype = Object.create(ProgramState.prototype); // See note below

// Set the "constructor" property to refer to StateGameOver
StateGameOver.prototype.constructor = StateGameOver;
    
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateGameOver.prototype.StateInit = function() {
  
    ProgramState.prototype.StateInit.call(this);
    
    this.DEBUG_LOG("- GameOver state - init");
};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateGameOver.prototype.StateBody = function(ellapsed_ms) {
  
    ProgramState.prototype.StateBody.call(this,ellapsed_ms);
    
    this.SlotReference.Splash();
    
    this.Step=ProgramState.STEP_FASE_EXIT;
};

//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateGameOver.prototype.StateExit = function() {
  
     ProgramState.prototype.StateExit.call(this);
};

//--------------------------------------------------------------------------//