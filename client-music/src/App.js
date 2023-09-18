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

import ReactGA, { set } from 'react-ga'
ReactGA.initialize('G-22X1L2K6WV')
ReactGA.pageview(window.location.pathname + window.location.search)

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var tunaObj = new tuna(audioCtx);


function App() {
  const [artistName, setArtistName] = useState('yes')
  const [playing, setPlaying] = useState(false)
  const [song, setSong] = useState(0)
  const [background, setBackground] = useState(0)
  const [vocalVolume, setVocalVolume] = useState(1)
  const [highPassValue, setHighPassValue] = useState(.01)
  const [lowPassValue, setLowPassValue] = useState(1)
  const [musicVolume, setMusicVolume] = useState(.8)
const [stoppedIntentionally, setStoppedIntentionally] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songsList, setSongsList] = useState(songs);

	let timeout;
	document.addEventListener('mousemove', function () {
		clearTimeout(timeout);
		document.body.classList.remove('hide-cursor');

		timeout = setTimeout(function () {
			document.body.classList.add('hide-cursor');
		}, 1000); 
	});

	let activeClassName = "nav-active"
  useEffect(() => {}, [])
//   console.log(songs)

	const sourceRef = useRef(null); // Ref to keep track of the audio source node
	const lowpassRef = useRef(null);

	


	async function loadAudioFile(url) {
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
		return audioBuffer;
	}

	const gainEffect = useRef(null);
	const highPassEffect = useRef(null);
	const lowPassEffect = useRef(null);


	function playAudio() {
	
		if (sourceRef.current) {
			// console.log(sourceRef.current);
				sourceRef.current.stop();
		}

		// console.log('loading song')
		// console.log(song)
		// console.log(songsList[song])
		// console.log(songsList[song].songLink)

		// event listener for the space bar that will pause and play the song
		// document.addEventListener('keydown', function (e) {
		// 	console.log('space bar pressed')
		// 	if (e.code === 'Space') {
		// 		if (isPlaying) {
		// 			pauseAudio();
		// 		} else {
		// 			playAudio();
		// 		}
		// 	}
		// });

		loadAudioFile(songsList[song].songLink).then((audioBuffer) => {
			const source = audioCtx.createBufferSource();
			// source.onended = function () {
			// 	playAudio(); // play again when audio finishes
			// };
			source.loop = true;  // Loop the song


			source.onended = function () {
				// console.log('stoppedIntentionally')
				// console.log(stoppedIntentionally)
				if (stoppedIntentionally) {
					pauseAudio(); // Stop the current song
					// sourceRef.current.stop();
					// sourceRef.current = null;
				} else {
				// playAudio();  // Replay the current song
				}
			};

			source.buffer = audioBuffer;
			sourceRef.current = source;

			// Create the Lowpass filter:
			const lowpass = new tunaObj.Filter({
				frequency: 1550,
				Q: 1,
				gain: 0,
				filterType: "lowpass",
				bypass: 0
			});
			// lowpassRef.current = new tunaObj.Filter({
			// 	frequency: 2000,
			// 	Q: 1,
			// 	gain: 5,
			// 	filterType: "lowpass",
			// 	bypass: 0
			// });


			const bitcrusher = new tunaObj.Bitcrusher({
				bits: 12,          //1 to 16
				normfreq: 1,    //0 to 1
				bufferSize: 512  //256 to 16384
			});

			var chorus = new tunaObj.Chorus({
				rate: 1.5,
				feedback: 0.4,
				depth: 0.7,
				delay: 0.0045,
				bypass: false
			});

			var tremolo = new tunaObj.Tremolo({
				intensity: 0.3,
				rate: 0.5,
				stereoPhase: 0,
				bypass: false
			});

			var overdrive = new tunaObj.Overdrive({
				outputGain: 0.5,
				drive: 0.7,
				curveAmount: 1,
				algorithmIndex: 0,
				bypass: false
			});

			gainEffect.current = new tunaObj.Gain({
				gain: vocalVolume	
			});


			highPassEffect.current = new tunaObj.Filter({
				frequency: .1,
				Q: 1,
				gain: 0,
				filterType: "highpass",
				bypass: 0
			});

			lowPassEffect.current = new tunaObj.Filter({
				frequency: lowPassValue * 5000,
				Q: 2,
				gain: 0,
				filterType: "lowpass",
				bypass: 0
			});
			
			
			


			source.connect(lowpass.input);
			lowpass.connect(bitcrusher.input);

			bitcrusher.connect(gainEffect.current.input);
			gainEffect.current.connect(highPassEffect.current.input);
			highPassEffect.current.connect(lowPassEffect.current.input);
			lowPassEffect.current.connect(audioCtx.destination);

			source.start();
		});
		setIsPlaying(true);

	}

	function pauseAudio() {
		if (sourceRef.current) {
			sourceRef.current.stop();
		}
		setIsPlaying(false);
	}
	useEffect(() => {
		if (sourceRef.current) {
			sourceRef.current.stop();
			sourceRef.current = null;
		}

	}, [song]);

	// useEffect(() => {
		// console.log('SONG CHANGED')
		// console.log(song)
		// console.log(songsList[song])
	// }, [song])

	useEffect(() => {
		if (lowpassRef.current) {
			lowpassRef.current.gain.value = vocalVolume;
		}
	}, [vocalVolume]);

	useEffect(() => {
		let tempSongsList = [];

			for (let i = 0; i < songs.length; i++) {
			// console.log(songs[i].data.songLink)
			if (songs[i].data.songLink === undefined || songs[i].data.name === undefined) continue
			tempSongsList.push({
				'name': songs[i].data.name,
				'songLink': songs[i].data.songLink
			});
			setSongsList(tempSongsList);
		}
	}, [songs])

	function handleUserInteraction() {
		if (audioCtx.state === 'suspended') {
			audioCtx.resume();
		}

		// // Initialize Howler with the AudioContext
		// AudioContext()

		// ... other logic
	}

	

	useEffect(() => {
		if (gainEffect.current) {
			gainEffect.current.gain.value = vocalVolume;
		}	
	}, [vocalVolume]);
	useEffect(() => {
		if (highPassEffect.current) {
			// console.log(highPassEffect.current.frequency.value)
			highPassEffect.current.frequency.value = highPassValue * 5000;
			// console.log(highPassEffect.current.frequency.value)
		}	
	}, [highPassValue]);
	useEffect(() => {
		if (lowPassEffect.current) {
			lowPassEffect.current.frequency.value = lowPassValue * 5000;
		}	
	}, [lowPassValue]);

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
			// console.log(howlerSound)
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
				// console.log("Sound loaded!");
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
				    setStoppedIntentionally={setStoppedIntentionally}
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
					highPassValue={highPassValue}
					setHighPassValue={setHighPassValue}
					lowPassValue={lowPassValue}
					setLowPassValue={setLowPassValue}
					background={background}
					setBackground={setBackground}
				  playAudio={playAudio}
				  sourceRef={sourceRef}
				  pauseAudio={pauseAudio}	
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
			{/* div with color styling white and the value of HighPassValue*/}
			
			</div>
		</BrowserRouter>
	)
}

export default App;
