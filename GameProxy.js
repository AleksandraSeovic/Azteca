//------------------------------------------------------------//
GameProxy.PROXY_TIME_OUT    		=(30*1000);
//------------------------------------------------------------//
GameProxy.STATE_BOOT				=0;
GameProxy.STATE_SETUP				=10;
GameProxy.STATE_TO_INITIALIZE		=20;
GameProxy.STATE_CONNECTION		    =30;
GameProxy.STATE_INIT_GAME			=40;
GameProxy.STATE_PLAY_BET			=50;
GameProxy.STATE_PLAY_BONUS		    =60;
GameProxy.STATE_PLAY_FREESPIN		=70;
GameProxy.STATE_PLAY_STATUS		    =80;
GameProxy.STATE_USER_SETTING		=90;
GameProxy.STATE_USER_SETTING_REQ	=100;
GameProxy.STATE_USER_BET_VALIDATE	=105;
GameProxy.STATE_LOGOUT			    =106;


GameProxy.STATE_WAIT_REPLY		    =110;

GameProxy.STATE_IDLE				=200;
GameProxy.STATE_ERROR				=210;
//--------------------------------------------------------------------------//
function GameProxy(app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our GameProxy-specific properties
    this.ApplicationRef = app_reference;
    this.PlayerRef      = null;
    
    this.Socket=new GameProxySocket(app_reference);
    this.Data=new GameProxyData(app_reference);
    
    this.DemoFeature=-1;
    this.Stato=0;
    this.Last_Request="";
    this.WhyError="";
    this.Retry=1;
    this.ConnectionTimeOut=false;
    this.ContentLoaded=false;
}

// Create a GameProxy.prototype object that inherits from SObject.prototype.
GameProxy.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to GameProxy
GameProxy.prototype.constructor = GameProxy;

//--------------------------------------------------------------------------//
GameProxy.prototype.Init = function() {
    
    this.PlayerRef = this.ApplicationRef.PLAYER();

    this.Data.Init();
}
//--------------------------------------------------------------------------//
GameProxy.prototype.Reset = function() {
    
    this.Data.Reset();
}
//--------------------------------------------------------------------------//
GameProxy.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);
    
    if (this.IsOffline()==true)
    {
        this.Goto_State(GameProxy.STATE_IDLE);
    }
    else
    {
        switch (this.Stato)
        {
            //------------------------------------------------------------//
           case GameProxy.STATE_BOOT:
            {
                this.Goto_State(GameProxy.STATE_SETUP);
            }break;
            //------------------------------------------------------------//
            // Setup
            case GameProxy.STATE_SETUP:
            {
                this.Setup_Parms();

                this.Goto_State (GameProxy.STATE_CONNECTION);
            }break;
            //------------------------------------------------------------//
            // Waiting for all being loaded before initialize
            case GameProxy.STATE_TO_INITIALIZE:
            {
                if (this.ContentLoaded==true)
                    this.Goto_State (GameProxy.STATE_INIT_GAME+1);
            }break;
            //------------------------------------------------------------//
            // Socket connection
            case GameProxy.STATE_CONNECTION:
            {
                this.Socket.Setup_Connection();

                this.GPTimer=this.ArmaTimer(this.GPTimer,GameProxy.PROXY_TIME_OUT);
                
                this.Goto_State (GameProxy.STATE_INIT_GAME);
            }break;
            //------------------------------------------------------------//
            // Game init #1
            case GameProxy.STATE_INIT_GAME:
            {
                if (this.Socket.IsConnected()==true)
                {
                    this.Init_Game();

                    this.Goto_State (GameProxy.STATE_TO_INITIALIZE);
                }
                else
                {
                    if (this.GPTimer==0)
                    {
                        this.Goto_Error(StateAlarm.ID_ALARM_SERVER_TIMEOUT);
                    }
                }
            }break;
            //------------------------------------------------------------//
            // Game init #2
            case GameProxy.STATE_INIT_GAME+1:
            {
                // Risposta giunta?
                if (this.CheckForReply()==true)
                {
                    if (this.Parse()==false)
                    {
                        this.Goto_Error(StateAlarm.ID_ALARM_SERVER_PARSER);
                    }
                    else
                    {
                        // Completate tutte le info per ripartire,propaga il messaggio
                        // per ripartire
                        this.ApplicationRef.Recover();

                        this.Goto_State (GameProxy.STATE_IDLE);
                    }
                }

            }break;
            //------------------------------------------------------------//
            // Play Bet
            case GameProxy.STATE_PLAY_BET:
            {
                this.Play_Bet();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;
            //------------------------------------------------------------//
            // Play Bonus
            case GameProxy.STATE_PLAY_BONUS:
            {
                this.Play_Bonus();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;
            //------------------------------------------------------------//
            // Play Freespin
            case GameProxy.STATE_PLAY_FREESPIN:
            {
                this.Play_Freespin();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;
            //------------------------------------------------------------//
            // Play Status
            case GameProxy.STATE_PLAY_STATUS:
            {
                this.Play_Status();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;
            //------------------------------------------------------------//
            // User Setting
            case GameProxy.STATE_USER_SETTING:
            {
                this.User_Setup();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;
            //------------------------------------------------------------//
            // User Setting Request
            case GameProxy.STATE_USER_SETTING_REQ:
            {
                this.User_Setup_Request();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;

            //------------------------------------------------------------//
            // User Setting Request
            case GameProxy.STATE_USER_BET_VALIDATE:
            {
                this.User_Bet_Validate();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;

            //------------------------------------------------------------//
            // User Setting Request
            case GameProxy.STATE_LOGOUT:
            {
                this.LogOut();

                this.Goto_State (GameProxy.STATE_WAIT_REPLY);
            }break;
            //------------------------------------------------------------//
            case GameProxy.STATE_WAIT_REPLY:
            {
                // Risposta giunta?
                if (this.CheckForReply()==true)
                {
                    if (this.Parse()==false)
                    {
                        this.Goto_Error(StateAlarm.ID_ALARM_SERVER_PARSER);
                    }
                    else
                    {
                        this.Goto_State (GameProxy.STATE_IDLE);
                    }
                }
            }break;
            //------------------------------------------------------------//
            case GameProxy.STATE_IDLE:{}break;
            //------------------------------------------------------------//
            case GameProxy.STATE_ERROR:{}break;
            //------------------------------------------------------------//
            default:break;
        }
    }
}

//------------------------------------------------------------//
GameProxy.prototype.NOTIFY_LOADED_EVENT = function() 
{    
    this.ContentLoaded=true;
}
//------------------------------------------------------------//
GameProxy.prototype.NOTIFY_PLAY_BET = function() {    
    
    this.Goto_State (GameProxy.STATE_PLAY_BET);
}
//------------------------------------------------------------//
GameProxy.prototype.NOTIFY_PLAY_BONUS = function(id_bonus,id_action,id_pick) {            
    this.Data.ID_BONUS=id_bonus;
    this.Data.ACTION_BONUS=id_action;
    this.Data.PICK_BONUS=id_pick;
    this.Goto_State (GameProxy.STATE_PLAY_BONUS);
}
//------------------------------------------------------------//
GameProxy.prototype.NOTIFY_PLAY_FREESPIN = function(id_bonus,id_action) {            
    this.Data.ID_BONUS=id_bonus;
    this.Data.ACTION_BONUS=id_action;
    this.Goto_State (GameProxy.STATE_PLAY_FREESPIN);
}
//------------------------------------------------------------//
// Richiede il rinfresco dei dati del player
GameProxy.prototype.CMD_PLAY_STATUS = function() {        
    this.Goto_State (GameProxy.STATE_PLAY_STATUS);
}
//------------------------------------------------------------//
// Richiede il rinfresco dei dati del player,filtrando solo 
// i coins
GameProxy.prototype.CMD_CREDIT_STATUS = function() {            
    
    this.PlayerRef.REFRESH_COINS(true);

    this.Goto_State (GameProxy.STATE_PLAY_STATUS);
}
//------------------------------------------------------------//
// Richiede la chisura della sessione
GameProxy.prototype.CMD_LOGOUT = function() {        
    this.Goto_State (GameProxy.STATE_LOGOUT);
}
//------------------------------------------------------------//
GameProxy.prototype.GET_DATA = function() {
    return this.Data;
}
//--------------------------------------------------------------------------//
GameProxy.prototype.STATO = function() {
    return this.Stato;
}
//------------------------------------------------------------//
GameProxy.prototype.WHY_ERROR = function() {
    return this.WhyError;
}
//--------------------------------------------------------------------------//
GameProxy.prototype.DEMO_FEATURE_GET = function() {
    return this.DemoFeature;
}
//--------------------------------------------------------------------------//
GameProxy.prototype.DEMO_FEATURE_SET = function(val) {
    this.DemoFeature=val;
}
//------------------------------------------------------------//
// Il client richiede la validazione per il bet corrente
GameProxy.prototype.CMD_USER_BET_VALIDATE = function(bet_value) {    
    
    this.Data.USER_SETTING_ID=StateCashBox.CFG_PLAYER_BET;
    this.Data.USER_SETTING_VALUE=bet_value;

    this.Goto_State (GameProxy.STATE_USER_BET_VALIDATE);
}
//------------------------------------------------------------//
GameProxy.prototype.Setup_Parms = function() {    

    var alarm=false;
    
    if (window.CONNECT2SERVER==true)
    {    
        if (this.Data.CheckConnectionParms()==false)
        {			
            alarm=true;
        }

        if (alarm==true)			
        {
            // "Invalid parameters"
            this.Goto_Error(StateAlarm.ID_ALARM_PARAMETERS,external_parameter);
        }
    }
}
//------------------------------------------------------------//
GameProxy.prototype.CheckForReply = function() {    

    // Risposta giunta?
    if (this.WaitForReply()==false && this.ConnectionTimeOut==false)
    {
        return true;
    }
    else
    {
        if (this.TimeOut()==true) 
        {
            if (--this.Retry==0)
                this.Goto_Error(StateAlarm.ID_ALARM_SERVER_TIMEOUT);
            else
                this.Socket.SendService(this.Last_Request);
        }
    }

    return false;
}
//------------------------------------------------------------//
GameProxy.prototype.Goto_State = function(goto) {        

    if (this.Stato!=GameProxy.STATE_ERROR)
        this.Stato=goto;
}
//------------------------------------------------------------//
GameProxy.prototype.Goto_Error = function(alarm_to_raise) {
    
    //if (str_desc!=null)
        //this.WhyError=str_desc;

    this.ApplicationRef.PROGRAMMA().GetALLARMI().AddAllarme(alarm_to_raise);

    this.Stato=GameProxy.STATE_ERROR;
}
//------------------------------------------------------------//
GameProxy.prototype.TimeOut = function() {        
    
    return this.ConnectionTimeOut;
}
//------------------------------------------------------------//
GameProxy.prototype.Job_Done = function() {        

    return (this.Stato==GameProxy.STATE_IDLE);
}
//------------------------------------------------------------//
GameProxy.prototype.IsIdle = function() {        

    return (this.Stato==GameProxy.STATE_IDLE || this.Stato==GameProxy.STATE_ERROR);
}
//------------------------------------------------------------//
GameProxy.prototype.Init_Game = function() {
    
    this.SendServerRequest("InitGame",null);
}
//------------------------------------------------------------//
GameProxy.prototype.Play_Bet = function() {
    if (this.DemoFeature!=-1)
    {
        this.SendServerRequest("PlayBet",this.PlayerRef.LINES()+","+this.PlayerRef.BET_LINE()+","+this.PlayerRef.COIN_VALUE_GET()+","+this.DemoFeature+";\n");
        this.DemoFeature=-1;
    }
    else
        this.SendServerRequest("PlayBet",this.PlayerRef.LINES()+","+this.PlayerRef.BET_LINE()+","+this.PlayerRef.COIN_VALUE_GET()+";\n");
}
//------------------------------------------------------------//
GameProxy.prototype.Play_Bonus = function() {
    
    this.SendServerRequest("PlayBonus",this.PlayerRef.LINES()+","+this.PlayerRef.BET_LINE()+","+this.PlayerRef.COIN_VALUE_GET()+","+this.Data.ID_BONUS+","+this.Data.ACTION_BONUS+","+this.Data.PICK_BONUS+";\n");
}
//------------------------------------------------------------//
GameProxy.prototype.Play_Freespin = function() {  
    
    this.SendServerRequest("PlayBonus",this.PlayerRef.LINES()+","+this.PlayerRef.BET_LINE()+","+this.PlayerRef.COIN_VALUE_GET()+","+this.Data.ID_BONUS+","+this.Data.ACTION_BONUS+";\n");
}
//------------------------------------------------------------//
GameProxy.prototype.Play_Status = function() {    
    
    this.SendServerRequest("PlayStatus",null);
}
//------------------------------------------------------------//
// Il client invia al server il valore impostato per la configurazione del parametro dato
GameProxy.prototype.User_Setup = function() {    
    
    this.SendServerRequest("UserSetting",this.Data.USER_SETTING_ID+","+this.Data.USER_SETTING_VALUE+";\n");
}
//------------------------------------------------------------//
// Il client richiede l'accesso alla configurazione data
GameProxy.prototype.User_Setup_Request = function() {    
    
    this.SendServerRequest("UserSetting",this.Data.USER_SETTING_ID()+";\n");
}
//------------------------------------------------------------//
// Il client richiede la disconnessione
GameProxy.prototype.LogOut = function() {    

    this.SendServerRequest("LogOut",null);
    
    this.Socket.Close_Connection();
}
//------------------------------------------------------------//
GameProxy.prototype.IsOffline = function() {  
    
    if (window.CONNECT2SERVER==false)
    {
        return true;
    }
    return false;
}
//------------------------------------------------------------//
GameProxy.prototype.Parse = function() {
    
    var incoming_data=this.Socket.SERVER_REPLY();

    if (this.Data.ParseIncomingData( incoming_data )==false)
        return false;
    
    return true;
}
//------------------------------------------------------------//
GameProxy.prototype.WaitForReply = function() {

    if (this.Socket.REPLY_RECEIVED()==true)
        return false;

    if (window.LOCAL_TEST==false)
    {
        if (this.GPTimer==0)
        {
            this.ConnectionTimeOut=true;
            return false;
        }
    }
    return true;
}
//------------------------------------------------------------//
GameProxy.prototype.SendServerRequest = function(service,service_parms) {     
    
    var body_message_string;
    
    if (service_parms!=null)
        body_message_string=service+","+window.TOKEN+","+service_parms+";\n";
    else
        body_message_string=service+","+window.TOKEN+";\n";
    
    this.Last_Request=body_message_string;
    
    this.Socket.SendService(this.Last_Request);			

    this.GPTimer=this.ArmaTimer(this.GPTimer,GameProxy.PROXY_TIME_OUT);
    
    this.ConnectionTimeOut=false;
}
//------------------------------------------------------------//
// Il client richiede la validazione del bet corrente
GameProxy.prototype.User_Bet_Validate = function() {
 
    var lines,line_bet,total_bet;

    total_bet=this.Data.USER_SETTING_VALUE;

    lines=this.ApplicationRef.SLOT().LINES();

    line_bet=parseInt ( (total_bet/lines) );

    this.SendServerRequest("UserSetting",this.Data.USER_SETTING_ID+","+lines+","+line_bet+","+this.PlayerRef.COIN_VALUE_GET()+";\n");
}
//--------------------------------------------------------------------------//