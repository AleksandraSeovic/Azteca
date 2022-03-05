

//--------------------------------------------------------------------------//
function SpriteTransformerInfo(host_sprite) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SpriteTransformerInfo-specific properties
    this.Host=host_sprite; // Owner Sprite
/*
    ???????
    this.ColorFilter:AdjustColor;
    this.FilterColorMatrix:ColorMatrixFilter;
    this.FlatColorMatrix:Array;
*/
    this.colorMatrix = null;
    this.colorFilter = null;

    //---- Moving Data -----
    this.Starting_xx=0; //:Number;
    this.Starting_yy=0; //:Number;

    this.Starting_WW=0; //:Number;
    this.Starting_HH=0; //:Number;

    this.ResetCoords=false;

    //---- Moving Data -----
    this.Target_xx=0; //:Number;
    this.Target_yy=0; //:Number;

    this.Delta_xx=0; //:Number;
    this.Delta_yy=0; //:Number;

    //---- Alpha Data -----
    this.Alpha_Tgt=0; //:Number;
    this.Alpha_Org=0; //:Number;
    this.Alpha_Tmp=0; //:Number;
    this.Alpha_Step=0; //:Number;

    //---- Anim Data -----
    this.Anim_Frame_Tgt=0; //:uint;
    this.Anim_Frame_Tgt_Org=0; //:uint;
    this.Anim_Flags=0; //:uint;

    //---- Scaling Data -----
    this.Scale_Min=0; //:Number;
    this.Scale_Max=0; //:Number;

    this.ScaleX_Org=0;
    this.ScaleY_Org=0;
    
    this.ScaleX_Tgt=0; //:Number;
    this.ScaleX_Delta=0; //:Number;

    this.ScaleY_Tgt=0; //:Number;
    this.ScaleY_Delta=0; //:Number;

    //---- Lighting Data -----------
    this.Bright_Cur=0; //:int;
    this.Bright_Tgt=0; //:int;
    this.Bright_Tgt_Org=0; //:uint;
    this.Bright_Step=0; //:int;

    //---- Rotation Data -----
    this.AnchorSet=false;
    this.Rotation_Target=0; //:Number;
    this.Rotation_Delta=0; //:Number;
    
    //---- Reset Data ----
    this.End_Visible=0; //:uint;
    this.End_Frame=0; //:uint;
    this.End_Abs_Scale=0; //:Number;
    this.End_Abs_Alpha=0; //:Number;
    this.End_Rel_X=0; //:Number;
    this.End_Rel_Y=0; //:Number;
    this.Org_Anchor=0; //:Number;

    //---- Timer Data -----
    this.TimerMoving=0; //:Number;
    this.TimeMoving=0; //:Number;

    this.TimerAnimation=0; //:Number;
    this.TimeAnimation=0; //:Number;

    this.TimerFade=0; //:Number;
    this.TimeFade=0; //:Number;

    this.TimerLight=0; //:Number;
    this.TimeLight=0; //:Number;

    this.TimerScale=0; //:Number;
    this.TimeScale=0; //:Number;

    this.TimerRotation=0; //:Number;
    this.TimeRotation=0; //:Number;
    
    this.TimerPause=0;
    
    this.Loops=0;
    
    this.StatusFlag=0; //:uint;
    
    /*
    ColorFilter 		= new AdjustColor();
    FilterColorMatrix	= null;
    */
    
    this.Reset();
    
}

// Create a SpriteTransformerInfo.prototype object that inherits from SObject.prototype.
SpriteTransformerInfo.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SpriteTransformer
SpriteTransformerInfo.prototype.constructor = SpriteTransformerInfo;

//--------------------------------------------------------------------------//
SpriteTransformerInfo.prototype.Init = function() {

}
//------------------------------------------------------------//
SpriteTransformerInfo.prototype.ResetColorFilter = function() {    
    /* ???????
    this.ColorFilter.hue = 0;
    this.ColorFilter.saturation = 0;
    this.ColorFilter.brightness = 0;
    this.ColorFilter.contrast = 0;
    */
    this.colorMatrix = 
    [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
    ];
    
    this.colorFilter = new PIXI.filters.ColorMatrixFilter();
    this.colorFilter.matrix = this.colorMatrix;
    
    this.Bright_Cur=1.0;
}
//------------------------------------------------------------//
SpriteTransformerInfo.prototype.Reset = function() {        

    this.StatusFlag=0;
    this.Anim_Flags=0;
    this.TimerAnimation=0;
    this.TimerMoving=0;
    this.TimerFade=0;
    this.TimerLight=0;
    this.TimerRotation=0;
    this.Loops=0;

    this.ResetColorFilter();
}
//------------------------------------------------------------//
SpriteTransformerInfo.prototype.RefreshTimers = function(ellapsed_ms) {        

    ellapsed_ms=this.DeviceEllapsedTime(ellapsed_ms);
    
    this.TimerRefresh(ellapsed_ms);
    
    this.TimerAnimation=this.TimerDec( this.TimerAnimation, ellapsed_ms );
    this.TimerMoving=this.TimerDec( this.TimerMoving,ellapsed_ms );
    this.TimerFade=this.TimerDec( this.TimerFade,ellapsed_ms );
    this.TimerScale=this.TimerDec( this.TimerScale,ellapsed_ms );
    this.TimerLight=this.TimerDec( this.TimerLight,ellapsed_ms );
    this.TimerRotation=this.TimerDec( this.TimerRotation,ellapsed_ms );
    this.TimerPause=this.TimerDec( this.TimerPause,ellapsed_ms );
}
//------------------------------------------------------------//
SpriteTransformerInfo.prototype.ApplyColorFilter = function() {        
/*    
???????
    ColorFilter.brightness=Bright_Cur;

    FlatColorMatrix = ColorFilter.CalculateFinalFlatArray();
    FilterColorMatrix = new ColorMatrixFilter(FlatColorMatrix);

    spr.filters = [FilterColorMatrix];			
*/    
    this.colorFilter.brightness(this.Bright_Cur, false);
    
    this.Host.Sprite.filters = [this.colorFilter];    
}
//------------------------------------------------------------//
SpriteTransformerInfo.prototype.RemoveColorFilter = function() {        
/*    
    ?????????
    this.ResetColorFilter();
    spr.filters=[];
*/    
    this.ResetColorFilter();
    this.Host.Sprite.filters=null;
}
//------------------------------------------------------------//

//--------------------------------------------------------------------------//