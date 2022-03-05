//------------------------------------------------------------//
Slot.DEBUG_SPRITE=0;
Slot.DEBUG_BONUS=0;
//------------------------------------------------------------//
Slot.ID_FSM_SLOT_0=0;
Slot.ID_FSM_SLOT_1=1;
Slot.ID_FSM_SLOT_2=2;
Slot.ID_FSM_SLOT_3=3;
Slot.ID_FSM_SLOT_4=4;
Slot.ID_FSM_SLOT_5=5;
Slot.ID_FSM_SLOT_6=6;
Slot.ID_FSM_SLOT_7=7;

Slot.ID_FSM_SLOT_STOP=10;

//--------------------------------------------------------------------------//
function Slot(app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Slot-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.MainRenderer   = this.ApplicationRef.Renderer;

    // Components declaration (instance of gfx objects will be done after resources load)
    this.SlotCombo= new SlotCombo(this.ApplicationRef,this);
    this.Container = null;
    this.SlotStage = null;
    this.SlotFrame = null;
    this.ReelHolder= null;
    this.SlotConsoleRef= null;
    this.SlotLiner  = null;

    this.FreeSpinStage = null;
    this.BonusStage = null;

    this.BigWin=null;
    this.Congratulations=null;
    this.PayTable=null;

    this.LongWild=null;

this.Dummy=null;
    // Members
    this.Linee=window.NUM_LINEE;
	this.Power=1;
    this.VincitaVideo_Coins=0;
    this.VincitaVideo_Divisa=0;
    this.ValoreVincitaAssegnata=0;
    this.StepAccredito=0;
    this.ID_TIMER_ACCREDITO=0;
    this.ID_TIMER_WAIT_FOR_ACCREDITO=0;

    this.StepAnimazione=0;
    this.AccreditoVincita_ACK=false;
    this.DefinitiveAnimazioneVincitaCompletata=false;
    this.PremutoSTART=false;

    this.Initialized=false;

    this.StepFSM=0;

    this.SimboliEstratti=new Array( window.NUM_RULLI );

    this.DEBUG_LOG("Slot constructed.");
}

// Create a Slot.prototype object that inherits from SObject.prototype.
Slot.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to TiledSprite
Slot.prototype.constructor = Slot;

//--------------------------------------------------------------------------//
Slot.prototype.Init = function() {

    this.SlotCombo.Init();

    // Create Slot container
    this.Container=new PIXI.Container();

    this.DEBUG_LOG("Container created for Slot ");

    // Create the components
    this.SlotStage = new SlotStage( this.Container,this.ApplicationRef );
    this.ReelHolder= new ReelHolder( this.Container, this.MainRenderer ,this.ApplicationRef);

    this.LongWild= new LongWild(this.Container,this.ApplicationRef );

    this.SlotFrame = new SlotFrame( this.Container,this.ApplicationRef );

    this.SlotConsoleRef=this.ApplicationRef.CONSOLE();

    this.SlotLiner=new SlotLiner(this.ApplicationRef.CONSOLE().Container,this.ApplicationRef);

    this.FreeSpinStage=new FreeSpinStage(this.ApplicationRef);

    this.BonusStage=new BonusStageManager(this.ApplicationRef);

    //this.BigWin=new BigWin(this.ApplicationRef);

    this.Congratulations=new Congratulation(this.ApplicationRef);

    this.PayTable=new PayTable(this.ApplicationRef);

    // Initialize the components
    this.SlotStage.Init();

    this.ReelHolder.Init(this.SimboliEstratti);

    this.LongWild.Init();

    this.SlotFrame.Init();

    this.SlotLiner.Init();

    if (this.BonusStage!=null)
        this.BonusStage.Init();

    if (this.FreeSpinStage!=null)
    {
        this.FreeSpinStage.Reset();
        this.FreeSpinStage.Init();
    }

    //this.BigWin.Init();

    this.Congratulations.Init();

    this.PayTable.Init();

    // Link the Slot container to the stage
    this.Container.visible=false;

    this.MainStage.addChild(this.Container);

    this.DEBUG_LOG("Slot initialized.");

if (Slot.DEBUG_SPRITE==1)
    this.DummyTest_Init();
}
//--------------------------------------------------------------------------//
Slot.prototype.Reset = function() {

    this.SlotCombo.Reset();

    this.DefinitiveAnimazioneVincitaCompletata=true;
}
//--------------------------------------------------------------------------//
Slot.prototype.Splash = function() {

    this.ReelHolder.Splash();

    this.Container.visible=true;
}
//--------------------------------------------------------------------------//
Slot.prototype.SpinInit = function() {

    if (Slot.DEBUG_SPRITE==1)
        this.DummyTest_SpinInit();
    else if (Slot.DEBUG_BONUS==1)
        this.BonusTest_SpinInit();
    else
    {
        this.SlotCombo.ResetWinPattern();

        this.LongWild.AniClear();

        this.StepFSM=Slot.ID_FSM_SLOT_1;

        this.PremutoSTART=false;

        this.StopPlayingMusicaWin();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.SPIN,SoundGenerator.SMP_VOLUME_NORMAL);

        this.DEBUG_LOG("Slot spin init.");
    }
}
//--------------------------------------------------------------------------//
Slot.prototype.SpinRun = function() {

    if (this.PremutoSTART==false)
        this.PremutoSTART=this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_START);

    switch (this.StepFSM)
    {
        // Idle
        case Slot.ID_FSM_SLOT_0:{

        }break;

        case Slot.ID_FSM_SLOT_1:
        {
            if (this.FREESPIN_IsRunning()==true)
            {
                this.FreeSpinStage.SpinStart();

                this.ApplicationRef.GAMEPROXY().NOTIFY_PLAY_FREESPIN(BonusDescriptor.ID_BONUS_FREESPIN,BonusDescriptor.BS_ACTION_FREESPIN_SPIN);
            }
            else
            {
                if (this.IsAutoPlay()==true)
                    this.SlotConsoleRef.SetStaticDisplay( this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().ON_AUTOSPIN_MESSAGE()+this.ApplicationRef.PLAYER().AUTO_SPINS_GET() ,false);
                else
                    this.SlotConsoleRef.SetStaticDisplay(this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().ON_SPIN_MESSAGE(),false);

                this.ApplicationRef.GAMEPROXY().NOTIFY_PLAY_BET();
            }

            this.ReelHolder.SpinInit();

            // Congela i display
            this.SlotConsoleRef.SetFreezeCounters(true);

            this.StepFSM=Slot.ID_FSM_SLOT_2;

            this.DEBUG_LOG("Slot spin run "+this.StepFSM);
        }break;

        case Slot.ID_FSM_SLOT_2:
        {

            this.ReelHolder.SpinRun(false,false);

            if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
            {
                if (window.CONNECT2SERVER==false)
                {
                    for (var i=0;i<window.NUM_RULLI;i++)
                        this.SimboliEstratti[i]=window.ID_SIMBOLO_0+Lib.Rand( (window.NUM_SIMBOLI-1) );

                    this.StepFSM=Slot.ID_FSM_SLOT_3;
                }
                else
                {
                    this.LongWild.Elabora();

                    this.StepFSM=Slot.ID_FSM_SLOT_4;
                }

                this.DEBUG_LOG("Slot: Server PlayBet answer received.");
            }
        }break;

        // Manual symbols fix
        case Slot.ID_FSM_SLOT_3:
        {
            this.ReelHolder.ChassisFix();

            this.ReelHolder.SpinRun(false,false);

            this.StepFSM=Slot.ID_FSM_SLOT_4;

            this.DEBUG_LOG("Slot: chassis symbols fixed.");

        }break;

        case Slot.ID_FSM_SLOT_4:
        {
            this.ReelHolder.SpinRun(this.PremutoSTART,true);

            if (this.ReelHolder.IsSpinOver()==true)
            {
                this.DEBUG_LOG("Slot: Spin Over");

                this.LongWild.SostituzioneSimboli();

                // Calcola valore vincita
                this.CalcolaValoreVincita();

                if (this.FREESPIN_IsRunning()==true)
                    this.FreeSpinStage.SpinOver(this.ValoreVincitaAssegnata);


                // Scongela i display
                this.SlotConsoleRef.SetFreezeCounters(false);

                // Aggiorna il display info
                this.SlotConsoleRef.UpdateDisplayQueue();

                this.InizializzaAnimazioneVincita();

                this.StepFSM=Slot.ID_FSM_SLOT_5;
            }
        }break;

        case Slot.ID_FSM_SLOT_5:
        {
            this.GestioneAnimazioneVincita();

            if (this.DefinitiveAnimazioneVincitaCompletata==true)
            {
                this.OnAnimazioneVincitaCompletata();
            }
            else if (this.IsAnimazioneVincitaInterrompibile() == true)
            {
                this.OnAnimazioneVincitaInterrompibile();
            }
        }break;

        default:break;
    };
}
//--------------------------------------------------------------------------//
Slot.prototype.IsSpinOver = function() {
    return (this.StepFSM==Slot.ID_FSM_SLOT_STOP);
}
//---------------------------------------------------------------------------//
Slot.prototype.BET_LINE = function() {
    return this.Power;
}
//---------------------------------------------------------------------------//
Slot.prototype.LINES = function() {
    return this.Linee;
}
//---------------------------------------------------------------------------//
Slot.prototype.SetPower = function(p_Power,p_Lines) {
    this.Power=p_Power;
    this.Linee=p_Lines;
}
//---------------------------------------------------------------------------//
Slot.prototype.TOTAL_BET = function() {
    return (this.Power*this.Linee);
}
//---------------------------------------------------------------------------//
Slot.prototype.GetVincitaVideo = function() {
    return this.VincitaVideo_Coins;
}
//---------------------------------------------------------------------------//
Slot.prototype.GetVincitaVideo_Divisa = function() {
    return this.VincitaVideo_Divisa;
}
//--------------------------------------------------------------//
Slot.prototype.SetVincitaVideo = function(val) {
    this.VincitaVideo_Coins=val;
    this.VincitaVideo_Divisa=this.ApplicationRef.PLAYER().Coins2Divisa(this.VincitaVideo_Coins);
}
//--------------------------------------------------------------//
Slot.prototype.IncVincitaVideo = function(val) {
    this.VincitaVideo_Coins+=val;
    this.VincitaVideo_Divisa=this.ApplicationRef.PLAYER().Coins2Divisa(this.VincitaVideo_Coins);
}
//--------------------------------------------------------------//
Slot.prototype.GetSimboliEstratti = function() {
    return this.SimboliEstratti;
}
//--------------------------------------------------------------------------//
Slot.prototype.RefreshComponents = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);

    this.ID_TIMER_ACCREDITO=this.TimerDec(this.ID_TIMER_ACCREDITO,ellapsed_ms);
    this.ID_TIMER_WAIT_FOR_ACCREDITO=this.TimerDec(this.ID_TIMER_WAIT_FOR_ACCREDITO,ellapsed_ms);

    this.SlotStage.Refresh(ellapsed_ms);
    this.SlotFrame.Refresh(ellapsed_ms);

    this.ReelHolder.Refresh(ellapsed_ms);

    this.SlotLiner.Refresh(ellapsed_ms);

    if (this.FreeSpinStage!=null)
        this.FreeSpinStage.Refresh(ellapsed_ms);

    if (this.BonusStage!=null)
        this.BonusStage.Refresh(ellapsed_ms);

    if (this.BigWin!=null)
        this.BigWin.Refresh(ellapsed_ms);

    if (this.Congratulations!=null)
        this.Congratulations.Refresh(ellapsed_ms);

    this.PayTable.Refresh(ellapsed_ms);

    if (this.LongWild!=null)
        this.LongWild.AniRefresh(ellapsed_ms);

if (Slot.DEBUG_SPRITE==1)
    this.DummyTest_Refresh(ellapsed_ms);
else if (Slot.DEBUG_BONUS==1)
    this.RunAction();
}
//--------------------------------------------------------------//
Slot.prototype.CalcolaValoreVincita = function() {

    // Ufficializza il valore vincita
    this.ValoreVincitaAssegnata=this.SlotCombo.GetVincitaAssegnata();
/*
    if (this.SlotCombo.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_FREESPIN)!=0)
    {
        this.BreakAutoPlay();
    }
    else if (this.SlotCombo.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_BONUS_TOPLAY)!=0)
    {
        this.BreakAutoPlay();
    }
*/

    if (this.REEL_HOLDER().SET_Auto_BreakAtFeature==1 && this.SlotCombo.MaskEventoVincita_CHECK((SlotCombo.MASK_WIN_FREESPIN|SlotCombo.MASK_WIN_BONUS_TOPLAY))!=0)
    {
        this.BreakAutoPlay();
    }
    else if (this.REEL_HOLDER().SET_Auto_BreakAtWin==1 && this.ValoreVincitaAssegnata!=0)
    {
        this.BreakAutoPlay();
    }
}
//--------------------------------------------------------------//
Slot.prototype.FREESPIN_IsRunning = function() {

    if (this.FreeSpinStage!=null)
        return this.FreeSpinStage.IsRunning();

    return false;
}
//--------------------------------------------------------------//
Slot.prototype.FREESPIN_IsStarted = function() {

    if (this.FreeSpinStage!=null)
        return this.FreeSpinStage.IsStarted();

    return false;
}
//--------------------------------------------------------------//
Slot.prototype.Notify_EnableAutoPlay = function() {
}
//--------------------------------------------------------------//
Slot.prototype.Notify_BreakAutoPlay = function() {

    if (this.ApplicationRef.PROGRAMMA().GetFaseCorrente()==Program.ID_FASE_AVVIO && this.ApplicationRef.PLAYER().CREDITI_GET()!=0)
        this.EnableButtons();
    else
        this.DisableButtons();
}
//--------------------------------------------------------------//
Slot.prototype.BreakAutoPlay = function() {

    this.ApplicationRef.PROGRAMMA().GetSPIN_SET().BreakAutoPlay();
}
//--------------------------------------------------------------//
Slot.prototype.IsAutoPlay = function() {

    return this.ApplicationRef.PROGRAMMA().GetSPIN_SET().IsAutoPlay();
}

//--------------------------------------------------------------//
Slot.prototype.EnableButtons = function() {

    this.SlotConsoleRef.Enable();
/*
    if (this.FREESPIN_IsRunning()==true)
    {
        //m_pConsole.GetButton(SlotConsole.ID_CONBUT_SPIN).SetEnable(true)
        //m_pConsole.GetButton(SlotConsole.ID_CONBUT_AUTO).SetEnable(true);
    }
    else if (this.IsAutoPlay()==true)
    {
        //this.SlotConsole.GetButton(SlotConsole.ID_CONBUT_AUTO).SetEnable(true);
    }
    else
    {
        //this.SlotConsole.Enable();
    }
*/
}
//--------------------------------------------------------------//
Slot.prototype.DisableButtons = function() {

     this.SlotConsoleRef.Disable();
    //this.SlotConsole.Disable();

    //if (this.IsAutoPlay()==true)
        //this.SlotConsole.GetButton(SlotConsole.ID_CONBUT_AUTO).SetEnable(true);
}
//--------------------------------------------------------------//
Slot.prototype.InizializzaHelp = function() {

    this.PayTable.Mount(this.Container);

}
//--------------------------------------------------------------//
Slot.prototype.VisualizzaHelp = function() {

    if (this.PayTable.IsMounted()==false)
        return 1;

    return 0;
}
//--------------------------------------------------------------//
Slot.prototype.IsAnimazioneVincitaRunnable = function() {

    if (this.ValoreVincitaAssegnata!=0	||
        this.SlotCombo.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_BONUS_TOPLAY)!=0 ||
        this.SlotCombo.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_FREESPIN)!=0)
        return true;

    return false;
}
//--------------------------------------------------------------//
Slot.prototype.ReloadAnimazioneVincita = function() {

    this.DefinitiveAnimazioneVincitaCompletata=false;
    this.StepAnimazione=8;
}
//--------------------------------------------------------------//
Slot.prototype.InizializzaAnimazioneVincita = function() {

    this.StepAnimazione=0;
    this.AccreditoVincita_ACK=false;
    this.PremutoSTART=false;

    if (this.IsAnimazioneVincitaRunnable()==true)
    {
        this.ReelHolder.InizializzaAnimazioneVincita();

        this.DefinitiveAnimazioneVincitaCompletata=false;
    }
    else
    {
        if (this.FREESPIN_IsRunning()==true)
            this.DefinitiveAnimazioneVincitaCompletata=false;
        else
            this.DefinitiveAnimazioneVincitaCompletata=true;
    }
}
//--------------------------------------------------------------//
Slot.prototype.GestioneAnimazioneVincita = function() {
    var i,j,time;

    if (this.DefinitiveAnimazioneVincitaCompletata==true)
        return;

    switch (this.StepAnimazione)
    {
        // init
        case 0:
        {
            this.OnInitAnimazioneVincita();
        }break;

        case 1:
        {
            this.OnPreAnimazioneVincita();
        }break;

        // Attesa combo nulla in FS
        case 2:
        {
            if (this.GPTimer==0)
                this.DefinitiveAnimazioneVincitaCompletata=true;
        }break;

        case 7:
        {
            this.InitAccreditoVincita();

            if (this.ValoreVincitaAssegnata != 0 ||
                this.FREESPIN_IsRunning()==true ||
                this.SlotCombo.MaskEventoVincita_CHECK( (SlotCombo.MASK_WIN_BONUS_TOPLAY|SlotCombo.MASK_WIN_FREESPIN) )!=0)
            {
                this.StepAnimazione=8;
            }
            else
            {
                this.ReelHolder.TerminaAnimazioneVincita();

                this.StepAnimazione=13;
            }
        }break;

        // ATTENDE I loops
        case 8:
        {
            this.ReelHolder.GestioneAnimazioneVincita();

            if (this.ReelHolder.IsAnimazioneVincitaInterrompibile() == true || this.PremutoSTART==true)
            {
                this.PremutoSTART=false;

                this.StepAnimazione = 15;

                if (this.FREESPIN_IsRunning() == true)
                {
                    this.StepAnimazione = 9;
                }
            }

        }break;

        //-----------------------------------------------------------------------------------
        case 9:
        {
            this.FreeSpinStage.SimboliMagici_Init();

            if (this.FreeSpinStage.SimboliMagici_Play() == true) {
                this.StepAnimazione = 10;
            }
            else {
                this.StepAnimazione = 14;
            }
        } break;

        case 10:
        {
            if (this.FreeSpinStage.SimboliMagici_Play() == false)
            {
                // Ufficializza il valore vincita
                this.ValoreVincitaAssegnata = this.SlotCombo.GetVincitaAssegnata();

                this.SlotConsoleRef.UpdateDisplayQueue();

                if (this.ValoreVincitaAssegnata != 0)
                {
                    this.ReelHolder.InizializzaAnimazioneVincita();

                    /*if (this.GetSampleMusicaWin() != 0xFF)
                    {
                        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(this.GetSampleMusicaWin(), (SoundGenerator.SMP_MUSIC | SoundGenerator.SMP_VOLUME_NORMAL));
                    }*/

                    this.StepAnimazione = 11;
                }
                else
                    this.StepAnimazione = 14;
            }
        } break;

        case 11:
        {
            this.ReelHolder.GestioneAnimazioneVincita();

            if (this.ReelHolder.IsAnimazioneVincitaInterrompibile() == true)
            {
                this.StepAnimazione = 14;
            }
            else if (this.PremutoSTART==true)
            {
                this.ReelHolder.TerminaAnimazioneVincita();

                this.StepAnimazione=14;
            }

        } break;

        case 14:
        {
            this.FreeSpinStage.SpinOver(this.ValoreVincitaAssegnata);

            this.StepAnimazione = 15;
        } break;


        //-----------------------------------------------------------------------------------
        default:
        {
            this.ReelHolder.GestioneAnimazioneVincita();
        }break;
    };

    // Fatto vedere tutte le linee e accredito ok?
    if (this.AccreditoVincita()==0)
    {
        if (this.ReelHolder.IsAnimazioneVincitaInterrompibile()==true)
        {
            this.OnAccreditoVincitaCompletato();
        }
    }
}
//--------------------------------------------------------------//
Slot.prototype.TerminaAnimazioneVincita = function() {

    this.ReelHolder.TerminaAnimazioneVincita();

    this.SlotCombo.MaskEventoVincita=0;

    this.DefinitiveAnimazioneVincitaCompletata=true;
}
//--------------------------------------------------------------//
Slot.prototype.IsAnimazioneVincitaInterrompibile = function () {

    return (this.ReelHolder.IsAnimazioneVincitaInterrompibile() && (this.DefinitiveAnimazioneVincitaCompletata == true || this.StepAnimazione >= 15));
}
//---------------------------------------------------------------------------//
Slot.prototype.ActionPending = function() {

    if (this.BonusStage!=null)
    {
        if (this.BonusStage.ActionPending()==true)
            return true;
    }

    if (this.FreeSpinStage!=null)
    {
        if (this.FreeSpinStage.ActionPending()==true)
            return true;
    }

    return false;
}
//---------------------------------------------------------------------------//
Slot.prototype.RunAction = function() {

    if (this.FreeSpinStage!=null)
    {
        if (this.FreeSpinStage.ActionPending()==true) {

            this.FreeSpinStage.RunAction();

            return;
        }
    }

    if (this.BonusStage!=null)
    {
        if (this.BonusStage.ActionPending()==true) {

            this.BonusStage.RunAction();
            return;
        }

    }
}
//---------------------------------------------------------------------------//
Slot.prototype.PlayMusic = function() {

    this.SlotStage.PlayMusic();
}
//--------------------------------------------------------------//
Slot.prototype.OnInitAnimazioneVincita = function() {

    if (this.FREESPIN_IsRunning()==true)
    {
        this.StepAnimazione = 7;
    }
    else if (this.LongWild!=null)
    {
        if (this.LongWild.get_STATO()==LongWild.WILD_STAT_INNESCATA)
        {
            this.LongWild.AniStart();

            this.StepAnimazione=1;
        }
        else
        {

            this.StepAnimazione=7;
        }
    }
    else
        this.StepAnimazione=7;

}
//--------------------------------------------------------------//
Slot.prototype.OnPreAnimazioneVincita = function() {

    if (this.LongWild!=null)
    {
        this.LongWild.AniRun();

        if (this.LongWild.IntroRunning()==false)
            this.StepAnimazione=7;
    }
}
//--------------------------------------------------------------//
Slot.prototype.OnAccreditoVincitaCompletato = function() {
}
//--------------------------------------------------------------//
Slot.prototype.OnAnimazioneVincitaInterrompibile = function() {
    this.StepFSM=Slot.ID_FSM_SLOT_STOP;
}
//--------------------------------------------------------------//
Slot.prototype.OnAnimazioneVincitaCompletata = function() {
    this.StepFSM=Slot.ID_FSM_SLOT_STOP;
}
//--------------------------------------------------------------//

Slot.prototype.InitAccreditoVincita = function() {

    this.SetVincitaVideo(0);

    if (this.ValoreVincitaAssegnata!=0 || this.SlotCombo.MaskEventoVincita_CHECK( (SlotCombo.MASK_WIN_BONUS_TOPLAY|SlotCombo.MASK_WIN_FREESPIN))!=0)
    {
        this.StepAccredito=this.ValoreVincitaAssegnata;

        /*if (this.GetSampleMusicaWin()!=0xFF)
        {
            this.ApplicationRef.SOUNDGENERATOR().PlayBrano( this.GetSampleMusicaWin(),(SoundGenerator.SMP_MUSIC|SoundGenerator.SMP_VOLUME_AMPLIFY) );
        }*/

        this.ID_TIMER_WAIT_FOR_ACCREDITO=this.ArmaTimer(this.ID_TIMER_WAIT_FOR_ACCREDITO, this.GetDurataMusicaWin() );
        this.ID_TIMER_ACCREDITO=0;
    }

    this.AccreditoVincita_ACK=true;
}
//--------------------------------------------------------------//
Slot.prototype.AccreditoVincita = function() {

    if (this.AccreditoVincita_ACK==false)
        return 1;

    if (this.GetVincitaVideo()<this.ValoreVincitaAssegnata)
    {
        if (this.ID_TIMER_WAIT_FOR_ACCREDITO==0)
        {
            if (this.ID_TIMER_ACCREDITO==0)
            {
                this.IncVincitaVideo(this.StepAccredito);

                if (this.GetVincitaVideo()>=this.ValoreVincitaAssegnata)
                {
                    this.SetVincitaVideo(this.ValoreVincitaAssegnata);

                    // UFFICIALIZZA a video il valore dell'energia (sinora decrementato della vincita
                    // assegnata) e di conseguenza il teatro diventa rosso
                    this.ValoreVincitaAssegnata=0;
                }

                this.ID_TIMER_ACCREDITO=this.ArmaTimer(this.ID_TIMER_ACCREDITO, 10 );
            }
        }

        return 1;
    }

    return 0;
}
//--------------------------------------------------------------//
Slot.prototype.IsPlayingMusicaWin = function() {

    //if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying(SoundGenerator.WIN_BONUS)==true)
        //return true;
    if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying(SoundGenerator.WIN_HI)==true)
        return true;
    if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying(SoundGenerator.WIN_MID)==true)
        return true;
    if (this.ApplicationRef.SOUNDGENERATOR().IsPlaying(SoundGenerator.WIN_LO)==true)
        return true;

    return false;
}
//--------------------------------------------------------------//
Slot.prototype.GetSampleMusicaWin = function() {

    if (this.SlotCombo.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_BONUS_TOPLAY)!=0)
        return SoundGenerator.WIN_BONUS;

    /*if (this.SlotCombo.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_FREESPIN)!=0)
        return SoundGenerator.WIN_SCATTER;*/

    //if (this.SlotCombo.MaskEventoVincita_CHECK( (SlotCombo.MASK_WIN_BONUS_TOPLAY|SlotCombo.MASK_WIN_FREESPIN))!=0)
        //return 0xFF;

    if (this.ValoreVincitaAssegnata>=(100*this.BET_LINE()))
        return SoundGenerator.WIN_HI;

    if (this.ValoreVincitaAssegnata>=(10*this.BET_LINE()))
        return SoundGenerator.WIN_MID;

    return SoundGenerator.WIN_LO;
}
//--------------------------------------------------------------//
Slot.prototype.StopPlayingMusicaWin = function() {

    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.WIN_HI);
    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.WIN_MID);
    this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.WIN_LO);
}
//--------------------------------------------------------------//
Slot.prototype.GetDurataMusicaWin = function() {
    return 0;
}
//--------------------------------------------------------------//
Slot.prototype.Parse_REEL_STATUS = function(chunk_to_parse) {

    var esito=false;
    var i=0;

    if (this.ParseServer_Init(chunk_to_parse)==true)
    {
        for (i=0,esito=true;i<window.NUM_RULLI;i++)
        {
            this.SimboliEstratti[i]=this.ParseServer_Dump_UINT(-1);

            if (this.SimboliEstratti[i]>window.NUM_SIMBOLI)
            {
                esito=false;
                break;
            }
        }

        if (esito==true)
        {
            this.ReelHolder.ChassisFix();

            this.Initialized=true;
        }
    }

    return esito;
}
//-------------------------------------------------------------------------//
Slot.prototype.Parse_BONUS_STATUS = function(chunk_to_parse) {

    var esito=false;

    if (this.ParseServer_Init(chunk_to_parse)==true)
    {
        var bonus_type=this.ParseServer_Dump_UINT(-1);

        if (bonus_type==BonusDescriptor.ID_BONUS_PICK)
            esito=this.BonusStage.Parse_BONUS_STATUS(chunk_to_parse);
        else if (bonus_type==BonusDescriptor.ID_BONUS_FREESPIN)
            esito=this.FreeSpinStage.Parse_FREESPIN_STATUS(chunk_to_parse);
        else
            esito=false;
    }

    return esito
}
//---------------------------------------------------------------------------//
Slot.prototype.TrembleInit = function(max_x,max_y,count) {
	this.CountFX=count;

	this.FX_x= 0;
	this.FX_y= 0;

	this.FX_max_x = max_x;
	this.FX_max_y = max_y;
}
//---------------------------------------------------------------------------//
Slot.prototype.TrembleOver = function() {

	var rnd;

    if (this.CountFX == 0)
        return true;

    if (this.FX_x == 0 && this.FX_y == 0)
    {
        this.FX_x = this.FX_max_x;
        this.FX_y = this.FX_max_y;

        rnd = Lib.Rand(2);

        if (rnd == 0)
            this.FX_x *= -1;
        else
            this.FX_x *= 1;

        rnd = Lib.Rand(2);

        if (rnd == 0)
            this.FX_y *= -1;
        else
            this.FX_y *= 1;

        this.Container.x+=this.FX_x;
        this.Container.y+=this.FX_y;
    }
    // Torna all'origine
    else
    {
        this.FX_x *= -1;
        this.FX_y *= -1;

        this.Container.x+=this.FX_x;
        this.Container.y+=this.FX_y;

        this.FX_x = 0;
        this.FX_y = 0;

        if (this.FX_max_x >= 2)
            this.FX_max_x -= 2;

        if (this.FX_max_y >= 2)
            this.FX_max_y -= 2;

        this.CountFX--;
    }

	return false;
}
//---------------------------------------------------------------------------//
Slot.prototype.BonusTest_SpinInit = function() {

    this.BonusStage.Parse_BONUS_ACTIVATE(BonusDescriptor.ID_BONUS_PICK);
}
//---------------------------------------------------------------------------//
Slot.prototype.DummyTest_Init = function() {

}
//---------------------------------------------------------------------------//
Slot.prototype.DummyTest_SpinInit = function() {
}
//---------------------------------------------------------------------------//
Slot.prototype.DummyTest_Refresh = function(ellapsed_ms) {
}
//--------------------------------------------------------------//
Slot.prototype.REEL_STAGE = function() {
    return this.SlotStage;
}
//--------------------------------------------------------------//
Slot.prototype.FREESPIN = function() {
    return this.FreeSpinStage;
}
//---------------------------------------------------------------------------//
Slot.prototype.REEL_FRAME = function() {

    return this.SlotFrame;
}
//---------------------------------------------------------------------------//
Slot.prototype.CONTAINER = function() {

    return this.Container;
}
//---------------------------------------------------------------------------//
Slot.prototype.CONSOLE = function() {

    return this.SlotConsoleRef;
}
//--------------------------------------------------------------//
Slot.prototype.SLOT_COMBO = function() {

    return this.SlotCombo;
}
//--------------------------------------------------------------//
Slot.prototype.REEL_HOLDER = function() {

    return this.ReelHolder;
}
//--------------------------------------------------------------//
Slot.prototype.REEL = function(id_reel) {

    return this.ReelHolder.GetRullo(id_reel);
}
//--------------------------------------------------------------//
Slot.prototype.LINER = function() {

    return this.SlotLiner;
}
//--------------------------------------------------------------//
Slot.prototype.BIG_WIN = function() {

    return this.BigWin;
}
//--------------------------------------------------------------//
Slot.prototype.CONGRATULATIONS = function() {

    return this.Congratulations;
}
//--------------------------------------------------------------//
Slot.prototype.BONUSSTAGE = function() {

    return this.BonusStage;
}
//--------------------------------------------------------------//
Slot.prototype.PAYTABLE = function() {

    return this.PayTable;
}
//--------------------------------------------------------------//
Slot.prototype.SLOT_WILD = function() {

    return this.LongWild;
}
//--------------------------------------------------------------------------//
