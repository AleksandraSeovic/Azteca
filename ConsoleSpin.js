//------------------------------------------------------------//
// Holds Spin button ,autoplay button and +/- global bet
//------------------------------------------------------------//
function ConsoleSpin(app_reference,parent_container) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;
    
    this.Container=new PIXI.Container();
    
    this.Button_Spin  =new ConsoleSpinButton(85,0,this.Container,this.ApplicationRef);
    this.Button_Auto  =new ConsoleButton(                      -1       ,"Butt_Auto",1, 87,208,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');
    this.Button_BetDec=new ConsoleButton(ButtonManager.BUTT_ALLBET_DEC  ,"Butt_Min" ,1,  0,168,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');
    this.Button_BetInc=new ConsoleButton(ButtonManager.BUTT_ALLBET_INC  ,"Butt_Pls" ,1,304,168,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');
    
    this.Style=new ControlStyle(0,0,1.0);
}

// Create a ConsoleSettings.prototype object that inherits from SObject.prototype.
ConsoleSpin.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleSettings
ConsoleSpin.prototype.constructor = ConsoleSpin;

//--------------------------------------------------------------------------//
ConsoleSpin.prototype.Init = function() {
    
    this.Button_Spin.Init();
    this.Button_Auto.Init();
    this.Button_BetDec.Init();
    this.Button_BetInc.Init();
    
    this.Setup();
    
    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
ConsoleSpin.prototype.OnResize = function() {

    this.Setup();
}
//--------------------------------------------------------------------------//
ConsoleSpin.prototype.Setup = function() {
    
    var tab_sub_ctrl;
    
    this.ApplicationRef.CONTROL_BUILDER().GetControlStyle(ControlBuilder.ID_CONSOLE_SPIN,this.Style);
    
    this.Container.x=this.Style.X;
    this.Container.y=this.Style.Y;
    this.Container.scale=new PIXI.Point(this.Style.SCALE,this.Style.SCALE);

        // PER OGNI PULSANTE DEL CONTAINER
        tab_sub_ctrl=this.ApplicationRef.CONTROL_BUILDER().GetSubControlStyle(ControlBuilder.ID_CONSOLE_SPIN,this.Style);

        if (tab_sub_ctrl!=null)
        {   
            this.Button_Spin.XX(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_SPIN].X,0);
            this.Button_Spin.YY(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_SPIN].Y,0);
            this.Button_Spin.SCALE(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_SPIN].SCALE);
            
            this.Button_Auto.XX(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_AUTO].X,0);
            this.Button_Auto.YY(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_AUTO].Y,0);
            this.Button_Auto.SCALE(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_AUTO].SCALE);

            this.Button_BetDec.XX(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_BETDEC].X,0);
            this.Button_BetDec.YY(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_BETDEC].Y,0);
            this.Button_BetDec.SCALE(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_BETDEC].SCALE);

            this.Button_BetInc.XX(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_BETINC].X,0);
            this.Button_BetInc.YY(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_BETINC].Y,0);
            this.Button_BetInc.SCALE(tab_sub_ctrl[ControlBuilder.ID_SPIN_BUTT_BETINC].SCALE);
        }
}
//--------------------------------------------------------------------------//
ConsoleSpin.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);
    
    this.Button_Spin.Refresh(ellapsed_ms);
    this.Button_Auto.Refresh(ellapsed_ms);
    
    this.Button_BetDec.Refresh(ellapsed_ms);
    this.Button_BetInc.Refresh(ellapsed_ms);
    
    if (this.Button_BetDec.GetStatus()==ConsoleButton.STATE_PUSHING ||
        this.Button_BetInc.GetStatus()==ConsoleButton.STATE_PUSHING)
        this.ApplicationRef.CONSOLE().DialogBetEnable(true);

    // Button autoplay?
    if (this.Button_Auto.GetStatus()==ConsoleButton.STATE_PUSHING)
    {
        if (this.ApplicationRef.SLOT().IsAutoPlay()==true)
            this.ApplicationRef.SLOT().BreakAutoPlay();
        else
            this.ApplicationRef.CONSOLE().DialogAutoEnable(true);
    }

    // Spin during autoplay? break auto play
    if (this.Button_Spin.GetStatus()==ConsoleButton.STATE_PUSHING && this.ApplicationRef.SLOT().IsAutoPlay()==true)
    {
        this.ApplicationRef.SLOT().BreakAutoPlay();
        
        this.Button_Spin.SetEnable(false);
    }
    
/*
    // Controlla le selezioni
    if (this.Button_Sound.IsPushed()==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

        this.ApplicationRef.SOUNDGENERATOR().ToggleMute();
    }
*/    
}
//------------------------------------------------------------//
ConsoleSpin.prototype.OnSpinEvent = function(spin) { 
    
    if (this.ApplicationRef.SLOT().FREESPIN().IsRunning()==true)
    {
        this.Button_Auto.SetEnable(false);
        this.Button_BetDec.SetEnable(false);
        this.Button_BetInc.SetEnable(false);
        
        if (spin==true)
            this.Button_Spin.SetEnable(false);
        else
            this.Button_Spin.SetEnable(true);
    }
    else if (spin==true)
    {
        this.Button_Auto.SetEnable(false);
        this.Button_BetDec.SetEnable(false);
        this.Button_BetInc.SetEnable(false);

        // Autoplay?
        if (this.ApplicationRef.PROGRAMMA().GetSPIN_SET().IsAutoPlay()==true)
        {
            this.Button_Spin.SetEnable(true);
            this.Button_Spin.SetFrame(2);
            
            this.Button_Auto.Visible(false);
            
            this.Button_BetDec.Visible(false);
            this.Button_BetInc.Visible(false);
            
        }   
        else
        {
            this.Button_Spin.SetEnable(false);
            this.Button_Spin.SetFrame(1);
/*
            // Mobile landscape?
            if (this.ApplicationRef.IsMobile()==true && this.ApplicationRef.IsPortrait()==false)
            {
                this.Container.visible=false;
            }        
*/            
        }        
    }
    else
    {
        this.Button_Auto.SetEnable(true);
        this.Button_BetDec.SetEnable(true);
        this.Button_BetInc.SetEnable(true);
        
        this.Button_Spin.SetEnable(true);
        
        // Autoplay?
        if (this.ApplicationRef.PROGRAMMA().GetSPIN_SET().IsAutoPlay()==true)
        {
            this.Button_Spin.SetEnable(true);
            this.Button_Spin.SetFrame(2);
            
            this.Button_Auto.Visible(false);
            
            this.Button_BetDec.Visible(false);
            this.Button_BetInc.Visible(false);
        }   
        else
            this.Button_Spin.SetFrame(0);
        
        this.Container.visible=true;
    }
}
//------------------------------------------------------------//
ConsoleSpin.prototype.OnBrakeEnable = function() { 
    
    this.Button_Spin.SetEnable(true);
    this.Button_Spin.SetFrame(2);
}
//------------------------------------------------------------//
ConsoleSpin.prototype.OnBrakePushed = function() { 
    this.Button_Spin.SetEnable(false);
}
//------------------------------------------------------------//
ConsoleSpin.prototype.Disable = function() {
    
    this.Button_Auto.SetEnable(false);
    this.Button_BetDec.SetEnable(false);
    this.Button_BetInc.SetEnable(false);

    this.Button_Spin.SetEnable(false);
}
//------------------------------------------------------------//
ConsoleSpin.prototype.Enable = function() {

    this.Button_Auto.SetEnable(true);
    this.Button_BetDec.SetEnable(true);
    this.Button_BetInc.SetEnable(true);

    this.Button_Spin.SetEnable(true);

    // Autoplay?
    if (this.ApplicationRef.PROGRAMMA().GetSPIN_SET().IsAutoPlay()==true)
    {
        this.Button_Spin.SetFrame(2);

        this.Button_Auto.Visible(false);

        this.Button_BetDec.Visible(false);
        this.Button_BetInc.Visible(false);
    }   
    else
        this.Button_Spin.SetFrame(0);
}
//--------------------------------------------------------------------------//