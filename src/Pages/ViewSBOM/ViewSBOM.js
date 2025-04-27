import React from "react";
import { useState, useEffect } from "react";
import Datatable from "../../components/table";
import SBOMModal from "../../components/model";
import SBOMForm from "../AddSBOM/AddSBOM";
import api from '../../utils/api';
import SearchComponent  from "../../components/search";
import './ViewSBOM.css';

const ViewSBOM = ( ) =>{
const [isModalOpen, setIsModalOpen] = useState(false);
// const [formData, setFormData] = useState();
const [componentList, setComponentList] = useState([]);
const [filteredList, setFilteredList] = useState([]);
const [searchQuery, setSearchQuery] = useState('');

 const [formData, setFormData] = useState({
    name: '',
    version: '',
    license: '',
    supplier: '',
    isVulnerable: false,
  });
  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
        const response = await api.get('/getAllComponents'); // Adjust endpoint if needed
        console.log("Fetched applications:", response.data);
        setComponentList(response.data);
    } catch (error) {
        console.error("Error fetching applications", error);
    }
  }; 

 // Search functionality
  useEffect(() => {
    const results = componentList.filter(component =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredList(results.length > 0 || searchQuery ? results : componentList);
  }, [searchQuery, componentList]);
  
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const columns = [
    {
      name: 'Component',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Version',
      selector: row => row.version,
      sortable: true,
    },
    {
      name: 'License',
      selector: row => row.license,
    },
    {
      name: 'Supplier',
      selector: row => row.supplier,
    },
    {
      name: 'Vulnerable',
      selector: row => (row.isVulnerable ? 'Yes' : 'No'),
    },
  ];

  const addComponent = () => {
    setIsModalOpen(true);
    console.log('This is form data', formData);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/addComponent', formData);
      console.log("this is form data", formData);
      setFormData({
        name: '',
        version: '',
        license: '',
        supplier: '',
        isVulnerable: false,
      });
      setIsModalOpen(false);
      fetchComponents();
      return response.data;
    }
    catch (error) {
      console.log("error in form data", error);
      throw error;
    }
  }
  
  return (
    <div className="sbom-container">
      <div className="sbom-card">
        {/* Optional: Title */}
        <h2 className="sbom-title">Component List</h2>

        <div className="sbom-header">
          <SearchComponent onSearch={handleSearch} />
          <button className="btn-addSBOM" onClick={addComponent}>+ Add Component</button>
        </div>

        <div className="sbom-table">
          <Datatable columns={columns} data={filteredList} />
        </div>
      </div>

      <SBOMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SBOMForm 
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </SBOMModal>
    </div>
  );
}


export default ViewSBOM;