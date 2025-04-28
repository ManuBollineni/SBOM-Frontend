import React from "react";
import { useState, useEffect } from "react";
import Datatable from "../../components/table";
import SBOMModal from "../../components/model";
import AddApplicationForm from "../AddApplication/AddApplication";
import SearchComponent  from "../../components/search";
import { showSuccessToast, showErrorToast } from "../../utils/Toast/Toast";
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../utils/api'
import './ViewApplication.css';


const ViewApplication = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [applicationList, setApplicationList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        operatingSystem: 'iOS',
        binaryType: 'mobile',
        supplier: '',
        manufacturer: '',
        sbom: '',
    });
    const [editingApplication, setEditingApplication] = useState(null);


    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/getAllApplication'); // Adjust endpoint if needed
            setApplicationList(response.data);
        } catch (error) {
            showErrorToast("Error fetching applications");
            console.error("Error fetching applications", error);
        }
    }; 

    // Search functionality
    useEffect(() => {
    const results = applicationList.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredList(results.length > 0 || searchQuery ? results : applicationList);
    }, [searchQuery, applicationList]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Category', selector: row => row.category, sortable: true },
        { name: 'Operating System', selector: row => row.operatingSystem },
        { name: 'Binary Type', selector: row => row.binaryType },
        { name: 'Supplier', selector: row => row.supplier },
        { name: 'Manufacturer', selector: row => row.manufacturer },
        { name: 'SBOM', selector: row => row.sbom },
        {
            name: 'Actions',
            cell: row => (
                <div className="action-icons">
                    <FaEdit
                        className="edit-icon"
                        onClick={() => handleEdit(row)}
                        title="Edit"
                    />
                    <FaTrash
                        className="delete-icon"
                        onClick={() => handleDelete(row)}
                        title="Delete"
                    />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleEdit = (app) => {
        setEditingApplication(app._id);
        setFormData({
            name: app.name,
            category: app.category,
            operatingSystem: app.operatingSystem,
            binaryType: app.binaryType,
            supplier: app.supplier,
            manufacturer: app.manufacturer,
            sbom: app.sbom,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (app) => {
        if (window.confirm(`Are you sure you want to delete "${app.name}"?`)) {
            try {
                await api.delete(`/deleteApplication/${app._id}`);
                showSuccessToast("Application deleted successfully!");
                fetchApplications();
            } catch (error) {
                showErrorToast("Error deleting application");
            }
        }
    };

    const addApplication = () => {
        setIsModalOpen(true);
        console.log('This is form data', formData);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingApplication) {
                // Editing existing
                await api.put(`/updateApplication/${editingApplication}`, formData);
                showSuccessToast("Application updated successfully!");
            } else {
                // Adding new
                const response = await api.post('/addApplication', formData);
                const applicationId = response.data.data._id;

                if (selectedComponents.length > 0) {
                    const componentData = {
                        application: applicationId,
                        components: selectedComponents.map((item) => item.data._id),
                    };
                    await saveSbomByAppIds(componentData);
                }
                showSuccessToast("Application added successfully!");
            }

            fetchApplications();
            setIsModalOpen(false);
            setSelectedComponents([]);
        } catch (error) {
            showErrorToast("Error saving application");
        }
    };

    const saveSbomByAppIds = async (componentData) => {
        try
        {
            const response = await api.post('/addSboms', componentData);
            console.log("Submitted form data", componentData);
            showSuccessToast('Added successfully!');
            return response.data;
        }
        catch(error)
        {
            showErrorToast("Error in saving SBOM by application ID");
            throw error;
        }
    }

    return (
        <div className="view-application-page">
    
            {/* 📦 Entire content inside ONE card */}
            <div className="cc-card">
                {/* Top part: Search + Add Button */}
                <div className="cc-addApplication">
                    <div className="search-component">
                        <SearchComponent onSearch={handleSearch} />
                    </div>
                    <button className="btn-addApplication" onClick={addApplication}>
                        + Add Application
                    </button>
                </div>
    
                {/* Table below */}
                <div className="data-table-container">
                    <Datatable columns={columns} data={filteredList} />
                </div>
            </div>
    
            {/* Modal */}
            <SBOMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddApplicationForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                    selectedComponents={selectedComponents}
                    setSelectedComponents={setSelectedComponents}
                />
            </SBOMModal>
    
        </div>
    );
};

export default ViewApplication;