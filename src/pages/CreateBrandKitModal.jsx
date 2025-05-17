// components/CreateBrandKitModal.jsx
import React, { useState } from 'react';
import './CreateBrandKitModal.css';

const CreateBrandKitModal = ({ onClose, onCreate }) => {
  const [kitName, setKitName] = useState('');

  const handleSubmit = () => {
    if (kitName.trim()) {
      onCreate(kitName.trim());
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Brand Kit</h2>
        <input
          type="text"
          placeholder="Enter brand kit name"
          value={kitName}
          onChange={(e) => setKitName(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button onClick={onClose} className="modal-btn cancel">Cancel</button>
          <button onClick={handleSubmit} className="modal-btn create">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBrandKitModal;
