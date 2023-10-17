
import React from "react"
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'

import './Featured.css'

const PlayButton = ({visible, togglePlaying, playing}) => {
    <div className={`playButton ${visible ? 'visible' : 'invisible'}`} onClick={togglePlaying}>
			<div className={playing ? 'pause' : 'play'}>
				{!playing ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
			</div>
		</div>
}

export default PlayButton