//------------------------------------------------------------//
BonusStagePU.BONUS_TYPE_MULTI	=1;
BonusStagePU.BONUS_TYPE_SINGLE  =2;

//------------------------------------------------------------//
BonusStagePU.BONUS_STEP_SET_EXIT=10;
BonusStagePU.BONUS_STEP_EXIT	=11;
//--------------------------------------------------------------------------//
BonusStagePU.TAB_CAPTIONS=
[
    ["CLICK ON THE IMAGE TO CONTINUE","CLICCA SULL'IMMAGINE PER CONTINUARE"],
    ["YOU WON ","HAI VINTO "]
];

//--------------------------------------------------------------------------//
function BonusStagePU(app_reference) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = null;
    this.SlotReference  = null;
    this.Container=new PIXI.Container();

    this.ID_BONUS=0;
    this.TYPE_BONUS=0;
    this.STEP=0;
    this.NUM_SENSITIVE_AREAS=0;
    this.NUM_PICKS=0;
    this.ID_PICK=0;
    this.PUNTI_ASSEGNATI=0;
    this.BigWin_Enabled=true;
    this.Bersagli=null;

    this.ID_TIMER_PAUSA=0;
}

// Create a BonusStagePU.prototype object that inherits from SObject.prototype.
BonusStagePU.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to BonusStagePU
BonusStagePU.prototype.constructor = BonusStagePU;
//--------------------------------------------------------------------------//
BonusStagePU.prototype.Init = function() {

    this.SlotReference  = this.ApplicationRef.SLOT();

    this.MainStage=this.SlotReference.CONTAINER();

    if (this.Bersagli!=null)
    {
        for (var i=0;i<this.Bersagli.length;i++)
            this.Bersagli[i].Init();
    }
    this.STEP=0;
}
//------------------------------------------------------------//
BonusStagePU.prototype.Ready = function() {

    for (var i=0;i<this.Bersagli.length;i++)
    {
        this.Bersagli[i].Reset();
    }

    this.STEP=0;
    this.PUNTI_ASSEGNATI=0;
}
//------------------------------------------------------------//
BonusStagePU.prototype.WaitForPlayer = function() {

    var i,j;

    for (i=0;i<this.Bersagli.length;i++)
    {
        if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_CLICKED)
        {
            this.ID_PICK=i;

            return false;
        }
    }

    return true;
}
//------------------------------------------------------------//
BonusStagePU.prototype.FixPremio = function() {

    var PREMIO;

    if (this.ID_PICK!=0xFF)
    {
        PREMIO=this.Bersagli[this.ID_PICK].get_PRIZE();

        this.ApplicationRef.SLOT().IncVincitaVideo(PREMIO);

        //this.PUNTI_ASSEGNATI+=PREMIO;
    }

    this.ApplicationRef.CONSOLE().UpdateDisplayQueue();
}
//------------------------------------------------------------//
BonusStagePU.prototype.Mount = function() {

    //this.ApplicationRef.SLOT().STAGE().SetType(SlotStage.TEATRO_BONUS);

    this.ApplicationRef.SLOT().LINER().Visible(false);

    this.ApplicationRef.SLOT().REEL_HOLDER().Visible(false);

    this.PlayMusic();

    // Link the bonus stage to the main container
    this.MainStage.addChild(this.Container);
}
//------------------------------------------------------------//
BonusStagePU.prototype.Unmount = function() {

    this.ApplicationRef.SLOT().REEL_STAGE().SetType(SlotStage.TEATRO_NORMAL);

    this.ApplicationRef.SLOT().LINER().Visible(true);

    this.ApplicationRef.SLOT().REEL_HOLDER().Visible(true);

    //this.ApplicationRef.SOUNDGENERATOR().Stop();

    this.MainStage.removeChild(this.Container);
}
//------------------------------------------------------------//
BonusStagePU.prototype.Run = function() {

    var i;
    var running=true;

    switch (this.STEP)
    {
        case 0:
        {
            this.InitIntro();

            this.STEP++;
        } break;

        case 1:
        {
            if (this.PlayIntro()==false)
            {
                this.EndIntro();

                BonusStagePrize_GLOBAL_ENABLE=true;

                this.STEP++;
            }
        } break;

        case 2:
        {
            if (this.WaitForPlayer()==false)
            {
                // Disabilita gli altri bersagli
                this.OnPlayerSelect();

                // Invia la comunicazione al server (tipicamente l'id del bersaglio scelto)
                this.ApplicationRef.GAMEPROXY().NOTIFY_PLAY_BONUS( this.ID_BONUS ,BonusDescriptor.BS_ACTION_BONUS_PICK , this.ID_PICK);
                this.STEP++;
            }
        }break;

        case 3:
        {
            if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
            {
                // Passa ad attendere che arrivi il Bonus Status dal server
                this.STEP++;
            }
        }break;


        // Atende che arrivi il BONUS STATUS che apre
        case 4:
        {
            if (this.ID_PICK==0xFF)
            {
                if (this.Bersagli[0].get_STATO()==BonusStagePrize.STATE_OPENING)
                    this.STEP++;
            }
            else
            {
                if (this.Bersagli[this.ID_PICK].get_STATO()==BonusStagePrize.STATE_OPENING)
                    this.STEP++;
            }

        }break;


        case 5:
        {
            if (this.ID_PICK==0xFF)
            {
                for (i=0,running=false;i<this.Bersagli.length;i++)
                {
                    this.Bersagli[i].PlayAction();

                    if (this.Bersagli[i].get_STATO()!=BonusStagePrize.STATE_OPENED)
                    {
                        running=true;
                    }
                }
            }
            else
            {
                this.Bersagli[this.ID_PICK].PlayAction();

                if (this.Bersagli[this.ID_PICK].get_STATO()==BonusStagePrize.STATE_OPENED)
                {
                    running=false;
                }
            }


            if (running==false)
            {
                // Scongela i display
                /*this.FixPremio();
                this.ApplicationRef.CONSOLE().SetFreezeCounters(false);*/

                if (this.Over_CHECK()==true)
                {
                    //this.ID_TIMER_PAUSA=this.ArmaTimer(this.ID_TIMER_PAUSA,1500);
                    this.ID_TIMER_PAUSA=0;

                    // if the last item opened was prize, and if all items were opened... patch to update
                    // the console info with the amount not including the multiplier
                    if(this.Bersagli[this.ID_PICK].get_TYPE() == BonusDescriptor.BONUS_PICK_OBJ_PRIZE)
                    {
                        const msgParts = this.ApplicationRef.CONSOLE().Info.StaticInfo_Queue.trim().split(" ")
                        let msg = msgParts[0]
                        for (let i = 1; i < msgParts.length; ++i) {
                            if(i == msgParts.length - 3) {
                                let coins = parseInt(msgParts[i])
                                coins = coins / this.JP_MULTY
                                msg = msg + " " + coins
                            } else if (i == msgParts.length - 1) {
                                const moneyStr = msgParts[i]
                                let money = moneyStr.replace(",", ".")
                                money = money.slice(0, -1)
                                money = parseFloat(money) / this.JP_MULTY
                                money = money.toString().replace(".", ",") + moneyStr[moneyStr.length-1]
                                msg = msg + " " + money
                            } else {
                                msg = msg + " " + msgParts[i]
                            }
                        }

                        this.ApplicationRef.CONSOLE().SetStaticDisplay(msg, false)
                    }
                }
                else
                {
                    this.ID_TIMER_PAUSA=0;
                    this.FixPremio();
                    this.ApplicationRef.CONSOLE().SetFreezeCounters(false);
                }

                this.STEP++;
            }
        }break;

        case 6:
        {
            if (this.ID_TIMER_PAUSA==0)
            {
                this.OnOpenComplete();
                this.STEP=7;
            }
        }break;

        case 7:
        {
            if (this.OnSetReady()==true)
            {
                // Bonus terminato?
                if (this.Exit_ACK()==true)
                {
                    if (this.BigWin_Enabled==true /* && this.PUNTI_ASSEGNATI!=0*/)
                    {
                        this.ID_TIMER_PAUSA=this.ArmaTimer(this.ID_TIMER_PAUSA,1500);
                        /*this.SlotReference.CONGRATULATIONS().Mount("WinUp",1,50,-20,                                                                               // ANIMATION RES,FRAMES,TIME
                                                                    BonusStagePU.TAB_CAPTIONS[1][window.LANG]+this.PUNTI_ASSEGNATI.toString(),560,                  // WIN
                                                                    BonusStagePU.TAB_CAPTIONS[0][window.LANG],680,                                                  // FOOTER
                                                                    this.ApplicationRef.CONTAINER());

                        this.OnBigWinMount();*/

                        this.STEP=8;
                    }
                    else
                        this.STEP=8;
                }
                else
                    this.STEP=2;
            }
        }break;

        case 8:
        {
            if(this.ID_TIMER_PAUSA == 0) {
                this.SlotReference.CONGRATULATIONS().Mount("WinUp",1,50,-20,                                        // ANIMATION RES,FRAMES,TIME
                    BonusStagePU.TAB_CAPTIONS[1][window.LANG]+this.PUNTI_ASSEGNATI.toString(),560,                  // WIN
                    BonusStagePU.TAB_CAPTIONS[0][window.LANG],680,                                                  // FOOTER
                    this.ApplicationRef.CONTAINER(),'.webp');

                this.OnBigWinMount();
                this.STEP = 9;
            }
        } break;

        case 9:
        {
            //?????????????????
            //if (Application.SPRITE_TRANSFORMER().IsAny(SpriteTransformer.MASK_FADING )==false)
            //{
            if (this.SlotReference.CONGRATULATIONS().IsMounted()==false)
            {
                for (i=0;i<this.Bersagli.length;i++)
                {
                    this.Bersagli[i].Stop();

                    this.Bersagli[i].UnMount();
                }

                this.OnSetExit();

                this.STEP=BonusStagePU.BONUS_STEP_SET_EXIT;
            }
        }break;

        case BonusStagePU.BONUS_STEP_SET_EXIT:
        {
            this.STEP=BonusStagePU.BONUS_STEP_EXIT;
        }break;

        case BonusStagePU.BONUS_STEP_EXIT:
        {
        }break;

        default:break;
    };
}
//---------------------------------------------------//
BonusStagePU.prototype.UpdatePremioDisplay = function() {
    this.FixPremio();
    this.ApplicationRef.CONSOLE().SetFreezeCounters(false);
}
//---------------------------------------------------//
BonusStagePU.prototype.IsOver = function() {

    if (this.STEP==BonusStagePU.BONUS_STEP_EXIT)
        return true;

    return false;
}
//---------------------------------------------------//
BonusStagePU.prototype.PlayMusic = function() {
}
//------------------------------------------------------------//
BonusStagePU.prototype.InitIntro = function() {
}
//------------------------------------------------------------//
BonusStagePU.prototype.PlayIntro = function() {

    return false;
}
//------------------------------------------------------------//
BonusStagePU.prototype.EndIntro = function() {
}
//------------------------------------------------------------//
BonusStagePU.prototype.OnPlayerSelect = function() {

    BonusStagePrize_ID_PICK_SELECTED=this.ID_PICK;

    for (var i=0;i<this.Bersagli.length;i++)
    {
        this.Bersagli[i].GlobalEnable(false);
    }

    // Congela i display
    this.ApplicationRef.CONSOLE().SetFreezeCounters(true);
}
//------------------------------------------------------------//
BonusStagePU.prototype.OnOpenComplete = function() {

    for (var i=0;i<this.Bersagli.length;i++)
    {
        this.Bersagli[i].GlobalEnable(true);
    }
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePU.prototype.OnSetReady = function() {

    var running=false;

    // Controlla se altri pick in apertura (fine bonus)
    /*for (var i=0,running=false;i<this.Bersagli.length;i++)
    {
        if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_OPENING)
        {
            this.Bersagli[i].PlayAction();

            if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_OPENING)
                running=true;
        }
    }*/

    if (running==true || this.ID_TIMER_PAUSA!=0)
        return false;

    return true;
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePU.prototype.Exit_ACK = function() {

    if (this.TYPE_BONUS==BonusStagePU.BONUS_TYPE_SINGLE)
        return true;

    for (var i=0;i<this.Bersagli.length;i++)
    {
        if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_ENABLED)
            return false;
    }

    return true;
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePU.prototype.Over_CHECK = function() {

    if (this.TYPE_BONUS!=BonusStagePU.BONUS_TYPE_SINGLE)
    {
        if (this.ID_PICK==0xFF)
        {
            return true;
        }
        else
        {
            if (this.Bersagli[this.ID_PICK].get_PRIZE()==0)
                return true;

            return false;
        }
    }

    return true;
}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePU.prototype.OnBigWinMount = function() {

}
//------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePU.prototype.OnSetExit = function() {
    // Da qui partono i FS
}
//--------------------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePU.prototype.Refresh = function(ellapsed_ms) {

    this.ID_TIMER_PAUSA=this.TimerDec(this.ID_TIMER_PAUSA,ellapsed_ms);

    if (this.Bersagli!=null)
    {
        for (var i=0;i<this.Bersagli.length;i++)
        {
            this.Bersagli[i].Refresh(ellapsed_ms);
        }
    }
}
//-------------------------------------------------------------------------//
// OVERRIDE se serve
BonusStagePU.prototype.Parse_BONUS_STATUS = function(chunk_to_parse) {

    var i,pick_status,pick_value;

    this.ParseServer_Init(chunk_to_parse);

    this.PUNTI_ASSEGNATI	=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_PICK_WIN);
    this.NUM_PICKS			=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_PICK_NUM);

    this.ApplicationRef.SLOT().SetVincitaVideo ( this.PUNTI_ASSEGNATI );

    // Si posiziona all'inizio dei record dei picks
    if (this.ParseServer_SEEK( BonusDescriptor.BS_OFFSET_PICK_STATUS )==false)
        return false;

    for (i=0;i<this.Bersagli.length;i++)
    {
        pick_status = this.ParseServer_Dump_UINT(-1);
        pick_value	= this.ParseServer_Dump_UINT(-1);

        this.Bersagli[i].set_PRIZE(pick_value);

        // Abilitato da noi,ma già aperto secondo il server? (situaizone anche del recovery)
        if (this.Bersagli[i].get_STATO()==BonusStagePrize.STATE_ENABLED && pick_status==BonusDescriptor.BONUS_PICK_OPENED)
        {
            this.Bersagli[i].Disable();
            this.Bersagli[i].Visible(false);
        }
        else if (pick_status==BonusDescriptor.BONUS_PICK_OPENING_REAL)
        {
            this.Bersagli[i].set_PRIZE(pick_value);

            this.Bersagli[i].SetupPrize();

            this.Bersagli[i].Open(true);
        }
        else if (pick_status==BonusDescriptor.BONUS_PICK_OPENING_FAKE)
        {
            this.Bersagli[i].set_PRIZE(pick_value);

            this.Bersagli[i].SetupPrize();

            this.Bersagli[i].Open(false);
        }
    }

    return true;
}
//------------------------------------------------------------//

//---------------------------------------------------------------------------//

