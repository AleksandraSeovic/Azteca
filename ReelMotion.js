//--------------------------------------------------------------------------//
ReelMotion.BEHAVIOUR_STACK=1;
    ReelMotion.STACK_TIME=3;

//--------------------------------------------------------------------------//
ReelMotion.BLUR_FRAMES_SIMBOLO=44;
ReelMotion.BLUR_ALTEZZA_SIMBOLO=260;

//ReelMotion.BLUR_FRAMES_RULLO		   =(ReelMotion.BLUR_FRAMES_SIMBOLO/window.NUM_SIMBOLI_RUOTA);			// N. Frames in dimensione di rullo
ReelMotion.BLUR_PIXEL_REEL_SIZE 	   =(ReelMotion.BLUR_FRAMES_SIMBOLO*ReelMotion.BLUR_ALTEZZA_SIMBOLO);		// N. Frames in dimensione di simbolo

ReelMotion.OFFS_START_FRAME_SYM_ORG		=40;	//In symbol frames
ReelMotion.OFFS_START_FRAME_SYM_ORG_BLUR=37;	//In symbol frames

ReelMotion.BLUR_START_FRAME_MOTION		=(ReelMotion.OFFS_START_FRAME_SYM_ORG*ReelMotion.BLUR_ALTEZZA_SIMBOLO);

ReelMotion.OFFS_START_FRAME_SYM_NEW		=1;	// In symbol frames
ReelMotion.OFFS_START_FRAME_SYM_NEW_BLUR=4;	// In symbol frames

//------------------------------------------------------------------------
ReelMotion.OFFS_PAD_TOP_AREA_0		=7;	//In symbol frames
ReelMotion.OFFS_PAD_TOP_AREA_1		=10;	//In symbol frames

//------------------------------------------------------------------------
ReelMotion.OFFS_PAD_BOT_AREA_0		=31;	//In symbol frames
ReelMotion.OFFS_PAD_BOT_AREA_1		=34;	//In symbol frames


ReelMotion.TAB_DEFAULT_TILES=[
    1,          // 0 room for reel bounce
    1,1,1,      // 1..3 sym new
    1,1,1,      // 4..6 sym new blur
    1,6,7,2,    // 7..10PAD
    4,3,        // 11..12 REELS
    7,1,1,      // 13..15 REELS
    1,1,2,      // 16..18 REELS
    2,2,2,      // 19..21 REELS
    3,3,3,      // 22..24 REELS
    4,4,4,      // 25..27 REELS
    5,5,5,      // 28..30 REELS
    1,6,7,2,    // 31..34 PAD
    4,3,        // 35..36 PAD
    1,1,1,      // 37..39 sym org blur
    1,1,1,      // 40..42 sym org
    1           // 43 room for load the motion
/*    
 Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0,						// 0..2 sym new
 Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0,						// 3..5 sym new blur
 Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_5,Slot.ID_SIMBOLO_8,Slot.ID_SIMBOLO_2,	// 6..9 PAD
 Slot.ID_SIMBOLO_4,Slot.ID_SIMBOLO_3,										// 10..11 REELS
 Slot.ID_SIMBOLO_9,Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_11,					// 12..14 REELS
 Slot.ID_SIMBOLO_2,Slot.ID_SIMBOLO_4,Slot.ID_SIMBOLO_10,					// 15..17 REELS
 Slot.ID_SIMBOLO_3,Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_5,						// 18..20 REELS
 Slot.ID_SIMBOLO_7,Slot.ID_SIMBOLO_2,Slot.ID_SIMBOLO_11,					// 21..23 REELS
 Slot.ID_SIMBOLO_1,Slot.ID_SIMBOLO_6,Slot.ID_SIMBOLO_0,						// 24..26 REELS
 Slot.ID_SIMBOLO_3,Slot.ID_SIMBOLO_9,Slot.ID_SIMBOLO_7,						// 27..29 REELS
 Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_5,Slot.ID_SIMBOLO_8,Slot.ID_SIMBOLO_2,	// 30..33 PAD
 Slot.ID_SIMBOLO_4,Slot.ID_SIMBOLO_3,										// 34..35 PAD
 Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0,						// 36..38 sym org blur
 Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_0						// 39..41 sym org
*/ 
];
//--------------------------------------------------------------------------//
//ReelMotion.TAB_REEL_BOUNCE=[-16,4,4,4,2,2  ,2,2,2,2, -2,-2,-2,-2, -2, 2];
ReelMotion.TAB_REEL_BOUNCE=[-64,16,16,8,8,4,4,4,2,2  ,2,2,2,2, -2,-2,-2,-2, -2, 2];
//--------------------------------------------------------------------------//
ReelMotion.REEL_SPEED  =56;
ReelMotion.TURBO_SPEED =86;
//--------------------------------------------------------------------------//
function ReelMotion(id_reel,parent_container,parent_renderer) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ParentStage = parent_container;
    this.ParentRender= parent_renderer;
    
    this.SimboliEstrattiRef = null;
    
    this.MagicSymbol=0;
    
    this.IDReel=id_reel;
    
    //this.ReelRect_SML=new PIXI.Rectangle(0,0,window.LARGHEZZA_SIMBOLO,(window.ALTEZZA_SIMBOLO*window.NUM_SIMBOLI_RUOTA));
    //this.ReelRect_BIG=new PIXI.Rectangle(0,0,window.LARGHEZZA_SIMBOLO,(window.ALTEZZA_SIMBOLO*ReelMotion.BLUR_FRAMES_SIMBOLO));
    
    this.ReelSpeed=0;
    
    this.SpinStep=0;
    
    this.IdxTabBounce=0;
    
    this.LoadMotionOffset=0;
    this.LoadMotionDelay=0;
    this.LoadMotionDelayer=0;
    
    this.StackTimer=0;
    
    this.TabTiles=[];

    for (var i = 0; i < ReelMotion.BLUR_FRAMES_SIMBOLO; i++) {
        this.TabTiles.push( ReelMotion.TAB_DEFAULT_TILES[i] );    
    }
    
    this.PoolSymbols=[];
    
    // Create the super  container
    this.SuperContainer=new PIXI.Container();
    
    // Create the strip  container
    this.StripContainer=new PIXI.Container();
    
    this.SuperContainer.addChild(this.StripContainer);
    
    
    //Create a Texture that will render each of the reels
    //this.StripTexture = new PIXI.RenderTexture( new PIXI.BaseRenderTexture(window.LARGHEZZA_SIMBOLO, ReelMotion.BLUR_PIXEL_REEL_SIZE , PIXI.SCALE_MODES.LINEAR, 1) );
    
    // Create the main sprite for the reel basing on the texture
    //this.StripSprite = new PIXI.Sprite( this.StripTexture );
    
    // Create the reel mask
    /*
    this.StripMask=new PIXI.Graphics();
    this.StripMask.beginFill();
    this.StripMask.drawRect(0, 0, window.LARGHEZZA_SIMBOLO, (window.ALTEZZA_SIMBOLO*window.NUM_SIMBOLI_RUOTA));
    this.StripMask.drawRect(0, 0, 100, 100);
    this.StripMask.endFill();
    */
    //this.StripContainer.addChild(this.StripMask);
    
    
    this.DEBUG_LOG("Created motion for reel :"+this.IDReel);
}

// Create a ReelMotion.prototype object that inherits from SObject.prototype.
ReelMotion.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ReelMotion
ReelMotion.prototype.constructor = ReelMotion;

//--------------------------------------------------------------------------//
ReelMotion.prototype.Init = function(p_pSimboliEstratti) {

    // Refrence the symbols matrix
    this.SimboliEstrattiRef = p_pSimboliEstratti;
    
    // Create sprites pool
    for(var i=0; i<ReelMotion.BLUR_FRAMES_SIMBOLO; i++)
    {    
        // I frames per il motin contengono 2 set : prima quelli blurred ed in coda quelli normali
        this.PoolSymbols.push( new TiledSprite("SYMB", (2*window.NUM_SIMBOLI) , true, this.StripContainer,'.webp') );
        
        // Setup the tiled sprite
        this.PoolSymbols[i].Setup();
        
        // Set position into strip
        this.PoolSymbols[i].YY( (i * window.ALTEZZA_SIMBOLO),0 );
    }
    
    // Set all tiledsprite symbols to its symbol frame
    this.ElaboraTiles();
    
    // Create the reel mask
    this.StripMask = new PIXI.Graphics();
    this.SuperContainer.addChild(this.StripMask);
    this.StripMask.position.x = 0;
    this.StripMask.position.y = -10;
    const yOffset = 10
    this.StripMask.lineStyle(0);

    this.StripMask.clear();
    this.StripMask.beginFill(0x8bc5ff);
    this.StripMask.drawRect(0, 0, window.LARGHEZZA_SIMBOLO, (window.ALTEZZA_SIMBOLO*window.NUM_SIMBOLI_RUOTA+yOffset));
    this.StripMask.endFill();    
    
    this.SuperContainer.mask = this.StripMask;
    
    // Link the reel sprite to the parent
    this.SuperContainer.visible=false;
    
    this.ParentStage.addChild( this.SuperContainer );
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.ElaboraTiles = function() {

    // Scramble the map,so that each reel is different
    for (var i=0;i<100;i++)
    {
        var idx1=ReelMotion.OFFS_PAD_TOP_AREA_0+Lib.Rand( (ReelMotion.OFFS_PAD_BOT_AREA_0-1) );

        var idx2=ReelMotion.OFFS_PAD_TOP_AREA_0+Lib.Rand( (ReelMotion.OFFS_PAD_BOT_AREA_0-1) );

        var tmp=this.TabTiles[idx1];

        this.TabTiles[idx1]=this.TabTiles[idx2];
        
        this.TabTiles[idx2]=tmp;
    }

    // Copia il pad area
    for (i=0;i<6;i++)
        this.TabTiles[(ReelMotion.OFFS_PAD_BOT_AREA_0+i)]=this.TabTiles[(ReelMotion.OFFS_PAD_TOP_AREA_0+i)];
    
    // Update the sprites
    for(var i=0; i<ReelMotion.BLUR_FRAMES_SIMBOLO; i++)
    {    
        this.SetStripSymbol(this.TabTiles[i],i,true);
    }
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.SpinInit = function() {
    
    //var sym_spr=null;
    //var sym_ID=0,sym_FRM;
    
    // Imposta i simboli originali,uguali ai rulli
    for(var i=0; i<window.NUM_SIMBOLI_RUOTA; i++)
    {    
        this.SetStripSymbol(this.SimboliEstrattiRef[ (this.IDReel+(window.NUM_REELS*i)) ],(ReelMotion.OFFS_START_FRAME_SYM_ORG+i),false);
    }
    
    // Imposta i simboli originali ma blurrati
    for(var i=0; i<window.NUM_SIMBOLI_RUOTA; i++)
    {    
        this.SetStripSymbol(this.SimboliEstrattiRef[ (this.IDReel+(window.NUM_REELS*i)) ],(ReelMotion.OFFS_START_FRAME_SYM_ORG_BLUR+i),true);
    }
    
    var rnd=window.ID_SIMBOLO_0+Lib.Rand( 6 );
    this.SetStripSymbol(rnd,(ReelMotion.OFFS_START_FRAME_SYM_ORG+window.NUM_SIMBOLI_RUOTA),false);
    
    //this.StripMask.y=ReelMotion.BLUR_START_FRAME_MOTION;
    this.SetScrollRect(ReelMotion.BLUR_START_FRAME_MOTION);
    
    this.SpinStep=0;
    
    this.ReelSpeed=ReelMotion.REEL_SPEED;
    
    this.IdxTabBounce=0;
    
    this.LoadMotionOffset=0;
    
    this.LoadMotionDelayer=1;
    this.LoadMotionDelay=0;//(this.IDReel*5);
    
    this.StripContainer.visible=true;
    this.SuperContainer.visible=true;
    
    this.StackTimer=4*ReelMotion.BLUR_ALTEZZA_SIMBOLO;
}
//--------------------------------------------------------------------------//
// Imposta lo sprite della strip in posizione data in base al simbolo dato
ReelMotion.prototype.SetStripSymbol = function(sym_ID,strip_index,blur) {
  
    var sym_FRM;
    
    blur_FRM= parseInt( (sym_ID-window.ID_SIMBOLO_0) );
    sym_FRM=(blur_FRM+(window.NUM_SIMBOLI+1));
    
    if (this.MagicSymbol!=0 && sym_ID==this.MagicSymbol)
    {
        this.PoolSymbols[strip_index].ChangeFrame( sym_FRM,"SYMBMGC");
        this.PoolSymbols[strip_index].ChangeFrame( blur_FRM,"SYMBMGC");
    }       
    else
    {
        this.PoolSymbols[strip_index].ChangeFrame( sym_FRM,"SYMB");
        this.PoolSymbols[strip_index].ChangeFrame( blur_FRM,"SYMB");
    }
    
    if (blur==true)
        sym_FRM=blur_FRM;
    
    this.PoolSymbols[strip_index].SetFrame(sym_FRM);

/*    
    var sym_spr;
    var sym_FRM;
    
    sym_spr = this.StripContainer.getChildAt(strip_index);
    
    if (this.MagicSymbol!=0 && sym_ID==this.MagicSymbol)
        //sym_spr.SetNewTile("SYMBMGC", (2*window.NUM_SIMBOLI));
    else 
        sym_spr.SetNewTile("SYMB", (2*window.NUM_SIMBOLI));
    
    sym_FRM= parseInt( (sym_ID-window.ID_SIMBOLO_0) );
    
    if (blur==false)
        sym_FRM+=(window.NUM_SIMBOLI+1);
    
    sym_spr.gotoAndStop( sym_FRM );
*/    
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.SpinOver = function() {

    var offs=0;
    
    // Imposta i simboli originali,uguali ai rulli
    for(var i=0; i<window.NUM_SIMBOLI_RUOTA; i++)
    {    
        sym_ID = this.SimboliEstrattiRef[ (this.IDReel+(window.NUM_REELS*i)) ];
        
        this.SetStripSymbol(sym_ID,(ReelMotion.OFFS_START_FRAME_SYM_NEW+i),false);
    }
    
    // Imposta i simboli originali ma blurrati
    for(var i=0; i<window.NUM_SIMBOLI_RUOTA; i++)
    {    
        sym_ID = this.SimboliEstrattiRef[ (this.IDReel+(window.NUM_REELS*i)) ];
        
        this.SetStripSymbol(sym_ID,(ReelMotion.OFFS_START_FRAME_SYM_NEW_BLUR+i),true);
    }

    offs= 330;//parseInt( (this.ReelRect.y%ReelMotion.BLUR_ALTEZZA_SIMBOLO) );

    this.SetScrollRect( (ReelMotion.OFFS_START_FRAME_SYM_NEW_BLUR*ReelMotion.BLUR_ALTEZZA_SIMBOLO)+offs );
    
    this.StripContainer.visible=true;
    
    this.SpinStep=2;
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.StackSet = function(step) {
    
    var rnd_sym,cur_pos;
    
    if (ReelMotion.BEHAVIOUR_STACK==1)
    {    
        if (this.StackTimer>=step)
            this.StackTimer-=step;
        else
            this.StackTimer=0;
        
        if (this.StackTimer==0)
        {       
            rnd_sym=window.ID_SIMBOLO_0+Lib.Rand(window.NUM_SIMBOLI-4);

            cur_pos=parseInt( (this.StripContainer.y/window.BLUR_ALTEZZA_SIMBOLO) );
            
            for(var i=ReelMotion.OFFS_PAD_TOP_AREA_0; i<ReelMotion.OFFS_START_FRAME_SYM_ORG_BLUR; i++)
            {    
                if (i!=cur_pos && i!=(cur_pos+1) && i!=(cur_pos+2))
                    this.SetStripSymbol(rnd_sym,i,true);
            }
            
            
            this.StackTimer=ReelMotion.STACK_TIME*ReelMotion.BLUR_ALTEZZA_SIMBOLO;
        }
    }
}

//--------------------------------------------------------------------------//
ReelMotion.prototype.SetScrollRect = function(pos) {
    this.StripContainer.y=-pos;
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.IncScrollRect = function(offs) {
    this.StripContainer.y-=offs;
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.DecScrollRect = function(offs) {
    this.StripContainer.y+=offs;
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.Spin = function() {
    
    var blur_frame;
    
    switch(this.SpinStep){
    
        case 0:
        {
            if (this.LoadMotionDelay==0)
            {       
                this.LoadMotionOffset+=2;

                if (this.LoadMotionOffset>=15)
                {
                    this.SetScrollRect( (ReelMotion.OFFS_START_FRAME_SYM_ORG_BLUR*ReelMotion.BLUR_ALTEZZA_SIMBOLO) );
                    
                    this.StripContainer.visible=true;
                    
                    this.SpinStep++;
                }
                else
                {
                    this.IncScrollRect(  this.LoadMotionOffset );
                }
                
                //this.LoadMotionDelayer+=2;
                
                this.LoadMotionDelay=this.LoadMotionDelayer;
            }
            else
                this.LoadMotionDelay--;
        }break;

        // Spin
        case 1:{
            
            this.StackSet(ReelMotion.REEL_SPEED);
            
            this.DecScrollRect( this.ReelSpeed );
            
            if (Math.abs(this.StripContainer.y)<(ReelMotion.OFFS_PAD_TOP_AREA_1*window.ALTEZZA_SIMBOLO))
            {
                this.DecScrollRect( (ReelMotion.OFFS_PAD_TOP_AREA_0*window.ALTEZZA_SIMBOLO) );
                this.IncScrollRect( (ReelMotion.OFFS_PAD_BOT_AREA_0*window.ALTEZZA_SIMBOLO) );
            }
        }break;
            
            
        // Stop
        case 2:{
            
            this.DecScrollRect( this.ReelSpeed );

            if (Math.abs(this.StripContainer.y)<=(ReelMotion.OFFS_START_FRAME_SYM_NEW_BLUR*ReelMotion.BLUR_ALTEZZA_SIMBOLO))
            {
                this.SetScrollRect( (ReelMotion.OFFS_START_FRAME_SYM_NEW*ReelMotion.BLUR_ALTEZZA_SIMBOLO) );
                
                this.SpinStep++;
            }

            //m_Delay=Application.TIMERS().LocalTimer_Set(DELAY_SPIN_MOTION);
        }break;

        // Bounce
        case 3:{
            
            this.IncScrollRect( ReelMotion.TAB_REEL_BOUNCE[this.IdxTabBounce] );

            this.IdxTabBounce++;
            
            if (this.IdxTabBounce>=ReelMotion.TAB_REEL_BOUNCE.length)
            {
                this.SuperContainer.visible=false;

                this.SpinStep++;

                break;
            }
            //m_Delay=Application.TIMERS().LocalTimer_Set(DELAY_BRAKE_MOTION);
        }break;

        default:break;
    };
}
//--------------------------------------------------------------------------//
ReelMotion.prototype.IsSpinOver = function() {

    return (this.SpinStep>3);
}
//------------------------------------------------------------//
ReelMotion.prototype.IsStopPostion= function() {

    return (this.SpinStep==3);
};
//------------------------------------------------------------//
ReelMotion.prototype.Turbo= function() {
    
    this.ReelSpeed=ReelMotion.TURBO_SPEED;
}
//------------------------------------------------------------//
ReelMotion.prototype.SetMagicSymbol = function(id_sym,enb) 
{
    this.MagicSymbol=id_sym;
    
    if (enb==false)
    {
        this.MagicSymbol=0;
    }
    else
    {
        this.MagicSymbol=id_sym;
    }

    this.ElaboraTiles();
}
//--------------------------------------------------------------------------//
