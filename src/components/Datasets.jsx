import './Datasets.css'

// Updated Datasets Component
const Datasets = () => {
  // Sample datasets data
  const datasetsData = [
    {
      id: 1,
      name: "Periodic Labour Force Survey (PLFS)",
      description: "Annual survey covering employment and unemployment statistics across urban and rural areas of India.",
      lastUpdated: "2024-01-15",
      size: "2.3 GB",
      records: "1,25,670",
      category: "Employment",
      status: "Active"
    },
    {
      id: 2,
      name: "NSS Consumer Expenditure Survey",
      description: "Comprehensive survey on household consumption patterns and expenditure across different income groups.",
      lastUpdated: "2023-12-20",
      size: "1.8 GB",
      records: "89,450",
      category: "Economics",
      status: "Active"
    },
    {
      id: 3,
      name: "Annual Survey of Industries (ASI)",
      description: "Industrial statistics covering organized manufacturing sector establishments across India.",
      lastUpdated: "2024-01-10",
      size: "3.1 GB",
      records: "2,15,890",
      category: "Industry",
      status: "Active"
    },
    {
      id: 4,
      name: "Housing & Amenities Survey",
      description: "Survey data on housing conditions, amenities, and infrastructure in urban and rural households.",
      lastUpdated: "2023-11-28",
      size: "1.2 GB",
      records: "67,230",
      category: "Housing",
      status: "Updating"
    },
    {
      id: 5,
      name: "Agricultural Statistics",
      description: "Comprehensive agricultural data including crop production, area coverage, and yield statistics.",
      lastUpdated: "2024-01-08",
      size: "950 MB",
      records: "45,680",
      category: "Agriculture",
      status: "Active"
    },
    {
      id: 6,
      name: "Education & Literacy Survey",
      description: "Educational statistics covering literacy rates, school enrollment, and educational infrastructure.",
      lastUpdated: "2023-12-15",
      size: "750 MB",
      records: "38,920",
      category: "Education",
      status: "Archive"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return '#28a745';
      case 'updating': return '#ffc107';
      case 'archive': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Datasets</h2>

      <div className="datasets-grid">
        {datasetsData.map((dataset) => (
          <div key={dataset.id} className="dataset-card">
            <div className="dataset-header">
              <h3 className="dataset-name">{dataset.name}</h3>
              <span
                className="dataset-status"
                style={{ backgroundColor: getStatusColor(dataset.status) }}
              >
                {dataset.status}
              </span>
            </div>

            <p className="dataset-description">{dataset.description}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Datasets;