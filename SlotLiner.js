//--------------------------------------------------------------------------//
function SlotLiner(parent_container,app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage = parent_container;
    this.Container=new PIXI.Container();

    this.Lines= new Array(window.NUM_LINEE);

    this.DisplayWin=null;
    this.DisplayWinLine=null;

    this.DEBUG_LOG("*** CREATING LINER FOR "+this.Lines.length+" LINES ****");

    for (var i=0;i<this.Lines.length;i++)
        this.Lines[i]=new SlotLine(this.ParentStage,this.ApplicationRef);

    this.SymbolsLineSet=null;

    this.CurLinesCount=0;
    this.OldLinesCount=0;
    this.Stato=0;
    this.PreviewLinea=0;
    this.Enabled=false;
}

// Create a SlotLiner.prototype object that inherits from SObject.prototype.
SlotLiner.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotLiner
SlotLiner.prototype.constructor = SlotLiner;

//--------------------------------------------------------------------------//
SlotLiner.prototype.Init = function() {

    // Crea il display vincita x console
    this.DisplayWin = new DisplayStyle(0,820,126,"left",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 32,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#ffaa00'], // gradient
                        })
                  );

    this.DisplayWin.Init();
    this.DisplayWin.SetCaption("0");
    this.DisplayWin.Visible(false);

    // Crea il display vincita x linea
/*
    this.DisplayWinLine = new DisplayStyle(0,0,0,"left",this.ApplicationRef.SLOT().CONTAINER(),
                        new PIXI.TextStyle({
                            fontFamily: 'Verdana',
                            fontSize: 64,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            strokeThickness: 2,
                            dropShadow: true,
                            dropShadowColor: '#000000',
                            dropShadowBlur: 4,
                            dropShadowAngle: Math.PI / 6,
                            dropShadowDistance: 6,
                            fill: ['#ffffff', '#ffaa00'], // gradient
                        })
                  );

    this.DisplayWinLine.Init();
    this.DisplayWinLine.SetCaption("0");
    this.DisplayWinLine.Visible(false);
*/

    this.SpriteWinLine=new TiledSprite("FX02",1,false,this.ApplicationRef.SLOT().CONTAINER(),'.webp');
    this.SpriteWinLine.Setup();

    this.DisplayWinLine =new DisplaySprite(8,0,0,"GFXFontA","left",DisplaySprite.NUMERIC_DISPLAY,this.ApplicationRef.SLOT().CONTAINER(),'.webp');
    this.DisplayWinLine.Init();
    this.DisplayWinLine.SetCaption("0");
    this.DisplayWinLine.SCALE(1.0);
    this.DisplayWinLine.Visible(false);

    // Crea il tile set per la preview dei simboli vincenti
    this.SymbolsLineSet=new Array(window.NUM_REELS);

    for (var i=0;i<this.SymbolsLineSet.length;i++)
    {
        this.SymbolsLineSet[i]=new TiledSprite("SYM", window.NUM_SIMBOLI , true, this.Container,'.webp');
        this.SymbolsLineSet[i].Setup();
        this.SymbolsLineSet[i].ResetProperties(false,1.0,0.15);
        this.SymbolsLineSet[i].YY(125, 0);
        this.SymbolsLineSet[i].XX(this.DisplayWin.DisplayText.x,-((i+2)*42));
    }

    for (var i = 0; i < this.Lines.length; i++) {
        this.Lines[i].Init(this.DisplayWin,this.DisplayWinLine,this.SpriteWinLine,this.SymbolsLineSet);
    }


    this.Reset();

    //this.ParentStage.addChild(this.Container);
}
//--------------------------------------------------------------------------//
SlotLiner.prototype.Reset = function() {

    this.OldLinesCount=window.DEFAULT_LINES;
    this.CurLinesCount=window.DEFAULT_LINES;
    this.Stato=0;
    this.PreviewLinea=0xFF;
}
//--------------------------------------------------------------------------//
SlotLiner.prototype.CheckLinePreview = function() {
/*
    if (this.PreviewLinea!=0xFF)
    {
        if (this.ApplicationRef.SLOT().IsSpinOver()==true)
        {
            if (this.OldLinesCount!=this.CurLinesCount)
            {
                this.OldLinesCount=this.CurLinesCount;
                this.VisualizzaPuntatori(1);
            }

            this.CancellaLinee();

            //m_Linee[m_PreviewLinea].Draw(0);

            this.VisualizzaLinea(this.PreviewLinea,0);

            this.GPTimer=this.ArmaTimer(this.GPTimer,2000);

            this.Stato=1;
        }

        this.PreviewLinea=0xFF;
    }

    if (this.OldLinesCount!=this.CurLinesCount)
    {
        if (this.CurLinesCount<this.OldLinesCount)
            this.CancellaLinee();

        this.OldLinesCount=this.CurLinesCount;

        if (this.ApplicationRef.SLOT().IsSpinOver()==true)
        {
            this.VisualizzaPuntatori(1);

            this.VisualizzaLinee();

            this.GPTimer=this.ArmaTimer(this.GPTimer,2000);

            this.Stato=2;
        }
    }

    if (this.Stato!=0)
    {
        if (this.GPTimer==0)
        {
            this.CancellaLinee();

            this.Stato=0;
        }
    }
*/
}
//--------------------------------------------------------------//
SlotLiner.prototype.PreviewLineaSet = function(linea) {
/*
    if (this.Stato!=2)
    {
        this.DEBUG_LOG("PREVIEW LINE "+linea);

        this.PreviewLinea=linea;
    }
*/
}
//--------------------------------------------------------------//
SlotLiner.prototype.Stop = function() {

    this.GPTimer=0;
    this.Refresh();
}
//--------------------------------------------------------------//
SlotLiner.prototype.NotifyPower = function(p_Linee) {

    this.OldLinesCount=this.CurLinesCount;
    this.CurLinesCount=p_Linee;

    // preview linea in corso?
    if (this.Stato==1)
    {
        this.OldLinesCount=0xFFFF;

        this.GPTimer=0;
    }
}
//--------------------------------------------------------------//
SlotLiner.prototype.VisualizzaLinee = function() {
/*
    this.DEBUG_LOG("SHOW LINES "+this.CurLinesCount);

    for (var i=0;i<this.CurLinesCount;i++)
        this.Lines[i].Draw(0);
*/
}
//--------------------------------------------------------------//
SlotLiner.prototype.CancellaLinee = function() {

    for (var i=0;i<this.Lines.length;i++)
        this.Lines[i].Clear();

    if (this.ParentStage.children.indexOf(this.Container)!=-1)
        this.ParentStage.removeChild(this.Container);
}
//--------------------------------------------------------------//
SlotLiner.prototype.VisualizzaPuntatori = function(p_Stato) {
/*
    var i,top;

    if (p_Stato==0)
        top=window.NUM_LINEE;
    else
        top=this.CurLinesCount;

    for (i=0;i<top;i++)
        this.Lines[i].VisualizzaPuntatore(p_Stato);

    if (top<window.NUM_LINEE)
    {
        for (i=top;i<window.NUM_LINEE;i++)
            this.Lines[i].VisualizzaPuntatore(0);
    }
*/
}
//--------------------------------------------------------------//
SlotLiner.prototype.VisualizzaLinea = function(linea,win) {

    this.DEBUG_LOG("SHOW LINE "+linea);

    this.Lines[linea].Draw(win);

    if (this.ParentStage.children.indexOf(this.Container)==-1)
        this.ParentStage.addChild(this.Container);
}
//--------------------------------------------------------------------------//
SlotLiner.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);

    this.CheckLinePreview();

    for (var i = 0; i < this.Lines.length; i++) {
        this.Lines[i].Refresh(ellapsed_ms);
    }

    this.DisplayWinLine.Refresh(ellapsed_ms);

    if (this.SpriteWinLine!=null)
        this.SpriteWinLine.Refresh(ellapsed_ms);
}
//--------------------------------------------------------------//
SlotLiner.prototype.Visible = function(vsb) {
    this.Container.visible=vsb;
}
//--------------------------------------------------------------------------//
