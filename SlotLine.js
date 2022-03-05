
//--------------------------------------------------------------------------//
SlotLine.SourceID=0;
//------------------------------------------------------------//
SlotLine.LINES_X=174;
//------------------------------------------------------------//
SlotLine.TAB_LINES_Y=[
    489,
    239,
    749,
    154,
    175,
    174,
    399,
    210,
    210,
    253,
    199,
    128,
    568,
    150,
    410,
    223,
    486,
    258,
    260,
    159
];
//--------------------------------------------------------------------------//
SlotLine.TAB_CAPTIONS=
[
    ["LINE ","LINEA "],
    [" WINS BONUS"," VINCE BONUS"],
    [" WINS "," VINCE "],
    [" COINS"," GETTONI"]
];

//--------------------------------------------------------------------------//
function SlotLine(parent_container,app_reference) {
    
    var str;
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.ParentStage = parent_container;
    this.LineContainer = new PIXI.Container();
    this.SlotComboRef=null;
    
    
    this.ID=SlotLine.SourceID++;
    
    this.DisplayWinRef = null;
    this.DisplayLineRef= null;
    this.SymbolsWinRef = null;
    
    str="PayLine"+(this.ID<10 ? "A":"B");

    str+="0"+parseInt(this.ID%10);

    this.LineSprite=new TiledSprite(str,1,false,this.ApplicationRef.SLOT().REEL_HOLDER().CONTAINER(),'.webp');
        
}

// Create a SlotLine.prototype object that inherits from SObject.prototype.
SlotLine.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotLineBet
SlotLine.prototype.constructor = SlotLine;

//--------------------------------------------------------------------------//
SlotLine.prototype.Init = function(p_pDisplayWin,p_pDisplayLine,p_pSpriteDisplayLine,p_pSymbols) {

    this.SlotComboRef=this.ApplicationRef.SLOT().SLOT_COMBO();
    
    this.DisplayWinRef=p_pDisplayWin;
    this.SpriteWinLineRef=p_pSpriteDisplayLine;
    this.DisplayLineRef=p_pDisplayLine;
    this.SymbolsWinRef=p_pSymbols;
    
    this.LineSprite.Setup();
    this.LineSprite.SCALE_X(1.1);
    this.LineSprite.XX(SlotLine.LINES_X,0);
    this.LineSprite.YY(SlotLine.TAB_LINES_Y[this.ID],0);
    
    
}
//--------------------------------------------------------------------------//
SlotLine.prototype.Draw = function(win) {

    this.SetupLineWinDisplay(win);

    this.ReelsHighlight(true);

    this.OnLineWin(win);

    this.LineSprite.Visible(true);
}
//------------------------------------------------------------//
// OVERRIDE
SlotLine.prototype.Clear = function() {
    
    this.DisplayWinRef.Visible(false);

    this.DisplayLineRef.Visible(false);
    this.DisplayLineRef.StopTransform();

    
    if (this.SpriteWinLineRef!=null)
    {
        this.SpriteWinLineRef.StopTransform();
        this.SpriteWinLineRef.Visible(false);
    }

    
    this.ReelsHighlight(false);			
    
    this.LineSprite.Visible(false);
}
//------------------------------------------------------------//
// OVERRIDE
//--------------------------------------------------------------------------//
SlotLine.prototype.ReelsHighlight = function(enb) {
    
    var i,j,sym_ID;

    if (enb==true)
    {
        for (i=0;i<window.NUM_REELS;i++)
        {
            this.SymbolsWinRef[i].Visible(false);
        }
        
        for (i=(window.NUM_REELS-1),j=0;i>=0;i--)
        {
            if (this.SlotComboRef.SimboliVincenti[this.ID][i]!=0)
            {
                this.ApplicationRef.SLOT().REEL_HOLDER().RulloOut( SlotCombo.TAB_LINES[this.ID][i] );
            
                sym_ID=this.SlotComboRef.SimboliEstratti[ SlotCombo.TAB_LINES[this.ID][i] ];
                
                this.SymbolsWinRef[j].SetFrame( parseInt( (sym_ID-window.ID_SIMBOLO_0) ) );
                
                this.SymbolsWinRef[j].Visible(true);
                
                j++;
            }    
        }
    }
    else
    {
        for (i=0;i<window.NUM_REELS;i++)
        {
            if (this.SlotComboRef.SimboliVincenti[this.ID][i]!=0)
            {
                this.ApplicationRef.SLOT().REEL_HOLDER().RulloIn( SlotCombo.TAB_LINES[this.ID][i] );
                
                this.SymbolsWinRef[i].Visible(false);
            }
        }
    }
    
    if (enb==true)
    {
        //this.BallBet.HighLight();
    }
}

//--------------------------------------------------------------------------//
SlotLine.prototype.SetupLineWinDisplay = function(win) {
    
    var xx,yy,idx_reel,multy,win_base;
    var bonus_line;
    
    this.DisplayWinRef.ResetCaption();

    bonus_line=(this.ApplicationRef.SLOT().SLOT_COMBO().GetSimboloCombinazione(this.ApplicationRef.SLOT().SLOT_COMBO().DirettriciVincenti[this.ID])==window.ID_SIMBOLO_BONUS);
    if (bonus_line==true)
    {
        // LINE X WINS BONUS
        this.DisplayWinRef.SetCaption( SlotLine.TAB_CAPTIONS[0][window.LANG]+(this.ID+1)+SlotLine.TAB_CAPTIONS[1][window.LANG] );
    }
    else
    {   
        multy=this.ApplicationRef.SLOT().SLOT_COMBO().DirettriciMoltiplicatore[this.ID];
        
        // Linea 2 vince 5 X2 =10 gettoni
        if (multy>1)
        {
            win_base=win/multy;

            this.DisplayWinRef.SetCaption( SlotLine.TAB_CAPTIONS[0][window.LANG]+(this.ID+1)+SlotLine.TAB_CAPTIONS[2][window.LANG]+win_base.toString()+" X"+multy.toString()+" = "+win.toString()+SlotLine.TAB_CAPTIONS[3][window.LANG]  );
        }
        // Linea 2 vince 10 gettoni
        else
            this.DisplayWinRef.SetCaption( SlotLine.TAB_CAPTIONS[0][window.LANG]+(this.ID+1)+SlotLine.TAB_CAPTIONS[2][window.LANG]+win.toString()+SlotLine.TAB_CAPTIONS[3][window.LANG]  );
    }
    
    this.DisplayWinRef.Visible(true);
    
    
    if (this.DisplayLineRef!=null)
    {
        if (win==0 /*&& bonus_line==false*/)
        {
            this.DisplayLineRef.Visible(false);
        }        
        else
        {   
            this.SpriteWinLineRef.StopTransform();
            this.SpriteWinLineRef.ResetToTop();
            this.SpriteWinLineRef.ResetProperties(true,1.0,0.2);
            
            this.DisplayLineRef.StopTransform();
            this.DisplayLineRef.ResetToTop();
            this.DisplayLineRef.ResetCaption();
            this.DisplayLineRef.SetCaption( win.toString() );
            this.DisplayLineRef.Visible(true);
            
            idx_reel=SlotCombo.TAB_LINES[this.ID][0];
            
            xx=this.ApplicationRef.SLOT().REEL(idx_reel).GetXX();
            yy=this.ApplicationRef.SLOT().REEL(idx_reel).GetYY();
            
            //offs=parseInt ((window.LARGHEZZA_SIMBOLO-this.DisplayLineRef.ACTUAL_W())/2);
            offs=-(this.DisplayLineRef.ACTUAL_W()+40);

            if ((xx+offs)<0)
                offs=(-1*xx);
            
            this.DisplayLineRef.XX ( xx , offs);
            
            this.DisplayLineRef.YY ( yy, 80);
            
            this.DisplayLineRef.MoveEx(0,20,30,10);
            
            this.SpriteWinLineRef.CenterBox(this.DisplayLineRef.ACTUAL_W(),this.DisplayLineRef.ACTUAL_H(),true);
            this.SpriteWinLineRef.Sprite.x+=this.DisplayLineRef.XX_GET();
            this.SpriteWinLineRef.Sprite.y+=this.DisplayLineRef.YY_GET();
            
            this.SpriteWinLineRef.SPRITE_TRANSFORMER().ScaleLoop(0.2,0.6,30,10,0);
            this.SpriteWinLineRef.SPRITE_TRANSFORMER().RotateLoop(0,180,10);
            
            
        }
    }        
}
//--------------------------------------------------------------------------//
SlotLine.prototype.OnLineWin = function(win_value) {

}
//------------------------------------------------------------//
SlotLine.prototype.VisualizzaPuntatore = function(p_Stato) {    

    //this.BallBet.VisualizzaPuntatore(p_Stato);
}
//------------------------------------------------------------//		
SlotLine.prototype.InitializeCoords = function(xx,yy) {            
    //this.InitializePuntatoreBet=false;
}
//--------------------------------------------------------------------------//
SlotLine.prototype.Refresh = function(ellapsed_ms) {
    
    //this.BallBet.Refresh(ellapsed_ms);
}
//------------------------------------------------------------//
