# Musify

Musify is a full-stack web application inspired by popular music streaming platforms like Spotify. It allows users to discover, listen to, and manage their favorite music tracks. This README provides an overview of the Musify app, its features, technologies used, and instructions to set up and run the application locally.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Showcase](#Showcase)

## Features

Musify offers the following features:

- Browse and search for music tracks
- Create and manage playlists
- Real-time updates for music and playlist
- Smooth and interactive user interface
- Play, pause, skip, and control music playback
- Responsive design for different devices

## Technologies Used

The Musify app is built using the following technologies:

- **Frontend:**
  - React.js - A JavaScript library for building user interfaces.
  - React Router DOM - For handling client-side routing.
  - Axios - A promise-based HTTP client for making API requests.
  - Socket.io - Enables real-time communication between clients and server.
- **Backend:**
  - Express.js - A web application framework for Node.js.
  - Socket.io - Handles real-time events between server and clients.
- **Database:**
  - MongoDB - An Atlas database used for storing user data, playlists, and music tracks.

## Getting Started

To get started with the Musify app, follow these steps:

### Installation

1. Navigate to the project directory:

   cd Musify

2. Install the required dependencies for both frontend and backend:

   cd frontend
   npm install

   cd ../backend
   npm install

### Usage

1. Start the backend server:

   cd backend
   npm run dev

2. Start the frontend development server:

   cd frontend
   npm start

3. Open your web browser and go to `http://localhost:3000` to access the Musify app.

## Showcase

### Homepage

The landing page where users can click on a playlist or access their personal playlist.

![Homepage Image](/frontend/src/assets/img/ReadmeImg/pc/HomePage.png)

### Browse

Explore a diverse collection of music tracks from various genres and artists. Use our powerful search options to discover new favorites.

![Browse Image](/frontend/src/assets/img/ReadmeImg/pc/Search.png)

### Playlists

Access your playlists, and create new ones. Customize your music experience by different moods, occasions, and genres.

![Playlists Image](/frontend/src/assets/img/ReadmeImg/pc/Edit.png)

### Library

All your favorite tracks, albums, and playlists in one place. Easily manage and access your saved music collection.

![Library Image](/frontend/src/assets/img/ReadmeImg/pc/Library.png)

### Player

Immerse yourself in your selected music. Play, pause, skip, shuffle, loop and control the volume. Get lost in the rhythm and sound.

![Player Image](/frontend/src/assets/img/ReadmeImg/pc/Player.png)

## Mobile Experience

Experience the full power of Musify on your mobile device.

<div style="display: flex;">
    <img src="/frontend/src/assets/img/ReadmeImg/mobile/HomepageMobile.png" style="max-width: auto; height: 400px; margin-right: 10px;" />
    <img src="/frontend/src/assets/img/ReadmeImg/mobile/LibraryMobile.png" style="max-width: auto; height: 400px; margin-right: 10px;" />
    <img src="/frontend/src/assets/img/ReadmeImg/mobile/playlistMobile.png" style="max-width: auto; height: 400px; margin-right: 10px;" />
    <img src="/frontend/src/assets/img/ReadmeImg/mobile/SearchMobile.png" style="max-width: auto; height: 400px;" />
</div>