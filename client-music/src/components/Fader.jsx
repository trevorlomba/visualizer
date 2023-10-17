import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp, BsChevronUp, BsChevronDown } from 'react-icons/bs';
import {GrPowerReset} from 'react-icons/gr';
import { BiReset } from 'react-icons/bi';
import './Fader.scss';

const Fader = ({ songVolume, visibility, setVocalVolume,
	highPassValue, setHighPassValue, lowPassValue, setLowPassValue }) => {
	const [showFilters, setShowFilters] = useState(true);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const adjustValueByMouse = (e) => {
			if (isDragging) {
				const newValue = songVolume + e.movementX * 0.01; // Adjust the 0.01 multiplier as needed
				if (newValue >= 0 && newValue <= 2) {
					setVocalVolume(newValue);
				}
			}
		};

		const stopDrag = () => {
			if (isDragging) {
				setIsDragging(false);
			}
		};

		window.addEventListener('mousemove', adjustValueByMouse);
		window.addEventListener('mouseup', stopDrag);

		return () => {
			window.removeEventListener('mousemove', adjustValueByMouse);
			window.removeEventListener('mouseup', stopDrag);
		};
	}, [isDragging, songVolume, setVocalVolume]);


	return (
		<div className='volume'>
			<div className={`slider-container ${visibility}`}>
				<div className={`slider-container ${visibility}`} onDoubleClick={() => setVocalVolume(1.2)}>
					<label
						className='slider-label reset'
					
						
					>
						Gain
					</label>
					<input
						type='range'
						min='0'
						max='3'
						step='.05'
						value={songVolume}
						onChange={(e) => setVocalVolume(e.target.value)}
					/></div>
			{showFilters ? '' : <div className="toggle-filters" onClick={() => setShowFilters(!showFilters)}>
				{showFilters ? <BsChevronUp /> : <BsChevronDown />}
			</div>}
			</div>
			{showFilters && (
				<>
					<div className={`slider-container ${visibility}`} onDoubleClick={() => setHighPassValue(0)}>
						<label className='slider-label reset'  >Higpass </label>
						<input
							type='range'
							min='0'
							max='.8'
							step='.05'
							value={highPassValue}
							onChange={(e) => setHighPassValue(e.target.value)}
						/>
					</div>
					<div className={`slider-container ${visibility}`} onDoubleClick={() => setLowPassValue(1)}>
						<label className='slider-label reset'  >Lowpass </label>
						<input
							type='range'
							min='.2'
							max='1'
							step='.05'
							value={lowPassValue}
							onChange={(e) => setLowPassValue(e.target.value)}
						/>
						<div className={`toggle-filters`} onClick={() => setShowFilters(!showFilters)}>
							{showFilters ? <BsChevronUp /> : <BsChevronDown />}
						</div>
					</div>
				</>
			)}
			
		</div>
	);
}

export default Fader;
