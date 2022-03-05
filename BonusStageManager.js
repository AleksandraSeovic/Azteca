//---------------------------------------------------------------------------//
BonusStageManager.BONUS_STAT_IDLE		=0;
BonusStageManager.BONUS_STAT_ARMED	    =1;
BonusStageManager.BONUS_STAT_RUNNING	=2;
BonusStageManager.BONUS_STAT_OVER		=3;

//--------------------------------------------------------------------------//
function BonusStageManager(app_reference) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.SlotReference  = null;

    this.BonusStage01=null;
    this.RunningBonus=null;

    this.BONUS_Status=0;
    this.BONUS_Status_Req=0;
}

// Create a BonusStageManager.prototype object that inherits from SObject.prototype.
BonusStageManager.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to BonusStageManager
BonusStageManager.prototype.constructor = BonusStageManager;
//--------------------------------------------------------------------------//
BonusStageManager.prototype.Init = function() {

    this.SlotReference  = this.ApplicationRef.SLOT();

    this.BONUS_Status=BonusStageManager.BONUS_STAT_IDLE;
    this.BONUS_Status_Req=BonusStageManager.BONUS_STAT_IDLE;
}
//------------------------------------------------------------//
BonusStageManager.prototype.SelectedStage_Mount = function() {

    this.RunningBonus.Mount();
}
//------------------------------------------------------------//
BonusStageManager.prototype.SelectedStage_Unmount = function() {

    this.RunningBonus.Unmount();
    this.RunningBonus=null;
}
//------------------------------------------------------------//
BonusStageManager.prototype.SelectedStage_Run = function() {

    this.RunningBonus.Run();
}
//------------------------------------------------------------//
BonusStageManager.prototype.SelectedStage_IsOver = function() {

    return this.RunningBonus.IsOver();
}
//--------------------------------------------------------------------------//
BonusStageManager.prototype.Refresh = function(ellapsed_ms) {

    if (this.RunningBonus!=null)
        this.RunningBonus.Refresh(ellapsed_ms);
}
//-------------------------------------------------------------------------//
BonusStageManager.prototype.Parse_BONUS_STATUS = function(chunk_to_parse) {

    // Recovery?
    if (this.RunningBonus==null)
    {
        this.ParseServer_Init(chunk_to_parse);

        return this.Parse_BONUS_ACTIVATE(this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_ID_BONUS), () => {
            this.RunningBonus.Parse_BONUS_STATUS(chunk_to_parse)
        })
    } else {
        return this.RunningBonus.Parse_BONUS_STATUS(chunk_to_parse);
    }
}
//-------------------------------------------------------------------------//
BonusStageManager.prototype.Parse_BONUS_ACTIVATE = function(bonus_id, bonusLoadCallback) {

    if (bonus_id<BonusDescriptor.ID_BONUS_PICK)
        return false;

    this.SelectedStage_Ready((bonus_id-BonusDescriptor.ID_BONUS_PICK), bonusLoadCallback);

    return true;
}
//------------------------------------------------------------//
BonusStageManager.prototype.SelectedStage_Ready = function(p_ID_Bonus, bonusLoadCallback) {

    if(this.BonusStage01 == null) {
        this.BonusStage01 = new BonusStage01(this.ApplicationRef, () => {
            this.BonusStage01.Init()
            this.RunningBonus=this.BonusStage01
            this.RunningBonus.Ready()
            this.BONUS_Status	=BonusStageManager.BONUS_STAT_IDLE
            this.BONUS_Status_Req=BonusStageManager.BONUS_STAT_ARMED
            bonusLoadCallback()
        })
    } else {
        this.RunningBonus=this.BonusStage01
        this.RunningBonus.Ready()
        this.BONUS_Status	=BonusStageManager.BONUS_STAT_IDLE
        this.BONUS_Status_Req=BonusStageManager.BONUS_STAT_ARMED
        bonusLoadCallback()
    }
}
//---------------------------------------------------------------------------//
// OVERRIDE
BonusStageManager.prototype.ActionPending = function() {

    return (this.BONUS_Status!=this.BONUS_Status_Req)
}
//---------------------------------------------------------------------------//
// OVERRIDE
BonusStageManager.prototype.RunAction = function() {

    if (this.BONUS_Status==BonusStageManager.BONUS_STAT_IDLE && this.BONUS_Status_Req==BonusStageManager.BONUS_STAT_ARMED)
    {
        this.SelectedStage_Mount();

        this.BONUS_Status=BonusStageManager.BONUS_STAT_ARMED;
        this.BONUS_Status_Req=BonusStageManager.BONUS_STAT_RUNNING;
    }
    else if (this.BONUS_Status==BonusStageManager.BONUS_STAT_ARMED && this.BONUS_Status_Req==BonusStageManager.BONUS_STAT_RUNNING)
    {
        this.SelectedStage_Run();

        if (this.SelectedStage_IsOver()==true)
        {
            this.SelectedStage_Unmount();

            this.BONUS_Status=BonusStageManager.BONUS_STAT_IDLE;
            this.BONUS_Status_Req=BonusStageManager.BONUS_STAT_IDLE;
        }
    }
}
//---------------------------------------------------------------------------//

