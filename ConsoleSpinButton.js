//--------------------------------------------------------------------------//
var KEY_SPACE=false;
//--------------------------------------------------------------------------//
function ConsoleSpinButton(xx,yy,parent_container,app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    
    // id_butt_plancia,res_name,frames,xx,yy,type,parent_container,app_reference
    ConsoleButton.call(this,ButtonManager.BUTT_START,"Butt_Spin",3,xx,yy,ConsoleButton.TYPE_PUSH_AND_BACK,parent_container,app_reference, '.webp');
    
        document.addEventListener('keydown', function (event) {
    
        if (event.defaultPrevented) 
        {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === ' ') 
        {
            KEY_SPACE=true;
        }
    });

    
    
}

// Create a StateBoot.prototype object that inherits from ConsoleSpinButton.prototype.
ConsoleSpinButton.prototype = Object.create(ConsoleButton.prototype); // See note below

// Set the "constructor" property to refer to ConsoleSpinButton
ConsoleSpinButton.prototype.constructor = ConsoleSpinButton;
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
ConsoleSpinButton.prototype.Refresh = function(ellapsed_ms) {
  
    ConsoleButton.prototype.Refresh.call(this,ellapsed_ms);
    
    if (KEY_SPACE==true)
    {
        KEY_SPACE=false;
        
        this.OnMouseClick();
    }
}
//--------------------------------------------------------------------------//