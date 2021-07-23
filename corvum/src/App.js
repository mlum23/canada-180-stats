import './App.css';
import Map from './components/Map';
import React, { useState, useEffect } from 'react';

function App() {
  const [provinceReport, setProvinceReport] = useState([]);

  const API = 'http://api.covid19tracker.ca/reports/province';

  const getTodaysDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }



  useEffect(() => {
    const PROVINCE_CODE = [
      'BC', 'AB', 'SK', 'MB', 'ON',
      'QC', 'NL', 'NB', 'PE',
      'NS', 'YT', 'NT', 'NU'
    ];

    let fetchCalls = []

    for (const province of PROVINCE_CODE) {
      fetchCalls.push(fetch(`${API}/${province}?date=${getTodaysDate()}`));
    }

    Promise.all(fetchCalls).then(results =>
      results.forEach(result => result.json().then(data => {
        setProvinceReport(provinceReport => [...provinceReport, data])
      }))
    )

  }, []);

  return (
    <div id="app-container">
      <div id="modal">
        <div id="info">
          {/* <span class="close">&times;</span> */}
          <h2>{getTodaysDate()}</h2>
          <p><b>Active Cases: </b>total_case - total_fatalities - total_recoveries</p>
          <p><b>Total Cases: </b>total_case</p>
          <p><b>Deaths: </b>total_deaths</p>
          <p><b>Tests: </b>total_tests</p>
          <p><b>Hospitalization: </b>total_hospitalizations</p>
        </div>
      </div>
      <h1>Canada Daily Covid-19 Tracker</h1>
      <Map provinceReport={provinceReport} />
    </div>
  );
}

export default App;
