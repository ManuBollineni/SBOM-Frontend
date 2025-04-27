// CompareSBOM.js
import React, { useState, useEffect } from 'react';
import api from '../../utils/api'
import './CompareSBOM.css';

const CompareSBOM = () => {
  const [sbomA, setSbomA] = useState('');
  const [sbomB, setSbomB] = useState('');
  const [sbomOptions, setSbomOptions] = useState([]);
  const [componentListA, setComponentListA] = useState([]);
  const [componentListB, setComponentListB] = useState([]);


  useEffect(() => {
    fetchSbomApplications();
  }, []);

  const fetchSbomApplications = async () => {
    try {
      const response = await api.get('/getAllApplication'); // Adjust endpoint if needed
      console.log("Fetched Applications:", response.data);
      setSbomOptions(response.data);
    } catch (error) {
      console.error("Error fetching SBOM applications", error);
    }
  };

  const handleCompare = async () => {
    if (sbomA && sbomB) {
        try {
          const [responseA, responseB] = await Promise.all([
            api.get(`/getByApplicationId/${sbomA}`),
            api.get(`/getByApplicationId/${sbomB}`)
          ]);
    
          const componentsA = responseA.data;
          const componentsB = responseB.data;
    
          console.log('Components List for SBOM A:', componentsA);
          console.log('Components List for SBOM B:', componentsB);

          setComponentListA(componentsA.components);
          setComponentListB(componentsB.components);
          
    
          // Optionally set to state
          // setSbomAComponents(componentsA);
          // setSbomBComponents(componentsB);
    
        } catch (error) {
          console.error('Error during component fetch:', error);
        }
      } else {
        console.error('Please select both SBOMs before comparing.');
      }
  };

  const mergeComponentLists = () => {
    const allNames = new Set([
      ...componentListA.map(c => c.name),
      ...componentListB.map(c => c.name)
    ]);

    return Array.from(allNames).map(name => {
      const compA = componentListA.find(c => c.name === name);
      const compB = componentListB.find(c => c.name === name);

      const isSame = compA && compB && compA.version === compB.version && compA.license === compB.license && compA.supplier === compB.supplier;

      return {
        name,
        versionA: compA ? compA.version : 'Not Found',
        licenseA: compA ? compA.license : 'Not Found',
        supplierA: compA ? compA.supplier : 'Not Found',
        versionB: compB ? compB.version : 'Not Found',
        licenseB: compB ? compB.license : 'Not Found',
        supplierB: compB ? compB.supplier : 'Not Found',
        isSame
      };
    });
  };

  const comparisonData = mergeComponentLists();


  return (
    <div className="compare-container">
      <h2 className="compare-title">Compare SBOMs</h2>

      <div className="sbom-dropdown-section">
        <div className="sbom-select-wrapper">
          <label htmlFor="sbomA">Select SBOM A</label>
          <select id="sbomA" className="sbom-dropdown" value={sbomA} onChange={(e) => setSbomA(e.target.value)}>
            <option value="">-- Select Application --</option>
            {sbomOptions.map((option) => (
              <option key={option._id} value={option._id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="sbom-select-wrapper">
          <label htmlFor="sbomB">Select SBOM B</label>
          <select id="sbomB" className="sbom-dropdown" value={sbomB} onChange={(e) => setSbomB(e.target.value)}>
            <option value="">-- Select Application --</option>
            {sbomOptions.map((option) => (
              <option key={option._id} value={option._id}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-button-wrapper">
        <button className="compare-button" onClick={handleCompare}>
          Compare
        </button>
      </div>

      <div className="components-compare-table-section">
        <table className="components-compare-table">
          <thead>
            <tr>
              <th className="border-right">Component Name</th>
              <th>Version (SBOM A)</th>
              <th>License (SBOM A)</th>
              <th className="border-right">Supplier</th>
              <th>Version (SBOM B)</th>
              <th>License (SBOM B)</th>
              <th>Supplier (SBOM B)</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className={row.isSame ? 'same-version' : 'different-version'}>
                <td className="component-name border-right">{row.name}</td>
                <td>{row.versionA}</td>
                <td>{row.licenseA}</td>
                <td className="border-right">{row.supplierA}</td>
                <td>{row.versionB}</td>
                <td>{row.licenseB}</td>
                <td>{row.supplierB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CompareSBOM;
