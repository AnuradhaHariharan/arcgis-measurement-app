require([
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/Polyline",
    "esri/geometry/geometryEngine",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/widgets/Sketch/SketchViewModel"
], function (Map, MapView, Polyline, geometryEngine, GraphicsLayer, Graphic, SketchViewModel) {

    // Create a Map
    const map = new Map({
        basemap: "streets-navigation-vector"
    });

    // Create a MapView
    const view = new MapView({
        container: "viewDiv",
        map: map
    });

    // Create a GraphicsLayer for displaying graphics
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Create a SketchViewModel
    const sketchViewModel = new SketchViewModel({
        view: view,
        layer: graphicsLayer,
        polylineSymbol: {
            type: "simple-line",
            color: "#FF0000",
            width: 2
        }
    });

    // Add a click event listener to the button
    document.getElementById('measureButton').addEventListener('click', function() {
        sketchViewModel.create("polyline");
    });

    // When a polyline is completed, calculate and display distance
    sketchViewModel.on("create", function(event) {
        if (event.state === "complete") {
            const polyline = event.graphic.geometry;

            // Log the polyline to check if it's being created correctly
            console.log("Polyline geometry:", polyline);

            // Calculate the distance using geometryEngine
            const distance = geometryEngine.geodesicLength(polyline, "meters");

            // Log the calculated distance
            console.log("Calculated distance:", distance);

            // Display the distance
            document.getElementById('distanceOutput').textContent = `Distance: ${distance.toFixed(2)} meters`;

            // Add the graphic to the map
            graphicsLayer.add(event.graphic);
        }
    });

});