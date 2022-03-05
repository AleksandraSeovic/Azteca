
//------------------------------------------------------------//
LongWild.WILD_STAT_IDLE=0;
LongWild.WILD_STAT_VALIDATE=1;
LongWild.WILD_STAT_ARMATO=2;
LongWild.WILD_STAT_INNESCATA=3;

LongWild.WILD_ANIMATE_IDLE=0xFF;
//------------------------------------------------------------//
LongWild.WILD_MAX_REELS=5;

//--------------------------------------------------------------------------//
function LongWild(stage_container,app_reference) {


    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage = stage_container;
    this.Container=new PIXI.Container();

    this.SlotComboRef=null;
    this.SimboliEstrattiRef=null;

    this.WILD_Pivot=new Array(LongWild.WILD_MAX_REELS);
    this.WILD_Stato=0;
    this.WILD_AniACK=0;
    this.WILD_AniDelay=0;

    this.CreateSprites();
}

// Create a LongWild.prototype object that inherits from SObject.prototype.
LongWild.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to LongWild
LongWild.prototype.constructor = LongWild;

//--------------------------------------------------------------------------//
LongWild.prototype.Init = function() {

    var i;

    this.WILD_Pivot.fill(0xFF);

    this.WILD_Stato=LongWild.WILD_STAT_IDLE;
    this.WILD_AniACK=0;

    this.SlotComboRef=this.ApplicationRef.SLOT().SLOT_COMBO();

    this.SimboliEstrattiRef=this.ApplicationRef.SLOT().SLOT_COMBO().SimboliEstratti;

    for (i=0;i<LongWild.WILD_MAX_REELS;i++)
    {
        this.WILD_Sprites[i].Setup();
    }

    this.ParentStage.addChild(this.Container);
}
//---------------------------------------------------------------------------//
LongWild.prototype.NearPivot = function(pivot_index,nearest) {

    var pos_pivot,pos;

    pos_pivot=this.SlotComboRef.GetPosizioneInRullo(this.WILD_Pivot[pivot_index]);

    pos=this.WILD_Pivot[pivot_index]+((nearest+1)*window.NUM_REELS);

    return pos;
}
//---------------------------------------------------------------------------//
LongWild.prototype.FitReel = function(reel_index,pivot_index) {

    var i,pivot,pivot_template;

    // Compila gli indici del rullo
    this.SlotComboRef.GetVettoreIndiciRullo(reel_index);

    pivot_template=this.SimboliEstrattiRef[ this.SlotComboRef.VettoreIndiciRullo[0] ];

    for (i=0;i<window.NUM_SIMBOLI_RUOTA;i++)
    {
        // Storia pregressa di gioco?
        if (this.SlotComboRef.IsHold(this.SlotComboRef.VettoreIndiciRullo[i])==true)
            break;
        else if (this.SlotComboRef.IsSimboloJolly ( this.SimboliEstrattiRef[ this.SlotComboRef.VettoreIndiciRullo[i] ] )==false)
            break;
    }

    if (i>=window.NUM_SIMBOLI_RUOTA)
    {
        this.WILD_Pivot[pivot_index]=this.SlotComboRef.VettoreIndiciRullo[0];

        return true;
    }

    return false;
}
//---------------------------------------------------------------------------//
LongWild.prototype.FakeReel = function(pivot_index) {
}
//---------------------------------------------------------------------------//
LongWild.prototype.Elabora = function() {

    var reel_index,pivot_index,wild_cnt;

    this.WILD_Stato=LongWild.WILD_STAT_IDLE;

    this.WILD_Pivot.fill(0xFF);

    if (this.ApplicationRef.SLOT().FREESPIN_IsRunning()==false)
    {
        for (reel_index=0,wild_cnt=0; (reel_index<window.NUM_REELS && wild_cnt<LongWild.WILD_MAX_REELS) ;reel_index++)
        {
    //						   <<  indice del rullo  >>,<<progress>>
            if (this.FitReel(reel_index,wild_cnt)==true)
            {
                wild_cnt++;

                this.WILD_Stato=LongWild.WILD_STAT_ARMATO;
            }
        }


        // Maschera i rulli wild
        if (this.WILD_Stato==LongWild.WILD_STAT_ARMATO)
        {
            for (pivot_index=0;pivot_index<LongWild.WILD_MAX_REELS;pivot_index++)
            {
                if (this.ValidPivot(pivot_index)==true)
                {
                    this.FakeReel (pivot_index);
                }
            }
        }
    }
}
//---------------------------------------------------------------------------//
LongWild.prototype.SostituzioneSimboli = function() {

    if (this.WILD_Stato==LongWild.WILD_STAT_ARMATO)
    {
        //this.ApplicationRef.SLOT().ChassisFix();

        this.WILD_Stato=LongWild.WILD_STAT_INNESCATA;
    }
}
//---------------------------------------------------------------------------//
// OVERRIDE
LongWild.prototype.AniStart = function() {

    var i;

    for (i=0;i<LongWild.WILD_MAX_REELS;i++)
    {
        if (this.ValidPivot( i )==true )
        {
            pos=this.WILD_Pivot[i];

            this.WILD_Sprites[i].ResetProperties(true,1.0,1.0);
            this.WILD_Sprites[i].XX(this.ApplicationRef.SLOT().REEL(pos).GetXX(),0);
            this.WILD_Sprites[i].YY(this.ApplicationRef.SLOT().REEL(pos).GetYY(),0);


            this.WILD_Sprites[i].SPRITE_TRANSFORMER().AnimateAbs(0,this.WILD_Sprites[i].TotFrames-1,SpriteTransformer.MASK_NONE,50);

            //this.WILD_Sprites[i].SPRITE_TRANSFORMER().FadeAbs(1.0,10,30);
            this.SetReelVisible(i, false)
        }
    }

    this.WILD_AniACK=1;

    this.WILD_AniDelay=0;

    //if (Application.SOUNDGENERATOR().IsPlaying(SoundGenerator.WILD_OPEN)==false)
        //Application.SOUNDGENERATOR().PlayBrano ( SoundGenerator.WILD_OPEN ,SoundGenerator.SMP_VOLUME_AMPLIFY);

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano( SoundGenerator.LONG_WILD,SoundGenerator.SMP_VOLUME_NORMAL );

    this.WILD_Stato=LongWild.WILD_STAT_IDLE;
}
//---------------------------------------------------------------------------//
// OVERRIDE
LongWild.prototype.AniRun = function() {

    var i,wait;

    if (this.IntroRunning()==false)
        return;

    if (this.WILD_AniACK==1)
    {
        wait=0;

        for (i=0;i<LongWild.WILD_MAX_REELS;i++)
        {
            if (this.ValidPivot( i )==true )
            {
                if (this.WILD_Sprites[i].TransformOver()==false)
                {
                    wait|=1;
                }
            }
        }

        if (wait==0)
        {
            for (i=0;i<LongWild.WILD_MAX_REELS;i++)
            {
                if (this.ValidPivot( i )==true )
                {
                    this.WILD_Sprites[i].SPRITE_TRANSFORMER().AnimateAbs(16,this.WILD_Sprites[i].TotFrames-1,(SpriteTransformer.ANIMATION_LOOP|5),70);
                }

            }

            this.WILD_AniACK=LongWild.WILD_ANIMATE_IDLE;
        }
    }
}
//---------------------------------------------------------------------------//
// OVERRIDE
LongWild.prototype.AniStop = function() {

    this.WILD_Pivot.fill(0xFF);

    this.WILD_AniACK=0;
}
//---------------------------------------------------------------------------//
// OVERRIDE
LongWild.prototype.AniClear = function() {

    var i,j,pp,np;

    for (i=0;i<LongWild.WILD_MAX_REELS;i++)
    {
        if (this.ValidPivot( i )==true)
        {
            this.WILD_Sprites[i].StopTransform(); this.WILD_Sprites[i].ResetProperties(false,1.0,1.0);

            pp=this.WILD_Pivot[i];	// reel index

            //this.ApplicationRef.SLOT().REEL(pp).Stop(); this.ApplicationRef.SLOT().REEL(pp).AttualizzaSimbolo();this.ApplicationRef.SLOT().REEL(pp).Visible(true);

            for (j=0;j<window.NUM_SIMBOLI_RUOTA-1;j++)
            {
                np=this.NearPivot(i,j);

                //this.ApplicationRef.SLOT().REEL(np).Stop(); this.ApplicationRef.SLOT().REEL(np).AttualizzaSimbolo();this.ApplicationRef.SLOT().REEL(np).Visible(true);
            }

            this.SetReelVisible(i,true)
        }
    }

    this.AniStop();
}
//---------------------------------------------------------------------------//
LongWild.prototype.AniRefresh = function(ellapsed_time) {
    var i;

    for (i=0;i<LongWild.WILD_MAX_REELS;i++)
    {
        if (this.ValidPivot( i )==true )
        {
            this.WILD_Sprites[i].Refresh(ellapsed_time);
        }
    }

    if (this.WILD_AniACK==LongWild.WILD_ANIMATE_IDLE)
    {
        for (i=0;i<LongWild.WILD_MAX_REELS;i++)
        {
            if (this.ValidPivot( i )==true && this.WILD_Sprites[i].TransformOver()==true)
            {
                this.WILD_Sprites[i].SPRITE_TRANSFORMER().LightLoop(2.0,30,20);
            }
        }
    }
}
//---------------------------------------------------------------------------//
LongWild.prototype.AniRunning = function() {

    if (this.WILD_AniACK!=0)
        return true;

    return false;
}
//---------------------------------------------------------------------------//
LongWild.prototype.IntroRunning = function() {

    var i;

    for (i=0;i<LongWild.WILD_MAX_REELS;i++)
    {
        if (this.ValidPivot( i )==true)
        {
            if (this.WILD_AniACK!=0 && this.WILD_AniACK!=LongWild.WILD_ANIMATE_IDLE)
                return true;
        }
    }

    return false;
}
//---------------------------------------------------------------------------//
LongWild.prototype.ValidPivot = function(pivot_index) {

    if (this.WILD_Pivot[pivot_index]!=0xFF && this.WILD_Pivot[pivot_index]>=window.NUM_RULLI)
    {
        return false;
    }

    if (this.WILD_Pivot[pivot_index]<window.NUM_RULLI)
        return true;

    return false;
}
//---------------------------------------------------------------------------//
LongWild.prototype.IsSymbolOverlapped = function(pos_idx) {

    var i,j;

    for (i=0;i<LongWild.WILD_MAX_REELS;i++)
    {
        if (this.ValidPivot( i )==true )
        {
            if (this.WILD_Pivot[i]==pos_idx)
                return true;

            for (j=0;j<(window.NUM_SIMBOLI_RUOTA-1);j++)
                if (this.NearPivot(i,j)==pos_idx)
                    return true;
        }
    }

    return false;
}
//---------------------------------------------------------------------------//
LongWild.prototype.get_STATO = function() {

    return this.WILD_Stato;
}
//---------------------------------------------------------------------------//
// OVERRIDE
LongWild.prototype.CreateSprites = function() {
    var i;

    this.WILD_Sprites  	= new Array(LongWild.WILD_MAX_REELS);

    for (i=0;i<LongWild.WILD_MAX_REELS;i++)
    {
        this.WILD_Sprites[i]=new TiledSprite("LongWild",45,false,this.Container,'.webp')
    }
}
//---------------------------------------------------------------------------//
LongWild.prototype.SetReelVisible = function(pivot_index, visible) {
    for(let i = this.WILD_Pivot[pivot_index]; i < window.NUM_RULLI; i += window.NUM_REELS) {
        const reel = this.ApplicationRef.SLOT().REEL_HOLDER().GetRullo(i)
        reel.Visible(visible)
    }
}
