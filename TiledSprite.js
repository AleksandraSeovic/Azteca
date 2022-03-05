
//------------------------------------------------------------//
TiledSprite.MASK_STAT_NONE		    =0x0000;
TiledSprite.MASK_STAT_GRAY		    =0x0001;
TiledSprite.MASK_STAT_HIGHLIGHT	    =0x0002;
TiledSprite.MASK_STAT_DARKEN	    =0x0004;
TiledSprite.MASK_STAT_SEPIA 	    =0x0008;
TiledSprite.MASK_STAT_OUTLINE_BORD  =0x0010;
TiledSprite.MASK_STAT_OUTLINE_GLOW  =0x0020;
TiledSprite.MASK_STAT_GREEN         =0x0040;


//------------------------------------------------------------//
TiledSprite.MASK_BUTT_NONE		=0x0000;
TiledSprite.MASK_BUTT_ENABLED	=0x0002;
TiledSprite.MASK_BUTT_PUSHED	=0x0004;
TiledSprite.MASK_BUTT_OVER		=0x0008;
TiledSprite.MASK_BUTT_OUT		=0x0010;


//------------------------------------------------------------//
TiledSprite.OutlineFilterBorder = null;
TiledSprite.OutlineFilterGlow   = null;
//------------------------------------------------------------//


function TiledSprite(res_name, tot_frames, start_visible, parent_container, extension = '.png') {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our TiledSprite-specific properties
    this.ResName = res_name;
    this.CurFrame =0;
    this.TotFrames = tot_frames;
    this.StartVisible = start_visible;
    this.Texture = null;
    this.Sprite = null;
    this.Frames=[];
    this.FrameW = 0;
    this.FrameH = 0;
    this.ScaleX = 1.0;
    this.ScaleY = 1.0;
    this.MaskButton=TiledSprite.MASK_BUTT_NONE;
    this.MaskStatus=TiledSprite.MASK_STAT_NONE;
    this.MaskStatus=TiledSprite.MASK_STAT_NONE;

    this.ParentContainer = parent_container;
    this.SpriteTransformer=null;

    this.extension = extension;
}

// Create a TiledSprite.prototype object that inherits from SObject.prototype.
TiledSprite.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to TiledSprite
TiledSprite.prototype.constructor = TiledSprite;
//--------------------------------------------------------------------------//
TiledSprite.prototype.BuildSprite = function() {

    this.Frames=new Array();
    
    // Create the textures array
    if (this.TotFrames==1)
    {
        this.Frames.push(PIXI.Texture.fromFrame(this.ResName + this.extension));
    }
    else
    {
        for (var i = 0; i < this.TotFrames; i++) {
            var val = i < 10 ? '0' + i : i;

            this.Frames.push(PIXI.Texture.fromFrame(this.ResName + val + this.extension));
        }
    }

    // Create the sprite
    this.Sprite = new PIXI.extras.AnimatedSprite(this.Frames);
    
    this.ASSERT( (this.Sprite!=null) , "Sprite instance fail.");
    
    this.SetFrame(0);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.Setup = function() {
    
    this.BuildSprite();
    
    this.Sprite.visible=this.StartVisible;
    
    this.SetFrame(0);

    this.SpriteTransformer=new SpriteTransformer(this);
    
    //this.Sprite.anchor.set(0.5);
    if (this.ParentContainer!=null)
        this.ParentContainer.addChild(this.Sprite);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.SetNewTile = function(res_name, tot_frames, extension = '.png') {
    
    this.ResName = res_name;
    this.TotFrames = tot_frames;
    this.extension = extension;

    if (this.contains(this.Sprite)==true)
        this.ParentContainer.removeChild(this.Sprite);

    this.BuildSprite();

    this.ParentContainer.addChild(this.Sprite);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.SetNewTileAt = function(res_name, tot_frames,child_pos, extension = '.png') {
    
    this.ResName = res_name;
    this.TotFrames = tot_frames;
    this.extension = extension;

    if (this.contains(this.Sprite)==true)
        this.ParentContainer.removeChild(this.Sprite);

    this.BuildSprite();

    this.ParentContainer.addChildAt(this.Sprite,child_pos);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.GetSprite = function()
{
    return this.Sprite;
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.Visible = function(vsb) {
    
    this.Sprite.visible=vsb;
};
//--------------------------------------------------------------------------//
TiledSprite.prototype.IsVisible = function(vsb) {
    
    return this.Sprite.visible;
};
//--------------------------------------------------------------------------//
TiledSprite.prototype.SetContainer = function(parent_container)
{
    this.ParentContainer=parent_container;
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.GetContainer = function()
{
    return this.ParentContainer;
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.SetFrame = function(frame_index)
{
    this.CurFrame=frame_index;
    this.Sprite.gotoAndStop(frame_index);
    
    this.FrameW = this.Frames[frame_index].width;
    this.FrameH = this.Frames[frame_index].height;
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.ChangeFrame = function(frame_index,res_name)
{
    if (this.TotFrames==1)
    {
        this.Frames[frame_index]=PIXI.Texture.fromFrame(res_name + this.extension);
    }
    else
    {
        var val = frame_index < 10 ? '0' + frame_index : frame_index;

        this.Frames[frame_index]=PIXI.Texture.fromFrame(res_name + val + this.extension);
    }
    
    
    this.Sprite.textures[frame_index]=this.Frames[frame_index];
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.ResetProperties = function(visible_set, alpha_set, scale_set)
{
    if (this.Sprite!=null)
    {       
        this.Sprite.visible=visible_set;
        this.Sprite.alpha=alpha_set;
        this.SCALE(scale_set);
    }
    
    this.MaskButton=TiledSprite.MASK_BUTT_NONE;
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.XX = function(xx,offs)
{
    this.Sprite.x=(xx+offs);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.YY = function(yy,offs)
{
    this.Sprite.y=(yy+offs);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.ScaleApply = function()
{
    if (this.Sprite!=null)
        this.Sprite.scale=new PIXI.Point(this.ScaleX,this.ScaleY);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.SCALE = function(scale)
{
    this.ScaleX=scale;
    this.ScaleY=scale;
    
    this.ScaleApply();
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.SCALE_X = function(scale)
{
    this.ScaleX=scale;
    this.ScaleApply();
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.SCALE_Y = function(scale)
{
    this.ScaleY=scale;
    this.ScaleApply();
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.ACTUAL_W = function()
{
    return this.Sprite.width;
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.ACTUAL_H = function()
{
    return this.Sprite.height;
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.contains = function(child)
{
    if (this.ParentContainer==null)
        return false;
    
    return (this.ParentContainer.children.indexOf( child ) !== -1);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.IsChildOf = function(father)
{
    return (father.children.indexOf( this.Sprite ) !== -1);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.LinkTo = function(parent_container) {
    
    if (this.contains(this.Sprite)==true)
        this.StopUnlink();
    
    this.ParentContainer=parent_container;
    
    this.ParentContainer.addChild(this.Sprite);
};
//--------------------------------------------------------------------------//
TiledSprite.prototype.Animate = function(start_frame,ani_speed,loop_back) {

    this.Stop();
    
    this.Sprite.animationSpeed = ani_speed;
    
    this.Sprite.loop=loop_back;
    
    this.Sprite.gotoAndPlay(start_frame);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.Stop = function() {
    
    this.Sprite.gotoAndStop(0);
};
//------------------------------------------------------------//
TiledSprite.prototype.ResetToTop = function(){

    if (this.ParentStage!=null)
    {
        this.ParentStage.removeChild(this.Container);

        this.ParentStage.addChild(this.Container);
    }
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.StopUnlink = function() {
    
    this.Stop();
    
    this.StopTransform();
    
    if (this.contains(this.Sprite)==true)
        this.ParentContainer.removeChild(this.Sprite);
};
//--------------------------------------------------------------------------//
TiledSprite.prototype.LinkToParent = function() {
    
    this.Stop();
    
    this.StopTransform();
    
    if (this.contains(this.Sprite)==false)
        this.ParentContainer.addChild(this.Sprite);
};
//--------------------------------------------------------------------------//
TiledSprite.prototype.CenterBox = function(width_box,height_box,use_actual_scale){
    
    var offs_X,offs_Y,ww,hh;

    this.Sprite.x=0;
    this.Sprite.y=0;

    if (use_actual_scale==true)
        ww=this.Sprite.width;
    else
        ww=this.FrameW;

    if (width_box!=0)
        offs_X = (width_box-ww)/2;
    else
        offs_X  = 0;

    if (use_actual_scale==true)
        hh=this.Sprite.height;//this.FrameH*this.Sprite.scale.y;
    else
        hh=this.FrameH;


    if (height_box!=0)
        offs_Y = (height_box-hh)/2;
    else
        offs_Y  = 0;

    this.Sprite.x += parseInt(offs_X);
    this.Sprite.y += parseInt(offs_Y);
}
//--------------------------------------------------------------------------//
TiledSprite.prototype.CenterBoxOnSprite = function(container_sprite){
    
    var offs_X,offs_Y,ww,hh;

    var width_box=container_sprite.GetSprite().width;
    var height_box=container_sprite.GetSprite().height;

    this.Sprite.x=0;
    this.Sprite.y=0;

    ww=this.FrameW*this.Sprite.scale.x;
    hh=this.FrameH*this.Sprite.scale.y;
    
    if (width_box!=0)
        offs_X = (width_box-ww)/2;
    else
        offs_X  = 0;

    if (height_box!=0)
        offs_Y = (height_box-hh)/2;
    else
        offs_Y  = 0;

    this.Sprite.x =(container_sprite.Sprite.x+ parseInt(offs_X));
    this.Sprite.y =(container_sprite.Sprite.y+ parseInt(offs_Y));
}
//------------------------------------------------------------//		
TiledSprite.prototype.GetButtStatus=function(){
    return this.MaskButton;
}
//------------------------------------------------------------//		
TiledSprite.prototype.GetMaskStatus=function(){
    return this.MaskStatus;
}
//------------------------------------------------------------//		
TiledSprite.prototype.CheckButtStatus=function(flag){
    
    if ((this.MaskButton&flag)!=0)
    {
        this.MaskButton&=(~flag);
        return true;
    }
    return false;
}
//------------------------------------------------------------//		
TiledSprite.prototype.SetButton= function(enable){

    // Event listeners
    var self = this;
    
    if (enable==true)
    {
        // On click
        this.Sprite.mousedown = function(data)
        {
            //console.log(""+self.MaskButton);

            if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED)
            {
                self.MaskButton|=TiledSprite.MASK_BUTT_PUSHED;
            }        
        }

        // On click for mobile
        this.Sprite.touchend = function(data){

            if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED){

                self.MaskButton|=TiledSprite.MASK_BUTT_PUSHED;
            }    
        }    

    /*    
        this.Sprite.on('pointerdown', function (event) 
        {  
            if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED)
            {
                self.MaskButton|=TiledSprite.MASK_BUTT_PUSHED;
            }        

        });
    */    
        this.Sprite.mouseover = function(data)
        {
            if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED){

                self.MaskButton|=TiledSprite.MASK_BUTT_OVER;
            }    
        }

        this.Sprite.mouseout = function(data)
        {
            if (self.MaskButton&TiledSprite.MASK_BUTT_ENABLED){

                self.MaskButton|=TiledSprite.MASK_BUTT_OUT;
            }    
        }
        
        // Opt-in to interactivity
        this.Sprite.interactive = true;

        // Shows hand cursor
        this.Sprite.buttonMode = true;

        this.MaskButton=TiledSprite.MASK_BUTT_ENABLED;
    }
    else
    {
        this.Sprite.mousedown=null;
        this.Sprite.touchend=null;
        this.Sprite.mouseover=null;
        this.Sprite.mouseout=null;
        this.Sprite.interactive = false;
        this.Sprite.buttonMode = false;			

        this.MaskButton=TiledSprite.MASK_BUTT_NONE;
    }
}
//------------------------------------------------------------//		
TiledSprite.prototype.Refresh= function(ellapsed_ms){
    
    if (this.SpriteTransformer!=null)
        this.SpriteTransformer.Refresh(ellapsed_ms);
}
//------------------------------------------------------------//
TiledSprite.prototype.StopTransform= function(){    
    
    if (this.SpriteTransformer!=null)
        this.SpriteTransformer.Stop();
}
//------------------------------------------------------------//
TiledSprite.prototype.TransformOver= function(){    
    
    if (this.SpriteTransformer!=null){
        if (this.SpriteTransformer.GetStatus()==SpriteTransformer.MASK_NONE)
            return true;
        return false;
    }
    return true;
}
//------------------------------------------------------------//
TiledSprite.prototype.SPRITE_TRANSFORMER= function(){    
    return this.SpriteTransformer;
}
//------------------------------------------------------------//
TiledSprite.prototype.SetMaskFilter= function(mask_type){    

    var colorMatrix=null;
    var unityMatrix=[
    //R  G  B  A
      1, 0, 0, 0,0,
      0, 1, 0, 0,0,
      0, 0, 1, 0,0,
      0, 0, 0, 1,0
    ];
    
    // giaà applicata una maschera?
    if ((this.MaskStatus!=0) || (mask_type==TiledSprite.MASK_STAT_NONE))
    {
        this.Sprite.filters=null;				

        this.MaskStatus=TiledSprite.MASK_STAT_NONE;

        // richiesta di rimozione ?
        //if (mask_type==TiledSprite.MASK_STAT_NONE)
            //return;
    }
    
    switch (mask_type)
    {
        case TiledSprite.MASK_STAT_GRAY	:
        {	
            colorMatrix = new PIXI.filters.ColorMatrixFilter();
            
            colorMatrix.greyscale(0.5,false);
        }break;

        case TiledSprite.MASK_STAT_RED	:
        {	
            colorMatrix = new PIXI.filters.ColorMatrixFilter();
            
            unityMatrix[4]=1;
            
            colorMatrix.matrix=unityMatrix;
        }break;
            
        case TiledSprite.MASK_STAT_GREEN	:
        {	
            colorMatrix = new PIXI.filters.ColorMatrixFilter();
            
            unityMatrix[9]=1;
            colorMatrix.matrix=unityMatrix;
        }break;
            
        case TiledSprite.MASK_STAT_HIGHLIGHT	:
        {	
            colorMatrix = new PIXI.filters.ColorMatrixFilter();
            
            colorMatrix.saturate(2.0,false);
            //colorMatrix.technicolor(true);
            //colorMatrix.toBGR(true);
        }break;

        case TiledSprite.MASK_STAT_DARKEN	:
        {	
            colorMatrix = new PIXI.filters.ColorMatrixFilter();
            
            colorMatrix.brightness(0.4,false);
        }break;

        case TiledSprite.MASK_STAT_SEPIA	:
        {	
            colorMatrix = new PIXI.filters.ColorMatrixFilter();
            
            colorMatrix.sepia(false);
        }break;
            
        case TiledSprite.MASK_STAT_OUTLINE_BORD	:
        {	
/*            
            if (TiledSprite.OutlineFilterBorder==null)
                TiledSprite.OutlineFilterBorder = new PIXI.filters.OutlineFilter(2, 0x99ff99);
            
            this.Sprite.filters = [TiledSprite.OutlineFilterBorder];
*/            
        }break;

        case TiledSprite.MASK_STAT_OUTLINE_GLOW	:
        {	
/*            
            if (TiledSprite.OutlineFilterGlow==null)
                TiledSprite.OutlineFilterGlow = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5)
            
            this.Sprite.filters = [TiledSprite.OutlineFilterGlow];
*/            
        }break;
            
    
        default	:
        {	
        }break;

    };
    
    if (colorMatrix!=null)
        this.Sprite.filters = [colorMatrix];
    
    this.MaskStatus|=mask_type;
}
//------------------------------------------------------------//

//--------------------------------------------------------------------------//