import React from 'react';
import './AddSBOM.css';

const SBOMForm = ({ formData, setFormData, onSubmit }) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="sbom-form">
      <label>Component Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Version:</label>
      <input name="version" value={formData.version} onChange={handleChange} required />

      <label>License:</label>
      <input name="license" value={formData.license} onChange={handleChange} />

      <label>Supplier:</label>
      <input name="supplier" value={formData.supplier} onChange={handleChange} />

      <label className="checkbox-label">
        <input
          type="checkbox"
          name="isVulnerable"
          checked={formData.isVulnerable}
          onChange={handleChange}
        />
        Mark as Vulnerable
      </label>

      <button type="submit" className="submit-btn">Save</button>
    </form>
  );
};

export default SBOMForm;
