import './App.css';
import Map from './components/Map';
import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';

function App() {
  const [provinceReport, setProvinceReport] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);
  const [displayModal, setDisplayModal] = useState('none')
  const [graphInfo, setGraphInfo] = useState([]);

  const API = 'https://disease.sh/v3/covid-19/historical/can';


  const getYesterdaysDate = () => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let dd = String(yesterday.getDate());
    let mm = String(yesterday.getMonth() + 1);
    let yy = yesterday.getFullYear().toString().substr(-2)
    return `${mm}/${dd}/${yy}`;
  }

  const getYesterdaysDateString = () => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString();
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
      'british%20columbia', 'alberta', 'saskatchewan', 'manitoba', 'ontario',
      'quebec', 'newfoundland%20and%20labrador', 'new%20brunswick', 'prince%20edward%20island',
      'nova%20scotia', 'yukon', 'northwest%20territories', 'nunavut'
    ];

    let last90Days = [];

    for (const province of PROVINCE_CODE) {
      last90Days.push(fetch(`${API}/${province}?lastdays=90`));
    }

    Promise.all(last90Days).then(results =>
      results.forEach(result => result.json().then(data => {
        console.log(data);
        setProvinceReport(provinceReport => [...provinceReport, data])
      }))
    );
  }, []);

  useEffect(() => {
    if (provinceReport.length === 13) {
      for (let i = 0; i < provinceReport.length; i++) {
        let province = provinceReport[i];
        console.log(province)
        let data = province.timeline;
        let newData = [];
        let dates = Object.keys(data.cases);
        for (let j = 0; j < dates.length; j++) {

          let newEntry = {
            'province': province.province,
            'date': dates[j],
            'cases': data.cases[dates[j]],
            'deaths': data.deaths[dates[j]],
            'recovered': data.recovered[dates[j]]
          };
          newData.push(newEntry);
        }
        setGraphInfo(graphInfo => [...graphInfo, newData]);
      }
    }
  }, [provinceReport])

  return (
    <div id="app-container">
      <Modal
        modalInfo={modalInfo}
        setDisplayModal={setDisplayModal}
        displayModal={displayModal}
        getProvince={getProvince}
        graphInfo={graphInfo}
        yeterdaysDate={getYesterdaysDate()}
        yesterdaysDateText={getYesterdaysDateString()}
      />
      <h1 id="app-title">Canada Daily Covid-19 Tracker</h1>
      <Map getProvince={getProvince} />
    </div>
  );
}

export default App;
