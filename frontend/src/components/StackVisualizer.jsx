import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import TimeComplexity from './TimeComplexity';
import './StackVisualizer.css';
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/stack`;

export default function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  // toast is imported directly from react-hot-toast

  useEffect(() => {
    fetchStack();
  }, []);

  const fetchStack = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.data.error) {
        showError(response.data.error);
        return;
      }
      setStack(response.data.data);
      setOperation(response.data);
    } catch (error) {
      showError('Failed to fetch stack');
    }
  };

  const handlePush = async () => {
    if (!inputValue.trim()) {
      showError('Please enter a value');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/push?value=${inputValue}`);
      if (response.data.error) {
        showError(response.data.error);
        return;
      }
      setStack(response.data.data);
      setOperation(response.data);
      showSuccess(`Pushed ${inputValue}`);
    } catch (error) {
      showError('Failed to push value');
    }
  };

  const handlePop = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/pop`);
      if (response.data.error) {
        showError(response.data.error);
        return;
      }
      setStack(response.data.data);
      setOperation(response.data);
      showSuccess(`Popped value: ${response.data.result}`);
    } catch (error) {
      showError('Failed to pop value');
    }
  };

  const handleSearch = async () => {
    try {
      if (!inputValue) {
        showError('Please enter a value to search');
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/search/${inputValue}`);
      if (response.data.error) {
        showError(response.data.error);
        return;
      }
      setStack(response.data.data);
      setOperation(response.data);
      const index = response.data.result;
      if (index !== -1) {
        showSuccess(`Found ${inputValue} at position ${index} from the top`);
      } else {
        showError(`Value ${inputValue} not found in the stack`);
      }
    } catch (error) {
      showError('Failed to search value');
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset`);
      if (response.data.error) {
        showError(response.data.error);
        return;
      }
      setStack(response.data.data);
      setOperation(response.data);
      showSuccess('Stack reset successfully');
    } catch (error) {
      showError('Failed to reset stack');
    }
  };

  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  return (
    <div className="stack-container">
      <h1 className="title">Stack Visualizer</h1>
      
      <div className="controls">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          type="number"
          className="input"
        />
        <button className="button push" onClick={handlePush}>Push</button>
        <button className="button pop" onClick={handlePop}>Pop</button>
        <button onClick={handleSearch} className="operation-button">Search</button>
        <button onClick={handleReset} className="operation-button">Reset</button>
      </div>

      <div className="stack-visualization">
        <div className="stack-view">
          <span className="stack-label">Stack Contents</span>
          <div className="stack-items">
            {stack.length === 0 ? (
              <p className="empty-message">Stack is empty</p>
            ) : (
              stack.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="stack-item"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
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
