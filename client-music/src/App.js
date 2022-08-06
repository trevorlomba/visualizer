// import logo from './logo.svg';
import './App.css';
import songs from './songs'
import Featured from './components/Featured';
import { useEffect, useState } from 'react';

// import { Howl, Howler } from 'howler'
import ReactHowler from 'react-howler'


function App() {
  const [artistName, setArtistName] = useState('yes')
  const [playing, setPlaying] = useState(false)
  const [song, setSong] = useState(0)
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
				src= {songs[song].data.songLink}
				playing={playing}
				html5={true}
				preload={true}
				format={'m4a'}
				loop={true}
			/>
			<Featured
				artistName={artistName}
				song = {songs[song]}
				setSong = {setSong}
				setArtistName={setArtistName}
				className='title'
				playing={playing}
				setPlaying={setPlaying}
			/>
		</div>
	)
}

export default App;
