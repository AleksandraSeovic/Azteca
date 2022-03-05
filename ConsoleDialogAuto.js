//------------------------------------------------------------//
// Holds dialog for auto play setup
//------------------------------------------------------------//
ConsoleDialogAuto.TAB_CAPTIONS=
[
    ["AUTOPLAY SETTING","IMPOSTAZIONI AUTOPLAY"]
];

//-----------------------------------------------------------
//              CHECK BOX
//-----------------------------------------------------------
ConsoleDialogAuto.ID_CHECKBOX_STOP_WIN=0;
ConsoleDialogAuto.ID_CHECKBOX_STOP_FEATURE=1;

ConsoleDialogAuto.TAB_CHECKBOX_ID=
[
    ConsoleDialogAuto.ID_CHECKBOX_STOP_WIN,
    ConsoleDialogAuto.ID_CHECKBOX_STOP_FEATURE
];

ConsoleDialogAuto.TAB_CAPTIONS_CB=
[
    ["STOP ON ANY WIN","STOP SU VINCITA"],
    ["STOP ON FEATURE","STOP SU FEATURE"]
];


function ConsoleDialogAuto(app_reference,parent_container) {

    var i;
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;

    this.Container=new PIXI.Container();

    this.Shape = new TiledSprite("Dialog_Box",1,true,this.Container,'.webp');

    var w_shape=440;

    //_______________________________________________________________________________________________________________________________________________________
    // title: Autoplay Setting
    this.Auto_Title =   new DisplayStyle(w_shape,0,20,"center",this.Container,
                                            new PIXI.TextStyle({
                                                fontFamily: 'Game_Font',
                                                fontSize: 16,
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fill: 'white'
                                            })
                                      );


    //_______________________________________________________________________________________________________________________________________________________
    // BUTTONS
    this.ExitButton = new TiledSprite("Dialog_Close",1,true,this.Container,'.webp');

    this.ButtonsSet= new Array(Player.TAB_AUTO_SPINS.length);
    for (i=0;i<this.ButtonsSet.length;i++)
    {
        this.ButtonsSet[i]=new DialogButton(Player.TAB_AUTO_SPINS[i] ,this.Container); // new ConsoleButton( -1  ,"Dialog_Button",1, 24+((i%3)*138) ,88+(56*(i/3)),ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef);
    }

    //_______________________________________________________________________________________________________________________________________________________
    // CHECKBOX
    this.CheckBoxSet= new Array(ConsoleDialogAuto.TAB_CHECKBOX_ID.length);
    for (i=0;i<this.CheckBoxSet.length;i++)
    {
        this.CheckBoxSet[i]=new DialogCheckBox(ConsoleDialogAuto.TAB_CAPTIONS_CB[i][window.LANG],this.Container);
    }

    this.Style=new ControlStyle(0,0,1.0);
}

// Create a ConsoleDialogAuto.prototype object that inherits from SObject.prototype.
ConsoleDialogAuto.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleDialogAuto
ConsoleDialogAuto.prototype.constructor = ConsoleDialogAuto;

//--------------------------------------------------------------------------//
ConsoleDialogAuto.prototype.Init = function() {

    var i;

    this.Shape.Setup();

    //_______________________________________________________
    this.Auto_Title.Init();
    this.Auto_Title.Visible(true);

    //_______________________________________________________
    this.ExitButton.Setup();
    this.ExitButton.SetButton(true);
    this.ExitButton.XX(this.Shape.ACTUAL_W(),-60);
    this.ExitButton.YY(0,8);

    for (i=0;i<this.ButtonsSet.length;i++)
    {
        this.ButtonsSet[i].Init();

        this.ButtonsSet[i].XX(24,(138* parseInt(i%3)));
        this.ButtonsSet[i].YY(60,( 56* parseInt(i/3)));
        this.ButtonsSet[i].Visible(true);
    }

    //_______________________________________________________
    for (j=0;j<this.CheckBoxSet.length;j++)
    {
        this.CheckBoxSet[j].Init();

        this.CheckBoxSet[j].XX(24,0);
        this.CheckBoxSet[j].YY(170,( 50*j));

        this.CheckBoxSet[j].Visible(true);
    }
    //_______________________________________________________

    this.Setup();

    this.Container.visible=false;

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
ConsoleDialogAuto.prototype.OnResize = function() {

    this.Setup();
}
//--------------------------------------------------------------------------//
ConsoleDialogAuto.prototype.Setup = function() {

    this.ApplicationRef.CONTROL_BUILDER().GetControlStyle(ControlBuilder.ID_CONSOLE_DIALOG_AUTO,this.Style);

    this.Container.x=this.Style.X;
    this.Container.y=this.Style.Y;
    this.Container.scale=new PIXI.Point(this.Style.SCALE,this.Style.SCALE);
}
//--------------------------------------------------------------------------//
ConsoleDialogAuto.prototype.Refresh = function(ellapsed_ms) {

    var i;

    this.TimerRefresh(ellapsed_ms);

    this.Auto_Title.SetCaption(ConsoleDialogAuto.TAB_CAPTIONS[0][window.LANG]);

    if (this.ExitButton.CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
        this.ExitButton.SetMaskFilter(TiledSprite.MASK_STAT_GREEN);

    else if (this.ExitButton.CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
        this.ExitButton.SetMaskFilter(TiledSprite.MASK_STAT_NONE);

    if (this.ExitButton.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
    {
        this.Container.visible=false;

        return;
    }

    for (i=0;i<this.ButtonsSet.length;i++)
    {
        if (this.ButtonsSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
            this.ButtonsSet[i].GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_GREEN);
        else if (this.ButtonsSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
            this.ButtonsSet[i].GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_NONE);

        if (this.ButtonsSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
        {
            this.ApplicationRef.PLAYER().AUTO_SPINS_SET( Player.TAB_AUTO_SPINS[i] );

            this.ApplicationRef.BUTTON_MANAGER().NotifyStymulus( ButtonManager.BUTT_START );

            this.Container.visible=false;

            break;
        }
    }


    for (i=0;i<this.CheckBoxSet.length;i++)
    {
        if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
            this.CheckBoxSet[i].GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_GREEN);
        else if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
            this.CheckBoxSet[i].GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_NONE);

        switch (i)
        {
            case ConsoleDialogAuto.ID_CHECKBOX_STOP_WIN:
            {
                if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SLOT().REEL_HOLDER().SET_Auto_BreakAtWin^=1;
                }

                this.CheckBoxSet[i].SetValue(this.ApplicationRef.SLOT().REEL_HOLDER().SET_Auto_BreakAtWin);
            }break;


            case ConsoleDialogAuto.ID_CHECKBOX_STOP_FEATURE:
            {
                if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SLOT().REEL_HOLDER().SET_Auto_BreakAtFeature^=1;
                }

                this.CheckBoxSet[i].SetValue(this.ApplicationRef.SLOT().REEL_HOLDER().SET_Auto_BreakAtFeature);
            }break;


            default:break;
        };
    }
}
//------------------------------------------------------------//
ConsoleDialogAuto.prototype.OnSpinEvent = function(spin) {

    this.Container.visible=false;
}
//------------------------------------------------------------//
ConsoleDialogAuto.prototype.IsActive = function() {

    return this.Container.visible;
}
//------------------------------------------------------------//
ConsoleDialogAuto.prototype.SetActive = function(act) {

    var i;

    this.Container.visible=act;

    if (act==true)
    {
        this.ApplicationRef.PROGRAMMA().GetSPIN_SET().BreakAutoPlay();

        for (i=0;i<this.CheckBoxSet.length;i++)
        {
            this.CheckBoxSet[i].SetCaption(ConsoleDialogAuto.TAB_CAPTIONS_CB[i][window.LANG]);
        }
    }
}
//--------------------------------------------------------------------------//
