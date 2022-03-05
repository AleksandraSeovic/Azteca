//------------------------------------------------------------//
// Holds main static info display
//------------------------------------------------------------//

function ConsoleInfo(app_reference,parent_container) {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our DialogButton-specific properties
    this.ApplicationRef = app_reference;
    this.ParentContainer = parent_container;
    this.StaticInfo_Queue= null;

    this.Container=new PIXI.Container();

    this.InfoDisplay = new DisplayStyle(0,0,0,"center",this.Container,
                        new PIXI.TextStyle({
                            fontFamily: 'Game_Font',
                            fontSize: 48,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff', '#ffffff'], // gradient
                        })
                  );

    this.Style=new ControlStyle(0,0,1.0);
}

// Create a ConsoleInfo.prototype object that inherits from SObject.prototype.
ConsoleInfo.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ConsoleInfo
ConsoleInfo.prototype.constructor = ConsoleInfo;

//--------------------------------------------------------------------------//
ConsoleInfo.prototype.Init = function() {

    this.InfoDisplay.Init();

    this.InfoDisplay.SetAreaWidth(window.VIDEO_WIDTH);

    this.InfoDisplay.Visible(true);

    this.Setup();

    this.ParentContainer.addChild(this.Container);
}
//--------------------------------------------------------------------------//
ConsoleInfo.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);
}
//--------------------------------------------------------------------------//
ConsoleInfo.prototype.OnResize = function() {

    this.Setup();
}
//--------------------------------------------------------------------------//
ConsoleInfo.prototype.Setup = function() {

    this.ApplicationRef.CONTROL_BUILDER().GetControlStyle(ControlBuilder.ID_CONSOLE_INFO,this.Style);

    this.Container.x=this.Style.X;
    this.Container.y=this.Style.Y;
    this.Container.scale=new PIXI.Point(this.Style.SCALE,this.Style.SCALE);
}
//--------------------------------------------------------------------------//
ConsoleInfo.prototype.SetCaption = function(str,queue) {

    var i=0;

    if (queue==false)
    {
        this.InfoDisplay.SetCaption(str);
    }
    else
    {
        this.StaticInfo_Queue=str;
    }
}
//------------------------------------------------------------//
// Aggiorna il display con eventuali messaggi in coda
ConsoleInfo.prototype.UpdateDisplayQueue = function() {

    if(this.StaticInfo_Queue!=null)
    {
        this.SetCaption(this.StaticInfo_Queue,false);
        this.StaticInfo_Queue=null;
    }
}
//--------------------------------------------------------------------------//
