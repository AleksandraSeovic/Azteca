//------------------------------------------------------------//
ProgramState.STEP_FASE_INIT=0;
ProgramState.STEP_FASE_BODY=1;
ProgramState.STEP_FASE_EXIT=2;
//------------------------------------------------------------//
ProgramState.ID_SOTTOSTEP_0=0;
ProgramState.ID_SOTTOSTEP_1=1;
ProgramState.ID_SOTTOSTEP_2=2;
ProgramState.ID_SOTTOSTEP_3=3;
ProgramState.ID_SOTTOSTEP_4=4;
ProgramState.ID_SOTTOSTEP_5=5;
ProgramState.ID_SOTTOSTEP_6=6;
ProgramState.ID_SOTTOSTEP_7=7;
ProgramState.ID_SOTTOSTEP_8=8;
ProgramState.ID_SOTTOSTEP_9=9;
ProgramState.ID_SOTTOSTEP_10=10;

//--------------------------------------------------------------------------//
//function ProgramState(stage_container,stage_renderer,slot_ref) {
function ProgramState(app_reference,slot_ref) {    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.MainRenderer   = this.ApplicationRef.Renderer;
    this.SlotReference  = slot_ref;
    this.PopUp          =null;
    
    //this.MainStage      = stage_container;
    //this.MainRenderer   = stage_renderer;
    
    
    
    this.Step				= ProgramState.STEP_FASE_INIT;
    this.SottoStep			= 0;
    this.FaseConclusa		=true;

    
    this.BackGround = new PIXI.Graphics();
    this.BackGround.beginFill(0x000000,0.7);
    this.BackGround.drawRect(0, 0, window.VIDEO_WIDTH,window.VIDEO_HEIGHT);
    this.BackGround.endFill();    
}

// Create a ProgramState.prototype object that inherits from SObject.prototype.
ProgramState.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ProgramState
ProgramState.prototype.constructor = ProgramState;
//--------------------------------------------------------------------------//
ProgramState.prototype.Restart = function() {

    this.Step				= ProgramState.STEP_FASE_INIT;
    this.SottoStep			= 0;
    this.FaseConclusa		=false;
}
//--------------------------------------------------------------------------//
ProgramState.prototype.Reset = function() {
    
    this.Restart();                         // virtual function
    this.FaseConclusa		=true;
}
//--------------------------------------------------------------------------//
ProgramState.prototype.IsFaseConclusa = function() {
    return this.FaseConclusa;
}
//--------------------------------------------------------------------------//
ProgramState.prototype.Init = function() {
    
    if (this.PopUp==null)
    {
        this.PopUp=new DialogBox(this.ApplicationRef,this.MainStage);
        
        this.PopUp.Init();
    }
    
    this.StateInit();                       // virtual function
}
//--------------------------------------------------------------------------//
ProgramState.prototype.StateInit = function() {
    
    this.Restart();
			
    this.Step=ProgramState.STEP_FASE_BODY;    
    
    this.DEBUG_LOG("Program state init");
}
//--------------------------------------------------------------------------//
ProgramState.prototype.Body = function(ellapsed_ms) {
    this.StateBody(ellapsed_ms);                       // virtual function
}
//--------------------------------------------------------------------------//
ProgramState.prototype.StateBody = function(ellapsed_ms) {
    
    this.TimerRefresh(ellapsed_ms);
    
    //this.SlotReference.RefreshComponents(ellapsed_ms);
}
//--------------------------------------------------------------------------//
ProgramState.prototype.Exit = function() {
    this.StateExit();                       // virtual function
}
//--------------------------------------------------------------------------//
ProgramState.prototype.StateExit = function() {
    
    this.FaseConclusa=true;
}
//--------------------------------------------------------------------------//
ProgramState.prototype.Run = function(ellapsed_ms) {

    // 1. Se la fase si è già conclusa,ritorna
    if (this.IsFaseConclusa()==true)
        return;

    // 2. Esegue lo step appropriato
    switch (this.Step)
    {
        case ProgramState.STEP_FASE_INIT : { this.Init(); } break;

        case ProgramState.STEP_FASE_BODY : { this.Body(ellapsed_ms); } break;

        case ProgramState.STEP_FASE_EXIT : { this.Exit(); } break;

        default:break;
    };
}
//------------------------------------------------------------//
ProgramState.prototype.PopUp_Render = function(popup_message,modal) {    
    
    this.PopUp.Render(popup_message,modal);
}
//--------------------------------------------------------------//
ProgramState.prototype.PopUp_Mount = function() {        
    
    if (this.MainStage.children.indexOf(this.BackGround)==-1)
        this.MainStage.addChild(this.BackGround);

    this.PopUp.Mount();
}
//--------------------------------------------------------------//
ProgramState.prototype.PopUp_Refresh = function() {        
    
    return this.PopUp.Refresh();
}
//--------------------------------------------------------------//
ProgramState.prototype.PopUp_Unmount = function() {        
    
    if (this.MainStage.children.indexOf(this.BackGround)!=-1)
        this.MainStage.removeChild(this.BackGround);

    this.PopUp.Unmount();
}
//------------------------------------------------------------//
