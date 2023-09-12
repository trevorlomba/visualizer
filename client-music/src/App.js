// import logo from './logo.svg';
import './App.scss';
import songs from './songs'
import backgrounds from './backgrounds';
import Featured from './components/Featured';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom'

// import { Howl, Howler } from 'howler'
import ReactHowler from 'react-howler'

import ReactGA from 'react-ga'
ReactGA.initialize('G-22X1L2K6WV')
ReactGA.pageview(window.location.pathname + window.location.search)


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


  return (
		<BrowserRouter basename='/visualizer'>
			<div className='App'>
				<ReactHowler
					src={songsList[song].songLink}
					playing={playing}
					html5={true}
					preload={true}
				  format={['m4a']}
					loop={true}
					volume={vocalVolume}
				/>
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
			</div>
		</BrowserRouter>
	)
}

export default App;
