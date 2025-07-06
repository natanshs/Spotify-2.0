import React, { useEffect, useRef, useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaRandom,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Player = ({ song, onShuffle, onNext, onPrev }) => {
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [song]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  const handleSeek = (e) => {
    const progressWidth = progressBarRef.current.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    const seekTime = (offsetX / progressWidth) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  if (!song) return null;

  return (
    <div className="player-bar">
      <div className="player-song-info">
        <img src={song.image} alt={song.title} />
        <div>
          <p className="song-name">{song.title}</p>
          <p className="song-artist">
            <Link to={`/artist/${song.artist || 'Unknown'}`}>
              {song.artist || 'Unknown Artist'}
            </Link>
          </p>
        </div>
      </div>

      <div className="player-controls">
        <FaRandom className="player-icon" title="Shuffle" onClick={onShuffle} />
        <FaBackward className="player-icon" title="Previous" onClick={onPrev} />
        {isPlaying ? (
          <FaPause className="player-icon" onClick={togglePlayPause} />
        ) : (
          <FaPlay className="player-icon" onClick={togglePlayPause} />
        )}
        <FaForward className="player-icon" title="Next" onClick={onNext} />
      </div>

      <div className="progress-section">
        <span className="time">{formatTime(currentTime)}</span>
        <div
          className="progress-bar"
          ref={progressBarRef}
          onClick={handleSeek}
        >
          <div
            className="progress-filled"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          ></div>
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
    </div>
  );
};

export default Player;
