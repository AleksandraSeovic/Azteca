//------------------------------------------------------------//
ReelAnimation.NUM_SIMBOLI=14;
//------------------------------------------------------------//
ReelAnimation.TRANSFORM_STEPS           =20;

ReelAnimation.TRANSFORM_UNLY_FRAMES     =0;
ReelAnimation.TRANSFORM_UNLY_STEPS      =0;
ReelAnimation.TRANSFORM_UNLY_TIME       =100;
ReelAnimation.TRANSFORM_MIDY_TIME       =60;
//------------------------------------------------------------//
ReelAnimation.TYPE_ANIMATION_NORMAL	    = 0x0000;
ReelAnimation.TYPE_ANIMATION_SNAPSHOT	= 0x1000;
//------------------------------------------------------------//
ReelAnimation.TYPE_MASK_SYMBOL		= 0x0000;
ReelAnimation.TYPE_MASK_OVERLAY 	= 0x0100;
ReelAnimation.TYPE_MASK_UNDERLAY 	= 0x0200;
//--------------------------------------------------------------------------//
ReelAnimation.TAB_REEL_PULSE_TYPE=[

    // SYM0
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym00_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM1
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym01_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM2
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym02_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM3
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym03_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM4
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym04_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM5 chitarra
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym05_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM6 sigaro
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym06_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM7 whisky
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym07_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                            null
                          ),

    // SYM8 donna
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym08_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),


    // SYM9 smaila
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym09_" ,50,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),

    // SYM10 WILD
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym10_" ,31,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),
    
    // SYM11 SCATTER
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym11_" ,31,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),

    // SYM12 BONUS (VINILE)
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym12_" ,45,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),
    
    // SYM13 BONUS (MICROFONO)
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym13_" ,16,ReelAnimation.TRANSFORM_MIDY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),
    // SYM14
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"AniSym14_" ,20,ReelAnimation.TRANSFORM_MIDY_TIME,0,
                           // Actions...
                           null
                            )
];
//--------------------------------------------------------------------------//
//	Underlay animation
//--------------------------------------------------------------------------//
ReelAnimation.TAB_UNLY_PULSE_TYPE=[
    
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                            ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    null,
    null,
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",20,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",20,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",20,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           ),
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE,"WinBackA_",15,ReelAnimation.TRANSFORM_UNLY_TIME,(ReelAnimationInfo.FLG_ANI_LOOP|0)	,
                           // Actions...
                           null
                           )
];
//--------------------------------------------------------------------------//
//	Overlay animation
//--------------------------------------------------------------------------//
ReelAnimation.TAB_OVLY_PULSE_TYPE=[
    // SYM0
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
                           
    // SYM1
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM2
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM3
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM4
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM5
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM6
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM7
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM8
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),

    // SYM9
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),

    // SYM10
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),

    // SYM11
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    
    // SYM12
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    // SYM13
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            ),
    
    // SYM14
    new ReelAnimationInfo (ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE,"WinFrame_",20,0,ReelAnimationInfo.FLG_ANI_NONE,
                           // Actions...
                           null
                            )
];
//--------------------------------------------------------------------------//

function ReelAnimation(id,root_container,app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our ReelAnimation-specific properties
    this.ID=id;
    this.IDSimbolo=0;
    this.Loops=0;
    this.AnimationLine=0;
    this.AnimationType=0;
    this.AnimationMedia=0;
    this.AnimationReloadTime=0;
    this.AnimationFrame=0;
    this.AnimateOnFreespins=false;
    this.ApplicationRef = app_reference;
    this.AnimationContainer = root_container;

    // Si tratta dell'istanza del simbolo?
    if ((id&(ReelAnimation.TYPE_MASK_OVERLAY|ReelAnimation.TYPE_MASK_UNDERLAY))==0)
    {
        this.UnderlayAnimation=new ReelAnimation((ReelAnimation.TYPE_MASK_UNDERLAY|id),root_container,app_reference);
    }
    else
    {
        this.UnderlayAnimation=null;
    }

    // Per qualsiasi istanza crea il supporto per l'animazione tiled
    this.AnimationTile=new TiledSprite ("AniSym00_", 15 , true, this.AnimationContainer,'.webp');

    // Si tratta dell'istanza del simbolo?
    if ((id&(ReelAnimation.TYPE_MASK_OVERLAY|ReelAnimation.TYPE_MASK_UNDERLAY))==0)
    {
        this.OverlayAnimation=new ReelAnimation((ReelAnimation.TYPE_MASK_OVERLAY|id),root_container,app_reference);
    }
    else
    {
        this.OverlayAnimation=null;
    }
}

// Create a ReelAnimation.prototype object that inherits from SObject.prototype.
ReelAnimation.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ReelAnimation
ReelAnimation.prototype.constructor = ReelAnimation;

//--------------------------------------------------------------------------//
ReelAnimation.prototype.Init = function() {

    // Init the underlay
    if (this.UnderlayAnimation!=null)
        this.UnderlayAnimation.Init();

    // Setup the tiled sprite ( the sprite link-up to the container)
    this.AnimationTile.Setup();

    // Init the overlay
    if (this.OverlayAnimation!=null)
        this.OverlayAnimation.Init();
}
//------------------------------------------------------------//
ReelAnimation.prototype.AnimateInit = function(id_sym,ani_line,ani_type) {

    if (this.UnderlayAnimation!=null)
        this.UnderlayAnimation.AnimateInit(id_sym,ani_line,ani_type);

    this.IDSimbolo=id_sym;
    this.AnimationLine=ani_line;
    this.AnimationType=ani_type;
    this.Loops=0;

    // Iscriviamo il tiledSprite al Transformer se dovesse servirci compiere qualche azione
    this.AnimationTile.XX(0,0);
    this.AnimationTile.YY(0,0);
    this.AnimationTile.ResetProperties(false,1.0,1.0);

    this.SetupMedia();

    if (this.OverlayAnimation!=null)
        this.OverlayAnimation.AnimateInit(id_sym,ani_line,ani_type);
}
//------------------------------------------------------------//
ReelAnimation.prototype.Animate = function(ellapsed_time) {

    var tab_index;
    var tab_ani=null;

    if (this.UnderlayAnimation!=null)
        this.UnderlayAnimation.Animate(ellapsed_time);

    this.TimerRefresh(ellapsed_time);

    this.AnimationTile.SPRITE_TRANSFORMER().Refresh(ellapsed_time);

    tab_ani	= this.GetTabAni();
    tab_index=this.GetTabIndex();

    if (tab_ani[tab_index]==null)
        return;

    if (this.GPTimer==0)
    {
        switch (this.AnimationMedia)
        {
            case ReelAnimationInfo.TYPE_PULSE_MEDIA_ALPHA_BLINK:
            {
                if (++this.AnimationFrame>=2)
                {
                    this.AnimationFrame=0;
                    this.Loops++;
                }

                if ( this.AnimationFrame==1)
                    this.AnimationTile.GetSprite().alpha=1.0;
                else
                    this.AnimationTile.GetSprite().alpha=0.3;

                this.GPTimer=tab_ani[ tab_index ].m_FrameTime;
            }break;

            case ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE:
            {
                if ((this.ID&(ReelAnimation.TYPE_MASK_OVERLAY|ReelAnimation.TYPE_MASK_UNDERLAY))==0 && (this.AnimationType & ReelAnimation.TYPE_ANIMATION_SNAPSHOT)!=0)
                {
                    if (this.AnimationFrame==1)
                    {
                        this.Loops++;

                        this.AnimationFrame=0;
                    }

                    this.GPTimer=(this.AnimationType&0x00FF);

                    this.AnimationTile.SetFrame(0);

                    this.AnimationFrame++;
                }
                else
                {
                    if (this.AnimationFrame<tab_ani[ tab_index ].m_TotFrames)
                    {
                        if (++this.AnimationFrame>=tab_ani[ tab_index ].m_TotFrames)
                        {
                            if ((tab_ani[ tab_index ].m_Flags & ReelAnimationInfo.FLG_ANI_LOOP)!=0)
                            {
                                this.AnimationFrame=(tab_ani[ tab_index ].m_Flags&0x7FFF);

                                this.Loops++;
                            }
                            else
                            {
                                this.AnimationFrame=(tab_ani[ tab_index ].m_TotFrames-1);

                                this.Loops=1;
                            }
                        }

                        this.GPTimer=tab_ani[ tab_index ].m_FrameTime;

                        this.AnimationTile.SetFrame(this.AnimationFrame);
                    }
                }
            }break;

            default:break;
        }
    }

    if (this.OverlayAnimation!=null)
        this.OverlayAnimation.Animate(ellapsed_time);
}
//------------------------------------------------------------//
ReelAnimation.prototype.AnimateOver = function() {

    if (this.UnderlayAnimation!=null)
        this.UnderlayAnimation.AnimateOver();

    if (this.OverlayAnimation!=null)
        this.OverlayAnimation.AnimateOver();

    this.AnimationTile.Visible(false);
}
//------------------------------------------------------------//
ReelAnimation.prototype.GetCompletedLoops = function() {

    //if (this.UnderlayAnimation!=null)
        //return this.UnderlayAnimation.GetCompletedLoops();

    return this.Loops;
}
//------------------------------------------------------------//
ReelAnimation.prototype.AnimationFreeSpin = function(enb) {

    this.AnimateOnFreespins=enb;

    if (this.UnderlayAnimation!=null)
        this.UnderlayAnimation.AnimationFreeSpin(enb);

    if (this.OverlayAnimation!=null)
        this.OverlayAnimation.AnimationFreeSpin(enb);
}
//------------------------------------------------------------//
ReelAnimation.prototype.SetupMedia = function() {

    var tab_index;
    var tab_ani=null;

    tab_ani = this.GetTabAni();
    tab_index=this.GetTabIndex();

    if (tab_ani[ tab_index ]==null)
        return;

    this.AnimationMedia=tab_ani[ tab_index ].m_MediaType;

    switch (this.AnimationMedia)
    {
        // Static
        case ReelAnimationInfo.TYPE_PULSE_STATIC:
        {
            this.AnimationTile.SetNewTile(tab_ani[ tab_index ].m_ResourceID,tab_ani[ tab_index ].m_TotFrames,'.webp');
            this.AnimationTile.SetFrame((this.IDSimbolo-window.ID_SIMBOLO_0));
            this.AnimationTile.GetSprite().alpha=1.0;
            this.AnimationTile.Visible(true);
        }break;

        // Static
        case ReelAnimationInfo.TYPE_PULSE_STATIC_BY_FRAME:
        {
            this.AnimationTile.SetNewTile(tab_ani[ tab_index ].m_ResourceID,tab_ani[ tab_index ].m_TotFrames,'.webp');
            this.AnimationTile.SetFrame(tab_ani[ tab_index ].m_FrameTime);
            this.AnimationTile.GetSprite().alpha=1.0;
            this.AnimationTile.Visible(true);
        }break;
            
        // Static By type
        case ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE:
        {
            this.AnimationTile.SetNewTile(tab_ani[ tab_index ].m_ResourceID,tab_ani[ tab_index ].m_TotFrames,'.webp');
            this.AnimationTile.SetFrame(this.AnimationLine);
            this.AnimationTile.GetSprite().alpha=1.0;
            this.AnimationTile.CenterBox(window.LARGHEZZA_SIMBOLO,window.ALTEZZA_SIMBOLO,true);
            this.AnimationTile.Visible(true);
        }break;



        // Pulse on/off
        case ReelAnimationInfo.TYPE_PULSE_MEDIA_ALPHA_BLINK:
        {
            this.AnimationTile.SetNewTile(tab_ani[ tab_index ].m_ResourceID,tab_ani[ tab_index ].m_TotFrames,'.webp');
            this.AnimationTile.SetFrame((this.IDSimbolo-window.ID_SIMBOLO_0));
            this.AnimationFrame=0;
            this.AnimationReloadTime=tab_ani[ tab_index ].m_FrameTime;
            this.AnimationTime=this.AnimationReloadTime;
            this.AnimationTile.GetSprite().alpha=0.3;
            this.AnimationTile.Visible(true);
        }break;

        // Animazione Tiled
        case ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE:
        {
            this.AnimationTile.SetNewTile(tab_ani[ tab_index ].m_ResourceID,tab_ani[ tab_index ].m_TotFrames,'.webp');

            this.AnimationFrame=0;
            this.AnimationReloadTime=tab_ani[ tab_index ].m_FrameTime;
            this.AnimationTime=this.AnimationReloadTime;
            this.AnimationTile.CenterBox(window.LARGHEZZA_SIMBOLO,window.ALTEZZA_SIMBOLO,true);
            this.AnimationTile.Visible(true);
            this.AnimationTile.SetFrame(0);
        }break;

        default:break;
    }

    if (tab_ani[ tab_index ].m_ActionsArray!=null)
        this.SetupActions(tab_ani[ tab_index ].m_ActionsArray);
}
//------------------------------------------------------------//
ReelAnimation.prototype.SetupActions = function(actions) {

    var act;

    for (var i=0;i<actions.length;i++)
    {
        this.AnimationTile.SPRITE_TRANSFORMER().RunAction(actions[i].Action,actions[i].FloatParms,actions[i].UintParms);
    }
}
//------------------------------------------------------------//
ReelAnimation.prototype.GetTabIndex = function() {

    return ((this.IDSimbolo&0xFF)-1);
}
//------------------------------------------------------------//
ReelAnimation.prototype.GetTabAni = function() {

    if ((this.ID&ReelAnimation.TYPE_MASK_OVERLAY)!=0)
        return ReelAnimation.TAB_OVLY_PULSE_TYPE;

    if ((this.ID&ReelAnimation.TYPE_MASK_UNDERLAY)!=0)
        return ReelAnimation.TAB_UNLY_PULSE_TYPE;

    return ReelAnimation.TAB_REEL_PULSE_TYPE;
}
//--------------------------------------------------------------------------//
