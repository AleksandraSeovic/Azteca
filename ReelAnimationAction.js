//------------------------------------------------------------//

//------------------------------------------------------------//
function ReelAnimationAction(action,float_parms_array,uint_parms_array) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our ReelAnimationInfo-specific properties
    this.Action=action;
    this.FloatParms=float_parms_array;
    this.UintParms=uint_parms_array;
}

// Create a ReelAnimationAction.prototype object that inherits from SObject.prototype.
ReelAnimationAction.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ReelAnimationAction
ReelAnimationAction.prototype.constructor = ReelAnimationAction;

//--------------------------------------------------------------------------//