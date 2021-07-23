import './App.css';
import Map from './components/Map';
import React, { useState, useEffect } from 'react';

function App() {
  const [provinceReport, setProvinceReport] = useState([]);
  const PROVINCE_CODE = [
    'BC', 'AB', 'SK', 'MB', 'ON',
    'QC', 'NL', 'NB', 'PE',
    'NS', 'YT', 'NT', 'NU'
  ];

  const API = 'http://api.covid19tracker.ca/reports/province';

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let fetchCalls = []

    for (const province of PROVINCE_CODE) {
      fetchCalls.push(fetch(`${API}/${province}?date=${yyyy}-${mm}-${dd}`));
    }

    Promise.all(fetchCalls).then(results =>
      results.forEach(result => result.json().then(data => {
        setProvinceReport(provinceReport => [...provinceReport, data])
      }))
    )

  }, []);

  return (
    <div id="app-container">
      <h1>Canada Daily Covid-19 Tracker</h1>
      <Map provinceReport={provinceReport} />
    </div>
  );
}

export default App;
