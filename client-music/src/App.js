// import logo from './logo.svg';
import './App.css';
import Featured from './components/Featured';
import { useEffect, useState } from 'react';

// import { Howl, Howler } from 'howler'
import ReactHowler from 'react-howler'

import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'

function App() {
  const [artistName, setArtistName] = useState('yes')
  const audio = './assets/sound.wav'
  const [playing, setPlaying] = useState(false)
//   let sound = new Howl({
// 	  src: audio,
// 	  autoplay: true
// 	})
// 	console.log(sound)
	
// 	const playSound = function() {
// 	  console.log('soundplay')
// 	  console.log(sound)``
// 	  sound.play()
// 	}
	

  useEffect(() => {}, [])
  

  return (
		<div className='App'>
			<div className='playButton' onClick={() => setPlaying(!playing)}>
				<div className={playing ? 'pause' : 'play'}>
					{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
				</div>
			</div>
			<ReactHowler
				src='https://sndup.net/ds68/d'
				playing={playing}
				html5={true}
				preload={true}
				format={'m4a'}
				loop={true}
			/>
			<Featured
				artistName={artistName}
				setArtistName={setArtistName}
				className='title'
			/>
		</div>
	)
}

export default App;
