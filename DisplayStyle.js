
//--------------------------------------------------------------------------//
function DisplayStyle(area_width,xx,yy,align,stage_container,style) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ParentStage = stage_container;

    this.AreaWidth=area_width;

    this.Align=align;

    this.CurCaption="";

    this.DisplayText = new PIXI.Text(this.CurCaption, style);

    this.MaskButton=TiledSprite.MASK_BUTT_NONE;

    // Event listeners
    var self = this;

    // On click
    this.DisplayText.mousedown = function(data)
    {
        //console.log(""+self.MaskButton);

        if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED)
        {
            self.MaskButton|=TiledSprite.MASK_BUTT_PUSHED;
        }
    }

    // On click for mobile
    this.DisplayText.on('pointerdown', function (event)
    {
        if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED)
        {
            self.MaskButton|=TiledSprite.MASK_BUTT_PUSHED;
        }

    });

    this.DisplayText.mouseover = function(data)
    {
        if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED){

            self.MaskButton|=TiledSprite.MASK_BUTT_OVER;
        }
    }

    this.DisplayText.mouseout = function(data)
    {
        if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED){

            self.MaskButton|=TiledSprite.MASK_BUTT_OUT;
        }
    }

    this.XX(xx,0);
    this.YY(yy,0);
}

// Create a Display.prototype object that inherits from SObject.prototype.
DisplayStyle.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to DisplayStyle
DisplayStyle.prototype.constructor = DisplayStyle;

//--------------------------------------------------------------------------//
DisplayStyle.prototype.Init = function() {

    //if (this.ParentStage!=null)
        //this.ParentStage.addChild(this.DisplayText);
}
//------------------------------------------------------------//
DisplayStyle.prototype.Visible = function(vsb){

    if (this.ParentStage!=null)
    {
        if (vsb==true)
        {
            if (this.ParentStage.children.indexOf(this.DisplayText)==-1)
                this.ParentStage.addChild(this.DisplayText);
        }
        else
        {
            if (this.ParentStage.children.indexOf(this.DisplayText)!=-1)
                this.ParentStage.removeChild(this.DisplayText);
        }
    }
    this.DisplayText.visible=vsb;
    //this.BitmapFontText.visible=vsb;
}
//------------------------------------------------------------//
DisplayStyle.prototype.IsVisible = function(){

    return (this.DisplayText.visible && this.ParentStage.children.indexOf(this.DisplayText)!=-1);
}
//--------------------------------------------------------------------------//
DisplayStyle.prototype.ResetProperties = function(visible_set, alpha_set, scale_set)
{
    this.Visible(visible_set);

    this.DisplayText.alpha=alpha_set;
    this.DisplayText.scale=new PIXI.Point(scale_set,scale_set);

    this.MaskButton=TiledSprite.MASK_BUTT_NONE;
}
//------------------------------------------------------------//
DisplayStyle.prototype.ResetToTop = function(){

    this.ParentStage.removeChild(this.DisplayText);

    this.ParentStage.addChild(this.DisplayText);
}
//--------------------------------------------------------------------------//
DisplayStyle.prototype.StopTransform = function()
{
}
//--------------------------------------------------------------------------//
DisplayStyle.prototype.Refresh = function(ellapsed_time)
{
}
//------------------------------------------------------------//
DisplayStyle.prototype.Width = function(){

    return this.DisplayText.width;
}
//------------------------------------------------------------//
DisplayStyle.prototype.Height = function(){

    return this.DisplayText.height;
}
//--------------------------------------------------------------------------//
DisplayStyle.prototype.XX = function(xx,offs)
{
    this.DisplayText.x=(xx+offs);
    if (this.Align=="center")
    {
        this.DisplayText.x+=(this.AreaWidth-this.DisplayText.width)/2;
    } else if(this.Align=="right") {
        this.DisplayText.x+=(this.AreaWidth-this.DisplayText.width);
    }
}
//--------------------------------------------------------------------------//
DisplayStyle.prototype.YY = function(yy,offs)
{
    //this.DisplayText.y=(100+offs);
    this.DisplayText.y=(yy+offs);
}
//------------------------------------------------------------//
DisplayStyle.prototype.ACTUAL_W = function(){

    return this.DisplayText.width;
}
//------------------------------------------------------------//
DisplayStyle.prototype.ACTUAL_H = function(){

    return this.DisplayText.height;
}
//--------------------------------------------------------------------------//
DisplayStyle.prototype.CenterBox = function(ww,hh)
{
    this.DisplayText.x=(ww-this.DisplayText.width)/2;
    this.DisplayText.y=(hh-this.DisplayText.height)/2;
}
//------------------------------------------------------------//
DisplayStyle.prototype.ResetCaption = function(){

    this.CurCaption="";
}
//------------------------------------------------------------//
DisplayStyle.prototype.SetAreaWidth = function(ww){
    this.AreaWidth=ww;
}
//------------------------------------------------------------//
DisplayStyle.prototype.SetCaption = function(capt){

    if (this.CurCaption!=capt){

        this.CurCaption=capt;
        this.DisplayText.text=this.CurCaption;

        if (this.Align=="center")
        {
            this.DisplayText.x=(this.AreaWidth-this.DisplayText.width)/2;
        } else if(this.Align=="right") {
            this.DisplayText.x=(this.AreaWidth-this.DisplayText.width);
        }
    }
}
//------------------------------------------------------------//
DisplayStyle.prototype.SetCaptionCents = function(val,currency_str){

    var str=""+parseInt ( (val/100) );

    str+=",";

    var remind=parseInt ( (val%100) );

    var remind_str=""+remind;

    while (remind_str.length<2)
        remind_str="0"+remind_str;

    this.SetCaption((str+remind_str+currency_str));
}
//------------------------------------------------------------//
DisplayStyle.prototype.SetButton= function(enable){

    if (enable==true)
    {
        // Opt-in to interactivity
        this.DisplayText.interactive = true;

        this.DisplayText.buttonMode = true;

        this.MaskButton=TiledSprite.MASK_BUTT_ENABLED;
    }
    else
    {
        this.DisplayText.interactive = false;
        this.DisplayText.buttonMode = false;

        this.MaskButton=TiledSprite.MASK_BUTT_NONE;
    }
}
//------------------------------------------------------------//

DisplayStyle.prototype.GetButtStatus=function(){
    return this.MaskButton;
}

//------------------------------------------------------------//
DisplayStyle.prototype.CheckButtStatus=function(flag){

    if ((this.MaskButton&flag)!=0)
    {
        this.MaskButton&=(~flag);
        return true;
    }
    return false;
}
//--------------------------------------------------------------------------//
