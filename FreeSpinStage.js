//--------------------------------------------------------------------------//
FreeSpinStage.TAB_CAPTIONS=
[
    ["CLICK ON THE IMAGE TO CONTINUE","CLICCA SULL'IMMAGINE PER CONTINUARE"],
    ["CONGRATULATIONS!","CONGRATULAZIONI!"],
    ["YOU WON ","HAI VINTO "],
    [" FREESPINS!"," FREESPINS!"],
    ["WITH MAGIC SYMBOL:","CON SIMBOLO MAGICO:"],
    ["MAGIC SYMBOL:","SIMBOLO MAGICO:"],
];


//--------------------------------------------------------------------------//
function FreeSpinStage(app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    FreeSpinPU.call(this,app_reference);

    this.InfoDisplay = null;
    this.MagicDisplay = null;

    this.IntroStep=0;

    this.MagicSymbol=window.ID_DUMMY;
    this.PlayMagicSymbols=0;
    this.SlotCombo_Ref=null;

    this.Congratulations=null;

    this.PoolExplo=[];

    for (var i = 0; i < window.NUM_SIMBOLI_RUOTA; i++) {
        this.PoolExplo.push( new TiledSprite("StarExplosion_", 30 , false, this.Container,'.webp') );
    }


    this.SimboliEstrattiSnapshot=new Array( window.NUM_RULLI );

    this.MagicSymbol_BackSprite= new TiledSprite("FX_Energy", 1 , false, this.ApplicationRef.CONTAINER(),'.webp');
    this.MagicSymbol_Sprite=new TiledSprite("SYMMGC", window.NUM_SIMBOLI , false, this.ApplicationRef.CONTAINER(),'.webp');
}

// Create a FreeSpinStage.prototype object that inherits from FreeSpinPU.prototype.
FreeSpinStage.prototype = Object.create(FreeSpinPU.prototype); // See note below

// Set the "constructor" property to refer to FreeSpinStage
FreeSpinStage.prototype.constructor = FreeSpinStage;

//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
FreeSpinStage.prototype.Init = function() {

    FreeSpinPU.prototype.Init.call(this);

    if (this.InfoDisplay == null)
    {
        this.InfoDisplay=new DisplayStyle(0,0,0,"left",this.ApplicationRef.CONSOLE().CONTAINER(),
/*
                            new PIXI.TextStyle({
                            fontFamily: 'Verdana',
                            fontSize: 36,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#f01000'], // gradient
                            stroke: '#4a1850',
                            strokeThickness: 5,
                            dropShadow: true,
                            dropShadowColor: '#000000',
                            dropShadowBlur: 4,
                            dropShadowAngle: Math.PI / 6,
                            dropShadowDistance: 6
                            })
*/
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 48,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ff0f0f', '#ca0f10'], // gradient
                            stroke: '#980b0c',
                            strokeThickness: 5,
                        })

                      );
    }

    if (this.MagicDisplay == null)
    {
        this.MagicDisplay=new DisplayStyle(0,0,0,"center",this.ApplicationRef.CONSOLE().CONTAINER(),
                            new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 36,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#ffd05e'], // gradient
                            stroke: '#4a1850',
                            strokeThickness: 5,
                            dropShadow: true,
                            dropShadowColor: '#000000',
                            dropShadowBlur: 4,
                            dropShadowAngle: Math.PI / 6,
                            dropShadowDistance: 6
                            })
                      );
    }



    this.InfoDisplay.Init();
    this.InfoDisplay.SetAreaWidth(window.VIDEO_WIDTH);
    this.InfoDisplay.YY(0,-900);
    this.InfoDisplay.XX(0,16);

    this.Congratulations=new FreeSpinCongratulation(this.ApplicationRef);
    this.Congratulations.Init();

    this.SlotCombo_Ref=this.ApplicationRef.SLOT().SLOT_COMBO();

    for (var i = 0; i < this.PoolExplo.length; i++) {
        this.PoolExplo[i].Setup();
    }

    this.MagicSymbol_BackSprite.Setup();
    this.MagicSymbol_Sprite.Setup();

    this.MagicDisplay.Init();
}
//--------------------------------------------------------------------------//
FreeSpinStage.prototype.Reset = function() {

    FreeSpinPU.prototype.Reset.call(this);
    this.PlayMagicSymbols=0;
}
//---------------------------------------------------//
FreeSpinStage.prototype.PlayMusic = function() {

    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.GAME_LOOP);

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.FREESPIN_LOOP,(SoundGenerator.SMP_VOLUME_REDUCE|SoundGenerator.SMP_LOOP), true);
}
//---------------------------------------------------------------------------//
FreeSpinStage.prototype.UpdateTIMES = function(){

    var left;

    if (this.InfoDisplay.IsVisible()==false)
        this.InfoDisplay.Visible(true);

    left=(this.FREESPIN_NumTiri-this.FREESPIN_Tiro);

    this.InfoDisplay.SetCaption ( this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().ON_FREESPIN_MESSAGE()+left );
}
//------------------------------------------------------------//
FreeSpinStage.prototype.Refresh = function(ellapsed_ms){

    var exit=false;
    var i;

    FreeSpinPU.prototype.Refresh.call(this,ellapsed_ms);

    if (this.Congratulations!=null)
        this.Congratulations.Refresh(ellapsed_ms);

    for (i = 0; i < this.PoolExplo.length; i++)
        this.PoolExplo[i].Refresh(ellapsed_ms);

    this.MagicSymbol_BackSprite.Refresh();
    this.MagicSymbol_Sprite.Refresh();
}
//--------------------------------------------------------------------------//
FreeSpinStage.prototype.Over = function() {

    FreeSpinPU.prototype.Over.call(this);

    this.MagicDisplay.Visible(false);

    this.InfoDisplay.Visible(false);

    this.MagicSymbol_BackSprite.StopUnlink();
    this.MagicSymbol_Sprite.StopUnlink();

    this.ApplicationRef.SLOT().REEL_HOLDER().SetMagicSymbol(this.MagicSymbol,false);
}
//---------------------------------------------------------------------------//
FreeSpinStage.prototype.IsAtStart = function() {
    if (this.FREESPIN_Tiro==0)
        return true;
    return false;
}
//---------------------------------------------------------------------------//
FreeSpinStage.prototype.IsIntroOver = function(){

    if (this.IntroStep>=20)
    {
        this.IntroStep=0;
        return true;
    }

    return false;
}
//---------------------------------------------------------------------------//
FreeSpinStage.prototype.IntroInit = function(){

    //this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.WIN_SCATTER,SoundGenerator.SMP_VOLUME_NORMAL);

    this.MagicDisplay.Visible(false);

    this.MagicSymbol_BackSprite.StopUnlink();
    this.MagicSymbol_BackSprite.LinkTo(this.ApplicationRef.CONTAINER());
    this.MagicSymbol_BackSprite.ResetProperties(false,1.0,0.3);
    //this.MagicSymbol_BackSprite.XX(1700,0);
    //this.MagicSymbol_BackSprite.YY(0,0);

    this.MagicSymbol_Sprite.StopUnlink();
    this.MagicSymbol_Sprite.LinkTo(this.ApplicationRef.CONTAINER());
    this.MagicSymbol_Sprite.ResetProperties(false,1.0,0.5);
    this.MagicSymbol_Sprite.XX(1760,0);
    this.MagicSymbol_Sprite.YY(10,0);

    this.MagicSymbol_BackSprite.CenterBoxOnSprite(this.MagicSymbol_Sprite);

    this.GPTimer=this.ArmaTimer(this.GPTimer,(3*1000));

    this.IntroStep=1;
}
//---------------------------------------------------------------------------//
FreeSpinStage.prototype.IntroRun = function(){

    var k;

    switch (this.IntroStep)
    {
        // Idle
        case 0:
        {
        }break;

        case 1:
        {

            for (k=0;k<window.PATTERN_SIMBOLI;k++)
            {
                if (this.SlotReference.SLOT_COMBO().PatternScattered[k]!=0)
                {
                    if (this.SlotReference.REEL(k).GetCompletedLoops()>=1)
                        break;
                }
            }

            //if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying ( SoundGenerator.WIN_SCATTER)==false)
            if (k<window.PATTERN_SIMBOLI || this.GPTimer==0)
            {
                this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.GAME_LOOP);


                //this.Congratulations.Mount("CONGRATULATIONS!","You Won "+this.FREESPIN_NumTiri+" Free Spins!","","Special Expanding Symbol",this.MagicSymbol,this.ApplicationRef.CONTAINER());
                this.Congratulations.Mount(FreeSpinStage.TAB_CAPTIONS[1][window.LANG],                                                                      // CONGRATULATIONS
                                            FreeSpinStage.TAB_CAPTIONS[2][window.LANG]+this.FREESPIN_NumTiri+FreeSpinStage.TAB_CAPTIONS[3][window.LANG],    // You Won x Freespins!
                                           "",
                                           FreeSpinStage.TAB_CAPTIONS[4][window.LANG],                                                                      // Simbolo Magico
                                           this.MagicSymbol,this.ApplicationRef.CONTAINER());




                this.StampaTeatro(true);

                //this.PlayMusic();

                this.IntroStep=2;
            }
        }break;

        case 2:
        {
            if (this.Congratulations.IsMounted()==false)
            {
                this.MagicSymbol_BackSprite.StopUnlink();
                this.MagicSymbol_BackSprite.Visible(true);
                this.MagicSymbol_BackSprite.LinkTo(this.ApplicationRef.CONTAINER());
                this.MagicSymbol_BackSprite.SPRITE_TRANSFORMER().ScaleLoop(0.3,0.5,10,10,SpriteTransformer.MASK_BACK_TO_ORG);



                this.MagicSymbol_Sprite.StopUnlink();
                this.MagicSymbol_Sprite.Visible(true);


                k=(this.MagicSymbol-window.ID_SIMBOLO_0);

                //k+=window.NUM_SIMBOLI;

                this.MagicSymbol_Sprite.SetFrame ( k );

                this.MagicSymbol_Sprite.LinkTo(this.ApplicationRef.CONTAINER());

                this.MagicSymbol_Sprite.SPRITE_TRANSFORMER().LightLoop(2.0,50,30);


                this.MagicDisplay.Visible(true);
                this.MagicDisplay.SetCaption(FreeSpinStage.TAB_CAPTIONS[5][window.LANG]);
                this.MagicDisplay.XX(0,1330);
                this.MagicDisplay.YY(0,-890);


                this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.MAGIC_INTRO);

                this.ApplicationRef.SLOT().REEL_HOLDER().SetMagicSymbol(this.MagicSymbol,true);

                this.PlayMusic();

                this.IntroStep=20;
            }
        }break;

        case 20:
        {
        }break;

        default:break;
    }

}
//---------------------------------------------------------------------------//
FreeSpinStage.prototype.SpinOver = function(win){

    var started=this.IsStarted();

    FreeSpinPU.prototype.SpinOver.call(this);
/*
    if (started==true)
    {
        FREESPIN_Sprites_Tiri[0].StopTransform();
        FREESPIN_Sprites_Tiri[1].StopTransform();

        FREESPIN_Sprites_Tiri[0].alpha=1.0;
        FREESPIN_Sprites_Tiri[1].alpha=1.0;
    }
*/
}
//------------------------------------------------------------//
FreeSpinStage.prototype.SimboliMagici_Init = function(){

    this.CurReelTransform=0;
    this.PlayMagicSymbols=1;
}
//------------------------------------------------------------//
FreeSpinStage.prototype.SimboliMagici_Play = function(){

    var running=true;
    var reel_transform=false;
    var i,k,idx;

    if (this.PlayMagicSymbols==0)
        return false;

    if (this.MagicSymbol==Slot.ID_SIMBOLO_SUPER)
        return false;

    switch(this.PlayMagicSymbols)
    {
        case 1:
        {
            this.SlotCombo_Ref.ResetWinPattern();

            // Crea una copia dei simboli prima che siano sovrascritti
            for (i=0;i<this.SimboliEstrattiSnapshot.length;i++)
                this.SimboliEstrattiSnapshot[i]=this.SlotCombo_Ref.SimboliEstratti[i];

            //console.log(this.SimboliEstrattiSnapshot[0]+" "+this.SimboliEstrattiSnapshot[1]+" "+this.SimboliEstrattiSnapshot[2]+" "+this.SimboliEstrattiSnapshot[3]+" "+this.SimboliEstrattiSnapshot[4]);
            //console.log(this.SimboliEstrattiSnapshot[5]+" "+this.SimboliEstrattiSnapshot[6]+" "+this.SimboliEstrattiSnapshot[7]+" "+this.SimboliEstrattiSnapshot[8]+" "+this.SimboliEstrattiSnapshot[//4]);
            //console.log(this.SimboliEstrattiSnapshot[10]+" "+this.SimboliEstrattiSnapshot[11]+" "+this.SimboliEstrattiSnapshot[12]+" "+this.SimboliEstrattiSnapshot[13]+" "+this.SimboliEstrattiSnapshot[14]);

            this.ApplicationRef.SLOT().REEL_HOLDER().TerminaAnimazioneVincita();

            // Richiede al server la seconda fase dei rulli con il simbolo magico propagato
            this.ApplicationRef.GAMEPROXY().NOTIFY_PLAY_FREESPIN(BonusDescriptor.ID_BONUS_FREESPIN,BonusDescriptor.BS_ACTION_FREESPIN_PICK);

            this.PlayMagicSymbols=2;
        }break;

        case 2:
        {
            if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
            {
                for (i=0;i<this.SlotCombo_Ref.DirettriciVincenti.length;i++)
                {
                    if (this.SlotCombo_Ref.DirettriciVincenti[i]!=0)
                    {
                        if (this.SlotCombo_Ref.GetSimboloCombinazione(this.SlotCombo_Ref.DirettriciVincenti[i])==this.MagicSymbol)
                            break;
                    }
                }

                if (i>=this.SlotCombo_Ref.DirettriciVincenti.length)
                {
                    running=false;
                }
                else
                {
                    //this.ApplicationRef.SLOT().REEL_HOLDER().TerminaAnimazioneVincita();

                    reel_transform=false;

                    for (i=this.CurReelTransform;i<window.NUM_REELS;i++)
                    {
                        if (this.SlotCombo_Ref.GetOccorrenzaSimboloInRullo(this.MagicSymbol,i)!=0)
                        {
                            this.SlotCombo_Ref.GetVettoreIndiciRullo(i);

                            for (k=0;k<window.NUM_SIMBOLI_RUOTA;k++)
                            {
                                idx=this.SlotCombo_Ref.VettoreIndiciRullo[k];

                                if (this.SimboliEstrattiSnapshot[idx]!=this.MagicSymbol)
                                {
                                    reel_ref=this.ApplicationRef.SLOT().REEL(idx);

                                    //reel_ref.AnimationContainer_Setup();

                                    this.PoolExplo[k].ResetProperties(true,1.0,1.0);
                                    this.PoolExplo[k].SetFrame(0);
                                    this.PoolExplo[k].XX(0,0);
                                    this.PoolExplo[k].YY(0,0);

                                    this.PoolExplo[k].StopUnlink();
                                    this.PoolExplo[k].LinkTo(reel_ref.CONTAINER());

                                    this.PoolExplo[k].SPRITE_TRANSFORMER().AnimateAbs(0,(this.PoolExplo[k].TotFrames-1),SpriteTransformer.ANIMATION_NONE,20);

                                    this.PoolExplo[k].SPRITE_TRANSFORMER().ScaleAbs(1.5,1.5,5,20,0);

                                    reel_transform=true;
                                }
                            }

                            if (reel_transform==true)
                            {
                                //this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano ( SoundGenerator.WILD_EXPAND );

                                this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.MAGIC_SYMBOL , SoundGenerator.SMP_VOLUME_NORMAL);

                                break;
                            }
                        }
                    }

                    this.CurReelTransform=i;

                    this.TurnOffNormalSymbols();

                    //Application.SOUNDGENERATOR().PlayBrano(SoundGenerator.WIN_EXPLOSION_2,SoundGenerator.SMP_VOLUME_NORMAL);

                    this.PlayMagicSymbols=3;
                }
            }
        }break;

        case 3:
        {
            running=false;
            k=0;

            for (i=0;i<this.PoolExplo.length;i++)
            {
                if (this.PoolExplo[i].TransformOver()==false)
                {
                    if (this.PoolExplo[i].CurFrame==15)
                    {
                        k=this.CurReelTransform+(i*window.NUM_REELS);

                        reel_ref=this.ApplicationRef.SLOT().REEL(k);

                        reel_ref.SetSymbol(this.MagicSymbol);

                        reel_ref.SymbolOff();

                        reel_ref.SymbolOn();

                        reel_ref.Stop();

                        reel_ref.Paint();

                        if (k==0)
                        {
                            this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano ( SoundGenerator.MAGIC_SYMBOL );

                            //this.ApplicationRef.SOUNDGENERATOR().PlayBrano ( SoundGenerator.WILD_EXPAND, SoundGenerator.SMP_VOLUME_NORMAL);
                            k=1;
                        }
                    }

                    running=true;
                }
            }


            if (running==false)
            {
                for (i=0;i<this.PoolExplo.length;i++)
                {
                    this.PoolExplo[i].StopUnlink();

                    //this.PoolExplo[i].StopTransform();

                    //if (this.ApplicationRef.CONTAINER().children.indexOf(this.PoolExplo[i])!=-1)
                        //this.ApplicationRef.CONTAINER().removeChild(this.PoolExplo[i]);
                }

                this.CurReelTransform++;

                if (this.CurReelTransform<=(window.NUM_REELS-1))
                {
                    this.PlayMagicSymbols=2;
                    running=true;
                }
            }



        }break;

        default:{running=false;}break;
    };

    return running;
}
//------------------------------------------------------------//
FreeSpinStage.prototype.TurnOffNormalSymbols = function() {

    var i;

    for (i=0;i<window.NUM_RULLI;i++)
    {
        if (this.SlotCombo_Ref.SimboliEstratti[i]!=this.MagicSymbol)
        {
            this.ApplicationRef.SLOT().REEL(i).TurnOff();
        }
    }
}
//------------------------------------------------------------//
FreeSpinStage.prototype.IsMagicSymbol = function(sym_id) {

    return (this.MagicSymbol==sym_id);
}
//------------------------------------------------------------//
// OVERRIDE
FreeSpinStage.prototype.Parse_FREESPIN_ACTIVATE = function(nfs,magic_sym) {

    FreeSpinPU.prototype.Parse_FREESPIN_ACTIVATE.call(this,nfs);

    this.MagicSymbol=magic_sym;
}
//------------------------------------------------------------//
// OVERRIDE
FreeSpinStage.prototype.Parse_FREESPIN_STATUS = function(chunk_to_parse) {

    this.ParseServer_Init(chunk_to_parse);

    this.FREESPIN_Tiro				=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_TIRO);
    this.FREESPIN_NumTiri			=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_TIRI);
    this.FREESPIN_Multiplier        =this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_MULTY);
    this.MagicSymbol                =this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_MAGIC);
    this.FREESPIN_VideoInfo_TotalWin=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_WIN);

    if (this.FREESPIN_Tiro<this.FREESPIN_NumTiri)
    {
        if (this.FREESPIN_Status_Req==FreeSpinPU.FREESPIN_STAT_IDLE)
            this.FREESPIN_Status_Req=FreeSpinPU.FREESPIN_STAT_ARMED;
    }

    if (this.IsRunning()==true)
        this.UpdateTIMES();

    return true;
}
//--------------------------------------------------------------------------//
