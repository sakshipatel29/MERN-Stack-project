const path = require('path');
const fs = require('fs');
const faceapi = require('face-api.js'); // Example library for facial recognition

// Load models
const loadModels = async () => {
    const modelPath = path.join(__dirname, 'models');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
};

// Function to recognize faces
const recognizeFace = async (eventName, uploadedFilePath) => {
    await loadModels();

    // Load the uploaded image
    const uploadedImage = await faceapi.bufferToImage(fs.readFileSync(uploadedFilePath));

    // Detect faces in the uploaded image
    const uploadedImageResults = await faceapi.detectAllFaces(uploadedImage).withFaceLandmarks().withFaceDescriptors();

    if (!uploadedImageResults.length) {
        throw new Error('No faces detected in the uploaded image.');
    }

    const matchingImages = [];

    // Directory where event images are stored
    const eventImagesPath = path.join(__dirname, 'uploads', eventName);
    const eventImages = fs.readdirSync(eventImagesPath);

    for (const imageFileName of eventImages) {
        const imagePath = path.join(eventImagesPath, imageFileName);
        const eventImage = await faceapi.bufferToImage(fs.readFileSync(imagePath));
        const eventImageResults = await faceapi.detectAllFaces(eventImage).withFaceLandmarks().withFaceDescriptors();

        const faceMatcher = new faceapi.FaceMatcher(uploadedImageResults);
        const bestMatch = faceMatcher.findBestMatch(eventImageResults[0].descriptor);

        if (bestMatch.label !== 'unknown') {
            matchingImages.push(imageFileName);
        }
    }

    return matchingImages;
};

module.exports = recognizeFace;
