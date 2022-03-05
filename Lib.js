//**************************************************************************
// Static variable shared by all instances
var UniqueID = (function() {
   var id = 0; // This is the private persistent value
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function() { return id++; };  // Return and increment
})(); // Invoke the outer function after defining it.

//--------------------------------------------------------------------------//
var IsRealReference = (function(obj) {
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function() { obj && obj !== 'null' && obj !== 'undefined'; };  // Return and increment
})(); // Invoke the outer function after defining it.
/*
Application.prototype.isRealValue = function (obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
};
*/

function Lib() {};

Lib.Rand = function(mod) { return parseInt( Math.floor( Math.random() * mod) ); };
//--------------------------------------------------------------------------//

// Converts from degrees to radians.
Lib.radians = function(degrees) { return degrees * Math.PI / 180;};
//--------------------------------------------------------------------------//
// Converts from radians to degrees.
Lib.degrees = function(radians) { return radians * 180 / Math.PI;};
//--------------------------------------------------------------------------//
Lib.strReplace = function(str, search, replace) { 
    
    var str_split=str.split(search);

    var str_res=str_split.join(replace);

    return str_res;
};
//---------------------------------------------------------------------------//
Lib.PadLeft = function(val, digits, pad) {     
    
    var ret = val.toString();

    return Lib.PadLeftString(ret,digits,pad);
}
//---------------------------------------------------------------------------//
Lib.PadLeftString = function(str, digits, pad) {         
    while (str.length < digits)
        str = pad + str;

    return str;
}
//---------------------------------------------------------------------------//
Lib.ResetArray = function(arr,val) {         

    for (var i=0;i<arr.length;i++)
        arr[i]=val;
}
//**************************************************************************