import { useEffect } from "react"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { useControl } from "react-map-gl/maplibre"

export default function DeckOverlay({ layers }) {
  const overlay = useControl(
    () => new MapboxOverlay({ interleaved: false, layers }),
  )

  useEffect(() => {
    overlay.setProps({ layers })
  }, [overlay, layers])

  return null
}
