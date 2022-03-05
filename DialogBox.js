//------------------------------------------------------------//
DialogBox.DIALOG_NOT_MODAL		=0;
DialogBox.DIALOG_MODAL_OK		=1;
DialogBox.DIALOG_MODAL_OK_CANCEL=2;
//------------------------------------------------------------//
DialogBox.DIALOG_EXIT_NONE		=0;
DialogBox.DIALOG_EXIT_OK		=1;
DialogBox.DIALOG_EXIT_CANCEL	=2;
//--------------------------------------------------------------------------//
DialogBox.TAB_CAPTIONS=
[
    ["ATTENTION","ATTENZIONE"]
];

//------------------------------------------------------------//

function DialogBox(app_reference,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;

    this.Container=new PIXI.Container();

    this.Shape = new TiledSprite("Alarm_Box",1,true,this.Container,'.webp');

    this.TitleText = null;
    this.InfoText = null;

    this.ButtonOK=null;
    this.ButtonCANCEL=null;
}

// Create a DialogBox.prototype object that inherits from SObject.prototype.
DialogBox.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to DialogBox
DialogBox.prototype.constructor = DialogBox;

//--------------------------------------------------------------------------//
DialogBox.prototype.Init = function() {

    this.Container.scale=new PIXI.Point(1.5,1.5);

    this.Shape.Setup();

    if (this.InfoText == null)
    {
        this.InfoText =new DisplayStyle(this.Shape.FrameW,0,((this.Shape.FrameH/2)-32),"center",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 32,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: 'white'
                        })
                  );
    }

    if (this.TitleText == null)
    {
        this.TitleText =new DisplayStyle(this.Shape.FrameW,0,24,"center",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 32,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: 'white'
                        })
                  );
    }


    this.InfoText.Init();
}
//------------------------------------------------------------//
DialogBox.prototype.Render = function(popup_message,modal) {

    this.TitleText.SetCaption(DialogBox.TAB_CAPTIONS[0][window.LANG]);
    this.TitleText.Visible(true);

    this.InfoText.SetCaption(popup_message);
    this.InfoText.Visible(true);


    var proxy_msg=this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES();

    if (this.ButtonOK==null)
    {
        this.ButtonOK=new DialogButton(proxy_msg.OK_MESSAGE() ,this.Container);
        this.ButtonOK.Init();
    }

    if (this.ButtonCANCEL==null)
    {
        this.ButtonCANCEL=new DialogButton(proxy_msg.CANCEL_MESSAGE() ,this.Container);
        this.ButtonCANCEL.Init();
    }

    if (modal!=DialogBox.DIALOG_NOT_MODAL)
    {
        if (modal==DialogBox.DIALOG_MODAL_OK)
        {
            this.ButtonOK.XX(350,0);
            this.ButtonOK.YY(435,0);
            this.ButtonOK.Visible(true);
            this.ButtonOK.Container.scale.x=1.5;
            this.ButtonOK.Container.scale.y=1.5;
        }
        else
        {
            this.ButtonOK.XX(190,0);
            this.ButtonOK.YY(350,0);
            this.ButtonOK.Visible(true);
            this.ButtonOK.Container.scale.x=1.5;
            this.ButtonOK.Container.scale.y=1.5;

            this.ButtonCANCEL.XX(510,0);
            this.ButtonCANCEL.YY(350,0);
            this.ButtonCANCEL.Visible(true);
            this.ButtonCANCEL.Container.scale.x=1.5;
            this.ButtonCANCEL.Container.scale.y=1.5;

        }
    }
    else
    {
        this.ButtonOK.Visible(false);
        this.ButtonCANCEL.Visible(false);
    }
}
//--------------------------------------------------------------//
DialogBox.prototype.GetShape = function() {
    return this.Shape;
}
//--------------------------------------------------------------//
DialogBox.prototype.GetContainer = function() {
    return this.Container;
}
//--------------------------------------------------------------//
DialogBox.prototype.GetTextDisplay = function() {
    return this.InfoText;
}
//--------------------------------------------------------------//
DialogBox.prototype.Mount = function() {

    var offs_x,offs_y;

//    offs_x=(window.VIDEO_WIDTH-this.Container.width)/2;
//    offs_y=(window.VIDEO_HEIGHT-this.Container.height)/2;

    offs_x=(window.VIDEO_WIDTH-(this.Container.scale.x*this.Shape.ACTUAL_W()))/2;
    offs_y=(window.VIDEO_HEIGHT-(this.Container.scale.y*this.Shape.ACTUAL_H()))/2;



    this.Container.x=offs_x;
    this.Container.y=offs_y;

    this.Shape.Visible(true);

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------//
DialogBox.prototype.Unmount = function() {

    if (this.Shape.IsVisible()==true)
    {
        this.ButtonOK.Visible(false);
        this.ButtonCANCEL.Visible(false);
        this.Shape.Visible(false);

        this.ParentContainer.removeChild(this.Container);
    }
}
//--------------------------------------------------------------//
DialogBox.prototype.Refresh = function() {

    var exit=DialogBox.DIALOG_EXIT_NONE;

    if (this.Shape.IsVisible()==true)
    {
        if (this.ButtonOK.IsVisible()==true)
        {
            if (this.ButtonOK.GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
                this.ButtonOK.GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_HIGHLIGHT);
            else if (this.ButtonOK.GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
                this.ButtonOK.GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_NONE);

            if (this.ButtonOK.GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
            {
                exit=DialogBox.DIALOG_EXIT_OK;
            }
        }

        if (this.ButtonCANCEL.IsVisible()==true)
        {
            if (this.ButtonCANCEL.GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
                this.ButtonCANCEL.GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_HIGHLIGHT,0);
            else if (this.ButtonCANCEL.GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
                this.ButtonCANCEL.GetSprite().SetMaskFilter(TiledSprite.MASK_STAT_NONE,0);

            if (this.ButtonCANCEL.GetSprite().CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
            {
                exit=DialogBox.DIALOG_EXIT_CANCEL;
            }
        }
    }

    return exit;
}
//--------------------------------------------------------------------------//
