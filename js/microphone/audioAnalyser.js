// Empty fallback for Older Browsers
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// add the getUserMedia property when missing
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = constraints => {

    // Call getUserMedia, if present
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    // Rejected Promise for browsers who don't accept
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // wrap call to old navigator.getUserMedia with Promise
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

// set up forked web audio context, for multiple browsers
// window. is --> For Safari browser 
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const voiceSelect = document.getElementById("voice");
let source;
let stream;

// mute button puts microphone on silent 
const mute = document.querySelector('.mute');

//set up the different audio nodes we will use for the app

const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

const distortion = audioCtx.createWaveShaper();
const gainNode = audioCtx.createGain();
const biquadFilter = audioCtx.createBiquadFilter();
const convolver = audioCtx.createConvolver();

// grab audio track via XHR for convolver node
let soundSource;
ajaxRequest = new XMLHttpRequest();
ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);
ajaxRequest.responseType = 'arraybuffer';

ajaxRequest.onload = () => {
  const audioData = ajaxRequest.response;

  audioCtx.decodeAudioData(audioData, buffer => {
    soundSource = audioCtx.createBufferSource();
    convolver.buffer = buffer;
  }, e => {
    console.log(`Error with decoding audio data${e.err}`);
  });

  //soundSource.connect(audioCtx.destination);
  //soundSource.loop = true;
  //soundSource.start();
};

ajaxRequest.send();



//main block for doing the audio recording
if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');
  const constraints = {
    audio: true
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(
      stream => {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(distortion);
        distortion.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        convolver.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        visualize();
        voiceChange();
      })
    .catch(err => {
      console.log(`The following gUM error occured: ${err}`);
    })
} else {
  console.log('getUserMedia not supported on your browser!');
}

// event listeners for muting
mute.onclick = voiceMute;

function voiceMute() {
  if (mute.id === "") {
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.gain.setTargetAtTime(1, audioCtx.currentTime, 0)
    mute.id = "";
    mute.innerHTML = "Mute";
  }
}
