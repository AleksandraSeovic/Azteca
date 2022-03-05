//------------------------------------------------------------//
ControlBuilder.ID_CONSOLE_SPIN  =0;
    ControlBuilder.ID_SPIN_BUTT_SPIN  =0;
    ControlBuilder.ID_SPIN_BUTT_AUTO  =1;
    ControlBuilder.ID_SPIN_BUTT_BETDEC=2;
    ControlBuilder.ID_SPIN_BUTT_BETINC=3;

ControlBuilder.ID_CONSOLE_INFO  =1;
ControlBuilder.ID_CONSOLE_BILL  =2;
    ControlBuilder.ID_CONSOLE_BILL_LBL_CREDIT  =0;
    ControlBuilder.ID_CONSOLE_BILL_DSP_CREDIT  =1;
    ControlBuilder.ID_CONSOLE_BILL_LBL_BET     =2;
    ControlBuilder.ID_CONSOLE_BILL_DSP_BET     =3;

ControlBuilder.ID_CONSOLE_SET   =3;
ControlBuilder.ID_CONSOLE_DIALOG_BET   =4;
ControlBuilder.ID_CONSOLE_DIALOG_AUTO  =5;
ControlBuilder.ID_CONSOLE_DIALOG_SET   =6;
//--------------------------------------------------------------------------//
// all coords are referred to the console container
//--------------------------------------------------------------------------//
ControlBuilder.TAB_CTRL_LAPTOP=[
    
    // ControlBuilder.ID_CONSOLE_SPIN
    new ControlStyle (1515,-115,1.0),   // coords are referred to the console container
    // ControlBuilder.ID_CONSOLE_INFO
    new ControlStyle (0,50,1.0),        // coords are referred to the console container
    // ControlBuilder.ID_CONSOLE_BILL
    new ControlStyle (0,0,1.0),         // coords are referred to the console container
    // ControlBuilder.ID_CONSOLE_SET
    new ControlStyle (10,50,1.0),       // coords are referred to the console container
    // ControlBuilder.ID_CONSOLE_DIALOG_BET
    new ControlStyle (1400,400,1.0),         // coords are referred to the main container
    // ControlBuilder.ID_CONSOLE_DIALOG_AUTO
    new ControlStyle (1400,400,1.0),          // coords are referred to the main container
    // ControlBuilder.ID_CONSOLE_DIALOG_SET
    new ControlStyle (  10,600,1.0)          // coords are referred to the main container
];
//--------------------------------------------------------------------------//
ControlBuilder.TAB_CTRL_MOBILE_LAND=[
    
    // ControlBuilder.ID_CONSOLE_SPIN
    new ControlStyle (1520,-568,2.0),
    // ControlBuilder.ID_CONSOLE_INFO
    new ControlStyle (-300,40,1.3),
    // ControlBuilder.ID_CONSOLE_BILL
    new ControlStyle (-180,-49,2.0),
    // ControlBuilder.ID_CONSOLE_SET
    new ControlStyle (6,-900,1.8),
    // ControlBuilder.ID_CONSOLE_DIALOG_BET
    new ControlStyle (550,200,2.0),         // coords are referred to the main container
    // ControlBuilder.ID_CONSOLE_DIALOG_AUTO
    new ControlStyle (410, 85,2.5),          // coords are referred to the main container
    // ControlBuilder.ID_CONSOLE_DIALOG_SET
    new ControlStyle (410, 85,2.5)          // coords are referred to the main container
    
];
//--------------------------------------------------------------------------//
ControlBuilder.TAB_CTRL_MOBILE_PORT=[
    
    // ControlBuilder.ID_CONSOLE_SPIN
    //new ControlStyle (1520,-568,2.0),
    new ControlStyle (1520,-400,2.0),
    // ControlBuilder.ID_CONSOLE_INFO
    new ControlStyle (-300,40,1.3),
    // ControlBuilder.ID_CONSOLE_BILL
    new ControlStyle (-180,-49,2.0),
    // ControlBuilder.ID_CONSOLE_SET
    new ControlStyle (6,-900,1.8),
    // ControlBuilder.ID_CONSOLE_DIALOG_BET
    new ControlStyle (550,200,2.0),         // coords are referred to the main container
    // ControlBuilder.ID_CONSOLE_DIALOG_AUTO
    new ControlStyle (410, 85,2.5),          // coords are referred to the main container
    // ControlBuilder.ID_CONSOLE_DIALOG_SET
    new ControlStyle (410, 85,2.5),          // coords are referred to the main container
];
//--------------------------------------------------------------------------//
    ControlBuilder.TAB_SUBCTRL_SPIN_LAPTOP=[

        // ControlBuilder.ID_SPIN_BUTT_SPIN
        new ControlStyle ( 85,  0,1.0),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_AUTO
        new ControlStyle (144,200,0.8),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_BETDEC
        new ControlStyle (  0,168,1.0),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_BETINC
        new ControlStyle (304,168,1.0)    // coords are referred to the ID_CONSOLE_SPIN container
    ];

    ControlBuilder.TAB_SUBCTRL_SPIN_MOBILE_LAND=[

        // ControlBuilder.ID_SPIN_BUTT_SPIN
        new ControlStyle ( 83, 30,0.6),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_AUTO
        new ControlStyle (-760,95,0.8),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_BETDEC
        new ControlStyle ( 112,240,1.3),   // coords are referred to the ID_CONSOLE_SPIN container
        //new ControlStyle ( 120,-148,1.2),    // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_BETINC
        new ControlStyle ( 112,-140,1.3)    // coords are referred to the ID_CONSOLE_SPIN container
        //new ControlStyle ( 120,-248,1.2)    // coords are referred to the ID_CONSOLE_SPIN container

    ];

    ControlBuilder.TAB_SUBCTRL_SPIN_MOBILE_PORT=[

        // ControlBuilder.ID_SPIN_BUTT_SPIN
        new ControlStyle (20,64,1.0),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_AUTO
        new ControlStyle (-759,15,0.8),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_BETDEC
        //new ControlStyle ( 120,240,1.3),   // coords are referred to the ID_CONSOLE_SPIN container
        new ControlStyle ( 120,-148,1.2),    // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_SPIN_BUTT_BETINC
        //new ControlStyle ( 120,-140,1.3)    // coords are referred to the ID_CONSOLE_SPIN container
        new ControlStyle ( 120,-248,1.2)    // coords are referred to the ID_CONSOLE_SPIN container

    ];
//--------------------------------------------------------------------------//
    ControlBuilder.TAB_SUBCTRL_BILL_LAPTOP=[

        // ControlBuilder.ID_CONSOLE_BILL_LBL_CREDIT
        new ControlStyle (115, 45,1.0),   // coords are referred to the ID_CONSOLE_BILL container
        // ControlBuilder.ID_CONSOLE_BILL_DSP_CREDIT
        new ControlStyle (264, 45,1.0),   // coords are referred to the ID_CONSOLE_BILL container
        // ControlBuilder.ID_CONSOLE_BILL_LBL_BET
        new ControlStyle (115, 80,1.0),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_CONSOLE_BILL_DSP_BET
        new ControlStyle (246, 80,1.0)    // coords are referred to the ID_CONSOLE_SPIN container
    ];

    ControlBuilder.TAB_SUBCTRL_BILL_MOBILE_LAND=[

        // ControlBuilder.ID_CONSOLE_BILL_LBL_CREDIT
        new ControlStyle ( 92, 82,1.0),   // coords are referred to the ID_CONSOLE_BILL container
        // ControlBuilder.ID_CONSOLE_BILL_DSP_CREDIT
        new ControlStyle (238, 82,1.0),   // coords are referred to the ID_CONSOLE_BILL container
        // ControlBuilder.ID_CONSOLE_BILL_LBL_BET
        new ControlStyle (165+700, 82,1.0),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_CONSOLE_BILL_DSP_BET
        new ControlStyle (244+700, 82,1.0)    // coords are referred to the ID_CONSOLE_SPIN container

    ];

    ControlBuilder.TAB_SUBCTRL_BILL_MOBILE_PORT=[

        // ControlBuilder.ID_CONSOLE_BILL_LBL_CREDIT
        new ControlStyle ( 92, 82,1.0),   // coords are referred to the ID_CONSOLE_BILL container
        // ControlBuilder.ID_CONSOLE_BILL_DSP_CREDIT
        new ControlStyle (238, 82,1.0),   // coords are referred to the ID_CONSOLE_BILL container
        // ControlBuilder.ID_CONSOLE_BILL_LBL_BET
        new ControlStyle (165+700, 82,1.0),   // coords are referred to the ID_CONSOLE_SPIN container
        // ControlBuilder.ID_CONSOLE_BILL_DSP_BET
        new ControlStyle (244+700, 82,1.0)    // coords are referred to the ID_CONSOLE_SPIN container

    ];


//------------------------------------------------------------//
function ControlBuilder(app_reference) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our ControlBuilder-specific properties
    this.ApplicationRef = app_reference;
}

// Create a ControlBuilder.prototype object that inherits from SObject.prototype.
ControlBuilder.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ControlBuilder
ControlBuilder.prototype.constructor = ControlBuilder;
//------------------------------------------------------------//
ControlBuilder.prototype.GetControlStyle= function (id_ctrl,style_ref) {    
    var tab_styles=null;
    
    // Mobile
    if (this.ApplicationRef.IsMobile()==true)
    {
        // PORTRAIT
        if (this.ApplicationRef.IsPortrait()==true)
            tab_styles=ControlBuilder.TAB_CTRL_MOBILE_PORT;
        // LANDSCAPE        
        else
            tab_styles=ControlBuilder.TAB_CTRL_MOBILE_LAND;
    }
    // Laptop
    else
    {
        tab_styles=ControlBuilder.TAB_CTRL_LAPTOP;
    }

    // Fill info
    if (tab_styles!=null)
    {   
        style_ref.X=tab_styles[id_ctrl].X;
        style_ref.Y=tab_styles[id_ctrl].Y;
        style_ref.SCALE=tab_styles[id_ctrl].SCALE;
    }
}
//------------------------------------------------------------//
ControlBuilder.prototype.GetSubControlStyle= function (id_main_ctrl,style_ref) {    
    var tab_styles=null;
    
    // Mobile
    if (this.ApplicationRef.IsMobile()==true)
    {
        // PORTRAIT
        if (this.ApplicationRef.IsPortrait()==true)
        {       
            if (id_main_ctrl==ControlBuilder.ID_CONSOLE_SPIN)
            {           
                tab_styles=ControlBuilder.TAB_SUBCTRL_SPIN_MOBILE_PORT;
            }
            else if (id_main_ctrl==ControlBuilder.ID_CONSOLE_BILL)
            {           
                tab_styles=ControlBuilder.TAB_SUBCTRL_BILL_MOBILE_PORT;
            }
            
        }   
        // LANDSCAPE
        else
        {
            if (id_main_ctrl==ControlBuilder.ID_CONSOLE_SPIN)
            {           
                tab_styles=ControlBuilder.TAB_SUBCTRL_SPIN_MOBILE_LAND;
            }
            else if (id_main_ctrl==ControlBuilder.ID_CONSOLE_BILL)
            {           
                tab_styles=ControlBuilder.TAB_SUBCTRL_BILL_MOBILE_LAND;
            }
        }   
    }
    // Laptop
    else
    {
        if (id_main_ctrl==ControlBuilder.ID_CONSOLE_SPIN)
        {           
            tab_styles=ControlBuilder.TAB_SUBCTRL_SPIN_LAPTOP;
        }
        else if (id_main_ctrl==ControlBuilder.ID_CONSOLE_BILL)
        {           
            tab_styles=ControlBuilder.TAB_SUBCTRL_BILL_LAPTOP;
        }
        
    }

    return tab_styles;
}
//--------------------------------------------------------------------------//
ControlBuilder.prototype.Dummy = function() {    
}
//--------------------------------------------------------------------------//