import React from "react";
import {TiSocialInstagram} from 'react-icons/ti'
import links from './links.jsx'


const FeaturedLinks = () => {
     const mappedLinks = links.map((link) => (
				<tr
					onClick={() => {
						window.open(`${link.link}`, '_blank')
					}}>
					<td className= {link.tag}>
						<span className="react-icon">{link.img}</span>
						<span className="link-title">{link.name}</span>
					</td>
				</tr>
			))
    return (
			<div className='featured-links'>
				<table>{mappedLinks}</table>
			</div>
		)
}

export default FeaturedLinks