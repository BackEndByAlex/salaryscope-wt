import * as maplibregl from "maplibre-gl"

let configured = false

export function getMapLibre() {
  if (!configured) {
    // Force a stable worker URL that we copy into /assets at build time.
    if (typeof maplibregl.setWorkerUrl === "function") {
      maplibregl.setWorkerUrl("/assets/maplibre-gl-worker.mjs")
    }
    configured = true
  }

  return maplibregl
}
