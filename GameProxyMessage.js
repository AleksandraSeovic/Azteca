//------------------------------------------------------------//
GameProxyMessage.MSG_OFFSET_TYPE			=0;

    GameProxyMessage.MSG_TYPE_STATIC		=0;
    GameProxyMessage.MSG_TYPE_SCROLL		=1;
    GameProxyMessage.MSG_TYPE_EXTERN		=2;
    GameProxyMessage.MSG_TYPE_CONFIG		=3;
//------------------------------------------------------------//
GameProxyMessage.MSG_OFFSET_SUBTYPE		=1;

    GameProxyMessage.MSG_SUBTYPE_DC			=0x00;	// Don't care
    GameProxyMessage.MSG_SUBTYPE_BLOCK		=0x01;	// Bloccante
    GameProxyMessage.MSG_SUBTYPE_MODAL		=0x02;	// Modale
    GameProxyMessage.MSG_SUBTYPE_QUEUE		=0x04;	// Visualizzazione accodata,il client attende il completamento dell'azione
    //----- Messaggi di configurazione da inviare al client once-only all'inizializzazione
    GameProxyMessage.MSG_SUBTYPE_CFG_ONSPIN	=100;

    GameProxyMessage.MSG_SUBTYPE_CFG_VALUTA	=101;
    GameProxyMessage.MSG_SUBTYPE_CFG_VALUTA_AUX1	=102;
    GameProxyMessage.MSG_SUBTYPE_CFG_VALUTA_AUX2	=103;
    GameProxyMessage.MSG_SUBTYPE_CFG_VALUTA_AUX3	=104;
    GameProxyMessage.MSG_SUBTYPE_CFG_VALUTA_AUX4	=105;

    GameProxyMessage.MSG_SUBTYPE_CFG_CREDITO=106;
    GameProxyMessage.MSG_SUBTYPE_CFG_CONTO	=107;
    GameProxyMessage.MSG_SUBTYPE_CFG_EXIT_YN=108;
    GameProxyMessage.MSG_SUBTYPE_CFG_YES	=109;
    GameProxyMessage.MSG_SUBTYPE_CFG_NO		=110;
    GameProxyMessage.MSG_SUBTYPE_CFG_OK		=111;
    GameProxyMessage.MSG_SUBTYPE_CFG_CANCEL	=112;
    GameProxyMessage.MSG_SUBTYPE_CFG_FREESPINS	=113;
    GameProxyMessage.MSG_SUBTYPE_CFG_AUTOSPINS	=114;
    GameProxyMessage.MSG_SUBTYPE_CFG_PORTRAIT	=115;

//------------------------------------------------------------//
GameProxyMessage.MSG_OFFSET_TEXT			=2;


//--------------------------------------------------------------------------//
function GameProxyMessage(app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    
    //------------------------------------------------------------//
    this.IncomingMessage=null;
    
    this.OnSpin_String="";
    this.Credito_String="";
    this.Valuta_String="";

    this.Conto_String=null;
    this.OnExit_String=null;
    this.YES_String=null;
    this.NO_String=null;
    this.OK_String="OK";
    this.CANCEL_String="ANNULLA";
    this.ON_FREESPINS_String="FREE SPINS LEFT: ";
    this.ON_AUTOSPINS_String="AUTO SPINS: ";
    this.ON_PORTRAIT_String="Gira il tuo dispositivo!";
}

// Create a GameProxyMessage.prototype object that inherits from SObject.prototype.
GameProxyMessage.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to GameProxyData
GameProxyMessage.prototype.constructor = GameProxyMessage;

//--------------------------------------------------------------------------//
GameProxyMessage.prototype.ON_SPIN_MESSAGE = function() {return this.OnSpin_String;}
//--------------------------------------------------------------------------//
GameProxyMessage.prototype.ON_FREESPIN_MESSAGE = function() {return this.ON_FREESPINS_String;}
//--------------------------------------------------------------------------//
GameProxyMessage.prototype.ON_AUTOSPIN_MESSAGE = function() {return this.ON_AUTOSPINS_String;}
//--------------------------------------------------------------------------//
GameProxyMessage.prototype.ON_PORTRAIT_MESSAGE = function() {return this.ON_PORTRAIT_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.CREDITO_STRING = function() {return this.Credito_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.CONTO_STRING = function() {return this.Conto_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.VALUTA_STRING = function() {return this.Valuta_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.ON_EXIT_MESSAGE = function() {return this.OnExit_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.YES_MESSAGE = function() {return this.YES_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.NO_MESSAGE = function() {return this.NO_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.OK_MESSAGE = function() {return this.OK_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.CANCEL_MESSAGE = function() {return this.CANCEL_String;}
//------------------------------------------------------------//
GameProxyMessage.prototype.Parse_SERVER_MESSAGE = function(chunk_to_parse) {    
    
    var esito=true;
    var type=0;
    var sub_type=0;

    esito=this.ParseServer_Init(chunk_to_parse);

    if (esito==true)
    {
        type=this.ParseServer_Dump_UINT(-1);

        sub_type=this.ParseServer_Dump_UINT(-1);

        this.IncomingMessage=this.ParseServer_Dump_STRING(-1);

        this.IncomingMessage=Lib.strReplace(this.IncomingMessage,"|",",");
        this.IncomingMessage=Lib.strReplace(this.IncomingMessage,"-","\n");

        if (type==GameProxyMessage.MSG_TYPE_STATIC)
            this.ApplicationRef.SLOT().CONSOLE().SetStaticDisplay(this.IncomingMessage,((sub_type&GameProxyMessage.MSG_SUBTYPE_QUEUE)!=0));
        //else if (type==GameProxyMessage.MSG_TYPE_SCROLL)
            //this.ApplicationRef.SLOT().CONSOLE().SetScrollDisplay(m_IncomingMessage);
        else if (type==GameProxyMessage.MSG_TYPE_EXTERN)
            this.ApplicationRef.PROGRAMMA().GetALLARMI().AddAllarmeServer(this.IncomingMessage,((sub_type&GameProxyMessage.MSG_SUBTYPE_MODAL)!=0));
        else if (type==GameProxyMessage.MSG_TYPE_CONFIG)
        {
            switch (sub_type)
            {
                case GameProxyMessage.MSG_SUBTYPE_CFG_ONSPIN	:{this.OnSpin_String	=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_CREDITO   :{this.Credito_String	=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_CONTO	    :{this.Conto_String	    =this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_VALUTA    :{this.Valuta_String	=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_EXIT_YN   :{this.OnExit_String	=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_YES	    :{this.YES_String		=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_NO		:{this.NO_String		=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_OK		:{this.OK_String		=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_CANCEL	:{this.CANCEL_String	=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_FREESPINS	:{this.ON_FREESPINS_String	=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_AUTOSPINS	:{this.ON_AUTOSPINS_String	=this.IncomingMessage;}break;
                case GameProxyMessage.MSG_SUBTYPE_CFG_PORTRAIT	:{this.ON_PORTRAIT_String	=this.IncomingMessage;}break;

                default:break;
            }
        }
    }

    return true;
}
//--------------------------------------------------------------------------//