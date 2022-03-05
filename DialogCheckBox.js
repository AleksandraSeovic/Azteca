function DialogCheckBox(caption,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ParentContainer = parent_container;
    this.Container=new PIXI.Container();

    this.SpriteButton = new TiledSprite("Butt_Check",2,true,this.Container,'.webp');

    this.ButtonText = new DisplayStyle(6,0,0,"left",this.Container,
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
DialogCheckBox.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to DialogButton
DialogCheckBox.prototype.constructor = DialogCheckBox;

//--------------------------------------------------------------------------//
DialogCheckBox.prototype.Init = function() {

    this.SpriteButton.Setup();
    this.SpriteButton.SetButton(true);

    this.ButtonText.Init();

    this.SetCaption(this.Caption);

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
DialogCheckBox.prototype.SetCaption = function(caption) {

    this.ButtonText.SetCaption(caption);
    this.ButtonText.CenterBox( this.SpriteButton.FrameW,this.SpriteButton.FrameH );
    this.ButtonText.XX(0,45);
}
//--------------------------------------------------------------------------//
DialogCheckBox.prototype.SetValue = function(val)
{
    this.SpriteButton.SetFrame(val);
}
//--------------------------------------------------------------------------//
DialogCheckBox.prototype.XX = function(xx,offs)
{
    this.Container.x=(xx+offs);
}
//--------------------------------------------------------------------------//
DialogCheckBox.prototype.YY = function(yy,offs)
{
    //this.SpriteButton.YY(yy,offs);
    this.Container.y=(yy+offs);
}
//------------------------------------------------------------//
DialogCheckBox.prototype.Visible = function(vsb){

    this.SpriteButton.Visible(vsb);
    this.ButtonText.Visible(vsb);
}
//------------------------------------------------------------//
DialogCheckBox.prototype.IsVisible = function(){

    return this.SpriteButton.IsVisible();
}
//------------------------------------------------------------//
DialogCheckBox.prototype.GetSprite = function(){

    return this.SpriteButton;
}
//------------------------------------------------------------//
DialogCheckBox.prototype.SetEnabled = function(enb){

    if (enb==true)
    {
        this.SpriteButton.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
        this.ButtonText.DisplayText.alpha=1.0;
    }
    else
    {
        this.SpriteButton.SetMaskFilter(TiledSprite.MASK_STAT_DARKEN);
        this.ButtonText.DisplayText.alpha=0.5;
    }

    this.SpriteButton.SetButton(enb);

    this.Enabled=enb;
}
//------------------------------------------------------------//
