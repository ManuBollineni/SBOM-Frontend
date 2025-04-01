import React from "react";
import { useState, useEffect } from "react";
import Datatable from "../../components/table";
import SBOMModal from "../../components/model";
import AddApplicationForm from "../AddApplication/AddApplication";
import api from '../../utils/api'
import './ViewApplication.css';


const ViewApplication = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [applicationList, setApplicationList] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        operatingSystem: 'iOS',
        binaryType: 'mobile',
        supplier: '',
        manufacturer: '',
        sbom: '',
    });

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/getAllApplication'); // Adjust endpoint if needed
            console.log("Fetched applications:", response.data);
            setApplicationList(response.data);
        } catch (error) {
            console.error("Error fetching applications", error);
        }
    }; 

    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Category', selector: row => row.category, sortable: true },
        { name: 'Operating System', selector: row => row.operatingSystem },
        { name: 'Binary Type', selector: row => row.binaryType },
        { name: 'Supplier', selector: row => row.supplier },
        { name: 'Manufacturer', selector: row => row.manufacturer },
        { name: 'SBOM', selector: row => row.sbom },
    ];

    const addApplication = () => {
        setIsModalOpen(true);
        console.log('This is form data', formData);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/addApplication', formData);
            console.log("Submitted form data", formData);
            const applicationId = response.data.data._id;

            // If there are selected components, insert them into the components table with application ID
            if (selectedComponents.length > 0) {
                const componentData = {
                    application: applicationId,
                    components: selectedComponents.map((item)=> item.data._id), // Convert array to comma-separated string
                };
                console.log("Inserted components:", componentData);

                await saveSbomByAppIds(componentData);
            }

            setFormData({
                name: '',
                category: '',
                operatingSystem: 'iOS',
                binaryType: 'mobile',
                supplier: '',
                manufacturer: '',
                sbom: '',
            });
            setIsModalOpen(false);
            setSelectedComponents([]);
            fetchApplications();

            return response.data;
        } catch (error) {
            console.error("Error in form submission", error);
            throw error;
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
        <div>
            <div className="cc-addapplication">
                <button className="btn-addApplication" onClick={addApplication}>Add Application</button>
            </div>
            <div>
                <Datatable columns={columns} data={applicationList} />
            </div>

            <SBOMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {/* <p>Enter details for the new application.</p> */}
                <AddApplicationForm 
                 formData={formData} 
                 setFormData={setFormData}
                 onSubmit={onSubmit}
                 selectedComponents= {selectedComponents}
                 setSelectedComponents = {setSelectedComponents}  />
            </SBOMModal>
        </div>
    );
};

export default ViewApplication;