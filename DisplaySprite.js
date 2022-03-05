//--------------------------------------------------------------------------//
DisplaySprite.NUMERIC_DISPLAY=0;
DisplaySprite.ALPHANUMERIC_DISPLAY=1;
//--------------------------------------------------------------------------//
function DisplaySprite(max_digits,xx,yy,font_name,alignment,type,parent_container, extension = '.png') {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.Container      = new PIXI.Container();
    
    this.ParentStage = parent_container;
    
    this.MaxDigits=max_digits;
    
    this.CurCaption="";
    
    
    this.DisplayType=type;
    
    if (this.DisplayType==DisplaySprite.NUMERIC_DISPLAY)
        frames=10;
    else
        frames=36;
    
    this.Digits = new Array(max_digits);
    for (var i=0;i<this.Digits.length;i++)
    {
        this.Digits[i]=new TiledSprite(font_name,frames,false,this.Container,extension);
    }
    
    this.XX(xx,0);
    this.YY(yy,0);
}

// Create a DisplaySprite.prototype object that inherits from SObject.prototype.
DisplaySprite.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotStage
DisplaySprite.prototype.constructor = DisplaySprite;

//--------------------------------------------------------------------------//
DisplaySprite.prototype.Init = function() {
    
    for (var i=0;i<this.Digits.length;i++)
    {
        this.Digits[i].Setup();
        this.Digits[i].XX(0,(i*this.Digits[i].FrameW));
    }

    this.ParentStage.addChild(this.Container);
}
//------------------------------------------------------------//
DisplaySprite.prototype.MoveEx= function(rel_x,rel_y,steps,time){

    for (var i=0;i<this.Digits.length;i++)
    {
        this.Digits[i].StopTransform();
        this.Digits[i].YY(0,0);
        this.Digits[i].SPRITE_TRANSFORMER().MoveEx(rel_x,rel_y,steps,time);
    }
}
//------------------------------------------------------------//
DisplaySprite.prototype.StopTransform= function(){

    for (var i=0;i<this.Digits.length;i++)
    {
        this.Digits[i].StopTransform();
    }
}
        
//------------------------------------------------------------//
DisplaySprite.prototype.Visible = function(vsb){

    this.Container.visible=vsb;
}
//------------------------------------------------------------//
DisplaySprite.prototype.Width = function(){

    return (this.Digits.length*this.Digits[0].FrameW);
}
//------------------------------------------------------------//
DisplaySprite.prototype.ACTUAL_W = function(){

    return (this.CurCaption.length*this.Container.scale.x*this.Digits[0].FrameW);
}
//------------------------------------------------------------//
DisplaySprite.prototype.ACTUAL_H = function(){

    return (this.Container.scale.y*this.Digits[0].FrameH);
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.XX = function(xx,offs)
{
    this.Container.x=(xx+offs);
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.XX_GET = function()
{
    return this.Container.x;
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.YY = function(yy,offs)
{
    this.Container.y=(yy+offs);
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.YY_GET = function()
{
    return this.Container.y;
}
//------------------------------------------------------------//
DisplaySprite.prototype.CenterBox = function(ww_box,hh_box){

    this.Container.x=(ww_box-this.ACTUAL_W())/2;
    this.Container.y=(hh_box-this.ACTUAL_H())/2;
}

//--------------------------------------------------------------------------//
DisplaySprite.prototype.SCALE = function(scale)
{
    this.Container.scale.x=scale;
    this.Container.scale.y=scale;
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.ALPHA = function(alpha)
{
    this.Container.alpha=alpha;
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.ALPHA_INC = function(alpha)
{
    this.Container.alpha+=alpha;
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.ALPHA_DEC = function(alpha)
{
    this.Container.alpha+=alpha;
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.ALPHA_GET = function()
{
    return this.Container.alpha;
}
//------------------------------------------------------------//
DisplaySprite.prototype.ResetProperties = function(visible_set, alpha_set, scale_set){

    this.Visible(visible_set);
    this.SCALE(scale_set);
    this.ALPHA(alpha_set);
}
//------------------------------------------------------------//
DisplaySprite.prototype.ResetToTop = function(){

    this.ParentStage.removeChild(this.Container);
    
    this.ParentStage.addChild(this.Container);
}
//------------------------------------------------------------//
DisplaySprite.prototype.ResetCaption = function(){

    this.CurCaption="";
}
//------------------------------------------------------------//
DisplaySprite.prototype.SetCaption = function(capt){

    var i,len,char_frame;
    
    if (this.CurCaption!=capt)
    {
        for (var i=0;i<this.Digits.length;i++)
        {
            this.Digits[i].Visible(false);
        }
    
        len=capt.length;
        
        if (len>this.MaxDigits)
            len=this.MaxDigits;
            
        for (i=0;i<len;i++)
        {
            if (capt[i]!=' ')
            {
                char_frame=this.ConvertChar(capt[i]);

                this.Digits[i].SetFrame( char_frame );

                this.Digits[i].Visible(true);
            }
        }
        
        this.CurCaption=capt;
    }
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.ConvertChar = function(ch){

    var frm,DLT,templ;
    
    if (ch>='0' && ch<='9')
        templ="0";
    else
        templ="A";
    
    DLT=(ch.charCodeAt(0)-templ.charCodeAt(0));
    
    if (ch>='0' && ch<='9')
        DLT+=0;
    else
        DLT+=10;
    
    
    return DLT;
}
//--------------------------------------------------------------------------//
DisplaySprite.prototype.Refresh = function(ellapsed_ms) {

    for (var i=0;i<this.Digits.length;i++)
    {
        this.Digits[i].Refresh(ellapsed_ms);
    }
    
}
//--------------------------------------------------------------------------//