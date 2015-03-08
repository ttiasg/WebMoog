 var midiAccess=null;

if (navigator.requestMIDIAccess) {
	navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    }
      else {
 }


  function onMIDIInit(midi) {
      midiAccess = midi;

      var inputs=midiAccess.inputs();
      if (inputs.length === 0)
        alert("No MIDI input devices present.  You're gonna have a bad time.")
      else {

        var thediv = document.getElementById("midistatus");
        var divcontent = document.createTextNode("Midi Status: Availaible");
        thediv.appendChild(divcontent);

       // Hook the message handler for all MIDI inputs
        for (var i=0;i<inputs.length;i++)
          inputs[i].onmidimessage = MIDIMessageEventHandler;
      }
    }

        function onMIDIReject(err) {

       var thediv = document.getElementById("midistatus");
  var divcontent = document.createTextNode("Midi Status: Not Availaible");
  thediv.appendChild(divcontent);

    }

    function MIDIMessageEventHandler(event) {
      // Mask off the lower nibble (MIDI channel, which we don't care about)
      switch (event.data[0] & 0xf0) {
        case 0x90:
          if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
            noteOn(event.data[1]);
            return;
          }
          // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
        case 0x80:
          noteOff(event.data[1]);
          return;
      }
    }