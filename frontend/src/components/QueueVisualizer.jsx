import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TimeComplexity from './TimeComplexity';
import './QueueVisualizer.css';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/queue`;

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);

  const fetchQueue = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setQueue(response.data.data);
      setOperation(response.data);
    } catch (error) {
      toast.error('Failed to fetch queue');
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleEnqueue = async () => {
    if (!inputValue) {
      toast.error('Please enter a value');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/enqueue`, null, {
        params: { value: inputValue }
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setQueue(response.data.data);
        setOperation(response.data);
        toast.success(`Enqueued ${inputValue}`);
        setInputValue('');
      }
    } catch (error) {
      toast.error('Failed to enqueue value');
    }
  };

  const handleDequeue = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/dequeue`);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setQueue(response.data.data);
        setOperation(response.data);
        toast.success(`Dequeued ${response.data.result}`);
      }
    } catch (error) {
      toast.error('Failed to dequeue');
    }
  };

  const handlePeek = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/peek`);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setOperation(response.data);
        toast.success(`Front element: ${response.data.result}`);
      }
    } catch (error) {
      toast.error('Failed to peek');
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset`);
      setQueue(response.data.data);
      setOperation(response.data);
      toast.success('Queue reset successfully');
    } catch (error) {
      toast.error('Failed to reset queue');
    }
  };

  return (
    <div className="queue-container">
      <div className="queue-controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
          className="input"
        />
        <button className="button enqueue" onClick={handleEnqueue}>Enqueue</button>
        <button className="button dequeue" onClick={handleDequeue}>Dequeue</button>
        <button className="button peek" onClick={handlePeek}>Peek</button>
        <button className="button reset" onClick={handleReset}>Reset</button>
      </div>

      <div className="queue-visualization">
        <div className="queue-labels">
          <span className="front-label">Front</span>
          <span className="back-label">Back</span>
        </div>
        {queue.length === 0 ? (
          <p className="empty-message">Queue is empty</p>
        ) : (
          <div className="queue-items">
            {queue.map((item, index) => (
              <div 
                key={`${item}-${index}`} 
                className={`queue-item ${index === 0 ? 'front' : ''} ${index === queue.length - 1 ? 'back' : ''}`}
              >
                {item}
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
