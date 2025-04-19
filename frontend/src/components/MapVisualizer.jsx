import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TimeComplexity from './TimeComplexity';
import './MapVisualizer.css';

const API_BASE_URL = 'http://localhost:8080/api/map';

export default function MapVisualizer() {
  const [map, setMap] = useState({});
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);

  const fetchMap = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setMap(response.data.data);
      setOperation(response.data);
    } catch (error) {
      toast.error('Failed to fetch map');
    }
  };

  useEffect(() => {
    fetchMap();
  }, []);

  const handlePut = async () => {
    if (!inputKey || !inputValue) {
      toast.error('Please enter both key and value');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/put`, null, {
        params: { key: inputKey, value: inputValue }
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setMap(response.data.data);
        setOperation(response.data);
        toast.success(`Added/Updated key: ${inputKey} with value: ${inputValue}`);
        setInputKey('');
        setInputValue('');
      }
    } catch (error) {
      toast.error('Failed to add/update entry');
    }
  };

  const handleRemove = async (key) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${key}`);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setMap(response.data.data);
        setOperation(response.data);
        toast.success(`Removed key: ${key}`);
      }
    } catch (error) {
      toast.error('Failed to remove entry');
    }
  };

  const handleGet = async () => {
    if (!inputKey) {
      toast.error('Please enter a key to search');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/get/${inputKey}`);
      setOperation(response.data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(`Value for key ${inputKey}: ${response.data.result}`);
      }
    } catch (error) {
      toast.error('Failed to get value');
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset`);
      setMap(response.data.data);
      setOperation(response.data);
      toast.success('Map reset successfully');
    } catch (error) {
      toast.error('Failed to reset map');
    }
  };

  return (
    <div className="map-container">
      <div className="map-controls">
        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Enter key"
          className="input"
        />
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="input"
        />
        <button className="button put" onClick={handlePut}>Put</button>
        <button className="button get" onClick={handleGet}>Get</button>
        <button className="button reset" onClick={handleReset}>Reset</button>
      </div>

      <div className="map-visualization">
        {Object.keys(map).length === 0 ? (
          <p className="empty-message">Map is empty</p>
        ) : (
          <div className="map-items">
            {Object.entries(map).map(([key, value]) => (
              <div key={key} className="map-item">
                <div className="map-key">{key}</div>
                <div className="map-arrow">→</div>
                <div className="map-value">{value}</div>
                <button 
                  className="delete-button"
                  onClick={() => handleRemove(key)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {operation && (
        <TimeComplexity
          operation={operation.operation}
          timeComplexity={operation.timeComplexity}
          description={operation.description}
        />
      )}
    </div>
  );
}
