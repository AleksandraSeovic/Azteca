//------------------------------------------------------------//
ConsoleButton.TYPE_PUSH_AND_BACK=0;
ConsoleButton.TYPE_PUSH_AND_KEEP=1;

ConsoleButton.STATE_ENABLED=0;
ConsoleButton.STATE_DISABLED=1;
ConsoleButton.STATE_PUSHING=2;

ConsoleButton.STATE_PUSHED=3;


//--------------------------------------------------------------------------//
function ConsoleButton(id_butt_plancia,res_name,frames,xx,yy,type,parent_container,app_reference,extension = '.png') {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    TiledSprite.call(this,res_name,frames,true,parent_container,extension);

    this.ApplicationRef = app_reference;
    
    this.ID_Button_Plancia=id_butt_plancia;
			
    this.TYPE=type;//ConsoleButton.TYPE_PUSH_AND_BACK;    
    
    this.Stato=ConsoleButton.STATE_DISABLED;
    this.AsyncStato=ConsoleButton.STATE_ENABLED;
    this.TimerStato=0;
    
    this.StatoCorrente=0;
    this.StatoPrecedente=0;
    
    this.StageX=xx;
    this.StageY=yy;
}

// Create a StateBoot.prototype object that inherits from ProgramState.prototype.
ConsoleButton.prototype = Object.create(TiledSprite.prototype); // See note below

// Set the "constructor" property to refer to ConsoleButton
ConsoleButton.prototype.constructor = ConsoleButton;
//------------------------------------------------------------//

ConsoleButton.prototype.Init = function() {
    
    this.Setup();
    
    this.SetButton(true);
    
    this.XX(this.StageX,0);
    this.YY(this.StageY,0);
}
//------------------------------------------------------------//
ConsoleButton.prototype.IsEnabled = function() {

    return (this.Stato==ConsoleButton.STATE_ENABLED);
}

//------------------------------------------------------------//
ConsoleButton.prototype.SetEnable = function(enb) {

    var new_stato;

    if (this.Stato!=ConsoleButton.STATE_PUSHED)
    {
        if (enb==true)
        {
            new_stato=ConsoleButton.STATE_ENABLED;

            this.Visible(true);
        }
        else
        {
            new_stato=ConsoleButton.STATE_DISABLED;
        }
        
        if (this.Stato!=new_stato)
        {
            this.Stato=new_stato;
            this.AggiornaStato(this.Stato);
        }
        
    }
    

}
//------------------------------------------------------------//		
ConsoleButton.prototype.AggiornaStato = function(stato) {

    var l_CurFrame;
    
    l_CurFrame=this.StatoToFrame(stato);
    
    this.SetFrame(l_CurFrame);
}
//------------------------------------------------------------//
ConsoleButton.prototype.StatoToFrame = function(p_Stato) {

    if (this.TotFrames==1)
    {
        switch(p_Stato)
        {
            case ConsoleButton.STATE_ENABLED	:{this.Sprite.alpha=1.0; this.SetMaskFilter(TiledSprite.MASK_STAT_NONE);}break;
            case ConsoleButton.STATE_DISABLED	:{this.Sprite.alpha=0.4; this.SetMaskFilter(TiledSprite.MASK_STAT_NONE);}break;
            case ConsoleButton.STATE_PUSHING	:{this.SetMaskFilter(TiledSprite.MASK_STAT_DARKEN);}break;
            case ConsoleButton.STATE_PUSHED	    :{this.SetMaskFilter(TiledSprite.MASK_STAT_RED);}break;

            default:{}break;
        };
    }
    else
    {
        switch(p_Stato)
        {
            case ConsoleButton.STATE_ENABLED	:{this.Sprite.alpha=1.0; this.SetMaskFilter(TiledSprite.MASK_STAT_NONE);}break;
            case ConsoleButton.STATE_DISABLED	:{this.Sprite.alpha=0.4; this.SetMaskFilter(TiledSprite.MASK_STAT_NONE);}break;
            case ConsoleButton.STATE_PUSHING	:{return 1;}break;
            case ConsoleButton.STATE_PUSHED	    :{return 2;}break;

            default:{}break;
        };
    }
        
    return 0;
}
//------------------------------------------------------------//
ConsoleButton.prototype.Refresh = function(ellapsed_ms) {

    this.TimerRefresh(ellapsed_ms);
    
    if (this.CheckButtStatus(TiledSprite.MASK_BUTT_PUSHED)==true)
    {    
        this.OnMouseClick();
    }

    if (this.CheckButtStatus(TiledSprite.MASK_BUTT_OVER)==true)
    {    
        this.OnMouseOver();
    }
    
    if (this.CheckButtStatus(TiledSprite.MASK_BUTT_OUT)==true)
    {    
        this.OnMouseOut();
    }
    
    
    if (this.AsyncStato==ConsoleButton.STATE_PUSHING)
    {
        if (this.GPTimer==0)
        {
            if (this.TYPE==ConsoleButton.TYPE_PUSH_AND_KEEP)
            {
                if (this.Stato==ConsoleButton.STATE_ENABLED)
                    this.Stato=ConsoleButton.STATE_PUSHED;
                else
                    this.Stato=ConsoleButton.STATE_ENABLED;
            }
            
            this.AsyncStato=ConsoleButton.STATE_ENABLED;

            this.AggiornaStato(this.Stato);
        }
    }
}
//------------------------------------------------------------//
ConsoleButton.prototype.Push = function() {

    this.AsyncStato=ConsoleButton.STATE_PUSHING;

    this.GPTimer=this.ArmaTimer(this.GPTimer,100);

    this.AggiornaStato(this.AsyncStato);
}
//------------------------------------------------------------//		
ConsoleButton.prototype.OnMouseClick = function() {

    if (this.TYPE==ConsoleButton.TYPE_PUSH_AND_KEEP)
    {
        if ((this.Stato==ConsoleButton.STATE_PUSHED && this.AsyncStato==ConsoleButton.STATE_ENABLED)||
            (this.Stato==ConsoleButton.STATE_ENABLED && this.AsyncStato==ConsoleButton.STATE_ENABLED))
        {
            if (this.ID_Button_Plancia!=-1)
                this.ApplicationRef.BUTTON_MANAGER().NotifyStymulus(this.ID_Button_Plancia);
            else
                this.NotifyStymulus();
            
            this.Push();
        }
    }
    else
    {
        if ((this.Stato==ConsoleButton.STATE_ENABLED && this.AsyncStato==ConsoleButton.STATE_ENABLED))
        {
            if (this.ID_Button_Plancia!=-1)
                this.ApplicationRef.BUTTON_MANAGER().NotifyStymulus(this.ID_Button_Plancia);
            else
                this.NotifyStymulus();
            
            this.Push();
        }
    }
}
//------------------------------------------------------------//		
ConsoleButton.prototype.OnMouseOver = function() {
    
    if ((this.Stato==ConsoleButton.STATE_ENABLED && this.AsyncStato==ConsoleButton.STATE_ENABLED))
        this.SetMaskFilter(TiledSprite.MASK_STAT_GREEN);
    
}
//------------------------------------------------------------//		
ConsoleButton.prototype.OnMouseOut = function() {

    if ((this.Stato==ConsoleButton.STATE_ENABLED && this.AsyncStato==ConsoleButton.STATE_ENABLED))
        this.SetMaskFilter(TiledSprite.MASK_STAT_NONE);
}
//------------------------------------------------------------//		
ConsoleButton.prototype.IsPushed = function() {

    if (this.StatoCorrente == ButtonManager.PULSANTE_RILASCIATO)
    {
        this.StatoPrecedente = ButtonManager.PULSANTE_RILASCIATO;
        return false;
    }

    if (this.StatoCorrente != this.StatoPrecedente)
    {
        this.StatoCorrente   = ButtonManager.PULSANTE_RILASCIATO;
        this.StatoPrecedente = ButtonManager.PULSANTE_RILASCIATO;
        return true;
    }

    return false;
}		
//------------------------------------------------------------//
ConsoleButton.prototype.NotifyStymulus = function() {

    this.StatoCorrente=ButtonManager.PULSANTE_PREMUTO;
}
//------------------------------------------------------------//
ConsoleButton.prototype.GetStatus = function() {

    return this.AsyncStato;
}
//------------------------------------------------------------//		
    

//--------------------------------------------------------------------------//