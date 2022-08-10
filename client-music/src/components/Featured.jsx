import React, { useEffect, useState } from "react";
import './Featured.css'

// import featuredImage from '../assets/background.gif'
// import logoImage from '../assets/logo.png'

import FeaturedLinks from './FeaturedLinks'
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs'
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
			<div>
				{/* <div>{song.id}</div>≈ */}
				<BsChevronDoubleUp
					onClick={prevSong}
					className={`scroll-prompt-top ${visibility}`}
				/>
				<div className='volume'>
					<div className={`slider-container ${visibility}`}>
						<input
							type='range'
							min='0'
							max='1'
							step='.01'
							value={vocalVolume}
							onChange={(e) => setVocalVolume(e.target.value)}
						/>
					</div>
				</div>
				<div className={`playButton ${visibility}`} onClick={togglePlaying}>
					<div className={playing ? 'pause' : 'play'}>
						{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
					</div>
				</div>
				<FeaturedLinks song={song} />
				<BsChevronDoubleDown
					onClick={nextSong}
					className={`scroll-prompt ${visibility}`}
				/>
				<Logo
					visible={visible}
					visibility={visibility}
					toggleVisible={toggleVisible}
					logoImage={logoImage}
					logoImage2={logoImage2}
				/>
				<FeaturedImage featuredImage={featuredImage} />
			</div>
		)}


export default Featured