// import logo from './logo.svg';
import './App.css';
import Featured from './components/Featured';
import { useEffect, useState } from 'react';

// import { Howl, Howler } from 'howler'
import ReactHowler from 'react-howler'


function App() {
  const [artistName, setArtistName] = useState('yes')
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
				playing={playing}
				setPlaying={setPlaying}
			/>
		</div>
	)
}

export default App;
