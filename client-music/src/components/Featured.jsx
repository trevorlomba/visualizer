import React, { useEffect } from "react";
import './Featured.css'

import logoImage from '../assets/logo.png'

import FeaturedLinks from './FeaturedLinks'

import {BsChevronDoubleDown} from 'react-icons/bs'

import { Link } from 'react-router-dom'


const Featured = ({artistName, featuredImage, primaryLink}) => {
    return (
		<div>
				<FeaturedLinks />
				<img className='title' src={logoImage} />
				<img className='featured' src={featuredImage} alt=''></img>
				<Link to={primaryLink}>
					<BsChevronDoubleDown className='scroll-prompt' />
				</Link>
			</div>
		)}


export default Featured