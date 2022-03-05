//------------------------------------------------------------//
StateAlarm.ID_ALARM_NONE					=0;
StateAlarm.ID_ALARM_SERVER_TIMEOUT			=1;
StateAlarm.ID_ALARM_SESSION_CLOSED      	=2;
StateAlarm.ID_ALARM_SERVER_PARSER			=3;
StateAlarm.ID_ALARM_IO_ERROR				=4;
StateAlarm.ID_ALARM_COMM_ERROR				=5;
StateAlarm.ID_ALARM_SERVER_CLOSE_COMM		=6;
StateAlarm.ID_ALARM_CONNECTION_ERROR		=8;
StateAlarm.ID_ALARM_PARAMETERS				=9;
StateAlarm.ID_ALARM_SECURITY_FOR_LOCAL		=10;
StateAlarm.ID_ALARM_TIME_OUT				=11;
StateAlarm.ID_ALARM_EXIT					=12;
StateAlarm.ID_ALARM_PORTRAIT				=13;
//------------------------------------------------------------//
StateAlarm.ID_ALARM_FROM_SERVER			    =14;


//--------------------------------------------------------------------------//
function StateAlarm(app_reference,slot_ref) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    ProgramState.call(this,app_reference,slot_ref);
    
    
    this.AlarmID=StateAlarm.ID_ALARM_NONE;
    this.ExitInvoked=false;

    this.ServerAlarm_Text=null;
    this.ServerAlarm_Modal=false;
    
    this.LandscapePopup = null;
}

// Create a StateAlarm.prototype object that inherits from ProgramState.prototype.
StateAlarm.prototype = Object.create(ProgramState.prototype); // See note below

// Set the "constructor" property to refer to StateAlarm
StateAlarm.prototype.constructor = StateAlarm;
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateAlarm.prototype.Reset = function() {
    
    ProgramState.prototype.Reset.call(this);

    this.AlarmID=StateAlarm.ID_ALARM_NONE;
};

//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateAlarm.prototype.StateInit = function() {
  
    ProgramState.prototype.StateInit.call(this);
    
    this.DEBUG_LOG("Spin set state init");
};
//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateAlarm.prototype.StateBody = function(ellapsed_ms) {
  
    var alarm_txt="";
    var modal=0;
    
    ProgramState.prototype.StateBody.call(this,ellapsed_ms);
    
    if (this.ExitInvoked==true)
    {
        //fscommand("quit");
        window.close();
        return;
    }

    switch (this.SottoStep)
    {
        case ProgramState.ID_SOTTOSTEP_0:
        {
            if (this.AlarmID!=0)
            {
                if (this.AlarmID==StateAlarm.ID_ALARM_PORTRAIT)
                {       
                    if (this.LandscapePopup == null)
                    {
                        this.LandscapePopup = new TiledSprite("LandScapeBox",1,false,this.PopUp.GetContainer(),'.webp');

                        this.LandscapePopup.Setup();
                        
                        this.LandscapePopup.CenterBoxOnSprite(this.PopUp.GetShape());
                    }
                    
                    alarm_txt=this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().ON_PORTRAIT_MESSAGE();
                    
                    this.LandscapePopup.Visible(true);
                    
                    modal=DialogBox.DIALOG_MODAL_OK;
                }
                else
                {       
                    //alarm_txt="[ "+this.AlarmID.toString()+"/"+this.ApplicationRef.GAMEPROXY().STATO()+"/"+this.ApplicationRef.GAMEPROXY().WHY_ERROR()+" ] ";

                    alarm_txt="";

                    if (this.AlarmID==StateAlarm.ID_ALARM_FROM_SERVER)
                    {
                        alarm_txt+=this.ServerAlarm_Text;

                        if (this.ServerAlarm_Modal==true)
                            modal=DialogBox.DIALOG_MODAL_OK;
                    }
                    else if (this.AlarmID==StateAlarm.ID_ALARM_SESSION_CLOSED)
                    {
                        alarm_txt+="Sessione di gioco chiusa.";
                        modal=DialogBox.DIALOG_NOT_MODAL;
                    }
                    else
                    {
                        alarm_txt+="Errore di connessione";
                        alarm_txt+=" ( "+this.AlarmID.toString()+" ).";
                        modal=DialogBox.DIALOG_NOT_MODAL;
                    }

                    this.ApplicationRef.SOUNDGENERATOR().Stop();
                }
                
                this.PopUp_Render (alarm_txt,modal);
                
                if (this.AlarmID==StateAlarm.ID_ALARM_PORTRAIT)
                {       
                    this.PopUp.GetTextDisplay().DisplayText.y=380;
                }   

                this.PopUp_Mount();

                this.SottoStep++;
            }
        } break;

        case ProgramState.ID_SOTTOSTEP_1:
        {
            if (this.AlarmID==StateAlarm.ID_ALARM_PORTRAIT)
            {       
                if (this.ApplicationRef.IsMobile()==true)
                {
                    if (this.ApplicationRef.IsPortrait()==false || this.PopUp_Refresh()!=DialogBox.DIALOG_EXIT_NONE)
                    {
                        this.PopUp_Unmount();
                        
                        this.LandscapePopup.Visible(false);

                        this.SottoStep++;
                    }
                }        
            }
            else
            {       
                if (this.PopUp_Refresh()!=DialogBox.DIALOG_EXIT_NONE)
                {
                    this.PopUp_Unmount();

                    this.SottoStep++;
                }
            }
        }break;

        case ProgramState.ID_SOTTOSTEP_2:
        {
            if (this.ApplicationRef.GAMEPROXY().IsIdle()==true)
            {
                this.ApplicationRef.GAMEPROXY().CMD_PLAY_STATUS();

                this.SottoStep++;
            }
        }break;

        case ProgramState.ID_SOTTOSTEP_3:
        {
            if (this.ApplicationRef.GAMEPROXY().IsIdle()==true)
            {
                this.AlarmID=0;

                this.Step=ProgramState.STEP_FASE_EXIT;
            }
        }break;

        default:break;
    }
};

//--------------------------------------------------------------------------//
// Virtual superclass re-inplmentation
StateAlarm.prototype.StateExit = function() {
  
     ProgramState.prototype.StateExit.call(this);
};
//------------------------------------------------------------//
StateAlarm.prototype.AddAllarme = function(alarm_id) {    
    if (this.AlarmID==0)
    {
        this.AlarmID=alarm_id;
    }
}		
//------------------------------------------------------------//
StateAlarm.prototype.AddAllarmeServer = function(txt,modal) {        
    this.AlarmID=StateAlarm.ID_ALARM_FROM_SERVER;
    this.ServerAlarm_Text=txt;
    this.ServerAlarm_Modal=modal;
}		
//------------------------------------------------------------//
StateAlarm.prototype.EXIT_INVOKED_SET = function(enb) {        
    this.ExitInvoked=enb;
}
//------------------------------------------------------------//
StateAlarm.prototype.EXIT_INVOKED_GET = function() {        
    return this.ExitInvoked;
}
//------------------------------------------------------------//
StateAlarm.prototype.IsAllarmePendente = function() {        
    return (this.AlarmID!=0);
}

//--------------------------------------------------------------------------//