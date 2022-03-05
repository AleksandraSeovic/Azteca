//--------------------------------------------------------------------------//
SlotFrame.ORG_MULTIPLIER_X=1525;
SlotFrame.ORG_MULTIPLIER_Y=105;


function SlotFrame(stage_container,app_reference) {
 
    var i;
    var str;
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage = stage_container;
    this.Container=new PIXI.Container();
    
    this.ReelFrame = new TiledSprite("Frame",1,true,this.Container,'.webp');
    this.ReelFrameFS = new TiledSprite("FrameFS",1,false,this.Container,'.webp');
    
    this.Logo  = new TiledSprite("Title",1,true,this.Container,'.webp');

    this.Black=new PIXI.Graphics();
    this.Black.beginFill(0x000000,1.0);
    this.Black.drawRect(0, 0, window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
    this.Black.endFill();
    
    this.GPTimer=this.ArmaTimer(this.GPTimer,100);
    
    this.LogoStatus=0;
}

// Create a SlotReelFrame.prototype object that inherits from SObject.prototype.
SlotFrame.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotFrame
SlotFrame.prototype.constructor = SlotStage;

//--------------------------------------------------------------------------//
SlotFrame.prototype.Init = function() {

    var i;
    
    this.ReelFrame.Setup();
    this.ReelFrameFS.Setup();


    this.Container.addChild(this.Black);
    this.Black.visible=true;
    
    this.Logo.Setup();
    this.Logo.ResetProperties(true,1.0,0.7);
    this.Logo.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT,true);
    //this.Logo.XX(0,0);
    this.Logo.YY(0,0);
    
    this.GPTimer=this.ArmaTimer(this.GPTimer,100);
    
    this.SetType(SlotStage.TEATRO_NORMAL);
    
    this.ParentStage.addChild(this.Container);
    
    //this.Black.on('touchend',ToggleFullScreen);
    //this.Black.on('click',ToggleFullScreen);
    
}
//--------------------------------------------------------------------------//
SlotFrame.prototype.SetType = function(id_type) {

    if (id_type==SlotStage.TEATRO_NORMAL)
    {
        // MOLTIPLICATORE : ON   SPECIAL SYMBOL = OFF
        this.ReelFrame.ResetProperties(true,1.0,1.0);
        this.ReelFrameFS.ResetProperties(false,1.0,1.0);
    }
    else
    {
        // MOLTIPLICATORE : OFF   SPECIAL SYMBOL = ON
        this.ReelFrame.ResetProperties(false,1.0,1.0);
        this.ReelFrameFS.ResetProperties(true,1.0,1.0);
    }
}
//--------------------------------------------------------------------------//
SlotFrame.prototype.Refresh = function(ellapsed_ms) {

    var i,rnd;
    
    this.TimerRefresh(ellapsed_ms);

    switch (this.LogoStatus)
    {
        case 0:
        {
            if (this.GPTimer==0 && this.ApplicationRef.SLOT().Initialized==true)
            {
                window.BENCH_ENABLE=true;
                
                this.LogoStatus++;
            }        
        }break;

        case 1:
        {
            if (this.Black.alpha<=0.0)
            {
                this.ApplicationRef.Preloader_Unmount();
                this.LogoStatus++;
            }
            else
            {   
                this.Black.alpha-=this.DeviceInc(0.01);
            }
        }break;

        case 2:
        {
        }break;

        case 3:
        {
        }break;                
            
        case 4:
        {
        }break;

        case 5:
        {
        }break;

        case 6:
        {
        }break;

        default:break;
    };
 
    this.Logo.Refresh(ellapsed_ms);
}
//--------------------------------------------------------------------------//