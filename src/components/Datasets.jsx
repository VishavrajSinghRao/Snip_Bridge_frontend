import './Datasets.css'

// Updated Datasets Component
const Datasets = () => {
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
      name: "Comprehensive Modular Survey (CMS) Dataset",
      description: " The objective of the Comprehensive Modular Survey (CMS) on telecom is to collect and provide information on telecom-related indicators and ICT skills to address the requirements of DoT, MeitY etc.",
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
      status: "UpCmoing"
    },
    {
      id: 4,
      name: "Housing & Amenities Survey",
      description: "Survey data on housing conditions, amenities, and infrastructure in urban and rural households.",
      lastUpdated: "2023-11-28",
      size: "1.2 GB",
      records: "67,230",
      category: "Housing",
      status: "updating"
    },
    {
      id: 5,
      name: "Agricultural Statistics",
      description: "Comprehensive agricultural data including crop production, area coverage, and yield statistics.",
      lastUpdated: "2024-01-08",
      size: "950 MB",
      records: "45,680",
      category: "Agriculture",
      status: "UpCmoing"
    },
    {
      id: 6,
      name: "Education & Literacy Survey",
      description: "Educational statistics covering literacy rates, school enrollment, and educational infrastructure.",
      lastUpdated: "2023-12-15",
      size: "750 MB",
      records: "38,920",
      category: "Education",
      status: "UpCmoing"
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
      {/* <h2 className="page-title" >Datasets</h2> */}
      <h2 className="datasets-title" >Datasets</h2>

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

      {/* New Section - Some Info of Datasets */}
      <div className="datasets-info-section">
        <h3>SOME REQUIRED INFORMATION OF DATASETS            [MUST READ]</h3>

        {/* PLFS Info */}
        <h4 className="dataset-info-heading">Periodic Labour Force Survey (PLFS) Dataset</h4>
        <div className="info-card">
          <div className="scrollable-info">
            <p><strong>Survey ID number:</strong> DDI-IND-CSO-PLFS-2019-20</p>
            <p><strong>Title:</strong> Periodic Labour Force Survey (PLFS), July 2019-June 2020</p>
            <p><strong>Country Name:</strong> INDIA</p>
            <p><strong>Abstract:</strong> The objective of PLFS is primarily on two aspects. The first is to measure the dynamics in labour force participation and employment status in the short time interval of three months for the urban areas only in the Current Weekly Status (CWS). Thus, in every quarter, PLFS will bring out the level and change estimates of the key labour force indicators in CWS viz. Worker Population Ratio (WPR), Labour Force Participation Rate (LFPR), Unemployment Rate (UR). Secondly, for both rural and urban areas, level estimates of all important parameters in both usual status and CWS will be brought out annually.</p>
          </div>
        </div>

        {/* CMS Info */}
        <h4 className="dataset-info-heading">Comprehensive Modular Survey (CMS) Dataset</h4>
        <div className="info-card">
          <div className="scrollable-info">
            <p><strong>Survey ID number:</strong> DDI-IND-MOSPI-NSS-CMST80-2025</p>
            <p><strong>Title:</strong> Comprehensive Modular Survey on Telecom-NSS 80th Round-2025</p>
            <p><strong>Country Name:</strong> INDIA</p>
            <p><strong>Abstract:</strong> The objective of the Comprehensive Modular Survey (CMS) on telecom is to collect and provide information on telecom-related indicators and ICT skills to address the requirements of DoT, MeitY etc. This survey is designed to fill existing data gaps that cannot be met by other sources, such as administrative records, other surveys etc. The collected data will also be used for reporting of global indices by line ministries/ departments. The survey on CMS: Telecom will be conducted in the first quarter (i.e., January 2025 - March 2025) of the calendar year 2025.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datasets;

