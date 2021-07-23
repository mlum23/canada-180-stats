import './App.css';
import Map from './components/Map';
import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';

function App() {
  const [provinceReport, setProvinceReport] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);
  const [displayModal, setDisplayModal] = useState('none')
  const [graphInfo, setGraphInfo] = useState([]);

  const API = 'http://api.covid19tracker.ca/reports/province';


  const getTodaysDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  const getDateLast30Day = () => {
    let date = new Date();
    date.setDate(date.getDate() - 29);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
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

  useEffect(() => {

  }, [displayModal])

  useEffect(() => {
    const PROVINCE_CODE = [
      'BC', 'AB', 'SK', 'MB', 'ON',
      'QC', 'NL', 'NB', 'PE',
      'NS', 'YT', 'NT', 'NU'
    ];

    let fetchCalls = []
    let last30Days = []

    for (const province of PROVINCE_CODE) {
      fetchCalls.push(fetch(`${API}/${province}?date=${getTodaysDate()}`));
      last30Days.push(fetch(`${API}/${province}?after=${getDateLast30Day()}`))
    }

    Promise.all(fetchCalls).then(results =>
      results.forEach(result => result.json().then(data => {
        setProvinceReport(provinceReport => [...provinceReport, data])
      }))
    )

    Promise.all(last30Days).then(results =>
      results.forEach(result => result.json().then(data => {
        setGraphInfo(graphInfo => [...graphInfo, data])
      }))
    )
  }, []);

  return (
    <div id="app-container">
      <Modal
        modalInfo={modalInfo}
        setDisplayModal={setDisplayModal}
        displayModal={displayModal}
        getProvince={getProvince}
        graphInfo={graphInfo}
      />
      <h1>Canada Daily Covid-19 Tracker</h1>
      <Map getProvince={getProvince} />
    </div>
  );
}

export default App;
