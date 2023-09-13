// import logo from './logo.svg';
import './App.scss';
import songs from './songs'
import backgrounds from './backgrounds';
import Featured from './components/Featured';
import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import useTunaEffect from './components/useTunaEffect';
import tuna from 'tunajs';



// import { Howl, Howler } from 'howler'
import ReactHowler from 'react-howler'

import ReactGA from 'react-ga'
ReactGA.initialize('G-22X1L2K6WV')
ReactGA.pageview(window.location.pathname + window.location.search)

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var tunaObj = new tuna(audioCtx);


let songsList = []
for (let i = 0; i < songs.length; i++) {
	console.log(songs[i].data.songLink)
	if (songs[i].data.songLink === undefined || songs[i].data.name === undefined) continue
	songsList.push({
    'name': songs[i].data.name,
    'songLink': songs[i].data.songLink
});
}
console.log(songsList)


function App() {
  const [artistName, setArtistName] = useState('yes')
  const [playing, setPlaying] = useState(false)
  const [song, setSong] = useState(0)
  const [background, setBackground] = useState(0)
  const [vocalVolume, setVocalVolume] = useState(0.5)
  const [musicVolume, setMusicVolume] = useState(.8)
	
	let activeClassName = "nav-active"
  useEffect(() => {}, [])
  console.log(songs)

	const sourceRef = useRef(null); // Ref to keep track of the audio source node

	async function loadAudioFile(url) {
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
		return audioBuffer;
	}

	function playAudio() {
		if (sourceRef.current) {
			sourceRef.current.stop();
		}

		loadAudioFile(songsList[song].songLink).then((audioBuffer) => {
			const source = audioCtx.createBufferSource();
			source.buffer = audioBuffer;
			sourceRef.current = source;

			const gain = new tunaObj.Gain({
				gain: vocalVolume
			});

			source.connect(gain);
			gain.connect(audioCtx.destination);

			source.start();
		});
	}

	useEffect(() => {
		if (playing) {
			playAudio();
		} else if (sourceRef.current) {
			sourceRef.current.stop();
			sourceRef.current = null;
		}
	}, [playing, song]);


	function handleUserInteraction() {
		if (audioCtx.state === 'suspended') {
			audioCtx.resume();
		}

		// // Initialize Howler with the AudioContext
		// AudioContext()

		// ... other logic
	}


  const howlRef = useRef(null);


	function applyTunaEffect(howlerSound) {

		if (howlerSound) {
			const gain = new tunaObj.Gain({
				gain: .1
			});

			console.log(howlRef.current.howler);
			console.log(typeof howlRef.current.howler._sounds[0]._node);
			console.log(howlRef.current.howler._sounds[0]._node);

			console.log(howlerSound);

			console.log(`howlerSound', ${howlerSound}`)

			// Disconnect Howler's masterGain from destination and connect it to gain
			console.log(howlerSound._sounds[0]._node)
			console.log(howlerSound)
			howlerSound._sounds[0]._node.disconnect();
			howlerSound._sounds[0]._node.connect(gain);

			// Connect gain to destination
			gain.connect(audioCtx.destination);
		}
	}

	useEffect(() => {
		if (howlRef.current) {
			const howlerSound = howlRef.current.howler;

			// Define the function we want to execute once the sound is loaded
			const onSoundLoad = () => {
				console.log("Sound loaded!");
				applyTunaEffect(howlerSound);
			};

			// Attach the load event listener
			howlerSound.on('load', onSoundLoad);

			// Clean up the event listener on component unmount or if howlRef changes
			return () => {
				howlerSound.off('load', onSoundLoad);
			};
		}
	}, [howlRef]);


  return (
		<BrowserRouter basename='/visualizer'>
			<div className='App'>
				{/* <ReactHowler
					src={songsList[song].songLink}
					playing={playing}
					html5={false}
					preload={true}
				  	format={['m4a']}
					loop={true}
					volume={vocalVolume}
				  	ref={howlRef}
				/> */}
				{/* <ReactHowler
					src={songsList[song]}
					playing={playing}
					html5={true}
					preload={true}
					format={'m4a'}
					loop={true}
					volume={musicVolume}
				/> */}
				<Featured
					artistName={artistName}
					backgrounds={backgrounds}
					song={song}
					songsList={songsList}
					setSong={setSong}
					setArtistName={setArtistName}
					className='title'
					playing={playing}
					setPlaying={setPlaying}
					vocalVolume={vocalVolume}
					setVocalVolume={setVocalVolume}
					background={background}
					setBackground={setBackground}
				/>
				{/* <div className='volume'>
				<label>
					Volume:
					<span className='slider-container'>
						<input
							type='range'
							min='0'
							max='1'
							step='.05'
							value={vocalVolume}
							onChange={(e) =>
								setVocalVolume(e.target.value)
							}
						/>
					</span>
				</label>
			</div> */}
			  <button onClick={() => setPlaying((prev) => !prev)}>
				  Toggle Audio
			  </button>
			</div>
		</BrowserRouter>
	)
}

export default App;
