//--------------------------------------------------------------------------//
function StateSpinRun(app_reference,slot_ref) {    

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //ProgramState.call(this,stage_container,stage_renderer,slot_ref);
    ProgramState.call(this,app_reference,slot_ref);
    
}

// Create a StateSpinRun.prototype object that inherits from ProgramState.prototype.
StateSpinRun.prototype = Object.create(ProgramState.prototype); // See note below

// Set the "constructor" property to refer to StateSpinRun
StateSpinRun.prototype.constructor = StateSpinRun;
    
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateSpinRun.prototype.StateInit = function() {
  
    ProgramState.prototype.StateInit.call(this);
    
    this.DEBUG_LOG("- Spin Run - state init");
};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateSpinRun.prototype.StateBody = function(ellapsed_ms) {
  
    ProgramState.prototype.StateBody.call(this,ellapsed_ms);
    
    switch (this.SottoStep)
    {
        case ProgramState.ID_SOTTOSTEP_0:
        {
            this.SlotReference.SpinInit();
            
            this.SottoStep++;
        } break;

        case ProgramState.ID_SOTTOSTEP_1:
        {
            this.SlotReference.SpinRun();

            if (this.SlotReference.IsSpinOver()==true)
            {   
                this.Step=ProgramState.STEP_FASE_EXIT;
            }
            
        } break;

        default:break;
    };       
    
};

//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateSpinRun.prototype.StateExit = function() {
  
     ProgramState.prototype.StateExit.call(this);
};

//--------------------------------------------------------------------------//