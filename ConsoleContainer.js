//------------------------------------------------------------//
// Super console controls container
//------------------------------------------------------------//
function ConsoleContainer(parent_container,app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;
    
    this.Container = new PIXI.Container();
    
    this.Panel = new TiledSprite("Panel",1,true,this.Container,'.webp');
    
    this.Bill = new ConsoleBill(app_reference,this.Container);
    this.Info = new ConsoleInfo(app_reference,this.Container);
    this.Settings = new ConsoleSettings(app_reference,this.Container);
    this.Spin = new ConsoleSpin(app_reference,this.Container);
    
    // Dialogs
    this.DialogBet=new ConsoleDialogBet(app_reference,this.ParentContainer);
    this.DialogAuto=new ConsoleDialogAuto(app_reference,this.ParentContainer);
    this.DialogSet=new ConsoleDialogSet(app_reference,this.ParentContainer);
    
    // Full Screen area
    this.FullScreenArea=new TiledSprite("FullScreen",2,false,this.ParentContainer,'.webp');
    
    this.FullScreenTip=0;
}

// Create a ConsoleSettings.prototype object that inherits from SObject.prototype.
ConsoleContainer.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleContainer
ConsoleContainer.prototype.constructor = ConsoleContainer;

//--------------------------------------------------------------------------//
ConsoleContainer.prototype.Init = function() {
    
    this.Panel.Setup();
    
    this.Bill.Init();
    this.Info.Init();
    this.Settings.Init();
    this.Spin.Init();
    
    this.DialogBet.Init();
    this.DialogAuto.Init();
    this.DialogSet.Init();
    
    this.Container.y=(window.VIDEO_HEIGHT-this.Panel.GetSprite().height);
    
    this.ParentContainer.addChild(this.Container);
    
    this.FullScreenArea.Setup();
    this.FullScreenArea.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT);

    //this.FullScreenArea.SetButton(true);
    //this.FullScreenArea.Sprite.on('touchend',ToggleFullScreen);
    //this.FullScreenArea.Sprite.on('click',ToggleFullScreen);
    this.ApplicationRef.SLOT().REEL_FRAME().ReelFrame.SetButton(true);
    this.ApplicationRef.SLOT().REEL_FRAME().ReelFrame.Sprite.on('touchend',ToggleFullScreen);
    this.ApplicationRef.SLOT().REEL_FRAME().ReelFrame.Sprite.on('click',ToggleFullScreen);
    
    this.GPTimer=this.ArmaTimer(this.GPTimer,5000);
}
//--------------------------------------------------------------------------//
ConsoleContainer.prototype.TouchToResize = function() {

    return (window.MOBILE==true && window.IOS==false && this.ApplicationRef.IsPortrait()==false &&
            this.DialogBet.IsActive()==false && this.DialogAuto.IsActive()==false && this.DialogSet.IsActive()==false);
}
//--------------------------------------------------------------------------//
ConsoleContainer.prototype.OnResize = function() {

    this.Bill.OnResize();
    this.Info.OnResize();
    this.Spin.OnResize();
    
    this.DialogBet.OnResize();
    this.DialogAuto.OnResize();
    this.DialogSet.OnResize();
}
//--------------------------------------------------------------------------//
ConsoleContainer.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);
    
    this.Bill.Refresh(ellapsed_ms);
    
    this.Info.Refresh(ellapsed_ms);
    
    this.Settings.Refresh(ellapsed_ms);
    
    this.Spin.Refresh(ellapsed_ms);
    
    if (this.DialogBet.IsActive()==true)
        this.DialogBet.Refresh(ellapsed_ms);
    
    if (this.DialogAuto.IsActive()==true)
        this.DialogAuto.Refresh(ellapsed_ms);

    if (this.DialogSet.IsActive()==true)
        this.DialogSet.Refresh(ellapsed_ms);
    
    this.FullScreenArea.Refresh(ellapsed_ms);
    
    if (this.TouchToResize()==true)
    {    
        if (window.FULL_SCREEN==false && window.FULL_SCREEN_DONE==false && this.GPTimer==0 && this.FullScreenTip<3)
        {
            if (this.FullScreenArea.CurFrame==0)
            {
                this.FullScreenArea.ResetProperties(true,1.0,1.0);
                
                this.FullScreenArea.SetFrame(1);

                this.FullScreenArea.SPRITE_TRANSFORMER().Pause(1000);

                this.FullScreenArea.SPRITE_TRANSFORMER().ScaleAndGoto(1.2,1.0,10,10,0);
            }
            else
            {   
                if (this.FullScreenArea.TransformOver()==true)
                {
                    this.FullScreenArea.SetFrame(0);

                    this.FullScreenArea.ResetProperties(false,1.0,1.0);

                    this.FullScreenArea.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
                    
                    this.GPTimer=this.ArmaTimer(this.GPTimer,10000);
                    
                    this.FullScreenTip++;
                }       
            }
        }
        else
        {
            this.FullScreenArea.StopTransform();
            
            this.FullScreenArea.SetFrame(0);

            this.FullScreenArea.ResetProperties(false,1.0,1.0);

            this.FullScreenArea.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
        }       
    }
    else
        this.FullScreenArea.ResetProperties(false,1.0,1.0);
    
    if (window.SCREEN_TIPPED==true)
    {
        this.OnOuterToch();
        
        window.SCREEN_TIPPED=false;
    }
}
//------------------------------------------------------------//
ConsoleContainer.prototype.OnOuterToch = function() { 

    if (this.DialogBet.IsActive()==true)
        this.DialogBet.OnSpinEvent();

    if (this.DialogAuto.IsActive()==true)
        this.DialogAuto.OnSpinEvent();

    if (this.DialogSet.IsActive()==true)
        this.DialogSet.OnSpinEvent();

    this.Settings.SliderVolume_Disable();
}
//------------------------------------------------------------//
ConsoleContainer.prototype.OnSpinEvent = function(spin) { 
    
    if (this.ApplicationRef.SLOT().FREESPIN().IsArmed()==true)
    {
        this.Disable();
    }
    else if (this.ApplicationRef.SLOT().FREESPIN().IsRunning()==true)
    {
        this.Disable();
        
        this.Spin.OnSpinEvent(spin);
    }
    else
    {   
        this.Bill.OnSpinEvent(spin);

        this.Settings.OnSpinEvent(spin);

        this.Spin.OnSpinEvent(spin);

        if (this.DialogBet.IsActive()==true)
            this.DialogBet.OnSpinEvent();

        if (this.DialogAuto.IsActive()==true)
            this.DialogAuto.OnSpinEvent();

        if (this.DialogSet.IsActive()==true)
            this.DialogSet.OnSpinEvent();
    }
}
//------------------------------------------------------------//
ConsoleContainer.prototype.OnBrakeEnable = function() { 

    if (this.ApplicationRef.SLOT().FREESPIN_IsRunning()==true)
    {
        this.Disable();
    }
    else
        this.Spin.OnBrakeEnable();
}
//------------------------------------------------------------//
ConsoleContainer.prototype.OnBrakePushed = function() { 

    this.Spin.OnBrakePushed();
}
//------------------------------------------------------------//
ConsoleContainer.prototype.SetFreezeCounters = function(frz) {    
    
    this.Bill.SetFreezeCounters(frz);
}
//------------------------------------------------------------//
ConsoleContainer.prototype.UpdateDisplayQueue = function() {    
    
    this.Info.UpdateDisplayQueue();
}
//------------------------------------------------------------//
ConsoleContainer.prototype.Disable = function() {
    
    this.Settings.Disable();
    this.Spin.Disable();
}
//------------------------------------------------------------//
ConsoleContainer.prototype.Enable = function() {

    if (this.ApplicationRef.SLOT().FREESPIN_IsRunning()==true)
    {
        this.Disable();
    }
    else
    {
        this.Settings.Enable();
        this.Spin.Enable();
    }
}
//--------------------------------------------------------------------------//
ConsoleContainer.prototype.SetStaticDisplay = function(str,queue) {    
    this.Info.SetCaption(str,queue);
}
//------------------------------------------------------------//
ConsoleContainer.prototype.DialogBetEnable = function(enb) {

    this.DialogBet.SetActive(enb);
    
    if (enb==true){
        this.DialogAuto.SetActive(false);
        this.DialogSet.SetActive(false);
    }
}
//------------------------------------------------------------//
ConsoleContainer.prototype.DialogAutoEnable = function(enb) {

    this.DialogAuto.SetActive(enb);
    if (enb==true){
        
        this.DialogBet.SetActive(false);
        this.DialogSet.SetActive(false);
    }        
}
//------------------------------------------------------------//
ConsoleContainer.prototype.DialogSetEnable = function(enb) {

    this.DialogSet.SetActive(enb);
    
    if (enb==true)
    {
        this.DialogAuto.SetActive(false);
        this.DialogBet.SetActive(false);
    }        
}
//------------------------------------------------------------//
ConsoleContainer.prototype.SpinSet = function(enb) {

    if (enb==true)
        this.Enable();
    
    if (this.TouchToResize()==true)
    {
        if (enb==true)
        {
            this.FullScreenArea.SetFrame(0);

            this.GPTimer=this.ArmaTimer(this.GPTimer,5000);
        }
        else
        {
            this.FullScreenArea.Visible(false);
        }
    }
}
//------------------------------------------------------------//
ConsoleContainer.prototype.CONTAINER = function() {
    return this.Container;
}   
//--------------------------------------------------------------------------//