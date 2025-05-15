import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import api from '../../utils/api';
import './Stats.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/components/common');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p>Loading statistics...</p>;
  }

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${i * (360 / count)}, 70%, 60%)`);
    }
    return colors;
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('stats-dashboard');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth - 40, pdfHeight);
      pdf.save('SBOM_Statistics_Dashboard.pdf');
    });
  };

  // Prepare data dynamically
  const licenseLabels = Object.keys(stats.licenseCounts);
  const licenseData = Object.values(stats.licenseCounts);

  const supplierLabels = Object.keys(stats.supplierCounts);
  const supplierData = Object.values(stats.supplierCounts);

  const vulnerabilityLabels = ['Vulnerable', 'Safe'];
  const vulnerabilityData = [stats.vulnerableComponents, stats.safeComponents];

  return (
    <div className="statistics-page">
      <h2>📊 SBOM Statistics Dashboard</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button className="download-button" onClick={handleDownloadPDF}>Download PDF</button>
      </div>

      <div id="stats-dashboard" className="charts-grid">
        
        <div className="chart-card">
          <h3>License Distribution</h3>
          <Pie
            data={{
              labels: licenseLabels,
              datasets: [{
                data: licenseData,
                backgroundColor: generateColors(licenseLabels.length),
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } }
            }}
          />
        </div>

        <div className="chart-card">
          <h3>Top Suppliers</h3>
          <Bar
            data={{
              labels: supplierLabels,
              datasets: [{
                label: 'Number of Components',
                data: supplierData,
                backgroundColor: generateColors(supplierLabels.length),
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>

        <div className="chart-card">
          <h3>Vulnerability Status</h3>
          <Pie
            data={{
              labels: vulnerabilityLabels,
              datasets: [{
                data: vulnerabilityData,
                backgroundColor: ['#e53935', '#43a047'], // Red for vulnerable, Green for safe
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } }
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Statistics;
