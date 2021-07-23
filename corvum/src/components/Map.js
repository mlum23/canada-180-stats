import CanadaMap from "react-canada-map"

const Map = ({ getProvince }) => {
    const mapClickHandler = (province, event) => {
        console.log("province clicked: ", province)
        getProvince(province);
    }

    const customizeProvince = () => {
        return {
            ON: {
                fillColor: "DarkRed",
                onHoverColor: "black",
            },
            NB: {
                fillColor: "#000000",
            },
            QC: {
                onHoverColor: "#FF69B4",
            },
        }
    }

    return (
        <div id="map-container">
            <CanadaMap
                customize={customizeProvince()}
                fillColor="ForestGreen"
                onHoverColor="Gold"
                onClick={mapClickHandler}
            ></CanadaMap>
        </div>
    )
}

export default Map;