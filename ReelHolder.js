//--------------------------------------------------------------------------//
ReelHolder.REEL_STANDARD  = 0;

ReelHolder.TIME_VISUALIZZA_DIRETTRICE=500;

//--------------------------------------------------------------------------//
function ReelHolder(stage_container,stage_renderer,app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);



    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage    = stage_container;
    this.ParentRenderer = stage_renderer;
    this.Container      = new PIXI.Container();

    this.SimboliEstrattiRef = null;
    // Build the reels
    this.PoolRulli=[];

    for (var i = 0; i < window.NUM_RULLI; i++) {
        this.PoolRulli.push( new Reel(i,app_reference,this.Container,stage_renderer) );
    }


    this.DEBUG_LOG("*** CREATING REEL HOLDER FOR "+window.NUM_RULLI+" REELS ****");
    this.LinerRef=null;

    this.StepAnimazione=0;
    this.StepSpin=0;

    this.WinLine=0;
    this.OldWinLine=0;

    this.LoopAnimazione=0;
    this.ModeAnimazione=0;

    this.TimerSpinBreak=0;
    this.TimerSpinBrake=0;

    this.SET_Quick_Spins=0;
    this.SET_Turbo_Spins=0;

    this.SET_Auto_BreakAtWin=0;
    this.SET_Auto_BreakAtFeature=0;
}

// Create a SlotStage.prototype object that inherits from SObject.prototype.
ReelHolder.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotReelHolder
ReelHolder.prototype.constructor = ReelHolder;

//--------------------------------------------------------------------------//
ReelHolder.prototype.SetSpecialReel = function (p_Id) {

    var i=0;

    for (i=0;i<window.NUM_RULLI;i++)
    {
        this.PoolRulli[i].Visible(true); this.PoolRulli[i].SetupCoords();
    }
}
//--------------------------------------------------------------------------//
ReelHolder.prototype.GetSpecialReel = function (p_Id) {

    return 0;
}
//--------------------------------------------------------------------------//
ReelHolder.prototype.Init = function(p_pSimboliEstratti) {

    this.SimboliEstrattiRef=p_pSimboliEstratti;

    this.SlotComboRef=this.ApplicationRef.SLOT().SLOT_COMBO();

    for (var i = 0; i < this.PoolRulli.length; i++) {
        this.PoolRulli[i].Init(p_pSimboliEstratti);
    }

    this.LinerRef=this.ApplicationRef.SLOT().LINER();

    this.SetSpecialReel(ReelHolder.REEL_STANDARD);

    this.ParentStage.addChild(this.Container);
}
//------------------------------------------------------------//
ReelHolder.prototype.Splash = function() {

    for (var i=0;i<this.PoolRulli.length;i++)
    {
        this.PoolRulli[i].Stop();
        this.PoolRulli[i].Paint();
    }
}
//--------------------------------------------------------------------------//
ReelHolder.prototype.SpinInit = function() {

    for (var i=0;i<window.NUM_REELS;i++)
    {
        this.PoolRulli[i].Spin_Start();
        this.PoolRulli[(i+window.NUM_REELS)].Spin_Start();
        this.PoolRulli[(i+(2*window.NUM_REELS))].Spin_Start();
    }

    if (this.SET_Turbo_Spins==1)
    {
        this.GPTimer=0;           // First reel
        this.TimerSpinBrake=0;    // Next reels
        this.TimerSpinBreak=0;
    }
    else if (this.SET_Quick_Spins==1)
    {
        this.GPTimer=this.ArmaTimer(this.GPTimer,500);  // First reel
        this.TimerSpinBrake=0;    // Next reels
        this.TimerSpinBreak=0;
    }
    else
    {
        this.GPTimer=this.ArmaTimer(this.GPTimer,800);  // First reel
        this.TimerSpinBrake=500;    // Next reels
        this.TimerSpinBreak=this.ArmaTimer(this.TimerSpinBreak,300);
    }

    this.StopAllState=0;

    this.ApplicationRef.CONSOLE().OnSpinEvent(true);
}
//--------------------------------------------------------------------------//
ReelHolder.prototype.SpinRun = function(stop_pressed,stop_enable) {

    // Controllo del blocco simultaneo
    if (this.TimerSpinBreak==0){

        if (stop_pressed==true && this.StopAllState==1 && Reel_BloccoSimultaneo==0)
        {
            Reel_BloccoSimultaneo=0xFF;

            //this.ApplicationRef.CONSOLE().GetButton(SlotConsole.ID_CONBUT_SPIN).SetEnable(false);
            this.ApplicationRef.CONSOLE().OnBrakePushed();
        }
        else if (this.StopAllState==0)
        {
            if (this.ApplicationRef.SLOT().IsAutoPlay()==false && this.ApplicationRef.SLOT().FREESPIN_IsRunning()==false && stop_enable==true)
            {
                //this.ApplicationRef.CONSOLE().GetButton(SlotConsole.ID_CONBUT_SPIN).SetEnable(true);

                this.ApplicationRef.CONSOLE().OnBrakeEnable();

                this.StopAllState=1;	// Abilita Blocco Simultaneo
            }
        }
    }

    for (i=0;i<window.NUM_REELS;i++)
    {
        if (this.PoolRulli[i].IsSpinning()==true && this.PoolRulli[i].IsInBrake()==false)
        {
            if (this.PoolRulli[i].TurboLoaded()==true)
            {
                this.ApplicationRef.CONSOLE().OnBrakePushed();

                this.TimerSpinBrake=(8*250);

                this.GPTimer=this.ArmaTimer(this.GPTimer,this.TimerSpinBrake);
                break;
            }
        }
    }


    if (this.GPTimer==0){

        if (stop_enable==true){

            for (var i=0;i<window.NUM_REELS;i++)
            {
                if (this.PoolRulli[i].IsSpinning()==true && this.PoolRulli[i].IsInBrake()==false)
                {
                    if (this.PoolRulli[i].Brake_ACK()==true)
                    {
                        this.PoolRulli[i].Stop();
                        this.PoolRulli[(i+window.NUM_REELS)].Stop();
                        this.PoolRulli[(i+(2*window.NUM_REELS))].Stop();

                        this.DEBUG_LOG("Stop for reel:"+i);

                        this.GPTimer=this.ArmaTimer(this.GPTimer,this.TimerSpinBrake);
                    }

                    if (Reel_BloccoSimultaneo==0)
                        break;
                }
            }
        }
    }

}
//--------------------------------------------------------------------------//
ReelHolder.prototype.IsSpinOver = function() {

    var ovr=true;

    for (var i=0;i<window.NUM_RULLI;i++)
    {
        if (this.PoolRulli[i].IsStill()==false)
        {
            ovr=false;
            break;
        }
    }

    if (ovr==true)
    {
        for (var i=0;i<this.PoolRulli.length;i++)
        {
            this.PoolRulli[i].Stop();

            this.PoolRulli[i].Mistery_Off();
        }

        this.ApplicationRef.CONSOLE().OnSpinEvent(false);

        this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.TURBO_BGND);

        return true;
    }

    return false;
}
//--------------------------------------------------------------------------//
ReelHolder.prototype.ChassisFix = function() {

    for (var i=0;i<window.NUM_RULLI;i++)
    {
        this.PoolRulli[i].SetSymbol( this.SimboliEstrattiRef[i] );
    }
}
//--------------------------------------------------------------------------//
ReelHolder.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);

    this.TimerSpinBreak=this.TimerDec(this.TimerSpinBreak,ellapsed_ms);

    for (var i = 0; i < this.PoolRulli.length; i++) {
        this.PoolRulli[i].Paint(ellapsed_ms);
    }
}
//---------------------------------------------------------------------------//
ReelHolder.prototype.ResetAnimazioneVincita = function() {

    this.WinLine=0xFF;
    this.OldWinLine=0xFF;
    this.LoopAnimazione=0;
}
//---------------------------------------------------------------------------//
ReelHolder.prototype.InizializzaAnimazioneVincita = function() {

    this.ResetAnimazioneVincita();

    this.StepAnimazione=1;
}
//---------------------------------------------------------------------------//
ReelHolder.prototype.GestioneAnimazioneVincita = function() {

    var i,time;

    switch (this.StepAnimazione)
    {
        case 0:{}break;

        case 1:
        {
            for (i=0;i<window.NUM_RULLI;i++)
            {
                this.PoolRulli[i].FadeOut(false);
            }

            this.StepAnimazione++;
        }break;

        case 2:
        {
            if (this.LoopAnimazione!=0)
            {
                this.ModeAnimazione=ReelAnimation.TYPE_ANIMATION_NORMAL;
            }
            else
            {
                if (this.ApplicationRef.SLOT().IsAutoPlay()==true)
                    this.ModeAnimazione=(ReelAnimation.TYPE_ANIMATION_SNAPSHOT|500);
                else
                    this.ModeAnimazione=ReelAnimation.TYPE_ANIMATION_NORMAL;

            }


            this.AnimateLine();


            if (this.WinLine==window.NUM_LINEE)
            {
                this.GPTimer=this.ArmaTimer(this.GPTimer,ReelHolder.TIME_VISUALIZZA_DIRETTRICE);
            }

            this.StepAnimazione++;


/*

            this.AnimateLine();

            if (this.IsAnimazioneVincitaShort()==true)
                time=ReelHolder.TIME_VISUALIZZA_DIRETTRICE/2;
            else
                time=ReelHolder.TIME_VISUALIZZA_DIRETTRICE;

            this.GPTimer=this.ArmaTimer(this.GPTimer,time);

            this.StepAnimazione++;
*/
        }break;

        case 3:
        {
            if (this.WinLine==window.NUM_LINEE)
            {
                if (this.GPTimer==0)
                {
                    this.StepAnimazione=2;
                }
            }
            else
            {
                if ((this.ModeAnimazione&ReelAnimation.TYPE_ANIMATION_SNAPSHOT)!=0)
                {
                    if (this.AnimazioneVincitaReached(2)==true)
                        this.StepAnimazione=2;
                }
                else
                {
                    if (this.AnimazioneVincitaReached(1)==true)
                        this.StepAnimazione=2;
                }
            }

/*
            if (this.GPTimer==0)
            {
                this.StepAnimazione=2;
            }
*/
        }break;

        default:break;
    };

}
//---------------------------------------------------------------------------//
ReelHolder.prototype.TerminaAnimazioneVincita = function() {

    var i;

    for (i=0;i<window.NUM_RULLI;i++)
    {
        this.PoolRulli[i].Stop();

        this.PoolRulli[i].FadeIn(false);
    }

    this.LinerRef.CancellaLinee();

    this.ResetAnimazioneVincita();

    this.StepAnimazione=0;
}
//--------------------------------------------------------------//
ReelHolder.prototype.IsAnimazioneVincitaShort = function() {

    if (this.LoopAnimazione<1)
        return true;

    return false;
}
//--------------------------------------------------------------//
ReelHolder.prototype.AnimazioneVincitaReached = function(num_loops) {

    for (var i=0;i<window.NUM_RULLI;i++)
    {
        if (this.PoolRulli[i].IsAnimating()==true)
            if (this.PoolRulli[i].GetCompletedLoops()<num_loops)
                break;
    }

    if (i>=window.NUM_RULLI)
        return true;

    return false;
}
//------------------------------------------------------------//
ReelHolder.prototype.IsAnimazioneVincitaInterrompibile = function() {

    if (this.StepAnimazione==0)
        return true;

    if (this.SlotComboRef.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_FREESPIN|SlotCombo.MASK_WIN_BONUS_TOPLAY)!=0)
        if (this.ApplicationRef.SLOT().IsPlayingMusicaWin()==true)
            return false;

    if (this.ApplicationRef.SLOT().IsAutoPlay()==true)
    {
        if (this.LoopAnimazione>=1)	//dal 2o loop
            //if (this.ApplicationRef.SLOT().IsPlayingMusicaWin()==false)
                return true;

        return false;
    }

    if (this.ApplicationRef.SLOT().FREESPIN().IsRunning()==true)
    {
        if (this.LoopAnimazione>=1)	//dal 2o loop
            return true;

        return false;
    }

    if (this.SlotComboRef.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_FREESPIN|SlotCombo.MASK_WIN_BONUS_TOPLAY)!=0)
    {
        if (this.LoopAnimazione>=1)	//dal 2o loop
            return true;

        return false;
    }

    return true;
}
//--------------------------------------------------------------//
/*ReelHolder.prototype.PlaySampleWinLine = function(line_idx) {

    var sym,smp;

    smp=0;

    sym=this.SlotComboRef.GetSimboloCombinazione(this.SlotComboRef.DirettriciVincenti[line_idx]);

    if (sym==window.ID_SIMBOLO_8)
        smp=SoundGenerator.GIRL;
    else if (sym==window.ID_SIMBOLO_9)
        smp=SoundGenerator.SMAILA;

    if (smp!=0)
        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(smp,SoundGenerator.SMP_VOLUME_AMPLIFY);

}*/
//--------------------------------------------------------------//
ReelHolder.prototype.AnimateLine = function() {

    var i,j,k;
    var scr=false;
    var wrap_around=false;
    var wrap=true;

    this.OldWinLine=this.WinLine;

    do
    {
    wrap_around=false;

    if (this.WinLine==0xFF)
        this.WinLine=0;
    else
    {
        if (++this.WinLine>=(window.NUM_LINEE+1))
        {
            this.LoopAnimazione++;

            // FreeSpins / Vincita Scatter / Autoplay
            if (this.ApplicationRef.SLOT().FREESPIN_IsRunning()==true ||
                this.SlotComboRef.MaskEventoVincita_CHECK(SlotCombo.MASK_WIN_FREESPIN|SlotCombo.MASK_WIN_BONUS_TOPLAY)!=0 ||
                this.ApplicationRef.SLOT().IsAutoPlay()==true)
                    this.WinLine=window.NUM_LINEE;
            else if (this.SlotComboRef.GetNumDirettriciVincenti()==1)
                this.WinLine=window.NUM_LINEE;
            else
                this.WinLine=0;
        }
    }

    // Linee
    for (i=this.WinLine;i<window.NUM_LINEE;i++)
    {
        if (this.SlotComboRef.DirettriciVincenti[i]!=0)
        {
            if (i!=this.OldWinLine)
            {
                if (this.OldWinLine!=0xFF)
                    this.LinerRef.CancellaLinee();

                for (j=0;j<window.PATTERN_SIMBOLI;j++)
                {
                    if (this.PoolRulli[j].IsAnimating()==true)
                    {
                        this.PoolRulli[j].Stop();

                        this.PoolRulli[j].FadeOut(false);
                    }
                }


                for (j=0;j<window.NUM_REELS;j++)
                {
                    if (this.SlotComboRef.SimboliVincenti[i][j]==1)
                    {
                        if (this.PoolRulli[(SlotCombo.TAB_LINES[i][j])].IsAnimating()==false)
                        {
                            this.PoolRulli[(SlotCombo.TAB_LINES[i][j])].Animate_Start( i, this.ModeAnimazione );

                            this.PoolRulli[(SlotCombo.TAB_LINES[i][j])].FadeIn(false);
                        }
                    }
                }

                this.LinerRef.VisualizzaLinea(i,this.SlotComboRef.DirettriciVincite[i]);

                this.WinLine=i;


                if (this.LoopAnimazione==0)
                {
                    const snd = this.ApplicationRef.SLOT().GetSampleMusicaWin()
                    if (snd == SoundGenerator.WIN_BONUS) {
                        setTimeout(() => {
                            this.ApplicationRef.SOUNDGENERATOR().PlayBrano(snd, SoundGenerator.SMP_VOLUME_NORMAL);
                        }, 1000)
                    } else {
                        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(snd, SoundGenerator.SMP_VOLUME_NORMAL);
                    }

                    /*if (this.ModeAnimazione==ReelAnimation.TYPE_ANIMATION_NORMAL)
                        this.PlaySampleWinLine(i);*/
                }

                break;
            }
        }
    }

    // Scatter?
    if (i==window.NUM_LINEE && (i!=this.OldWinLine))
    {
        for (k=0;k<window.PATTERN_SIMBOLI;k++)
        {
            if (this.SlotComboRef.PatternScattered[k]!=0)
            {
                if (scr==false)
                {
                    this.LinerRef.CancellaLinee();

                    for (j=0;j<window.PATTERN_SIMBOLI;j++)
                    {
                        if (this.PoolRulli[j].IsAnimating()==true)
                        {
                            this.PoolRulli[j].Stop();

                            this.PoolRulli[j].FadeOut(false);
                        }
                    }

                    scr=true;
                }

                this.PoolRulli[k].Animate_Start(window.NUM_LINEE,ReelAnimation.TYPE_ANIMATION_NORMAL);

                this.PoolRulli[k].FadeIn(false);

                if (this.LoopAnimazione==0)
                {
                    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.WIN_SCATTER, SoundGenerator.SMP_VOLUME_AMPLIFY);
                }
            }
        }

        if (scr==false && wrap==true)
        {
            wrap=false;
            wrap_around=true;
            this.WinLine=window.NUM_LINEE;
        }
    }

    }while (wrap_around==true);

    this.WinLine=i;
}
//------------------------------------------------------------//
// OVERRIDE
ReelHolder.prototype.IsAnimazioneVincitaInCorso = function() {
    return (this.StepAnimazione!=0);
}
//--------------------------------------------------------------//
ReelHolder.prototype.RulloIn = function(id_rullo) {

	this.PoolRulli[id_rullo].ReelIn();
}
//--------------------------------------------------------------//
ReelHolder.prototype.RulloOut = function(id_rullo) {

    //if (m_PoolRulli[id_rullo].GetSimbolo()!=Slot.ID_SIMBOLO_BONUS)
    this.PoolRulli[id_rullo].ReelOut();
}
//--------------------------------------------------------------//
ReelHolder.prototype.GetRullo = function(id_rullo) {

    return this.PoolRulli[id_rullo];
}
//--------------------------------------------------------------//
ReelHolder.prototype.CONTAINER = function() {
    return this.Container;
}
//--------------------------------------------------------------//
ReelHolder.prototype.Visible = function(vsb) {
    this.Container.visible=vsb;
}
//------------------------------------------------------------//
ReelHolder.prototype.SetMagicSymbol = function(id_sym,enb)
{
    var i;

    for (i=0;i<window.PATTERN_SIMBOLI;i++)
    {
        this.PoolRulli[i].SetMagicSymbol(id_sym,enb);
    }
}
//--------------------------------------------------------------//
