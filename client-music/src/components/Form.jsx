import React, { useState } from 'react';
import axios from 'axios';

function Form() {
    const [audio1, setAudio1] = useState(null);
    const [audio2, setAudio2] = useState(null);
    const [background, setBackground] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!audio1 || !audio2 || !background) {
            setMessage('Please ensure all files are selected.');
            return;
        }

        const formData = new FormData();
        formData.append('audio1', audio1);
        formData.append('audio2', audio2);
        formData.append('background', background);

        try {
            const response = await axios.post('http://localhost:5000/visualizer/add-song', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('Successfully uploaded the song!');
            console.log(response.data);
        } catch (error) {
            setMessage('There was an error uploading the song.');
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Audio1:
                    <input type="file" accept=".mp3" onChange={e => setAudio1(e.target.files[0])} />
                </label>
                <br />

                <label>
                    Audio2:
                    <input type="file" accept=".mp3" onChange={e => setAudio2(e.target.files[0])} />
                </label>
                <br />

                <label>
                    Background:
                    <input type="file" accept=".gif" onChange={e => setBackground(e.target.files[0])} />
                </label>
                <br />

                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Form;