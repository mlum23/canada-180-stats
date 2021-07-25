import CanadaMap from "react-canada-map"

const Map = ({ getProvince }) => {
    const mapClickHandler = (province, event) => {
        const PROVINCE_CODE =
        {
            'BC': 'british columbia',
            'AB': 'alberta',
            'SK': 'saskatchewan',
            'MB': 'manitoba',
            'ON': 'ontario',
            'QC': 'quebec',
            'NL': 'newfoundland and labrador',
            'PE': 'prince edward island',
            'NS': 'nova scotia',
            'NB': 'new brunswick',
            'YT': 'yukon',
            'NT': 'northwest territories',
            'NU': 'nunavut'
        }

        getProvince(PROVINCE_CODE[province]);
    }

    return (
        <div id="map-container">
            <CanadaMap
                fillColor="Crimson"
                onHoverColor="ForestGreen"
                onClick={mapClickHandler}
            ></CanadaMap>
        </div>
    )
}

export default Map;