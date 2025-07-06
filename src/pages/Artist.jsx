import React from 'react';
import { useParams } from 'react-router-dom';
import { playlists } from '../data/dummyData';
import AnimatedWrapper from '../components/AnimatedWrapper';

const Artist = () => {
  const { name } = useParams();

  const songs = playlists.filter((song) =>
    song.artist?.toLowerCase() === name.toLowerCase()
  );

  return (
    <AnimatedWrapper>
      <div className="artist-page">
        <h2>{name}</h2>
        <p>Artist Bio: Lorem ipsum dolor sit amet. Touring worldwide, breaking records 🔥</p>

        <div className="song-grid">
          {songs.length ? (
            songs.map((song) => (
              <div key={song.id} className="song-card">
                <img src={song.image} alt={song.title} />
                <p>{song.title}</p>
              </div>
            ))
          ) : (
            <p>No songs found for this artist.</p>
          )}
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Artist;
