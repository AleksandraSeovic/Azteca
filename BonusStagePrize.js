//------------------------------------------------------------//
//					STATI GRAFICI
//------------------------------------------------------------//
BonusStagePrize.STATE_DISABLED	=0;
BonusStagePrize.STATE_ENABLED	=1;
BonusStagePrize.STATE_CLICKED	=2;
BonusStagePrize.STATE_OPENING	=3;
BonusStagePrize.STATE_OPENED	=4;
//--------------------------------------------------------------------------//

var BonusStagePrize_GLOBAL_ENABLE=false;
var BonusStagePrize_ID_PICK_SELECTED=0;

//--------------------------------------------------------------------------//
function BonusStagePrize(id,app_reference,parent_container) {    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer=parent_container;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.MainRenderer   = this.ApplicationRef.Renderer;
    this.SlotReference  = null;
    this.Container=new PIXI.Container();
    
    //------------------------------------------------------------//
    this.ID=id;
    this.Step=0;
    //------------------------------------------------------------//		
    this.STATO=BonusStagePrize.STATE_DISABLED;
    this.PRIZE=0;
    this.TYPE =0;
    this.REAL_PRIZE=false;

    this.Back=null;
    this.Res=null;
    this.Prize=null;
    this.Top=null;
}

// Create a BonusStagePrize.prototype object that inherits from SObject.prototype.
BonusStagePrize.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to BonusStagePrize
BonusStagePrize.prototype.constructor = BonusStagePrize;
//--------------------------------------------------------------------------//
BonusStagePrize.prototype.Init = function() {

    this.SlotReference  = this.ApplicationRef.SLOT();
    this.STEP=0;

    if (this.Back!=null)
        this.Back.Setup();
    
    if (this.Res!=null)
        this.Res.Setup();
    
    if (this.Prize!=null)
        this.Prize.Init();
    
    if (this.Top!=null)
        this.Top.Setup();
    
    
    this.ParentContainer.addChild(this.Container);
}		
//------------------------------------------------------------//
BonusStagePrize.prototype.SetupPrize = function() {    
}
//------------------------------------------------------------//
BonusStagePrize.prototype.Open = function(real_prize) {        
    this.REAL_PRIZE=real_prize;

    this.STATO=BonusStagePrize.STATE_OPENING;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.Stop = function() {
    
    //RemoveTransformer();

    this.STATO=BonusStagePrize.STATE_DISABLED;		
}
//------------------------------------------------------------//
BonusStagePrize.prototype.Mount = function() {    
}
//------------------------------------------------------------//
BonusStagePrize.prototype.UnMount = function() {    


    if (this.Top!=null) { this.Top.StopTransform(); this.Top.Visible(false);}
    if (this.Res!=null) { this.Res.StopTransform(); this.Res.Visible(false);}
    if (this.Back!=null) { this.Back.StopTransform(); this.Back.Visible(false);}
    
}
//------------------------------------------------------------//
BonusStagePrize.prototype.IsMounted = function() {
    return true;
/*    
    if (this.Top==null)
        return true;

    if (this.Top.SPRITE_TRANSFORMER().CheckStatus(SpriteTransformer.MASK_FADING)==false)
        return true;

    return false;
*/    
}
//------------------------------------------------------------//
BonusStagePrize.prototype.PlayAction = function() {
    
}		
//------------------------------------------------------------//
BonusStagePrize.prototype.Enable = function() {        
    this.STATO=BonusStagePrize.STATE_ENABLED;
}		
//------------------------------------------------------------//
BonusStagePrize.prototype.Disable = function() {    
    this.STATO=BonusStagePrize.STATE_DISABLED;
}		
//---------------------------------------------------//
BonusStagePrize.prototype.Reset = function() {        
    this.PRIZE=0;
    this.TYPE=0;
    this.Step=0;
    this.STATO=BonusStagePrize.STATE_ENABLED;	

    if (this.Top!=null)
        this.Top.SetMaskFilter(TiledSprite.MASK_STAT_NONE,0);

    this.Container.visible=true;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.get_STATO = function() {            
    return this.STATO;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.set_STATO = function(setValue) {    
    this.STATO=setValue;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.get_PRIZE = function() {        
    return this.PRIZE;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.set_PRIZE = function(setValue) {            
    this.PRIZE = setValue;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.get_TYPE = function() {                
    return this.TYPE;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.set_TYPE = function(setValue) {    
    this.TYPE = setValue;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.Ascii2Digit = function(asc) {        

    var digit=(asc-48);

    return digit;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.GlobalEnable = function(enb) {            
    if (enb==true)
    {
        BonusStagePrize_GLOBAL_ENABLE=true;
    }
    else
    {
        BonusStagePrize_GLOBAL_ENABLE=false;
    }
}
//------------------------------------------------------------//
BonusStagePrize.prototype.TurnOff_Disabled = function() {
    
    if (this.Top!=null)
    {
        this.Top.SetMaskFilter(TiledSprite.MASK_STAT_DARKEN);
        this.Top.SetButton(false);
    }
}		
//------------------------------------------------------------//
BonusStagePrize.prototype.TurnOff_Void = function() {    

    if (this.Top!=null)
    {
        this.Top.SetMaskFilter(TiledSprite.MASK_STAT_GRAY);
        this.Top.SetButton(false);
    }
}		
//------------------------------------------------------------//
BonusStagePrize.prototype.TurnOn = function() {        

    if (this.Top!=null)
    {
        this.Top.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
    }		        
}		
//------------------------------------------------------------//
BonusStagePrize.prototype.TurnOn_Enabled = function() {        

    if (this.Top!=null)
    {
        this.Top.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
        this.Top.SetButton(true);
    }		        
}		
//------------------------------------------------------------//
BonusStagePrize.prototype.IsOn = function() {            
    if (this.Top!=null)
        return ((this.Top.MaskStatus&(TiledSprite.MASK_STAT_DARKEN|TiledSprite.MASK_STAT_GRAY))==0);

    return true;
}
//------------------------------------------------------------//
BonusStagePrize.prototype.Relink = function() {            
    
    this.ParentContainer.removeChild(this.Container);
    this.ParentContainer.addChild(this.Container);
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePrize.prototype.Refresh = function(ellapsed_ms) {
    
    if (this.Back!=null)
        this.Back.Refresh(ellapsed_ms);
    
    if (this.Res!=null)
        this.Res.Refresh(ellapsed_ms);
    
    if (this.Top!=null)
        this.Top.Refresh(ellapsed_ms);
    
}
//------------------------------------------------------------//

//------------------------------------------------------------//
