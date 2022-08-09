import React, { useEffect, useState } from "react";
import './Featured.css'

// import featuredImage from '../assets/background.gif'
// import logoImage from '../assets/logo.png'

import FeaturedLinks from './FeaturedLinks'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs'
import songs from "../songs";


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
	
    return (
			<div>
				{/* <div>{song.id}</div>≈ */}
				<BsChevronDoubleUp
					onClick={prevSong}
					className={`scroll-prompt-top ${visible ? 'visible' : 'invisible'}`}
				/>
				<div className='volume'>
					<div
						className={`slider-container ${visible ? 'visible' : 'invisible'}`}>
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
				<div className={`playButton ${visible ? 'visible' : 'invisible'}`} onClick={() => setPlaying(!playing)}>
					<div className={playing ? 'pause' : 'play'}>
						{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
					</div>
				</div>
				<FeaturedLinks song={song} />
				<BsChevronDoubleDown
					onClick={nextSong}
					className={`scroll-prompt ${visible ? 'visible' : 'invisible'}`}
				/>
				<img className={`title ${visible ? 'visible' : 'invisible'}`} onClick={toggleVisible} src={`${visible ? logoImage : logoImage2}`} />
				<img className={`featured`} src={featuredImage} alt=''></img>
			</div>
		)}


export default Featured