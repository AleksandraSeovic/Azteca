
//------------------------------------------------------------//
StateCashBox.CMD_VERSAMENTO_CASSA = 10;				// Richiesta/Ordine di accesso alla configurazione cassa
StateCashBox.CFG_VERSAMENTO_CASSA = 11;				// Configurazione Valore cassa 

    StateCashBox.ID_SUB_CASH_CONFIG_FORCE	 =	1;		// User obbligato
    StateCashBox.ID_SUB_CASH_CONFIG_CHOOSE	 = 2;		// User può decidere
    StateCashBox.ID_TYPE_CASH_HALT_CHOOSE	 = 3;		// User non può ricaricare mapuò variare il bet
    StateCashBox.ID_TYPE_CASH_HALT_STOP		 = 4;		// User non può ricaricare.Fine dei giochi.

StateCashBox.CFG_PLAYER_BET		 = 20;				// Comanddo dal client per validare il bet corrente del player

//--------------------------------------------------------------------------//
function StateCashBox(app_reference,slot_ref) {    

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //ProgramState.call(this,stage_container,stage_renderer,slot_ref);
    ProgramState.call(this,app_reference,slot_ref);
    
    //  Dati ricevuti dal server
    this.Type=0;		// Tipo di accesso alversamento
    this.Title="";		// Titolo della dialog box
    this.Min=0;			// Valore Min. (cents)
    this.Max=0;			// Valore Max. (cents)
    
    this.CreditoAttuale=0;		// Valore del credito del giocatore
    this.CassaGiocatore=0;		// Valore della cassa del giocatore
    
    this.SetupRequest=false;
}

// Create a StateCashBox.prototype object that inherits from ProgramState.prototype.
StateCashBox.prototype = Object.create(ProgramState.prototype); // See note below

// Set the "constructor" property to refer to StateCashBox
StateCashBox.prototype.constructor = StateCashBox;
    
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateCashBox.prototype.StateInit = function() {
  
    ProgramState.prototype.StateInit.call(this);
    
    this.SottoStep=ProgramState.ID_SOTTOSTEP_1;
    
    this.ApplicationRef.CONSOLE().OnSpinEvent(true);
    
    this.ApplicationRef.PROGRAMMA().GetSPIN_SET().Restart();
    
    this.SetupRequest=false;
};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateCashBox.prototype.StateBody = function(ellapsed_ms) {
  
    var over=false;
    var exit_dlg=DialogBox.DIALOG_EXIT_NONE;
    
    ProgramState.prototype.StateBody.call(this,ellapsed_ms);
    
    switch (this.SottoStep)
    {
        case ProgramState.ID_SOTTOSTEP_0:
        {
        } break;

        case ProgramState.ID_SOTTOSTEP_1:
        {
            // Registra il valore del credito corrente
            this.CreditoAttuale=this.ApplicationRef.PLAYER().CREDITI_GET();

            if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
            {
                if (this.CassaConfigurabile()==true)
                {
                    this.ApplicationRef.GAMEPROXY().CMD_PLAY_STATUS();
                }

                this.SottoStep++;
            }
        } break;

        // Attende i dati aggiornati di PlayerStatus
        case ProgramState.ID_SOTTOSTEP_2:
        {
            if (this.ApplicationRef.GAMEPROXY().Job_Done()==true)
            {
                this.Render();

                this.SottoStep++;
            }
        } break;
            
        case ProgramState.ID_SOTTOSTEP_3:
        {
            // Rinfresco i dati del conto
            this.RenderContoGioco();

            if ((exit_dlg=this.PopUp_Refresh())!=DialogBox.DIALOG_EXIT_NONE)
            {
                over=true;
            }
            // Cassa insufficiente per consentire qualsiasi impostazione oppure
            // non sufficiente per la puntata corrente?
            else if (this.Type==StateCashBox.ID_TYPE_CASH_HALT_STOP)
            {
                // Possibile la giocata minima?
                if (this.ApplicationRef.PLAYER().COINS_AT_MIN_COINVALUE() >=window.MIN_TOT_BET)
                {
                    over=true;
                }
                else if (this.ApplicationRef.GAMEPROXY().Job_Done()==true && this.GPTimer==0)
                {
                    this.ApplicationRef.GAMEPROXY().CMD_PLAY_STATUS();
                
                    this.GPTimer=this.ArmaTimer(this.GPTimer,1000);
                }
            }
            // La dialog è modale,se la cassa non e' configurabile siamo in una situazione
            // di credito insufficiente per il bet corrente
            else 
            {
                if(this.CassaConfigurabile()==false)
                {
                    // Possibile la giocata corrente?
                    if (this.ApplicationRef.PLAYER().COINS_PLAYABLES ( this.ApplicationRef.PROGRAMMA().GetSPIN_SET().GetBet() )==true)
                    {
                        over=true;
                    }
                    else if (this.ApplicationRef.GAMEPROXY().Job_Done()==true && this.GPTimer==0)
                    {
                        this.ApplicationRef.GAMEPROXY().CMD_PLAY_STATUS();

                        this.GPTimer=this.ArmaTimer(this.GPTimer,1000);
                    }
                    
                }
            }
        } break;
            
        default:break;
    };       
    
    if (over==true)
    {
        this.PopUp_Unmount();
        
        this.Step=ProgramState.STEP_FASE_EXIT;
    }
};
//------------------------------------------------------------//
StateCashBox.prototype.ActionPending = function() {
    
    return this.SetupRequest;
}
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateCashBox.prototype.StateExit = function() {
  
     ProgramState.prototype.StateExit.call(this);
    
    this.ApplicationRef.CONSOLE().OnSpinEvent(false);
};
//------------------------------------------------------------//
StateCashBox.prototype.Parse_Status = function(chunk_to_parse) {
    
    var esito=false;

    esito=this.ParseServer_Init(chunk_to_parse);
    
    if (esito==true)
    {
        if (this.ParseServer_SEEK( 2 )==false)
            return false;
        
        this.Type=this.ParseServer_Dump_UINT(-1)

        this.Min=this.ParseServer_Dump_UINT(-1)
        this.Max=this.ParseServer_Dump_UINT(-1)
        this.Title=this.ParseServer_Dump_STRING(-1)

        this.SetupRequest=true;
    }

    return esito;
}
//------------------------------------------------------------//
StateCashBox.prototype.Render = function() {
    
    var fields=false;
    
    if (this.Type==StateCashBox.ID_TYPE_CASH_HALT_STOP)
        this.PopUp_Render (this.Title,DialogBox.DIALOG_NOT_MODAL);
    else if (this.Type==StateCashBox.ID_TYPE_CASH_HALT_CHOOSE)
        this.PopUp_Render (this.Title,DialogBox.DIALOG_MODAL_OK);
    else if (this.Type==StateCashBox.ID_SUB_CASH_CONFIG_FORCE)
    {
        this.PopUp_Render (this.Title,DialogBox.DIALOG_MODAL_OK);
        fields=true;
    }
    else // StateCashBox.ID_SUB_CASH_CONFIG_CHOOSE
    {
        //m_PopUp.Render (m_Title,BitmapDB.POPUP_FIELD,DialogBox.DIALOG_MODAL_OK_CANCEL);
        fields=true;
    }
/*    
			// Crediti
			m_TextLabel_CreditoAttuale.Mount( m_PopUp.GetShape() );
			// Conto gioco:
			if (Application.GAMEPROXY().GET_DATA().GET_MESSAGES().CONTO_STRING!=null)
				m_TextLabel_CassaGiocatore.Mount( m_PopUp.GetShape() );
			
			RenderContoGioco();
			
			if(fields==true)
			{
				m_CassaVersata=m_Min;
				m_Display.SetCaption( Lib.Uint2EuroCents ( m_CassaVersata , true ) );
					
					m_TextLabel_VersamentoMin.Mount( m_PopUp.GetShape() );
					m_TextLabel_VersamentoMin.Render( Lib.Uint2EuroCents ( m_Min , true ) , SLIDER_OFFS_X-48 , SLIDER_OFFS_Y , 0);
					
					m_TextLabel_VersamentoMax.Mount( m_PopUp.GetShape() );
					m_TextLabel_VersamentoMax.Render( Lib.Uint2EuroCents ( m_Max , true ) , SLIDER_OFFS_X+12+m_Slider.width , SLIDER_OFFS_Y , 0);
					
				m_Slider.maximum = (m_Max/100); 
				m_Slider.minimum = (m_Min/100); 
				m_Slider.value = (m_Min/100); 
				m_Slider.addEventListener(SliderEvent.CHANGE, SliderChangeHandler); 
				
				m_PopUp.GetShape().addChild(m_Display);
				m_PopUp.GetShape().addChild(m_Slider);
			}
			
			m_PopUp.Mount(this,377,383);
*/    
    
    this.PopUp_Mount();    
}
//------------------------------------------------------------//
StateCashBox.prototype.RenderContoGioco = function() {
}
//------------------------------------------------------------//
StateCashBox.prototype.CassaConfigurabile = function(chunk_to_parse) {
    
    if (this.Type==StateCashBox.ID_SUB_CASH_CONFIG_FORCE||
        this.Type==StateCashBox.ID_SUB_CASH_CONFIG_CHOOSE)
        return true;
    return false;
}
//--------------------------------------------------------------------------//