import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select"; 
import Datatable from "../../components/table";
import api from '../../utils/api';
import { showErrorToast } from "../../utils/Toast/Toast";
import './AddApplication.css';


const AddApplicationForm = ({ formData, setFormData, onSubmit, selectedComponents, setSelectedComponents }) => {
    const [componentList, setComponentList] = useState([]);
    

    useEffect(()=>{
        fetchComponents();
    },[]);

    const fetchComponents = async () => {
        try {
            const response = await api.get('/getAllComponents');
            console.log("Fetched components:", response.data);
            setComponentList(response.data);
            return response.data; 
        } catch (error) {
            showErrorToast("Error fetching Components");
            console.error("Error fetching components", error);
            throw error;
        }
    };

    // Table columns (move this above where it's used)
    const columns = [
        { name: "Component", selector: (row) => row.name, sortable: true },
        { name: "Version", selector: (row) => row.version, sortable: true },
        { name: "License", selector: (row) => row.license },
        { name: "Supplier", selector: (row) => row.supplier },
        { name: "Vulnerable", selector: (row) => (row.isVulnerable ? "Yes" : "No") },
    ];

    // Handle dropdown selection
    const handleComponentChange = (selectedOptions) => {
        setSelectedComponents(selectedOptions || []);
    };

    // Convert component list to options for dropdown
    const componentOptions = componentList.map((component) => ({
        value: component.name,
        label: `${component.name} (v${component.version}) - ${component.license}`,
        data: component, // Store full component object
    }));

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    return (
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

                <div>
                    <label>Select Components:</label>
                    <Select
                    options={componentOptions}
                    isMulti
                    onChange={handleComponentChange}
                    placeholder="Search and select components..."
                    />
                
                    <div className="component-table">
                    {/* Table to Display Selected Components */}
                        {selectedComponents.length > 0 && (
                            <div>
                            <h3>Selected Components</h3>
                            <Datatable columns={columns} data={selectedComponents.map((item) => item.data)} />
                            </div>
                        )}
                    </div>
                </div>

                <button type="submit" className="submit-btn">Save</button>
            </form>

            
        </div>
    );
  };
  
  export default AddApplicationForm;


