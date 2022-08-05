// import logo from './logo.svg';
import './App.css';
import Featured from './components/Featured';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'

import featuredImage from './assets/background.gif'
import featuredImage2 from './assets/background2.gif'

 

const App = () => {
  const [artistName, setArtistName] = useState('yes')

  const pageOne = '/'
  const pageTwo = '/alt'
  useEffect(() => 
    console.log(artistName)
  , [])

  return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={
						<Featured
							artistName={artistName}
							setArtistName={setArtistName}
							className='title'
							featuredImage={featuredImage}
							primaryLink={pageTwo}
						/>
					}
				/>
				<Route
					path='/alt'
					element={
						<Featured
							artistName={artistName}
							setArtistName={setArtistName}
							className='title'
							featuredImage={featuredImage2}
							primaryLink={pageOne}
						/>
					}
				/>
			</Routes>
			{/* <Routes>
				<Route path = '/' element={<Featured artistName={artistName} setArtistName={setArtistName} className='title' />} />
			</Routes> */}
			{/* <Featured artistName={artistName} setArtistName={setArtistName} className='title' /> */}
		</div>
	)
}

export default App;
