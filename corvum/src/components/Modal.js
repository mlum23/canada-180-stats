import Graph from './Graph';
import React, { useEffect, useState } from 'react';

const Modal = ({ modalInfo, displayModal, setDisplayModal }) => {
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

    const getLastUpdated = () => {
        if (isValidModalInfo()) {
            return modalInfo.last_updated;
        }
    }

    const onClickExitModal = () => {
        setDisplayModal("none");
    }

    const getProvinceFullName = () => {
        if (isValidModalInfo()) {
            let names = {
                'AB': 'Alberta', 'BC': 'British Columbia', 'SK': 'Saskatchewan',
                'MB': 'Manitoba', 'ON': 'Ontario', 'QC': 'Quebec',
                'NL': 'Newfoundland and Labrador', 'NB': 'New Brunswick',
                'PE': 'Prince Edward Island', 'NS': 'Nova Scotia',
                'YT': 'Yukon', 'NT': 'Northwest Territories', 'NU': 'Nunavut'
            };
            return names[modalInfo.province];
        }
    }

    useEffect(() => {

    }, [displayModal]);

    return (
        <div id="modal" style={{ display: displayModal }}>
            <div id="info">
                <div id="close-modal" onClick={onClickExitModal}>&times;</div>
                <h1>{getProvinceFullName()}</h1>
                <h2>Last Updated: {getLastUpdated()}</h2>
                <p><b>Active Cases: </b>{getActiveCases()}</p>
                <p><b>Total Cases: </b>{getCases('total_cases')}</p>
                <p><b>Deaths: </b>{getCases('total_fatalities')}</p>
                <p><b>Tests: </b>{getCases('total_tests')}</p>
                <p><b>Hospitalization: </b>{getCases('total_hospitalizations')}</p>
                {/* <Graph data={getGraphData()} /> */}
            </div>
        </div>
    )
}

export default Modal;

