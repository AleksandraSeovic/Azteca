//--------------------------------------------------------------------------//
SlotStage.TEATRO_NORMAL  =0;
SlotStage.TEATRO_FREESPIN=1;
SlotStage.TEATRO_BONUS   =2;

//--------------------------------------------------------------------------//
function SlotStage(stage_container,app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage = stage_container;
    this.Container=new PIXI.Container();
    this.Background = new TiledSprite("Teatro",1,true,this.Container,'.webp');
    this.BackgroundFS=new TiledSprite("TeatroFS",1,false,this.Container,'.webp');
    this.BackgroundBN=null;//new TiledSprite("TeatroBN",1,false,this.Container);

    this.Reels=new TiledSprite("Reels",1,true,this.Container,'.webp');
    this.ReelsFS=new TiledSprite("ReelsFS",1,false,this.Container,'.webp');

    this.SnowEmitter= null;

    this.GameType = SlotStage.TEATRO_NORMAL;
}

// Create a SlotStage.prototype object that inherits from SObject.prototype.
SlotStage.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotStage
SlotStage.prototype.constructor = SlotStage;

//--------------------------------------------------------------------------//
SlotStage.prototype.Init = function() {

    var resources;
    var json_data;

    this.Background.Setup();
    this.BackgroundFS.Setup();

    resources=this.ApplicationRef.TEXTURE_DB();

    json_data=resources["PRT_Snow"].data;

    this.SnowEmitter= new PIXI.particles.Emitter(this.Container,[PIXI.Texture.fromFrame("Star1.webp"),PIXI.Texture.fromFrame("Star2.webp"),PIXI.Texture.fromFrame("Star3.webp"),PIXI.Texture.fromFrame("Star4.webp")],json_data);

    this.Reels.Setup();

    if (this.ReelsFS!=null)
        this.ReelsFS.Setup();

    this.ParentStage.addChild(this.Container);

    this.SnowEmitter.emit=true;

    this.GPTimer=this.ArmaTimer(this.GPTimer, 1500 );
}
//--------------------------------------------------------------------------//
SlotStage.prototype.SetType = function(id_type) {

    //this.Background.SetFrame( id_type );
    if (id_type==SlotStage.TEATRO_NORMAL)
    {
        this.BackgroundFS.Visible(false); /*this.BackgroundBN.Visible(false);*/ this.Background.Visible(true);

        this.Reels.Visible(true); this.ReelsFS.Visible(false);

        this.ApplicationRef.SLOT().REEL_HOLDER().SetSpecialReel(ReelHolder.SPECIAL_REEL_MULTY);

        this.SnowEmitter.emit=true;

        this.GameType = SlotStage.TEATRO_NORMAL;
        this.PlayMusic();
    }
    else if (id_type==SlotStage.TEATRO_FREESPIN)
    {
        this.BackgroundFS.Visible(true); /*this.BackgroundBN.Visible(false);*/ this.Background.Visible(false);

        this.Reels.Visible(false); this.ReelsFS.Visible(true);

        this.ApplicationRef.SLOT().REEL_HOLDER().SetSpecialReel(ReelHolder.SPECIAL_REEL_SYMBOL);

        this.SnowEmitter.emit=false;

        this.GameType = SlotStage.TEATRO_FREESPIN;
    }
    else if (id_type==SlotStage.TEATRO_BONUS)
    {
        //this.BackgroundFS.Visible(false); /*this.BackgroundBN.Visible(true);*/ this.Background.Visible(false);

        //this.Reels.Visible(false); this.ReelsFS.Visible(false);

        this.GameType = SlotStage.TEATRO_BONUS;
    }

    this.ApplicationRef.SLOT().REEL_FRAME().SetType(id_type);
}
//--------------------------------------------------------------------------//
SlotStage.prototype.Refresh = function(ellapsed_ms) {

    SObject.prototype.TimerRefresh.call(this,ellapsed_ms);

    if (this.GPTimer==0)
        this.SnowEmitter.emit=false;

    this.SnowEmitter.update((ellapsed_ms*0.001));

    this.Background.Refresh(ellapsed_ms);

    this.Reels.Refresh(ellapsed_ms);

}
//--------------------------------------------------------------------------//

SlotStage.prototype.PlayMusic = function() {

    switch (this.GameType) {
        case SlotStage.TEATRO_NORMAL: {
            this._playStageMusic(SoundGenerator.FREESPIN_LOOP, SoundGenerator.BONUS_LOOP, SoundGenerator.GAME_LOOP,
                (SoundGenerator.SMP_VOLUME_SUPER_REDUCE|SoundGenerator.SMP_LOOP));
        } break;
        case SlotStage.TEATRO_FREESPIN: {
            this._playStageMusic(SoundGenerator.GAME_LOOP, SoundGenerator.BONUS_LOOP, SoundGenerator.FREESPIN_LOOP,
                (SoundGenerator.SMP_VOLUME_NORMAL|SoundGenerator.SMP_LOOP));
        } break;
        case SlotStage.TEATRO_BONUS: {
            this._playStageMusic(SoundGenerator.FREESPIN_LOOP, SoundGenerator.GAME_LOOP, SoundGenerator.BONUS_LOOP,
                (SoundGenerator.SMP_VOLUME_NORMAL|SoundGenerator.SMP_LOOP));
        } break;
        default: break;
    }
}
SlotStage.prototype._playStageMusic = function(idSndStage1Stop, idSndStage2Stop, idSndStage, flags) {

    if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying( idSndStage1Stop )==true)
        this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(idSndStage1Stop);

    if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying( idSndStage2Stop )==true)
        this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(idSndStage2Stop);

    if (this.ApplicationRef.SOUNDGENERATOR().IsPaused(idSndStage)==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().Resume(idSndStage, flags);
    }
    else if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying(idSndStage)==false)
    {
        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(idSndStage, flags, true);
    }
}
