
//------------------------------------------------------------//
SpriteTransformer.ACTION_NONE			=0x00000000;
SpriteTransformer.ACTION_MOVE_REL		=0x00000001;
SpriteTransformer.ACTION_MOVE_TOW		=0x00000002;
SpriteTransformer.ACTION_MOVE_ABS		=0x00000003;
SpriteTransformer.ACTION_MOVE_BACK		=0x00000004;
SpriteTransformer.ACTION_FADE_ABS		=0x00000005;
SpriteTransformer.ACTION_FADE_BACK	    =0x00000006;
SpriteTransformer.ACTION_FADE_LOOP	    =0x00000007;
SpriteTransformer.ACTION_SCALE_ABS	    =0x00000008;
SpriteTransformer.ACTION_SCALE_BACK	    =0x00000009;
SpriteTransformer.ACTION_SCALE_LOOP	    =0x0000000A;
SpriteTransformer.ACTION_ANI_REL		=0x0000000B;
SpriteTransformer.ACTION_ANI_TOW		=0x0000000C;
SpriteTransformer.ACTION_ANI_ABS		=0x0000000D;
SpriteTransformer.ACTION_LIGHT_ABS	    =0x0000000E;
SpriteTransformer.ACTION_LIGHT_BACK	    =0x0000000F;
SpriteTransformer.ACTION_LIGHT_LOOP	    =0x00000010;
SpriteTransformer.ACTION_RESET_END	    =0x00000011;
SpriteTransformer.ACTION_ROTATE_ABS     =0x00000020;
SpriteTransformer.ACTION_ROTATE_REL     =0x00000040;
SpriteTransformer.ACTION_ROTATE_LOOP    =0x00000080;
SpriteTransformer.ACTION_DEFORMATE      =0x00000100;
SpriteTransformer.ACTION_PAUSE          =0x00000200;

//------------------------------------------------------------//

SpriteTransformer.MASK_NONE		=0x00000000;

SpriteTransformer.MASK_OFF		=0x00000002;
SpriteTransformer.MASK_ON		=0x00000004;
SpriteTransformer.MASK_FADING_1	=0x00000008;
SpriteTransformer.MASK_FADING_2 =0x00000010;
SpriteTransformer.MASK_FADING_3 =0x00000020;
    SpriteTransformer.MASK_FADING=(SpriteTransformer.MASK_FADING_1|SpriteTransformer.MASK_FADING_2|SpriteTransformer.MASK_FADING_3);

SpriteTransformer.MASK_ANIMATING	=0x00000080;
SpriteTransformer.MASK_CLIPPING	    =0x00000100;
SpriteTransformer.MASK_REDRAW		=0x00000200;
SpriteTransformer.MASK_SCALING_1	=0x00000400;
SpriteTransformer.MASK_SCALING_2	=0x00000800;
SpriteTransformer.MASK_SCALING_3	=0x00001000;
    SpriteTransformer.MASK_SCALING=(SpriteTransformer.MASK_SCALING_1|SpriteTransformer.MASK_SCALING_2|SpriteTransformer.MASK_SCALING_3);

SpriteTransformer.MASK_LIGHTING_1	=0x00002000;
SpriteTransformer.MASK_LIGHTING_2	=0x00004000;
SpriteTransformer.MASK_LIGHTING_3	=0x00008000;
    SpriteTransformer.MASK_LIGHTING=(SpriteTransformer.MASK_LIGHTING_1|SpriteTransformer.MASK_LIGHTING_2|SpriteTransformer.MASK_LIGHTING_3);

SpriteTransformer.MASK_ROTATING_A 	=0x00010000;
SpriteTransformer.MASK_ROTATING_R 	=0x00020000;
SpriteTransformer.MASK_ROTATING_L 	=0x00040000;
    SpriteTransformer.MASK_ROTATING=(SpriteTransformer.MASK_ROTATING_A|SpriteTransformer.MASK_ROTATING_R|SpriteTransformer.MASK_ROTATING_L);

SpriteTransformer.MASK_MOVING_1	=0x00080000;
SpriteTransformer.MASK_MOVING_2 =0x00100000;
SpriteTransformer.MASK_MOVING_3 =0x00200000;
    SpriteTransformer.MASK_MOVING=(SpriteTransformer.MASK_MOVING_1|SpriteTransformer.MASK_MOVING_2|SpriteTransformer.MASK_MOVING_3);

SpriteTransformer.MASK_DEFORMATING   =0x00400000;

SpriteTransformer.MASK_PAUSE	    =0x00800000;

SpriteTransformer.MASK_RESET_END	=0x01000000;
SpriteTransformer.MASK_REMOVE_END	=0x02000000;
SpriteTransformer.MASK_BACK_TO_ORG  =0x04000000;

//---------------------------------------------------------------------------//
SpriteTransformer.ANIMATION_NONE		=0x0000;
SpriteTransformer.ANIMATION_LOOP		=0x0100;
SpriteTransformer.ANIMATION_CLRE		=0x0200;	// Clear at end
SpriteTransformer.ANIMATION_DELT		=0x0800;	// Delete at Trasparent
SpriteTransformer.ANIMATION_LOOPBACK	=0x1000;	// Loop backward

SpriteTransformer.SCALE_FLAG_H		    =0x2000;

//---------------------------------------------------------------------------//

function SpriteTransformer(host_sprite) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SpriteTransformer-specific properties
    this.Host = host_sprite;       // Owner sprite
    this.Transform=new SpriteTransformerInfo(host_sprite);
}

// Create a SpriteTransformer.prototype object that inherits from SObject.prototype.
SpriteTransformer.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SpriteTransformer
SpriteTransformer.prototype.constructor = SpriteTransformer;

//--------------------------------------------------------------------------//
SpriteTransformer.prototype.Init = function() {

}
//------------------------------------------------------------//
SpriteTransformer.prototype.RunAction = function(action,float_parms,uint_parms) {
    
    switch(action)
    {
        case SpriteTransformer.ACTION_MOVE_REL	    :{this.MoveRel 		(float_parms[0],float_parms[1],uint_parms[0],float_parms[2]);}break;
        case SpriteTransformer.ACTION_MOVE_TOW	    :{this.MoveTow 		(float_parms[0],float_parms[1],uint_parms[0],float_parms[2]);}break;
        case SpriteTransformer.ACTION_MOVE_ABS	    :{this.MoveAbs 		(float_parms[0],float_parms[1]);}break;

        case SpriteTransformer.ACTION_FADE_ABS	    :{this.FadeAbs 		(float_parms[0],uint_parms[0],float_parms[1]);}break;
        case SpriteTransformer.ACTION_FADE_BACK	    :{this.FadeAndBack	(float_parms[0],uint_parms[0],float_parms[1]);}break;
        case SpriteTransformer.ACTION_FADE_LOOP	    :{this.FadeLoop		(float_parms[0],uint_parms[0],float_parms[1]);}break;

        case SpriteTransformer.ACTION_LIGHT_ABS	    :{this.LightAbs 	(uint_parms[0],uint_parms[1],float_parms[0]);}break;
        case SpriteTransformer.ACTION_LIGHT_BACK	:{this.LightAndBack	(uint_parms[0],uint_parms[1],float_parms[0]);}break;
        case SpriteTransformer.ACTION_LIGHT_LOOP	:{this.LightLoop	(uint_parms[0],uint_parms[1],float_parms[0]);}break;

        case SpriteTransformer.ACTION_SCALE_ABS	    :{this.ScaleAbs		(float_parms[0],float_parms[1],uint_parms[0],float_parms[2]);}break;
        case SpriteTransformer.ACTION_SCALE_BACK	:{this.ScaleAndBack	(float_parms[0],uint_parms[0],float_parms[1],SpriteTransformer.MASK_BACK_TO_ORG);}break;
        case SpriteTransformer.ACTION_SCALE_LOOP	:{this.ScaleLoop	(float_parms[0],float_parms[1],uint_parms[0],float_parms[2]);}break;

        case SpriteTransformer.ACTION_ANI_REL	 	:{this.AnimateRel	(uint_parms[0],uint_parms[1],float_parms[0]);}break;
        case SpriteTransformer.ACTION_ANI_TOW		:{this.AnimateTow	(uint_parms[0],uint_parms[1],float_parms[0]);}break;
        case SpriteTransformer.ACTION_ANI_ABS		:{this.AnimateAbs	(uint_parms[0],uint_parms[1],uint_parms[2],float_parms[0]);}break;

        case SpriteTransformer.ACTION_RESET_END	    :{this.ResetAtEnd	(uint_parms[0],uint_parms[1],float_parms[0],float_parms[1],float_parms[2],float_parms[3]);}break;
            
        case SpriteTransformer.ACTION_ROTATE_ABS    :{this.RotateAbs    (float_parms[0],uint_parms[0],float_parms[1]);}break;
        case SpriteTransformer.ACTION_ROTATE_REL    :{this.RotateRel    (float_parms[0],uint_parms[0],float_parms[1]);}break;
        case SpriteTransformer.ACTION_ROTATE_LOOP   :{this.RotateLoop   (float_parms[0],uint_parms[0],float_parms[1]);}break;
            
        //                                                                  step_x          step_y        time 
        case SpriteTransformer.ACTION_DEFORMATE     :{this.Deformate   (float_parms[0],float_parms[1],uint_parms[0]);}break;
        
        case SpriteTransformer.ACTION_PAUSE         :{this.Pause(float_parms[0]);}break;
            
        default:break;

    }
}
//---------------------------------------------------------------------------//
// Pause
SpriteTransformer.prototype.Pause = function(time) { 

    this.Transform.TimerPause=time;
    
    this.Transform.StatusFlag|=SpriteTransformer.MASK_PAUSE;
}
//---------------------------------------------------------------------------//
// Ruota l'oggetto in modo assoluto 
SpriteTransformer.prototype.RotateAbs = function(degrees,steps,time) { 
    
    var radians=Lib.radians(degrees);

    steps=this.DeviceSteps(steps);
    
    this.Transform.Rotation_Delta=((radians-this.Host.Sprite.rotation)/Number(steps));
    
    this.Transform.Rotation_Target=radians;
    
    this.Transform.TimeRotation=time;
    this.Transform.TimerRotation=0;
    
    //this.DEBUG_LOG("Rotation to "+this.Transform.Rotation_Target+" delta:"+this.Transform.Rotation_Delta);

    this.AnchorPoint_ON();
    
    this.Transform.StatusFlag|=SpriteTransformer.MASK_ROTATING_A;
}
//---------------------------------------------------------------------------//
// Ruota l'oggetto in modo relativo 
SpriteTransformer.prototype.RotateRel = function(degrees,steps,time) { 

    var radians=Lib.radians(degrees);
    
    steps=this.DeviceSteps(steps);
    
    this.Transform.Rotation_Delta=(radians/Number(steps));
    
    this.Transform.Rotation_Target=Lib.radians(this.Host.Sprite.rotation+radians);
        
    this.Transform.TimeRotation=time;
    this.Transform.TimerRotation=0;

    this.AnchorPoint_ON();
    
    this.Transform.StatusFlag|=SpriteTransformer.MASK_ROTATING_R;
}
//---------------------------------------------------------------------------//
// Ruota l'oggetto in modo loop
SpriteTransformer.prototype.RotateLoop = function(loops,steps,time) { 
    
    var radians=Lib.radians(360.0);

    steps=this.DeviceSteps(steps);
    
    this.Transform.Rotation_Delta=(radians/Number(steps));
    
    if (loops==0)
        this.Transform.Rotation_Target=255.0;
    else
        this.Transform.Rotation_Target=loops;
        
    this.Transform.TimeRotation=time;
    this.Transform.TimerRotation=0;
    
    this.AnchorPoint_ON();

    this.Transform.StatusFlag|=SpriteTransformer.MASK_ROTATING_L;
}
//---------------------------------------------------------------------------//
// Muove l'oggetto relativamente alla posizione corrente
SpriteTransformer.prototype.Deformate= function(step_x,step_y,time) { 
    
    this.Transform.ScaleX_Org=this.Host.Sprite.scale.x;
    this.Transform.ScaleY_Org=this.Host.Sprite.scale.y;

    this.Transform.Starting_xx=this.Host.Sprite.x;
    this.Transform.Starting_yy=this.Host.Sprite.y;
    
    this.Transform.ScaleX_Delta=this.DeviceEllapsedTime(step_x);
    this.Transform.ScaleY_Delta=this.DeviceEllapsedTime(step_y);
    
    this.ScaleX_Tgt=0; // Counter
    
    this.Transform.TimeScale=time;
    this.Transform.TimerScale=0;
    
    this.Transform.Loops=0;
    
    this.AnchorPoint_ON();

    this.Transform.StatusFlag|=SpriteTransformer.MASK_DEFORMATING;
    
    this.Transform.ResetCoords=true;
}
//--------------------------------------------------------------------------//
// 0.04
SpriteTransformer.prototype.ACTION_Deformate = function() {
    
    var loops;
    
    if (this.Transform.TimerScale!=0)
        return;
    
    this.Host.Sprite.scale.x = 1 + Math.sin(this.ScaleX_Tgt) * this.Transform.ScaleX_Delta;
    this.Host.Sprite.scale.y = 1 + Math.cos(this.ScaleX_Tgt) * this.Transform.ScaleY_Delta;

    this.ScaleX_Tgt += 0.1;
    
    loops=parseInt( this.ScaleX_Tgt/3.14 );
    
    if (loops!=this.Transform.Loops)
        this.Transform.Loops++;
        
/*    
    if (this.ScaleX_Tgt>=(3*3.14))
    {
        this.Stop();
    }
    else
*/    
        this.Transform.TimerScale=this.Transform.TimeScale;    
}
//---------------------------------------------------------------------------//
// Muove l'oggetto relativamente alla posizione corrente
SpriteTransformer.prototype.GetLoops= function() { 
    return this.Transform.Loops;
}
//---------------------------------------------------------------------------//
// Muove l'oggetto relativamente alla posizione corrente
SpriteTransformer.prototype.MoveEx= function(rel_xx,rel_yy,steps,time) { 

    steps=this.DeviceSteps(steps);
    
    this.Transform.Starting_xx=this.Host.Sprite.x;
    this.Transform.Starting_yy=this.Host.Sprite.y;

    this.Transform.Target_xx=this.Host.Sprite.x+rel_xx;
    this.Transform.Target_yy=this.Host.Sprite.y+rel_yy;

    this.Transform.Delta_xx=(this.Transform.Target_xx-this.Host.Sprite.x)/steps;
    if (this.Transform.Delta_xx==0 && this.Transform.Target_xx!=this.Host.Sprite.x)
    {
        if (this.Transform.Target_xx<this.Host.Sprite.x)
            this.Transform.Delta_xx=-1;
        else
            this.Transform.Delta_xx=1;
    }

    this.Transform.Delta_yy=(this.Transform.Target_yy-this.Host.Sprite.y)/steps;
    if (this.Transform.Delta_yy==0 && this.Transform.Target_yy!=this.Host.Sprite.y)
    {
        if (this.Transform.Target_yy<this.Host.Sprite.y)
            this.Transform.Delta_yy=-1;
        else
            this.Transform.Delta_yy=1;
    }

    this.Transform.TimeMoving=time;
    this.Transform.TimerMoving=0;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_MOVING_1|SpriteTransformer.MASK_MOVING_3;
}

//---------------------------------------------------------------------------//
// Muove l'oggetto relativamente alla posizione corrente
SpriteTransformer.prototype.MoveRel = function(rel_xx,rel_yy,steps,time) { 

    steps=this.DeviceSteps(steps);
    
    this.Transform.Starting_xx=this.Host.Sprite.x;
    this.Transform.Starting_yy=this.Host.Sprite.y;

    this.Transform.Target_xx=this.Host.Sprite.x+rel_xx;
    this.Transform.Target_yy=this.Host.Sprite.y+rel_yy;

    this.Transform.Delta_xx=(this.Transform.Target_xx-this.Host.Sprite.x)/steps;
    if (this.Transform.Delta_xx==0 && this.Transform.Target_xx!=this.Host.Sprite.x)
    {
        if (this.Transform.Target_xx<this.Host.Sprite.x)
            this.Transform.Delta_xx=-1;
        else
            this.Transform.Delta_xx=1;
    }

    this.Transform.Delta_yy=(this.Transform.Target_yy-this.Host.Sprite.y)/steps;
    if (this.Transform.Delta_yy==0 && this.Transform.Target_yy!=this.Host.Sprite.y)
    {
        if (this.Transform.Target_yy<this.Host.Sprite.y)
            this.Transform.Delta_yy=-1;
        else
            this.Transform.Delta_yy=1;
    }

    this.Transform.TimeMoving=time;
    this.Transform.TimerMoving=0;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_MOVING_1;
}
//---------------------------------------------------------------------------//
// Muove l'oggetto verso le coordinate assolute indicate
SpriteTransformer.prototype.MoveTow = function(tgt_xx,tgt_yy,steps,time) {     

    steps=this.DeviceSteps(steps);
    
    this.Transform.Starting_xx=this.Host.Sprite.x;
    this.Transform.Starting_yy=this.Host.Sprite.y;

    this.Transform.Target_xx=tgt_xx;
    this.Transform.Target_yy=tgt_yy;

    this.Transform.Delta_xx=(this.Transform.Target_xx-this.Host.Sprite.x)/steps;
    if (this.Transform.Delta_xx==0 && this.Transform.Target_xx!=this.Host.Sprite.x)
    {
        if (this.Transform.Target_xx<this.Host.Sprite.x)
            this.Transform.Delta_xx=-1;
        else
            this.Transform.Delta_xx=1;
    }

    this.Transform.Delta_yy=(this.Transform.Target_yy-this.Host.Sprite.y)/steps;
    if (this.Transform.Delta_yy==0 && this.Transform.Target_yy!=this.Host.Sprite.y)
    {
        if (this.Transform.Target_yy<this.Host.Sprite.y)
            this.Transform.Delta_yy=-1;
        else
            this.Transform.Delta_yy=1;
    }

    this.Transform.TimeMoving=time;
    this.Transform.TimerMoving=0;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_MOVING_1;
}
//---------------------------------------------------------------------------//
// Sposta l'oggetto nella posizione indicata
SpriteTransformer.prototype.MoveAbs = function(abs_xx,abs_yy) {     
    
    this.Transform.Starting_xx=this.Host.Sprite.x;
    this.Transform.Starting_yy=this.Host.Sprite.y;

    this.Transform.Target_xx=abs_xx;
    this.Transform.Target_yy=abs_yy;

    this.Transform.Delta_xx=(this.Transform.Target_xx-this.Host.Sprite.x)/1;
    this.Transform.Delta_yy=(this.Transform.Target_yy-this.Host.Sprite.y)/1;

    this.Transform.TimerMoving=0;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_MOVING_1;
}
//---------------------------------------------------------------------------//
// Fade ON-OFF
// TgtAlphaLevel (1.0-OPACO , 0.0-TRASPARENTE)
SpriteTransformer.prototype.FadeAbs = function(TgtAlphaLevel,steps,time) {

    steps=this.DeviceSteps(steps);
    
    this.Transform.TimeFade=time;
    this.Transform.TimerFade=0;

    this.Transform.Alpha_Org=this.Host.Sprite.alpha;
    this.Transform.Alpha_Tgt=TgtAlphaLevel;

    var pp=((TgtAlphaLevel-this.Host.Sprite.alpha)/steps);
    
    this.Transform.Alpha_Step=pp;

    //this.DEBUG_LOG("FADING "+this.Transform.Alpha_Tgt+" "+this.Host.Sprite.alpha+" "+pp);        
    
    if (this.Transform.Alpha_Step==0.0 && TgtAlphaLevel!=this.Host.Sprite.alpha)
    {
        if (TgtAlphaLevel<this.Host.Sprite.alpha)
            this.Transform.Alpha_Step=-0.01;
        else
            this.Transform.Alpha_Step=0.01;
    }

    this.Transform.StatusFlag|=SpriteTransformer.MASK_FADING_1;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.FadeAndBack = function(TgtAlphaLevel,steps,time) {

    steps=this.DeviceSteps(steps);
    
    this.FadeAbs(TgtAlphaLevel,steps,time);
    this.Transform.StatusFlag|=SpriteTransformer.MASK_FADING_2;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.FadeLoop = function(TgtAlphaLevel,steps,time) {

    steps=this.DeviceSteps(steps);
    
    this.FadeAbs(TgtAlphaLevel,steps,time);
    this.Transform.StatusFlag|=(SpriteTransformer.MASK_FADING_1|SpriteTransformer.MASK_FADING_3);
}
//---------------------------------------------------------------------------//
// Brightness work
// TgtBrightnessLevel : -100 - +100
SpriteTransformer.prototype.LightAbs = function(TgtBrightnessLevel,steps,time) {

    steps=this.DeviceSteps(steps);
    
    this.Transform.TimeLight=time;
    this.Transform.TimerLight=0;

    if (TgtBrightnessLevel>10)
        TgtBrightnessLevel=10;
        
    this.Transform.Bright_Tgt=TgtBrightnessLevel;

    this.Transform.Bright_Step=(TgtBrightnessLevel/steps);

    if (this.Transform.Bright_Step==0 && TgtBrightnessLevel!=0)
    {
        if (TgtBrightnessLevel<0)
            this.Transform.Bright_Step=-0.01;
        else
            this.Transform.Bright_Step=0.01;
    }

    this.DEBUG_LOG("LIGHTING "+this.Transform.Bright_Tgt+" "+this.Transform.Bright_Step);
    
    this.Transform.StatusFlag|=SpriteTransformer.MASK_LIGHTING_1;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.LightAndBack = function(TgtBrightnessLevel,steps,time) {
    
    this.LightAbs(TgtBrightnessLevel,steps,time);
    this.Transform.StatusFlag|=SpriteTransformer.MASK_LIGHTING_2;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.LightLoop = function(TgtBrightnessLevel,steps,time) {
    
    this.LightAbs(TgtBrightnessLevel,steps,time);

    this.Transform.Bright_Tgt_Org=TgtBrightnessLevel;
    this.Transform.StatusFlag|=(SpriteTransformer.MASK_LIGHTING_1|SpriteTransformer.MASK_LIGHTING_3);
}
//---------------------------------------------------------------------------//
// Scale
SpriteTransformer.prototype.ScaleAbs = function(scaleX_tgt,scaleY_tgt,steps,time,flags) {

    steps=this.DeviceSteps(steps);
    
    this.Transform.Anim_Flags=flags;

    this.Transform.ScaleX_Org=this.Host.Sprite.scale.x;
    this.Transform.ScaleY_Org=this.Host.Sprite.scale.y;
    
    this.Transform.Starting_WW=this.Host.FrameW*this.Host.Sprite.scale.x;
    this.Transform.Starting_HH=this.Host.FrameH*this.Host.Sprite.scale.y;

    this.Transform.Starting_xx=this.Host.Sprite.x;
    this.Transform.Starting_yy=this.Host.Sprite.y;

    this.Transform.TimeScale=time;
    this.Transform.TimerScale=0;

    this.Transform.ScaleX_Tgt=scaleX_tgt;
    this.Transform.ScaleX_Delta=((scaleX_tgt-this.Host.Sprite.scale.x)/steps);

    //this.DEBUG_LOG("SCALING "+this.Transform.ScaleX_Tgt+" "+this.Transform.ScaleX_Delta+" "+this.Transform.ScaleY_Delta);
    
    if (this.Transform.ScaleX_Delta==0 && scaleX_tgt!=this.Host.Sprite.scale.x)
    {
        if (scaleX_tgt<this.Host.Sprite.scale.x)
            this.Transform.ScaleX_Delta=-0.1;
        else
            this.Transform.ScaleX_Delta=0.1;
    }
    //this.DEBUG_LOG("SCALING "+this.Transform.Starting_WW+" "+this.Transform.Starting_xx+" "+this.Transform.ScaleX_Tgt+" "+this.Transform.ScaleX_Delta);       

    
    this.Transform.ScaleY_Tgt=scaleY_tgt;
    this.Transform.ScaleY_Delta=((scaleY_tgt-this.Host.Sprite.scale.y)/steps);
    
    if (this.Transform.ScaleY_Delta==0 && scaleY_tgt!=this.Host.Sprite.scale.y)
    {
        if (scaleY_tgt<this.Host.Sprite.scale.y)
            this.Transform.ScaleY_Delta=-0.1;
        else
            this.Transform.ScaleY_Delta=0.1;
    }

    //this.DEBUG_LOG("SCALING "+this.Transform.ScaleX_Delta+" "+this.Transform.ScaleY_Delta);
    //this.DEBUG_LOG("SCALING "+this.Transform.Starting_HH+" "+this.Transform.Starting_yy+" "+this.Transform.ScaleY_Tgt+" "+this.Transform.ScaleY_Delta);       
    
    
    this.Transform.StatusFlag|=SpriteTransformer.MASK_SCALING_1;

    this.Transform.ResetCoords=false;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.ScaleAndBack = function(scale_tgt,steps,time,flags) {

    this.Transform.Scale_Min=this.Host.Sprite.scale.x;
    this.Transform.Scale_Max=scale_tgt;

    this.ScaleAbs(scale_tgt,scale_tgt,steps,time,flags);

    this.Transform.StatusFlag|=SpriteTransformer.MASK_SCALING_2;

    if ((flags&SpriteTransformer.MASK_BACK_TO_ORG)!=0)
        this.Transform.ResetCoords=true;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.ScaleAndGoto = function(scale_tgt,scale_bck,steps,time,flags) {
    
    this.Transform.Scale_Min=scale_bck;
    this.Transform.Scale_Max=scale_tgt;

    this.ScaleAbs(scale_tgt,scale_tgt,steps,time,SpriteTransformer.MASK_NONE);

    this.Transform.StatusFlag|=SpriteTransformer.MASK_SCALING_2;

    if ((flags&SpriteTransformer.MASK_BACK_TO_ORG)!=0)
        this.Transform.ResetCoords=true;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.ScaleLoop = function(scale_min,scale_max,steps,time,flags) {
    
    this.Transform.Scale_Min=scale_min;
    this.Transform.Scale_Max=scale_max;

    this.ScaleAbs(scale_max,scale_max,steps,time,flags);

    this.Transform.StatusFlag|=(SpriteTransformer.MASK_SCALING_1|SpriteTransformer.MASK_SCALING_3);

    if ((flags&SpriteTransformer.MASK_BACK_TO_ORG)!=0)
        this.Transform.ResetCoords=true;
}
//---------------------------------------------------------------------------//
// Play dell'animazione dal frame corrente per il numero di frames dati
SpriteTransformer.prototype.AnimateRel = function(num_frames,ani_flags,time) {
    
    this.Transform.Anim_Frame_Tgt=(this.Host.CurFrame+num_frames);

    this.Transform.TimeAnimation=time;
    this.Transform.TimerAnimation=0;

    this.Transform.Anim_Flags=ani_flags;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_ANIMATING;
}
//---------------------------------------------------------------------------//
// Play dell'animazione dal frame corrente al numero di frame dato
SpriteTransformer.prototype.AnimateRel = function(to_frame,ani_flags,time) {
    
    this.Transform.Anim_Frame_Tgt=to_frame;

    this.Transform.TimeAnimation=time;
    this.Transform.TimerAnimation=0;

    this.Transform.Anim_Flags=ani_flags;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_ANIMATING;
}
//---------------------------------------------------------------------------//
// Play dell'animazione dal frame dato al frame dato
SpriteTransformer.prototype.AnimateAbs = function(from_frame,to_frame,ani_flags,time) {
  
    this.Host.SetFrame(from_frame);

    this.Transform.Anim_Frame_Tgt=to_frame;

    this.Transform.TimeAnimation=time;
    this.Transform.TimerAnimation=0;

    this.Transform.Anim_Flags=ani_flags;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_ANIMATING;
    
}
//---------------------------------------------------------------------------//
// Ripristina al termine di tutto con le caratteristiche date
SpriteTransformer.prototype.ResetAtEnd = function(set_visible,set_frame,rel_x,rel_y,abs_alpha,abs_scale) {
    
    this.Transform.End_Visible=set_visible;
    this.Transform.End_Frame=set_frame;

    this.Transform.End_Abs_Scale=abs_scale;
    this.Transform.End_Abs_Alpha=abs_alpha;
    this.Transform.End_Rel_X=rel_x;
    this.Transform.End_Rel_Y=rel_y;

    this.Transform.StatusFlag|=SpriteTransformer.MASK_RESET_END;
}
//---------------------------------------------------------------------------//
// Ripristina al termine di tutto con le caratteristiche date
SpriteTransformer.prototype.RemoveAtEnd = function() {
    
   this.Transform.StatusFlag|=SpriteTransformer.MASK_REMOVE_END;
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.GetStatus = function() {
    
    return (this.Transform.StatusFlag&(~SpriteTransformer.MASK_ROTATING));
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.CheckStatus = function(msk) {
    
    return ((this.Transform.StatusFlag&msk)!=0);
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.Stop = function() {

    if((this.Transform.StatusFlag&(SpriteTransformer.MASK_ROTATING|SpriteTransformer.MASK_DEFORMATING))!=0)
    {   
        this.AnchorPoint_OFF();
    }
    
    if (this.Transform.ResetCoords==true)
    {
        if(this.Transform.StatusFlag&(SpriteTransformer.MASK_SCALING|SpriteTransformer.MASK_DEFORMATING)!=0)
        {    
            this.Host.Sprite.scale.x=this.Transform.ScaleX_Org;
            this.Host.Sprite.scale.y=this.Transform.ScaleY_Org;
        }
        
        this.Host.Sprite.x=this.Transform.Starting_xx;
        this.Host.Sprite.y=this.Transform.Starting_yy;
        this.Transform.ResetCoords=false;
    }

    
    this.Transform.RemoveColorFilter();
    
    this.Transform.StatusFlag=SpriteTransformer.MASK_NONE;
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.Refresh = function(ellapsed_ms) {

    this.Transform.RefreshTimers(ellapsed_ms);
    
    // PAUSING
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_PAUSE)!=0)
    {
        if (this.Transform.TimerPause!=0)
            return;
        
        this.Transform.StatusFlag&=(~SpriteTransformer.MASK_PAUSE);
    }
    
    // ANIMATING
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_ANIMATING)!=0)
    {
        this.ACTION_Animate();
    }

    // MOVING EX
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_MOVING_3)==SpriteTransformer.MASK_MOVING_3)
    {
        this.ACTION_MoveEx();
    }
    
    // MOVING
    else if ((this.Transform.StatusFlag&SpriteTransformer.MASK_MOVING_1)!=0)
    {
        this.ACTION_Move();
    }

    // FADING
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_FADING)!=0)
    {
        this.ACTION_Fade();
    }

    // SCALING
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_SCALING)!=0)
    {
        this.ACTION_Scale();
    }

    // LIGHTING
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_LIGHTING)!=0)
    {
        this.ACTION_Light();
    }

    // ROTATING
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_ROTATING)!=0)
    {
        this.ACTION_Rotate();
    }
    
    // DEFORMING
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_DEFORMATING)!=0)
    {
        this.ACTION_Deformate();
    }
    
    // RESET_END
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_RESET_END)!=0)
    {
        this.ACTION_ResetAtEnd();
    }
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_Animate = function() {
    
    var Update=false;

    if (this.Transform.TimerAnimation!=0)
        return;

    if (this.Transform.Anim_Frame_Tgt>this.Host.CurFrame)
    {
        this.Host.SetFrame( ++this.Host.CurFrame );

        Update=true;
    }
    else if (this.Transform.Anim_Frame_Tgt<this.Host.CurFrame)
    {
        this.Host.SetFrame( --this.Host.CurFrame );
        
        Update=true;
    }
    else
    {
        // LOOP at end?
        if ((this.Transform.Anim_Flags&SpriteTransformer.ANIMATION_LOOP)!=0)
        {
            this.Host.CurFrame=(this.Transform.Anim_Flags&(~SpriteTransformer.ANIMATION_LOOP));
            
            this.Host.SetFrame(this.Host.CurFrame );
            
            Update=true;
        }
        // LOOP BACKWARD at end?
        else if ((this.Transform.Anim_Flags&SpriteTransformer.ANIMATION_LOOPBACK)!=0)
        {
            // Già concluso il riavvolgimento?
            if (this.Host.CurFrame==(this.Transform.Anim_Flags&(~SpriteTransformer.ANIMATION_LOOPBACK)))
            {
                this.Host.CurFrame++;

                this.Transform.Anim_Frame_Tgt=this.Transform.Anim_Frame_Tgt_Org;
            }
            // Deve iniziare il riavvolgimento
            else
            {
                this.Host.CurFrame--;
                
                this.Transform.Anim_Frame_Tgt_Org = this.Transform.Anim_Frame_Tgt;

                this.Transform.Anim_Frame_Tgt=(this.Transform.Anim_Flags&(~SpriteTransformer.ANIMATION_LOOPBACK));
            }

            Update=true;
        }
        else 
        {
            // CLR at end?
            if ((this.Transform.Anim_Flags&SpriteTransformer.ANIMATION_CLRE)!=0)
            {
                this.Host.Visible(false);
            }
            // DEL at Trasparent
            else if ((this.Transform.Anim_Flags&SpriteTransformer.ANIMATION_DELT)!=0 && this.Host.Sprite.alpha==0)
            {
                this.Host.Visible(false);
            }
        }
    }

    if (Update==true)
    {
        this.Host.SetFrame( this.Host.CurFrame );

        this.Transform.TimerAnimation=this.ArmaTimer(this.Transform.TimerAnimation,this.Transform.TimeAnimation);
    }
    else
    {
        this.Transform.TimerAnimation=0;

        this.Transform.StatusFlag&=(~SpriteTransformer.MASK_ANIMATING);
    }
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_Rotate = function() {

    var Rotating=true;

    if (this.Transform.TimerRotation!=0)
        return;

    //this.DEBUG_LOG("Rotation to "+this.Transform.Rotation_Target+" delta:"+this.Transform.Rotation_Delta);
    
    
    if ((this.Transform.StatusFlag&SpriteTransformer.MASK_ROTATING_L)!=0)
    {
        this.Host.Sprite.rotation+=this.Transform.Rotation_Delta;
        
        if (this.Transform.Rotation_Target!=255.0)
        {
            if (this.Host.Sprite.rotation>=Lib.radians(360.0))
            {
                this.Host.Sprite.rotation-=Lib.radians(360.0);
                
                if (this.Transform.Rotation_Target!=0)
                    this.Transform.Rotation_Target--;
                
                if (this.Transform.Rotation_Target==0)
                    Rotating=false;
            }        
        }        
    }
    else
    {
        this.Host.Sprite.rotation+=this.Transform.Rotation_Delta;
        
        if (this.Transform.Rotation_Delta<0 && this.Host.Sprite.rotation<=this.Transform.Rotation_Target)
        {
            Rotating=false;
        }        
        else if (this.Transform.Rotation_Delta>0 && this.Host.Sprite.rotation>=this.Transform.Rotation_Target)
        {
            Rotating=false;
        }        
        
    }
        

    if (Rotating==true)
    {
        this.Transform.TimerRotating=this.ArmaTimer(this.Transform.TimerRotating,this.Transform.TimeRotating);
    }
    else
    {
        this.Transform.TimerMoving=0;

        this.Transform.StatusFlag&=(~SpriteTransformer.MASK_ROTATING);
        
        this.AnchorPoint_OFF();
        
        //this.DEBUG_LOG("Rotation end.");
    }
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_MoveEx = function() {
    
    var MoveX,MoveY;
    var old_xx,old_yy;

    if (this.Transform.TimerMoving!=0)
        return;

    MoveX=false;
    MoveY=false;

    old_xx=this.Host.Sprite.x;
    old_yy=this.Host.Sprite.y;

    if (this.Host.Sprite.x!=this.Transform.Target_xx && this.Transform.Delta_xx!=0)
    {
        this.Host.Sprite.x+=this.Transform.Delta_xx;

        if (this.Transform.Delta_xx<0)
        {
            if (this.Host.Sprite.x<this.Transform.Target_xx)
                this.Host.Sprite.x=this.Transform.Target_xx;
        }
        else
        {
            if (this.Host.Sprite.x>this.Transform.Target_xx)
                this.Host.Sprite.x=this.Transform.Target_xx;
        }

        MoveX=true;
    }

    if (this.Host.Sprite.y!=this.Transform.Target_yy && this.Transform.Delta_yy!=0)
    {
        this.Host.Sprite.y+=this.Transform.Delta_yy;

        if (this.Transform.Delta_yy<0)
        {
            if (this.Host.Sprite.y<this.Transform.Target_yy)
                this.Host.Sprite.y=this.Transform.Target_yy;
        }
        else
        {
            if (this.Host.Sprite.y>this.Transform.Target_yy)
                this.Host.Sprite.y=this.Transform.Target_yy;
        }

        MoveY=true;
    }

    if (MoveX==false && MoveY==false)
    {
        if ((this.Transform.StatusFlag&SpriteTransformer.MASK_MOVING_1)!=0)        
        {
            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_MOVING_1);

            this.Transform.StatusFlag|=SpriteTransformer.MASK_MOVING_2;
            
            this.End_Rel_X=this.Transform.Target_xx;
            this.End_Rel_Y=this.Transform.Target_yy;
            
            this.Transform.Target_xx=this.Transform.Starting_xx;
            
            this.Transform.Target_yy=this.Transform.Starting_yy;
            
        }            
        else
        {
            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_MOVING_2);

            this.Transform.StatusFlag|=SpriteTransformer.MASK_MOVING_1;

            this.Host.Sprite.x=this.Transform.Target_xx;
            this.Host.Sprite.y=this.Transform.Target_yy;
            
            this.Transform.Target_xx=this.End_Rel_X;
            this.Transform.Target_yy=this.End_Rel_Y;
        }
        
       this.Transform.Delta_xx*=-1;
       this.Transform.Delta_yy*=-1;
    }

    this.Transform.TimerMoving=this.ArmaTimer(this.Transform.TimerMoving,this.Transform.TimeMoving);
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_Move = function() {
    
    var MoveX,MoveY;
    var old_xx,old_yy;

    if (this.Transform.TimerMoving!=0)
        return;

    MoveX=false;
    MoveY=false;

    old_xx=this.Host.Sprite.x;
    old_yy=this.Host.Sprite.y;

    if (this.Host.Sprite.x!=this.Transform.Target_xx && this.Transform.Delta_xx!=0)
    {
        this.Host.Sprite.x+=this.Transform.Delta_xx;

        if (this.Transform.Delta_xx<0)
        {
            if (this.Host.Sprite.x<this.Transform.Target_xx)
                this.Host.Sprite.x=this.Transform.Target_xx;
        }
        else
        {
            if (this.Host.Sprite.x>this.Transform.Target_xx)
                this.Host.Sprite.x=this.Transform.Target_xx;
        }

        MoveX=true;
    }

    if (this.Host.Sprite.y!=this.Transform.Target_yy && this.Transform.Delta_yy!=0)
    {
        this.Host.Sprite.y+=this.Transform.Delta_yy;

        if (this.Transform.Delta_yy<0)
        {
            if (this.Host.Sprite.y<this.Transform.Target_yy)
                this.Host.Sprite.y=this.Transform.Target_yy;
        }
        else
        {
            if (this.Host.Sprite.y>this.Transform.Target_yy)
                this.Host.Sprite.y=this.Transform.Target_yy;
        }

        MoveY=true;
    }

    if (MoveX==true || MoveY==true)
    {
        this.Transform.TimerMoving=this.ArmaTimer(this.Transform.TimerMoving,this.Transform.TimeMoving);
    }
    else
    {
        this.Transform.TimerMoving=0;

        this.Transform.StatusFlag&=(~SpriteTransformer.MASK_MOVING);
    }
    
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_Fade = function() {
    
    var Update=false;

    if (this.Transform.TimerFade!=0)
        return;

    if (this.Transform.Alpha_Tgt!=this.Host.Sprite.alpha)
    {
        Update=true;

        this.Host.Sprite.alpha+=this.Transform.Alpha_Step;
        
        if (this.Transform.Alpha_Step<0)
        {
            if (this.Host.Sprite.alpha<this.Transform.Alpha_Tgt)
                this.Host.Sprite.alpha=this.Transform.Alpha_Tgt;
        }
        else
        {
            if (this.Host.Sprite.alpha>this.Transform.Alpha_Tgt)
                this.Host.Sprite.alpha=this.Transform.Alpha_Tgt;
        }

        if (this.Host.Sprite.alpha>1.0)
        {
            this.Host.Sprite.alpha=1.0;
            this.Transform.Alpha_Tgt=1.0;
        }
        else if (this.Host.Sprite.alpha<0)
        {
            this.Host.Sprite.alpha=0;
            this.Transform.Alpha_Tgt=0;
        }
    }

    if (Update==false)
    {
        // Deve loopare?
        if ((this.Transform.StatusFlag&SpriteTransformer.MASK_FADING_3)!=0)
        {
            if ((this.Transform.StatusFlag&SpriteTransformer.MASK_FADING_1)!=0)
            {
                this.Transform.StatusFlag&=(~SpriteTransformer.MASK_FADING_1);
                
                this.Transform.Alpha_Tmp=this.Transform.Alpha_Tgt;
                
                this.Transform.Alpha_Tgt=this.Transform.Alpha_Org;

                this.Transform.StatusFlag|=SpriteTransformer.MASK_FADING_2;
            }
            else
            {
                this.Host.Sprite.alpha=this.Transform.Alpha_Tgt;
                
                this.Transform.Alpha_Tgt=this.Transform.Alpha_Tmp;

                this.Transform.StatusFlag&=(~SpriteTransformer.MASK_FADING_2);
                this.Transform.StatusFlag|=SpriteTransformer.MASK_FADING_1;
            }
            
            this.Transform.Alpha_Step*=-1.0;
        }
        // Deve tornare all'origine?
        else if ((this.Transform.StatusFlag&SpriteTransformer.MASK_FADING_2))
        {
            this.Host.Sprite.alpha=this.Transform.Alpha_Tgt;

            this.Transform.Alpha_Tgt=this.Transform.Alpha_Tmp;

            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_FADING_2);
            this.Transform.StatusFlag|=SpriteTransformer.MASK_FADING_1;
            
            this.Transform.Alpha_Step*=-1.0;
        }
        else
        {
            this.Transform.TimerFade=0;
            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_FADING);
        }
    }
    
    this.Transform.TimerFade=this.ArmaTimer(this.Transform.TimerFade,this.Transform.TimeFade);
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_Scale = function() {
    
    var Update=false;
    var old_W,old_H;
    
    if (this.Transform.TimerScale!=0)
        return;

    old_H=this.Host.FrameH*this.Host.Sprite.scale.y;

    old_W=this.Host.FrameW*this.Host.Sprite.scale.x;
    
    if (this.Transform.ScaleX_Tgt!=this.Host.Sprite.scale.x)
    {
        //this.DEBUG_LOG("SCALING X "+this.Transform.ScaleX_Tgt+" "+this.Host.Sprite.scale.x+" "+this.Transform.ScaleX_Delta);
        
        Update=true;

        this.Host.Sprite.scale.x+=this.Transform.ScaleX_Delta;

        if (this.Transform.ScaleX_Delta<0)
        {
            if (this.Host.Sprite.scale.x<this.Transform.ScaleX_Tgt)
                this.Host.Sprite.scale.x=this.Transform.ScaleX_Tgt;

        }
        else
        {
            if (this.Host.Sprite.scale.x>this.Transform.ScaleX_Tgt)
                this.Host.Sprite.scale.x=this.Transform.ScaleX_Tgt;
        }

        this.RecenterX (old_W);
    }

    if (this.Transform.ScaleY_Tgt!=this.Host.Sprite.scale.y)
    {
        //this.DEBUG_LOG("SCALING Y "+this.Transform.ScaleY_Tgt+" "+this.Host.Sprite.scale.y+" "+this.Transform.ScaleY_Delta);
        
        Update=true;

        this.Host.Sprite.scale.y+=this.Transform.ScaleY_Delta;

        if (this.Transform.ScaleY_Delta<0)
        {
            if (this.Host.Sprite.scale.y<this.Transform.ScaleY_Tgt)
                this.Host.Sprite.scale.y=this.Transform.ScaleY_Tgt;

        }
        else
        {
            if (this.Host.Sprite.scale.y>this.Transform.ScaleY_Tgt)
                this.Host.Sprite.scale.y=this.Transform.ScaleY_Tgt;
        }

        this.RecenterY (old_H);
    }


    if (Update==true)
    {
        this.Transform.TimerScale=this.ArmaTimer(this.Transform.TimerScale,this.Transform.TimeScale);
    }
    else
    {
        this.Transform.TimerScale=0;

        // Deve loopare?
        if ((this.Transform.StatusFlag&SpriteTransformer.MASK_SCALING_3))
        {
            this.Transform.ScaleX_Delta*=-1.0;
            this.Transform.ScaleY_Delta*=-1.0;
            
            if ((this.Transform.StatusFlag&SpriteTransformer.MASK_SCALING_1)!=0)
            {
                this.Transform.ScaleX_Tgt=this.Transform.Scale_Min;
                this.Transform.ScaleY_Tgt=this.Transform.Scale_Min;

                this.Transform.StatusFlag&=(~SpriteTransformer.MASK_SCALING_1);
                this.Transform.StatusFlag|=SpriteTransformer.MASK_SCALING_2;
            }
            else
            {
                //this.Host.Sprite.x=this.Transform.Starting_xx;
                //this.Host.Sprite.y=this.Transform.Starting_yy;

                this.Transform.ScaleX_Tgt=this.Transform.Scale_Max;
                this.Transform.ScaleY_Tgt=this.Transform.Scale_Max;

                this.Transform.StatusFlag&=(~SpriteTransformer.MASK_SCALING_2);
                this.Transform.StatusFlag|=SpriteTransformer.MASK_SCALING_1;
            }
        }
        // Deve tornare all'origine?
        else if ((this.Transform.StatusFlag&SpriteTransformer.MASK_SCALING_2))
        {
            this.Transform.ScaleX_Tgt=this.Transform.Scale_Min;
            this.Transform.ScaleY_Tgt=this.Transform.Scale_Min;

            this.Transform.ScaleX_Delta*=-1.0;
            this.Transform.ScaleY_Delta*=-1.0;

            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_SCALING);
            this.Transform.StatusFlag|=SpriteTransformer.MASK_SCALING_1;
        }
        else
        {
            if (this.Transform.ResetCoords==true)
            {
                this.Host.Sprite.x=this.Transform.Starting_xx;
                this.Host.Sprite.y=this.Transform.Starting_yy;
            }

            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_SCALING);
        }
    }
    
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_Light = function() {
/*    
    this.Transform.Bright_Cur+=0.1;
    this.Transform.ApplyColorFilter ();
    this.DEBUG_LOG("LIGHTING "+this.Transform.Bright_Cur);
*/    
    var Update=false;

    if (this.Transform.TimerLight!=0)
        return;

    if (this.Transform.Bright_Tgt!=this.Transform.Bright_Cur)
    {
        Update=true;

        this.Transform.Bright_Cur+=this.Transform.Bright_Step;

        if (this.Transform.Bright_Step<0)
        {
            if (this.Transform.Bright_Cur<this.Transform.Bright_Tgt)
                this.Transform.Bright_Cur=this.Transform.Bright_Tgt;

        }
        else
        {
            if (this.Transform.Bright_Cur>this.Transform.Bright_Tgt)
                this.Transform.Bright_Cur=this.Transform.Bright_Tgt;
        }

    }

    if (Update==true)
    {
        this.Transform.TimerLight=this.ArmaTimer(this.Transform.TimerLight,this.Transform.TimeLight);
        
        this.Transform.ApplyColorFilter ();
    }
    else
    {
        // Deve loopare?
        if ((this.Transform.StatusFlag&SpriteTransformer.MASK_LIGHTING_3)!=0)
        {
            this.Transform.Bright_Step=(this.Transform.Bright_Step * -1 );

            if ((this.Transform.StatusFlag&SpriteTransformer.MASK_LIGHTING_1)!=0)
            {
                this.Transform.Bright_Tgt=1.0;

                this.Transform.StatusFlag&=(~SpriteTransformer.MASK_LIGHTING_1);
                this.Transform.StatusFlag|=SpriteTransformer.MASK_LIGHTING_2;
            }
            else
            {
                this.Transform.Bright_Tgt=this.Transform.Bright_Tgt_Org;

                this.Transform.StatusFlag&=(~SpriteTransformer.MASK_LIGHTING_2);
                this.Transform.StatusFlag|=SpriteTransformer.MASK_LIGHTING_1;
            }
        }
        // Deve tornare all'origine?
        else if ((this.Transform.StatusFlag&SpriteTransformer.MASK_LIGHTING_2))
        {
            this.Transform.Bright_Tgt=1.0;

            this.Transform.Bright_Step=(this.Transform.Bright_Step * -1 );

            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_LIGHTING_2);
            this.Transform.StatusFlag|=SpriteTransformer.MASK_LIGHTING_1;
        }
        else
        {
            this.Transform.TimerLight=0;
            this.Transform.StatusFlag&=(~SpriteTransformer.MASK_LIGHTING);

            this.Transform.RemoveColorFilter ();
        }
    }
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.RecenterX = function(old_width) {
    
    var new_width,delta_x;

    if (this.Transform.AnchorSet==false)
    {
        new_width=this.Host.FrameW * this.Host.Sprite.scale.x;

        delta_x= (new_width-old_width)/2;

        this.Host.Sprite.x-=delta_x;
    }
/*    
    if ((this.Transform.Anim_Flags&SpriteTransformer.SCALE_FLAG_H)!=0)
    {
        old_width=this.Transform.Starting_WW;

        delta_x= (new_width-old_width)/2;

        this.Host.Sprite.x=(this.Transform.Starting_xx-delta_x);
    }
    else
    {
        delta_x= (new_width-old_width)/2;

        this.Host.Sprite.x-=delta_x;
    }
*/    
}
//---------------------------------------------------------------------------//
SpriteTransformer.prototype.RecenterY = function(old_height) {
    
    var new_height,delta_y;

    if (this.Transform.AnchorSet==false)
    {
    new_height=(this.Host.FrameH*this.Host.Sprite.scale.y);

    delta_y= (new_height-old_height)/2;

    this.Host.Sprite.y-=delta_y;
    }
        
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.ACTION_ResetAtEnd = function() {
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.AnchorPoint_ON = function() {

//    this.Transform.Org_Anchor=this.Host.Sprite.anchor.get();
    
    this.Host.Sprite.anchor.set(0.5);
    this.Host.Sprite.x+=(this.Host.FrameW*this.Host.Sprite.scale.x)/2;
    this.Host.Sprite.y+=(this.Host.FrameH*this.Host.Sprite.scale.y)/2;
    this.Transform.AnchorSet=true;
}
//--------------------------------------------------------------------------//
SpriteTransformer.prototype.AnchorPoint_OFF = function() {

    //this.Host.Sprite.anchor.set(this.Transform.Org_Anchor);
    this.Host.Sprite.rotation=0.0;
    this.Host.Sprite.anchor.set(0.0);
    this.Host.Sprite.x-=(this.Host.FrameW*this.Host.Sprite.scale.x)/2;
    this.Host.Sprite.y-=(this.Host.FrameH*this.Host.Sprite.scale.y)/2;
    this.Transform.AnchorSet=false;
}
//---------------------------------------------------------------------------//

//--------------------------------------------------------------------------//