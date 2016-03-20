    /* Controllers */
    var knob_tune = document.getElementById("knob_tune");
    knob_tune.setAttribute("value", "" + currentTune);
    knob_tune.onchange = updateTune;
    knob_tune.addEventListener('change', function(e) {
        socket.emit('Tune', e.target.value);
    });


    /* Oscillators */
    var knob_osc1mix = document.getElementById("knob_osc1mix");
    //knob_osc1mix.setAttribute("value", "" + gainOSC1);
    knob_osc1mix.setValue(gainOSC1);
    knob_osc1mix.onchange = onUpdateOsc1Mix;
    knob_osc1mix.addEventListener('change', function(e) {
        socket.emit('Osc1Mix', e.target.value);
    });

    var knob_osc2mix = document.getElementById("knob_osc2mix");
    //knob_osc2mix.setAttribute("value", "" + gainOSC2);
    knob_osc2mix.setValue(gainOSC2);
    knob_osc2mix.onchange = onUpdateOsc2Mix;
    knob_osc2mix.addEventListener('change', function(e) {
        socket.emit('Osc2Mix', e.target.value);
    });


    var knob_osc3mix = document.getElementById("knob_osc3mix");
    //knob_osc3mix.setAttribute("value", "" + gainOSC3);
    knob_osc3mix.setValue(gainOSC3);
    knob_osc3mix.onchange = onUpdateOsc3Mix;
    knob_osc3mix.addEventListener('change', function(e) {
        socket.emit('Osc3Mix', e.target.value);
    });


    var knob_osc1detune = document.getElementById("osc1detune");
    //knob_osc1detune.setAttribute("value", "" + currentOsc1Detune);
    knob_osc1detune.setValue(currentOsc1Detune);
    knob_osc1detune.onchange = updateOsc1Detune;
    knob_osc1detune.addEventListener('change', function(e) {
        socket.emit('Osc1Detune', e.target.value);
    });


    var knob_osc2detune = document.getElementById("osc2detune");
    //knob_osc2detune.setAttribute("value", "" + currentOsc1Detune);
    knob_osc2detune.setValue(currentOsc2Detune);
    knob_osc2detune.onchange = updateOsc2Detune;
    knob_osc2detune.addEventListener('change', function(e) {
        socket.emit('Osc2Detune', e.target.value);
    });


    var knob_osc3detune = document.getElementById("osc3detune");
    //knob_osc3detune.setAttribute("value", "" + currentOsc3Detune);
    knob_osc3detune.setValue(currentOsc3Detune);
    knob_osc3detune.onchange = updateOsc3Detune;
    knob_osc3detune.addEventListener('change', function(e) {
        socket.emit('Osc3Detune', e.target.value);
    });


    var knob_noiseVolume = document.getElementById("knob_noiseVolume");
    //knob_noiseVolume.setAttribute("value", "" + currentNoiseGain);
    knob_noiseVolume.setValue(currentNoiseGain);
    knob_noiseVolume.onchange = onUpdateNoiseGain;
    knob_noiseVolume.addEventListener('change', function(e) {
        socket.emit('NoiseVolume', e.target.value);
    });


    /* Filter Control */
    var knob_cutoff = document.getElementById("knob_cutoff");
    //knob_cutoff.setAttribute("value", "" + currentFilterCutoff);
    knob_cutoff.setValue(currentFilterCutoff);
    knob_cutoff.onchange = updateFilterCutoff;
    knob_cutoff.addEventListener('change', function(e) {
        socket.emit('FCutoff', e.target.value);
    });


    var knob_emphasis = document.getElementById("knob_emphasis");
    //knob_emphasis.setAttribute("value", "" + currentEmphasis);
    knob_emphasis.setValue(currentEmphasis);
    knob_emphasis.onchange = updateEmphasis;
    knob_emphasis.addEventListener('change', function(e) {
        socket.emit('Emphasis', e.target.value);
    });


    var knob_contour = document.getElementById("knob_contour");
    knob_contour.setAttribute("value", "" + currentContour);
    knob_contour.onchange = updateContour;
    knob_contour.addEventListener('change', function(e) {
        socket.emit('Contour', e.target.value);
    });


    var knob_fattack = document.getElementById("knob_fattack");
    knob_fattack.setAttribute("value", "" + currentFattack);
    knob_fattack.onchange = updateFattack;
    knob_fattack.addEventListener('change', function(e) {
        socket.emit('FAttack', e.target.value);
    });


    var knob_fdecay = document.getElementById("knob_fdecay");
    knob_fdecay.setAttribute("value", "" + currentFdecay);
    knob_fdecay.onchange = updateFdecay;
    knob_fdecay.addEventListener('change', function(e) {
        socket.emit('Fdecay', e.target.value);
    });


    var knob_fsustain = document.getElementById("knob_fsustain");
    knob_fsustain.setAttribute("value", "" + currentFsustain);
    knob_fsustain.onchange = updateFsustain;
     knob_fsustain.addEventListener('change', function(e) {
        socket.emit('Fsustain', e.target.value);
    });


    /* Volume Envelope Controls */

    var knob_attack = document.getElementById("knob_attack");
    knob_attack.setAttribute("value", "" + currentAttack);
    knob_attack.onchange = updateAttack;
     knob_attack.addEventListener('change', function(e) {
        socket.emit('Attack', e.target.value);
    });


    var knob_sustain = document.getElementById("knob_sustain");
    knob_sustain.setAttribute("value", "" + currentSustain);
    knob_sustain.onchange = updateSustain;
    knob_sustain.addEventListener('change', function(e) {
        socket.emit('Sustain', e.target.value);
    });


    var knob_decay = document.getElementById("knob_decay");
    knob_decay.setAttribute("value", "" + currentDecay);
    knob_decay.onchange = updateDecay;
    knob_decay.addEventListener('change', function(e) {
        socket.emit('Decay', e.target.value);
    });



    /* Output Controls */
    var knob_volume = document.getElementById("knob_volume");
    knob_volume.setAttribute("value", "" + currentVolume);
    knob_volume.onchange = updateVolume;
    knob_volume.addEventListener('change', function(e) {
        socket.emit('Volume', e.target.value);
    });


    function setOsc1() {
        var val = document.getElementById('osc1').value;
        if (val == "Sine") {
            osc1type = 0;
        }
        if (val == "Square") {
            osc1type = 1;
        }
        if (val == "Sawtooth") {
            osc1type = 2;
        }
        if (val == "Triangle") {
            osc1type = 3;
        }
    }

    function setOsc2() {
        var val = document.getElementById('osc2').value;
        if (val == "Sine") {
            osc2type = 0;
        }
        if (val == "Square") {
            osc2type = 1;
        }
        if (val == "Sawtooth") {
            osc2type = 2;
        }
        if (val == "Triangle") {
            osc2type = 3;
        }
    }

    function setOsc3() {
        var val = document.getElementById('osc3').value;
        if (val == "Sine") {
            osc3type = 0;
        }
        if (val == "Square") {
            osc3type = 1;
        }
        if (val == "Sawtooth") {
            osc3type = 2;
        }
        if (val == "Triangle") {
            osc3type = 3;
        }
    }

    function setRange1() {
        var val3 = document.getElementById('range1').value;
        if (val3 == "32") {
            currentOsc1Octave = 0;
        }
        if (val3 == "16") {
            currentOsc1Octave = 1;
        }
        if (val3 == "8") {
            currentOsc1Octave = 2;
        }
        if (val3 == "4") {
            currentOsc1Octave = 3;
        }
        if (val3 == "2") {
            currentOsc1Octave = 4;
        }

    }

    function setRange2() {
        var val4 = document.getElementById('range2').value;
        if (val4 == "32") {
            currentOsc2Octave = 0;
        }
        if (val4 == "16") {
            currentOsc2Octave = 1;
        }
        if (val4 == "8") {
            currentOsc1Octave = 2;
        }
        if (val4 == "4") {
            currentOsc1Octave = 3;
        }
        if (val4 == "2") {
            currentOsc1Octave = 4;
        }
    }

    function setRange3() {
        var val7 = document.getElementById('range3').value;
        if (val7 == "32") {
            currentOsc3Octave = 0;
        }
        if (val7 == "16") {
            currentOsc3Octave = 1;
        }
        if (val7 == "8") {
            currentOsc1Octave = 2;
        }
        if (val7 == "4") {
            currentOsc1Octave = 3;
        }
        if (val7 == "2") {
            currentOsc1Octave = 4;
        }
    }


    //Initially Set Osc1 Selector
    if (osc1type == 0) {
        document.getElementById('osc1').value = "Sine";
    }
    if (osc1type == 1) {
        document.getElementById('osc1').value = "Square";
    }
    if (osc1type == 2) {
        document.getElementById('osc1').value = "Sawtooth";
    }
    if (osc1type == 3) {
        document.getElementById('osc1').value = "Triangle";
    }


    //Initially Set Osc2 Selector
    if (osc2type == 0) {
        document.getElementById('osc2').value = "Sine";
    }
    if (osc2type == 1) {
        document.getElementById('osc2').value = "Square";
    }
    if (osc2type == 2) {
        document.getElementById('osc2').value = "Sawtooth";
    }
    if (osc2type == 3) {
        document.getElementById('osc2').value = "Triangle";
    }


    //Initially Set Osc3 Selector
    if (osc3type == 0) {
        document.getElementById('osc3').value = "Sine";
    }
    if (osc3type == 1) {
        document.getElementById('osc3').value = "Square";
    }
    if (osc3type == 2) {
        document.getElementById('osc3').value = "Sawtooth";
    }
    if (osc3type == 3) {
        document.getElementById('osc3').value = "Triangle";
    }

    //Initially Set Range 1 Selector
    if (currentOsc1Octave == 0) {
        document.getElementById('range1').value = "32";
    }
    if (currentOsc1Octave == 1) {
        document.getElementById('range1').value = "16";
    }
    if (currentOsc1Octave == 2) {
        document.getElementById('range1').value = "8";
    }
    if (currentOsc1Octave == 3) {
        document.getElementById('range1').value = "4";
    }
    if (currentOsc1Octave == 4) {
        document.getElementById('range1').value = "2";
    }

    //Initially Set Range 2 Selector
    if (currentOsc2Octave == 0) {
        document.getElementById('range2').value = "32";
    }
    if (currentOsc2Octave == 1) {
        document.getElementById('range2').value = "16";
    }
    if (currentOsc2Octave == 2) {
        document.getElementById('range2').value = "8";
    }
    if (currentOsc2Octave == 3) {
        document.getElementById('range2').value = "4";
    }
    if (currentOsc2Octave == 4) {
        document.getElementById('range2').value = "2";
    }

    //Initially Set Range 3 Selector
    if (currentOsc3Octave == 0) {
        document.getElementById('range3').value = "32";
    }
    if (currentOsc3Octave == 1) {
        document.getElementById('range3').value = "16";
    }
    if (currentOsc3Octave == 2) {
        document.getElementById('range3').value = "8";
    }
    if (currentOsc3Octave == 3) {
        document.getElementById('range3').value = "4";
    }
    if (currentOsc3Octave == 4) {
        document.getElementById('range3').value = "2";
    }



    //Recording Button

    var recordingstate = false;

    function gorecord() {

        if (recordingstate == false) {
            startRecording();
            recordingstate = true;
            document.getElementById('recorderbutton').textContent = "Stop Recording";
            document.getElementById("recordingslist").innerHTML = "";
        } else {
            stopRecording();
            recordingstate = false;
            document.getElementById('recorderbutton').textContent = "Start Recording";
        }

    }
