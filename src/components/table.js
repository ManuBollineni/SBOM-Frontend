import React from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
  rows: {
    style: {
      minHeight: '52px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '12px',
      paddingRight: '12px',
      backgroundColor: '#f3f4f6',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
};

const Datatable = ({ title, columns, data }) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data || []}
      pagination
      highlightOnHover
      striped
      customStyles={customStyles}
      noDataComponent = {<div style={{ padding: '1rem', color: '#6b7280' }}>No SBOM components found.</div>}
    />
  );
};

export default Datatable;
