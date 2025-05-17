import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout'; // Adjust path
import './BrandKits.css';
import CreateBrandKitModal from './CreateBrandKitModal';

const initialKits = [
  { name: 'Dove', assets: 2 },
  { name: 'Coca Cola', assets: 0 },
  { name: 'Nestle', assets: 5 },
];

const BrandKits = () => {
  const [kits, setKits] = useState(initialKits);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateKit = (name) => {
    setKits(prev => [...prev, { name, assets: 0 }]);
  };

  return (
    <DashboardLayout>
      <div className="brandkits-container">
        <div className="brandkits-header">
          <h1>Brand Kits</h1>
          <button className="create-btn" onClick={() => setIsModalOpen(true)}>+ Create New</button>
        </div>

        <h2 className="kits-title">Kits</h2>

        <div className="kits-grid">
          {kits.map((kit, index) => (
            <div key={index} className="kit-card">
              <div className="kit-thumbnail"></div>
              <div className="kit-info">
                <strong>{kit.name}</strong>
                <p>{kit.assets === 0 ? 'No assets' : `${kit.assets} assets`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CreateBrandKitModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateKit}
        />
      )}
    </DashboardLayout>
  );
};

export default BrandKits;
