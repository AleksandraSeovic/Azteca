//------------------------------------------------------------//
Program.NUM_FASI=5;

Program.ID_FASE_ACCENSIONE	=0;				// 0. Fase di Accensione
Program.ID_FASE_GAMEOVER	=1;				// 1. Fase di Game Over
Program.ID_FASE_AVVIO		=2;				// 2. Fase di Avvio della partita
Program.ID_FASE_PARTITA		=3;				// 3. Fase di Partita
Program.ID_FASE_ALLARMI		=4;				// 4. Fase di Gestione allarmi

//--------------------------------------------------------------------------//
function Program(app_reference) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.MainRenderer   = this.ApplicationRef.Renderer;
    
    this.Slot = new Slot(app_reference);
    
    this.States= new Array(Program.NUM_FASI);
    
    this.States[Program.ID_FASE_ACCENSIONE]=new StateBoot(this.ApplicationRef,this.Slot);
    this.States[Program.ID_FASE_GAMEOVER]=new StateGameOver(this.ApplicationRef,this.Slot);
    this.States[Program.ID_FASE_AVVIO]=new StateSpinSet(this.ApplicationRef,this.Slot);
    this.States[Program.ID_FASE_PARTITA]=new StateSpinRun(this.ApplicationRef,this.Slot);
    this.States[Program.ID_FASE_ALLARMI]=new StateAlarm(this.ApplicationRef,this.Slot);
    
    this.CashBoxState=new StateCashBox(this.ApplicationRef,this.Slot);
        
    this.IDFaseCorrente=Program.ID_FASE_ACCENSIONE;
    this.LandscapeWarning=true;    
    
    this.SamplesCpuSpeed=0;
    this.TimeCpuBench=0;
    this.TimeCpuSpeed=0;
    
}

// Create a Program.prototype object that inherits from SObject.prototype.
Program.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to TiledSprite
Program.prototype.constructor = Program;
//--------------------------------------------------------------------------//
Program.prototype.Init = function() {
    
    this.Slot.Init();
    
    this.DEBUG_LOG("Program initialized.");
}
//--------------------------------------------------------------------------//
Program.prototype.Reset = function() {
    
    for (var i=0;i<this.States.length;i++)
        this.States[i].Reset();
    
    this.CashBoxState.Reset();
    
    this.Slot.Reset();
    
    this.DEBUG_LOG("Program reset.");
}
//--------------------------------------------------------------------------//
Program.prototype.Recover = function () {
    this.States[Program.ID_FASE_AVVIO].Recover();
};
//--------------------------------------------------------------------------//
Program.prototype.EvaluateCpuSpeed = function (ellapsed_ms) {

    var old_bench,new_bench,average;
    
    if (window.BENCH_ENABLE==true)
        if (this.SamplesCpuSpeed<100)
        {
            this.TimeCpuSpeed+=ellapsed_ms;

            this.SamplesCpuSpeed++;
        }
        else 
        {
            average=(this.TimeCpuSpeed/100);
            
            old_bench=window.CPU_BENCH;
            new_bench=(average/17);
            
            window.CPU_BENCH=(old_bench+new_bench)/2;
            
            if (window.CPU_BENCH>2.0)
                window.CPU_BENCH=2.0;
                
            
            this.TimeCpuSpeed=0;
            this.SamplesCpuSpeed=0;
            //window.BENCH_ENABLE=false;
        }
};
//--------------------------------------------------------------------------//
Program.prototype.Run = function(ellapsed_ms) {

    this.EvaluateCpuSpeed(ellapsed_ms);
    
    if (this.CashBoxState.ActionPending()==true)
    {
        if (this.IDFaseCorrente==Program.ID_FASE_AVVIO)
        {
            this.CashBoxState.Restart();
        }        
    }
    
    if (this.CashBoxState.IsFaseConclusa()==false)
    {
        this.CashBoxState.Run(ellapsed_ms);
    }
    else
    {   
        this.States[ this.IDFaseCorrente ].Run(ellapsed_ms);

        // this.CheckLandScapeMode();

        if (this.States[Program.ID_FASE_ALLARMI].IsAllarmePendente()==true && this.IDFaseCorrente!=Program.ID_FASE_ALLARMI)
        {
            //??????
            //m_pOverlay.VoidPending();

            this.IDFaseCorrente=Program.ID_FASE_ALLARMI;

            // 2.2 Resetta la fase
            this.States[ this.IDFaseCorrente ].Restart();
        }
        else if (this.States[ this.IDFaseCorrente ].IsFaseConclusa())
        {
            // 2.1 Seleziona la fase successiva da eseguire
            this.SetProssimaFase();

            // 2.2 Resetta la fase
            this.States[ this.IDFaseCorrente ].Restart();
        }          
    }

    this.Slot.RefreshComponents(ellapsed_ms);
}
//--------------------------------------------------------------------------//
Program.prototype.SetProssimaFase = function() {

    switch (this.IDFaseCorrente)
    {
        // 1. Uscita dalla Fase di accensione
        case Program.ID_FASE_ACCENSIONE:
        {
            this.IDFaseCorrente = Program.ID_FASE_GAMEOVER;
        } break;


        // 1. Uscita dalla Fase di Game Over
        case Program.ID_FASE_GAMEOVER:
        {
            this.IDFaseCorrente = Program.ID_FASE_AVVIO;
        } break;

        // 2. Uscita dalla Fase di avvio della partita
        case Program.ID_FASE_AVVIO:
        {
            this.IDFaseCorrente = Program.ID_FASE_PARTITA;
/*            
            // 2.1 Se e' stato richiesto un GameOver,imposta la fase
            if (m_Fasi[ Program.ID_FASE_AVVIO ].IsRichiestoGameOver())
            {
                this.IDFaseCorrente = Program.ID_FASE_GAMEOVER;
            }
            // 2.4 Altrimenti 
            else 
            {
                // ... vado a giocare la partita
                this.IDFaseCorrente = Program.ID_FASE_PARTITA;
            }
*/
        } break;

        // 3. Uscita dalla Fase di Partita
        case Program.ID_FASE_PARTITA:
        {
            this.IDFaseCorrente = Program.ID_FASE_AVVIO;
        } break;

        // 3. Uscita dalla Fase di Allarme
        case Program.ID_FASE_ALLARMI:
        {
            this.IDFaseCorrente = Program.ID_FASE_AVVIO;
        } break;

        default :
        {
        } break;

    };
}
//--------------------------------------------------------------------------//
Program.prototype.SLOT = function() {

    return this.Slot;
}
//------------------------------------------------------------//
Program.prototype.GetFaseCorrente = function() {    
    return this.IDFaseCorrente;
}
//------------------------------------------------------------//
Program.prototype.GetSPIN_SET = function() {    
    return this.States[Program.ID_FASE_AVVIO];
}
//------------------------------------------------------------//
Program.prototype.GetALLARMI = function() {    
    return this.States[Program.ID_FASE_ALLARMI];
}
//------------------------------------------------------------//
Program.prototype.GetVERSAMENTO_CASSA = function() {    
    return this.CashBoxState;
}
//------------------------------------------------------------//
Program.prototype.Parse_SERVER_LOGOUT = function() {    
    return true;
}
//------------------------------------------------------------//
Program.prototype.CheckLandScapeMode = function() {    

    if (this.IDFaseCorrente==Program.ID_FASE_AVVIO && this.LandscapeWarning==true)
    {    
        if (this.ApplicationRef.IsMobile()==true)
        {
            if (this.ApplicationRef.IsPortrait()==true)
            {
                this.GetALLARMI().AddAllarme(StateAlarm.ID_ALARM_PORTRAIT);
                
                this.LandscapeWarning=false;
            }
        }
    }
}
//--------------------------------------------------------------------------//
