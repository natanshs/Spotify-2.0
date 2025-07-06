import React from 'react';
import SongCard from '../components/SongCard';

const Home = ({ playlists, onPlay }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Featured Playlists</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {playlists.map((playlist) => (
          <SongCard
            key={playlist.id}
            title={playlist.title}
            image={playlist.image}
            onClick={() => onPlay(playlist)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
