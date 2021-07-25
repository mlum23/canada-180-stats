import Graph from './Graph';
import React, { useEffect, useState } from 'react';

const Modal = ({ modalInfo, displayModal, setDisplayModal, graphInfo, yeterdaysDate, yesterdaysDateText }) => {
    let [dataKey, setDataKey] = useState('cases');
    let [graphTitle, setGraphTitle] = useState('Last 90 Days: Total Cases')
    let [compareProvince, setCompareProvince] = useState(null);

    const changeTitle = (event) => {
        let titles = {
            'cases': 'Total Cases',
            'deaths': 'Total Deaths',
            'recovered': 'Total Recovered',
        }
        setGraphTitle(`Last 90 Days: ${titles[event.target.value]}`);
        setDataKey(event.target.value);
    }

    const getDate = (daysBefore = 0) => {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - daysBefore);
        let dd = String(yesterday.getDate());
        let mm = String(yesterday.getMonth() + 1);
        let yy = yesterday.getFullYear().toString().substr(-2)
        return `${mm}/${dd}/${yy}`;
    }

    const handleOnChangeCompare = (event) => {
        setCompareProvince(event.target.value);
    }

    const isValidModalInfo = () => {
        return modalInfo !== null;
    }

    const getNewCases = (caseName) => {
        if (isValidModalInfo()) {
            console.log(getDate(1));
            let newCases = modalInfo.timeline[caseName][yeterdaysDate] - modalInfo.timeline[caseName][getDate(2)];
            return newCases;
        }
    }

    const getCases = (caseName) => {
        if (isValidModalInfo()) {
            return modalInfo.timeline[caseName][yeterdaysDate]
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
                <h2>Last Updated: {yesterdaysDateText}</h2>
                <p><b>Total Cases: </b>{getCases('cases')}</p>
                <p><b>New Cases: </b>{getNewCases('cases')}</p>
                <p><b>Total Deaths: </b>{getCases('deaths')}</p>
                <p><b>New Deaths: </b>{getNewCases('deaths')}</p>
                <p><b>Recovered: </b>{getCases('recovered')}</p>

                <h3 id="graph-title">{graphTitle}</h3>
                <Graph
                    graphInfo={graphInfo}
                    province={getModalInfo('province')}
                    dataKey={dataKey}
                    compareProvince={compareProvince}
                />
                <select id="graph-category" onChange={changeTitle}>
                    <option value="cases" defaultValue>Total Cases</option>
                    <option value="deaths">Total Deaths</option>
                    <option value="recovered">Total Recovered</option>
                </select>

                <select id="graph-compare" onChange={handleOnChangeCompare}>
                    <option defaultValue hidden>Compare with a province</option>
                    <option value="alberta">Alberta</option>
                    <option value="british columbia">British Columbia</option>
                    <option value="saskatchewan">Saskatchewan</option>
                    <option value="manitoba">Manitoba</option>
                    <option value="ontario">Ontario</option>
                    <option value="quebec">Quebec</option>
                    <option value="newfoundland and labrador">Newfoundland and Labrador</option>
                    <option value="new brunswick">New Brunswick</option>
                    <option value="prince edward island">Prince Edward Island</option>
                    <option value="nova scotia">Nova Scotia</option>
                    <option value="yukon">Yukon</option>
                    <option value="northwest territories">Northwest Territories</option>
                    <option value="nunavut">Nunavut</option>
                </select>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Modal;

