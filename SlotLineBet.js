//--------------------------------------------------------------------------//
SlotLineBet.SIDE_SX=0;
SlotLineBet.SIDE_DX=1;
//--------------------------------------------------------------------------//
SlotLineBet.TAB_OFFSET=[
    16*2,
    10*2,
    10*2,
    4*2,
    4*2,
    12*2,
    12*2,
    14*2,
    14*2,
    16*2
];
//--------------------------------------------------------------------------//
function SlotLineBet(id,side,parent_container,app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage = parent_container;
    
    this.ID=id;
    this.Side=side;
    this.SetupX=0;
    this.SetupY=0;
    
    this.Sprite = new TiledSprite("BetDot",window.NUM_LINEE,true,this.ParentStage);
}

// Create a SlotLineBet.prototype object that inherits from SObject.prototype.
SlotLineBet.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotLineBet
SlotLineBet.prototype.constructor = SlotLineBet;

//--------------------------------------------------------------------------//
SlotLineBet.prototype.Init = function() {

    this.Sprite.Setup();
    this.Sprite.SetFrame(this.ID);
    this.Sprite.SetButton(true);

}
//--------------------------------------------------------------------------//
SlotLineBet.prototype.SetView = function(view_type) {
/*    
			if (view_type==0)
				SetMaskFilter(TiledSprite.MASK_STAT_GRAY);
			else
				SetMaskFilter(TiledSprite.MASK_STAT_NONE);
*/    
}
//--------------------------------------------------------------------------//
SlotLineBet.prototype.InitializeCoords = function(xx,yy) {

    if (this.Side==SlotLineBet.SIDE_DX)
    {
        this.SetupX=window.VIDEO_WIDTH-100;
        this.SetupX+=SlotLineBet.TAB_OFFSET[this.ID];
    }
    else
    {
        this.SetupX=24;
        this.SetupX-=SlotLineBet.TAB_OFFSET[this.ID];
    }

    this.Sprite.XX(this.SetupX,0);

    this.SetupY=yy+15;//-20;
    this.Sprite.YY(this.SetupY,0);
}		
//------------------------------------------------------------//
SlotLineBet.prototype.HighLight = function() {
    
    this.Sprite.StopTransform();
    this.Sprite.ResetProperties(true,1.0,1.0);
    this.Sprite.XX(this.SetupX,0);
    this.Sprite.YY(this.SetupY,0);
    this.Sprite.SPRITE_TRANSFORMER().ScaleAndBack(2.0,20,0,SpriteTransformer.MASK_BACK_TO_ORG);
    this.Sprite.SPRITE_TRANSFORMER().LightAndBack(150,20,0);
}
//------------------------------------------------------------//
SlotLineBet.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);

    if (this.Sprite.CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
    {    
        this.OnMouseOver();
    }
    else if (this.Sprite.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
    {    
        this.OnMouseClick();
    }
}
//------------------------------------------------------------//
SlotLineBet.prototype.OnMouseOver = function() {
    
    this.DEBUG_LOG("Ball Bet "+this.ID+"  x:"+this.Sprite.x+"  y:"+this.Sprite.y);
    
    if (this.ApplicationRef.SLOT().REEL_HOLDER().IsAnimazioneVincitaInCorso()==false)
        this.ApplicationRef.SLOT().LINER().PreviewLineaSet(this.ID);
}
//------------------------------------------------------------//
SlotLineBet.prototype.OnMouseClick = function() {
    
    if (this.ApplicationRef.PROGRAMMA().GetFaseCorrente()==Program.ID_FASE_AVVIO)
    {
        this.ApplicationRef.PROGRAMMA().GetSPIN_SET().NotifyClickOnLine((this.ID+1));
    }
}
//------------------------------------------------------------//
SlotLineBet.prototype.VisualizzaPuntatore = function(p_Stato) {
    
    this.Sprite.Visible(true);
/*
    if (p_Stato==0)
        SetMaskFilter(TiledSprite.MASK_STAT_GRAY);
    else
        SetMaskFilter(TiledSprite.MASK_STAT_NONE);
*/        
}
//------------------------------------------------------------//
SlotLineBet.prototype.GetSprite = function() {

    return this.Sprite;
}   
//--------------------------------------------------------------------------//