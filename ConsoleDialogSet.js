//------------------------------------------------------------//
// Holds dialog for general setup
//------------------------------------------------------------//


//-----------------------------------------------------------
//              BUTTONS
//-----------------------------------------------------------
ConsoleDialogSet.ID_BUTT_DEMO1=0;
ConsoleDialogSet.ID_BUTT_DEMO2=1;
ConsoleDialogSet.ID_BUTT_DEMO3=2;
//ConsoleDialogSet.ID_BUTT_HISTORY=3;
ConsoleDialogSet.ID_BUTT_FULLS=3;

ConsoleDialogSet.TAB_BUTTONS_ID=
[
    ConsoleDialogSet.ID_BUTT_DEMO1,
    ConsoleDialogSet.ID_BUTT_DEMO2,
    ConsoleDialogSet.ID_BUTT_DEMO3,
//    ConsoleDialogSet.ID_BUTT_HISTORY,
    ConsoleDialogSet.ID_BUTT_FULLS
];

ConsoleDialogSet.TAB_CAPTIONS_BT=
[
    ["GENERAL SETTINGS","IMPOSTAZIONI GENERALI"],
    ["Free spin","Free spin"],
    ["Bonus","Bonus"],
    ["Long wild","Long wild"],
//    ["HISTORY","STORICO"],
    ["FullScreen","FullScreen"]
];


//-----------------------------------------------------------
//              CHECK BOX
//-----------------------------------------------------------
ConsoleDialogSet.ID_CHECKBOX_TURBOSPINS=0;
ConsoleDialogSet.ID_CHECKBOX_QUICKSPINS=1;
ConsoleDialogSet.ID_CHECKBOX_AMBIENT=2;
ConsoleDialogSet.ID_CHECKBOX_FX=3;
ConsoleDialogSet.ID_CHECKBOX_POWERSAVE=4;

ConsoleDialogSet.TAB_CHECKBOX_ID=
[
    ConsoleDialogSet.ID_CHECKBOX_TURBOSPINS,
    ConsoleDialogSet.ID_CHECKBOX_QUICKSPINS,
    ConsoleDialogSet.ID_CHECKBOX_AMBIENT,
    ConsoleDialogSet.ID_CHECKBOX_FX,
    ConsoleDialogSet.ID_CHECKBOX_POWERSAVE
];

ConsoleDialogSet.TAB_CAPTIONS_CB=
[
    ["TURBO SPIN" ,"TURBO SPIN"],
    ["QUICK SPIN" ,"QUICK SPIN"],
    ["SOUND MUSIC","SUONO MUSICA"],
    ["SOUND FX"   ,"SUONO FX"],
    ["POWER SAVE" ,"POWER SAVE"]
];


function ConsoleDialogSet(app_reference,parent_container) {

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
    // title: General Setting
    this.Setting_Title =   new DisplayStyle(w_shape,0,20,"center",this.Container,
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

    this.ButtonsSet= new Array(ConsoleDialogSet.TAB_BUTTONS_ID.length);
    for (i=0;i<this.ButtonsSet.length;i++)
    {
        this.ButtonsSet[i]=new DialogButton(ConsoleDialogSet.TAB_CAPTIONS_BT[(1+i)][window.LANG] ,this.Container); // new ConsoleButton( -1  ,"Dialog_Button",1, 24+((i%3)*138) ,88+(56*(i/3)),ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef);
    }

    //_______________________________________________________________________________________________________________________________________________________
    // CHECKBOX
    this.CheckBoxSet= new Array(ConsoleDialogSet.TAB_CHECKBOX_ID.length);
    for (i=0;i<this.CheckBoxSet.length;i++)
    {
        this.CheckBoxSet[i]=new DialogCheckBox(ConsoleDialogSet.TAB_CAPTIONS_CB[i][window.LANG],this.Container);
    }

    this.Style=new ControlStyle(0,0,1.0);
}

// Create a ConsoleDialogSet.prototype object that inherits from SObject.prototype.
ConsoleDialogSet.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleDialogSet
ConsoleDialogSet.prototype.constructor = ConsoleDialogSet;

//--------------------------------------------------------------------------//
ConsoleDialogSet.prototype.Init = function() {

    var i,j;

    this.Shape.Setup();

    //_______________________________________________________
    this.Setting_Title.Init();
    this.Setting_Title.Visible(true);

    //_______________________________________________________
    this.ExitButton.Setup();
    this.ExitButton.SetButton(true);
    this.ExitButton.XX(this.Shape.ACTUAL_W(),-60);
    this.ExitButton.YY(0,8);

    for (i=0;i<this.ButtonsSet.length;i++)
    {
        this.ButtonsSet[i].Init();

        this.ButtonsSet[i].XX(24,(138* parseInt(i%3)));
        this.ButtonsSet[i].YY(72,( 50* parseInt(i/3)));

        // No full-screen
        if (i!=(this.ButtonsSet.length-1))
            this.ButtonsSet[i].Visible(true);
    }

    this.ButtonsSet[ConsoleDialogSet.ID_BUTT_FULLS].GetSprite().Sprite.on('touchend',ToggleFullScreen);
    this.ButtonsSet[ConsoleDialogSet.ID_BUTT_FULLS].GetSprite().Sprite.on('click',ToggleFullScreen);

    //_______________________________________________________
    for (j=0;j<this.CheckBoxSet.length;j++)
    {
        this.CheckBoxSet[j].Init();

        this.CheckBoxSet[j].XX( 24,(180* parseInt(j%2)));
        this.CheckBoxSet[j].YY(174,( 55* parseInt(j/2)));

        if (j==ConsoleDialogSet.ID_CHECKBOX_POWERSAVE)
        {
            if (window.MOBILE==true)
            {
                this.CheckBoxSet[j].Visible(true);
                this.CheckBoxSet[j].GetSprite().Sprite.on('touchend',ToggleNoSleep);
                this.CheckBoxSet[j].GetSprite().Sprite.on('click',ToggleNoSleep);
            }
            else
                this.CheckBoxSet[j].Visible(false);
        }
        else
            this.CheckBoxSet[j].Visible(true);
    }

    this.Setup();

    this.Container.visible=false;

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
ConsoleDialogSet.prototype.OnResize = function() {

    this.Setup();
}
//--------------------------------------------------------------------------//
ConsoleDialogSet.prototype.Setup = function() {

    this.ApplicationRef.CONTROL_BUILDER().GetControlStyle(ControlBuilder.ID_CONSOLE_DIALOG_SET,this.Style);

    this.Container.x=this.Style.X;
    this.Container.y=this.Style.Y;
    this.Container.scale=new PIXI.Point(this.Style.SCALE,this.Style.SCALE);
}
//--------------------------------------------------------------------------//
ConsoleDialogSet.prototype.Refresh = function(ellapsed_ms) {

    var i;

    this.TimerRefresh(ellapsed_ms);

    this.Setting_Title.SetCaption(ConsoleDialogSet.TAB_CAPTIONS_BT[0][window.LANG]);

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
            switch (i)
            {
                case ConsoleDialogSet.ID_BUTT_DEMO1:
                {
                    this.ApplicationRef.BUTTON_MANAGER().NotifyStymulus(ButtonManager.BUTT_DEMO_FEATURE_1);
                }break;

                case ConsoleDialogSet.ID_BUTT_DEMO2:
                {
                    this.ApplicationRef.BUTTON_MANAGER().NotifyStymulus(ButtonManager.BUTT_DEMO_FEATURE_2);
                }break;

                case ConsoleDialogSet.ID_BUTT_DEMO3:
                {
                    this.ApplicationRef.BUTTON_MANAGER().NotifyStymulus(ButtonManager.BUTT_DEMO_FEATURE_3);
                }break;

/*
                case ConsoleDialogSet.ID_BUTT_HISTORY:
                {
                    window.open("https://admin.sevenslot.net/sessions/mobile_detail/37/116");
                }break;
*/
                case ConsoleDialogSet.ID_BUTT_FULLS:
                {
                    this.Container.visible=false;
                }break;

                default:break;
            };

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
            case ConsoleDialogSet.ID_CHECKBOX_TURBOSPINS:
            {
                if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SLOT().REEL_HOLDER().SET_Turbo_Spins^=1;
                    this.ApplicationRef.SLOT().REEL_HOLDER().SET_Quick_Spins=0;
                }

                this.CheckBoxSet[i].SetValue(this.ApplicationRef.SLOT().REEL_HOLDER().SET_Turbo_Spins);
            }break;


            case ConsoleDialogSet.ID_CHECKBOX_QUICKSPINS:
            {
                if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SLOT().REEL_HOLDER().SET_Turbo_Spins=0;
                    this.ApplicationRef.SLOT().REEL_HOLDER().SET_Quick_Spins^=1;
                }

                this.CheckBoxSet[i].SetValue(this.ApplicationRef.SLOT().REEL_HOLDER().SET_Quick_Spins);
            }break;


            case ConsoleDialogSet.ID_CHECKBOX_AMBIENT:
            {
                if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SOUNDGENERATOR().Stop();
                    this.ApplicationRef.SOUNDGENERATOR().SET_PlayMusic^=1;

                    if(this.ApplicationRef.SOUNDGENERATOR().AudioEnabled && this.ApplicationRef.SOUNDGENERATOR().SET_PlayMusic) {
                        this.ApplicationRef.SLOT().PlayMusic();
                    }
                }

                this.CheckBoxSet[i].SetValue(this.ApplicationRef.SOUNDGENERATOR().SET_PlayMusic);
            }break;

            case ConsoleDialogSet.ID_CHECKBOX_FX:
            {
                if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    //this.ApplicationRef.SOUNDGENERATOR().Stop();

                    this.ApplicationRef.SOUNDGENERATOR().SET_PlayFX^=1;
                }

                this.CheckBoxSet[i].SetValue(this.ApplicationRef.SOUNDGENERATOR().SET_PlayFX);
            }break;

            case ConsoleDialogSet.ID_CHECKBOX_POWERSAVE:
            {
/*
                if (this.CheckBoxSet[i].GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    window.POWER_SAVE^=1;

                    if (window.POWER_SAVE==0)
                        this.ApplicationRef.NO_SLEEP_LIB().enable();
                    else
                        this.ApplicationRef.NO_SLEEP_LIB().disable();
                }
*/
                this.CheckBoxSet[i].SetValue(window.POWER_SAVE);
            }break;

            default:break;
        };
    }
}
//------------------------------------------------------------//
ConsoleDialogSet.prototype.OnSpinEvent = function(spin) {

    this.Container.visible=false;
}
//------------------------------------------------------------//
ConsoleDialogSet.prototype.IsActive = function() {

    return this.Container.visible;
}
//------------------------------------------------------------//
ConsoleDialogSet.prototype.SetActive = function(act) {

    this.Container.visible=act;

    if (act==true)
    {
        if (window.DEMO_PLAY==false)
        {
            this.ButtonsSet[ConsoleDialogSet.ID_BUTT_DEMO1].SetEnabled(false);
            this.ButtonsSet[ConsoleDialogSet.ID_BUTT_DEMO2].SetEnabled(false);
            this.ButtonsSet[ConsoleDialogSet.ID_BUTT_DEMO3].SetEnabled(false);
        }
        //else
        //{
            //this.ButtonsSet[ConsoleDialogSet.ID_BUTT_HISTORY].SetEnabled(false);
        //}


        for (i=0;i<this.CheckBoxSet.length;i++)
        {
            this.CheckBoxSet[i].SetCaption(ConsoleDialogSet.TAB_CAPTIONS_CB[i][window.LANG]);
        }

        this.ApplicationRef.PROGRAMMA().GetSPIN_SET().BreakAutoPlay();
    }
}
//--------------------------------------------------------------------------//
