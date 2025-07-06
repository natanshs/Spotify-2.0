import React from 'react';
import { useParams } from 'react-router-dom';
import { playlists } from '../data/dummyData';
import AnimatedWrapper from '../components/AnimatedWrapper';
import SongCard from '../components/SongCard';

const Album = ({ onPlay }) => {
  const { id } = useParams(); // album name from URL

  const albumTracks = playlists.filter(
    (track) => track.album.toLowerCase() === id.toLowerCase()
  );

  const albumTitle = albumTracks[0]?.album || id;

  return (
    <AnimatedWrapper>
      <div className="album-page">
        <h2>{albumTitle}</h2>
        <div className="song-grid">
          {albumTracks.length > 0 ? (
            albumTracks.map((track) => (
              <SongCard key={track.id} {...track} onClick={() => onPlay(track)} />
            ))
          ) : (
            <p>No songs found for this album.</p>
          )}
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Album;
