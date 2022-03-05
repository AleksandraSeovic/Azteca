ButtonManager.NUM_PULSANTI=19;
//------------------------------------------------------------//
ButtonManager.PULSANTE_RILASCIATO   =0;	// 0. Pulsante rilsciato
ButtonManager.PULSANTE_PREMUTO      =1;	// 1. Pulsante premuto
//------------------------------------------------------------//
ButtonManager.BUTT_BET_INC		    =0;
ButtonManager.BUTT_BET_DEC		    =1;
ButtonManager.BUTT_LINES_INC		=2;
ButtonManager.BUTT_LINES_DEC		=3;
ButtonManager.BUTT_COINLEVEL_INC	=4;
ButtonManager.BUTT_COINLEVEL_DEC	=5;

ButtonManager.BUTT_START            =6;
ButtonManager.BUTT_MAXBET           =7;

ButtonManager.BUTT_FEATURE          =8;
ButtonManager.BUTT_FREESPIN	        =9;
ButtonManager.BUTT_HELP             =10;
ButtonManager.BUTT_AUTO             =11;

ButtonManager.BUTT_EURO_SET	        =12;
ButtonManager.BUTT_COIN_SET	        =13;

ButtonManager.BUTT_SOUND            =14;

ButtonManager.BUTT_CASH_SET	        =15;

ButtonManager.BUTT_DEMO_FEATURE_1	=16;
ButtonManager.BUTT_DEMO_FEATURE_2	=17;

ButtonManager.BUTT_EXIT	            =18;

ButtonManager.BUTT_ALLBET_INC       =19;
ButtonManager.BUTT_ALLBET_DEC       =20;

//--------------------------------------------------------------------------//
function ButtonManager() {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.StatoCorrente	= new Array(ButtonManager.NUM_PULSANTI);
    this.StatoCorrente.fill(0);

    this.StatoPrecedente= new Array(ButtonManager.NUM_PULSANTI);
    this.StatoPrecedente.fill(0);
}

// Create a SlotConsole.prototype object that inherits from SObject.prototype.
ButtonManager.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotConsole
ButtonManager.prototype.constructor = ButtonManager;
//------------------------------------------------------------//
ButtonManager.prototype.IsPushed = function(p_IDButton) {

    if (this.StatoCorrente[p_IDButton] == ButtonManager.PULSANTE_RILASCIATO)
    {
        this.StatoPrecedente[p_IDButton] = ButtonManager.PULSANTE_RILASCIATO;
        return false;
    }

    if (this.StatoCorrente[p_IDButton] != this.StatoPrecedente[p_IDButton])
    {
        this.StatoCorrente  [p_IDButton] = ButtonManager.PULSANTE_RILASCIATO;
        this.StatoPrecedente[p_IDButton] = ButtonManager.PULSANTE_RILASCIATO;
        return true;
    }

    return false;
}
//------------------------------------------------------------//
ButtonManager.prototype.NotifyStymulus = function(p_IDButton) {

    this.StatoCorrente[p_IDButton]=ButtonManager.PULSANTE_PREMUTO;
}
//------------------------------------------------------------//
