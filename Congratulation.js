//---------------------------------------------------------------------------//
Congratulation.ORG_Y_PANEL=105;
//--------------------------------------------------------------------------//
function Congratulation(app_reference) {
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

    this.Rays =new TiledSprite("Rays",1, true, this.Container,'.webp');

    this.Panel= new TiledSprite("WinUp",1, true, this.Container,'.webp');

    this.PanelAniTime=0;
    this.TimerWait=0;

    this.DisplayWin =null;

    this.DisplayFooter =null;

    this.Step=0;
    this.Mounted=false;
    this.StopRequest=false;

    this.SnowEmitter= null;

    this.Container.visible=false;
}

// Create a Congratulation.prototype object that inherits from SObject.prototype.
Congratulation.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to Congratulation
Congratulation.prototype.constructor = Congratulation;
//--------------------------------------------------------------------------//
Congratulation.prototype.Init = function() {

    var resources;
    var json_data;


    this.Container.addChild(this.BackGround);

    resources=this.ApplicationRef.TEXTURE_DB();

    json_data=resources["PRT_Snow"].data;

    this.SnowEmitter= new PIXI.particles.Emitter(this.Container,[PIXI.Texture.fromFrame("Star1.webp"),PIXI.Texture.fromFrame("Star2.webp"),PIXI.Texture.fromFrame("Star3.webp"),PIXI.Texture.fromFrame("Star4.webp")],json_data);

    this.SnowEmitter.emit=true;

    this.Rays.Setup();

    this.Panel.Setup();

    this.DisplayWin =new DisplayStyle(window.VIDEO_WIDTH,0,0,"center",this.Container,
                                            new PIXI.TextStyle({
                                                fontFamily: 'Game_Font',
                                                fontSize: 70,
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fill: 'white'
                                            })
                                      );

    this.DisplayFooter =new DisplayStyle(window.VIDEO_WIDTH,0,0,"center",this.Container,
                                            new PIXI.TextStyle({
                                                fontFamily: 'Game_Font',
                                                fontSize: 32,
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fill: 'white'
                                            })
                                      );

    this.DisplayWin.Init();

    this.DisplayFooter.Init();
}
//------------------------------------------------------------//
Congratulation.prototype.Mount = function(background_animation_res,background_animation_frames,background_animation_time,background_offsY,win_string,win_YY,footer_string,footer_YY,parent_container, extension = '.png') {

    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.GAME_LOOP);

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CONGRATULATION,SoundGenerator.SMP_VOLUME_SUPER_AMPLIFY);

    this.Rays.GetSprite().anchor.set(0.5);

    this.Panel.SetNewTileAt(background_animation_res,background_animation_frames,2,extension);

    this.PanelAniTime=background_animation_time;

    //this.Panel.Setup();

    // move the sprite to the center of the screen
    this.Rays.GetSprite().alpha=0.5;
    this.Rays.GetSprite().x = window.VIDEO_WIDTH / 2;
    this.Rays.GetSprite().y = window.VIDEO_HEIGHT / 2;


    this.DisplayWin.SetCaption(win_string);
    this.DisplayWin.ResetProperties(false,1.0,1.0);
    this.DisplayWin.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
    this.DisplayWin.YY(Congratulation.ORG_Y_PANEL,win_YY);
    this.DisplayWin.StopTransform();

    this.DisplayFooter.SetCaption(footer_string);
    this.DisplayFooter.ResetProperties(false,1.0,1.0);
    this.DisplayFooter.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
    this.DisplayFooter.YY(Congratulation.ORG_Y_PANEL,footer_YY);
    this.DisplayFooter.StopTransform();


    this.Rays.Visible(false);

    this.Panel.ResetProperties(true,1.0,1.0);
    this.Panel.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT,true);
    this.Panel.Sprite.y+=background_offsY;
    this.Panel.SetFrame(0);

    if (background_animation_frames==1)
        this.Panel.SPRITE_TRANSFORMER().ScaleAbs(0.5,0.5,1,0,0);

    this.Mounted=true;

    this.StopRequest=false;

    this.ParentContainer=parent_container;

    this.ParentContainer.addChild(this.Container);

    this.Container.visible=true;

    this.Step=1;
}
//------------------------------------------------------------//
Congratulation.prototype.UnMount = function() {

    if (this.Mounted==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.CONGRATULATION);

        this.Step=0;

        this.ParentContainer.removeChild(this.Container);

        this.Container.visible=false;

        this.Mounted=false;
    }
}
//------------------------------------------------------------//
Congratulation.prototype.Refresh = function(ellapsed_time) {

    SObject.prototype.TimerRefresh.call(this,ellapsed_time);

    this.TimerWait=this.TimerDec(this.TimerWait,ellapsed_time);

    switch(this.Step){

        case 0:{}break;

        case 1:
        {
            if (this.Panel.TransformOver()==true)
            {
                if (this.Panel.TotFrames>1)
                    this.Panel.SPRITE_TRANSFORMER().AnimateAbs(0,this.Panel.TotFrames-1,SpriteTransformer.ANIMATION_NONE,this.PanelAniTime);
                else
                    this.Panel.SPRITE_TRANSFORMER().ScaleAbs(1.0,1.0,5,this.PanelAniTime);

                this.Step++;
            }
        }break;

        case 2:
        {
            if (this.Panel.TransformOver()==true)
            {
                this.DisplayWin.ResetProperties(true,1.0,1.0);
                this.DisplayFooter.ResetProperties(true,1.0,1.0);

                this.Rays.Visible(true);

                this.Panel.SetButton(true);

                this.TimerWait=this.ArmaTimer(this.TimerWait,5000);

                this.Step++;
            }

        }break;

        case 3:
        {
            if (this.Panel.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true || this.TimerWait==0)
            {
                this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

                this.UnMount();
            }
        }break;

        default:break;
    }


    if (this.Panel!=null)
    {
        this.Panel.Refresh(ellapsed_time);
        this.DisplayWin.Refresh(ellapsed_time);
        this.DisplayFooter.Refresh(ellapsed_time);

        this.SnowEmitter.update((ellapsed_time*0.001));

        this.Rays.GetSprite().rotation += this.DeviceRotation(0.005);
    }
}
//------------------------------------------------------------//
Congratulation.prototype.IsMounted = function() {

    return this.Mounted;
}
//------------------------------------------------------------//
Congratulation.prototype.Exit = function() {

    if (this.Mounted==true)
        return false;
    return true;
}
//---------------------------------------------------------------------------//

