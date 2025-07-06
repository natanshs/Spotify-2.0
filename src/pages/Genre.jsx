import React from 'react';
import { useParams } from 'react-router-dom';
import { playlists } from '../data/dummyData';
import SongCard from '../components/SongCard';
import AnimatedWrapper from '../components/AnimatedWrapper';

const Genre = ({ onPlay }) => {
  const { name } = useParams(); // genre name from URL

  const filteredTracks = playlists.filter(
    (track) => track.genre.toLowerCase() === name.toLowerCase()
  );

  return (
    <AnimatedWrapper>
      <div className="genre-page">
        <h2>Genre: {name}</h2>
        <div className="song-grid">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => (
              <SongCard
                key={track.id}
                title={track.title}
                image={track.image}
                album={track.album}
                onClick={() => onPlay(track)}
              />
            ))
          ) : (
            <p>No songs found in this genre.</p>
          )}
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Genre;
