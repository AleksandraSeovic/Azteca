//---------------------------------------------------------------------------//
PayTable.NUM_SHEETS=10;
PayTable.POS_Y=100;
PayTable.CANVAS_H=790;

//---------------------------------------------------------------------------//
PayTable.TAB_COORDINATE=[

    new PayTableCoords (0,0,0), // 0. ****** Nullo ******

// 2 simboli
new PayTableCoords (0,0,0,false), // 0.SlotCombo.ID_2_SIMBOLO_0
new PayTableCoords (0,0,0,false), // 1.SlotCombo.ID_2_SIMBOLO_1
new PayTableCoords (0,0,0,false), // 2.SlotCombo.ID_2_SIMBOLO_2
new PayTableCoords (0,0,0,false), // 3.SlotCombo.ID_2_SIMBOLO_3
new PayTableCoords (0,0,0,false), // 4.SlotCombo.ID_2_SIMBOLO_4

new PayTableCoords (0,0,0,false), // 5.SlotCombo.ID_2_SIMBOLO_5
new PayTableCoords (0,0,0,false), // 6.SlotCombo.ID_2_SIMBOLO_6
new PayTableCoords (0,0,0,false), // 7.SlotCombo.ID_2_SIMBOLO_7
new PayTableCoords (0,0,0,false), // 8.SlotCombo.ID_2_SIMBOLO_8
new PayTableCoords (0,0,0,false), // 9.SlotCombo.ID_2_SIMBOLO_9

new PayTableCoords (0,0,0,false), //10.SlotCombo.ID_2_SIMBOLO_JOLLY
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_SCATTER
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_BONUS

// 3 simboli
new PayTableCoords (1262,768,0,true), // 0.SlotCombo.ID_2_SIMBOLO_0
new PayTableCoords (1262,768,0,false), // 0.SlotCombo.ID_2_SIMBOLO_1
new PayTableCoords ( 864,768,0,true), // 1.SlotCombo.ID_2_SIMBOLO_2
new PayTableCoords ( 545,768,0,true), // 2.SlotCombo.ID_2_SIMBOLO_3
new PayTableCoords (1262,617,0,true), // 3.SlotCombo.ID_2_SIMBOLO_4

new PayTableCoords ( 545,617,0,true), // 3.SlotCombo.ID_2_SIMBOLO_5
new PayTableCoords (1262,475,0,true), // 5.SlotCombo.ID_2_SIMBOLO_6
new PayTableCoords ( 545,475,0,true), // 6.SlotCombo.ID_2_SIMBOLO_7
new PayTableCoords (1262,329,0,true), // 7.SlotCombo.ID_2_SIMBOLO_8
new PayTableCoords ( 545,329,0,true), // 8.SlotCombo.ID_2_SIMBOLO_9

new PayTableCoords (0,0,0,false), //10.SlotCombo.ID_2_SIMBOLO_JOLLY
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_SCATTER
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_BONUS


// 4 simboli
new PayTableCoords (1262,768-36,0,true), // 0.SlotCombo.ID_2_SIMBOLO_0
new PayTableCoords (1262,768-36,0,false), // 0.SlotCombo.ID_2_SIMBOLO_1
new PayTableCoords ( 864,768-36,0,true), // 1.SlotCombo.ID_2_SIMBOLO_2
new PayTableCoords ( 545,768-36,0,true), // 2.SlotCombo.ID_2_SIMBOLO_3
new PayTableCoords (1262,617-36,0,true), // 3.SlotCombo.ID_2_SIMBOLO_4

new PayTableCoords ( 545,617-36,0,true), // 3.SlotCombo.ID_2_SIMBOLO_5
new PayTableCoords (1262,475-36,0,true), // 5.SlotCombo.ID_2_SIMBOLO_6
new PayTableCoords ( 545,475-36,0,true), // 6.SlotCombo.ID_2_SIMBOLO_7
new PayTableCoords (1262,329-36,0,true), // 7.SlotCombo.ID_2_SIMBOLO_8
new PayTableCoords ( 545,329-36,0,true), // 8.SlotCombo.ID_2_SIMBOLO_9

new PayTableCoords (0,0,0,false), //10.SlotCombo.ID_2_SIMBOLO_JOLLY
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_SCATTER
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_BONUS

// 5 simboli
new PayTableCoords (1262,768-72,0,true), // 0.SlotCombo.ID_2_SIMBOLO_0
new PayTableCoords (1262,768-72,0,false), // 0.SlotCombo.ID_2_SIMBOLO_1
new PayTableCoords ( 864,768-72,0,true), // 1.SlotCombo.ID_2_SIMBOLO_2
new PayTableCoords ( 545,768-72,0,true), // 2.SlotCombo.ID_2_SIMBOLO_3
new PayTableCoords (1262,617-72,0,true), // 3.SlotCombo.ID_2_SIMBOLO_4

new PayTableCoords ( 545,617-72,0,true), // 3.SlotCombo.ID_2_SIMBOLO_5
new PayTableCoords (1262,475-72,0,true), // 5.SlotCombo.ID_2_SIMBOLO_6
new PayTableCoords ( 545,475-72,0,true), // 6.SlotCombo.ID_2_SIMBOLO_7
new PayTableCoords (1262,329-72,0,true), // 7.SlotCombo.ID_2_SIMBOLO_8
new PayTableCoords ( 545,329-72,0,true), // 8.SlotCombo.ID_2_SIMBOLO_9

new PayTableCoords ( 864,329-32,0,true), //10.SlotCombo.ID_2_SIMBOLO_JOLLY
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_SCATTER
new PayTableCoords (0,0,0,false), //11.SlotCombo.ID_2_SIMBOLO_BONUS

// Scatter
new PayTableCoords (0,0,0,false), // 0.SlotCombo.ID_SCATTER_2
new PayTableCoords (0,0,0,false), // 1.SlotCombo.ID_SCATTER_3
new PayTableCoords (0,0,0,false), // 2.SlotCombo.ID_SCATTER_4
new PayTableCoords (0,0,0,false)  // 3.SlotCombo.ID_SCATTER_5

];
//--------------------------------------------------------------------------//
function PayTable(app_reference) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.Container      = new PIXI.Container();
    this.ParentContainer= null;

    this.Black=new PIXI.Graphics();
    this.Black.beginFill(0x000000,0.7);
    this.Black.drawRect(0, 0, window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
    this.Black.endFill();

    this.BackGround = new TiledSprite("Help_",PayTable.NUM_SHEETS, true, this.Container,'.webp');

    this.Quotazioni=[];

    for (let i = 0; i < window.NUM_COMBINAZIONI_SLOT; i++) {
        this.Quotazioni.push( new PayTableQuotazione(i ,this.ApplicationRef,this.Container) );
    }

    this.Butt_Prev = new TiledSprite("help_prev",3, true, this.Container,'.webp');
    this.Butt_Exit = new TiledSprite("help_exit",3, true, this.Container,'.webp');
    this.Butt_Next = new TiledSprite("help_next",3, true, this.Container,'.webp');

    this.Step=0;
    this.PageView=0;
    this.Mounted=false;

    this.Container.visible=false;
}

// Create a PayTable.prototype object that inherits from SObject.prototype.
PayTable.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to PayTable
PayTable.prototype.constructor = PayTable;
//--------------------------------------------------------------------------//
PayTable.prototype.Init = function() {

    var button_scale=1.0;

    this.Container.addChild(this.Black);
    this.Black.visible=true;

    this.BackGround.Setup();

    this.BackGround.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT);

    this.BackGround.YY(PayTable.POS_Y,0);

    if (window.MOBILE==true)
        button_scale=2.0;

    this.Butt_Exit.Setup();
    this.Butt_Exit.ResetProperties(true,1.0,button_scale);
    this.Butt_Exit.SetButton(true);
    this.Butt_Exit.CenterBox(window.VIDEO_WIDTH,window.VIDEO_HEIGHT,true);
    this.Butt_Exit.YY((PayTable.POS_Y+PayTable.CANVAS_H),0);

    this.Butt_Prev.Setup();
    this.Butt_Prev.ResetProperties(true,1.0,button_scale);
    this.Butt_Prev.SetButton(true);
    this.Butt_Prev.XX( this.Butt_Exit.Sprite.x,-200);
    this.Butt_Prev.YY( this.Butt_Exit.Sprite.y,0);

    this.Butt_Next.Setup();
    this.Butt_Next.ResetProperties(true,1.0,button_scale);
    this.Butt_Next.SetButton(true);
    this.Butt_Next.XX( this.Butt_Exit.Sprite.x,200);
    this.Butt_Next.YY( this.Butt_Exit.Sprite.y,0);
}
//--------------------------------------------------------------------------//
PayTable.prototype.Renderize = function() {
    let ww = 0
    for (let i = window.NUM_COMBINAZIONI_SLOT-1; i >= 0; i--)
    {
        if (PayTable.TAB_COORDINATE[i].VISIBLE==true)
            ww = this.Quotazioni[i].Renderize( PayTable.TAB_COORDINATE[i].X, PayTable.TAB_COORDINATE[i].Y, ww);
    }
 }
//------------------------------------------------------------//
PayTable.prototype.Mount = function(parent_container) {

    this.Mounted=true;

    this.ApplicationRef.CONSOLE().Disable();
    //this.ParentContainer=parent_container;

    //this.ParentContainer.addChild(this.Container);
    this.MainStage.addChild(this.Container);

    this.Container.visible=true;

    this.ExitRequest=false;

    this.Renderize();

    this.PageSetup(0);

    this.Step=1;
}
//------------------------------------------------------------//
PayTable.prototype.UnMount = function() {

    if (this.Mounted==true)
    {
        this.Step=0;

        this.MainStage.removeChild(this.Container);

        this.Mounted=false;

        this.ExitRequest=false;

        this.Container.visible=false;

        this.ApplicationRef.CONSOLE().Enable();
    }
}
//------------------------------------------------------------//
PayTable.prototype.PageSetup = function(page_index) {

    this.PageView=page_index;

    this.BackGround.SetFrame(page_index);

    for (let i=0; i<window.NUM_COMBINAZIONI_SLOT; i++)
    {
        if (PayTable.TAB_COORDINATE[i].PAGE==page_index && this.Quotazioni[i].Renderable()==true)
            this.Quotazioni[i].Visible(true);
        else
            this.Quotazioni[i].Visible(false);
    }

    this.Butt_Prev.Visible(true);
    this.Butt_Exit.Visible(true);
    this.Butt_Next.Visible(true);

}
//------------------------------------------------------------//
PayTable.prototype.Refresh = function(ellapsed_time) {

    if (this.Mounted==true)
    {
        switch(this.Step)
        {
            case 0:
            {


            }break;

            case 1:
            {
                if (this.Butt_Exit.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

                    this.UnMount();
                }
                else if (this.Butt_Prev.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

                    this.PagePrev();
                }
                else if (this.Butt_Next.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
                {
                    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

                    this.PageNext();
                }

            }break;

            default:break;
        }
    }
}
//------------------------------------------------------------//
PayTable.prototype.PagePrev = function() {

    if (this.PageView>0)
        this.PageView--;
    else
        this.PageView=(PayTable.NUM_SHEETS-1);

    this.PageSetup(this.PageView);
}
//------------------------------------------------------------//
PayTable.prototype.PageNext = function() {

    if (++this.PageView>=PayTable.NUM_SHEETS)
        this.PageView=0;

    this.PageSetup(this.PageView);
}
//------------------------------------------------------------//
PayTable.prototype.IsMounted = function() {

    return this.Mounted;
}
//------------------------------------------------------------//
PayTable.prototype.Exit = function() {

    return this.ExitRequest;
}
//---------------------------------------------------------------------------//

