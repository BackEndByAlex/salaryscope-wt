// ── Country layers ───────────────────────────────────────────────────────────

export const countryCircleLayer = {
  id: "country-circles",
  type: "circle",
  paint: {
    "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 3, 5, 6, 8, 14],
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "count"],
      0,
      "#2D6FA8",
      5000,
      "#81ECFF",
      20000,
      "#FFFFFF",
    ],
    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 2.8, 0, 3.5, 0.9],
    "circle-stroke-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      3,
      0,
      4.5,
      1.5,
    ],
    "circle-stroke-color": "#81ECFF",
    "circle-stroke-opacity": 0.35,
  },
}

export const countryNameLayer = {
  id: "country-names",
  type: "symbol",
  minzoom: 3.5,
  layout: {
    "text-field": ["get", "name"],
    "text-font": ["Open Sans Regular"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 3.5, 10, 7, 14],
    "text-offset": [0, 1.2],
    "text-anchor": "top",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#81ECFF",
    "text-opacity": ["interpolate", ["linear"], ["zoom"], 3.5, 0, 4, 1],
    "text-halo-color": "#050A0F",
    "text-halo-width": 1.5,
  },
}

export const countryCountLayer = {
  id: "country-counts",
  type: "symbol",
  minzoom: 4.5,
  layout: {
    "text-field": ["concat", ["to-string", ["get", "count"]], " records"],
    "text-font": ["Open Sans Regular"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 4.5, 9, 7, 11],
    "text-offset": [0, 2.8],
    "text-anchor": "top",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#81ECFF",
    "text-opacity": ["interpolate", ["linear"], ["zoom"], 4.5, 0, 5.2, 1],
    "text-halo-color": "#050A0F",
    "text-halo-width": 1,
  },
}

// ── City layers ──────────────────────────────────────────────────────────────

export const cityCircleLayer = {
  id: "city-circles",
  type: "circle",
  paint: {
    "circle-radius": ["interpolate", ["linear"], ["zoom"], 3.0, 2, 7, 5, 10, 9],
    "circle-color": "#00F5A0",
    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 3.0, 0, 4.0, 0.85],
    "circle-stroke-width": 1,
    "circle-stroke-color": "#00F5A0",
    "circle-stroke-opacity": 0.3,
  },
}

export const cityNameLayer = {
  id: "city-names",
  type: "symbol",
  minzoom: 4.5,
  layout: {
    "text-field": ["get", "name"],
    "text-font": ["Open Sans Regular"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 4.5, 9, 9, 12],
    "text-offset": [0, 1],
    "text-anchor": "top",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#00F5A0",
    "text-opacity": ["interpolate", ["linear"], ["zoom"], 4.5, 0, 5.2, 1],
    "text-halo-color": "#050A0F",
    "text-halo-width": 1.5,
  },
}

export const cityCountLayer = {
  id: "city-counts",
  type: "symbol",
  minzoom: 7,
  layout: {
    "text-field": ["concat", ["to-string", ["get", "count"]], " records"],
    "text-font": ["Open Sans Regular"],
    "text-size": 9,
    "text-offset": [0, 2.4],
    "text-anchor": "top",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#00F5A0",
    "text-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 7.8, 1],
    "text-halo-color": "#050A0F",
    "text-halo-width": 1,
  },
}
