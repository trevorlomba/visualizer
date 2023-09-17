import React, { useEffect, useState, useRef, useCallback } from 'react'
import './Featured.scss'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter, NavLink } from 'react-router-dom'


// import featuredImage from '../assets/background.gif'
// import logoImage from '../assets/logo.png'

import Merch from './Merch'
import Fader from './Fader'
import ScrollPrompts from './ScrollPrompts'
import FeaturedLinks from './FeaturedLinks'
import Form from './Form'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import songs from '../songs'

const FeaturedImage = React.lazy(() => import('./FeaturedImage'))
const Logo = React.lazy(() => import('./Logo'))

const Featured = ({
	artistName,
	playing,
	setPlaying,
	setStoppedIntentionally,
	song,
	setSong,
	vocalVolume,
	setVocalVolume,
	highPassValue,
	setHighPassValue,
	lowPassValue,
	setLowPassValue,
	songsList, 
	background,
	setBackground,
	backgrounds,
	playAudio,
	sourceRef,
	stoppedIntentionally,
	pauseAudio,
}) => {
	let featuredImage = backgrounds[background]
	let logoImage = songs[0].data.logo
	let logoImage2 = songs[0].data.logo2
	const [visible, setVisible] = useState(true)
	const [feature, setFeature] = useState(0)
	const [isHovered, setIsHovered] = useState(false);
	const [songName, setSongName] = useState(songs[0].data.name)
	const [activeSpeechBubble, setActiveSpeechBubble] = useState(false)
	const [mouseIsMoving, setMouseIsMoving] = useState(false)
	const movementTimeoutRef = useRef(null);

	// console.log('SONG IS')
	// console.log(song)

	const prevSong = () => {
		// console.log('SONG IS (PREV)')
		// console.log(song)
		setStoppedIntentionally(true);
		pauseAudio();
		setPlaying(false);

		// Check if it's the first song
		// if (song === 0) {
		// 	const newSong = songsList.length - 1;
		// 	setSong(newSong);
			console.log(songsList)
			console.log('Song is the first one, going to the last one');
		// } else 
		// if (song === songs.length - 1) 
		// if (song === 0) {
			// console.log('SONG IS 0') }
			// else {
			// 	// console.log('SONG IS NOT 0')
			// }
		setSong(prevSongValue => {
			if (prevSongValue === 0) {
				return songs.length - 1;
			} else {
				return prevSongValue - 1;
			}
		});

		setPlaying(true);
	}

	const nextSong = () => {

		// console.log('SONG IS')
		// console.log(song)

		setStoppedIntentionally(true);
		pauseAudio();
		setPlaying(false);
		// console.log(songs.length)
		// console.log(songs)
		// console.log(song)
		if (song === 0) {
			// console.log('SONG IS 0')
		}
		else {
			// console.log('SONG IS NOT 0')
		}
		setSong(prevSongValue => {
			if (prevSongValue === songs.length - 1) {
				return 0;
			} else {
				return prevSongValue + 1;
			}
		});
		setPlaying(true);
		// console.log(song)
	}
	const prevBackground = () => {
		if (background < 1) {
			const newBackground = backgrounds.length - 1
			setBackground(newBackground)
		} else {
			setBackground((prevState) => prevState - 1)
		}
	}
	const nextBackground = () => {
		if (background === backgrounds.length - 1) {
			const newSong = 0
			setBackground(newSong)
		} else {
			setBackground((prevState) => prevState + 1)
		}
	}
	const toggleVisible = async () => {
		setVisible((prevState) => !prevState)
		// if (!visible) {
		// 	setFeature(1)
		// }
	}
	const togglePlaying = () => {
		setPlaying((prevState) => !prevState)
	}

	const throttledTogglePlaying = useCallback(throttle(togglePlaying, 500), []);

	const visibility = visible ? 'visible' : 'invisible'
	let activeClassName = 'nav-active'
	const order = ['', 'mix', 'merch']
	let next = order[feature]

	const updateFeature = () => {
		if (feature >= order.length-1) {
			setFeature(0)
		} else {
			const temp = feature
			setFeature(temp+1)
		}
	}

	function throttle(func, delay) {
		let lastCall = 0;
		return function (...args) {
			const now = new Date().getTime();
			if (now - lastCall < delay) {
				return;
			}
			lastCall = now;
			return func(...args);
		};
	}

	const throttledNextSong = useCallback(throttle(nextSong, 1000), []);
	const throttledPrevSong = useCallback(throttle(prevSong, 1000), []);
	useEffect(() => {
		// console.log(isHovered)
	}, [isHovered])

	useEffect(() => {
		// console.log('setting song name')
		// console.log(song)
		// console.log(songs)
		setSongName(songs[song].data.name)
	}, [song])

	useEffect(() => {
		// Clear any existing timeout before setting a new one.
		let timeoutId;

		setActiveSpeechBubble(true);

		timeoutId = setTimeout(() => {
			setActiveSpeechBubble(false);
		}, 5000);

		// Cleanup function to clear the timeout if this effect runs again.
		return () => clearTimeout(timeoutId);
	}, [songName]);

	useEffect(() => {
		if (playing) {
			playAudio()
		} else {
			pauseAudio();
		}
	}, [song, playing]);

	useEffect(() => {
		const handleMouseMove = () => {
			setMouseIsMoving(true);

			// Clear the existing timeout if it exists
			if (movementTimeoutRef.current) {
				clearTimeout(movementTimeoutRef.current);
			}

			// Set a new timeout to reset mouseIsMoving after 3 seconds
			movementTimeoutRef.current = setTimeout(() => {
				setMouseIsMoving(false);
			}, 1000);
		};

		window.addEventListener('mousemove', handleMouseMove);

		// Cleanup
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			if (movementTimeoutRef.current) {
				clearTimeout(movementTimeoutRef.current);
			}
		};
	}, []);


	return (
		<>

		<div
			className='flex-container'
			style={{
				backgroundImage: `url(${featuredImage}`,
			}}>
			<ScrollPrompts
				visibility={visibility}
				prevSong={throttledPrevSong}
				prevBackground={prevBackground}
				nextBackground={nextBackground}
				nextSong={throttledNextSong}
				activeClassName={activeClassName}
				next={next}
				updateFeature={updateFeature}
				feature={feature}
				order={order}
				isHovered={isHovered}
				mouseIsMoving={mouseIsMoving}
			/>
				{/* <div className='flex-item flex-item-1' ></div> */}
				<div className='logo' onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false) }>
				<Logo
						
					visible={visible}
					activeSpeechBubble={activeSpeechBubble}
					visibility={visibility}
					toggleVisible={toggleVisible}
					logoImage={logoImage}
					logoImage2={logoImage2}
					activeClassName={activeClassName}
					mouseIsMoving={mouseIsMoving}
					/>
					<span className={`speechBubble ${visibility} ${isHovered ? 'opaque' : ''} ${activeSpeechBubble ? 'activeSpeechBubble' : ''} `}>
					{songName}
					</span>
</div>
				<div className={`flex-item flex-item-2 ${isHovered ? ' opaque' : visibility}`}>
				<Routes>
					<Route
						path='/'
						element={
							<Fader
								songVolume={vocalVolume}
								setVocalVolume={setVocalVolume}
								className = {visibility}
								highPassValue={highPassValue}
								setHighPassValue={setHighPassValue}
								lowPassValue={lowPassValue}
								setLowPassValue={setLowPassValue}
							/>
						}
					/>
					{/* <Route
						path='/links'
						element={<FeaturedLinks song={song} visibility={visibility} />}
					/>
					<Route path='/merch' element={<Merch visibility={visibility}/>} /> */}
				</Routes>

				{/* {song.data.element[feature]} */}
			</div>
			
				{/* <div className='flex-item flex-item-3'>
				
			</div> */}
				<div className={`playButton ${mouseIsMoving ? ' opaque' : visibility}`} onClick={throttledTogglePlaying}>
					<div
						className={`${playing ? 'pause' : 'play'}`} >
						{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
					</div>
				</div>
		</div>
		</>
	)
}

export default Featured
