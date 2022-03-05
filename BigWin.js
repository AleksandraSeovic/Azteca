//---------------------------------------------------------------------------//
//--------------------------------------------------------------------------//
function BigWin(app_reference) {    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.Container      = new PIXI.Container();
    this.ParentContainer= null;

    this.BackGround=new PIXI.Graphics();
    this.BackGround.beginFill(0x000000,0.5);
    this.BackGround.drawRect(0, 0, window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
    this.BackGround.endFill();    
    
    this.Panel= new TiledSprite("BigWin",16, true, this.Container,'.webp');

    this.DisplayWin =null;
    
    this.WinUp=0;
    this.Step=0;
    this.Mounted=false;
    this.StopRequest=false;
    
    this.Container.y=-40;
    this.Container.visible=false;
}

// Create a BigWin.prototype object that inherits from SObject.prototype.
BigWin.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to BigWin
BigWin.prototype.constructor = BigWin;
//--------------------------------------------------------------------------//
BigWin.prototype.Init = function() {
    
    this.Container.addChild(this.BackGround);
    
    //this.BackGround.Setup();
    //this.BackGround.SetButton(true);
    
    this.Panel.Setup();
    
    this.DisplayWin =new DisplaySprite(8,0,0,"GFXFontA","left",DisplaySprite.NUMERIC_DISPLAY,this.Container,'.webp');
    this.DisplayWin.Init();
    this.DisplayWin.SetCaption("0");
    //this.DisplayWin.SCALE(0.8);
    this.DisplayWin.Visible(true);
    
}		
//------------------------------------------------------------//
BigWin.prototype.Mount = function(caption,footer,win_up,parent_container) {    
    
    this.WinUp=win_up;

    this.ApplicationRef.SOUNDGENERATOR().Stop();
    
    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BIG_WIN,SoundGenerator.SMP_VOLUME_NORMAL);
    
    
    this.Panel.ResetProperties(true,0.0,1.00);
    this.Panel.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT,true);
    this.Panel.SetButton(true);
    this.Panel.SetFrame(0);
    
    
    this.DisplayWin.StopTransform();
    
    this.DisplayWin.SetCaption( win_up.toString() );
    this.DisplayWin.ALPHA(0.0);
    this.DisplayWin.SCALE(1.1);
    this.DisplayWin.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
    this.DisplayWin.YY(this.DisplayWin.Container.y,34);
    
    
    this.GPTimer=0;
    this.Mounted=true;

    this.StopRequest=false;
    
    this.ParentContainer=parent_container;
    
    this.ParentContainer.addChild(this.Container);
    
    this.ExitRequest=false;
    this.Step=1;
}
//------------------------------------------------------------//
BigWin.prototype.UnMount = function(win_up,caption,parent_container) {

    if (this.Mounted==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.BIG_WIN);

        this.Panel.StopTransform();
        
        this.Step=0;
        
        this.ParentContainer.removeChild(this.Container);
        
        this.Mounted=false;
        
        this.ExitRequest=false;
        
        this.Container.visible=false;
    }
}
//------------------------------------------------------------//
BigWin.prototype.Refresh = function(ellapsed_time) {

    SObject.prototype.TimerRefresh.call(this,ellapsed_time);
    
    switch(this.Step){

        case 0:{
            
            
        }break;
            
        case 1:{
            
            this.Panel.SPRITE_TRANSFORMER().FadeAbs(1.0,10,100);
            
            this.Container.visible=true;

            this.Step=2;
        }break;
        
        case 2:{
            
            if (this.GPTimer==0)
            {
                this.DisplayWin.ALPHA_INC(0.1);
                
                this.GPTimer=this.ArmaTimer(this.GPTimer,100);
            }
            
            if (this.Panel.TransformOver()==true && this.DisplayWin.ALPHA_GET()>=1.0)
            {
                this.Panel.SPRITE_TRANSFORMER().AnimateAbs(0,this.Panel.TotFrames-1,SpriteTransformer.ANIMATION_NONE,80);
                
                this.DisplayWin.MoveEx(0,-10,20,20);
                
                this.Step=3;
            }
        }break;
            
        case 3:
        {
            if (this.Panel.TransformOver()==true)
                if (this.Panel.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ExitRequest=true;
                }
        }break;
            
        default:break;
    }
    
    
    this.DisplayWin.Refresh(ellapsed_time);
    this.Panel.Refresh(ellapsed_time);
}
//------------------------------------------------------------//
BigWin.prototype.IsMounted = function() {

    return this.Mounted;
}
//------------------------------------------------------------//
BigWin.prototype.Exit = function() {

    return this.ExitRequest;
}
//---------------------------------------------------------------------------//

