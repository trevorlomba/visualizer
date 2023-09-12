const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());

const storage = multer.memoryStorage(); // This will store the uploaded files in memory
const upload = multer({ storage: storage });

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

app.post('/visualizer/add-song', upload.fields([{ name: 'audio1' }, { name: 'audio2' }, { name: 'background' }]), (req, res) => {
    const targetDir = path.resolve(__dirname, './src/assets/');
    const currentDate = new Date().toISOString().split('T')[0];

    const filesToSave = [
        { file: req.files['background'][0], dest: `background-${currentDate}.gif` },
        { file: req.files['audio1'][0], dest: `audio1-${currentDate}.mp3` },
        { file: req.files['audio2'][0], dest: `audio2-${currentDate}.mp3` },
    ];

    filesToSave.forEach(({ file, dest }) => {
        const destPath = path.join(targetDir, dest);

        // Ensure directory exists or create it
        ensureDirectoryExistence(destPath);

        // Check if file exists, if yes, append "-2"
        if (fs.existsSync(destPath)) {
            const parsedPath = path.parse(destPath);
            dest = path.join(parsedPath.dir, `${parsedPath.name}-2${parsedPath.ext}`);
        }

        fs.writeFileSync(destPath, file.buffer);
    });

    // Add to songs.jsx
    const songFilePath = path.resolve(__dirname, './src/songs.jsx');
    const content = fs.readFileSync(songFilePath, 'utf8');

    const newEntry = `
{
    id: ${Date.now()}, 
    data: {
        background: './assets/background-${currentDate}.gif',
        songLink: './assets/audio1-${currentDate}.mp3',
        vocalLink: './assets/audio2-${currentDate}.mp3',
    },
},
`;

    console.log("Files to Save:", filesToSave);

    // Insert the new entry before the last ']'
    const marker = '// MARKER: END OF SONGS';
    if (!content.includes(marker)) {
        return res.status(500).send('Marker not found in songs.jsx');
    }
    const updatedContent = content.replace(marker, `${newEntry},\n${marker}`);

    fs.writeFileSync(songFilePath, updatedContent, 'utf8');

    res.send('New song added successfully!');
    console.log("Updated songs.jsx");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
