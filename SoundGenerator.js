//------------------------------------------------------------//
SoundGenerator.ENABLED=true;

//------------------------------------------------------------//
SoundGenerator.MAX_CHANNELS	=20;
SoundGenerator.MAX_BRANI	=200;
//------------------------------------------------------------//
SoundGenerator.SMP_SAMPLE=0;
SoundGenerator.SMP_MUSIC=1;
SoundGenerator.SMP_LOOP=2;
SoundGenerator.SMP_VOLUME_NORMAL=4;
SoundGenerator.SMP_VOLUME_AMPLIFY=8;
SoundGenerator.SMP_VOLUME_REDUCE=16;
SoundGenerator.SMP_VOLUME_SUPER_REDUCE=32;
SoundGenerator.SMP_VOLUME_MINIMAL_REDUCE=64;
SoundGenerator.SMP_VOLUME_ZERO=128;
SoundGenerator.SMP_PAUSE=256;
SoundGenerator.SMP_PAUSE_MUTE=512;
SoundGenerator.SMP_VOLUME_SUPER_AMPLIFY=1024;

//--------------------------------------------------------------------------//
SoundGenerator.CLICK0   =0;
SoundGenerator.CLICK1   =1;
SoundGenerator.CLICK2   =2;
SoundGenerator.SPIN     =3;
SoundGenerator.BET      =4;
SoundGenerator.BET_LINES=5;
SoundGenerator.MAX_BET  =6;
SoundGenerator.GAME_LOOP=7;
SoundGenerator.INTRO    =8;
SoundGenerator.FREESPIN_LOOP=9;
SoundGenerator.STOP_REEL=10;
SoundGenerator.STOP_ALL_REELS=11;
SoundGenerator.BIG_WIN  =12;
SoundGenerator.WIN_LO   =13;
SoundGenerator.WIN_MID  =14;
SoundGenerator.WIN_HI   =15;
SoundGenerator.WIN_SCATTER=16;
SoundGenerator.WIN_BONUS=17;
SoundGenerator.TURBO_BGND=18;
SoundGenerator.SCATTER_1=19;
SoundGenerator.SCATTER_2=20;
SoundGenerator.SCATTER_3=21;
SoundGenerator.WIN_LINE= 22;
SoundGenerator.CONGRATULATION= 23;
SoundGenerator.BONUS_JP=24;
SoundGenerator.BONUS_LOOP=25;
SoundGenerator.BONUS_PRIZE_OPEN=26;
SoundGenerator.BONUS_PRIZE_GOOD=27;
SoundGenerator.BONUS_PRIZE_BAD= 28;
SoundGenerator.BONUS_PRIZE_UP=29;
SoundGenerator.LONG_WILD=30;
SoundGenerator.WILD_EXPAND=31;
SoundGenerator.MAGIC_INTRO=32;
SoundGenerator.MAGIC_SELECTION=33;
SoundGenerator.MAGIC_SYMBOL=34;


//--------------------------------------------------------------------------//
var SoundGenerator_unlockSnd=null;
//--------------------------------------------------------------------------//
function SoundGenerator() {

    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SObject.call(this);

    // Initialize our SlotStage-specific properties
    this.ChannelsPlaying = new Array(SoundGenerator.MAX_CHANNELS);
    this.SamplesDB=new Array();

    this.SamplesPlaying =new Array(SoundGenerator.MAX_CHANNELS);
    this.FlagsPlaying   =new Array(SoundGenerator.MAX_CHANNELS);
    this.IDPlaying      =new Array(SoundGenerator.MAX_CHANNELS);

    this.PausedPositions   =new Array(SoundGenerator.MAX_BRANI);
    this.PausedFlags       =new Array(SoundGenerator.MAX_BRANI);

    this.AudioEnabled=false;

    this.SET_PlayMusic=1;
    this.SET_PlayFX=1;
    this.SET_Volume=100;

    this.FlagsPlaying.fill(0);
    this.PausedPositions.fill(0);
    this.PausedFlags.fill(0);

    for (var i=0;i<SoundGenerator.MAX_CHANNELS;i++)
    {
        this.SamplesPlaying[i]=0xFFFF;
        this.ChannelsPlaying[i]=null;
        this.IDPlaying[i]=0;
    }

    //this.CreateDB();

    this.Initialized=false;

    this.startingIndex = 1; // index 0 reserved for game loop sounds
}

// Create a SlotStage.prototype object that inherits from SObject.prototype.
SoundGenerator.prototype = Object.create(SObject.prototype); // See note below

// Set the "constructor" property to refer to SlotStage
SoundGenerator.prototype.constructor = SoundGenerator;

//--------------------------------------------------------------------------//
SoundGenerator.prototype.Init = function() {

}

//Touch unlock callback for iOS devices to start playing bgSnd it it's not already playing
function touchUnlock() {

    if (SoundGenerator_unlockSnd!=null)
        SoundGenerator_unlockSnd.play();
}
//--------------------------------------------------------------------------//
SoundGenerator.prototype.PlayBrano = function(p_Brano,p_Flags, gameLoop = false) {

    var channel;
    var volume;
    var start_position=0;
    var finally_play=true;

    if (SoundGenerator.ENABLED==false)
        return;

    if (this.SamplesDB[p_Brano]==null)
        return;

    if (this.Initialized==false)
        return;

    this.Refresh();

    var empty_channel = gameLoop ? 0 : this.GetEmptyChannel();

    if (this.AudioEnabled==false)
        p_Flags |= SoundGenerator.SMP_VOLUME_ZERO;

    if (empty_channel<SoundGenerator.MAX_CHANNELS)
    {
        channel=this.SamplesDB[p_Brano];

        if (channel!=null)
        {
            if ((p_Flags & SoundGenerator.SMP_VOLUME_ZERO)!=0)
                volume=0;
            else if ((p_Flags & SoundGenerator.SMP_VOLUME_NORMAL)!=0)
                volume=0.50;
            else if ((p_Flags&SoundGenerator.SMP_VOLUME_REDUCE)!=0)
                volume=0.30;
            else if ((p_Flags&SoundGenerator.SMP_VOLUME_MINIMAL_REDUCE)!=0)
                volume=0.40;
            else if ((p_Flags&SoundGenerator.SMP_VOLUME_SUPER_REDUCE)!=0)
                volume=0.15;
            else if ((p_Flags&SoundGenerator.SMP_VOLUME_AMPLIFY)!=0)
                volume=0.80;
            else
                volume=0.50;

            volume=(volume*this.SET_Volume);
            //volume=(volume*100);

            // *** HOWLER ***
            //channel.setVolume((volume/100));
            channel.volume((volume/100));

            if ((p_Flags&SoundGenerator.SMP_PAUSE)!=0)
            {
                p_Flags&=(~SoundGenerator.SMP_PAUSE);
                start_position=this.PausedPositions[p_Brano];
            }

            // Music disabled?
            if ((p_Flags&SoundGenerator.SMP_LOOP)!=0 && this.SET_PlayMusic==0)
                finally_play=false;

            // FX disabled?
            if ((p_Flags&SoundGenerator.SMP_LOOP)==0 && this.SET_PlayFX==0)
                finally_play=false;

            if (finally_play==true)
            {
                if ((p_Flags&SoundGenerator.SMP_LOOP)!=0)
                    channel.loop(true);
                else
                    channel.loop(false);

                this.IDPlaying[empty_channel]=channel.play();

                this.SamplesPlaying[empty_channel]=p_Brano;
                this.ChannelsPlaying[empty_channel]=channel;
                this.FlagsPlaying[empty_channel]=p_Flags;
            }
         }
    }

}
//--------------------------------------------------------------------------//
SoundGenerator.prototype.UpdateVolume = function() {

    // *** HOWLER ***
    //Waud.setVolume((this.SET_Volume/100));
    Howler.volume((this.SET_Volume/100));

    //console.log("Volume set:",(this.SET_Volume/100) );
}
//--------------------------------------------------------------------------//
SoundGenerator.prototype.ToggleMute = function() {

    var i,FLAGS,BRANO;

    if (this.Initialized==false)
    {
        // *** HOWLER ***
        //Waud.init();

        this.CreateDB();

        // *** HOWLER ***
        // Load and play looping background sound with autoPlay and loop set to true.
        // Note that this will not play automatically in iOS devices without touching the screen.
        //SoundGenerator_unlockSnd = new WaudSound("resources/Audio/Sound_Click0.mp3");
        SoundGenerator_unlockSnd = new Howl({src: ['resources/Audio/Sound_Click0.mp3']});
        // To automatically unlock audio on iOS devices by playing a blank sound.
        // The parameter is a callback function that can be used to start playing sounds like background music.
        //Waud.enableTouchUnlock(touchUnlock);
        // Use if you want to mute audio when the window is not in focus like switching tabs, minimising window,
        // etc in desktop and pressing home button, getting a call, etc on devices.
        //Waud.autoMute();

        this.Initialized=true;
    }

    this.Stop();

    this.AudioEnabled = !this.AudioEnabled;

    this.Refresh();
}
//------------------------------------------------------------//
SoundGenerator.prototype.IsPlaying = function(p_Brano) {

    for (var i=0;i<SoundGenerator.MAX_CHANNELS;i++)
    {
        if ( this.SamplesPlaying[i]==p_Brano)
        {
            return true;
        }
    }

    return false;
}
//------------------------------------------------------------//
SoundGenerator.prototype.StopChannel = function(p_Brano) {

    var id_brano=this.SamplesPlaying[p_Brano];

    this.PausedPositions[id_brano]=0;
    this.PausedFlags[id_brano]=0;

    this.FlagsPlaying[p_Brano]=0;
    this.SamplesPlaying[p_Brano]=0xFFFF;

    if (this.Initialized==true) {
        this.ChannelsPlaying[p_Brano].stop(this.IDPlaying[p_Brano]);
    }
}
//------------------------------------------------------------//
SoundGenerator.prototype.GetChannelIdx = function(id_brano) {

    for (var i=0;i<SoundGenerator.MAX_CHANNELS;i++)
    {
        if ( this.SamplesPlaying[i]==id_brano)
        {
            break;
        }
    }

    return i;
}
//------------------------------------------------------------//
SoundGenerator.prototype.IsPaused = function(id_brano) {

    if ( (this.PausedFlags[id_brano]&SoundGenerator.SMP_PAUSE)!=0)
        return true;
    return false;
}
//------------------------------------------------------------//
SoundGenerator.prototype.Pause = function(id_brano) {

    var flags=0;
    var position=0;

    var channel_idx=this.GetChannelIdx(id_brano);

    if (channel_idx<SoundGenerator.MAX_CHANNELS)
    {
        position=this.ChannelsPlaying[channel_idx].position;
        flags=(SoundGenerator.SMP_PAUSE|this.FlagsPlaying[channel_idx]);

        this.StopChannelByBrano(id_brano);

        this.PausedPositions[id_brano]=position;
        this.PausedFlags[id_brano]=(SoundGenerator.SMP_PAUSE|flags);
    }
}
//------------------------------------------------------------//
SoundGenerator.prototype.Resume = function(id_brano,new_flags) {

    if (new_flags!=0)
        this.PausedFlags[id_brano]=(SoundGenerator.SMP_PAUSE|new_flags);

    this.PlayBrano(id_brano,this.PausedFlags[id_brano]);

    this.PausedFlags[id_brano]&=(~SoundGenerator.SMP_PAUSE);
}
//------------------------------------------------------------//
SoundGenerator.prototype.Stop = function() {

    for (var i=0;i<SoundGenerator.MAX_CHANNELS;i++)
    {
        if (this.SamplesPlaying[i]!=0xFFFF)
        {
            this.StopChannel(i);
        }
    }

    //SoundMixer.stopAll();
}
//------------------------------------------------------------//
SoundGenerator.prototype.Refresh = function() {

    var i,FLAGS,BRANO;

    for (i=this.startingIndex;i<SoundGenerator.MAX_CHANNELS;i++)
    {
        if (this.SamplesPlaying[i]!=0xFFFF)
        {
            // *** HOWLER ***
            //if (this.ChannelsPlaying[i].isPlaying()==false)
            if (this.ChannelsPlaying[i].playing(this.IDPlaying[i])==false) {
                this.StopChannel(i);
            }
        }
    }

    for (i=0;i<this.SamplesDB.length;i++)
    {
        if ((this.PausedFlags[i]&SoundGenerator.SMP_VOLUME_ZERO)!=0)
        {
            this.PausedFlags[i]&=~(SoundGenerator.SMP_VOLUME_ZERO);

            FLAGS=this.PausedFlags[i];

            this.Resume(i,FLAGS);
        }
    }
}
//------------------------------------------------------------//
SoundGenerator.prototype.StopChannelByBrano = function(p_Brano) {

    for (var i=0;i<SoundGenerator.MAX_CHANNELS;i++)
    {
        if (this.SamplesPlaying[i]==p_Brano)
        {
            this.StopChannel(i);
        }
    }

}
//------------------------------------------------------------//
SoundGenerator.prototype.GetEmptyChannel = function() {

    let i = this.startingIndex;
    for (i=this.startingIndex;i<SoundGenerator.MAX_CHANNELS;++i)
        if (this.SamplesPlaying[i]==0xFFFF)
            break;

    return i;
}
//------------------------------------------------------------//
SoundGenerator.prototype.CreateDB = function() {

    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Click0.mp3"]}));  // SoundGenerator.CLICK0=0;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Click1.mp3"]}));  // SoundGenerator.CLICK1=1;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Click0.mp3"]}));  // SoundGenerator.CLICK2=2;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_spin_start.mp3"]}));      // SoundGenerator.SPIN=3;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Bet.mp3"]}));   //SoundGenerator.BET      =4;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Bet.mp3"]}));   //SoundGenerator.BET_LINES=5;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_MaxBet.mp3"]}));  //SoundGenerator.MAX_BET  =6;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_bonus_choice.mp3"]}));  //SoundGenerator.GAME_LOOP=7;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Intro.mp3"]}));  //SoundGenerator.INTRO=8;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_free_spins.mp3"]}));  //SoundGenerator.FREESPIN_LOOP=9;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_spin_stop.mp3"]}));  //SoundGenerator.STOP_REEL=10;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_StopAllReels.mp3"]}));  //SoundGenerator.STOP_ALL_REELS=11;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_BigWin.mp3"]}));  //SoundGenerator.BIG_WIN=12;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_symb_win2.mp3"]}));  //SoundGenerator.WIN_LO   =13;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_symb_win2.mp3"]}));  //SoundGenerator.WIN_MID  =14;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_symb_win2.mp3"]}));  //SoundGenerator.WIN_HI   =15;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_symb_freespins.mp3"]}));  //SoundGenerator.WIN_SCATTER=16;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_symb_choice.mp3"]}));  //SoundGenerator.WIN_BONUS=17;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_TurboBGND.mp3"]}));  //SoundGenerator.TURBO_BGND=18
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Scatter1.mp3"]}));  //SoundGenerator.SCATTER_1=19
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Scatter2.mp3"]}));  //SoundGenerator.SCATTER_2=20
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Scatter3.mp3"]}));  //SoundGenerator.SCATTER_3=21
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_card_flip.mp3"]}));  //SoundGenerator.WIN_LINE=22
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_congratulation.mp3"]})); //SoundGenerator.CONGRATULATION=23
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Bonus_RunaLast.mp3"]}));  //SoundGenerator.BONUS_JP=24;
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_bonus_choice.mp3"]}));//SoundGenerator.BONUS_LOOP=25
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_totem_destroy.mp3"]}));//SoundGenerator.BONUS_PRIZE_OPEN=26
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Bonus_RunaWin.mp3"]}));//SoundGenerator.BONUS_PRIZE_GOOD=27
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Bonus_RunaLose.mp3"]}));//SoundGenerator.BONUS_PRIZE_BAD=28
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_Bonus_RunaSelect.mp3"]}));//SoundGenerator.BONUS_PRIZE_UP=29
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_extrawild.mp3"]})); //SoundGenerator.LONG_WILD=30
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_extra_wild.mp3"]})); //SoundGenerator.WILD_EXPAND=31
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_bonus_sel.mp3"]})); //SoundGenerator.MAGIC_INTRO=32
    this.SamplesDB.push( new Howl({src: ["resources/Audio/Sound_MagicSelection.mp3"]})); //SoundGenerator.MAGIC_SELECTION=33
    this.SamplesDB.push( new Howl({src: ["resources/Audio/snd_card_win.mp3"]})); //SoundGenerator.MAGIC_SYMBOL=34
}
//--------------------------------------------------------------------------//
