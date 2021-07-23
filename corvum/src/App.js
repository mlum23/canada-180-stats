import './App.css';
import Map from './components/Map';
import React, { useState, useEffect } from 'react';

function App() {
  const [provinceReport, setProvinceReport] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);
  const [displayModal, setDisplayModal] = useState('none');

  const API = 'http://api.covid19tracker.ca/reports/province';


  const getTodaysDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  const getProvince = (provinceName) => {
    for (const report of provinceReport) {
      if (report.province === provinceName) {
        console.log(report);
        setModalInfo(report);
        setDisplayModal("flex");
        break;
      }
    }
  }

  const getActiveCases = () => {
    if (modalInfo !== null) {
      return modalInfo.data[0].total_cases - modalInfo.data[0].total_fatalities - modalInfo.data[0].total_recoveries;
    }
  }

  const getCases = (caseName) => {
    if (modalInfo !== null) {
      return modalInfo.data[0][caseName];
    }
  }

  const getLastUpdated = () => {
    if (modalInfo !== null) {
      return modalInfo.last_updated;
    }
  }

  const onClickExitModal = () => {
    setDisplayModal("none");
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
      <div id="modal" style={{ display: displayModal }}>
        <div id="info">
          <span className="close" onClick={onClickExitModal}>&times;</span>
          <h2>Last Updated: {getLastUpdated()}</h2>
          <p><b>Active Cases: </b>{getActiveCases()}</p>
          <p><b>Total Cases: </b>{getCases('total_cases')}</p>
          <p><b>Deaths: </b>{getCases('total_fatalities')}</p>
          <p><b>Tests: </b>{getCases('total_tests')}</p>
          <p><b>Hospitalization: </b>{getCases('total_hospitalizations')}</p>
        </div>
      </div>
      <h1>Canada Daily Covid-19 Tracker</h1>
      <Map provinceReport={provinceReport} getProvince={getProvince} />
    </div>
  );
}

export default App;
