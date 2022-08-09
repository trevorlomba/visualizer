import React from 'react'

import { TiSocialInstagram } from 'react-icons/ti'
import { TbBrandSpotify } from 'react-icons/tb'
import { AiOutlineApple } from 'react-icons/ai'
import { IoShirtOutline, IoLogoTiktok } from 'react-icons/io5'
import { ImSpotify } from 'react-icons/im'
import { RiSpotifyLine } from 'react-icons/ri'

import backgroundImage from './assets/background.gif'
import logoImage from './assets/logo.png'
import backgroundImage2 from './assets/background2.gif'

const songs = [
	{
		id: 0,
		data: {
			background: backgroundImage,
			logo: logoImage,
			songLink: 'https://sndup.net/xzzk/d',
			vocalLink: 'https://sndup.net/rb6s/m',
			featuredLinks: [
				{
					name: 'TikTok',
					tag: 'tiktok',
					link: 'https://www.tiktok.com/@lxvimusic',
					img: <IoLogoTiktok />,
				},
				{
					name: 'Instagram',
					tag: 'instagram',
					link: 'https://www.instagram.com/lxvimusic',
					img: <TiSocialInstagram />,
				},
				{
					name: 'Spotify',
					tag: 'spotify',
					link: 'https://open.spotify.com/artist/1VvdebwNf9wAPhoti1uQtn?C=',
					img: <RiSpotifyLine />,
				},
				{
					name: 'Apple Music',
					tag: 'apple',
					link: 'https://music.apple.com/us/artist/lxvi/990781367',
					img: <AiOutlineApple />,
				},
				{
					name: 'Merch',
					tag: 'merch',
					link: 'https://www.instagram.com/',
					img: <IoShirtOutline />,
				},
			],
		},
	},
	{
		id: 1,
		data: {
			background: backgroundImage2,
			logo: logoImage,
			songLink: 'https://sndup.net/wsv2/m',
			vocalLink: 'https://sndup.net/9c5h/m',
			featuredLinks: [
				{
					name: 'Tok',
					tag: 'tiktok',
					link: 'https://www.tiktok.com/@lxvimusic',
					img: <IoLogoTiktok />,
				},
				{
					name: 'Insta',
					tag: 'instagram',
					link: 'https://www.instagram.com/lxvimusic',
					img: <TiSocialInstagram />,
				},
				{
					name: 'Spot',
					tag: 'spotify',
					link: 'https://open.spotify.com/artist/1VvdebwNf9wAPhoti1uQtn?C=',
					img: <RiSpotifyLine />,
				},
				
			],
		},
	},
]

export default songs