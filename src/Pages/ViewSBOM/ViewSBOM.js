import React from "react";
import { useState, useEffect } from "react";
import Datatable from "../../components/table";
import SBOMModal from "../../components/model";
import SBOMForm from "../AddSBOM/AddSBOM";
import api from '../../utils/api';
import SearchComponent  from "../../components/search";
import './ViewSBOM.css';
import { showSuccessToast, showErrorToast } from "../../utils/Toast/Toast";
import { FaEdit, FaTrash } from 'react-icons/fa';


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
      showErrorToast("Error fetching Components");
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
    {
      name: 'Actions',
      cell: row => (
        <div className="action-icons">
          <FaEdit
            className="edit-icon"
            onClick={() => handleEdit(row)}
          />
          <FaTrash
            className="delete-icon"
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    // Later you can open a modal with form pre-filled
    // Example: 
    setIsModalOpen(true);
    setFormData({
      name: row.name,
      version: row.version,
      license: row.license,
      supplier: row.supplier,
      isVulnerable: row.isVulnerable,
    });
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure you want to delete component ${row.name}?`)) {
        try {
            await api.delete(`/deleteComponent/${row._id}`);  // 👈 Adjust API if different
            console.log("Deleted component:", row.name);
            fetchComponents(); // refresh the list
        } catch (error) {
            console.error("Error deleting component:", error);
        }
    }
  };

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
      showSuccessToast('Component added successfully!');
      fetchComponents();
      return response.data;
    }
    catch (error) {
      showErrorToast("error in form data");
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
          <button className="btn-addSBOM" onClick={addComponent}> Add Component</button>
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