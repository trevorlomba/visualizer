import React, { useEffect, useState } from "react";
import './Featured.css'

// import featuredImage from '../assets/background.gif'
// import logoImage from '../assets/logo.png'

import Fader from './Fader'
import ScrollPrompts from './ScrollPrompts'
import FeaturedLinks from './FeaturedLinks'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import songs from "../songs";

const FeaturedImage = React.lazy(() => import('./FeaturedImage'))
const Logo = React.lazy(() => import('./Logo'))


const Featured = ({artistName, playing, setPlaying, song, setSong, vocalVolume, setVocalVolume}) => {
	let featuredImage = song.data.background
	let logoImage = song.data.logo
	let logoImage2 = song.data.logo2
	const [visible, setVisible] = useState(true)
	console.log(song)

	const prevSong = () => {
		if(song.id < 1) {
			const newSong = songs.length-1
			setSong(newSong)
		} else {
		setSong((prevState) => prevState - 1)}
	}
	const nextSong = () => {
		if(song.id === songs.length-1) {
			const newSong = 0
			setSong(newSong)
		} else {
		setSong((prevState) => prevState + 1)}
	}
	const toggleVisible = () => {
		setVisible((prevState) => !prevState)
	}
	const togglePlaying = () => {
		setPlaying((prevState) => !prevState)
	}
	const visibility = visible ? 'visible' : 'invisible'
	
    return (
			<div
				className='flex-container'
				style={{
					backgroundImage: `url(${featuredImage}`,
				}}>
				<ScrollPrompts
					visibility={visibility}
					prevSong={prevSong}
					nextSong={nextSong}
				/>
				<div className='flex-item flex-item-1'>
					<Logo
						className=''
						visible={visible}
						visibility={visibility}
						toggleVisible={toggleVisible}
						logoImage={logoImage}
						logoImage2={logoImage2}
					/>
				</div>
				<div className='flex-item flex-item-2'>
					<Fader songVolume={vocalVolume} setVocalVolume={setVocalVolume} visibility={visibility} />
					{/* <FeaturedLinks song={song} visibility={visibility}/> */}
				</div>
				<div className='flex-item flex-item-3'>
					<div className={`playButton ${visibility}`} onClick={togglePlaying}>
						<div
							className={`flex-item flex-item-3 ${playing ? 'pause' : 'play'}`}>
							{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
						</div>
					</div>
				</div>
			</div>
		)}


export default Featured