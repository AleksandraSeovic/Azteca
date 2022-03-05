//--------------------------------------------------------------------------//
Player.TAB_AUTO_SPINS=[10,20,30,50,100,500];
//--------------------------------------------------------------------------//
function Player(app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ApplicationRef = app_reference;
    this.Crediti      =0;			// cents

    this.Win          =0;				// coins
    this.TotalBet     =0;		// coins
    this.LineBet      =0;		// coins
    this.Lines        =0;		// coins
    this.LastVincita  =0;		// coins
    this.AutoPlaySpins=0;
    this.RefreshCoins =false;

    this.TAB_COIN_VALUES=new Array(1);
    this.TAB_COIN_VALUES[0]=1;
    this.CoinValueIndex=0;
}

// Create a Player.prototype object that inherits from SObject.prototype.
Player.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to Player
Player.prototype.constructor = Player;

//--------------------------------------------------------------------------//
Player.prototype.Init = function() {

}
//------------------------------------------------------------//
Player.prototype.Reset = function() {

    if (window.CONNECT2SERVER==false)
        this.Crediti=100;
    else
        this.Crediti=0;
    
    this.ResetSession();
}
//------------------------------------------------------------//
Player.prototype.ResetSession = function() {
    this.TotalBet=0;
    this.LineBet=1;
    this.Lines=window.NUM_LINEE;
    this.Win=0;
    this.AutoPlaySpins=0;
    this.LastVincita=0;
    this.CoinValueIndex=0;
}
//------------------------------------------------------------//
Player.prototype.COINS_GET = function() {
    return this.Divisa2Coins(this.Crediti);
}
//------------------------------------------------------------//
Player.prototype.COINS_AT_MIN_COINVALUE = function() {
    return parseInt ( (this.Crediti/this.TAB_COIN_VALUES[0]) );
}
//------------------------------------------------------------//
Player.prototype.COINS_SET = function(setValue) {
    this.Crediti = this.Coins2Divisa(setValue);
}
//------------------------------------------------------------//
Player.prototype.COINS_DEC = function(dec) {

    var dec_cents=this.Coins2Divisa(dec);

    if (this.Crediti >=dec_cents)
        this.Crediti -=dec_cents;
    else
        this.Crediti=0;
}

//------------------------------------------------------------//
Player.prototype.CREDITI_GET = function() {
    return this.Crediti;
}
//------------------------------------------------------------//
Player.prototype.COIN_VALUE_GET = function() {
    return this.TAB_COIN_VALUES[this.CoinValueIndex];
}
//------------------------------------------------------------//
Player.prototype.COIN_VALUE_SET = function(setValue) {

    for (var i=0;i<this.TAB_COIN_VALUES.length;i++)
        if (setValue==this.TAB_COIN_VALUES[i])
            break;

    if (i<this.TAB_COIN_VALUES.length)
        this.CoinValueIndex=i;
}
//------------------------------------------------------------//
Player.prototype.COIN_VALUE_INDEX = function() {
    return this.CoinValueIndex;
}
//------------------------------------------------------------//
Player.prototype.COIN_VALUE_INC_ENABLED = function() {
    
    if ((this.CoinValueIndex+1)>=this.TAB_COIN_VALUES.length)
        return false;
    return true;
}
//------------------------------------------------------------//
Player.prototype.COIN_VALUE_DEC_ENABLED = function() {
    
    return  (this.CoinValueIndex>0)
}
//------------------------------------------------------------//
Player.prototype.COIN_VALUE_INC = function() {

    if (this.CoinValueIndex<(this.TAB_COIN_VALUES.length-1))
        this.CoinValueIndex++;
}
//------------------------------------------------------------//
Player.prototype.COIN_VALUE_DEC = function() {

    if (this.CoinValueIndex!=0)
        this.CoinValueIndex--;
}

//------------------------------------------------------------//
Player.prototype.AUTO_SPINS_GET = function() {
    return this.AutoPlaySpins;
}
//------------------------------------------------------------//
Player.prototype.AUTO_SPINS_SET = function(auto) {
    this.AutoPlaySpins=auto;
}
//------------------------------------------------------------//
Player.prototype.AUTO_SPINS_DEC = function() {

    if (this.AutoPlaySpins!=0)
        this.AutoPlaySpins--;
}
//------------------------------------------------------------//
Player.prototype.COINS_PLAYABLES = function(coins_to_play) {

    return (coins_to_play <= this.COINS_GET() );
}
//------------------------------------------------------------//
Player.prototype.COINS_PLAYED = function(consumed_coins) {
    
    var initial_crediti=this.COINS_GET();

    if (this.COINS_GET()>=consumed_coins)
    {
        this.COINS_DEC(consumed_coins);
    }
    else
        this.COINS_SET(0);

    this.TotalBet=consumed_coins;

    this.Lines=this.ApplicationRef.SLOT().LINES();

    this.LineBet=parseInt ( this.TotalBet/this.Lines );
    if (this.LineBet==0)
        this.LineBet=1;
}

//------------------------------------------------------------//
Player.prototype.BET_DIVISA = function() {
    return this.Coins2Divisa(this.TotalBet);
}
//------------------------------------------------------------//
// Ritorna il bet totale in coins
Player.prototype.TOTAL_BET = function() {
    return this.TotalBet;
}
//------------------------------------------------------------//
// Ritorna il bet x linea in coins
Player.prototype.BET_LINE = function() {
    return this.LineBet;
}
//------------------------------------------------------------//
// Ritorna il numero di linee
Player.prototype.LINES = function() {
    return this.Lines;
}
//------------------------------------------------------------//
// Ultima vincita notificata in divisa_cents
Player.prototype.ULTIMA_VINCITA = function() {
    return this.LastVincita;
}
//------------------------------------------------------------//
Player.prototype.NotificaVincita = function(win_coins) {

    this.LastVincita=win_coins;
}
//------------------------------------------------------------//
Player.prototype.Divisa2Coins = function(divisa_cents) {

    return parseInt ( (divisa_cents/this.COIN_VALUE_GET()) );
}
//------------------------------------------------------------//
Player.prototype.Coins2Divisa = function(coins) {
    
    return parseInt ( (coins*this.COIN_VALUE_GET()) );
}
//------------------------------------------------------------//
Player.prototype.REFRESH_COINS = function(enb) {    
    this.RefreshCoins=enb;
}
//------------------------------------------------------------//
Player.prototype.Parse_PLAYER_STATUS = function(chunk_to_parse) {    
    
    var esito=this.ParseServer_Init(chunk_to_parse);

    if (esito==true)
    {
        this.Crediti=this.ParseServer_Dump_UINT(-1);

        if (this.RefreshCoins==false)
        {
            this.Win=this.ParseServer_Dump_UINT(-1);

            this.Lines=this.ParseServer_Dump_UINT(-1);

            this.LineBet=this.ParseServer_Dump_UINT(-1);

            this.COIN_VALUE_SET(this.ParseServer_Dump_UINT(-1));

            this.ApplicationRef.Recover();
        }
    }

    m_RefreshCoins=false;

    return esito;
}
//------------------------------------------------------------//
Player.prototype.Parse_COIN_VALUES = function(chunk_to_parse) {    
    
    var i=0;

    var esito=this.ParseServer_Init(chunk_to_parse);

    if (esito==true)
    {
        this.TAB_COIN_VALUES=new Array((this.ServerData.length-1));

        for (i=0;i<this.TAB_COIN_VALUES.length;i++)
            this.TAB_COIN_VALUES[i]=this.ParseServer_Dump_UINT(-1);
    }

    return esito;
}
//------------------------------------------------------------//

//--------------------------------------------------------------------------//
