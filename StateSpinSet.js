//--------------------------------------------------------------------------//
function StateSpinSet(app_reference,slot_ref) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //ProgramState.call(this,stage_container,stage_renderer,slot_ref);
    ProgramState.call(this,app_reference,slot_ref);

    this.OldBet=0;
    this.OldLines=0;

    this.BetPerLinea=0;
    this.Lines=0;
    this.LinesRequest=0;

    this.BetTarget=0;
    this.LinesTarget=0;
    this.CurrentLine=0;

    this.ID_TIMER_POLL_CREDITS=0;

    this.BetSet=false;

    this.AutoPlay=false;
}

// Create a StateSpinSet.prototype object that inherits from ProgramState.prototype.
StateSpinSet.prototype = Object.create(ProgramState.prototype); // See note below

// Set the "constructor" property to refer to StateSpinSet
StateSpinSet.prototype.constructor = StateSpinSet;

//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateSpinSet.prototype.Reset = function() {

    ProgramState.prototype.Reset.call(this);

    this.ResetBet();

    this.Lines=window.DEFAULT_LINES;
    this.OldBet=DEFAULT_LINES.DEFAULT_LINES;
    this.OldLines=DEFAULT_LINES.DEFAULT_LINES;

};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateSpinSet.prototype.StateInit = function() {

    ProgramState.prototype.StateInit.call(this);

    this.BetSet=false;

    this.LinesRequest=0xFF;

    // Procede animazione vincita
    this.SlotReference.GestioneAnimazioneVincita();

    // Passaggio al body della fase
    this.DEBUG_LOG("- Spin Set - state init");
};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateSpinSet.prototype.StateBody = function(ellapsed_ms) {

    ProgramState.prototype.StateBody.call(this,ellapsed_ms);

    this.ID_TIMER_POLL_CREDITS = this.TimerDec(this.ID_TIMER_POLL_CREDITS,ellapsed_ms);

    this.SlotReference.GestioneAnimazioneVincita();

    if (this.SlotReference.ActionPending()==true)
    {
        this.SlotReference.RunAction();
    }
    else
    {
        switch (this.SottoStep)
        {
            case ProgramState.ID_SOTTOSTEP_0:
            {
                this.SottoStep_0();
            } break;

            case ProgramState.ID_SOTTOSTEP_1:
            {
                this.SottoStep_1();
            } break;

            case ProgramState.ID_SOTTOSTEP_2:
            {
                this.SottoStep_2();
            } break;

            case ProgramState.ID_SOTTOSTEP_3:
            {
                this.SottoStep_3();
            } break;

            case ProgramState.ID_SOTTOSTEP_4:
            {
                this.SottoStep_4();
            } break;

            case ProgramState.ID_SOTTOSTEP_5:
            {
                this.SottoStep_5();
            } break;

            case ProgramState.ID_SOTTOSTEP_6:
            {
                this.SottoStep_6();
            } break;

            case ProgramState.ID_SOTTOSTEP_7:
            {
                this.SottoStep_7();
            } break;

            case ProgramState.ID_SOTTOSTEP_8:
            {
                this.SottoStep_8();
            } break;

            default:break;
        }
    }
};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateSpinSet.prototype.StateExit = function() {

    ProgramState.prototype.StateExit.call(this);

    this.SlotReference.TerminaAnimazioneVincita();

    this.ApplicationRef.CONSOLE().SpinSet(false);

    if (this.RichiestaGameOver==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().Stop();
    }
};
//---------------------------------------------------------------------------//
StateSpinSet.prototype.ResetBet = function() {

    this.BetPerLinea=1;
    this.Lines=1;
}
//------------------------------------------------------------//
StateSpinSet.prototype.Recover = function() {

    var bet,lines;

    bet=this.ApplicationRef.PLAYER().BET_LINE();
    lines=this.ApplicationRef.PLAYER().LINES();

    this.BetPerLinea=bet;
    this.Lines=lines;

    this.OldLines=lines;
    this.OldBet=(lines*bet);

    this.SlotReference.SetPower(bet,lines);
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SottoStep_0 = function() {

    if (this.AutoPlay==true)
    {
        if (this.ApplicationRef.PLAYER().AUTO_SPINS_GET()==0)
            this.BreakAutoPlay();
    }

    if (this.SlotReference.FREESPIN_IsRunning()==true)
        this.GPTimer=this.ArmaTimer(this.GPTimer,1000);

    // Abilita i pulsanti
    //this.SlotReference.EnableButtons();
    this.ApplicationRef.CONSOLE().SpinSet(true);

    this.SottoStep++;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SottoStep_1 = function() {

    if (this.SlotReference.FREESPIN_IsRunning()==true)
    {
        if (this.SlotReference.REEL_HOLDER().IsAnimazioneVincitaInterrompibile()==true)
        {
            this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
        }
        return;
    }
    /*else if (this.IsAutoPlay()==false)
    {
        this.SlotReference.PlayMusic();
    }*/


    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_DEMO_FEATURE_1)==true)
    {
        this.ApplicationRef.GAMEPROXY().DEMO_FEATURE_SET(1);
        this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
        return;
    }

    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_DEMO_FEATURE_2)==true)
    {
        this.ApplicationRef.GAMEPROXY().DEMO_FEATURE_SET(2);
        this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
        return;
    }

    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_DEMO_FEATURE_3)==true)
    {
        this.ApplicationRef.GAMEPROXY().DEMO_FEATURE_SET(3);
        this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
        return;
    }

    // Exit?
    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_EXIT)==true)
    {
        if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
        {
            this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

            this.PopUp_Render (this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().ON_EXIT_MESSAGE(),DialogBox.DIALOG_MODAL_OK_CANCEL);

            this.PopUp_Mount();

            this.SottoStep=ProgramState.ID_SOTTOSTEP_7;

            return;
        }
    }

/*
    ????????
      // Versamento Cassa
    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_CASH_SET)==true)
    {
      if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
        {
            this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

            this.ApplicationRef.GAMEPROXY().CMD_USER_SETTING_REQUEST ( VersamentoCassa.CMD_VERSAMENTO_CASSA );
            return;
        }
    }
*/

    // Prize table
    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_HELP)==true)
    {
        this.SaveOldBet();

        this.SlotReference.InizializzaHelp();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK0,SoundGenerator.SMP_VOLUME_NORMAL);

        this.SottoStep=ProgramState.ID_SOTTOSTEP_2;
        return;
    }

    if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_START)==true ||this.IsAutoPlay()==true || (this.SlotReference.FREESPIN_IsRunning()==true && this.GPTimer==0))
    {
        // Solo se spinna senza aver impostato il bet tentando di impostare l'old bet
        if (this.BetSet==false)
        {
            if (this.SlotReference.FREESPIN_IsRunning()==false)
            {
                this.ResetBet();
                this.Lines=this.OldLines;
                this.BetPerLinea=(this.OldBet/this.OldLines);
                this.ApplicaIncrementoBet(this.OldBet);
            }
        }

        this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
        return;
    }

    // 2. Pulsante di bet-all premuto ?
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_ALLBET_INC)==true)
    {
        if (this.IncBet_Enabled()==true)
            this.IncBet();
        else if (this.ApplicationRef.PLAYER().COIN_VALUE_INC_ENABLED()==true)
            this.ApplicationRef.PLAYER().COIN_VALUE_INC();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET,SoundGenerator.SMP_VOLUME_NORMAL);

        this.BetSet=true;
    }
    // 2. Pulsante di bet-all premuto ?
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_ALLBET_DEC)==true)
    {
        if (this.DecBet_Enabled()==true)
            this.DecBet();
        else if (this.ApplicationRef.PLAYER().COIN_VALUE_DEC_ENABLED()==true)
            this.ApplicationRef.PLAYER().COIN_VALUE_DEC();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET,SoundGenerator.SMP_VOLUME_NORMAL);

        this.BetSet=true;
    }
    // 2. Pulsante di bet premuto ?
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_BET_INC)==true)
    {
        this.IncBet();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET,SoundGenerator.SMP_VOLUME_NORMAL);

        this.BetSet=true;
    }
    // 2. Pulsante di bet premuto ?
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_BET_DEC)==true)
    {
        this.DecBet();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET,SoundGenerator.SMP_VOLUME_NORMAL);

        this.BetSet=true;
    }
    // 2. Pulsante LINEE premuto ?
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_LINES_INC)==true)
    {
        this.IncLines();

        this.SlotReference.TerminaAnimazioneVincita();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET_LINES,SoundGenerator.SMP_VOLUME_NORMAL);

        this.BetSet=true;
    }
    // 2. Pulsante LINEE premuto ?
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_LINES_DEC)==true)
    {
        this.DecLines();

        this.SlotReference.TerminaAnimazioneVincita();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET_LINES);

        this.BetSet=true;
    }
    // 2. Pulsante MAX BET premuto ?
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_MAXBET)==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.MAX_BET,SoundGenerator.SMP_VOLUME_NORMAL);

        this.SlotReference.TerminaAnimazioneVincita();

        this.SetMaxBet();

        this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
        return;
    }
    // Coin Value
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_COINLEVEL_INC)==true)
    {
        this.ApplicationRef.PLAYER().COIN_VALUE_INC();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK1,SoundGenerator.SMP_VOLUME_NORMAL);
    }
    // Coin Value
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_COINLEVEL_DEC)==true)
    {
        this.ApplicationRef.PLAYER().COIN_VALUE_DEC();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK1,SoundGenerator.SMP_VOLUME_NORMAL);
    }
    //AutoPlay
    else if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_AUTO)==true)
    {
        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.CLICK2,SoundGenerator.SMP_VOLUME_NORMAL);

        if (this.AutoPlay==false)
        {
            this.ApplicationRef.PLAYER().AUTO_SPINS_INC();
        }
        else
            this.BreakAutoPlay();
    }
    else if (this.LinesRequest!=0xFF)
    {
        this.SetLinesByClick();

        this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET_LINES,SoundGenerator.SMP_VOLUME_NORMAL);

        this.LinesRequest=0xFF;
    }

    if (this.ID_TIMER_POLL_CREDITS==0)
    {
        if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
        {
            this.ApplicationRef.GAMEPROXY().CMD_CREDIT_STATUS();
            this.SottoStep=ProgramState.ID_SOTTOSTEP_3;
        }
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SottoStep_2 = function() {

    if (this.SlotReference.VisualizzaHelp()==1)
        this.Step=ProgramState.STEP_FASE_INIT;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SottoStep_3 = function() {

    if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
    {
        this.ID_TIMER_POLL_CREDITS=(3*1000);

        this.SottoStep=ProgramState.ID_SOTTOSTEP_1;
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SottoStep_4 = function() {

    if (this.GPTimer==0)
        this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SottoStep_5 = function() {

    this.DEBUG_LOG("SpinSet - Step 5");

    // Overflow?
    if (this.ApplicationRef.PLAYER().COINS_PLAYABLES ( this.GetBet() )==false && this.SlotReference.FREESPIN_IsRunning()==false && this.ApplicationRef.GAMEPROXY().DEMO_FEATURE_GET()==-1)
    {
        this.BreakAutoPlay();

        this.SaveOldBet();

        this.ApplicationRef.GAMEPROXY().CMD_USER_BET_VALIDATE( this.GetBet() );

        this.SottoStep=ProgramState.ID_SOTTOSTEP_6;
    }
    else
    {
        this.PreparaAvvioPartita();

        this.Step=ProgramState.STEP_FASE_EXIT;
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SottoStep_6 = function() {

    if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
    {
        // Se il Server ci manda in versamento cassa significa che il bet non e' stato validato
        if (this.ApplicationRef.PROGRAMMA().GetVERSAMENTO_CASSA().ActionPending()==true)
            this.Step=ProgramState.STEP_FASE_INIT;
        else
            this.SottoStep=ProgramState.ID_SOTTOSTEP_5;
    }
}
//---------------------------------------------------------------------------//
// Exit Dialog
StateSpinSet.prototype.SottoStep_7 = function() {

    var dlg;

    if ((dlg=this.PopUp_Refresh())!=DialogBox.DIALOG_EXIT_NONE)
    {
        this.PopUp_Unmount();

        if (dlg==DialogBox.DIALOG_EXIT_OK)
        {
            this.ApplicationRef.GAMEPROXY().CMD_LOGOUT();
            this.SottoStep++;
        }
        else
            this.Step=ProgramState.STEP_FASE_INIT;
    }
}
//---------------------------------------------------------------------------//
// Exit Dialog
StateSpinSet.prototype.SottoStep_8 = function() {

    if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
    {
        this.Step=ProgramState.STEP_FASE_INIT;
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.IncBet_Enabled = function() {

    if (this.IsBetOverflow(this.Lines,false)==false)
        return true;
    return false;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.DecBet_Enabled = function() {

    return (this.BetPerLinea>1);
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.IncBet = function() {

    var temp;

    // Crediti+punti insufficienti per la puntata?
    if (this.IsBetOverflow(this.Lines,false)==false)
    {
        this.BetPerLinea++;

        this.ApplicaIncrementoBet(this.Lines);
    }
/*
    else
    {
        temp=this.Lines;

        this.ResetBet();

        this.Lines=temp;

        this.ApplicaIncrementoBet(this.BetPerLinea);
    }
*/
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.DecBet = function() {

    if (this.BetPerLinea>1)
    {
        this.BetPerLinea--;

        this.ApplicaIncrementoBet(this.Lines);
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.IncLines = function() {

    var temp;

    // Crediti+punti insufficienti per la puntata?
    if(this.IsBetOverflow(this.BetPerLinea,true)==false)
    {
        this.Lines++;

        this.ApplicaIncrementoBet(this.BetPerLinea);
    }
    else
    {
        temp=this.BetPerLinea;

        this.ResetBet();

        this.BetPerLinea=temp;

        this.ApplicaIncrementoBet(this.Lines);
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.DecLines = function() {

    if (this.Lines>1)
    {
        this.Lines--;

        this.ApplicaIncrementoBet(this.BetPerLinea);
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SetMaxBet = function() {

    var bet_linea;

    this.BetTarget=window.MAX_TOT_BET;
    this.LinesTarget=window.NUM_LINEE;
    bet_linea=window.MAX_BET;

    while (this.BetTarget>this.ApplicationRef.PLAYER().CREDITI_GET() && bet_linea>1)
    {
        this.BetTarget-=window.NUM_LINEE;
        bet_linea--;
    }

    this.Lines=this.LinesTarget;
    this.BetPerLinea=bet_linea;
    this.ApplicaIncrementoBet(this.BetTarget);
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.IsBetOverflow = function(p_IncBet,p_Lines) {

    var l_OverflowLines=false;
    var temp;

    if (p_Lines==true)
    {
        if (this.Lines>=window.NUM_LINEE)
            l_OverflowLines=true;
    }
    else
    {
        if (this.Lines!=0 && l_OverflowLines==false)
        {
            temp=parseInt ( (p_IncBet/this.Lines) );

            if ((this.BetPerLinea+temp)>window.MAX_BET)
            {
                return true;
            }
        }
    }

    if (((this.GetBet()+p_IncBet)>window.MAX_TOT_BET) || l_OverflowLines)
    {
        return true;
    }

    return false;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.ApplicaIncrementoBet = function(p_Incremento) {
    this.SlotReference.SetPower(this.BetPerLinea,this.Lines);
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SaveOldBet = function() {

    this.OldBet=this.GetBet();
    this.OldLines=this.Lines;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SetOldBet = function() {
    var l_Temp;

    // Old bet presente
    if (this.OldBet!=0)
    {
        l_Temp=this.OldBet;

        // Controlla la validita' dell'old bet rispetto Max Bet
        if (this.OldBet > window.MAX_TOT_BET)
            this.OldBet=window.MAX_TOT_BET;


        // Crediti+energia insufficienti
        if (this.ApplicationRef.PLAYER().CREDITI_GET() < this.OldBet)
            this.OldBet=this.ApplicationRef.PLAYER().CREDITI_GET();

        // Old bet invariato?
        if (this.OldBet==l_Temp)
        {
            this.ResetBet();
            this.Lines=this.OldLines;
            this.BetPerLinea=(this.OldBet/this.OldLines);
            this.ApplicaIncrementoBet(this.OldBet);
        }
        else
        {
            this.RicalcolaBet(this.OldBet);
            return false;
        }
    }

    return true;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.RicalcolaBet = function(p_BetTarget) {

    this.Lines=0;
    this.BetPerLinea=1;

    this.BetTarget=p_BetTarget;

    if (this.OldLines>this.BetTarget)
        this.LinesTarget=this.BetTarget;
    else
        this.LinesTarget=this.OldLines;

    this.CurrentLine=0;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.GetBet = function() {
    return (this.Lines*this.BetPerLinea);
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.CheckBreakAutoPlay = function() {

    if (this.AutoPlay==true)
    {
        if (this.ApplicationRef.BUTTON_MANAGER().IsPushed(ButtonManager.BUTT_AUTO)==true)
        {
            this.BreakAutoPlay();
        }
    }
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.IsAutoPlay = function() {
    return this.AutoPlay;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.BreakAutoPlay = function() {

    this.AutoPlay=false;

    this.SlotReference.Notify_BreakAutoPlay();

    this.ApplicationRef.PLAYER().AUTO_SPINS_SET(0);
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.EnableAutoPlay = function() {

    this.AutoPlay=true;

    this.SlotReference.Notify_EnableAutoPlay();
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.PreparaAvvioPartita = function() {

    if (this.SlotReference.FREESPIN_IsRunning()==false)
    {
        this.ApplicationRef.PLAYER().COINS_PLAYED( this.GetBet() );

        if (this.ApplicationRef.PLAYER().AUTO_SPINS_GET()!=0)
        {
            this.EnableAutoPlay();

            this.ApplicationRef.PLAYER().AUTO_SPINS_DEC();
        }
    }

    this.SlotReference.SetVincitaVideo( 0 );

    this.SlotReference.TerminaAnimazioneVincita();

    this.SaveOldBet();

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.SPIN,SoundGenerator.SMP_VOLUME_REDUCE);
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.SetLinesByClick = function() {

    var temp;

    temp=this.BetPerLinea;

    this.ResetBet();

    this.BetPerLinea=temp;

    this.Lines=0;

    while(this.IsBetOverflow(this.BetPerLinea,true)==false)
    {
        this.Lines++;

        this.ApplicaIncrementoBet(this.BetPerLinea);

        if (this.Lines==this.LinesRequest)
            break;
    }

    this.SlotReference.TerminaAnimazioneVincita();

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET,SoundGenerator.SMP_VOLUME_NORMAL);

    this.BetSet=true;
}
//---------------------------------------------------------------------------//
StateSpinSet.prototype.NotifyClickOnLine = function(p_Line) {

    this.SlotReference.TerminaAnimazioneVincita();

    this.ApplicationRef.SOUNDGENERATOR().PlayBrano(SoundGenerator.BET,SoundGenerator.SMP_VOLUME_NORMAL);
}
//--------------------------------------------------------------------------//
