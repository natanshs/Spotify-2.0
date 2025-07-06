import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Player from './components/Player';
import AnimatedWrapper from './components/AnimatedWrapper';

import Home from './pages/Home';
import Search from './pages/Search';
import Album from './pages/Album';
import Genre from './pages/Genre';
import Artist from './pages/Artist';

import { playlists } from './data/dummyData';
import { AnimatePresence } from 'framer-motion';

import './styles/main.css';

const AnimatedRoutes = ({
  playlists,
  playSong,
  currentSong,
  playRandomSong,
  playNext,
  playPrev,
}) => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedWrapper>
                <Home playlists={playlists} onPlay={playSong} />
              </AnimatedWrapper>
            }
          />
          <Route
            path="/search"
            element={
              <AnimatedWrapper>
                <Search onPlay={playSong} />
              </AnimatedWrapper>
            }
          />
          <Route
            path="/album/:id"
            element={
              <AnimatedWrapper>
                <Album onPlay={playSong} />
              </AnimatedWrapper>
            }
          />
          <Route
            path="/genre/:name"
            element={
              <AnimatedWrapper>
                <Genre onPlay={playSong} />
              </AnimatedWrapper>
            }
          />
          <Route
            path="/artist/:name"
            element={
              <AnimatedWrapper>
                <Artist />
              </AnimatedWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      <Player
        song={currentSong}
        onShuffle={playRandomSong}
        onNext={playNext}
        onPrev={playPrev}
      />
    </>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const currentSong = currentIndex !== null ? playlists[currentIndex] : null;

  const playSong = (song) => {
    const index = playlists.findIndex((p) => p.id === song.id);
    setCurrentIndex(index);
  };

  const playNext = () => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % playlists.length;
    setCurrentIndex(nextIndex);
  };

  const playPrev = () => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + playlists.length) % playlists.length;
    setCurrentIndex(prevIndex);
  };

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * playlists.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <AnimatedRoutes
            playlists={playlists}
            playSong={playSong}
            currentSong={currentSong}
            playRandomSong={playRandomSong}
            playNext={playNext}
            playPrev={playPrev}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
