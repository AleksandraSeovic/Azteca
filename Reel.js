//---------------------------------------------------------------------------//
Reel.REELS_TAB_SYMS_RESET =
[
    1,2,3,4,5,
    6,7,1,2,3,
    4,5,6,7,1
    /*
    Slot.ID_SIMBOLO_0,Slot.ID_SIMBOLO_1,Slot.ID_SIMBOLO_2,Slot.ID_SIMBOLO_3,Slot.ID_SIMBOLO_4,
    Slot.ID_SIMBOLO_5,Slot.ID_SIMBOLO_6,Slot.ID_SIMBOLO_7,Slot.ID_SIMBOLO_1,Slot.ID_SIMBOLO_2,
    Slot.ID_SIMBOLO_3,Slot.ID_SIMBOLO_4,Slot.ID_SIMBOLO_5,Slot.ID_SIMBOLO_6,Slot.ID_SIMBOLO_7
    */
];
//---------------------------------------------------------------------------//
/*
Reel.REEL_ROW_0=100;
Reel.REEL_ROW_1=Reel.REEL_ROW_0+220;
Reel.REEL_ROW_2=Reel.REEL_ROW_1+220;

Reel.REEL_COL_0=130;
Reel.REEL_COL_1=Reel.REEL_COL_0+240;
Reel.REEL_COL_2=Reel.REEL_COL_1+240;
Reel.REEL_COL_3=Reel.REEL_COL_2+240;
Reel.REEL_COL_4=Reel.REEL_COL_3+240;
//---------------------------------------------------------------------------//
Reel.REELS_TAB_X=[Reel.REEL_COL_0,Reel.REEL_COL_1,Reel.REEL_COL_2,Reel.REEL_COL_3,Reel.REEL_COL_4];
Reel.REELS_TAB_Y=[Reel.REEL_ROW_0,Reel.REEL_ROW_1,Reel.REEL_ROW_2];
*/
//------------------------------------------------------------//
// Macchina a stati per il controllo delle ruote
Reel.FSM_RUOTA_0=0;	    // 0.
Reel.FSM_RUOTA_0B=1;	// 1
Reel.FSM_RUOTA_1=2; 	// 2. Ferma
Reel.FSM_RUOTA_2=3;	    // 3. Carica
Reel.FSM_RUOTA_3=4;	    // 4. Rotazione
Reel.FSM_RUOTA_4=5;
Reel.FSM_RUOTA_5=6;
//---------------------------------------------------------------------------//
Reel.REELS_TAB_SCATTER_SOUND=[SoundGenerator.SCATTER_1,SoundGenerator.SCATTER_2,SoundGenerator.SCATTER_3,SoundGenerator.SCATTER_3,SoundGenerator.SCATTER_3];
Reel.REELS_TAB_TURBO_SOUND=[0,0,0,0,0];
//--------------------------------------------------------------------------//
// A static array to monitor reels with motion status
var Reels_MotionStatus=Array(window.NUM_REELS);
var Reel_BloccoSimultaneo=0;
var Reel_ProgScatter=0;
var Reel_TurboSprite=null;
var Reel_LockTurbo=0;
var Reel_StageType=0;
//--------------------------------------------------------------------------//
function Reel(id_reel,app_reference,parent_container,parent_renderer) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage = parent_container;    // ReelHolder container
    this.ParentRender= parent_renderer;
    this.ReelContainer = new PIXI.Container();
    this.AnimationContainer = new PIXI.Container();
    this.AnimationContainer.visible=false;


    this.IDReel=id_reel;
    this.SymbolSprite= new TiledSprite("SYM", window.NUM_SIMBOLI , true, this.ReelContainer,'.webp');
    this.DEBUG_LOG("Created symbol sprite for reel "+this.IDReel+"length "+window.NUM_SIMBOLI);
    this.Motion=null;
    this.IDSimbolo=Slot.ID_SIMBOLO_0;
    this.SimboliEstrattiRef = null;
    this.SampleBrakeFired=false;
    this.LoadedTurbo=false;
    this.NotifyTurbo=false;

    this.Animation=new ReelAnimation(this.IDReel,this.AnimationContainer,this.ApplicationRef);

    // Create the motion
    if (this.HaveMotion()==true) {

        this.Motion=new ReelMotion(this.IDReel,this.ReelContainer,this.ParentRender);

        // Create (once) turbo effect
        if (Reel_TurboSprite==null){

            Reel_TurboSprite=new TiledSprite("ReelTurbo_", 10 , true, null,'.webp');
            Reel_TurboSprite.Setup();
        }
    }

    this.OverlaySprite=new TiledSprite("SymSpecial_", 6 , false , this.ReelContainer,'.webp');

    this.StepFSM=Reel.FSM_RUOTA_0B;
}

// Create a Reel.prototype object that inherits from SObject.prototype.
Reel.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to Reel
Reel.prototype.constructor = Reel;

//------------------------------------------------------------//
Reel.prototype.SetupCoords = function() {

    var xx,yy;

    xx=window.REELS_TAB_X[parseInt((this.IDReel%window.NUM_REELS))];
    yy=window.REELS_TAB_Y[parseInt((this.IDReel/window.NUM_REELS))];

    this.ReelContainer.x=xx;
    this.ReelContainer.y=yy;
}
//--------------------------------------------------------------------------//
Reel.prototype.Visible = function(vsb) {

    this.ReelContainer.visible=vsb;
}
//--------------------------------------------------------------------------//
Reel.prototype.HaveMotion = function() {

    if (this.IDReel<window.NUM_REELS)
        return true;

    return false;
}
//--------------------------------------------------------------------------//
Reel.prototype.Init = function(p_pSimboliEstratti) {

    // Refrence the symbols matrix
    this.SimboliEstrattiRef=p_pSimboliEstratti;
    this.SimboliEstrattiRef[this.IDReel]=Reel.REELS_TAB_SYMS_RESET[this.IDReel];

    // Setup the tiled sprite
    this.SymbolSprite.Setup();

    if (this.OverlaySprite!=null)
        this.OverlaySprite.Setup();

    // Set a default symbol
    this.SetSymbol( Reel.REELS_TAB_SYMS_RESET[this.IDReel] );
    // And actualize video frame
    this.AttualizzaSimbolo();

    this.SetupCoords();

    // If this reel has motion,initialize
    if (this.HaveMotion()==true) {
        this.Motion.Init(p_pSimboliEstratti);
    }

    this.Animation.Init();

    // Aggancia a riposo qui l'animazione
    this.ReelContainer.addChild(this.AnimationContainer);

    // Aggancia il rullo al parent
    this.ParentStage.addChild(this.ReelContainer);
}
//--------------------------------------------------------------------------//
Reel.prototype.Spin_Start = function() {

    Reel_BloccoSimultaneo=0;

    this.StepFSM = Reel.FSM_RUOTA_2;
}
//------------------------------------------------------------//
Reel.prototype.AnimationContainer_Setup = function()
{
    this.ReelContainer.removeChild(this.AnimationContainer);

    this.ApplicationRef.SLOT().CONTAINER().addChild(this.AnimationContainer);

    this.AnimationContainer.x=this.ReelContainer.x;
    this.AnimationContainer.y=this.ReelContainer.y;
    this.AnimationContainer.visible=true;
}
//------------------------------------------------------------//
Reel.prototype.Animate_Start = function(ani_line,ani_type) {

    var main_sym,ani_line;

    this.Mistery_Off();

    if (this.ReelContainer.visible==false)
        return;

    if (this.ReelContainer.children.indexOf( this.AnimationContainer ) !== -1)
    {
        //this.SymbolSprite.Visible(false);
        this.SymbolOff();

        this.AnimationContainer_Setup();

        if (ani_line<window.NUM_LINEE)
        {
            if (this.IDSimbolo==window.ID_SIMBOLO_JOLLY)
                main_sym=this.IDSimbolo;
            else
            {
                main_win=this.ApplicationRef.SLOT().SLOT_COMBO().DirettriciVincenti[ani_line];

                main_sym=this.ApplicationRef.SLOT().SLOT_COMBO().GetSimboloCombinazione(main_win);
            }
        }
        else
        {
            main_sym=this.IDSimbolo;
            ani_line=0;
        }


        if (this.ApplicationRef.SLOT().SLOT_WILD().IsSymbolOverlapped(this.IDReel)==true)
        {
            //this.ApplicationRef.SLOT().SLOT_WILD().PulseOnWin(this.IDReel);

            this.AnimationContainer.alpha=0.2;
        }
/*
        else if (this.ApplicationRef.SLOT().FREESPIN().IsSymbolOverlapped(this.IDReel)==true)
        {
            this.AnimationContainer.alpha=0.4;
        }
*/
        else
        {
            this.AnimationContainer.alpha=1.0;
        }

        //this.Animation.AnimationFreeSpin(m_SpinOverOnFreespins);

        this.Animation.AnimateInit(main_sym,ani_line,ani_type);

        this.StepFSM = Reel.FSM_RUOTA_1;
    }
}
//------------------------------------------------------------//
Reel.prototype.Animate_Stop = function() {

    // E' in animazione?

    //if (this.ParentStage.children.indexOf( this.AnimationContainer ) !== -1)
    if (this.ApplicationRef.SLOT().CONTAINER().children.indexOf( this.AnimationContainer ) !== -1)
    {
        this.ReelIn();

        this.ApplicationRef.SLOT().CONTAINER().removeChild(this.AnimationContainer);

        this.ReelContainer.addChild(this.AnimationContainer);
        this.AnimationContainer.visible=false;
        this.AnimationContainer.x=0;
        this.AnimationContainer.y=0;

        this.Animation.AnimateOver();
    }

    this.SymbolOn();
}
//--------------------------------------------------------------------------//
Reel.prototype.Stop = function() {

    //this.Mistery_Off();

    // 1. Se la ruota sta girando...
    if (this.StepFSM == Reel.FSM_RUOTA_3)
    {
        this.StepFSM = Reel.FSM_RUOTA_4;
    }
    // 2. Se la ruota e'in animazione
    else if (this.StepFSM == Reel.FSM_RUOTA_1)
    {
        this.Animate_Stop();

        this.StepFSM = Reel.FSM_RUOTA_0;
    }
    // 3. Se la ruota e'in IDLE
    else if (this.StepFSM == Reel.FSM_RUOTA_0B)
    {
        this.StepFSM = Reel.FSM_RUOTA_0;
    }
    // 3. Se la ruota e'in fine rallentamento
    else if (this.StepFSM > Reel.FSM_RUOTA_5)
    {
        this.StepFSM = Reel.FSM_RUOTA_0B;
    }
}
//--------------------------------------------------------------------------//
Reel.prototype.Paint = function(ellapsed_ms) {

    var sym_vsb=false;

    switch(this.StepFSM){

        //*********************************************************************
        // 0.0 Ferma
        //*********************************************************************
        case Reel.FSM_RUOTA_0:{

            this.AttualizzaSimbolo();

            this.StepFSM=Reel.FSM_RUOTA_0B;
        }break;

        case Reel.FSM_RUOTA_0B:{

        }break;

        //*********************************************************************
        // 1.0 Animation
        //*********************************************************************
        case Reel.FSM_RUOTA_1:{

            this.Animation.Animate(ellapsed_ms);

        }break;

        //*********************************************************************
        // 2.0 Spin Init
        //*********************************************************************
        case Reel.FSM_RUOTA_2:{

            this.SpinInit();

            this.StepFSM=Reel.FSM_RUOTA_3;
        }break;

        //*********************************************************************
        // 3.0 Rotazione
        //*********************************************************************
        case Reel.FSM_RUOTA_3:{

            this.Spin();
        }break;

        //*********************************************************************
        // 4.0 Rallentamento
        //*********************************************************************
        case Reel.FSM_RUOTA_4:
        {
            this.AttualizzaSimbolo();

			if (this.HaveMotion()==true)
			{
				this.Motion.SpinOver();
			}

            this.Spin();

            this.StepFSM=Reel.FSM_RUOTA_5;
        }break;

        case Reel.FSM_RUOTA_5:
        {
            this.Spin();

            if (this.HaveMotion()==true)
            {
                if (this.Motion.IsStopPostion()==true && this.SampleBrakeFired==false)
                {
                    //this.PlaySampleBrake();

                    if (Reel_BloccoSimultaneo==0xFF)
                    {
                        Reel_BloccoSimultaneo=0xFE;

                        //this.StopSampleBrake();

                        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.STOP_ALL_REELS,SoundGenerator.SMP_VOLUME_REDUCE);
                    }
                    else if (Reel_BloccoSimultaneo==0)
                    {
                        this.PlaySampleBrake();
                    }

                    this.SampleBrakeFired=true;
                }

                if (this.Motion.IsSpinOver()==true)
                {
                    Reels_MotionStatus[this.IDReel]=0;

                    this.SymbolOn();
                    //this.SymbolSprite.Visible(true);

                    this.StopTurbo();

                    sym_vsb=true;

                    this.StepFSM++;
                }
            }
            else if (Reels_MotionStatus[parseInt( (this.IDReel%window.NUM_REELS) )]==0)
            {
                //this.SymbolSprite.Visible(true);
                this.SymbolOn();

                sym_vsb=true;

                this.StepFSM++;
            }

            if (sym_vsb==true)
            {
                if (this.IDSimbolo==window.ID_SIMBOLO_SCATTER && this.ScatterAttention()==true)
                {
                    this.Mistery_On(true);
                }

                if (parseInt((this.IDReel/window.NUM_REELS))==(window.NUM_SIMBOLI_RUOTA-1))
                {
                    this.CheckProgressScatter();

                    //this.PlaySampleBrake();
                }
            }

        }break;

        default:break;
    };


    if (this.OverlaySprite!=null)
        this.OverlaySprite.Refresh(ellapsed_ms);

    if (Reel_TurboSprite!=null)
        Reel_TurboSprite.Refresh(ellapsed_ms);

    this.SymbolSprite.Refresh(ellapsed_ms);

}
//---------------------------------------------------------------------------//
Reel.prototype.CheckProgressScatter = function() {

    if (Reel_ProgScatter!=0xFF)
    {
        // c'è lo scatter?
        if (this.SimboliEstrattiRef[this.IDReel] == window.ID_SIMBOLO_SCATTER ||
            this.SimboliEstrattiRef[(this.IDReel-(1*window.NUM_REELS))] == window.ID_SIMBOLO_SCATTER ||
            this.SimboliEstrattiRef[(this.IDReel-(2*window.NUM_REELS))] == window.ID_SIMBOLO_SCATTER)
        {
            Reel_ProgScatter++;
        }
    }
}
//---------------------------------------------------------------------------//
Reel.prototype.ScatterAttention = function() {

    var id_reel,reels;


    if (this.ApplicationRef.SLOT().FREESPIN_IsStarted()==false && Reel_ProgScatter!=0xFF && Reel_ProgScatter<Reel.REELS_TAB_SCATTER_SOUND.length)
    {
        id_reel=(this.IDReel%window.NUM_REELS);

        reels=(window.NUM_REELS-id_reel);

        //if ((m_ProgScatter+1+reels)>=3)
        if ((Reel_ProgScatter+reels)>=3)
            return true;
    }
    return false;
}
//--------------------------------------------------------------------------//
Reel.prototype.AttualizzaSimbolo = function() {

    this.SymbolSprite.SetFrame ( (this.IDSimbolo-window.ID_SIMBOLO_0) );
}
//--------------------------------------------------------------------------//
Reel.prototype.SetSymbol = function(id_sym) {

    this.IDSimbolo=id_sym;
}
//--------------------------------------------------------------------------//
Reel.prototype.SpinInit = function() {

    if (this.ApplicationRef.SLOT().FREESPIN_IsStarted()==true)
        Reel_ProgScatter=0xFF;
    else
        Reel_ProgScatter=0;

    Reel_LockTurbo=window.NUM_REELS;

    this.LoadedTurbo=false;

    this.NotifyTurbo=false;

    //this.SymbolSprite.Visible(false);
    this.SymbolOff();

    this.SampleBrakeFired=false;

    if (this.HaveMotion()==true) {

        Reels_MotionStatus[this.IDReel]=1;

        this.Motion.SpinInit();
    }
}
//--------------------------------------------------------------------------//
Reel.prototype.Spin = function() {

    if (this.HaveMotion()==true) {

        this.Motion.Spin();

        this.CheckTurbo();
    }
}
//------------------------------------------------------------//
Reel.prototype.CheckTurbo = function() {

    if (Reel_BloccoSimultaneo==0 && Reel_ProgScatter>=2)
    {
        if (this.IsInBrake()==false && this.ApplicationRef.SLOT().FREESPIN_IsStarted()==false && Reel_LockTurbo==window.NUM_REELS)
        {
            this.Motion.Turbo();

            Reel_TurboSprite.StopUnlink();

            Reel_TurboSprite.SPRITE_TRANSFORMER().AnimateAbs(0,Reel_TurboSprite.TotFrames-1,SpriteTransformer.ANIMATION_LOOP,400);

            Reel_TurboSprite.LinkTo(this.ApplicationRef.SLOT().CONTAINER());
            Reel_TurboSprite.XX(this.ReelContainer.x,-50);
            Reel_TurboSprite.YY(this.ReelContainer.y,-25);
            Reel_TurboSprite.SCALE_X(1.3)
            Reel_TurboSprite.SCALE_Y(1.07)


            this.ApplicationRef.SOUNDGENERATOR().PlayBrano(Reel.REELS_TAB_TURBO_SOUND[this.IDReel],SoundGenerator.SMP_VOLUME_NORMAL);

            if (Reel_ProgScatter>=2 && this.IDReel!=window.NUM_REELS)
                this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.TURBO_BGND,SoundGenerator.SMP_VOLUME_AMPLIFY);

            Reel_LockTurbo=this.IDReel;

            this.NotifyTurbo=true;

            this.LoadedTurbo=true;
        }
    }
}
//------------------------------------------------------------//
Reel.prototype.StopTurbo = function() {

    // Il Turbo è stato agganciato al Motion?
    if (Reel_TurboSprite.IsChildOf(this.ApplicationRef.SLOT().CONTAINER())==true)
    {
        Reel_TurboSprite.StopUnlink();

        if (this.IDReel==(window.NUM_REELS-1))
            this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.SCATTER_3);

        Reel_LockTurbo=window.NUM_REELS;

        this.LoadedTurbo=false;
    }
}
//------------------------------------------------------------//
Reel.prototype.TurboLoaded = function() {

    if (this.NotifyTurbo==true)
    {
        this.NotifyTurbo=false;
        return true;
    }
    return false;
}

//--------------------------------------------------------------------------//
Reel.prototype.Brake_ACK = function() {
    return true;
}
//--------------------------------------------------------------------------//
Reel.prototype.IsStill = function() {
    return (this.StepFSM==Reel.FSM_RUOTA_0B || this.StepFSM>Reel.FSM_RUOTA_5);
}
//--------------------------------------------------------------------------//
Reel.prototype.IsInBrake = function() {
    return (this.StepFSM==Reel.FSM_RUOTA_4 || this.StepFSM==Reel.FSM_RUOTA_5);
}
//--------------------------------------------------------------------------//
Reel.prototype.IsMoving = function() {
    return (this.StepFSM==Reel.FSM_RUOTA_3 || IsInBrake()==true);
}
//--------------------------------------------------------------------------//
Reel.prototype.IsLoadingSpin = function() {
    return (this.StepFSM==Reel.FSM_RUOTA_2);
}
//--------------------------------------------------------------------------//
Reel.prototype.IsSpinning = function() {
    return (this.StepFSM==Reel.FSM_RUOTA_3);
}
//--------------------------------------------------------------------------//
Reel.prototype.IsAnimating = function() {
    return (this.StepFSM==Reel.FSM_RUOTA_1);
}
//------------------------------------------------------------//
Reel.prototype.FadeOut = function(transition) {
    //m_SfondoOpaco.visible=true;
    //this.SymbolSprite.SetMaskFilter(TiledSprite.MASK_STAT_DARKEN);
    //this.SymbolSprite.Sprite.alpha=0.2;

    if (this.SymbolSprite.IsVisible()==true)
    {
        if (transition==true)
            this.SymbolSprite.SPRITE_TRANSFORMER().FadeAbs(0.2,10,10);
        else
            this.SymbolSprite.Sprite.alpha=0.2;
    }
    else if (this.OverlaySprite!=null)
    {
        if (transition==true)
            this.OverlaySprite.SPRITE_TRANSFORMER().FadeAbs(0.2,10,10);
        else
            this.OverlaySprite.Sprite.alpha=0.2;
    }
}
//------------------------------------------------------------//
Reel.prototype.FadeIn = function(transition) {

    if (this.SymbolSprite.IsVisible()==true)
    {
        this.SymbolSprite.SetMaskFilter(TiledSprite.MASK_STAT_NONE);

        //this.SymbolSprite.Sprite.alpha=1.0;
        if (transition==true)
            this.SymbolSprite.SPRITE_TRANSFORMER().FadeAbs(1.0,3,10);
        else
            this.SymbolSprite.Sprite.alpha=1.0;
    }
    else if (this.OverlaySprite!=null)
    {
        if (transition==true)
            this.OverlaySprite.SPRITE_TRANSFORMER().FadeAbs(1.0,3,10);
        else
            this.OverlaySprite.Sprite.alpha=1.0;
    }
}
//------------------------------------------------------------//
Reel.prototype.TurnOff = function () {

    //m_SfondoOpaco.visible=true;
    if (this.SymbolSprite.IsVisible()==true)
    {
        this.SymbolSprite.SetMaskFilter(TiledSprite.MASK_STAT_GRAY);
    }
    else if (this.OverlaySprite != null)
    {
        this.OverlaySprite.SetMaskFilter(TiledSprite.MASK_STAT_GRAY);
    }
}
//------------------------------------------------------------//
Reel.prototype.TurnOn = function () {

    if (this.SymbolSprite.IsVisible() == true)
    {
        this.SymbolSprite.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
    }
    else if (this.OverlaySprite != null)
    {
        this.OverlaySprite.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
    }
}
//------------------------------------------------------------//
Reel.prototype.WatchMe = function() {

    this.Stop();

    this.Paint();

    if (this.SymbolSprite.IsVisible()==true)
        this.SymbolSprite.SPRITE_TRANSFORMER().ScaleAndBack(1.1,5,10,SpriteTransformer.MASK_BACK_TO_ORG);
    else if (this.OverlaySprite!=null)
        this.OverlaySprite.SPRITE_TRANSFORMER().ScaleAndBack(1.1,5,10,SpriteTransformer.MASK_BACK_TO_ORG);
}
//--------------------------------------------------------------------------//
Reel.prototype.IsSymbolSpecial = function() {

    var sym_special=0;

    if (this.IDSimbolo==window.ID_SIMBOLO_8)
        sym_special=1;
    else if (this.IDSimbolo==window.ID_SIMBOLO_9)
        sym_special=2;
    else if (this.IDSimbolo==window.ID_SIMBOLO_11)
        sym_special=3;
    else if (this.IDSimbolo==window.ID_SIMBOLO_12)
        sym_special=4;
    else if (this.IDSimbolo==window.ID_SIMBOLO_13)
        sym_special=5;
    else if (this.IDSimbolo==window.ID_SIMBOLO_14)
        sym_special=6;

    return sym_special;
}
//--------------------------------------------------------------------------//
Reel.prototype.SymbolOn = function() {

    this.SymbolSprite.StopTransform();

    if (this.IsSymbolSpecial()!=0)
    {
        this.Mistery_On(false);

        this.SymbolSprite.ResetProperties(false,1.0,1.0);
    }
    else
    {
        //this.Mistery_Off(false);

        this.SymbolSprite.ResetProperties(true,1.0,1.0);
    }


    this.SetupCoords();
}
//--------------------------------------------------------------------------//
Reel.prototype.SymbolOff = function() {

    this.SymbolSprite.StopTransform(); this.SymbolSprite.ResetProperties(false,1.0,1.0); this.SetupCoords();

    if (this.OverlaySprite!=null)
    {
        this.OverlaySprite.StopTransform(); this.OverlaySprite.ResetProperties(false,1.0,1.0);
    }
}
//------------------------------------------------------------//
Reel.prototype.Mistery_On = function(pimp) {

    var frm_spc=0;

    frm_spc=this.IsSymbolSpecial();

    if (this.OverlaySprite!=null && frm_spc!=0)
    {
        this.OverlaySprite.StopUnlink();
        this.OverlaySprite.LinkToParent();

        this.OverlaySprite.ResetProperties(true,1.0,1.0);
        this.OverlaySprite.SetFrame( (frm_spc-1) );
        this.OverlaySprite.XX(0,0);
        this.OverlaySprite.YY(0,0);

        if (pimp==true)
        {
            this.OverlaySprite.SPRITE_TRANSFORMER().ScaleLoop(1.0,1.1,5,30,0);
            this.OverlaySprite.SPRITE_TRANSFORMER().LightAndBack(10.0,5,0);
        }

        this.SymbolSprite.Visible(false);
    }
}
//------------------------------------------------------------//
Reel.prototype.Mistery_Off = function() {

/*
    if (this.OverlaySprite!=null)
    {
        this.OverlaySprite.StopTransform();

        this.OverlaySprite.Visible(false);

        this.SymbolSprite.Visible(true);
    }
*/
    this.SymbolOn();
}
//------------------------------------------------------------//
Reel.prototype.ReelOut = function() {
}
//------------------------------------------------------------//
Reel.prototype.ReelIn = function() {
}
//------------------------------------------------------------//
Reel.prototype.CONTAINER = function () {
    return this.ReelContainer;
}
//------------------------------------------------------------//
Reel.prototype.ANIMATION_CONTAINER = function () {
    return this.ReelContainer;
}
//------------------------------------------------------------//
Reel.prototype.GetXX = function () {
    return this.ReelContainer.x;
}
//------------------------------------------------------------//
Reel.prototype.GetYY = function () {
    return this.ReelContainer.y;
}
//---------------------------------------------------------------------------//
Reel.prototype.PlaySampleBrake = function() {

    var samp=SoundGenerator.STOP_REEL;
    var flags=SoundGenerator.SMP_VOLUME_AMPLIFY;

    if (this.ScatterAttention()==true)
    {
        // c'è lo scatter?
        if (this.SimboliEstrattiRef[this.IDReel] == window.ID_SIMBOLO_SCATTER ||
            this.SimboliEstrattiRef[(this.IDReel+window.NUM_REELS)] == window.ID_SIMBOLO_SCATTER ||
            this.SimboliEstrattiRef[(this.IDReel+(2*+window.NUM_REELS))] == window.ID_SIMBOLO_SCATTER)
        {
            samp=Reel.REELS_TAB_SCATTER_SOUND[Reel_ProgScatter];
            flags=SoundGenerator.SMP_VOLUME_AMPLIFY;
        }
    }

    if (samp!=0)
    {
        //this.StopSampleBrake();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(samp,flags);
    }

    return samp;
}
//---------------------------------------------------------------------------//
Reel.prototype.StopSampleBrake = function() {

    var i;

    for (i=0;i<Reel.REELS_TAB_SCATTER_SOUND.length;i++)
        if (Reel.REELS_TAB_SCATTER_SOUND[i]!=0)
            this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(Reel.REELS_TAB_SCATTER_SOUND[i]);

    for (i=0;i<Reel.REELS_TAB_TURBO_SOUND.length;i++)
        if (Reel.REELS_TAB_TURBO_SOUND[i]!=0)
            this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(Reel.REELS_TAB_TURBO_SOUND[i]);

    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.STOP_REEL);
}
//------------------------------------------------------------//
Reel.prototype.GetCompletedLoops = function() {

    return this.Animation.GetCompletedLoops();
}
//------------------------------------------------------------//
Reel.prototype.SetMagicSymbol = function(id_sym,enb)
{
    if (enb==false)
    {
        this.SymbolSprite.ChangeFrame( (id_sym-1),"SYM");
    }
    else
    {
        this.SymbolSprite.ChangeFrame( (id_sym-1),"SYMMGC");
    }

    if (this.HaveMotion()==true)
        this.Motion.SetMagicSymbol(id_sym,enb);
}

//--------------------------------------------------------------------------//
