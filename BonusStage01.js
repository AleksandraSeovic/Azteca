
BonusStage01.MAX_PICKS=5;

//--------------------------------------------------------------------------//
BonusStage01.TAB_FLOOR_YY =
[
    BonusStage01Prize.BARRELS_ROW_2,
    BonusStage01Prize.BARRELS_ROW_3,
    BonusStage01Prize.BARRELS_ROW_4,
    BonusStage01Prize.BARRELS_ROW_5
];
//------------------------------------------------------------//
BonusStage01.TAB_PICKS_FLOOR=
[
     [ 0,   1,   2,   3,0xFF],
     [ 4,   5,   6,0xFF,0xFF],
     [ 7,   8,0xFF,0xFF,0xFF],
     [ 9,0xFF,0xFF,0xFF,0xFF]
];

//--------------------------------------------------------------------------//
BonusStage01.TAB_CAPTIONS=
[
    ["CLICK ON THE IMAGE TO CONTINUE","CLICCA SULL'IMMAGINE PER CONTINUARE"],
    ["LIVES LEFT:","VITE RIMASTE:"],
    ["YOU WON ","HAI VINTO "],
    [" PICKS!"," PICKS!"],
    ["CHOOSE A STATUE!","SCEGLI UNA STATUA!"]
];

//--------------------------------------------------------------------------//
function BonusStage01(app_reference, endCallback) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    BonusStagePU.call(this,app_reference);

	this.ID_BONUS=BonusDescriptor.ID_BONUS_PICK;

    this.TYPE_BONUS=BonusStagePU.BONUS_TYPE_MULTI;

    this.NUM_SENSITIVE_AREAS=10;

    this.Bersagli = new Array(this.NUM_SENSITIVE_AREAS);

    for (let i=0; i<this.Bersagli.length; i++)
    {
        this.Bersagli[i]=new BonusStage01Prize (i,app_reference,this.Container);
    }


    this.BackGround      =new TiledSprite("BN01_Stage",1,true,this.Container,'.webp');
    this.FloorIndicatorSX=new TiledSprite("BN01_FloorSX",1,true,this.Container,'.webp');
    this.FloorIndicatorDX=new TiledSprite("BN01_FloorDX",1,true,this.Container,'.webp');

    this.TimesDisplay = new DisplayStyle(0,0,16,"center",this.Container,
                                            new PIXI.TextStyle({
                                            fontFamily: 'Game_Font',
                                            fontSize: 64,
                                            fontStyle: 'normal',
                                            fontWeight: 'bold',
                                            strokeThickness: 2,
                                            fill: 'white'
                                            //fill: ['#fff76b', '#c60000'], // gradient
                                            })
                                      );

    this.StepIntro=0;
    this.TimeIntro=0;
    this.FallStageAcelerator=0;
    //this.ClipBackground	:ClippedSprite;
    this.CurFloor=0;
    this.CUR_FLOOR=0;
    this.JP_MULTY=0;
    this.JP_Play=false;

    this.BigWin_Enabled==true;

    this.LoadResources(endCallback)
}

// Create a BonusStage01.prototype object that inherits from BonusStagePU.prototype.
BonusStage01.prototype = Object.create(BonusStagePU.prototype); // See note below

// Set the "constructor" property to refer to BonusStage01
BonusStage01.prototype.constructor = BonusStage01;

BonusStage01.prototype.LoadResources = function(endCallback) {
    const loader = this.ApplicationRef.LOADER()

    loader.add("TEX_BonusCongrat"    ,"resources/BonusCongratulations/BonusCongratulation.json");
    loader.add("TEX_BonusStage"      ,"resources/BonusStage/BonusStage.json");
    loader.add("TEX_BonusStage2"      ,"resources/BonusStage/BN_Stage.json");
    loader.add("TEX_BonusPrizeTop0"   ,"resources/BonusPrize/BonusPrizeTop-0.json");
    loader.add("TEX_BonusPrizeTop1"   ,"resources/BonusPrize/BonusPrizeTop-1.json");
    loader.add("TEX_BonusJPFX"       ,"resources/BonusPrize/BonusJPFX.json");

    loader.once("complete", endCallback)

    loader.load()
}
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
BonusStage01.prototype.Init = function() {

    this.BackGround.Setup();

    BonusStagePU.prototype.Init.call(this);

    this.FloorIndicatorSX.Setup();
    this.FloorIndicatorDX.Setup();

    this.TimesDisplay.Init();
    this.TimesDisplay.SetAreaWidth(window.VIDEO_WIDTH);
    this.TimesDisplay.Visible(true);
};
//---------------------------------------------------//
BonusStage01.prototype.PlayMusic = function() {

    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.GAME_LOOP);

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.BONUS_LOOP,(SoundGenerator.SMP_VOLUME_NORMAL|SoundGenerator.SMP_LOOP), true);
}
//------------------------------------------------------------//
BonusStage01.prototype.Mount = function() {

/*
    this.ApplicationRef.SLOT().STAGE().SetType(SlotStage.TEATRO_BONUS);

    this.ApplicationRef.SLOT().LINER().Visible(false);

    this.ApplicationRef.SLOT().REEL_HOLDER().Visible(false);
*/

    this.ApplicationRef.SLOT().REEL_STAGE().SetType(SlotStage.TEATRO_BONUS);

    this.ApplicationRef.CONSOLE().Disable();

    //this.PlayMusic();

    for (let i=0; i<this.Bersagli.length; i++)
    {
        this.Bersagli[i].Mount();
    }

    this.FloorIndicator_Off();

    // Link the bonus stage to the main container

    this.Container.y=-this.Container.height;

    this.MainStage.addChild(this.Container);

    this.JP_Play=false;
}
//------------------------------------------------------------//
BonusStage01.prototype.Unmount = function() {

    BonusStagePU.prototype.Unmount.call(this);

    this.ApplicationRef.CONSOLE().Enable();

    this.FloorIndicator_Off();
}
//------------------------------------------------------------//
BonusStage01.prototype.InitIntro = function() {

    this.TimeIntro=0;
    this.StepIntro=1;

    this.FallStageAcelerator=1;

    this.UpdateTimes();
    this.FloorUpdate();

    //this.SlotReference.CONGRATULATIONS().Mount("CONGRATULATIONS!","You Won",this.NUM_PICKS+" picks in Bonus Stage","Click to Continue!",this.ApplicationRef.CONTAINER());
    this.SlotReference.CONGRATULATIONS().Mount("BonusCongratulation",1,50,-56,
                                                BonusStage01.TAB_CAPTIONS[2][window.LANG]+this.NUM_PICKS.toString()+BonusStage01.TAB_CAPTIONS[3][window.LANG],480,                  // Win
                                                BonusStage01.TAB_CAPTIONS[0][window.LANG],600,  // Footer
                                                this.ApplicationRef.CONTAINER(),'.webp');

   // this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.WIN_BONUS,SoundGenerator.SMP_VOLUME_AMPLIFY);
}
//------------------------------------------------------------//
BonusStage01.prototype.PlayIntro = function() {

    let running=true;

    switch (this.StepIntro)
    {
        case 0:
        {
        }break;

        case 1:
        {
            if (this.SlotReference.CONGRATULATIONS().IsMounted()==false)
            {
                this.ApplicationRef.SLOT().TerminaAnimazioneVincita();

                this.PlayMusic();

                //this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.EARTH_QUAKE,SoundGenerator.SMP_VOLUME_AMPLIFY);

                this.StepIntro++;
            }
        }break;

        case 2:
        {
            if (this.Container.y<0)
            {
                this.Container.y+=this.DeviceInc((10+this.FallStageAcelerator));

                this.FallStageAcelerator<<=1;

                if (this.FallStageAcelerator>40)
                    this.FallStageAcelerator=40;
            }
            else
            {
                this.Container.y=0;

                this.FloorIndicator_On();

                this.UpdateTimes();

                running=false;
            }
        }break;

        default:break;
    };

    return running;
}
//------------------------------------------------------------//
BonusStage01.prototype.EndIntro = function() {

    this.ApplicationRef.SLOT().CONSOLE().SetStaticDisplay(BonusStage01.TAB_CAPTIONS[4][window.LANG],false);

    this.StepIntro=0;
}
//------------------------------------------------------------//
BonusStage01.prototype.OnPlayerSelect = function() {

    BonusStagePU.prototype.OnPlayerSelect.call(this);

    this.FloorIndicator_Off();
}
//------------------------------------------------------------//
BonusStage01.prototype.FixPremio = function() {

    BonusStagePU.prototype.FixPremio.call(this);
}
//------------------------------------------------------------//
BonusStage01.prototype.UpdateTimes = function() {

    this.TimesDisplay.SetCaption(BonusStage01.TAB_CAPTIONS[1][window.LANG]+this.NUM_PICKS);
}
//------------------------------------------------------------//
BonusStage01.prototype.OnOpenComplete = function() {

    BonusStagePU.prototype.OnOpenComplete.call(this);

    this.FloorUpdate();

    this.FloorIndicator_On();

    this.UpdateTimes();

    if (this.CUR_FLOOR==(BonusStage01.TAB_FLOOR_YY.length-1))
    {
        this.Bersagli[(this.NUM_SENSITIVE_AREAS-1)].set_TYPE(BonusDescriptor.BONUS_PICK_OBJ_JP);
        this.Bersagli[(this.NUM_SENSITIVE_AREAS-1)].set_PRIZE(this.JP_MULTY);
        this.Bersagli[(this.NUM_SENSITIVE_AREAS-1)].SetupPrize();
        this.Bersagli[(this.NUM_SENSITIVE_AREAS-1)].Open(true);

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.TURBO_BGND,SoundGenerator.SMP_VOLUME_AMPLIFY);

        this.ID_TIMER_PAUSA=this.ArmaTimer(this.ID_TIMER_PAUSA,(5*1000));

        this.JP_Play=true;
    }
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStage01.prototype.OnSetReady = function() {

    if (this.JP_Play==true)
    {
        this.Bersagli[(this.NUM_SENSITIVE_AREAS-1)].PlayAction();

        if (this.Bersagli[(this.NUM_SENSITIVE_AREAS-1)].get_STATO()==BonusStagePrize.STATE_OPENED)
        {
            return BonusStagePU.prototype.OnSetReady.call(this);
        }

        return false;
    }

    return true;
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStage01.prototype.Exit_ACK = function() {

    if (BonusStagePU.prototype.Exit_ACK.call(this)==false)
    {
        if (this.NUM_PICKS==0)
            return true;

        if (this.CUR_FLOOR==(BonusStage01.TAB_FLOOR_YY.length-1))
            return true;

        return false;
    }

    return true;
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStage01.prototype.Over_CHECK = function() {

    if (this.NUM_PICKS==0 || this.CUR_FLOOR==(BonusStage01.TAB_FLOOR_YY.length-1))
    {
        this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano ( SoundGenerator.BONUS1_LOOP );
        return true;
    }

    return false;
}
//------------------------------------------------------------//
BonusStage01.prototype.FloorIndicator_Off = function() {

    this.FloorIndicatorSX.StopTransform();	this.FloorIndicatorSX.ResetProperties(false,1.0,1.0);
    this.FloorIndicatorDX.StopTransform();	this.FloorIndicatorDX.ResetProperties(false,1.0,1.0);
}
//------------------------------------------------------------//
BonusStage01.prototype.FloorIndicator_On = function() {

    var i,from,to;

    // JP?
    if (this.CurFloor==(BonusStage01.TAB_PICKS_FLOOR.length-1))
        return;

    from=BonusStage01.TAB_PICKS_FLOOR[this.CurFloor][0];
    i=0;
    while(BonusStage01.TAB_PICKS_FLOOR[this.CurFloor][(i+1)]!=0xFF)
        i++;
    to=BonusStage01.TAB_PICKS_FLOOR[this.CurFloor][i];

    this.FloorIndicatorSX.XX(this.Bersagli[from].Container.x , -200);//-this.FloorIndicatorSX.FrameW);
    this.FloorIndicatorSX.YY(BonusStage01.TAB_FLOOR_YY[this.CurFloor],100);
    this.FloorIndicatorSX.Visible(true);
    this.FloorIndicatorSX.SPRITE_TRANSFORMER().FadeLoop(0.5,10,50);
    this.FloorIndicatorSX.SPRITE_TRANSFORMER().MoveEx(-10,0,10,25);

    this.FloorIndicatorDX.XX(this.Bersagli[to].Container.x , (this.Bersagli[from].Top.ACTUAL_W()+30));
    this.FloorIndicatorDX.YY(BonusStage01.TAB_FLOOR_YY[this.CurFloor],100);
    this.FloorIndicatorDX.Visible(true);
    this.FloorIndicatorDX.SPRITE_TRANSFORMER().FadeLoop(0.5,10,50);
    this.FloorIndicatorDX.SPRITE_TRANSFORMER().MoveEx(10,0,10,25);
}
//------------------------------------------------------------//
BonusStage01.prototype.FloorUpdate = function() {

    this.CurFloor=this.CUR_FLOOR;

    for (let i=0; i<this.NUM_SENSITIVE_AREAS; i++)
    {
        // JP?
        if (i==(this.NUM_SENSITIVE_AREAS-1))
        {
            this.Bersagli[i].TurnOn();
        }
        // Bersaglòio disabilitato dal Server ma ancora acceso da noi?
        else if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_DISABLED)
        {
            if (i<BonusStage01.TAB_PICKS_FLOOR[this.CurFloor][0])
                this.Bersagli[i].TurnOff_Void();
            else
                this.Bersagli[i].TurnOff_Disabled();
        }
        else if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_ENABLED)
        {
            this.Bersagli[i].TurnOn_Enabled();
        }
        // Apertura fake di fine bonus
        else if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_OPENING)
        {
            this.Bersagli[i].TurnOff_Void();
        }
    }
}
//-------------------------------------------------------------------------//
// OVERRIDE se serve
BonusStage01.prototype.Parse_BONUS_STATUS = function(chunk_to_parse) {

    var i,pick_status,pick_object,pick_value;

    this.ParseServer_Init(chunk_to_parse);

    this.PUNTI_ASSEGNATI	=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_PICK_WIN);
    this.NUM_PICKS			=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_PICK_NUM);
    this.CUR_FLOOR			=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_PICK_FLOOR);
    this.JP_MULTY           =this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_PICK_JP);

    this.ApplicationRef.SLOT().SetVincitaVideo ( this.PUNTI_ASSEGNATI );

    // Si posiziona all'inizio dei record dei picks
    if (this.ParseServer_SEEK( BonusDescriptor.BS_OFFSET_PICK_STATUS )==false)
        return false;

    for (i=0;i<this.NUM_SENSITIVE_AREAS;i++)
    {
        pick_status = this.ParseServer_Dump_UINT(-1);
        pick_object = this.ParseServer_Dump_UINT(-1);
        pick_value	= this.ParseServer_Dump_UINT(-1);

        this.Bersagli[i].set_TYPE(pick_object);
        this.Bersagli[i].set_PRIZE(pick_value);

        if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_DISABLED && pick_status==BonusDescriptor.BONUS_PICK_ENABLED)
        {
            this.Bersagli[i].Enable();
        }
        // Abilitato da noi,ma già aperto secondo il server? (situaizone anche del recovery)
        else if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_ENABLED && pick_status==BonusDescriptor.BONUS_PICK_OPENED)
        {
            this.Bersagli[i].SetupPrize();
            this.Bersagli[i].Opened();
        }
        else if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_ENABLED && pick_status==BonusDescriptor.BONUS_PICK_DISABLED)
        {
            this.Bersagli[i].Disable();
        }
        else if (pick_status==BonusDescriptor.BONUS_PICK_OPENING_REAL)
        {
            this.Bersagli[i].SetupPrize();

            this.Bersagli[i].Open(true);
        }
        else if (pick_status==BonusDescriptor.BONUS_PICK_OPENING_FAKE)
        {
            this.Bersagli[i].SetupPrize();

            this.Bersagli[i].Open(false);
        }
    }

    return true;
}
//--------------------------------------------------------------------------//
// OVERRIDE se serve
BonusStage01.prototype.Refresh = function(ellapsed_ms) {

    BonusStagePU.prototype.Refresh.call(this,ellapsed_ms);

    this.BackGround.Refresh(ellapsed_ms);
    this.FloorIndicatorSX.Refresh(ellapsed_ms);
    this.FloorIndicatorDX.Refresh(ellapsed_ms);

}
//------------------------------------------------------------//

//--------------------------------------------------------------------------//
