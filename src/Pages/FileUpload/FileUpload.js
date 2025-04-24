import React, { useRef, useState } from 'react';
import api from '../../utils/api';
import './FileUpload.css';

const FileUpload = ({ onPackagesExtracted }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [packageList, setPackageList] = useState([]);

  const [appName, setAppName] = useState('');
  const [formData, setFormData] = useState({
          name: '',
          category: '',
          operatingSystem: 'iOS',
          binaryType: 'mobile',
          supplier: '',
          manufacturer: '',
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError('');
    setPackageList([]);

    if (!file) return;

    if (formData.name == '') {
        setError('Application name is required before uploading a file.');
        return;
      }

    const isValidType = file.name.endsWith('.json') || file.name.endsWith('.csv');
    if (!isValidType) {
      setError('Please upload only .json or .csv files.');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const json = JSON.parse(text);

        if (!json.dependencies && !json.devDependencies) {
          setError("This doesn't look like a valid package.json file.");
          return;
        }

        const packages = [
          ...Object.entries(json.dependencies || {}),
          ...Object.entries(json.devDependencies || {}),
        ].map(([name, version]) => ({ name, version }));

        setPackageList(packages);

        if (onPackagesExtracted && appName.trim()) {
          onPackagesExtracted({ appName, packages });
        }
      } catch (err) {
        setError('Invalid JSON format.');
      }
    };

    reader.readAsText(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    // validation
    if (!formData.name || packageList.length === 0) {
      setError('Application name and packages are required.');
      return;
    }
  
    try {
        console.log("Packages List", packageList);
        //create component list and save first then retrieve the response
        const {data} = await api.post('/addComponentByName', { packagesList: packageList });
        const componentResponseList = data.data;

        // with component response create application and components list in SBOM table -- already this call is there.
        const response = await api.post('/addApplication', formData);
        console.log("Submitted form data", formData);
        const applicationId = response.data.data._id;

        // If there are selected components, insert them into the components table with application ID
        if (componentResponseList.length > 0) {
            const componentData = {
                application: applicationId,
                components: componentResponseList.map((item)=> item._id), // Convert array to comma-separated string
            };
            console.log("Inserted components:", componentData);

            await saveSbomByAppIds(componentData);
        }
  
      //if (!response.ok) throw new Error('Failed to save SBOM');
      
      alert('SBOM saved successfully!');
  
      // Optionally reset form
      setFormData({
        name: '',
        category: '',
        operatingSystem: 'iOS',
        binaryType: 'mobile',
        supplier: '',
        manufacturer: '',
        sbom: '',
      });
      setPackageList([]);
      setFileName('');
      setError('');
  
    } catch (error) {
      console.error('Save error:', error);
      setError('Failed to save SBOM. Please try again.');
    }
  };
  
  const saveSbomByAppIds = async (componentData) => {
        try
        {
            const response = await api.post('/addSboms', componentData);
            console.log("Submitted form data", componentData);
            return response.data;
        }
        catch(error)
        {
            console.error("Error in saving SBOM by application ID", error);
            throw error;
        }
   }
  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload package.json or CSV File</h2>

      {/* <label className="input-label">
        Application Name: 
      </label>
      <input
        type="text"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
        placeholder="Enter application name"
        className={`app-name-input ${error.includes('Application name') ? 'error' : ''}`}
      /> */}
        <div>
            <form onSubmit={onSubmit} className="application-form">
                <div>
                    <label>Application Name:</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
        
                <div>
                    <label>Category:</label>
                    <input name="category" value={formData.category} onChange={handleChange} />
                </div>
        
                <div>
                    <label>Operating System:</label>
                    <select name="operatingSystem" value={formData.operatingSystem} onChange={handleChange}>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                    <option value="Mac OS">Mac OS</option>
                    <option value="Windows OS">Windows OS</option>
                    <option value="Linux OS">Linux OS</option>
                    </select>
                </div>
        
                <div>
                    <label>Binary Type:</label>
                    <select name="binaryType" value={formData.binaryType} onChange={handleChange}>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                    </select>
                </div>
        
                <div>
                    <label>Supplier:</label>
                    <input name="supplier" value={formData.supplier} onChange={handleChange} />
                </div>
        
                <div>
                    <label>Manufacturer:</label>
                    <input name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
                </div>
        
                <div>
                    <label>SBOM ID:</label>
                    <input name="sbom" value={formData.sbom} onChange={handleChange} />
                </div>
            </form>
        </div>

        <div className="file-upload-box" onClick={() => fileInputRef.current.click()}>
            <input
                type="file"
                accept=".json,.csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="upload-input"
            />

            <div className="file-upload-content">
                <button
                className="upload-button"
                type="button"
                >
                Select File
                </button>

                {fileName && <p className="file-name">📄 <strong>{fileName}</strong></p>}
                {error && <p className="file-error">{error}</p>}
            </div>

            {packageList.length > 0 && (
                <div className="table-wrapper">
                <h3 className="package-table-title">
                    Extracted Packages for "{appName}":
                </h3>
                <table className="package-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Package Name</th>
                        <th>Version</th>
                    </tr>
                    </thead>
                    <tbody>
                    {packageList.map((pkg, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{pkg.name}</td>
                        <td>{pkg.version}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
            </div>

        <div className="table-actions">
            <button className="btn-cancel" onClick={() => {
                setPackageList([]);
                setFileName('');
                setError('');
                setAppName('');
            }}> Cancel </button>

            <button className="btn-save" onClick={onSubmit}> Save </button>
        </div>
    </div>
  );
};

export default FileUpload;
