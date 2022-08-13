import React from "react";

import './Fader.css'

import tshirt from '../assets/shirt.png'

const Fader = ({songVolume, visibility, setVocalVolume}) => {
	return (
		<div className="merch">
			<img className="merch-image" src={tshirt} alt='tshirt'></img>
			<button className="merch-button">Buy Now</button>
		</div>
	)
}

export default Fader