import React, { useEffect } from "react";
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
	
    return (
			<div>
				{/* <div>{song.id}</div>≈ */}
				<BsChevronDoubleUp onClick={prevSong} className='scroll-prompt-top' />
				<div className='volume'>
					<span className='slider-container'>
						<input
							type='range'
							min='0'
							max='1'
							step='.05'
							value={vocalVolume}
							onChange={(e) => setVocalVolume(e.target.value)}
						/>
					</span>
				</div>
				<div className='playButton' onClick={() => setPlaying(!playing)}>
					<div className={playing ? 'pause' : 'play'}>
						{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
					</div>
				</div>
				<FeaturedLinks />
				<BsChevronDoubleDown onClick={nextSong} className='scroll-prompt' />
				<img className='title' src={logoImage} />
				<img className='featured' src={featuredImage} alt=''></img>
			</div>
		)}


export default Featured