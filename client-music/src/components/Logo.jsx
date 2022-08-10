import React from "react"

const Logo = ({visibility, visible, toggleVisible, logoImage, logoImage2}) => {
    return (
			<img
				className={`title ${visibility}`}
				onClick={toggleVisible}
				src={`${visible ? logoImage : logoImage2}`}
				alt='logo'
			/>
		)
}

export default Logo