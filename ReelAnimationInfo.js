//------------------------------------------------------------//
ReelAnimationInfo.TYPE_PULSE_STATIC				=0;			// Statico
ReelAnimationInfo.TYPE_PULSE_MEDIA_ALPHA_BLINK  =1;			// Lampeggio di 2 frames ottenuto con lalpha
ReelAnimationInfo.TYPE_PULSE_MEDIA_TILE		    =2;			// Animazione su tile bitmap
ReelAnimationInfo.TYPE_PULSE_MEDIA_CLIP		    =3;			// Animazione su videoclip
ReelAnimationInfo.TYPE_PULSE_STATIC_BY_TYPE		=4;			// Statico con frame indicizzato dal tipo passato all'animation
//------------------------------------------------------------//
ReelAnimationInfo.FLG_ANI_NONE=0x0000;
ReelAnimationInfo.FLG_ANI_LOOP=0x8000;
//------------------------------------------------------------//

//------------------------------------------------------------//
function ReelAnimationInfo(media_type,res_name,tot_frames,frame_rate,flags,actions_array) {
    
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our ReelAnimationInfo-specific properties
    this.m_MediaType=media_type;
    this.m_ResourceID=res_name;
    this.m_TotFrames=tot_frames;
    this.m_FrameTime=frame_rate;
    this.m_Flags=flags;
    this.m_ActionsArray=actions_array;
}

// Create a ReelAnimationInfo.prototype object that inherits from SObject.prototype.
ReelAnimationInfo.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to ReelAnimationInfo
ReelAnimationInfo.prototype.constructor = ReelAnimationInfo;

//--------------------------------------------------------------------------//