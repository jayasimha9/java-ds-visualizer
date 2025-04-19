import './TimeComplexity.css';

export default function TimeComplexity({ operation, timeComplexity, description }) {
  return (
    <div className="complexity-panel">
      <div className="complexity-header">Operation Details</div>
      <div className="complexity-info">
        <span className="complexity-operation">{operation}</span>
        <span className="complexity-time">{timeComplexity}</span>
      </div>
      <p className="complexity-description">{description}</p>
    </div>
  );
}
