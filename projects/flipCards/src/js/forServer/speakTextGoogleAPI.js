import postJsonGetAudioFileFromServerFetchVideo from './postJsonGetAudioFileFromServerFetchVideo';
import urlRoot from './globalVarRootUrl';

const speakTextGoogleAPI = async (lang4LettersCode, text) => {
  let speakResponse = await postJsonGetAudioFileFromServerFetchVideo(urlRoot + '/api/googleTextToSpeech', { lang4LettersCode, text });
  const context = new AudioContext();
  speakResponse.arrayBuffer()
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {

      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }); 
}
  
export default speakTextGoogleAPI;