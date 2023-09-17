import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp, BsChevronUp, BsChevronDown } from 'react-icons/bs';
import './Fader.scss';

const Fader = ({ songVolume, visibility, setVocalVolume,
	highPassValue, setHighPassValue, lowPassValue, setLowPassValue }) => {
	const [showFilters, setShowFilters] = useState(false);

	useEffect(() => {
		console.log(songVolume);
	}, [songVolume]);

	return (
		<div className='volume'>
			<div className={`slider-container ${visibility}`}>
				<label className='slider-label'>Gain</label>
				<input
					type='range'
					min='0'
					max='2'
					step='.05'
					value={songVolume}
					onChange={(e) => setVocalVolume(e.target.value)}
				/>
			{showFilters ? '' : <div className="toggle-filters" onClick={() => setShowFilters(!showFilters)}>
				{showFilters ? <BsChevronUp /> : <BsChevronDown />}
			</div>}
			</div>
			{showFilters && (
				<>
					<div className={`slider-container ${visibility}`}>
						<label className='slider-label'>Higpass</label>
						<input
							type='range'
							min='0'
							max='1'
							step='.05'
							value={highPassValue}
							onChange={(e) => setHighPassValue(e.target.value)}
						/>
					</div>
					<div className={`slider-container ${visibility}`}>
						<label className='slider-label'>Lowpass</label>
						<input
							type='range'
							min='0'
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
