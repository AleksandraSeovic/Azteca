//---------------------------------------------------------------------------//
FreeSpinPU.FREESPIN_STAT_IDLE		=0;
FreeSpinPU.FREESPIN_STAT_ARMED		=1;
FreeSpinPU.FREESPIN_STAT_RUNNING	=2;
FreeSpinPU.FREESPIN_STAT_OVER		=3;
//--------------------------------------------------------------------------//
FreeSpinPU.TAB_CAPTIONS=
[
    ["CLICK ON THE IMAGE TO CONTINUE","CLICCA SULL'IMMAGINE PER CONTINUARE"],
    ["YOU WON ","HAI VINTO "]
];

//--------------------------------------------------------------------------//
function FreeSpinPU(app_reference) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.MainStage      = this.ApplicationRef.MainStage;
    this.MainRenderer   = this.ApplicationRef.Renderer;
    this.SlotReference  = null;
    this.Container=new PIXI.Container();

    this.FREESPIN_Status=0;
    this.FREESPIN_Status_Req=0;
    this.FREESPIN_Tiro=0;
    this.FREESPIN_NumTiri=0;
    this.FREESPIN_Multiplier=1;
    this.FREESPIN_StepRefresh=0;
    this.FREESPIN_StepIntro=0;

    this.FREESPIN_VideoInfo_ACK=false;
    this.FREESPIN_VideoInfo_TotalWin=0;
}

// Create a FreeSpinPU.prototype object that inherits from SObject.prototype.
FreeSpinPU.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to FreeSpinPU
FreeSpinPU.prototype.constructor = FreeSpinPU;
//--------------------------------------------------------------------------//
FreeSpinPU.prototype.Reset = function() {

    this.FREESPIN_Status=FreeSpinPU.FREESPIN_STAT_IDLE;
    this.FREESPIN_Status_Req=FreeSpinPU.FREESPIN_STAT_IDLE;

    this.FREESPIN_VideoInfo_ACK=false;
    this.FREESPIN_VideoInfo_TotalWin=0;
    this.FREESPIN_Tiro=0;
}
//--------------------------------------------------------------------------//
// virtual function
FreeSpinPU.prototype.Init = function() {
    this.SlotReference  = this.ApplicationRef.SLOT();
}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.GetStatus = function(){return this.FREESPIN_Status;}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.GetTiri = function(){return this.FREESPIN_NumTiri;}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.IsRunning = function(){return (this.FREESPIN_Status==FreeSpinPU.FREESPIN_STAT_RUNNING);}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.IsStarted = function(){ return (this.FREESPIN_Tiro!=0 && this.FREESPIN_Status==FreeSpinPU.FREESPIN_STAT_RUNNING);}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.IsArmed = function(){ return (this.FREESPIN_Status_Req==FreeSpinPU.FREESPIN_STAT_ARMED);}
//--------------------------------------------------------------------------//
FreeSpinPU.prototype.VideoInfo_ACK= function(){return this.FREESPIN_VideoInfo_ACK;	}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.VideoInfo_VALUE= function(){return this.FREESPIN_VideoInfo_TotalWin;}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.SpinStart = function() {

    this.UpdateTIMES();

    this.FREESPIN_StepRefresh=1;	// effettua il fade dei tiri

    //this.ApplicationRef.CONSOLE().SetStaticDisplay(this.ApplicationRef.GAMEPROXY().GET_DATA().GET_MESSAGES().ON_FREESPIN_MESSAGE()+(this.FREESPIN_NumTiri-this.FREESPIN_Tiro),false);

    this.FREESPIN_VideoInfo_ACK=true;
}
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.SpinOver = function() {
    if (this.IsStarted()==true)
    {
        this.FREESPIN_StepRefresh=0;

        // Fine dei giochi
        if (this.FREESPIN_Tiro>=this.FREESPIN_NumTiri)
        {
            this.FREESPIN_Status_Req=FreeSpinPU.FREESPIN_STAT_OVER;
        }
    }
}
//--------------------------------------------------------------------------//
FreeSpinPU.prototype.Over = function() {

    this.Reset();

    this.StampaTeatro(false);

    this.Container.visible=false;
}
//---------------------------------------------------------------------------//
FreeSpinPU.prototype.StampaTeatro = function(enable) {
    if (enable==true)
        this.SlotReference.REEL_STAGE().SetType(SlotStage.TEATRO_FREESPIN);
    else
        this.SlotReference.REEL_STAGE().SetType(SlotStage.TEATRO_NORMAL);
}
//------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.Parse_FREESPIN_ACTIVATE = function(nfs) {

    this.FREESPIN_NumTiri=nfs;
    this.FREESPIN_Status_Req=FreeSpinPU.FREESPIN_STAT_ARMED;
}
//------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.Parse_FREESPIN_STATUS = function(chunk_to_parse) {

    this.ParseServer_Init(chunk_to_parse);

    this.FREESPIN_Tiro				=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_TIRO);
    this.FREESPIN_NumTiri			=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_TIRI);
    this.FREESPIN_Multiplier        =this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_MULTY);
    this.FREESPIN_VideoInfo_TotalWin=this.ParseServer_Dump_UINT(BonusDescriptor.BS_OFFSET_FREESPIN_WIN);

    if (this.FREESPIN_Tiro<this.FREESPIN_NumTiri)
    {
        if (this.FREESPIN_Status_Req==FreeSpinPU.FREESPIN_STAT_IDLE)
            this.FREESPIN_Status_Req=FreeSpinPU.FREESPIN_STAT_ARMED;
    }

    if (this.IsRunning()==true)
        this.UpdateTIMES();

    return true;
}
//--------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.Refresh = function(ellapsed_ms)
{
    this.TimerRefresh(ellapsed_ms);
}
//--------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.PlayMusic = function(){}
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.GetMultiplier = function(){return 1;}
//--------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.StopMusic = function(){this.ApplicationRef.SOUNDGENERATOR().StopChannelByBrano(SoundGenerator.FREESPIN_LOOP);}
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.UpdateTIMES = function(){}
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.IsIntroOver = function(){ return true; }
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.IsHold = function(index){ return false; }
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.IntroInit = function(){}
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.IntroRun = function(){}
//--------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.ActionPending = function(){

    return (this.FREESPIN_Status!=this.FREESPIN_Status_Req)
}
//---------------------------------------------------------------------------//
// OVERRIDE
FreeSpinPU.prototype.RunAction = function(){

    if ((this.FREESPIN_Status==FreeSpinPU.FREESPIN_STAT_IDLE || this.FREESPIN_Status==FreeSpinPU.FREESPIN_STAT_OVER) && this.FREESPIN_Status_Req==FreeSpinPU.FREESPIN_STAT_ARMED)
    {
        this.IntroInit();

        this.Container.visible=true;

        this.FREESPIN_Status=FreeSpinPU.FREESPIN_STAT_ARMED;
        this.FREESPIN_Status_Req=FreeSpinPU.FREESPIN_STAT_RUNNING;
    }
    else if (this.FREESPIN_Status==FreeSpinPU.FREESPIN_STAT_ARMED && this.FREESPIN_Status_Req==FreeSpinPU.FREESPIN_STAT_RUNNING)
    {
        this.IntroRun();

        if (this.IsIntroOver()==true)
        {
            this.StampaTeatro(true);

            this.FREESPIN_Status=FreeSpinPU.FREESPIN_STAT_RUNNING;
        }
    }
    else if (this.FREESPIN_Status==FreeSpinPU.FREESPIN_STAT_RUNNING && this.FREESPIN_Status_Req==FreeSpinPU.FREESPIN_STAT_OVER)
    {
        if (this.FREESPIN_StepRefresh!=2)
        {
            this.StopMusic();

            //this.SlotReference.CONGRATULATIONS().Mount("WinUp",1,100,-20,this.FREESPIN_VideoInfo_TotalWin.toString(),400,FreeSpinPU.TAB_CAPTIONS[0][window.LANG],780,this.ApplicationRef.CONTAINER());

            this.SlotReference.CONGRATULATIONS().Mount("WinUp",1,50,-20,                                                                               // ANIMATION RES,FRAMES,TIME
                                                        FreeSpinPU.TAB_CAPTIONS[1][window.LANG]+this.FREESPIN_VideoInfo_TotalWin.toString(),560,      // WIN
                                                        FreeSpinPU.TAB_CAPTIONS[0][window.LANG],680,                                                  // FOOTER
                                                        this.ApplicationRef.CONTAINER(),'.webp');


            this.FREESPIN_StepRefresh=2;
        }
        else
        {
            if (this.SlotReference.CONGRATULATIONS().IsMounted()==false)
            {
                this.Over();
            }
        }
    }
}
//---------------------------------------------------------------------------//
