function DialogButton(caption,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ParentContainer = parent_container;
    this.Container=new PIXI.Container();
    this.SpriteButton = new TiledSprite("Dialog_Button",1,false,this.Container,'.webp');

    this.ButtonText = new DisplayStyle(6,0,0,"center",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: 'white'
                        })
                  );

    this.Caption=caption;

    this.Enabled=true;
}

// Create a DialogButton.prototype object that inherits from SObject.prototype.
DialogButton.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to DialogButton
DialogButton.prototype.constructor = DialogButton;

//--------------------------------------------------------------------------//
DialogButton.prototype.Init = function() {

    this.SpriteButton.Setup();
    this.SpriteButton.SetButton(true);

    this.ButtonText.Init();

    this.SetCaption(this.Caption);

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
DialogButton.prototype.SetCaption = function(caption) {

    this.ButtonText.SetCaption(caption);
    this.ButtonText.CenterBox( this.SpriteButton.FrameW,this.SpriteButton.FrameH );
}
//--------------------------------------------------------------------------//
DialogButton.prototype.XX = function(xx,offs)
{
    this.Container.x=(xx+offs);
}
//--------------------------------------------------------------------------//
DialogButton.prototype.YY = function(yy,offs)
{
    //this.SpriteButton.YY(yy,offs);
    this.Container.y=(yy+offs);
}
//------------------------------------------------------------//
DialogButton.prototype.Visible = function(vsb){

    this.SpriteButton.Visible(vsb);
    this.ButtonText.Visible(vsb);
}
//------------------------------------------------------------//
DialogButton.prototype.IsVisible = function(){

    return this.SpriteButton.IsVisible();
}
//------------------------------------------------------------//
DialogButton.prototype.GetSprite = function(){

    return this.SpriteButton;
}
//------------------------------------------------------------//
DialogButton.prototype.SetEnabled = function(enb){

    if (enb==true)
    {
        this.SpriteButton.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
        this.ButtonText.DisplayText.alpha=1.0;
    }
    else
    {
        this.SpriteButton.SetMaskFilter(TiledSprite.MASK_STAT_GRAY);
        this.ButtonText.DisplayText.alpha=0.5;
    }

    this.SpriteButton.SetButton(enb);

    this.Enabled=enb;
}


//--------------------------------------------------------------------------//
