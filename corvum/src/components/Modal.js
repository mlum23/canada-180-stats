import Graph from './Graph';
import React, { useEffect, useState } from 'react';

const Modal = ({ modalInfo, displayModal, setDisplayModal, graphInfo }) => {
    let [dataKey, setDataKey] = useState('total_cases');
    let [graphTitle, setGraphTitle] = useState('Last 90 Days: Total Cases')
    let [compareProvince, setCompareProvince] = useState(null);

    const changeTitle = (event) => {
        let titles = {
            'total_cases': 'Total Cases',
            'total_fatalities': 'Total Fatalities',
            'total_hospitalizations': 'Total Hospitalizations',
            'total_vaccinated': 'Total Vaccinated',
            'total_recoveries': 'Total Recoveries',
            'total_tests': 'Total Tests',
            'total_vaccines_distributed': 'Total Vaccines Distributed'

        }
        setGraphTitle(`Last 90 Days: ${titles[event.target.value]}`);
        setDataKey(event.target.value);
    }

    const handleOnChangeCompare = (event) => {
        setCompareProvince(event.target.value);
    }

    const isValidModalInfo = () => {
        return modalInfo !== null;
    }

    const getActiveCases = () => {
        if (isValidModalInfo()) {
            return modalInfo.data[0].total_cases - modalInfo.data[0].total_fatalities - modalInfo.data[0].total_recoveries;
        }
    }

    const getCases = (caseName) => {
        if (isValidModalInfo()) {
            return modalInfo.data[0][caseName];
        }
    }

    const getModalInfo = (attr) => {
        if (isValidModalInfo()) {
            return modalInfo[attr];
        }
    }

    const onClickExitModal = () => {
        setDisplayModal("none");
    }

    const getProvinceFullName = () => {
        if (isValidModalInfo()) {
            let names = {
                'AB': 'Alberta',
                'BC': 'British Columbia',
                'SK': 'Saskatchewan',
                'MB': 'Manitoba',
                'ON': 'Ontario',
                'QC': 'Quebec',
                'NL': 'Newfoundland and Labrador',
                'NB': 'New Brunswick',
                'PE': 'Prince Edward Island',
                'NS': 'Nova Scotia',
                'YT': 'Yukon',
                'NT': 'Northwest Territories',
                'NU': 'Nunavut'
            };
            return names[modalInfo.province];
        }
    }

    useEffect(() => {

    }, [displayModal, graphInfo]);

    return (
        <div id="modal" style={{ display: displayModal }}>
            <div id="info">
                <div id="close-modal" onClick={onClickExitModal}>&times;</div>
                {/* <div id="test"> */}
                <h1>{getProvinceFullName()}</h1>
                <h2>Last Updated: {getModalInfo('last_updated')}</h2>
                <p><b>Active Cases: </b>{getActiveCases()}</p>
                <p><b>Total Cases: </b>{getCases('total_cases')}</p>
                <p><b>Deaths: </b>{getCases('total_fatalities')}</p>
                <p><b>Tests: </b>{getCases('total_tests')}</p>
                <p><b>Hospitalization: </b>{getCases('total_hospitalizations')}</p>

                <h3 id="graph-title">{graphTitle}</h3>
                <Graph
                    graphInfo={graphInfo}
                    province={getModalInfo('province')}
                    dataKey={dataKey}
                    compareProvince={compareProvince}
                />
                <select id="graph-category" onChange={changeTitle}>
                    <option value="total_cases" defaultValue>Total Cases</option>
                    <option value="total_fatalities">Total Fatalities</option>
                    <option value="total_hospitalizations">Total Hospitalizations</option>
                    <option value="total_vaccinated">Total Vaccinated</option>
                    <option value="total_recoveries">Total Recoveries</option>
                    <option value="total_tests">Total Tests</option>
                    <option value="total_vaccines_distributed">Total Vaccines Distributed</option>
                </select>

                <select id="graph-compare" onChange={handleOnChangeCompare}>
                    <option defaultValue hidden>Compare with a province</option>
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="MB">Manitoba</option>
                    <option value="ON">Ontario</option>
                    <option value="QC">Quebec</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NB">New Brunswick</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="YT">Yukon</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                </select>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Modal;

