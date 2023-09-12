import React, { useEffect, useState, useRef } from 'react'
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
	song,
	setSong,
	vocalVolume,
	setVocalVolume,
	songsList, 
	background,
	setBackground,
	backgrounds
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
	// console.log(song)

	const prevSong = () => {
		// prevBackground()
		if (song < 1) {
			const newSong = songs.length - 1
			setSong(newSong)
		} else {
			setSong((prevState) => prevState - 1)
		}
	}
	const nextSong = () => {
		// nextBackground()
		console.log(songsList)
		console.log(song)
		if (song === songsList.length - 1) {
			const newSong = 0
			setSong(newSong)
		} else {
			setSong((prevState) => prevState + 1)
		}
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

	useEffect(() => {
		console.log(isHovered)
	}, [isHovered])

	useEffect(() => {
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
		const handleMouseMove = () => {
			setMouseIsMoving(true);

			// Clear the existing timeout if it exists
			if (movementTimeoutRef.current) {
				clearTimeout(movementTimeoutRef.current);
			}

			// Set a new timeout to reset mouseIsMoving after 3 seconds
			movementTimeoutRef.current = setTimeout(() => {
				setMouseIsMoving(false);
			}, 3000);
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
				prevSong={prevSong}
				prevBackground={prevBackground}
				nextBackground={nextBackground}
				nextSong={nextSong}
				activeClassName={activeClassName}
				next={next}
				updateFeature={updateFeature}
				feature={feature}
				order={order}
				isHovered={isHovered}
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
								className = {isHovered ? ' opaque' : visibility}
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
				<div className={`playButton ${isHovered ? ' opaque' : visibility}`} onClick={togglePlaying}>
					<div
						className={`${playing ? 'pause' : 'play'}`} >
						{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
					</div>
				</div>
		</div>
			{/* <Form /> */}

		</>
	)
}

export default Featured
