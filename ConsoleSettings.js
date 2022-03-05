//------------------------------------------------------------//
// Holds Audio/Adjust/Paytable buttons
//------------------------------------------------------------//
var ConsoleSettings_SliderPos=0;

function ConsoleSettings(app_reference,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;

    this.Container=new PIXI.Container();

    this.Button_Sound =new ConsoleButton(ButtonManager.BUTT_SOUND,"Butt_Sound" ,3, 77,71,ConsoleButton.TYPE_PUSH_AND_KEEP,this.Container,this.ApplicationRef,'.webp');
    this.Button_Info  =new ConsoleButton(ButtonManager.BUTT_HELP ,"Butt_Help"  ,1, 0, 0,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');
    this.Button_Adjust=new ConsoleButton(                       -1,"Butt_Sett" ,1,5,71,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');
    this.Button_Exit  =new ConsoleButton(ButtonManager.BUTT_EXIT ,"Butt_Close",1,
                                                            (window.VIDEO_WIDTH-100),(-window.VIDEO_HEIGHT)+150,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');

    this.Style=new ControlStyle(0,0,1.0);


    this.SliderVolume_Box=new TiledSprite("Dialog_Volume",1,false,this.Container,'.webp');

    this.SliderVolume_Guide = new PIXI.Graphics();
    this.SliderVolume_Guide.beginFill(0xff0000, 1);
    this.SliderVolume_Guide.drawRect(0, 0, 200, 10);
    this.SliderVolume_Guide.endFill();

    this.SliderVolume_Thumb=null;

    this.CheckVolume=true;
}

// Create a ConsoleSettings.prototype object that inherits from SObject.prototype.
ConsoleSettings.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleSettings
ConsoleSettings.prototype.constructor = ConsoleSettings;

//--------------------------------------------------------------------------//
ConsoleSettings.prototype.Init = function() {

    this.Button_Sound.Init();
    this.Button_Info.Init();
    this.Button_Adjust.Init();
    this.Button_Exit.Init();

    this.Setup();


    if (this.ApplicationRef.SOUNDGENERATOR().AudioEnabled==false) {
        this.Button_Sound.Push();
    }

    this.SliderVolume_Box.Setup();

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
ConsoleSettings.prototype.OnResize = function() {

    this.Setup();
}
//--------------------------------------------------------------------------//
ConsoleSettings.prototype.Setup = function() {

    this.ApplicationRef.CONTROL_BUILDER().GetControlStyle(ControlBuilder.ID_CONSOLE_SET,this.Style);

    this.Container.x=this.Style.X;
    this.Container.y=this.Style.Y;
    this.Container.scale=new PIXI.Point(this.Style.SCALE,this.Style.SCALE);

    if (window.MOBILE==true)
    {
        this.Button_Adjust.XX(0,0); this.Button_Adjust.YY(125,0);

        this.Button_Exit.XX(0,0); this.Button_Exit.YY(502,0);

        this.Button_Exit.SCALE(0.94);

        this.Button_Info.XX(70,0); this.Button_Info.YY(500,0);

        this.Button_Sound.XX(0,0); this.Button_Sound.YY(55,0);
    }

}
//--------------------------------------------------------------------------//
ConsoleSettings.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);

    this.Button_Sound.Refresh(ellapsed_ms);
    this.Button_Info.Refresh(ellapsed_ms);
    this.Button_Adjust.Refresh(ellapsed_ms);
    this.Button_Exit.Refresh(ellapsed_ms);

    // Controlla le selezioni
    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_SOUND)==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().ToggleMute();
        if (this.ApplicationRef.SOUNDGENERATOR().AudioEnabled==true)
        {
            this.ApplicationRef.SLOT().PlayMusic();
            this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

            this.SliderVolume_Enable();
        }
        else
            this.SliderVolume_Disable();
    }

    if (this.Button_Adjust.GetStatus()==ConsoleButton.STATE_PUSHING)
    {
        this.ApplicationRef.CONSOLE().DialogSetEnable(true);
    }

    this.SliderVolume_Update();
}
//------------------------------------------------------------//
ConsoleSettings.prototype.OnSpinEvent = function(spin) {

    if (spin==true)
    {
        this.Button_Info.SetEnable(false);
        this.Button_Adjust.SetEnable(false);
        this.Button_Exit.SetEnable(false);

        this.SliderVolume_Disable();
    }
    else
    {
        this.Button_Info.SetEnable(true);
        this.Button_Adjust.SetEnable(true);
        this.Button_Exit.SetEnable(true);
    }

}
//------------------------------------------------------------//
ConsoleSettings.prototype.Disable = function() {

    this.Button_Info.SetEnable(false);
    this.Button_Adjust.SetEnable(false);
    this.Button_Exit.SetEnable(false);
}
//------------------------------------------------------------//
ConsoleSettings.prototype.Enable = function() {

    this.Button_Info.SetEnable(true);
    this.Button_Adjust.SetEnable(true);
    this.Button_Sound.SetEnable(true);
    this.Button_Exit.SetEnable(true);
}
//------------------------------------------------------------//

ConsoleSettings.prototype.SliderVolume_Enable = function() {

    var slider_thumb_texture;

    slider_thumb_texture = PIXI.Texture.fromFrame("SlideCursor.webp");

    if (this.SliderVolume_Thumb==null)
    {
        this.SliderVolume_Thumb  = new PIXI.Sprite(slider_thumb_texture);
        //this.SliderVolume_Thumb.anchor.set(0.5);
        this.SliderVolume_Thumb.scale.set(1.0);
        this.SliderVolume_Thumb.interactive=true;
        this.SliderVolume_Thumb.buttonMode=true;
        this.SliderVolume_Thumb
            .on('pointerdown', SliderVolume_on_drag_start)
            .on('pointerup', SliderVolume_on_drag_end)
            .on('pointerupoutside', SliderVolume_on_drag_end)
            .on('pointermove', SliderVolume_on_drag_move);
    }

    this.SliderVolume_Guide.x=this.Button_Sound.Sprite.x+110;
    this.SliderVolume_Guide.y=this.Button_Sound.Sprite.y+18;
    //this.SliderVolume_Guide.pivot.x=this.SliderVolume_Guide.width/2;
    this.Container.addChild(this.SliderVolume_Guide);

    this.SliderVolume_Box.CenterBox(this.SliderVolume_Guide.width,this.SliderVolume_Guide.height,false);
    this.SliderVolume_Box.Sprite.x+=this.SliderVolume_Guide.x -10;
    this.SliderVolume_Box.Sprite.y+=this.SliderVolume_Guide.y ;

    this.SliderVolume_Box.Visible(true);

    //this.ApplicationRef.SOUNDGENERATOR().Stop();

    this.SliderVolume_VolumeStart=this.ApplicationRef.SOUNDGENERATOR().SET_Volume;

    this.SliderVolume_Init();

    this.Container.addChild(this.SliderVolume_Thumb);
}

//------------------------------------------------------------//
ConsoleSettings.prototype.SliderVolume_Disable = function() {

    if (this.Container.children.indexOf(this.SliderVolume_Guide)!=-1)
    {
        this.Container.removeChild(this.SliderVolume_Guide);
        this.Container.removeChild(this.SliderVolume_Thumb);

        this.SliderVolume_Box.Visible(false);
    }
}
//------------------------------------------------------------//
ConsoleSettings.prototype.SliderVolume_Init = function()
{
    var volume;

    volume=this.ApplicationRef.SOUNDGENERATOR().SET_Volume;

    if (volume==0)
        this.SliderVolume_Thumb.x=0;
    else
        this.SliderVolume_Thumb.x=parseInt(this.SliderVolume_Guide.x+((volume*this.SliderVolume_Guide.width)/100));

    if (this.SliderVolume_Thumb.x<this.SliderVolume_Guide.x)
        this.SliderVolume_Thumb.x=this.SliderVolume_Guide.x;
    else if (this.SliderVolume_Thumb.x>(this.SliderVolume_Guide.x+this.SliderVolume_Guide.width))
        this.SliderVolume_Thumb.x=(this.SliderVolume_Guide.x+this.SliderVolume_Guide.width);

    this.SliderVolume_Thumb.x-=(this.SliderVolume_Thumb.width/2);

    this.SliderVolume_Thumb.y=this.SliderVolume_Guide.y+((this.SliderVolume_Guide.height-this.SliderVolume_Thumb.height)/2);
}
//------------------------------------------------------------//
ConsoleSettings.prototype.SliderVolume_Update = function()
{
    var offs_volume;

    if (this.SliderVolume_Thumb!=null)
    if (this.SliderVolume_Thumb.dragging==true)
    {
        offs_volume=parseInt ( (100*this.SliderVolume_Thumb.offset)/this.SliderVolume_Guide.width );

        this.ApplicationRef.SOUNDGENERATOR().SET_Volume=(this.SliderVolume_VolumeStart+offs_volume);

        if (this.ApplicationRef.SOUNDGENERATOR().SET_Volume>100)
            this.ApplicationRef.SOUNDGENERATOR().SET_Volume=100;
        else if (this.ApplicationRef.SOUNDGENERATOR().SET_Volume<0)
            this.ApplicationRef.SOUNDGENERATOR().SET_Volume=0;

        this.SliderVolume_Init();

        this.ApplicationRef.SOUNDGENERATOR().UpdateVolume();
    }
    else
    {
        this.SliderVolume_VolumeStart=this.ApplicationRef.SOUNDGENERATOR().SET_Volume;
    }

}
//------------------------------------------------------------//
function SliderVolume_on_drag_start(event)
{
    this.data = event.data;
    this.origin=parseInt(this.data.global.x);
    this.offset=0;
    this.alpha = 0.9;
    this.dragging = true;
};
//------------------------------------------------------------//
function SliderVolume_on_drag_end()
{
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
};
//------------------------------------------------------------//
function SliderVolume_on_drag_move ()
{
    if (this.dragging==true)
    {
        this.offset=(parseInt(this.data.global.x)-this.origin);
    }
};
//--------------------------------------------------------------------------//
