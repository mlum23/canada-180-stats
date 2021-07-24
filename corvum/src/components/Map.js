import CanadaMap from "react-canada-map"

const Map = ({ getProvince }) => {
    const mapClickHandler = (province, event) => {
        getProvince(province);
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