// Manual.jsx
import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Home,
  Database,
  Search,
  Users,
  Settings,
  BarChart3,
  Play,
  Shield,
  HelpCircle
} from 'lucide-react';
import './Manual.css';

const Manual = () => {
  const [expandedSections, setExpandedSections] = useState({
    'getting-started': true
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const manualSections = [
    // ... your existing sections (unchanged) ...

 {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen size={20} />,
      content: [
        {
          title: 'Overview',
          content: 'The Survey API Gateway is a comprehensive platform developed by the Ministry of Statistics and Programme Implementation (MoSPI) for accessing and analyzing survey data through a unified interface.'
        },
        {
          title: 'Login Process',
          content: `
            <strong>Admin Login:</strong>
            <ul>
              <li>Email: admin@gmail.com</li>
              <li>Password: 1234</li>
              <li>Access: Full system access including user management</li>
            </ul>
            <strong>User Login:</strong>
            <ul>
              <li>Any other credentials will log you in as a regular user</li>
              <li>Access: Limited to dashboard, query, datasets, and settings</li>
            </ul>
          `
        },
        {
          title: 'User Roles',
          content: `
            <strong>Administrator:</strong> Full access to all features including user management, system statistics, and administrative controls.
            <br><br>
            <strong>Regular User:</strong> Access to data querying, dataset exploration, and personal settings.
          `
        }
      ]
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <Home size={20} />,
      content: [
        {
          title: 'Overview',
          content: 'The dashboard provides a comprehensive view of system statistics and recent activities. It displays key metrics and system health indicators.'
        },
        {
          title: 'Key Metrics',
          content: `
            <ul>
              <li><strong>Total Queries:</strong> Shows the cumulative number of queries executed (Currently: 125,670)</li>
              <li><strong>Active Datasets:</strong> Number of datasets available for querying (Currently: 24)</li>
              <li><strong>Total Users:</strong> Registered users in the system (Currently: 342)</li>
              <li><strong>System Uptime:</strong> System availability percentage (Currently: 99.8%)</li>
            </ul>
          `
        },
        {
          title: 'API Usage Charts (Admin Only)',
          content: 'Administrators can view monthly API usage trends including query volumes and user activity patterns. The charts display data for the past 6 months with interactive visualizations.'
        },
        {
          title: 'Recent Queries',
          content: 'View the latest queries executed in the system, including query text, target dataset, timestamp, and result count.'
        }
      ]
    },
    {
      id: 'query-explorer',
      title: 'Query & Dataset Explorer',
      icon: <Search size={20} />,
      content: [
        {
          title: 'Query Interface',
          content: 'The query interface allows users to write and execute SQL queries against available datasets. It provides a code editor with syntax highlighting and auto-completion.'
        },
        {
          title: 'Dataset Selection',
          content: `
            <ul>
              <li>Choose from available datasets in the dropdown menu</li>
              <li>Common datasets include:
                <ul>
                  <li>PLFS (Periodic Labour Force Survey) 2023-24</li>
                  <li>NSS Consumer Expenditure Survey</li>
                  <li>Other MoSPI survey data</li>
                </ul>
              </li>
            </ul>
          `
        },
        {
          title: 'Query Execution',
          content: `
            <strong>Steps to execute a query:</strong>
            <ol>
              <li>Select a dataset from the dropdown</li>
              <li>Write your SQL query in the editor</li>
              <li>Click the "Execute Query" button</li>
              <li>Wait for results to load (typically 2-3 seconds)</li>
              <li>View results in the results panel</li>
            </ol>
          `
        },
        {
          title: 'Query Examples',
          content: `
            <code>SELECT * FROM plfs WHERE employment_status = 'employed';</code>
            <br><br>
            <code>SELECT state, COUNT(*) FROM consumer_expenditure GROUP BY state;</code>
          `
        },
        {
          title: 'Query History',
          content: 'View your previously executed queries with timestamps, datasets used, and result counts. Click on any historical query to re-run it.'
        }
      ]
    },
    {
      id: 'datasets',
      title: 'Datasets Management',
      icon: <Database size={20} />,
      content: [
        {
          title: 'Available Datasets',
          content: 'Browse and explore all available datasets in the system. Each dataset card shows metadata, schema information, and access permissions.'
        },
        {
          title: 'Dataset Information',
          content: `
            For each dataset, you can view:
            <ul>
              <li>Dataset name and description</li>
              <li>Last updated timestamp</li>
              <li>Number of records</li>
              <li>Data schema and column definitions</li>
              <li>Access permissions and restrictions</li>
            </ul>
          `
        },
        {
          title: 'Data Sources',
          content: 'Datasets are sourced from various MoSPI surveys and statistical collections, ensuring data quality and authenticity.'
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management (Admin Only)',
      icon: <Users size={20} />,
      content: [
        {
          title: 'User Overview',
          content: 'Administrators can view and manage all system users, including their roles, permissions, and activity status.'
        },
        {
          title: 'User Information',
          content: `
            The user table displays:
            <ul>
              <li><strong>Name:</strong> User's full name</li>
              <li><strong>Email:</strong> Contact email address</li>
              <li><strong>Role:</strong> User role (Admin, Analyst, etc.)</li>
              <li><strong>Last Login:</strong> Most recent login timestamp</li>
              <li><strong>Status:</strong> Active/Inactive status indicator</li>
            </ul>
          `
        },
        {
          title: 'User Roles',
          content: `
            <strong>Available Roles:</strong>
            <ul>
              <li><strong>Admin:</strong> Full system access</li>
              <li><strong>Analyst:</strong> Data analysis and querying</li>
              <li><strong>Viewer:</strong> Read-only access to datasets</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={20} />,
      content: [
        {
          title: 'Personal Settings',
          content: 'Manage your personal account settings, preferences, and profile information.'
        },
        {
          title: 'System Configuration (Admin)',
          content: 'Administrators can configure system-wide settings, API limits, and security parameters.'
        },
        {
          title: 'API Configuration',
          content: 'Configure API endpoints, rate limits, and authentication settings for external integrations.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Permissions',
      icon: <Shield size={20} />,
      content: [
        {
          title: 'Data Security',
          content: 'All data is secured using industry-standard encryption and access controls. User permissions are strictly enforced based on roles.'
        },
        {
          title: 'Query Restrictions',
          content: 'Certain queries may be restricted based on data sensitivity and user permissions. Contact administrators for access to restricted datasets.'
        },
        {
          title: 'Audit Trail',
          content: 'All user activities are logged for security and compliance purposes. Query history is maintained for transparency and accountability.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <HelpCircle size={20} />,
      content: [
        {
          title: 'Common Issues',
          content: `
            <strong>Query Execution Fails:</strong>
            <ul>
              <li>Check your SQL syntax</li>
              <li>Ensure you have selected a valid dataset</li>
              <li>Verify your permissions for the selected dataset</li>
            </ul>
            <strong>Login Problems:</strong>
            <ul>
              <li>Verify your credentials</li>
              <li>Clear browser cache and cookies</li>
              <li>Contact system administrator if issues persist</li>
            </ul>
          `
        },
        {
          title: 'Performance Tips',
          content: `
            <ul>
              <li>Use specific WHERE clauses to limit result sets</li>
              <li>Avoid SELECT * queries on large datasets</li>
              <li>Use appropriate indexes for better performance</li>
              <li>Consider using LIMIT clauses for exploratory queries</li>
            </ul>
          `
        },
        {
          title: 'Contact Support',
          content: 'For technical support or data access requests, contact the MoSPI IT Support team at support@mospi.gov.in'
        }
      ]
    },

    {
      id: 'video-tutorial',
      title: 'Video Tutorial',
      icon: <Play size={20} />,
      content: [
        {
          title: 'Watch the Overview Video',
          content: `
            <p>Here is a step-by-step walkthrough of how to use the Survey API Gateway platform.</p>
           <div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/718yxpT-eTM?si=fIbVXdPFGAbZP28j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

          `
        }
      ]
    }
  ];

  return (
    <div className="manual-container">
      <div className="manual-header">
        <BookOpen size={32} />
        <div>
          <h1>Survey API Gateway Manual</h1>
          <p>Complete guide to using the MoSPI Survey API Gateway platform</p>
        </div>
      </div>

      <div className="manual-content">
        {manualSections.map((section) => (
          <div key={section.id} className="manual-section">
            <div
              className="section-header"
              onClick={() => toggleSection(section.id)}
            >
              <div className="section-title">
                {section.icon}
                <h2>{section.title}</h2>
              </div>
              {expandedSections[section.id] ?
                <ChevronDown size={20} /> :
                <ChevronRight size={20} />
              }
            </div>

            {expandedSections[section.id] && (
              <div className="section-content">
                {section.content.map((item, index) => (
                  <div key={index} className="content-item">
                    <h3>{item.title}</h3>
                    <div
                      className="content-text"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="manual-footer">
        <p>© 2024 Ministry of Statistics and Programme Implementation, Government of India</p>
        <p>For technical support, contact: <a href="mailto:support@mospi.gov.in">support@mospi.gov.in</a></p>
      </div>
    </div>
  );
};

export default Manual;