//------------------------------------------------------------//
PayTableQuotazione.FONT_FAMILY="Game_Font";
PayTableQuotazione.FONT_SIZE=40;
PayTableQuotazione.FONT_STYLE ="normal";
PayTableQuotazione.FONT_WEIGHT="bold";
PayTableQuotazione.FONT_FILL="white";

//------------------------------------------------------------//
function PayTableQuotazione(id,app_reference,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our PayTableQuotazione-specific properties
    this.ID=id;
    this.ParentContainer = parent_container;
    this.ApplicationRef = app_reference;

    this.DisplayQuotazione = new DisplayStyle(10,0,0,"right",this.ParentContainer,
                                new PIXI.TextStyle({
                                    fontFamily: PayTableQuotazione.FONT_FAMILY,
                                    fontSize: PayTableQuotazione.FONT_SIZE,
                                    fontStyle: PayTableQuotazione.FONT_STYLE,
                                    fontWeight: PayTableQuotazione.FONT_WEIGHT,
                                    fill: PayTableQuotazione.FONT_FILL
                                })
                          );

    this.Render=false;
}

// Create a PayTableQuotazione.prototype object that inherits from SObject.prototype.
PayTableQuotazione.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to PayTableQuotazione
PayTableQuotazione.prototype.constructor = PayTableQuotazione;
//------------------------------------------------------------//
PayTableQuotazione.prototype.Renderize = function(p_xx, p_yy, max_width) {

    const quot=this.ApplicationRef.SLOT().SLOT_COMBO().GetQuotazioneCombinazione( this.ID );
    let ww = max_width
    if (quot!=0)
    {
        this.DisplayQuotazione.SetCaptionCents(quot,this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().VALUTA_STRING());
        if(ww == 0) {
            ww = this.DisplayQuotazione.ACTUAL_W()
        }
        this.DisplayQuotazione.XX(p_xx, ww);
        this.DisplayQuotazione.YY(p_yy, 30);

        this.Render=true;
    }
    else
    {
        this.Render=false;
        this.DisplayQuotazione.Visible(false);
    }
    return ww
}
//------------------------------------------------------------//
PayTableQuotazione.prototype.Visible = function(vsb) {

    this.DisplayQuotazione.Visible(vsb);
}
//------------------------------------------------------------//
PayTableQuotazione.prototype.Renderable = function() {
    return this.Render;
}
//--------------------------------------------------------------------------//
