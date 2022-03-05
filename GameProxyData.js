//--------------------------------------------------------------------------//
function GameProxyData(app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ProxyMessage=new GameProxyMessage(app_reference);
    

    //------------------------------------------------------------//
    // Outgoing parms
    this.PICK_BONUS=0;
    this.USER_SETTING_ID=0;
    this.USER_SETTING_VALUE=0;
    this.ID_BONUS=0;
    this.ACTION_BONUS=0;
    this.PARSER_ERROR_Description="";
    
    this.PARSED_DATA=null;
    
    this.ReelsSplash=true;
}

// Create a GameProxyData.prototype object that inherits from SObject.prototype.
GameProxyData.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to GameProxyData
GameProxyData.prototype.constructor = GameProxyData;

//--------------------------------------------------------------------------//
GameProxyData.prototype.Init = function() {

    //m_pProxyMessage.Init();
}
//--------------------------------------------------------------------------//
GameProxyData.prototype.Reset = function() {

    //m_pProxyMessage.Reset();
    
    this.ID_BONUS=0;
    this.ACTION_BONUS=0;

    this.PARSER_ERROR_Description="";
    
}
//------------------------------------------------------------//
GameProxyData.prototype.CheckConnectionParms = function() {    

    if (DES_Signature_SESSION==null)
        return false;
    if (DES_Signature_IP==null)
        return false;
    if (DES_Signature_PORT==null)
        return false;
    
    return true;
}
//------------------------------------------------------------//
GameProxyData.prototype.ParseIncomingData = function(datastring) {    
    
    if (datastring==null)
    {
        this.PARSER_ERROR_Description="Incoming data null";

        return false;
    }

    var pure_data=datastring.split(/\n/);

    if (pure_data==null)
    {
        this.PARSER_ERROR_Description="Split newline data null";
        return false;
    }
    
    this.PARSED_DATA=pure_data[0].split(";");

    if (this.PARSED_DATA==null)
    {
        this.PARSER_ERROR_Description="Split dot-comma data null";
        return false;
    }

    return this.ParseChunks();
}

//------------------------------------------------------------//
GameProxyData.prototype.ParseChunks = function() {    
    
    var ok=true;
    var i=0;

    while (i<this.PARSED_DATA.length-1)
    {
        ok=this.ParseChunk(this.PARSED_DATA[i++]);

        if (ok==false)
            break;
    }

    return ok;
}
//------------------------------------------------------------//
GameProxyData.prototype.ParseChunk = function(chunk) {    
    
    var chunk_parms=null;
    var esito=false;


    chunk_parms=chunk.split(",");

    if (chunk_parms==null)
        return false;
    
    if (chunk_parms.length==0)
        return false;

    if (chunk_parms[0].indexOf("\n")!=-1)	
        return true;

    // Player Status
    if (chunk_parms[0]=="PS")	
        esito=this.ApplicationRef.PLAYER().Parse_PLAYER_STATUS ( chunk );
    // Configurazione Status
    else if (chunk_parms[0]=="CS")	
        esito=this.Parse_CONFIG_STATUS ( chunk );
    // Coin Value Table
    else if (chunk_parms[0]=="CVT")	
        esito=this.ApplicationRef.PLAYER().Parse_COIN_VALUES ( chunk );
    // Reel Status
    else if (chunk_parms[0]=="RS")
    {    
        esito=this.ApplicationRef.SLOT().Parse_REEL_STATUS( chunk );
    
        if (this.ReelsSplash==true)
            this.ApplicationRef.SLOT().REEL_HOLDER().Splash();
        
        this.ReelsSplash=false;
    }
    // Bonus Status
    else if (chunk_parms[0]=="BS")
        esito=this.ApplicationRef.SLOT().Parse_BONUS_STATUS( chunk );
    // Paytable
    else if (chunk_parms[0]=="PT")
    {
        esito=this.ApplicationRef.SLOT().SLOT_COMBO().Parse_PAY_TABLE( chunk );
        
        //this.ApplicationRef.SLOT().PAYTABLE().Renderize();
    }
    // Win Pattern
    else if (chunk_parms[0]=="WP")
        esito=this.ApplicationRef.SLOT().SLOT_COMBO().Parse_WIN_PATTERN( chunk );
    // Messaggio
    else if (chunk_parms[0]=="MSG")
        esito=this.ProxyMessage.Parse_SERVER_MESSAGE ( chunk );
    // AES key
    else if (chunk_parms[0]=="KEY")
        esito=this.Parse_AES_KEY ( chunk );
    // Caratterizzazione
    else if (chunk_parms[0]=="CAR")
        esito=this.Parse_CARATTERIZZAZIONE ( chunk );
    // Logout
    else if (chunk_parms[0]=="LOGOUT")
        esito=this.ApplicationRef.PROGRAMMA().Parse_SERVER_LOGOUT( chunk );
    else 
        esito=false;

    return esito;
}
//------------------------------------------------------------//
GameProxyData.prototype.Parse_CONFIG_STATUS = function(chunk_to_parse) {    
    
    var esito=false;
    var type=0;

    esito=this.ParseServer_Init(chunk_to_parse);

    if (esito==true)
    {
        type=this.ParseServer_Dump_UINT(-1);

        switch (type)
        {
            case StateCashBox.CMD_VERSAMENTO_CASSA:{ esito=this.ApplicationRef.PROGRAMMA().GetVERSAMENTO_CASSA().Parse_Status(chunk_to_parse);}break;

            default:{esito=false;}break;
        }
    }
    return esito;
}
//------------------------------------------------------------//
GameProxyData.prototype.Parse_AES_KEY = function(chunk_to_parse) {    

    var esito=this.ParseServer_Init(chunk_to_parse);
    
    if (esito==true)
    {
        var STRING_KEY=this.ParseServer_Dump_STRING(-1);

        if (STRING_KEY==null)
            esito=false;
        else
            DES_UpdateKey(STRING_KEY);
    }

    return esito;
}
//------------------------------------------------------------//
GameProxyData.prototype.Parse_CARATTERIZZAZIONE = function(chunk_to_parse) {    

    var esito=this.ParseServer_Init(chunk_to_parse);
    
    if (esito==true)
    {
        // For Fun
        window.DEMO_PLAY=this.ParseServer_Dump_UINT(-1);
        
        // Language
        window.LANG=this.ParseServer_Dump_UINT(-1);
    }

    return esito;
}
//------------------------------------------------------------//
GameProxyData.prototype.GET_MESSAGES = function() { return this.ProxyMessage;}
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//