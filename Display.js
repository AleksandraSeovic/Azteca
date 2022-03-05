
//--------------------------------------------------------------------------//
function Display(max_digits,xx,yy,font_name,size,alignment,stage_container) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ParentStage = stage_container;
    
    this.MaxDigits=max_digits;
    
    this.CurCaption="";
    
    //this.BitmapFontText=new PIXI.extras.BitmapText("", {font: "30px Verdana", align: "right"});
    this.BitmapFontText=new PIXI.extras.BitmapText("", {font: size+"px "+font_name, align: alignment});
    
    this.XX(xx,0);
    this.YY(yy,0);
}

// Create a Display.prototype object that inherits from SObject.prototype.
Display.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotStage
Display.prototype.constructor = Display;

//--------------------------------------------------------------------------//
Display.prototype.Init = function() {
    this.ParentStage.addChild(this.BitmapFontText);    
}
//------------------------------------------------------------//
Display.prototype.Visible = function(vsb){

    this.BitmapFontText.visible=vsb;
}
//------------------------------------------------------------//
Display.prototype.Width = function(){

    return this.BitmapFontText.width;
}
//--------------------------------------------------------------------------//
Display.prototype.XX = function(xx,offs)
{
    this.BitmapFontText.x=(xx+offs);
}
//--------------------------------------------------------------------------//
Display.prototype.YY = function(yy,offs)
{
    this.BitmapFontText.y=(yy+offs);
}
//------------------------------------------------------------//
Display.prototype.ResetCaption = function(){

    this.CurCaption="";
}
//------------------------------------------------------------//
Display.prototype.SetCaption = function(capt){

    if (this.CurCaption!=capt){
        
        if (this.BitmapFontText.align=="right")
        {
            while (capt.length<this.MaxDigits) capt="."+capt;
        }        
        
        this.CurCaption=capt;
        this.BitmapFontText.text=this.CurCaption;
    }
}
//------------------------------------------------------------//
Display.prototype.SetCaptionCents = function(val){

    var str=""+parseInt ( (val/100) );
    
    str+=".";

    var remind=parseInt ( (val%100) );
    
    var remind_str=""+remind;

    while (remind_str.length<2)
        remind_str="0"+remind_str;
    
    this.SetCaption((str+remind_str));
}
//--------------------------------------------------------------------------//