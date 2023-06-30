import React, { useState, useEffect } from 'react';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  const openPopup = async (albumId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
    const data = await response.json();
    setSelectedAlbum(albumId);
    setPhotos(data);
  };

  const closePopup = () => {
    setSelectedAlbum(null);
    setPhotos([]);
  };

  return (
    <div>
      <h1>Albums</h1>
      <div className="album-grid">
        {albums.map(album => (
          <div className="album-card" key={album.id} onClick={() => openPopup(album.id)}>
            <h3>{album.title}</h3>
          </div>
        ))}
      </div>

      {selectedAlbum && (
        <div className="popup">
          <h2>Album {selectedAlbum}</h2>
          <div className="image-grid">
            {photos.map(photo => (
              <img src={photo.url} alt={photo.title} key={photo.id} />
            ))}
          </div>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
