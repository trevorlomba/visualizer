import React from 'react'
import { TiSocialInstagram } from 'react-icons/ti'
import { TbBrandSpotify } from 'react-icons/tb'
import { AiOutlineApple } from 'react-icons/ai'
import { IoShirtOutline } from 'react-icons/io5'
import { ImSpotify } from 'react-icons/im'
import { RiSpotifyLine } from 'react-icons/ri'

const links = [
	{
		name: 'Instagram',
		tag: 'instagram',
		link: 'https://www.instagram.com/',
		img: <TiSocialInstagram />,
	},
	{
		name: 'Spotify',
		tag: 'spotify',
		link: 'https://www.instagram.com/',
		img: <RiSpotifyLine />,
	},
	{
		name: 'Apple Music',
		tag: 'apple',
		link: 'https://www.instagram.com/',
		img: <AiOutlineApple />,
	},
	{
		name: 'Merch',
		tag: 'merch',
		link: 'https://www.instagram.com/',
		img: <IoShirtOutline />,
	},
]

export default links
