import React, { useEffect } from "react";
import './Featured.css'

import featuredImage from '../assets/background.gif'
import logoImage from '../assets/logo.png'

import FeaturedLinks from './FeaturedLinks'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import {BsChevronDoubleDown} from 'react-icons/bs'


const Featured = ({artistName, playing, setPlaying}) => {
    return (
			<div>
				<div className='playButton' onClick={() => setPlaying(!playing)}>
					<div className={playing ? 'pause' : 'play'}>
						{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
					</div>
				</div>
				<FeaturedLinks />
				<BsChevronDoubleDown className='scroll-prompt' />
				<img className='title' src={logoImage} />
				<img className='featured' src={featuredImage} alt=''></img>
			</div>
		)}


export default Featured