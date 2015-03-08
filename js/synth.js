var voices = new Array();
var audioContext = null;
var waveforms = ["sine", "square", "sawtooth", "triangle"];
var lfowaveforms = ["sine", "square", "sawtooth", "triangle"];
var node;

//Initial Preset Values

var currentTune = 0;

var osc1type = 2;
var currentOsc1Detune = 0;
var gainOSC1 = 50;
var currentOsc1Octave = 0;

var osc2type = 2;
var currentOsc2Detune = 0;
var gainOSC2 = 0;
var currentOsc2Octave = 1;

var osc3type = 2;
var currentOsc3Detune = 0;
var gainOSC3 = 50;
var currentOsc3Octave = 1;

var lfotype = 0;
var lfofrequency = 2;
var osc1mix = 0;
var osc2mix = 0;

var currentNoiseGain = 0;

var currentFilterCutoff= 500;
var currentEmphasis = 7.0;
var currentContour = 0;

var currentFattack = 100;
var currentFsustain = 6;
var currentFdecay = 5.0;
var filter_release = 0; 

var currentAttack = 2.0;
var currentDecay = 10;
var currentSustain = 10;
var master_release = 5.0;

var currentVolume = 0.5;

var decayState = 1;

var audioRecorder = null;

/* Functions for updating the Values on the fly*/

function updateTune( ev ) {
	var value = ev.currentTarget.value;
	currentTune = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc1Frequency();
		}
	}
}


function onUpdateOsc1Mix( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	gainOSC1 = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc1Mix( value );
		}
	}
}

function updateOsc1Detune( ev ) {
	var value = ev.currentTarget.value;
	currentOsc1Detune = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc1Frequency();
		}
	}
}

function onUpdateOsc2Mix( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	gainOSC2 = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc2Mix( value );
		}
	}
}

function updateOsc2Detune( ev ) {
	var value = ev.currentTarget.value;
	currentOsc2Detune = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc2Frequency();
		}
	}
}


function onUpdateOsc3Mix( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	gainOSC3 = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc1Mix( value );
		}
	}
}
function updateOsc3Detune( ev ) {
	var value = ev.currentTarget.value;
	currentOsc3Detune = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc3Frequency();
		}
	}
}

function updateFilterCutoff( ev ) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	currentFilterCutoff = value;

	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setFilterCutoff( value );
		}
	}
}

function updateEmphasis( ev ) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	currentEmphasis = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setFilterQ( value );
		}
	}
}

function updateContour( ev ) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	currentContour = value;

}

function updateFattack( ev ) {
	currentFattack = ev.currentTarget.value;	
}

function updateFsustain( ev ) {
	currentFsustain = ev.currentTarget.value;
	

}

function updateFdecay( ev ) {
	currentFdecay = ev.currentTarget.value;


}

function updateAttack( ev ) {
	currentAttack = ev.currentTarget.value;

}

function updateSustain( ev ) {
	currentSustain = ev.currentTarget.value;


}

function updateDecay( ev ) {
	currentDecay = ev.currentTarget.value;

}



function updateVolume( ev ) {
	masterVol.gain.value = (ev.currentTarget ? ev.currentTarget.value : ev)/100;

}


function onUpdateNoiseGain( value ) {
		if (value.currentTarget)
		value = value.currentTarget.value;
	currentNoiseGain = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateNoiseGain( value );
		}
	}
}


/* Set up Keyboard */
var keyboard = QwertyHancock({
    id: 'keyboard',
                 width: 1100,
                 height: 140,
                 octaves: 3,
                 startNote: 'C3',
                 whiteNotesColour: 'white',
                 blackNotesColour: 'black',
                 hoverColour: '#f3e939',
                 keyboardLayout: 'de'
    });


function noteOn( note, velocity ) {
	if(voices[note] == null) {
		//Check if voices active
		voices[note] = new Voice(note, velocity, "midi");
	}
}

function noteOff( note ) {
	if(voices[note] != null) {
		//Check if voices active
		voices[note].noteOff();
		voices[note] = null;
	}
}




function filterFrequencyFromCutoff( pitch, cutoff ) {
    var nyquist = 0.5 * audioContext.sampleRate;

    var filterFrequency = Math.pow(2, (9 * cutoff) - 1) * pitch;
    if (filterFrequency > nyquist)
        filterFrequency = nyquist;
	return filterFrequency;
}

//Convert Midi Note to Frequency
function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function Voice( note, velocity, inputtype ) 	 {


	if (inputtype == "midi") {
	this.originalFrequency = frequencyFromNoteNumber( note );
	}
	else {
	this.originalFrequency = note;
	}


	// create osc 1
	this.osc1 = audioContext.createOscillator();
	this.updateOsc1Frequency();
	this.osc1.type = waveforms[osc1type];

	this.osc1Gain = audioContext.createGain();
	this.osc1Gain.gain.value = 0.002 * gainOSC1;
//	this.gain.gain.value = 0.05 + (0.33 * velocity);
	this.osc1.connect( this.osc1Gain );

	// create osc 2
	this.osc2 = audioContext.createOscillator();
	this.updateOsc2Frequency();
	this.osc2.type = waveforms[osc2type];

	this.osc2Gain = audioContext.createGain();
	this.osc2Gain.gain.value = 0.002 * gainOSC2;
	this.osc2.connect( this.osc2Gain );

	//create osc 3

	this.osc3 = audioContext.createOscillator();
	this.updateOsc3Frequency();
	this.osc3.type = waveforms[osc3type];

	this.osc3Gain = audioContext.createGain();
	this.osc3Gain.gain.value = 0.002 * gainOSC3;
	this.osc3.connect( this.osc3Gain );

		/* White Noise Generator */

  var lengthInSamples = 5 * audioContext.sampleRate;
  var buffer = audioContext.createBuffer(1, lengthInSamples, audioContext.sampleRate);
  var data = buffer.getChannelData(0);

  for (var i = 0; i < lengthInSamples; i++) {
    data[i] = ((Math.random() * 2) - 1);
  }

  // Create a source node from the buffer.
  this.node = audioContext.createBufferSource();
  this.node.buffer = buffer;
  this.node.loop = true;
  this.node.start(0);
  this.noiseGain = audioContext.createGain();
  this.noiseGain.gain.value = currentNoiseGain * 0.001;
  this.node = audioContext.createBufferSource();
  this.node.buffer = buffer;
  this.node.loop = true;
  this.node.connect(this.noiseGain);
 

	// create modulator osc
	/*
	this.modOsc = audioContext.createOscillator();
	this.modOsc.type = 	waveforms[lfotype];
	this.modOsc.frequency.value = lfofrequency;// * modOscFreqMultiplier;

	this.modOsc1Gain = audioContext.createGain();
	this.modOsc.connect( this.modOsc1Gain );
	this.modOsc1Gain.gain.value = osc1mix/10;
	this.modOsc1Gain.connect( this.osc1.frequency );	// tremolo

	this.modOsc2Gain = audioContext.createGain();
	this.modOsc.connect( this.modOsc2Gain );
	this.modOsc2Gain.gain.value = osc2mix/10;
	this.modOsc2Gain.connect( this.osc2.frequency );	// tremolo
	*/
	// create the LP filter
	this.filter1 = audioContext.createBiquadFilter();
	this.filter1.type = this.filter1.LOWPASS;
	this.filter1.Q.value = currentEmphasis;
	this.filter2 = audioContext.createBiquadFilter();
	this.filter2.type = this.filter2.LOWPASS;
	this.filter2.Q.value = 1;
	this.filter2.frequency.value = 20000;

	this.noiseGain.connect(this.filter1);
	this.osc1Gain.connect( this.filter1 );
	this.osc2Gain.connect( this.filter1);
	this.osc3Gain.connect( this.filter1);
	this.filter1.connect( this.filter2 );

	// connect the modulator to the filters
	/*
	this.modFilterGain = audioContext.createGain();
	this.modOsc.connect( this.modFilterGain );
	this.modFilterGain.gain.value = currentFilterMod*24;
	this.modFilterGain.connect( this.filter1.detune );	// filter tremolo
	this.modFilterGain.connect( this.filter2.detune );	// filter tremolo
	*/

	// create the volume envelope
	this.envelope = audioContext.createGain();
	this.filter2.connect( this.envelope);
	//this.filter2.connect( masterVol);
	this.envelope.connect( masterVol );


	// set up the volume and filter envelopes
	var now = audioContext.currentTime;
	var envAttackEnd = now + (currentAttack/1000.0);


	this.envelope.gain.value = 0.0;
	this.envelope.gain.setValueAtTime( 0.0, now );
	this.envelope.gain.linearRampToValueAtTime( 1.0, envAttackEnd );
	this.envelope.gain.setTargetAtTime( (currentSustain/10), envAttackEnd, (currentDecay/1000.0));



	/*
	var pitchFrequency = this.originalFrequency;
    var filterInitLevel = filterFrequencyFromCutoff( pitchFrequency, currentFilterCutoff/100 );
	var filterAttackLevel = filterFrequencyFromCutoff( pitchFrequency, currentFilterCutoff/100 + 
		(currentContour/120) );
	var filterSustainLevel = filterFrequencyFromCutoff( pitchFrequency, currentFilterCutoff/100 + 
		((currentContour/120) * (currentFsustain/100.0)) );
	var filterAttackEnd = now + (currentFattack/20.0);
	



	this.filter1.frequency.value = filterInitLevel;
	this.filter1.frequency.setValueAtTime( filterInitLevel, now );
	this.filter1.frequency.linearRampToValueAtTime( filterAttackLevel, filterAttackEnd );
	this.filter1.frequency.setTargetAtTime( filterSustainLevel, filterAttackEnd, (currentFdecay/100.0) );
		*/


	var cutoff = currentFilterCutoff * currentContour;
	var attack_level = (currentFattack/100) * (currentContour / 100);
	var sustain_level = (currentFsustain * 2000) + currentFilterCutoff;
		console.log(sustain_level);


	if (currentContour > 1) {
	this.filter1.frequency.setValueAtTime( currentFilterCutoff, now );
	this.filter1.frequency.linearRampToValueAtTime( 20000, now + currentFattack/1000);
	this.filter1.frequency.setTargetAtTime(sustain_level, now + (currentFattack/1000), (currentFdecay/1000));

	this.filter2.frequency.value = currentContour * 200;

	}
	else {
	this.filter1.frequency.setValueAtTime( currentFilterCutoff, now );
	this.filter1.frequency.linearRampToValueAtTime(currentFilterCutoff, now + 0.01);
	//this.filter1.frequency.setTargetAtTime((currentFsustain/100) + currentFilterCutoff, now + (currentFattack/100), (currentFdecay/100));
	}
	

	//this.filter1.frequency.setTargetAtTime(sustain, filter_end_of_attack, currentFdecay/100);


	//console.log("Detune: " + this.osc1.detune.value);
	//console.log("Frequency: " + this.originalFrequency);
	console.log("Noise Gain: " + this.noiseGain.gain.value);

  	this.node.start(0);
	this.osc1.start(0);
	this.osc2.start(0);
	this.osc3.start(0);
	//this.modOsc.start(0);
}

Voice.prototype.noteOff = function() {

	var now =  audioContext.currentTime;

	if (decayState == 1) {
	var release = now + currentDecay/100;	
	}
	else {
	var release = now + 1;
	}

//    console.log("noteoff: now: " + now + " val: " + this.filter1.frequency.value + " initF: " + initFilter + " fR: " + currentFilterEnvR/100 );
	
	//Volume Envelope Release
	if (decayState == 1) {
	this.envelope.gain.cancelScheduledValues(now);
	this.envelope.gain.setValueAtTime( this.envelope.gain.value, now );  // this is necessary because of the linear ramp
	this.envelope.gain.setTargetAtTime(0.0, now, (currentDecay/1000) + 0.005);
	}
	else {
	this.envelope.gain.cancelScheduledValues(now);
	this.envelope.gain.setValueAtTime( this.envelope.gain.value, now );  // this is necessary because of the linear ramp
	this.envelope.gain.setTargetAtTime(0.0, now, 0.0);
	}

	//Filter Envelope Release
	if((currentContour > 1) && (decayState == 1)) {
	this.filter1.frequency.cancelScheduledValues(now);
	this.filter1.frequency.setValueAtTime( this.filter1.frequency.value, now );  // this is necessary because of the linear ramp
	this.filter1.frequency.setTargetAtTime( 0.0, now, (currentFdecay/100.0) );
	}
	else {
	this.filter1.frequency.cancelScheduledValues(now);
	this.filter1.frequency.setValueAtTime( this.filter1.frequency.value, now );  // this is necessary because of the linear ramp
	this.filter1.frequency.setTargetAtTime( 0.0, now, now + 0.005);

	}
	/*
	this.filter2.frequency.cancelScheduledValues(now);
	this.filter2.frequency.setValueAtTime( this.filter2.frequency.value, now );  // this is necessary because of the linear ramp
	this.filter2.frequency.setTargetAtTime( initFilter, now, (filter_release/100.0) );
	*/


	//this.filter2.frequency.cancelScheduledValues(now);
	//this.filter2.frequency.setValueAtTime( this.filter2.frequency.value, now );  // this is necessary because of the linear ramp
	//this.filter2.frequency.setTargetAtTime( initFilter, now, (filter_release/100.0) );

	this.node.stop( release );
	this.osc1.stop( release );
	this.osc2.stop( release );
	this.osc3.stop( release );
	//this.modOsc.stop( release );



}

 keyboard.keyDown = function (note, frequency) {

	if(voices[note] == null) {
		//Check if voices active
		voices[note] = new Voice(frequency, "0", "onscreen");
	}
}


  keyboard.keyUp = function (note, frequency) {

  	if (frequency)
  			if(voices[note] != null) {
		//Check if voices active
		voices[note].noteOff();
		voices[note] = null;
	}
 }


/* Update Values */
 Voice.prototype.updateOsc1Frequency = function( value ) {
	this.osc1.frequency.value = (this.originalFrequency*Math.pow(2,currentOsc1Octave-2));  // -2 because osc1 is 32', 16', 8'
	this.osc1.detune.value = currentOsc1Detune + currentTune;	// value in cents - detune major fifth.
}

Voice.prototype.updateOsc2Frequency = function( value ) {
	this.osc2.frequency.value = (this.originalFrequency*Math.pow(2,currentOsc2Octave-2));
	this.osc2.detune.value = currentOsc2Detune;	// value in cents - detune major fifth.
}

Voice.prototype.updateOsc3Frequency = function( value ) {
	this.osc3.frequency.value = (this.originalFrequency*Math.pow(2,currentOsc3Octave-2));
	this.osc3.detune.value = currentOsc3Detune;	// value in cents - detune major fifth.
}


Voice.prototype.updateOsc1Mix = function( value ) {
	this.osc1Gain.gain.value = 0.002 * value;
}

Voice.prototype.updateOsc2Mix = function( value ) {
	this.osc2Gain.gain.value = 0.002 * value;
}

Voice.prototype.updateOsc3Mix = function( value ) {
	this.osc3Gain.gain.value = 0.002 * value;
}

Voice.prototype.updateNoiseGain = function( value ) {
	this.noiseGain.gain.value = 0.002 * value;
}

Voice.prototype.setFilterCutoff = function( value ) {
	var now =  audioContext.currentTime;
	//var filterFrequency = filterFrequencyFromCutoff( this.originalFrequency, value/100 );
	this.filter1.frequency.cancelScheduledValues( now );
	this.filter1.frequency.setValueAtTime( currentFilterCutoff, now );
	this.filter2.frequency.cancelScheduledValues( now );
	this.filter2.frequency.setValueAtTime( currentFilterCutoff, now );
}

Voice.prototype.setFilterQ = function( value ) {
	this.filter1.Q.value = value;
	this.filter2.Q.value = value;
	console.log(this.filter1.Q.value);
}



 function initSynth() {
 	audioContext = new AudioContext;

 	//Connection for all voices
 	effectChain = audioContext.createGain();
 	effectChain.gain.value=0.25;

 	//convolver for Reverb
 	revNode = audioContext.createGain();

 	//Reverb Gain
 	//revGain.gain.value = 0.1;

 	//Bypass Gain
 	revBypassGain = audioContext.createGain;

 	//Master Volume Gain
 	masterVol = audioContext.createGain();
 	masterVol.gain.value = currentVolume;

 	//effectChain.connect ( masterVol );
 	//effectChain.connect (revBypassGain);
 	//revNode.connect( revGain );
 	//revGain.connect( volNode );
 	//revBypassGain.connect( masterVol );

 	//connect to speakers
 	//Connect to Oscilloscope
 	masterVol.connect( audioContext.destination );
 	//Instanciate Recorder
 	audioRecorder = new Recorder( masterVol );

}
/* Functions for Recording */

function startRecording() {
	audioRecorder && audioRecorder.record();
}

function stopRecording(button) {
    audioRecorder && audioRecorder.stop();
    createDownloadLink();
    audioRecorder.clear();
  }

   function createDownloadLink() {
    audioRecorder && audioRecorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
   
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });


  }


window.onload=initSynth;







