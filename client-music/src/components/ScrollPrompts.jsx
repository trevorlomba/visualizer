import React from "react";
import {
	BsChevronDoubleDown,
	BsChevronDoubleUp,
	BsArrowLeftRight,
} from 'react-icons/bs'
import { RiOrderPlayFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom'


const ScrollPrompts = ({
	activeClassName,
	next,
	prevSong,
	visibility,
	nextSong,
	updateFeature,
	feature,
	order
}) => {
	return (
		<>
			<BsChevronDoubleUp
				onClick={prevSong}
				className={`scroll-prompt scroll-prompt-top ${visibility}`}
			/>
			<BsChevronDoubleDown
				onClick={nextSong}
				className={`scroll-prompt scroll-prompt-bottom ${visibility}`}
			/>
			<NavLink
				to={next}
				className={({ isActive }) => (isActive ? activeClassName : undefined)}>
				<BsArrowLeftRight
					onClick={updateFeature}
					className={`scroll-prompt scroll-prompt-right ${visibility}`}
				/>
			</NavLink>
		</>
	)
}

export default ScrollPrompts