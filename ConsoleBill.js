//------------------------------------------------------------//
// Holds CREDITS and BET displays
//------------------------------------------------------------//

ConsoleBill.TAB_CAPTIONS=
[
    ["CREDIT","CREDITO"],
    ["BET","BET"]
];

function ConsoleBill(app_reference,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;
    this.FreezeCounters  = false;
    this.CoinsView       = false;

    this.Container=new PIXI.Container();

    this.CreditLabel = new DisplayStyle(0,115,45,"left",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: window.MOBILE ? 25 : 28,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#f6ae31', '#f6ae31'], // gradient
                        })
                  );

    this.CreditDisplay = new DisplayStyle(0,246,45,"left",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: window.MOBILE ? 25 : 28,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#ffffff'], // gradient
                        })
                  );


    this.BetLabel = new DisplayStyle(0,115,80,"left",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: window.MOBILE ? 25 : 28,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#f6ae31', '#f6ae31'], // gradient
                        })
                  );

    this.BetDisplay = new DisplayStyle(0,246,80,"left",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: window.MOBILE ? 25 : 28,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#ffffff'], // gradient
                        })
                  );


    this.Style=new ControlStyle(0,0,1.0);
}

// Create a ConsoleBill.prototype object that inherits from SObject.prototype.
ConsoleBill.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleBill
ConsoleBill.prototype.constructor = ConsoleBill;

//--------------------------------------------------------------------------//
ConsoleBill.prototype.Init = function() {

    this.CreditLabel.Init();
    this.CreditDisplay.Init();

    this.BetLabel.Init();
    this.BetDisplay.Init();

    this.CreditLabel.Visible(true);
    this.CreditDisplay.Visible(true);

    this.BetLabel.Visible(true);
    this.BetDisplay.Visible(true);

    this.Setup();

    // A clickable shape
    this.CreditLabel.SetButton(true);
    this.CreditDisplay.SetButton(true);

    this.BetLabel.SetButton(true);
    this.BetDisplay.SetButton(true);

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
ConsoleBill.prototype.OnResize = function() {

    this.Setup();
}
//--------------------------------------------------------------------------//
ConsoleBill.prototype.Setup = function() {

    var builder=this.ApplicationRef.CONTROL_BUILDER();

    builder.GetControlStyle(ControlBuilder.ID_CONSOLE_BILL,this.Style);

    var tab_sub_ctrl;

    // PER OGNI CONTROLLO DEL CONTAINER
    tab_sub_ctrl=this.ApplicationRef.CONTROL_BUILDER().GetSubControlStyle(ControlBuilder.ID_CONSOLE_BILL,this.Style);

    if (tab_sub_ctrl!=null)
    {
        this.CreditLabel.XX(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_LBL_CREDIT].X,0); this.CreditLabel.YY(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_LBL_CREDIT].Y,0);

        this.CreditDisplay.XX(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_DSP_CREDIT].X,0); this.CreditDisplay.YY(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_DSP_CREDIT].Y,0);


        this.BetLabel.XX(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_LBL_BET].X,0); this.BetLabel.YY(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_LBL_BET].Y,0);

        this.BetDisplay.XX(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_DSP_BET].X,0);   this.BetDisplay.YY(tab_sub_ctrl[ControlBuilder.ID_CONSOLE_BILL_DSP_BET].Y,0);
    }

    this.Container.x=this.Style.X;
    this.Container.y=this.Style.Y;
    this.Container.scale=new PIXI.Point(this.Style.SCALE,this.Style.SCALE);
}
//--------------------------------------------------------------------------//
ConsoleBill.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);

    // Toggle coins/cash view
    if (this.CreditLabel.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true ||
        this.CreditDisplay.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true ||
        this.BetLabel.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true ||
        this.BetDisplay.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
    {
        if (this.CoinsView==true)
            this.CoinsView=false;
        else
            this.CoinsView=true;
    }

    this.CreditLabel.SetCaption(ConsoleBill.TAB_CAPTIONS[0][window.LANG]);
    this.BetLabel.SetCaption(ConsoleBill.TAB_CAPTIONS[1][window.LANG]);

    if (this.FreezeCounters==false)

    if (this.CoinsView==true)		// Coins?
    {
        this.CreditDisplay.SetCaption(this.ApplicationRef.PLAYER().COINS_GET() );

        this.BetDisplay.SetCaption(this.ApplicationRef.SLOT().TOTAL_BET() );
    }
    else					// Euro
    {
        this.BetDisplay.SetCaptionCents  ( this.ApplicationRef.PLAYER().Coins2Divisa ( this.ApplicationRef.SLOT().TOTAL_BET() ),this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().VALUTA_STRING()  );

        this.CreditDisplay.SetCaptionCents ( this.ApplicationRef.PLAYER().CREDITI_GET(),this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().VALUTA_STRING());
    }
}
//------------------------------------------------------------//
ConsoleBill.prototype.SetFreezeCounters = function(frz) {
    this.FreezeCounters=frz;
}
//------------------------------------------------------------//
ConsoleBill.prototype.SetCoinView = function(coin_view) {
    this.CoinsView=coin_view;
}
//------------------------------------------------------------//
ConsoleBill.prototype.OnSpinEvent = function(spin) {

}
//--------------------------------------------------------------------------//
