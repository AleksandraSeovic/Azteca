//------------------------------------------------------------//

//------------------------------------------------------------//
function ControlStyle(xx,yy,scale) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our ControlStyle-specific properties
    this.X=xx;
    this.Y=yy;
    this.SCALE=scale;
}

// Create a ControlStyle.prototype object that inherits from SObject.prototype.
ControlStyle.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ControlStyle
ControlStyle.prototype.constructor = ControlStyle;

//--------------------------------------------------------------------------//