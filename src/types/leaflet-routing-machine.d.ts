declare module "leaflet-routing-machine" {
    import * as L from "leaflet";
  
    namespace Routing {
      function control(options: RoutingControlOptions): L.Routing.Control;
  
      interface RoutingControlOptions {
        waypoints: L.LatLng[];
        routeWhileDragging?: boolean;
        lineOptions?: L.PolylineOptions & {
          styles?: { color?: string; weight?: number }[];
        };
      }
  
      namespace Control {
        function extend(options: any): any;
      }
    }
  
    export = Routing;
  }
  