import React from "react";
import {
	BsChevronDoubleDown,
	BsChevronDoubleUp,
	BsArrowLeftRight,
	BsChevronDoubleRight,
	BsChevronDoubleLeft,
	BsChevronBarDown,
	BsChevronBarUp,
	BsChevronDown,
	BsChevronUp,
} from 'react-icons/bs'
import { RiOrderPlayFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom'
import { TbWiper } from 'react-icons/tb'


const ScrollPrompts = ({
	activeClassName,
	next,
	prevSong,
	visibility,
	nextSong,
	updateFeature,
	feature,
	order,
	prevBackground,
	nextBackground,
	isHovered,
}) => {
	return (
		<>
			<BsChevronDoubleLeft
				onClick={prevSong}
				className={`scroll-prompt scroll-prompt-left ${isHovered ? 'opaque' : visibility}`}
			/>
			<BsChevronDoubleRight
				onClick={nextSong}
				className={`scroll-prompt scroll-prompt-right ${isHovered ? 'opaque' : visibility}`}
			/>
			<BsChevronUp
				onClick={prevBackground}
				className={`scroll-prompt image-scroll scroll-prompt-top ${isHovered ? 'opaque' : visibility}`}
			/>
			<BsChevronDown
				onClick={nextBackground}
				className={`scroll-prompt image-scroll scroll-prompt-bottom ${isHovered ? 'opaque' : visibility}`}
			/>
			{/* <NavLink
				to={next}
				className={({ isActive }) => (isActive ? activeClassName : undefined)}>
				<BsArrowLeftRight
					onClick={updateFeature}
					className={`scroll-prompt scroll-prompt-right ${visibility}`}
				/>
			</NavLink> */}
		</>
	)
}

export default ScrollPrompts