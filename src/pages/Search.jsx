import React, { useState } from 'react';
import { playlists } from '../data/dummyData';
import SongCard from '../components/SongCard';
import { Link } from 'react-router-dom';
import AnimatedWrapper from '../components/AnimatedWrapper';

const Search = ({ onPlay }) => {
  const [query, setQuery] = useState('');

  const filtered = playlists.filter((track) => {
    const q = query.toLowerCase();
    return (
      track.title.toLowerCase().includes(q) ||
      track.artist.toLowerCase().includes(q) ||
      track.album.toLowerCase().includes(q) ||
      track.genre.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatedWrapper>
      <div className="search-page">
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Search songs, artists, albums, genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        {query && (
          <div className="search-results">
            {filtered.length > 0 ? (
              filtered.map((track) => (
                <div key={track.id} className="search-item">
                  <SongCard
                    title={track.title}
                    image={track.image}
                    album={track.album}
                    onClick={() => onPlay(track)}
                  />
                  <div className="search-meta">
                    <Link to={`/artist/${encodeURIComponent(track.artist)}`}>
                      {track.artist}
                    </Link>
                    {' | '}
                    <Link to={`/album/${encodeURIComponent(track.album)}`}>
                      {track.album}
                    </Link>
                    {' | '}
                    <Link to={`/genre/${encodeURIComponent(track.genre)}`}>
                      {track.genre}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>
    </AnimatedWrapper>
  );
};

export default Search;
