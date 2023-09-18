import React from 'react'

import Fader from './components/Fader'
import FeaturedLinks from './components/FeaturedLinks'
import Merch from './components/Merch'

import { TiSocialInstagram } from 'react-icons/ti'
import { TbBrandSpotify } from 'react-icons/tb'
import { AiOutlineApple } from 'react-icons/ai'
import { IoShirtOutline, IoLogoTiktok } from 'react-icons/io5'
import { ImSpotify } from 'react-icons/im'
import { RiSpotifyLine } from 'react-icons/ri'

import backgroundImage from './assets/background7.gif'
import logoImage from './assets/logo.png'
import logoImage2 from './assets/logo2.png'
import backgroundImage2 from './assets/background.gif'

import merch1 from './assets/merch.png'
import merch2 from './assets/merch2.png'

// eslint-disable-next-line no-sparse-arrays
const songs = [
	{
		data: {
			logo: logoImage,
			logo2: logoImage2,
			// vocalLink: 'https://sndup.net/wsv2/m',
			songLink: 'https://storage.googleapis.com/music-microsite-visuals/9.18.23.wav',
			name: '9.18.23',
			// songLink: 'https://sndup.net/9c5h/m',
		},
	}, 
	{
		data: {
			logo: logoImage,
			logo2: logoImage2,
			// vocalLink: 'https://sndup.net/wsv2/m',
			songLink: 'https://storage.googleapis.com/music-microsite-visuals/9.11.23%20v2.wav',
			name: '9.12.23',
			// songLink: 'https://sndup.net/9c5h/m',
		},
	}, 
	{
		data: {
			logo: logoImage,
			logo2: logoImage2,
			// vocalLink: 'https://sndup.net/wsv2/m',
			songLink: 'https://storage.googleapis.com/music-microsite-visuals/8.29.23%20v6.wav',
			name: '8.29.23',
			// songLink: 'https://sndup.net/9c5h/m',
		},
	}, 
	{
		data: {
			logo: logoImage,
			logo2: logoImage2,
			// vocalLink: 'https://sndup.net/wsv2/m',
			songLink: 'https://storage.googleapis.com/music-microsite-visuals/4.29.22%201.10.wav',
			name: '4.29.23',
			// songLink: 'https://sndup.net/9c5h/m',
		},
	}, 
	{
		data: {
			logo: logoImage,
			logo2: logoImage2,
			// vocalLink: 'https://sndup.net/wsv2/m',
			songLink: 'https://storage.googleapis.com/music-microsite-visuals/3.6.23%202.wav',
			name: '3.6.23',
			// songLink: 'https://sndup.net/9c5h/m',
		},
	}, 
	{
		data: {
			logo: logoImage,
			logo2: logoImage2,
			// vocalLink: 'https://sndup.net/wsv2/m',
			songLink: 'https://storage.googleapis.com/music-microsite-visuals/3.15.23%20v7%202(1).wav',
			name: '3.15.23',
			// songLink: 'https://sndup.net/9c5h/m',
		},
	}, 
	// {
	// 	data: {
	// 		logo: logoImage,
	// 		logo2: logoImage2,
	// 		vocalLink: 'https://sndup.net/xzzk/d',
	// 		songLink: 'https://sndup.net/rb6s/m',
	// 		name: '3.5.20',
	// 		// merch: [
	// 			// 	{ name: 'merch1', img: merch1, link: '' },
	// 			// 	// { name: 'merch2', img: merch2, link: '' },
	// 			// ],
	// 		},
	// 	},
	// 	{
	// 		data: {
	// 			logo: logoImage,
	// 			logo2: logoImage2,
	// 			// vocalLink: 'https://sndup.net/wsv2/m',
	// 			// songLink: 'https://storage.googleapis.com/aug23/Website/songs/3.15.23%20v7%202.wav',
	// 			songLink: 'https://sndup.net/9c5h/m',
	// 			name: '1.20.20',
	// 		},
	// 	}, 
	]

export default songs