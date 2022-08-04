// import logo from './logo.svg';
import './App.css';
import Featured from './components/Featured';
import { useEffect, useState } from 'react';


function App() {
  const [artistName, setArtistName] = useState('yes')

  useEffect(() => 
    console.log(artistName)
  , [])
  return (
		<div className='App'>
			<Featured
				artistName={artistName}
				setArtistName={setArtistName}
				className='title'
			/>
		</div>
	)
}

export default App;
