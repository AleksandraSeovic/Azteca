//*******************************************************************
// Tipo di Bonus: FREESPIN
//*******************************************************************
BonusDescriptor.ID_BONUS_FREESPIN				=1;
    //------------------------------------------------------------//
    // Azioni Bonus
    BonusDescriptor.BS_ACTION_FREESPIN_SPIN	=1;
    BonusDescriptor.BS_ACTION_FREESPIN_PICK =2;
    //------------------------------------------------------------//
    // STATO del Bonus (Server => Client) [offset nel messaggio]
    BonusDescriptor.BS_OFFSET_FREESPIN_TIRO	=2;
    BonusDescriptor.BS_OFFSET_FREESPIN_TIRI	=3;
    BonusDescriptor.BS_OFFSET_FREESPIN_MULTY=4;
    BonusDescriptor.BS_OFFSET_FREESPIN_MAGIC=5;
    BonusDescriptor.BS_OFFSET_FREESPIN_WIN	=6;

//*******************************************************************
// Tipo di Bonus: BONUS A SCELTA MULTIPLA
//*******************************************************************
BonusDescriptor.ID_BONUS_PICK					=2;

    //*******************************************************************
    // Azioni Bonus (Client => Server)
    //*******************************************************************
    BonusDescriptor.BS_ACTION_BONUS_PICK		=1;	//  Il giocatore clicca
    //------------------------------------------------------------//



    //*******************************************************************
    // STATO del Bonus (Server => Client) [offset nel messaggio]
    //*******************************************************************

    BonusDescriptor.BS_OFFSET_ID_BONUS		=1;	// ID del BONUS
    BonusDescriptor.BS_OFFSET_PICK_WIN		=2;	// Vincita parziale
    BonusDescriptor.BS_OFFSET_PICK_NUM		=3;	// Pick
    BonusDescriptor.BS_OFFSET_PICK_FLOOR	=4;	// Livello
    BonusDescriptor.BS_OFFSET_PICK_JP       =5;	// JP

    //[
        // Struct dati replicato in sequenza per ogni pick previsto dal bonus
        BonusDescriptor.BS_OFFSET_PICK_STATUS		=6;	// Stato del bersaglio
        BonusDescriptor.BS_OFFSET_PICK_OBJECT		=7;	// Simbolo contenuto dal bersaglio
        BonusDescriptor.BS_OFFSET_PICK_VALUE		=8;	// Valore contenuto dal bersaglio
    //]

    //.......


    //*******************************************************************
    // Stati possibili per i pick
    //*******************************************************************
    BonusDescriptor.BONUS_PICK_DISABLED			=0;	// Pick NON DISPONIBILE
    BonusDescriptor.BONUS_PICK_ENABLED			=1;	// Pick DISPONIBILE
    BonusDescriptor.BONUS_PICK_OPENING_REAL		=2;	// Pick in apertura con premio reale
    BonusDescriptor.BONUS_PICK_OPENING_FAKE		=3;	// Pick in apertura con premio fasullo
    BonusDescriptor.BONUS_PICK_OPENED			=4;	// Pick APERTO

    //----------------------------
    // Oggetti possibili per i pick
    //----------------------------
    BonusDescriptor.BONUS_PICK_OBJ_UNDEF	=0;	// Indefinito
    BonusDescriptor.BONUS_PICK_OBJ_DEATH	=1;	// Morte
    BonusDescriptor.BONUS_PICK_OBJ_LEVELUP	=2;	// Level Up 
    BonusDescriptor.BONUS_PICK_OBJ_PRIZE	=3;	// Premio
    //--- FORCED -----------------------------------
    BonusDescriptor.BONUS_PICK_OBJ_JP       =4;	// JP


    //----------------------------------------------------------------------

//*******************************************************************
// Tipo di Bonus: BONUS CARTE
//*******************************************************************
BonusDescriptor.ID_BONUS_AFRICA					=3;

//--------------------------------------------------------------------------//
function BonusDescriptor() {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our BonusDescriptor-specific properties
}

// Create a BonusDescriptor.prototype object that inherits from SObject.prototype.
BonusDescriptor.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to BonusDescriptor
BonusDescriptor.prototype.constructor = BonusDescriptor;
//--------------------------------------------------------------------------//

