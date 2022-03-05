//---------------------------------------------------------------------------//
//--------------------------------------------------------------------------//
function FreeSpinCongratulation(app_reference) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.Container      = new PIXI.Container();
    this.ParentContainer= null;

    this.BackGround = new TiledSprite("PanelFS",1, true, this.Container,'.webp');

    this.DisplayTitle = new DisplayStyle(0,0,0,"center",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#f01000'], // gradient
                            stroke: '#4a1850',
                            strokeThickness: 5,
                            dropShadow: true,
                            dropShadowColor: '#000000',
                            dropShadowBlur: 4,
                            dropShadowAngle: Math.PI / 6,
                            dropShadowDistance: 6
                        })
                  );

    this.DisplayText = new DisplayStyle(0,0,0,"center",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 50,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#A0A000', '#FFFF00'], // gradient
                            stroke: '#330033',
                            strokeThickness: 3,
                            dropShadow: true,
                            dropShadowColor: '#000000',
                            dropShadowBlur: 4,
                            dropShadowAngle: Math.PI / 6,
                            dropShadowDistance: 6
                        })
                  );

    this.DisplayWin = new DisplayStyle(0,0,0,"center",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#f01000'], // gradient
                            stroke: '#4a1850',
                            strokeThickness: 5,
                            dropShadow: true,
                            dropShadowColor: '#000000',
                            dropShadowBlur: 4,
                            dropShadowAngle: Math.PI / 6,
                            dropShadowDistance: 6
                        })
                  );

    this.DisplayFooter = new DisplayStyle(0,0,0,"center",this.Container,
                            new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 50,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            fill: ['#A0A000', '#FFFF00'], // gradient
                            stroke: '#330033',
                            strokeThickness: 3,
                            dropShadow: true,
                            dropShadowColor: '#000000',
                            dropShadowBlur: 4,
                            dropShadowAngle: Math.PI / 6,
                            dropShadowDistance: 6
                        })
                  );

    this.BackSprite= new TiledSprite("FX_Energy", 1 , true, this.Container,'.webp');
    this.SymbolSprite= new TiledSprite("SYM", window.NUM_SIMBOLI , true, this.Container,'.webp');

    this.Step=0;
    this.Mounted=false;
    this.StopRequest=false;

    this.Container.visible=false;
    this.Container.y=-40;

    this.MagicSymbol=0;
}

// Create a Congratulation.prototype object that inherits from SObject.prototype.
FreeSpinCongratulation.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to FreeSpinCongratulation
FreeSpinCongratulation.prototype.constructor = FreeSpinCongratulation;
//--------------------------------------------------------------------------//
FreeSpinCongratulation.prototype.Init = function() {

    this.BackGround.Setup();

    this.BackGround.SetButton(true);

    this.DisplayTitle.Init();

    this.DisplayText.Init();

    this.DisplayWin.Init();

    this.DisplayFooter.Init();

    this.BackSprite.Setup();
    this.BackSprite.ResetProperties(true,1.0,0.8);
    this.BackSprite.GetSprite().anchor.set(0.5);
    this.BackSprite.GetSprite().x = window.VIDEO_WIDTH / 2;
    this.BackSprite.GetSprite().y = window.VIDEO_HEIGHT / 2;
    this.BackSprite.GetSprite().y += (60+30);

    this.SymbolSprite.Setup();

    this.DisplayTitle.Visible(true);

    this.DisplayText.Visible(true);

    this.DisplayWin.Visible(false);

    this.DisplayFooter.Visible(true);
}
//------------------------------------------------------------//
FreeSpinCongratulation.prototype.Mount = function(title,caption,win_up,footer,magic_symbol,parent_container) {

    //this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BIG_WIN);

    this.MagicSymbol=magic_symbol;

    // move the sprite to the center of the screen
    this.DisplayTitle.SetAreaWidth(window.VIDEO_WIDTH);
    this.DisplayTitle.YY(200,20);
    this.DisplayTitle.SetCaption(title);

    this.DisplayText.SetAreaWidth(window.VIDEO_WIDTH);
    this.DisplayText.YY(300,20);
    this.DisplayText.SetCaption(caption);

    this.DisplayWin.SetAreaWidth(window.VIDEO_WIDTH);
    this.DisplayWin.YY(400,20);
    this.DisplayWin.SetCaption(win_up);

    this.DisplayFooter.SetAreaWidth(window.VIDEO_WIDTH);
    this.DisplayFooter.YY(380,20);
    this.DisplayFooter.SetCaption(footer);

    this.SymbolSprite.ResetProperties(true,0.0,0.1);
    this.SymbolSprite.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT,true);
    this.SymbolSprite.GetSprite().y += (60+30);

    this.Mounted=true;

    this.StopRequest=false;

    this.ParentContainer=parent_container;

    this.ParentContainer.addChild(this.Container);

    this.Container.visible=true;

    this.GPTimer=this.ArmaTimer(this.GPTimer,(5*1000));

    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.GAME_LOOP);

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.MAGIC_INTRO,(SoundGenerator.SMP_VOLUME_AMPLIFY|SoundGenerator.SMP_LOOP));

    this.Step=1;
}
//------------------------------------------------------------//
FreeSpinCongratulation.prototype.UnMount = function() {

    if (this.Mounted==true)
    {
        //this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.BIG_WIN);

        this.SymbolSprite.StopTransform();
        this.BackSprite.StopTransform();

        this.Step=0;

        this.ParentContainer.removeChild(this.Container);

        this.Container.visible=false;

        this.Mounted=false;
    }
}
//------------------------------------------------------------//
FreeSpinCongratulation.prototype.SymbolToFrame = function(id_sym) {

    var frm;

    frm=(id_sym-window.ID_SIMBOLO_0);

    return frm;
}
//------------------------------------------------------------//
FreeSpinCongratulation.prototype.Refresh = function(ellapsed_ms) {

    var id_sym;

    this.TimerRefresh(ellapsed_ms);

    switch(this.Step){

        case 0:{


        }break;

        case 1:
        {
            if (this.SymbolSprite.TransformOver()==true)
            {
                if (this.GPTimer==0)
                {
                    id_sym=this.MagicSymbol;
                    this.StopRequest=true;
                }
                else
                {
                    do
                    {
                        id_sym=window.ID_SIMBOLO_0+Lib.Rand( 9 );
                    }while(this.SymbolSprite.CurFrame==this.SymbolToFrame(id_sym));
                }

                this.SymbolSprite.SetFrame( this.SymbolToFrame(id_sym) );

                this.Step++;
            }
        }break;

        case 2:
        {
            this.SymbolSprite.SPRITE_TRANSFORMER().FadeAbs(1.0,20,10);
            this.SymbolSprite.SPRITE_TRANSFORMER().ScaleAbs(1.0,1.0,20,10,SpriteTransformer.MASK_NONE);
            this.Step++;

            //this.SpriteBack.Refresh(ellapsed_time);
        }break;

        case 3:
        {
            if (this.SymbolSprite.TransformOver()==true)
            {
                if (this.StopRequest==true)
                {
                    this.SymbolSprite.SPRITE_TRANSFORMER().ScaleAbs(1.3,1.3,10,10,SpriteTransformer.MASK_NONE);

                    this.SymbolSprite.SPRITE_TRANSFORMER().LightAndBack(10.0,10,10);

                    this.GPTimer=this.ArmaTimer(this.GPTimer,(2*1000));

                    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano( SoundGenerator.MAGIC_INTRO );

                    //this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.MAGIC_SELECTION,SoundGenerator.SMP_VOLUME_AMPLIFY);

                    this.Step++;
                }
                else
                {
                    this.SymbolSprite.SPRITE_TRANSFORMER().ScaleAbs(0.1,0.1,5,10,SpriteTransformer.MASK_NONE);
                    this.Step=1;
                }
            }

        }break;

        case 4:
        {
            if (this.SymbolSprite.TransformOver()==true)
            {
                if (this.GPTimer==0 || this.BackGround.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.UnMount();
                }
            }

        }break;

        default:break;
    }

    this.BackSprite.GetSprite().rotation += this.DeviceRotation(0.03);

    this.BackSprite.Refresh(ellapsed_ms);
    this.SymbolSprite.Refresh(ellapsed_ms);
}
//------------------------------------------------------------//
FreeSpinCongratulation.prototype.IsMounted = function() {

    return this.Mounted;
}
//------------------------------------------------------------//
FreeSpinCongratulation.prototype.Exit = function() {

    if (this.Mounted==true)
        return false;
    return true;
}
//---------------------------------------------------------------------------//

