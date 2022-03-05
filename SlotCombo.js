//---------------------------------------------------------------------------//
// tipi di eventi vincita
SlotCombo.MASK_WIN_NONE			=	0x0000;
SlotCombo.MASK_WIN_COMBINAZIONE	=	0x0001;
SlotCombo.MASK_WIN_BONUS_TOPLAY	=	0x0002;
SlotCombo.MASK_WIN_BONUS_PLAYED	=	0x0004;
SlotCombo.MASK_WIN_SCATTER		=	0x0008;
SlotCombo.MASK_WIN_FREESPIN		=	0x0010;

//---------------------------------------------------------------------------//
SlotCombo.ID_SLOT_NULLA=0;			//0

SlotCombo.ID_2_SIMBOLO_0		=1;			// 1
SlotCombo.ID_2_SIMBOLO_1		=2;
SlotCombo.ID_2_SIMBOLO_2		=3;
SlotCombo.ID_2_SIMBOLO_3		=4;
SlotCombo.ID_2_SIMBOLO_4		=5;
SlotCombo.ID_2_SIMBOLO_5		=6;
SlotCombo.ID_2_SIMBOLO_6		=7;
SlotCombo.ID_2_SIMBOLO_7		=8;
SlotCombo.ID_2_SIMBOLO_8		=9;
SlotCombo.ID_2_SIMBOLO_9		=10;
SlotCombo.ID_2_SIMBOLO_JOLLY    =11;
SlotCombo.ID_2_SIMBOLO_SCATTER	=12;
SlotCombo.ID_2_SIMBOLO_BONUS	=13;       // 13

SlotCombo.ID_3_SIMBOLO_0		=14;      	// 14
SlotCombo.ID_3_SIMBOLO_1		=15;
SlotCombo.ID_3_SIMBOLO_2		=16;
SlotCombo.ID_3_SIMBOLO_3		=17;
SlotCombo.ID_3_SIMBOLO_4		=18;
SlotCombo.ID_3_SIMBOLO_5		=19;
SlotCombo.ID_3_SIMBOLO_6		=20;
SlotCombo.ID_3_SIMBOLO_7		=21;
SlotCombo.ID_3_SIMBOLO_8        =22;
SlotCombo.ID_3_SIMBOLO_9        =23;
SlotCombo.ID_3_SIMBOLO_JOLLY	=24;
SlotCombo.ID_3_SIMBOLO_SCATTER  =25;
SlotCombo.ID_3_SIMBOLO_BONUS	=26;       // 26

SlotCombo.ID_4_SIMBOLO_0		=14+(13*1);     // 27
SlotCombo.ID_4_SIMBOLO_1		=15+(13*1);
SlotCombo.ID_4_SIMBOLO_2		=16+(13*1);
SlotCombo.ID_4_SIMBOLO_3		=17+(13*1);
SlotCombo.ID_4_SIMBOLO_4		=18+(13*1);
SlotCombo.ID_4_SIMBOLO_5		=19+(13*1);
SlotCombo.ID_4_SIMBOLO_6		=20+(13*1);
SlotCombo.ID_4_SIMBOLO_7		=21+(13*1);
SlotCombo.ID_4_SIMBOLO_8        =22+(13*1);
SlotCombo.ID_4_SIMBOLO_9        =23+(13*1);
SlotCombo.ID_4_SIMBOLO_JOLLY	=24+(13*1);
SlotCombo.ID_4_SIMBOLO_SCATTER  =25+(13*1);
SlotCombo.ID_4_SIMBOLO_BONUS	=26+(13*1);    // 39

SlotCombo.ID_5_SIMBOLO_0		=14+(13*2);     // 40
SlotCombo.ID_5_SIMBOLO_1		=15+(13*2);
SlotCombo.ID_5_SIMBOLO_2		=16+(13*2);
SlotCombo.ID_5_SIMBOLO_3		=17+(13*2);
SlotCombo.ID_5_SIMBOLO_4		=18+(13*2);
SlotCombo.ID_5_SIMBOLO_5		=19+(13*2);
SlotCombo.ID_5_SIMBOLO_6		=20+(13*2);
SlotCombo.ID_5_SIMBOLO_7		=21+(13*2);
SlotCombo.ID_5_SIMBOLO_8        =22+(13*2);
SlotCombo.ID_5_SIMBOLO_9        =23+(13*2);
SlotCombo.ID_5_SIMBOLO_JOLLY	=24+(13*2);
SlotCombo.ID_5_SIMBOLO_SCATTER  =25+(13*2);
SlotCombo.ID_5_SIMBOLO_BONUS	=26+(13*2);    // 52

//---------------------------------------
SlotCombo.ID_SCATTER_2=53;	// SCATTER
SlotCombo.ID_SCATTER_3=54;	// SCATTER
SlotCombo.ID_SCATTER_4=55;	// SCATTER
SlotCombo.ID_SCATTER_5=56;	// SCATTER

//------------------------------------------------------------//
SlotCombo.TAB_COMBO=[
 //
// ID_SIMBOLO_0
                [SlotCombo.ID_2_SIMBOLO_0,SlotCombo.ID_3_SIMBOLO_0,SlotCombo.ID_4_SIMBOLO_0,SlotCombo.ID_5_SIMBOLO_0],
// ID_SIMBOLO_1
                [SlotCombo.ID_2_SIMBOLO_1,SlotCombo.ID_3_SIMBOLO_1,SlotCombo.ID_4_SIMBOLO_1,SlotCombo.ID_5_SIMBOLO_1],
// ID_SIMBOLO_2
                [SlotCombo.ID_2_SIMBOLO_2,SlotCombo.ID_3_SIMBOLO_2,SlotCombo.ID_4_SIMBOLO_2,SlotCombo.ID_5_SIMBOLO_2],
// ID_SIMBOLO_3
                [SlotCombo.ID_2_SIMBOLO_3,SlotCombo.ID_3_SIMBOLO_3,SlotCombo.ID_4_SIMBOLO_3,SlotCombo.ID_5_SIMBOLO_3],
// ID_SIMBOLO_4
                [SlotCombo.ID_2_SIMBOLO_4,SlotCombo.ID_3_SIMBOLO_4,SlotCombo.ID_4_SIMBOLO_4,SlotCombo.ID_5_SIMBOLO_4],
// ID_SIMBOLO_5
                [SlotCombo.ID_2_SIMBOLO_5,SlotCombo.ID_3_SIMBOLO_5,SlotCombo.ID_4_SIMBOLO_5,SlotCombo.ID_5_SIMBOLO_5],
// ID_SIMBOLO_6
                [SlotCombo.ID_2_SIMBOLO_6,SlotCombo.ID_3_SIMBOLO_6,SlotCombo.ID_4_SIMBOLO_6,SlotCombo.ID_5_SIMBOLO_6],
// ID_SIMBOLO_7
                [SlotCombo.ID_2_SIMBOLO_7,SlotCombo.ID_3_SIMBOLO_7,SlotCombo.ID_4_SIMBOLO_7,SlotCombo.ID_5_SIMBOLO_7],
// ID_SIMBOLO_8
                [SlotCombo.ID_2_SIMBOLO_8,SlotCombo.ID_3_SIMBOLO_8,SlotCombo.ID_4_SIMBOLO_8,SlotCombo.ID_5_SIMBOLO_8],
// ID_SIMBOLO_9
                [SlotCombo.ID_2_SIMBOLO_9,SlotCombo.ID_3_SIMBOLO_9,SlotCombo.ID_4_SIMBOLO_9,SlotCombo.ID_5_SIMBOLO_9],
// ID_SIMBOLO_JOLLY
                [SlotCombo.ID_2_SIMBOLO_JOLLY,SlotCombo.ID_3_SIMBOLO_JOLLY,SlotCombo.ID_4_SIMBOLO_JOLLY,SlotCombo.ID_5_SIMBOLO_JOLLY],
// ID_SIMBOLO_SCATTER
                [SlotCombo.ID_2_SIMBOLO_SCATTER,SlotCombo.ID_3_SIMBOLO_SCATTER,SlotCombo.ID_4_SIMBOLO_SCATTER,SlotCombo.ID_5_SIMBOLO_SCATTER],
// ID_SIMBOLO_BONUS
                [SlotCombo.ID_2_SIMBOLO_BONUS,SlotCombo.ID_3_SIMBOLO_BONUS,SlotCombo.ID_4_SIMBOLO_BONUS,SlotCombo.ID_5_SIMBOLO_BONUS]
];
//------------------------------------------------------------//
SlotCombo.TAB_LINES=[
    [ 5, 6, 7, 8, 9],	// 1
    [ 0, 1, 2, 3, 4],	// 2
    [10,11,12,13,14],	// 3
    [ 0, 6,12, 8, 4],	// 4
    [10, 6, 2, 8,14],	// 5

    [ 5, 1, 7, 3, 9],	// 6
    [ 5,11, 7,13, 9],	// 7
    [ 0, 1, 7,13,14],	// 8
    [10,11, 7, 3, 4],	// 9
    [ 5,11, 7, 3, 9],	// 10

    [ 5, 1, 7,13, 9],	// 11
    [ 0, 6, 7, 8, 4],	// 12
    [10, 6, 7, 8,14],	// 13
    [ 0, 6, 2, 8, 4],	// 14
    [10, 6,12, 8,14]	// 15

];

//--------------------------------------------------------------------------//
function SlotCombo(app_reference,slot_ref) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our Program-specific properties
    this.ApplicationRef = app_reference;
    this.SlotReference  = slot_ref;
    this.SimboliEstratti=null;

    this.ValoreVincitaAssegnata=0;
    this.MaskEventoVincita=0;

    this.VettoreIndiciRullo=new Array(window.NUM_SIMBOLI_RUOTA);
    this.VettoreIndiciLinea=new Array(window.NUM_REELS);

    this.DirettriciVincenti=new Array(window.NUM_LINEE);
    this.DirettriciVincite=new Array(window.NUM_LINEE);
    this.DirettriciDescriptor=new Array(window.NUM_LINEE);
    this.DirettriciMoltiplicatore=new Array(window.NUM_LINEE);

    this.CombinazioniPresenti=new Array(window.NUM_COMBINAZIONI_SLOT);

    this.SimboliVincenti		= new Array (window.NUM_LINEE);
    for (var i=0;i<this.SimboliVincenti.length;i++)
        this.SimboliVincenti[i]=new Array (window.NUM_REELS);

    this.PatternScattered		= new Array(window.PATTERN_SIMBOLI);

    this.PatternSimboliVincenti= new Array(window.PATTERN_SIMBOLI);

    this.TAB_WINS = new Array(window.NUM_COMBINAZIONI_SLOT);
    this.TAB_WINS.fill(0);
}

// Create a SlotCombo.prototype object that inherits from SObject.prototype.
SlotCombo.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotCombo
SlotCombo.prototype.constructor = SlotCombo;
//--------------------------------------------------------------------------//
SlotCombo.prototype.Init = function() {
    this.SimboliEstratti=this.SlotReference.GetSimboliEstratti();
}
//--------------------------------------------------------------------------//
SlotCombo.prototype.Reset = function() {

    this.ResetWinPattern();
}
//--------------------------------------------------------------------------//
SlotCombo.prototype.ResetWinPattern = function() {

    this.ValoreVincitaAssegnata=0;

    this.MaskEventoVincita=SlotCombo.MASK_WIN_NONE;

    for (var i=0;i<window.NUM_LINEE;i++)
        this.SimboliVincenti[i].fill(0);

    this.CombinazioniPresenti.fill(0);
    this.DirettriciVincenti.fill(0);
    this.DirettriciDescriptor.fill(0);
    this.DirettriciVincite.fill(0);
    this.DirettriciMoltiplicatore.fill(0);
    this.PatternSimboliVincenti.fill(0);
    this.PatternScattered.fill(0);
}
//--------------------------------------------------------------------------//
SlotCombo.prototype.MaskEventoVincita_GET = function() {
    return this.MaskEventoVincitaa;
}
//--------------------------------------------------------------------------//
SlotCombo.prototype.MaskEventoVincita_SET = function(msk) {
     this.MaskEventoVincita=msk;
}
//--------------------------------------------------------------------------//
SlotCombo.prototype.MaskEventoVincita_CHECK = function(msk) {
     return ((this.MaskEventoVincita&msk)!=0);
}
//------------------------------------------------------------//
SlotCombo.prototype.GetVettoreIndiciRullo = function(p_IdRullo) {

    for (var i=0;i<window.NUM_SIMBOLI_RUOTA;i++)
        this.VettoreIndiciRullo[i]=(p_IdRullo+(window.NUM_REELS*i));
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetIdxRullo = function(p_IdxSimbolo) {

    return parseInt((p_IdxSimbolo%window.NUM_REELS));
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetPosizioneInRullo = function(p_IdxSimbolo) {
    return parseInt((p_IdxSimbolo/window.NUM_REELS));
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetOccorrenzaSimboloInPattern = function(p_IDSimbolo) {

    var i;
    var l_Occ=0;

    for (i=0;i<window.PATTERN_SIMBOLI;i++)
        if (this.SimboliEstratti[i]==p_IDSimbolo)
        {
            l_Occ++;
        }

    return l_Occ;
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetOccorrenzaSimboloInRullo = function(p_IDSimbolo,p_IDRullo) {

    var i,l_Indice;
    var l_Occ=0;

    for (i=0;i<window.NUM_SIMBOLI_RUOTA;i++)
    {
        l_Indice=(p_IDRullo+(window.NUM_REELS*i));

        if (this.SimboliEstratti[l_Indice]==p_IDSimbolo)
        {
            l_Occ++;
            break;
        }
    }

    return l_Occ;
}
//--------------------------------------------------------------//
SlotCombo.prototype.IsSimboloCombinazione = function(p_IDCombinazione,p_Simbolo) {
    if (this.IsSimboloJolly(p_Simbolo))
        return true;

    if (p_Simbolo!=this.GetSimboloCombinazione(p_IDCombinazione))
        return false;

    return true;
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetNumDirettriciVincenti = function() {

    var num=0;

    for (var i=0;i<window.NUM_LINEE;i++)
        if (this.DirettriciVincenti[i]!=0)
            num++;

    return num;
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetQuotazioneSimbolo = function(sym,nn) {

    return this.GetQuotazioneCombinazione ( (1+(sym-1))+(window.SLICE_COMBINAZIONI_SLOT*(nn-2)) );
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetQuotazioneOrigine = function(id_combo) {
    return this.TAB_WINS[id_combo];
}
//--------------------------------------------------------------//
SlotCombo.prototype.GetVincitaAssegnata = function(id_combo) {
    return this.ValoreVincitaAssegnata;
}
//------------------------------------------------------------//
SlotCombo.prototype.Parse_PAY_TABLE = function(chunk_to_parse) {
    var esito=false;
    var i=0;

    esito=this.ParseServer_Init(chunk_to_parse);

    if (esito==true)
    {
        if (this.ServerData.length!=window.NUM_COMBINAZIONI_SLOT)
        {
            esito=false;
        }
        else
        {
            for (i=0;i<(window.NUM_COMBINAZIONI_SLOT-1);i++)
            {
                this.TAB_WINS[(i+1)]=this.ParseServer_Dump_UINT(-1);	// 1 based per comb. nulla nella prima entry
            }

            //Application.PROGRAMMA().OVERLAY_PAGE().PAYTABLE().Render();
        }
    }

    return esito;
}
//------------------------------------------------------------//
SlotCombo.prototype.Parse_WIN_PATTERN = function(chunk_to_parse) {
    var i,win_type,win_subtype,win_value,win_sym,sym_occ,id_combo;

    var l_VettoreSimboliVincenti=Array(window.NUM_REELS);

    esito=this.ParseServer_Init(chunk_to_parse);

    if (esito==true)
    {
        win_type=this.ParseServer_Dump_UINT(-1);

        win_subtype=this.ParseServer_Dump_UINT(-1);


        switch (win_type)
        {
            // Vincita sulla linea
            case WinDescriptor.WIN_TYPE_LINE_SX:
            case WinDescriptor.WIN_TYPE_LINE_DX:
            case WinDescriptor.WIN_TYPE_BONUS:
            {
                win_multiplier=this.ParseServer_Dump_UINT(-1);

                win_value=this.ParseServer_Dump_UINT(-1);

                win_sym=this.ParseServer_Dump_UINT(-1);

                sym_occ=this.ParseServer_Dump_UINT(-1);

                id_combo=this.IdentifyCombo(win_sym,sym_occ);

                if (id_combo==0 || id_combo>window.NUM_COMBINAZIONI_SLOT)
                {
                    esito=false;
                }
                else
                {
                    //************************************
                    // win_subtype = numero di linea
                    //************************************
                    this.GetVettoreIndiciLinea(win_subtype);

                    // Registra l'ID della combo
                    this.DirettriciVincenti[win_subtype]=id_combo;

                    // Registra il tipo di vincita : Line sx o Line dx
                    this.DirettriciDescriptor[win_subtype]=win_type;

                    // Registra le flag che identificano i simboli vincenti
                    l_VettoreSimboliVincenti.fill(0);

                    for (i=0;i<sym_occ;i++)
                    {
                        l_VettoreSimboliVincenti[this.ParseServer_Dump_UINT(-1)]=1;
                    }

                    for (i=0;i<window.NUM_REELS;i++)
                    {
                        this.SimboliVincenti[win_subtype][i]=l_VettoreSimboliVincenti[i];

                        this.PatternSimboliVincenti[this.VettoreIndiciLinea[i]]|=l_VettoreSimboliVincenti[i];
                    }

                    this.CombinazioniPresenti[id_combo]++;


                    // Vincita bonus
                    if (win_type==WinDescriptor.WIN_TYPE_BONUS)
                    {
                        this.DirettriciMoltiplicatore[win_subtype]=1;

                        //this.ApplicationRef.SLOT().BONUSSTAGE().Parse_BONUS_ACTIVATE( win_value );

                        this.MaskEventoVincita|=SlotCombo.MASK_WIN_BONUS_TOPLAY;
                    }
                    else
                    {
                        // Registra il valore della vincita
                        this.DirettriciVincite[win_subtype]=win_value;

                        this.ValoreVincitaAssegnata+=win_value;

                        // Registra il moltiplicatore
                        this.DirettriciMoltiplicatore[win_subtype]=win_multiplier;


                        this.MaskEventoVincita|=SlotCombo.MASK_WIN_COMBINAZIONE;
                    }
                }
            }break;

            // Bonus (scatter)
/*
            case WinDescriptor.WIN_TYPE_BONUS:
            {
                win_value=this.ParseServer_Dump_UINT(-1);

                win_sym=this.ParseServer_Dump_UINT(-1);

                sym_occ=this.ParseServer_Dump_UINT(-1);

                id_combo=this.IdentifyCombo(win_sym,sym_occ);

                if (id_combo==0 || id_combo>window.NUM_COMBINAZIONI_SLOT)
                    esito=false;
                else
                {
                    for (i=0;i<window.PATTERN_SIMBOLI;i++)
                    {
                        if (this.SimboliEstratti[i]==window.ID_SIMBOLO_BONUS)
                        {
                            this.PatternScattered[i]=1;

                            this.PatternSimboliVincenti[i]=1;

                            if (--sym_occ==0)
                                break;
                        }
                    }

                    this.CombinazioniPresenti[id_combo]=1;

                    //this.ValoreVincitaAssegnata+=win_value;//GetQuotazioneCombinazione(id_combo);

                    this.MaskEventoVincita|=SlotCombo.MASK_WIN_SCATTER;

                    //************************************
                    // win_subtype = numero free spins
                    //************************************
                    if (win_subtype!=0)
                    {
                        this.ApplicationRef.SLOT().BONUSSTAGE().Parse_BONUS_ACTIVATE( win_value );

                        this.MaskEventoVincita|=SlotCombo.MASK_WIN_BONUS_TOPLAY;
                    }
                }
            }break;
*/
            // Vincita scatter
            case WinDescriptor.WIN_TYPE_SCATTER:
            {
                win_value=this.ParseServer_Dump_UINT(-1);

                win_sym=this.ParseServer_Dump_UINT(-1);

                sym_occ=this.ParseServer_Dump_UINT(-1);

                id_combo=this.IdentifyCombo(win_sym,sym_occ);

                if (id_combo==0 || id_combo>window.NUM_COMBINAZIONI_SLOT)
                    esito=false;
                else
                {
                    for (i=0;i<window.PATTERN_SIMBOLI;i++)
                    {
                        if (this.SimboliEstratti[i]==window.ID_SIMBOLO_SCATTER)
                        {
                            this.PatternScattered[i]=1;

                            this.PatternSimboliVincenti[i]=1;

                            if (--sym_occ==0)
                                break;
                        }
                    }

                    this.CombinazioniPresenti[id_combo]=1;

                    //this.ValoreVincitaAssegnata+=win_value;//GetQuotazioneCombinazione(id_combo);

                    this.MaskEventoVincita|=SlotCombo.MASK_WIN_SCATTER;

                    //************************************
                    // win_subtype = numero free spins
                    //************************************
                    if (win_subtype!=0)
                    {
                        this.ApplicationRef.SLOT().FREESPIN().Parse_FREESPIN_ACTIVATE(win_subtype,win_value);

                        this.MaskEventoVincita|=SlotCombo.MASK_WIN_FREESPIN;
                    }
                }
            }break;

            default:break;
        }
    }

    return esito;
}
//--------------------------------------------------------------//
// OVERRIDE
SlotCombo.prototype.IsHold = function(index) {
    return false;
}
//--------------------------------------------------------------//
// OVERRIDE
SlotCombo.prototype.GetQuotazioneCombinazione = function(p_IDCombinazione) {

    this.ASSERT( (p_IDCombinazione<window.NUM_COMBINAZIONI_SLOT) ,"INVALID COMBO DETECTED!"+p_IDCombinazione);

    var quot=(this.TAB_WINS[p_IDCombinazione]*this.ApplicationRef.SLOT().BET_LINE()*this.ApplicationRef.PLAYER().COIN_VALUE_GET());

    return quot;
}
//--------------------------------------------------------------//
// OVERRIDE
SlotCombo.prototype.IsSimboloJolly = function(p_Simbolo) {

    if (p_Simbolo==window.ID_SIMBOLO_JOLLY)
        return true;

    return false;
}
//--------------------------------------------------------------//
// OVERRIDE
SlotCombo.prototype.GetSimboloCombinazione = function(p_IDCombinazione) {

    var l_Simbolo;

    l_Simbolo=window.ID_DUMMY;

    switch (p_IDCombinazione)
    {
        case SlotCombo.ID_2_SIMBOLO_0:
        case SlotCombo.ID_3_SIMBOLO_0:
        case SlotCombo.ID_4_SIMBOLO_0:
        case SlotCombo.ID_5_SIMBOLO_0:
        {
            l_Simbolo=window.ID_SIMBOLO_0;
        } break;

        case SlotCombo.ID_2_SIMBOLO_1:
        case SlotCombo.ID_3_SIMBOLO_1:
        case SlotCombo.ID_4_SIMBOLO_1:
        case SlotCombo.ID_5_SIMBOLO_1:
        {
            l_Simbolo=window.ID_SIMBOLO_1;
        } break;

        case SlotCombo.ID_2_SIMBOLO_2:
        case SlotCombo.ID_3_SIMBOLO_2:
        case SlotCombo.ID_4_SIMBOLO_2:
        case SlotCombo.ID_5_SIMBOLO_2:
        {
            l_Simbolo=window.ID_SIMBOLO_2;
        } break;

        case SlotCombo.ID_2_SIMBOLO_3:
        case SlotCombo.ID_3_SIMBOLO_3:
        case SlotCombo.ID_4_SIMBOLO_3:
        case SlotCombo.ID_5_SIMBOLO_3:
        {
            l_Simbolo=window.ID_SIMBOLO_3;
        } break;

        case SlotCombo.ID_2_SIMBOLO_4:
        case SlotCombo.ID_3_SIMBOLO_4:
        case SlotCombo.ID_4_SIMBOLO_4:
        case SlotCombo.ID_5_SIMBOLO_4:
        {
            l_Simbolo=window.ID_SIMBOLO_4;
        } break;

        case SlotCombo.ID_2_SIMBOLO_5:
        case SlotCombo.ID_3_SIMBOLO_5:
        case SlotCombo.ID_4_SIMBOLO_5:
        case SlotCombo.ID_5_SIMBOLO_5:
        {
            l_Simbolo=window.ID_SIMBOLO_5;
        } break;

        case SlotCombo.ID_2_SIMBOLO_6:
        case SlotCombo.ID_3_SIMBOLO_6:
        case SlotCombo.ID_4_SIMBOLO_6:
        case SlotCombo.ID_5_SIMBOLO_6:
        {
            l_Simbolo=window.ID_SIMBOLO_6;
        } break;

        case SlotCombo.ID_2_SIMBOLO_7:
        case SlotCombo.ID_3_SIMBOLO_7:
        case SlotCombo.ID_4_SIMBOLO_7:
        case SlotCombo.ID_5_SIMBOLO_7:
        {
            l_Simbolo=window.ID_SIMBOLO_7;
        } break;

        case SlotCombo.ID_2_SIMBOLO_8:
        case SlotCombo.ID_3_SIMBOLO_8:
        case SlotCombo.ID_4_SIMBOLO_8:
        case SlotCombo.ID_5_SIMBOLO_8:
        {
            l_Simbolo=window.ID_SIMBOLO_8;
        } break;

        case SlotCombo.ID_2_SIMBOLO_9:
        case SlotCombo.ID_3_SIMBOLO_9:
        case SlotCombo.ID_4_SIMBOLO_9:
        case SlotCombo.ID_5_SIMBOLO_9:
        {
            l_Simbolo=window.ID_SIMBOLO_9;
        } break;

        case SlotCombo.ID_2_SIMBOLO_JOLLY:
        case SlotCombo.ID_3_SIMBOLO_JOLLY:
        case SlotCombo.ID_4_SIMBOLO_JOLLY:
        case SlotCombo.ID_5_SIMBOLO_JOLLY:
        {
            l_Simbolo=window.ID_SIMBOLO_JOLLY;
        } break;

        case SlotCombo.ID_2_SIMBOLO_SCATTER:
        case SlotCombo.ID_3_SIMBOLO_SCATTER:
        case SlotCombo.ID_4_SIMBOLO_SCATTER:
        case SlotCombo.ID_5_SIMBOLO_SCATTER:
        case SlotCombo.ID_SCATTER_2:
        case SlotCombo.ID_SCATTER_3:
        case SlotCombo.ID_SCATTER_4:
        case SlotCombo.ID_SCATTER_5:
        {
            l_Simbolo=window.ID_SIMBOLO_SCATTER;
        } break;


        case SlotCombo.ID_2_SIMBOLO_BONUS:
        case SlotCombo.ID_3_SIMBOLO_BONUS:
        case SlotCombo.ID_4_SIMBOLO_BONUS:
        case SlotCombo.ID_5_SIMBOLO_BONUS:
        {
            l_Simbolo=window.ID_SIMBOLO_BONUS;
        } break;

        default:break;
    };

    return l_Simbolo;
}
//------------------------------------------------------------//
// OVERRIDE
SlotCombo.prototype.GetNumSimboliCombinazione = function(p_IDCombinazione) {

    if ((p_IDCombinazione>=SlotCombo.ID_2_SIMBOLO_0 && p_IDCombinazione<=SlotCombo.ID_2_SIMBOLO_JOLLY))
        return 2;

    if ((p_IDCombinazione>=SlotCombo.ID_3_SIMBOLO_0 && p_IDCombinazione<=SlotCombo.ID_3_SIMBOLO_JOLLY))
        return 3;

    if ((p_IDCombinazione>=SlotCombo.ID_4_SIMBOLO_0 && p_IDCombinazione<=SlotCombo.ID_4_SIMBOLO_JOLLY))
        return 4;

    return 5;
}
//--------------------------------------------------------------//
// OVERRIDE
SlotCombo.prototype.GetVettoreIndiciLinea = function(p_IdLinea) {

    for (var i=0;i<window.NUM_REELS;i++)
        this.VettoreIndiciLinea[i]=SlotCombo.TAB_LINES[p_IdLinea][i];
}
//---------------------------------------------------------------------------//
// OVERRIDE
SlotCombo.prototype.GetRandSimboloSlot = function() {
    var l_Simbolo;
    var re_do;

    do
    {
        re_do=false;

        l_Simbolo = window.ID_SIMBOLO_0+(Lib.Rand( window.NUM_SIMBOLI ));

        if (this.IsSimboloJolly(l_Simbolo)==true)
            re_do=true;
        else if (l_Simbolo==window.ID_SIMBOLO_SCATTER)
            re_do=true;
        else if (l_Simbolo==window.ID_SIMBOLO_BONUS)
            re_do=true;
        else if (l_Simbolo==window.ID_SIMBOLO_SUPER)
            re_do=true;

    }while (re_do==true);

    return l_Simbolo;
}
//------------------------------------------------------------//
SlotCombo.prototype.IdentifyCombo = function(p_IDSym,p_IDOcc) {

    return SlotCombo.TAB_COMBO[(p_IDSym-1)][(p_IDOcc-2)];
}
//--------------------------------------------------------------//
