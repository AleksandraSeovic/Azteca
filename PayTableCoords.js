//------------------------------------------------------------//

//------------------------------------------------------------//
function PayTableCoords(xx,yy,page,vsb) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our ControlStyle-specific properties
    this.X=xx;
    this.Y=yy;
    this.PAGE=page;
    this.VISIBLE=vsb;
}

// Create a PayTableCoords.prototype object that inherits from SObject.prototype.
PayTableCoords.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to PayTableCoords
PayTableCoords.prototype.constructor = PayTableCoords;

//--------------------------------------------------------------------------//