import React from "react"
import { NavLink } from "react-router-dom"

const Logo = ({visibility, visible, toggleVisible, logoImage, logoImage2, activeClassName, activeSpeechBubble, mouseIsMoving}) => {
    return (
			<NavLink
				to='/'
				className={({ isActive }) => (isActive ? activeClassName : undefined)}>
				<img
			
				className={`title ${visibility} ${activeSpeechBubble ? 'activeSpeechBubble' : ''} ${mouseIsMoving ? 'opaque' : ''}`}
					onClick={toggleVisible}
					src={`${visible ? logoImage : logoImage}`}
					alt='logo'
				/>
			</NavLink>
		)
}

export default Logo