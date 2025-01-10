import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    function control(options: ControlOptions): Control;

    interface ControlOptions {
      waypoints: LatLng[];
      lineOptions?: {
        styles?: Array<{ color: string; weight?: number; opacity?: number }>;
      };
      routeWhileDragging?: boolean;
    }

    interface Control extends L.Control {
      getWaypoints(): LatLng[];
      on(event: string, callback: (e: any) => void): this;
    }
  }
}
