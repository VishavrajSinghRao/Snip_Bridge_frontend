// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend
// } from "recharts";
// import "./ResultChart.css";

// const ResultChart = ({ data }) => {
//   if (!data || data.length === 0) {
//     return <p className="chart-empty">No data available for chart</p>;
//   }

//   const keys = Object.keys(data[0]);
//   const numericKeys = keys.filter((k) => typeof data[0][k] === "number");
//   const [xKey, setXKey] = useState(keys[0]);
//   const [yKey, setYKey] = useState(
//     numericKeys.find((k) => k.toLowerCase() !== "id") || numericKeys[0]
//   );

//   return (
//     <div className="chart-wrapper">
//       <h3 className="chart-title">Data Visualization</h3>

//       <div className="chart-selectors">
//         <label>
//           X-Axis:
//           <select value={xKey} onChange={(e) => setXKey(e.target.value)}>
//             {keys.map((k) => (
//               <option key={k} value={k}>
//                 {k}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Y-Axis:
//           <select value={yKey} onChange={(e) => setYKey(e.target.value)}>
//             {numericKeys.map((k) => (
//               <option key={k} value={k}>
//                 {k}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>

//       <ResponsiveContainer width="100%" height={180}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={xKey} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey={yKey} fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ResultChart;


import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "./ResultChart.css";

const ResultChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="chart-empty">No data available for chart</p>;
  }

  const keys = Object.keys(data[0]);

  const numericKeys = keys.filter((k) => {
  const value = data[0][k];
  const convertedValue = Number(value); 
  return !isNaN(convertedValue);
});

  console.log(numericKeys.length)

  const [xKey, setXKey] = useState(keys[0]);

  const [yKey, setYKey] = useState(
    numericKeys.length > 0 ? numericKeys.find((k) => k.toLowerCase() !== "id") || numericKeys[0] : ""
  );

  useEffect(() => {
    if (yKey && !numericKeys.includes(yKey)) {
      setYKey(numericKeys.length > 0 ? numericKeys[0] : ""); 
    }
  }, [yKey, numericKeys]);

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">Data Visualization</h3>

      <div className="chart-selectors">
        <label>
          X-Axis:
          <select value={xKey} onChange={(e) => setXKey(e.target.value)}>
            {keys.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>

        <label>
          Y-Axis:
          <select value={yKey} onChange={(e) => setYKey(e.target.value)}>
            {numericKeys.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;
