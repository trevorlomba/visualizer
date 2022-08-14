import React from "react";

import './Fader.css'
import ContainedButtons from "./ContainedButtons";

import tshirt from '../assets/merch.png'

const Fader = ({songVolume, visibility, setVocalVolume}) => {
	return (
		<div className={`merch ${visibility}`}>
			<img className={`merch-image`} src={tshirt} alt='tshirt'></img>
			<button className='merch-button'>
				<span>Buy Now</span>
			</button>
		</div>
	)
}

export default Fader