import { useState } from 'react';

const LocationInput: React.FC<{ onLocationSubmit: (latitude: number, longitude: number) => void }> = ({ onLocationSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = () => {
    if (latitude && longitude) {
      onLocationSubmit(parseFloat(latitude), parseFloat(longitude));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        placeholder="Enter latitude..."
      />
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        placeholder="Enter longitude..."
      />
      <button onClick={handleSubmit}>Get Weather Info</button>
    </div>
  );
};

export default LocationInput;
