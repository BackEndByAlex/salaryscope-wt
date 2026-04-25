const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    )
    const data = await res.json()
    return {
      countryName: data.countryName || "",
      cityName: data.city || data.locality || "",
    }
  } catch {
    return null
  }
}
