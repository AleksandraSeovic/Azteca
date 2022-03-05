
var g_noSleepLib=null;
//--------------------------------------------------------------------------//
// Extends Container class
function Application() {

    var ww = 1920;//1440; //document.getElementById("container").width;
    var hh = 1080;//920; //document.getElementById("container").height;

    this.Caratterizzazione(ww,hh);

    // Estraiamo la signature dall'url se passato in GET
    if (window.LOCAL_SIGNATURE==false)
    {
        // Legge il parametro della URL
        var query = window.location.search.substring(1);

        window.SIGNATURE=this.ParseURL(query);
    }

    this.ParseSIGNATURE();

    PIXI.utils.skipHello();

    this.MainStage = new PIXI.Container();

    //this.Renderer = PIXI.autoDetectRenderer(ww, hh, { transparent: false, antialias: true, legacy: true,view: document.getElementById("game-canvas") });
    this.Renderer = PIXI.autoDetectRenderer(ww, hh, {transparent: true});
    this.Renderer.view.style.display = "block";

    window.Renderer=this.Renderer;

    document.getElementById("container").appendChild(this.Renderer.view);

    this.GameProxy=null;
    this.SoundGenerator=null;
    this.Player = null;
    this.Program = null;
    this.ButtonManager = null;
    this.Console=null;

//DES_SelfCheck();

    // Create the loader
    this.m_Loader = new PIXI.loaders.Loader();

    // Create the preloader
    this.Preloader_Mount();

    this.Resize();

    window.onresize = this.Resize.bind(this);

    window.MOBILE = this.IsMobile();

    window.IOS=this.IsIOS();

    window.addEventListener("deviceorientation", FuncHandleOrientation, true);

    // Prepare for first frame of game loop/animation
    this.lasttime = new Date().getTime();
    requestAnimationFrame(this.Refresh.bind(this));

    // And start loading resources
    this.Setup();

    this.Resize();
}
//--------------------------------------------------------------------------//
Application.prototype = Object.create(PIXI.Container.prototype);
//--------------------------------------------------------------------------//
Application.prototype.Caratterizzazione = function (ww,hh) {

    // Connessione al server
	window.CONNECT2SERVER   =true;

    // La firma è dentro l'html (true) oppure arriva come parametro dall'URL(false)
    window.LOCAL_SIGNATURE  =true;
    // URL signature
    window.SIGNATURE        =null;
    // Encrypted signature
    window.SIGNATURE_ENCRYPTION= false;  // true; <== produzione

    // Connection parms from signature
    window.SERVER_URL=null;
    window.SERVER_PORT=0;
    window.TOKEN=null;

    // Enable encryption in messaging
    window.ENCRYPTION       =false;

    // Se true disabilita il controllo di timeout sulle risposte del server
    window.LOCAL_TEST       =true;

    // Se true abilita i pulsanti di demo feature
    window.DEMO_PLAY        =true;

    //Se true disabilita la vista del credito in valuta
    window.PLAY_FOR_COINS   =false;

    // Flag globale che viene valorizzata in base al tipo di piattaforma
    window.MOBILE           =false;

    // ID language (0=Eng | 1=Ita )
    window.LANG             =1;

    // Mobile power save (default 1 = ON)
    window.POWER_SAVE       =1;

    // Caratteristiche grafiche
    window.VIDEO_WIDTH      = ww;
    window.VIDEO_HEIGHT     = hh;
    window.VIDEO_RATIO      = (window.VIDEO_WIDTH/window.VIDEO_HEIGHT);
    window.LARGHEZZA_SIMBOLO= 260;
    window.ALTEZZA_SIMBOLO  = 260;

    // Caratteristiche del gioco
    window.NUM_LINEE        = 15;
    window.NUM_SIMBOLI      = 14;
    window.NUM_RULLI        = 15;
    window.NUM_REELS        = 5;
    window.NUM_SIMBOLI_RUOTA= 3;
    window.PATTERN_SIMBOLI  = window.NUM_RULLI;
	window.NUM_COMBINAZIONI_SLOT  =57;
    window.SLICE_COMBINAZIONI_SLOT=13;	// 3 CILIEGIE,3LAMPONI...,3 SIMBOLO MASSIMO
    window.COMBINAZIONI_SCATTER=true;

    window.MIN_BET=				1;
    window.MAX_BET=				10;
    window.PAY_BET=				1;
    window.MAX_TOT_BET=			(window.MAX_BET*window.NUM_LINEE*window.PAY_BET);
    window.MIN_TOT_BET=			(window.MIN_BET*window.NUM_LINEE*window.PAY_BET);

    window.DEFAULT_LINES=       window.NUM_LINEE;

    // Variabili globali per il fullscreen-tip
    window.FULL_SCREEN=         false;
    window.FULL_SCREEN_DONE=    false;
    window.SCREEN_TIPPED=       false;

    // Variabili globali per l'adjust del frame rate
    window.CPU_BENCH=           1.0;
    window.BENCH_ENABLE=        false;
    //------------------------------------------------------------//
    window.ID_DUMMY=0;			// 0.  Dummy
    window.ID_SIMBOLO_0=1;		// 1.  Simbolo #1
    window.ID_SIMBOLO_1=2;		// 2.  Simbolo #2
    window.ID_SIMBOLO_2=3;		// 3.  Simbolo #3
    window.ID_SIMBOLO_3=4;		// 4.  Simbolo #4
    window.ID_SIMBOLO_4=5;		// 5.  Simbolo #5

    window.ID_SIMBOLO_5=6;		// 6.  Simbolo #6
    window.ID_SIMBOLO_6=7;		// 7.  Simbolo #7
    window.ID_SIMBOLO_7=8;		// 8.  Simbolo #8
    window.ID_SIMBOLO_8=9;		// 9.  Simbolo #9
    window.ID_SIMBOLO_9=10;		// 9.  Simbolo #10

    window.ID_SIMBOLO_10=11;	//10.  Simbolo #11 wild

    window.ID_SIMBOLO_11=12;	//10.  Simbolo #12 SCATTER (TROMBA)
    window.ID_SIMBOLO_12=13;	//11.  Simbolo #13 BONUS (VINILE)

    //------------------------------------------------------------//
    window.ID_SIMBOLO_JOLLY 	=window.ID_SIMBOLO_10;
    window.ID_SIMBOLO_SCATTER	=window.ID_SIMBOLO_11;
    window.ID_SIMBOLO_BONUS     =window.ID_SIMBOLO_12;
    //---------------------------------------------------------------------------//
    // FORCED SYMBOLS
    window.ID_SIMBOLO_MICROFONO =window.ID_SIMBOLO_BONUS+1;
    window.ID_SIMBOLO_SUPER	    =window.ID_SIMBOLO_14;

    //---------------------------------------------------------------------------//
    window.REEL_ROW_0=100;
    window.REEL_ROW_1=window.REEL_ROW_0+260;
    window.REEL_ROW_2=window.REEL_ROW_1+260;

    window.REEL_COL_0=235;
    window.REEL_COL_1=(window.REEL_COL_0+(1*297));
    window.REEL_COL_2=(window.REEL_COL_0+(2*297));
    window.REEL_COL_3=(window.REEL_COL_0+(3*297));
    window.REEL_COL_4=(window.REEL_COL_0+(4*297));
    //---------------------------------------------------------------------------//
    window.REELS_TAB_X=[window.REEL_COL_0,window.REEL_COL_1,window.REEL_COL_2,window.REEL_COL_3,window.REEL_COL_4];
    window.REELS_TAB_Y=[window.REEL_ROW_0,window.REEL_ROW_1,window.REEL_ROW_2];
    //------------------------------------------------------------//



}
//--------------------------------------------------------------------------//
Application.prototype.Setup = function () {

    //console.log('resources loading start');
    this.GameProxy = new GameProxy(this);


    this.m_Loader.on('load', this.onLoadCallback.bind(this));
    this.m_Loader.on('progress', this.onProgressCallback.bind(this));
    this.m_Loader.on('error', this.onErrorCallback.bind(this));
    this.m_Loader.once("complete", this.OnResourcesLoaded.bind(this));

    this.m_Loader.add("TEX_Stage",      "resources/Stage/Stage.json");
    this.m_Loader.add("TEX_StageFS",    "resources/Stage/StageFS.json");
    this.m_Loader.add("TEX_Reels",      "resources/Stage/Reels.json");
    // this.m_Loader.add("TEX_ReelsFS",    "resources/Stage/ReelsFS.json");
    this.m_Loader.add("TEX_Frame",      "resources/Stage/Frame.json");
    // this.m_Loader.add("TEX_FrameFS",    "resources/Stage/FrameFS.json");
    // this.m_Loader.add("TEX_Logo",       "resources/Stage/Logo.json");
    this.m_Loader.add("TEX_Symbols",    "resources/Symbols/Symbols.json");
    // this.m_Loader.add("TEX_SymbolsBlur","resources/Symbols/SymbolsBlur.json");
    this.m_Loader.add("TEX_SymbolsMagic","resources/SymbolsMagic/SymbolsMagic.json");
    // this.m_Loader.add("TEX_SymbolsMagicBlur","resources/SymbolsMagic/SymbolsMagicBlur.json");
    this.m_Loader.add("TEX_Console"    ,"resources/Console/Console.json");
    this.m_Loader.add("TEX_WinUp"      ,"resources/BigWin/WinUp.json");
    this.m_Loader.add("TEX_Rays"       ,"resources/BigWin/Rays.json");
    this.m_Loader.add("TEX_Help0"       ,"resources/Help/Help-0.json");
    this.m_Loader.add("TEX_Help1"       ,"resources/Help/Help-1.json");
    this.m_Loader.add("TEX_AniSym00"   ,"resources/SymbolsAnimation/AniSym00.json");
    this.m_Loader.add("TEX_AniSym01"   ,"resources/SymbolsAnimation/AniSym01.json");
    this.m_Loader.add("TEX_AniSym02"   ,"resources/SymbolsAnimation/AniSym02.json");
    this.m_Loader.add("TEX_AniSym03"   ,"resources/SymbolsAnimation/AniSym03.json");
    this.m_Loader.add("TEX_AniSym04"   ,"resources/SymbolsAnimation/AniSym04.json");
    this.m_Loader.add("TEX_AniSym05"   ,"resources/SymbolsAnimation/AniSym05.json");
    this.m_Loader.add("TEX_AniSym06"   ,"resources/SymbolsAnimation/AniSym06.json");
    this.m_Loader.add("TEX_AniSym07"   ,"resources/SymbolsAnimation/AniSym07.json");
    this.m_Loader.add("TEX_AniSym08"   ,"resources/SymbolsAnimation/AniSym08.json");
    this.m_Loader.add("TEX_AniSym09"   ,"resources/SymbolsAnimation/AniSym09.json");
    this.m_Loader.add("TEX_AniSym10"   ,"resources/SymbolsAnimation/AniSym10.json");
    this.m_Loader.add("TEX_AniSym11"   ,"resources/SymbolsAnimation/AniSym11.json");
    this.m_Loader.add("TEX_AniSym12"   ,"resources/SymbolsAnimation/AniSym12.json");
    this.m_Loader.add("TEX_AniSym13"   ,"resources/SymbolsAnimation/AniSym13.json");
    this.m_Loader.add("TEX_AniSym14"   ,"resources/SymbolsAnimation/AniSym14.json");
    this.m_Loader.add("TEX_AniFrames"  ,"resources/SymbolsAnimation/WinAnimation.json");
    this.m_Loader.add("TEX_GameFonts"  ,"resources/Fonts/GameFonts.json");
    this.m_Loader.add("TEX_LinesA"     ,"resources/Lines/WinLinesA.json");
    this.m_Loader.add("TEX_LinesB"     ,"resources/Lines/WinLinesB.json");
    this.m_Loader.add("TEX_ReelTurbo"  ,"resources/Turbo/Turbo.json");
    this.m_Loader.add("TEX_LongWild0"   ,"resources/LongWild/LongWild-0.json");
    this.m_Loader.add("TEX_LongWild1"   ,"resources/LongWild/LongWild-1.json");
    this.m_Loader.add("TEX_LongWild2"   ,"resources/LongWild/LongWild-2.json");
    // this.m_Loader.add("TEX_SpSymbol"    ,"resources/Symbols/Specials.json");
    this.m_Loader.add("TEX_Effects"    ,"resources/Effects/Effects.json");
    this.m_Loader.add("TEX_Explosion"  ,"resources/Explosion/StarExplosion.json");
    this.m_Loader.add("PRT_Snow"       ,"resources/Effects/Snow.json");

    this.m_Loader.load();
};
//--------------------------------------------------------------------------//
Application.prototype.loadProgress = function(loader, res) {
};
//--------------------------------------------------------------------------//
Application.prototype.OnResourcesLoaded = function(loader) {

    //console.log('all resources loaded');
    g_noSleepLib = new NoSleep();

    this.ControlBuilder=new ControlBuilder(this);

    this.ButtonManager=new ButtonManager();

    // this.GameProxy=new GameProxy(this);

    this.SoundGenerator=new SoundGenerator();

    this.Player=new Player(this);

    this.Console=new ConsoleContainer(this.MainStage,this);

    this.Program=new Program(this);

    this.Reset();

    this.GameProxy.Init();

    this.Program.Init();

    this.Console.Init();

    this.SoundGenerator.Init();

    this.Recover();

    // Abilita la console
    this.Console.Enable();

    // Avvisa il proxy che il caricamento è completato
    this.GameProxy.NOTIFY_LOADED_EVENT();


    //this.Preloader_Unmount();
/*
    this.Resize();

    window.onresize = this.Resize.bind(this);

    // Prepare for first frame of game loop/animation
    this.lasttime = new Date().getTime();
    requestAnimationFrame(this.Refresh.bind(this));
*/

    this.BUTTON_MANAGER().NotifyStymulus(ButtonManager.BUTT_SOUND)
};
//--------------------------------------------------------------------------//
// called once when the queued resources all load.
Application.prototype.onLoadCallback = function (loader) {

};
//--------------------------------------------------------------------------//
// called once when the queued resources all load.
Application.prototype.onProgressCallback = function (loader) {

    //var progress=Math.round(loader.progress);
    var progress=loader.progress;

    this.PreloaderBar.scale.x=(progress/100.0);

    //console.log("Loading:",progress );

    //this.PreloaderMark.rotation+=0.01;

    //this.PreloaderDisplay.SetCaption(progress+"%");
};
//--------------------------------------------------------------------------//
// called once when the queued resources all load.
Application.prototype.onErrorCallback = function (loader) {

    console.log('Error loading resource');
    //console.log(resource.name, 'error.', 'progress:', resource.progressChunk, '%');
};
//--------------------------------------------------------------------------//
// Mount preloader elements
Application.prototype.Preloader_Mount = function () {

    this.PreloaderTitle=PIXI.Sprite.fromImage("resources/LoadingTitle.webp");
    this.PreloaderTitle.x=0; this.PreloaderTitle.y=0;
    this.PreloaderTitle.x=(window.VIDEO_WIDTH/2);
    this.PreloaderTitle.y=(window.VIDEO_HEIGHT/2); //this.PreloaderTitle.y-=100;
    this.PreloaderTitle.anchor.set(0.5);
    this.MainStage.addChild(this.PreloaderTitle);

    this.PreloaderMark=PIXI.Sprite.fromImage("resources/LoadingLogo.webp");
    this.PreloaderMark.x=0;
    this.PreloaderMark.y=850;
    //this.PreloaderMark.anchor.set(0.5);
    this.MainStage.addChild(this.PreloaderMark);

    this.PreloaderBarBackground=PIXI.Sprite.fromImage("resources/LoadingBarBackground.webp");
    this.PreloaderBarBackground.x=window.VIDEO_WIDTH/2 - 506/2;//half of the loading image width
    this.PreloaderBarBackground.y=900;
    this.MainStage.addChild(this.PreloaderBarBackground);

    this.PreloaderBar=PIXI.Sprite.fromImage("resources/LoadingBar.webp");
    this.PreloaderBar.x=(window.VIDEO_WIDTH/2 - 506/2) + 30;//half of the loading image width
    this.PreloaderBar.y=900;
    this.PreloaderBar.scale=new PIXI.Point(0.01,1.0);
    this.MainStage.addChild(this.PreloaderBar);

    this.PreloaderBarForeground=PIXI.Sprite.fromImage("resources/LoadingBarForeground.webp");
    this.PreloaderBarForeground.x=window.VIDEO_WIDTH/2 - 506/2;//half of the loading image width
    this.PreloaderBarForeground.y=900;
    this.MainStage.addChild(this.PreloaderBarForeground);
};
//--------------------------------------------------------------------------//
// Mount preloader elements
Application.prototype.Preloader_Unmount = function () {

    this.MainStage.removeChild(this.PreloaderMark);
    this.MainStage.removeChild(this.PreloaderTitle);
    this.MainStage.removeChild(this.PreloaderBar);
    //this.PreloaderDisplay.Visible(false);
};
//--------------------------------------------------------------------------//
Application.prototype.Refresh = function () {

    // Determine seconds elapsed since last frame
    var currtime = new Date().getTime();
    var delta = (currtime - this.lasttime);

    if (this.GameProxy!=null)
        this.GameProxy.Refresh(delta);

    if (this.Program!=null)
        this.Program.Run(delta);

    if (this.Console!=null)
        this.Console.Refresh(delta);

    /*if (this.SoundGenerator!=null)
        this.SoundGenerator.Refresh();*/


    this.Renderer.render(this.MainStage);

    requestAnimationFrame(this.Refresh.bind(this));

    this.lasttime = currtime;
};
//------------------------------------------------------------//
Application.prototype.Reset = function () {

    this.Program.Reset();
    this.Player.Reset();
    this.GameProxy.Reset();
}
//--------------------------------------------------------------------------//
Application.prototype.Recover = function () {
    this.Program.Recover();
};
//--------------------------------------------------------------------------//
Application.prototype.TEXTURE_DB = function () {

    return this.m_Loader.resources;
};
//--------------------------------------------------------------------------//
Application.prototype.BUTTON_MANAGER = function () {

    return this.ButtonManager;
};
//--------------------------------------------------------------------------//
Application.prototype.SLOT = function () {
    return this.Program.SLOT();
}
//--------------------------------------------------------------------------//
Application.prototype.PLAYER = function () {

    return this.Player;
};
//--------------------------------------------------------------------------//
Application.prototype.SOUNDGENERATOR = function () {

    return this.SoundGenerator;
};
//--------------------------------------------------------------------------//
Application.prototype.PROGRAMMA = function () {

    return this.Program;
};
//--------------------------------------------------------------------------//
Application.prototype.GAMEPROXY = function () {

    return this.GameProxy;
};
//--------------------------------------------------------------------------//
Application.prototype.CONTROL_BUILDER = function () {

    return this.ControlBuilder;
};
//--------------------------------------------------------------------------//
Application.prototype.CONSOLE = function () {

    return this.Console;
};
//--------------------------------------------------------------------------//
Application.prototype.CONTAINER = function () {

    return this.MainStage;
};
//--------------------------------------------------------------------------//
Application.prototype.NO_SLEEP_LIB = function () {

    return this.noSleepLib;
};
Application.prototype.LOADER = function() {
    return this.m_Loader
}
//--------------------------------------------------------------------------//
Application.prototype.Resize= function (event) {

    var gameArea = document.getElementById('container');
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > window.VIDEO_RATIO) {
        newWidth = newHeight * window.VIDEO_RATIO;

        this.Renderer.view.style.width = newWidth + 'px';
        this.Renderer.view.style.height = newHeight + 'px';

    } else {
        newHeight = newWidth / window.VIDEO_RATIO;
        this.Renderer.view.style.width = newWidth + 'px';
        this.Renderer.view.style.height = newHeight + 'px';
    }

    if (this.Console!=null)
        this.Console.OnResize();
}
//--------------------------------------------------------------------------//
 function FuncResize() {

    var gameArea = document.getElementById('container');
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > window.VIDEO_RATIO) {
        newWidth = newHeight * window.VIDEO_RATIO;

        window.Renderer.view.style.width = newWidth + 'px';
        window.Renderer.view.style.height = newHeight + 'px';

    } else {
        newHeight = newWidth / window.VIDEO_RATIO;
        window.Renderer.view.style.width = newWidth + 'px';
        window.Renderer.view.style.height = newHeight + 'px';
    }
}
//--------------------------------------------------------------------------//
function FuncHandleOrientation() {
    FuncResize();
}
//--------------------------------------------------------------------------//
function IsFullScreen ()
{
  var doc = window.document;
  var docEl = doc.documentElement;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)
    //if ((doc.fullScreenElement && doc.fullScreenElement !== null) || (!doc.mozFullScreen && !doc.webkitIsFullScreen))
         return false;

    return true;
}
//--------------------------------------------------------------------------//
 function ToggleFullScreen () {

     var doc = window.document;
     var docEl = doc.documentElement;

     window.SCREEN_TIPPED=true;

     if (IsFullScreen()==false)
     {
        window.FULL_SCREEN=true;

        window.FULL_SCREEN_DONE=true;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

        if (requestFullScreen!=null)
            requestFullScreen.call(docEl);
      }
      else
      {
          window.FULL_SCREEN=false;

          var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

          if (cancelFullScreen!=null)
              cancelFullScreen.call(doc);
      }

     FuncResize();
}
//--------------------------------------------------------------------------//
function ToggleNoSleep () {

    window.POWER_SAVE^=1;

    if (window.POWER_SAVE==0)
        g_noSleepLib.enable(); // keep the screen on!
    else
        g_noSleepLib.disable(); // let the screen turn off.
}
//--------------------------------------------------------------------------//
Application.prototype.IsMobile=function () {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}
//--------------------------------------------------------------------------//
Application.prototype.IsIOS=function () {
    return (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)!=null);
}
//--------------------------------------------------------------------------//
Application.prototype.IsPortrait=function () {
    //return true;
    if (window.matchMedia("(orientation: portrait)").matches) {
        // you're in PORTRAIT mode
        return true;
    }

    return false;
}
//--------------------------------------------------------------------------//
Application.prototype.ParseURL=function (query)
{
    var vars = query.split("&");
    var query_string = {};


     for (var i = 0; i < vars.length; i++)
     {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);

        // If first entry with this name
        if (typeof query_string[key] === "undefined")
        {
            query_string[key] = decodeURIComponent(value);

        }
        // If second entry with this name
        else if (typeof query_string[key] === "string")
        {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;

        }
        // If third or later entry with this name
        else
        {
            query_string[key].push(decodeURIComponent(value));
        }
     }

     return query_string;
}
//--------------------------------------------------------------------------//
Application.prototype.ParseSIGNATURE=function ()
{
    // La signature è nell'html? Altrimenti e' stato estratto dall'URL
    if (window.LOCAL_SIGNATURE==true)
        window.SIGNATURE=signature;

    DES_DecryptSignature(window.SIGNATURE);

    window.TOKEN		= DES_Signature_SESSION;
    window.SERVER_PORT= parseInt (DES_Signature_PORT);
    window.SERVER_URL	= DES_Signature_IP;
    //window.DEMO_PLAY  = DES_Signature_DEMO;
    //window.LANG       = DES_Signature_LANG;
}
//--------------------------------------------------------------------------//
application = new Application();
//--------------------------------------------------------------------------//
