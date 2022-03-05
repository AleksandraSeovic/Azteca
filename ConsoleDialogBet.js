//------------------------------------------------------------//
// Holds dialog for bet and coin value setup
//------------------------------------------------------------//

ConsoleDialogBet.TAB_CAPTIONS=
[
    ["BETTING ON ","PUNTATA SU "],
    [" LINES"," LINEE"],
    ["BET PER LINE","BET PER LINEA"],
    ["COIN VALUE","VALORE GETTONE"],
    ["TOTAL BET ","BET TOTALE "],
    [" COINS"," GETTONI"]
];

function ConsoleDialogBet(app_reference,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;

    this.Container=new PIXI.Container();

    this.Shape = new TiledSprite("Dialog_Box",1,true,this.Container,'.webp');

    var w_shape=440;

    this.ExitButton = new TiledSprite("Dialog_Close",1,true,this.Container,'.webp');

    //_______________________________________________________________________________________________________________________________________________________
    // DISPLAY: Betting on xx lines
    this.Lines_Display = new DisplayStyle(w_shape,0,20,"center",this.Container,
                                            new PIXI.TextStyle({
                                                fontFamily: 'Game_Font',
                                                fontSize: 16,
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fill: 'white'
                                            })
                                      );


    //_______________________________________________________________________________________________________________________________________________________
    // LABEL: Coins per line
    this.BetLine_Label = new DisplayStyle(w_shape,0,72,"center",this.Container,
                                        new PIXI.TextStyle({
                                            fontFamily: 'Game_Font',
                                            fontSize: 16,
                                            fontStyle: 'normal',
                                            fontWeight: 'bold',
                                            fill: 'white'
                                        })
                                    );

        // DISPLAY: Coins per line
        this.BetLine_Display = new DisplayStyle(w_shape,0,95,"center",this.Container,
                                            new PIXI.TextStyle({
                                                fontFamily: 'Game_Font',
                                                fontSize: 36,
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fill: 'white'
                                            })
                                      );

        // BUTTONS : -/+
        this.BetLine_Dec=new ConsoleButton(ButtonManager.BUTT_BET_DEC  ,"Butt_Min",1, 50,90,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');
        this.BetLine_Inc=new ConsoleButton(ButtonManager.BUTT_BET_INC  ,"Butt_Pls",1,340,90,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');


    //_______________________________________________________________________________________________________________________________________________________
    // LABEL: Coin Value
    this.CoinValue_Label = new DisplayStyle(w_shape,0,162,"center",this.Container,
                                            new PIXI.TextStyle({
                                                fontFamily: 'Game_Font',
                                                fontSize: 16,
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fill: 'white'
                                            })
                                      );

        // DISPLAY: Coins Value
        this.CoinValue_Display = new DisplayStyle(w_shape,0,187,"center",this.Container,
                                                    new PIXI.TextStyle({
                                                        fontFamily: 'Game_Font',
                                                        fontSize: 36,
                                                        fontStyle: 'normal',
                                                        fontWeight: 'bold',
                                                        fill: 'white'
                                                    })
                                              );

        // BUTTONS : -/+
        this.CoinValue_Dec=new ConsoleButton(ButtonManager.BUTT_COINLEVEL_DEC  ,"Butt_Min",1, 50,180,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');
        this.CoinValue_Inc=new ConsoleButton(ButtonManager.BUTT_COINLEVEL_INC  ,"Butt_Pls",1,340,180,ConsoleButton.TYPE_PUSH_AND_BACK,this.Container,this.ApplicationRef,'.webp');

    //_______________________________________________________________________________________________________________________________________________________
    // DISPLAY: Total Bet x.xx€ / xxx coins
    this.TotalBet_Display = new DisplayStyle(w_shape,0,290,"center",this.Container,
                                            new PIXI.TextStyle({
                                                fontFamily: 'Game_Font',
                                                fontSize: 16,
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fill: 'white'
                                            })
                                      );



    this.Style=new ControlStyle(0,0,1.0);
}

// Create a ConsoleDialogBet.prototype object that inherits from SObject.prototype.
ConsoleDialogBet.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleDialogBet
ConsoleDialogBet.prototype.constructor = ConsoleDialogBet;

//--------------------------------------------------------------------------//
ConsoleDialogBet.prototype.Init = function() {

    this.Shape.Setup();

    this.ExitButton.Setup();
    this.ExitButton.SetButton(true);
    this.ExitButton.XX(this.Shape.ACTUAL_W(),-60);
    this.ExitButton.YY(0,8);

    //_______________________________________________________
    this.Lines_Display.Init();
    this.Lines_Display.Visible(true);

    //_______________________________________________________
    this.BetLine_Label.Init();
    this.BetLine_Label.Visible(true);

    this.BetLine_Display.Init();
    this.BetLine_Display.Visible(true);

    this.BetLine_Dec.Init();
    this.BetLine_Dec.SetEnable(true);

    this.BetLine_Inc.Init();
    this.BetLine_Inc.SetEnable(true);

    //_______________________________________________________
    this.CoinValue_Label.Init();
    this.CoinValue_Label.Visible(true);

    this.CoinValue_Display.Init();
    this.CoinValue_Display.Visible(true);

    this.CoinValue_Dec.Init();
    this.CoinValue_Dec.SetEnable(true);

    this.CoinValue_Inc.Init();
    this.CoinValue_Inc.SetEnable(true);

    //_______________________________________________________
    this.TotalBet_Display.Init();
    this.TotalBet_Display.Visible(true);

    this.Setup();

    this.Container.visible=false;

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
ConsoleDialogBet.prototype.OnResize = function() {

    this.Setup();
}
//--------------------------------------------------------------------------//
ConsoleDialogBet.prototype.Setup = function() {

    this.ApplicationRef.CONTROL_BUILDER().GetControlStyle(ControlBuilder.ID_CONSOLE_DIALOG_BET,this.Style);

    this.Container.x=this.Style.X;
    this.Container.y=this.Style.Y;
    this.Container.scale=new PIXI.Point(this.Style.SCALE,this.Style.SCALE);
}
//--------------------------------------------------------------------------//
ConsoleDialogBet.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);

    if (this.ExitButton.CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
        this.ExitButton.SetMaskFilter(TiledSprite.MASK_STAT_GREEN);

    else if (this.ExitButton.CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
        this.ExitButton.SetMaskFilter(TiledSprite.MASK_STAT_NONE);

    if (this.ExitButton.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
    {
        this.Container.visible=false;

        return;
    }

    //this.Lines_Display.SetCaption("BETTING ON "+window.NUM_LINEE+" LINES");
    this.Lines_Display.SetCaption(ConsoleDialogBet.TAB_CAPTIONS[0][window.LANG]+window.NUM_LINEE+ConsoleDialogBet.TAB_CAPTIONS[1][window.LANG]);


    this.BetLine_Label.SetCaption(ConsoleDialogBet.TAB_CAPTIONS[2][window.LANG]);
    this.BetLine_Display.SetCaption(this.ApplicationRef.SLOT().BET_LINE());

    // BET LINE DEC
    if (this.ApplicationRef.PROGRAMMA().GetSPIN_SET().DecBet_Enabled()==false)
    {
        if (this.BetLine_Dec.IsEnabled()==true)
        {
            this.BetLine_Dec.SetEnable(false);
        }
    }
    else
    {
        if (this.BetLine_Dec.IsEnabled()==false)
        {
            this.BetLine_Dec.SetEnable(true);
        }
    }

    this.BetLine_Dec.Refresh(ellapsed_ms);

    // BET LINE INC
    if (this.ApplicationRef.PROGRAMMA().GetSPIN_SET().IncBet_Enabled()==false)
    {
        if (this.BetLine_Inc.IsEnabled()==true)
        {
            this.BetLine_Inc.SetEnable(false);
        }
    }
    else
    {
        if (this.BetLine_Inc.IsEnabled()==false)
        {
            this.BetLine_Inc.SetEnable(true);
        }
    }
    this.BetLine_Inc.Refresh(ellapsed_ms);

    this.CoinValue_Label.SetCaption(ConsoleDialogBet.TAB_CAPTIONS[3][window.LANG]);
    this.CoinValue_Display.SetCaptionCents( this.ApplicationRef.PLAYER().COIN_VALUE_GET(),this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().VALUTA_STRING() );

    // COIN VALUE DEC
    if (this.ApplicationRef.PLAYER().COIN_VALUE_DEC_ENABLED()==false)
    {
        if (this.CoinValue_Dec.IsEnabled()==true)
        {
            this.CoinValue_Dec.SetEnable(false);
        }
    }
    else
    {
        if (this.CoinValue_Dec.IsEnabled()==false)
        {
            this.CoinValue_Dec.SetEnable(true);
        }
    }

    this.CoinValue_Dec.Refresh(ellapsed_ms);


    // COIN VALUE INC
    if (this.ApplicationRef.PLAYER().COIN_VALUE_INC_ENABLED()==false)
    {
        if (this.CoinValue_Inc.IsEnabled()==true)
        {
            this.CoinValue_Inc.SetEnable(false);
        }
    }
    else
    {
        if (this.CoinValue_Inc.IsEnabled()==false)
        {
            this.CoinValue_Inc.SetEnable(true);
        }
    }

    this.CoinValue_Inc.Refresh(ellapsed_ms);


    var tot_bet_coins=this.ApplicationRef.SLOT().TOTAL_BET();
    var tot_bet_cents=this.ApplicationRef.PLAYER().Coins2Divisa(tot_bet_coins);

    this.TotalBet_Display.SetCaption(ConsoleDialogBet.TAB_CAPTIONS[4][window.LANG]+this.GetCaptionCents(tot_bet_cents)+this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().VALUTA_STRING()+" / "+tot_bet_coins+ConsoleDialogBet.TAB_CAPTIONS[5][window.LANG]);
}
//------------------------------------------------------------//
ConsoleDialogBet.prototype.GetCaptionCents = function(val){

    var str=""+parseInt ( (val/100) );

    str+=",";

    var remind=parseInt ( (val%100) );

    var remind_str=""+remind;

    while (remind_str.length<2)
        remind_str="0"+remind_str;

    return (str+remind_str);
}
//------------------------------------------------------------//
ConsoleDialogBet.prototype.OnSpinEvent = function(spin) {

    this.Container.visible=false;
}
//------------------------------------------------------------//
ConsoleDialogBet.prototype.IsActive = function() {

    return this.Container.visible;
}
//------------------------------------------------------------//
ConsoleDialogBet.prototype.SetActive = function(act) {

    this.Container.visible=act;
}
//--------------------------------------------------------------------------//
