import React from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs'



const ScrollPrompts = ({prevSong, visibility, nextSong}) => {
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
		</>
	)
}

export default ScrollPrompts