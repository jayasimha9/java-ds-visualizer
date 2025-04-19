import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TimeComplexity from './TimeComplexity';
import './ArrayVisualizer.css';

const API_BASE_URL = 'http://localhost:8080/api/array';

export default function ArrayVisualizer() {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [operation, setOperation] = useState(null);

  const fetchArray = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setArray(response.data.data);
      setOperation(response.data);
    } catch (error) {
      toast.error('Failed to fetch array');
    }
  };

  useEffect(() => {
    fetchArray();
  }, []);

  const handleInsert = async () => {
    if (!inputValue) {
      toast.error('Please enter a value');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/insert`, null, {
        params: {
          value: inputValue,
          index: inputIndex || null
        }
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setArray(response.data.data);
        setOperation(response.data);
        toast.success(`Inserted ${inputValue}${inputIndex ? ` at index ${inputIndex}` : ''}`);
        setInputValue('');
        setInputIndex('');
      }
    } catch (error) {
      toast.error('Failed to insert value');
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${index}`);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setArray(response.data.data);
        setOperation(response.data);
        toast.success(`Deleted element at index ${index}`);
      }
    } catch (error) {
      toast.error('Failed to delete element');
    }
  };

  const handleSearch = async () => {
    if (!inputValue) {
      toast.error('Please enter a value to search');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/search/${inputValue}`);
      setOperation(response.data);
      const index = response.data.result;
      if (index === -1) {
        toast.error(`Value ${inputValue} not found`);
      } else {
        toast.success(`Found ${inputValue} at index ${index}`);
      }
    } catch (error) {
      toast.error('Failed to search');
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset`);
      setArray(response.data.data);
      setOperation(response.data);
      toast.success('Array reset successfully');
    } catch (error) {
      toast.error('Failed to reset array');
    }
  };

  return (
    <div className="array-container">
      <div className="array-controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
          className="input"
        />
        <input
          type="number"
          value={inputIndex}
          onChange={(e) => setInputIndex(e.target.value)}
          placeholder="Index (optional)"
          className="input"
        />
        <button className="button insert" onClick={handleInsert}>Insert</button>
        <button className="button search" onClick={handleSearch}>Search</button>
        <button className="button reset" onClick={handleReset}>Reset</button>
      </div>

      <div className="array-visualization">
        {array.length === 0 ? (
          <p className="empty-message">Array is empty</p>
        ) : (
          <div className="array-items">
            {array.map((item, index) => (
              <div key={`${item}-${index}`} className="array-item">
                <div className="array-value">{item}</div>
                <div className="array-index">[{index}]</div>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(index)}
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
