//--------------------------------------------------------------------------//
// Classe che specifica contenuti/offset del messaggio WP (Win Pattern) in arrivo dal Server
//--------------------------------------------------------------------------//
WinDescriptor.WP_OFFSET_WIN_TYPE=0;

// Tipologia e descrittori di vincita in arrivo dal server
    WinDescriptor.WIN_TYPE_LINE_SX=1;
    WinDescriptor.WIN_TYPE_LINE_DX=2;
    WinDescriptor.WIN_TYPE_SCATTER=3;
    WinDescriptor.WIN_TYPE_BONUS  =4;

//------------------------------------------------------------//
    WinDescriptor.WP_OFFSET_WIN_SUBTYPE=1;
    // WIN_TYPE_LINE_SX,WIN_TYPE_LINE_DX: [Numero di linea]
    // WIN_TYPE_SCATTER					: [Numero di FreeSpins]
    // WIN_TYPE_BONUS					: [Numero di linea]
//------------------------------------------------------------//
    WinDescriptor.WP_OFFSET_WIN_VALUE  =2;
    // WIN_TYPE_LINE_SX,WIN_TYPE_LINE_DX,WIN_TYPE_SCATTER 	: [Valore di vincita in coins]
    // WIN_TYPE_BONUS										: [ID del bonus]
//------------------------------------------------------------//
    WinDescriptor.WP_OFFSET_ID_SYMBOL=3;
    WinDescriptor.WP_OFFSET_SYMBOL_OCC=4;
    WinDescriptor.WP_OFFSET_SYMBOL_POS_0=5;
    WinDescriptor.WP_OFFSET_SYMBOL_POS_1=6;
    WinDescriptor.WP_OFFSET_SYMBOL_POS_2=7;
    WinDescriptor.WP_OFFSET_SYMBOL_POS_3=8;
    WinDescriptor.WP_OFFSET_SYMBOL_POS_4=9;

//--------------------------------------------------------------------------//
function WinDescriptor() {    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);
}

// Create a WinDescriptor.prototype object that inherits from SObject.prototype.
WinDescriptor.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotCombo
WinDescriptor.prototype.constructor = WinDescriptor;
    
