import React, { useEffect } from "react";
import './Featured.css'

import featuredImage from '../assets/background.gif'
import logoImage from '../assets/logo.png'

import FeaturedLinks from './FeaturedLinks'

import {BsChevronDoubleDown} from 'react-icons/bs'


const Featured = ({artistName}) => {
    return (
			<div>
				<FeaturedLinks />
				<BsChevronDoubleDown className='scroll-prompt' />
				<img className='title' src={logoImage} />
				<img className='featured' src={featuredImage} alt=''></img>
			</div>
		)}


export default Featured