import React from 'react';
import { Link } from 'react-router-dom';

const SongCard = ({ title, image, album, genre, onClick }) => {
  return (
    <div className="song-card" onClick={onClick}>
      <div className="cover-container">
        <img src={image} alt={title} className="song-img" />
      </div>
      <div className="song-info">
        <p className="song-title">{title}</p>

        {album && (
          <p className="song-album">
            <Link to={`/album/${encodeURIComponent(album)}`}>{album}</Link>
          </p>
        )}

        {genre && (
          <p className="song-genre">
            <Link to={`/genre/${encodeURIComponent(genre)}`}>{genre}</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SongCard;
