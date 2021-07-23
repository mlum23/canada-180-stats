import CanadaMap from "react-canada-map"

const Map = (provinceReport) => {
    const mapClickHandler = (province, event) => {
        console.log("province clicked: ", province)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        console.log(`today's date: ${yyyy}-${mm}-${dd}`)
        console.log(provinceReport);
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