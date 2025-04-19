import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TimeComplexity from './TimeComplexity';
import './SetVisualizer.css';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/set`;

export default function SetVisualizer() {
  const [set, setSet] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);

  const fetchSet = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setSet(response.data.data);
      setOperation(response.data);
    } catch (error) {
      toast.error('Failed to fetch set');
    }
  };

  useEffect(() => {
    fetchSet();
  }, []);

  const handleAdd = async () => {
    if (!inputValue) {
      toast.error('Please enter a value');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/add`, null, {
        params: { value: inputValue }
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setSet(response.data.data);
        setOperation(response.data);
        toast.success(`Added ${inputValue} to set`);
        setInputValue('');
      }
    } catch (error) {
      toast.error('Failed to add value');
    }
  };

  const handleRemove = async (value) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${value}`);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setSet(response.data.data);
        setOperation(response.data);
        toast.success(`Removed ${value} from set`);
      }
    } catch (error) {
      toast.error('Failed to remove value');
    }
  };

  const handleContains = async () => {
    if (!inputValue) {
      toast.error('Please enter a value to search');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/contains/${inputValue}`);
      setOperation(response.data);
      const exists = response.data.result;
      toast.success(exists ? 
        `${inputValue} exists in the set` : 
        `${inputValue} does not exist in the set`
      );
    } catch (error) {
      toast.error('Failed to check value');
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset`);
      setSet(response.data.data);
      setOperation(response.data);
      toast.success('Set reset successfully');
    } catch (error) {
      toast.error('Failed to reset set');
    }
  };

  return (
    <div className="set-container">
      <div className="set-controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
          className="input"
        />
        <button className="button add" onClick={handleAdd}>Add</button>
        <button className="button contains" onClick={handleContains}>Contains</button>
        <button className="button reset" onClick={handleReset}>Reset</button>
      </div>

      <div className="set-visualization">
        {set.length === 0 ? (
          <p className="empty-message">Set is empty</p>
        ) : (
          <div className="set-items">
            {set.map((value) => (
              <div key={value} className="set-item">
                {value}
                <button 
                  className="delete-button"
                  onClick={() => handleRemove(value)}
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
