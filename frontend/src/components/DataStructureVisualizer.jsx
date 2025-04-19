import { useState } from 'react';
import StackVisualizer from './StackVisualizer';
import ArrayVisualizer from './ArrayVisualizer';
import QueueVisualizer from './QueueVisualizer';
import MapVisualizer from './MapVisualizer';
import SetVisualizer from './SetVisualizer';
import './DataStructureVisualizer.css';

const dataStructures = [
  { id: 'stack', name: 'Stack', description: 'LIFO (Last In, First Out) data structure' },
  { id: 'array', name: 'Array', description: 'Sequential collection of elements' },
  { id: 'queue', name: 'Queue', description: 'FIFO (First In, First Out) data structure' },
  { id: 'map', name: 'Map', description: 'Key-value pair collection' },
  { id: 'set', name: 'Set', description: 'Collection of unique elements' }
];

export default function DataStructureVisualizer() {
  const [activeDS, setActiveDS] = useState('stack');

  const renderVisualizer = () => {
    switch (activeDS) {
      case 'stack':
        return <StackVisualizer />;
      case 'array':
        return <ArrayVisualizer />;
      case 'queue':
        return <QueueVisualizer />;
      case 'map':
        return <MapVisualizer />;
      case 'set':
        return <SetVisualizer />;
      default:
        return <StackVisualizer />;
    }
  };

  return (
    <div className="ds-container">
      <div className="ds-header">
        <h1 className="ds-title">Data Structures Visualizer</h1>
        <div className="ds-tabs">
          {dataStructures.map(ds => (
            <button
              key={ds.id}
              className={`ds-tab ${activeDS === ds.id ? 'active' : ''}`}
              onClick={() => setActiveDS(ds.id)}
            >
              {ds.name}
            </button>
          ))}
        </div>
      </div>
      <div className="ds-content">
        {renderVisualizer()}
      </div>
    </div>
  );
}
