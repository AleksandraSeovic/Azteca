

//------------------------------------------------------------//
BonusStage01Prize.BARREL_WW=252;
BonusStage01Prize.BARREL_HH=252;

BonusStage01Prize.BARREL_DSH=340;
//------------------------------------------------------------//
//BonusStage01Prize.BARRELS_ROW_0=667;
//BonusStage01Prize.BARRELS_ROW_1=(BARRELS_ROW_0-(1*BARREL_HH));
BonusStage01Prize.BARRELS_ROW_2=527+70;
BonusStage01Prize.BARRELS_ROW_3=254+70;
BonusStage01Prize.BARRELS_ROW_4=0+70;
BonusStage01Prize.BARRELS_ROW_5=-680;

//------------------------------------------------------------//
//BonusStage01Prize.BARRELS_COL_0=190;
//BonusStage01Prize.BARRELS_COL_1=265;
BonusStage01Prize.BARRELS_COL_2=310;
BonusStage01Prize.BARRELS_COL_3=458;
BonusStage01Prize.BARRELS_COL_4=598;
BonusStage01Prize.BARRELS_COL_5=800;

//------------------------------------------------------------//
BonusStage01Prize.TAB_BARRELS_COORDS_XX=
[
BonusStage01Prize.BARRELS_COL_2,BonusStage01Prize.BARRELS_COL_2+(1*BonusStage01Prize.BARREL_DSH),BonusStage01Prize.BARRELS_COL_2+(2*BonusStage01Prize.BARREL_DSH),BonusStage01Prize.BARRELS_COL_2+(3*BonusStage01Prize.BARREL_DSH),
                BonusStage01Prize.BARRELS_COL_3,BonusStage01Prize.BARRELS_COL_3+(1*BonusStage01Prize.BARREL_DSH),BonusStage01Prize.BARRELS_COL_3+(2*BonusStage01Prize.BARREL_DSH),
                                            BonusStage01Prize.BARRELS_COL_4,BonusStage01Prize.BARRELS_COL_4+(1*BonusStage01Prize.BARREL_DSH),
                                                                            BonusStage01Prize.BARRELS_COL_5
];

BonusStage01Prize.TAB_BARRELS_COORDS_YY=
[
    BonusStage01Prize.BARRELS_ROW_2,BonusStage01Prize.BARRELS_ROW_2,BonusStage01Prize.BARRELS_ROW_2,BonusStage01Prize.BARRELS_ROW_2,
                BonusStage01Prize.BARRELS_ROW_3,BonusStage01Prize.BARRELS_ROW_3,BonusStage01Prize.BARRELS_ROW_3,
                    BonusStage01Prize.BARRELS_ROW_4,BonusStage01Prize.BARRELS_ROW_4,
                                BonusStage01Prize.BARRELS_ROW_5
];
//Osiel: Using only one bonus prize top------------------------------------------------------
/*BonusStage01Prize.TAB_BARRELS_SPRITES=
[
    "BN01_TopA","BN01_TopA","BN01_TopA","BN01_TopA",
        "BN01_TopB","BN01_TopB","BN01_TopB",
            "BN01_TopC","BN01_TopC",
                    "BN01_TopJ"
];*/

BonusStage01Prize.TAB_BARRELS_SPRITES=
  [
      "BN01_TopA","BN01_TopA","BN01_TopA","BN01_TopA",
      "BN01_TopA","BN01_TopA","BN01_TopA",
      "BN01_TopA","BN01_TopA",
      "BN01_TopJ"
  ];


/*BonusStage01Prize.TAB_BARRELS_FRAMES=
[
    15,15,15,15,
    15,15,15,
    15,15,
    20
];*/

BonusStage01Prize.TAB_BARRELS_FRAMES=
  [
      23,23,23,23,
      23,23,23,
      23,23,
      50
  ];

//----------------------------------------------------------------------------------------

//--------------------------------------------------------------------------//
function BonusStage01Prize(id,app_reference,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    BonusStagePrize.call(this,id,app_reference,parent_container);

    this.Prize = new DisplayStyle(0,0,0,"center",this.Container,
                                    new PIXI.TextStyle({
                                    fontFamily: 'Game_Font',
                                    fontSize: 64,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    strokeThickness: 2,
                                    fill: 'white'
                                    })
                              );


    this.Back=new TiledSprite("BN01_Prize",8,true,this.Container,'.webp');

    //?JP
    if (this.ID==(BonusStage01Prize.TAB_BARRELS_SPRITES.length-1))
        this.Res=new TiledSprite("JP_FX00",20,false,this.Container,'.webp');
    else
        this.Res=null;//new TiledSprite("BN01_PrizeFrame",1,true,this.Container);

    this.Top=new TiledSprite(BonusStage01Prize.TAB_BARRELS_SPRITES[this.ID],BonusStage01Prize.TAB_BARRELS_FRAMES[this.ID],true,this.Container,'.webp');
}

// Create a BonusStage01Prize.prototype object that inherits from BonusStagePrize.prototype.
BonusStage01Prize.prototype = Object.create(BonusStagePrize.prototype); // See note below

// Set the "constructor" property to refer to BonusStage01Prize
BonusStage01Prize.prototype.constructor = BonusStage01Prize;

//--------------------------------------------------------------------------//
BonusStage01Prize.prototype.Init = function() {

    BonusStagePrize.prototype.Init.call(this);

    this.Prize.SetAreaWidth(BonusStage01Prize.BARREL_WW);
}
//------------------------------------------------------------//
BonusStage01Prize.prototype.Mount = function() {

    BonusStagePrize.prototype.Mount.call(this);

    // Se non è il JP ,abilita
    if (this.ID!=(BonusStage01Prize.TAB_BARRELS_SPRITES.length-1))
        this.Top.SetButton(true);
    else
    {
        this.Top.SetButton(false);
        //this.Top.SPRITE_TRANSFORMER().AnimateAbs(0,6,SpriteTransformer.ANIMATION_LOOP,100);
    }
}
//------------------------------------------------------------//
BonusStage01Prize.prototype.UnMount = function() {

    BonusStagePrize.prototype.UnMount.call(this);

}
//------------------------------------------------------------//
BonusStage01Prize.prototype.SetupPrize = function() {

    BonusStagePrize.prototype.SetupPrize.call(this);

    if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_PRIZE)
    {
        this.Prize.SetCaption(this.PRIZE);

        //this.Prize.Visible(true);
    }

    if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_DEATH)
        this.Back.SetFrame(0);
    else if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_LEVELUP)
        this.Back.SetFrame(1);
    else if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_PRIZE)
        this.Back.SetFrame(2);
    else if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_JP)
        this.Back.SetFrame((2+this.PRIZE));

    //this.Back.CenterBox(BonusStage01Prize.BARREL_WW,BonusStage01Prize.BARREL_HH,true);
    this.Back.CenterBox(this.Top.ACTUAL_W(),this.Top.ACTUAL_H(),true); this.Back.Sprite.y+=0;
    this.Prize.CenterBox(this.Top.ACTUAL_W(),this.Top.ACTUAL_H(),true);
}
//------------------------------------------------------------//
BonusStage01Prize.prototype.Open = function(real_prize) {

    BonusStagePrize.prototype.Open.call(this,real_prize);

    this.Relink();

    this.Top.SetMaskFilter(TiledSprite.MASK_STAT_NONE);

    this.Step=1;
}
//------------------------------------------------------------//
BonusStage01Prize.prototype.PlayAction = function() {

    BonusStagePrize.prototype.PlayAction.call(this);

    switch (this.Step)
    {
        // idle
        case 0:
        {
        } break;

        // Opening #1
        case 1:
        {
            if (this.ID!=(BonusStage01Prize.TAB_BARRELS_SPRITES.length-1))
            {
                this.Top.SPRITE_TRANSFORMER().AnimateAbs(0,(this.Top.TotFrames-1),SpriteTransformer.ANIMATION_NONE,50);

                this.Top.SPRITE_TRANSFORMER().ScaleAbs(1.3,1.3,(this.Top.TotFrames-1),SpriteTransformer.ANIMATION_NONE,50);

                this.Back.Visible(true);

                if (this.REAL_PRIZE==false)
                {
                    this.Back.SetMaskFilter(TiledSprite.MASK_STAT_GRAY);
                }
                else
                {
                    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BONUS_PRIZE_OPEN,SoundGenerator.SMP_VOLUME_NORMAL);
                }

                // Cornice
                //this.Res.Visible(true); this.Res.SPRITE_TRANSFORMER().FadeLoop(0.5,10,10);

                this.Step=3;
            }
            // JP
            else
            {
                //this.Res.Visible(true);

                //this.Res.SPRITE_TRANSFORMER().AnimateAbs(0,(this.Top.TotFrames-1),SpriteTransformer.ANIMATION_NONE,50);

                this.Top.SPRITE_TRANSFORMER().MoveRel(0,1000,30,10);

                this.Step=2;
            }


        } break;

        // Opening #JP
        case 2:
        {
            if (this.Top.TransformOver()==true)
            {
                // Effect
                this.Res.ResetProperties(true,1.0,2.0);

                this.Res.CenterBoxOnSprite(this.Top);

                this.Res.SPRITE_TRANSFORMER().AnimateAbs(0,(this.Res.TotFrames-1),SpriteTransformer.ANIMATION_NONE,150);

                // Symbol
                this.Top.SPRITE_TRANSFORMER().AnimateAbs(0,(this.Top.TotFrames-1),SpriteTransformer.ANIMATION_NONE,150);

                this.Top.SPRITE_TRANSFORMER().FadeAbs(0.0,parseInt( ((this.Top.TotFrames-1)/2) ),150);

                // Premio
                this.Back.ResetProperties(true,0.0,1.0);

                this.Back.CenterBoxOnSprite(this.Top);

                this.Back.SPRITE_TRANSFORMER().FadeAbs(1.0,(this.Top.TotFrames-1),100);

                this.Step=3;

            }
        } break;

        // Opening #2
        case 3:
        {
            if (this.Top.TransformOver()==true)
            {
                this.Opened();

                this.Step=4;
            }
        } break;

        // Opening #4 : Attende che tutto sia finito
        case 4:
        {
            if (this.Back.TransformOver()==true)
            {
                // Ferma la cornice
                if (this.Res!=null)
                {
                    this.Res.StopTransform(); this.Res.Visible(false);
                }

                if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_JP)
                {
                    this.Back.SPRITE_TRANSFORMER().ScaleAndGoto(1.2,0.1,10,10);
                    this.Step=5;
                }
                else
                {
                    this.STATO=BonusStagePrize.STATE_OPENED;
                    this.Step=0;
                }
            }
        } break;

        // Opening #5 : Attende che tutto sia finito
        case 5:
        {
            if (this.Back.TransformOver()==true)
            {
                this.Back.SPRITE_TRANSFORMER().MoveRel(0,500,20,10);
                this.Back.SPRITE_TRANSFORMER().FadeAbs(0.0,20,10);
                this.Step=6;
            }
        } break;

        // Opening #5 : Attende che tutto sia finito
        case 6:
        {
            if (this.Back.TransformOver()==true)
            {
                this.Step=0;
            }
        } break;


        default:break;
    };
}
//---------------------------------------------------//
BonusStage01Prize.prototype.Opened = function() {

    this.Top.Visible(false);

    this.Back.ResetProperties(true,1.0,1.0);

    this.Back.CenterBoxOnSprite(this.Top);

    if (this.TYPE!=BonusDescriptor.BONUS_PICK_OBJ_JP)
    {
        if (this.REAL_PRIZE==true)
        {
            if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_DEATH)
            {
                this.Back.SPRITE_TRANSFORMER().ScaleAndBack(1.3,3,10,SpriteTransformer.MASK_BACK_TO_ORG);

                this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BONUS_PRIZE_BAD,SoundGenerator.SMP_VOLUME_NORMAL);
            }
            else if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_LEVELUP)
            {
                this.Back.SPRITE_TRANSFORMER().ScaleAndBack(1.3,3,10,SpriteTransformer.MASK_BACK_TO_ORG);

                this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BONUS_PRIZE_GOOD,SoundGenerator.SMP_VOLUME_NORMAL);
            }
            else if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_PRIZE)
            {
                this.Back.SPRITE_TRANSFORMER().LightAndBack(7.0,10,10);

                this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BONUS_PRIZE_GOOD,SoundGenerator.SMP_VOLUME_NORMAL);
            }
        }

        if (this.TYPE==BonusDescriptor.BONUS_PICK_OBJ_PRIZE)
        {
            this.Prize.Visible(true);
        }
    }
    // JP
    else
    {
        this.Back.SPRITE_TRANSFORMER().ScaleAndBack(1.5,10,10,SpriteTransformer.MASK_BACK_TO_ORG);
        setTimeout(() => {
            this.ApplicationRef.SLOT().BONUSSTAGE().RunningBonus.UpdatePremioDisplay()
        }, 100)
    }

    this.STATO=BonusStagePrize.STATE_OPENED;
}
//---------------------------------------------------//
BonusStage01Prize.prototype.Reset = function() {

    BonusStagePrize.prototype.Reset.call(this);

    this.Container.x=BonusStage01Prize.TAB_BARRELS_COORDS_XX[this.ID];
    this.Container.y=BonusStage01Prize.TAB_BARRELS_COORDS_YY[this.ID];
    this.Container.alpha=1.0;

    // Sprite
    if (this.Back!=null)
    {
        this.Back.XX(0,0);
        this.Back.YY(0,0);
        this.Back.ResetProperties(false,1.0,1.0);
        this.Back.SetFrame(0);
    }

    // Sprite
    if (this.Res!=null)
    {
        this.Res.XX(0,0);
        this.Res.YY(0,0);
        this.Res.ResetProperties(false,1.0,1.0);
        this.Res.SetFrame(0);
        this.Res.SPRITE_TRANSFORMER().ScaleAbs(2.0,2.0,1,0,0);
    }

    // Display
    this.Prize.XX(0,0); this.Prize.YY(0,0);
    this.Prize.ResetProperties(false,1.0,1.0);

    // TOP Sprite
    this.Top.XX(0,0);
    this.Top.YY(0,0);
    this.Top.ResetProperties(true,1.0,1.0);

    // JP?
    if (this.ID==(BonusStage01Prize.TAB_BARRELS_SPRITES.length-1))
    {
        this.Top.SPRITE_TRANSFORMER().ScaleAbs(2.5,2.5,1,0,0);
    }
    // PRIZE
    else
    {
        this.Top.XX(0,0);
        this.Top.YY(0,0);

        this.Top.SCALE_X(0.6);
        this.Top.SCALE_Y(0.6);
    }

    this.Top.SetFrame(0);
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStage01Prize.prototype.Refresh = function(ellapsed_ms) {

    BonusStagePrize.prototype.Refresh.call(this,ellapsed_ms);

    if (this.Top.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
    {
        this.OnMouseClick();
    }

    if (this.Top.CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
    {
        this.OnMouseOver();
    }

    if (this.Top.CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
    {
        this.OnMouseOut();
    }
}
//------------------------------------------------------------//
BonusStage01Prize.prototype.OnMouseClick = function() {

    if (BonusStagePrize_GLOBAL_ENABLE==true)
    {
        if (this.STATO==BonusStagePrize.STATE_ENABLED)
        {
            this.STATO=BonusStagePrize.STATE_CLICKED;

            this.Top.SPRITE_TRANSFORMER().LightAndBack(5.0,3,10);
        }
    }
}
//------------------------------------------------------------//
BonusStage01Prize.prototype.OnMouseOver = function() {

    if (BonusStagePrize_GLOBAL_ENABLE==true)
    {
        if (this.STATO==BonusStagePrize.STATE_ENABLED)
        {
            this.Top.SetMaskFilter(TiledSprite.MASK_STAT_RED);
        }
    }

}
//------------------------------------------------------------//
BonusStage01Prize.prototype.OnMouseOut = function() {

    if (BonusStagePrize_GLOBAL_ENABLE==true)
    {
        if (this.STATO==BonusStagePrize.STATE_ENABLED)
        {
            this.Top.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
        }
    }
}
//------------------------------------------------------------//

//------------------------------------------------------------//



