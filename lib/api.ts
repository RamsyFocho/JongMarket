import { z } from "zod"

// Define types for city and quarter data
export interface City {
  value: string
  label: string
}

export interface Quarter {
  value: string
  label: string
  cityValue: string
}

// Schema for validation
const citySchema = z.object({
  value: z.string(),
  label: z.string(),
})

const quarterSchema = z.object({
  value: z.string(),
  label: z.string(),
  cityValue: z.string(),
})

// Geonames API configuration
const GEONAMES_USERNAME = process.env.NEXT_PUBLIC_GEONAMES_USERNAME || 'demo'
const GEONAMES_API_BASE = 'http://api.geonames.org'

// Helper function to normalize string for value (slug)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Mock data as fallback
const mockCities: City[] = [
  { value: "yaounde", label: "Yaoundé" },
  { value: "douala", label: "Douala" },
  { value: "bamenda", label: "Bamenda" },
  { value: "bafoussam", label: "Bafoussam" },
  { value: "buea", label: "Buea" },
  { value: "limbe", label: "Limbe" },
  { value: "garoua", label: "Garoua" },
  { value: "ngaoundere", label: "Ngaoundéré" },
  { value: "maroua", label: "Maroua" },
  { value: "kumba", label: "Kumba" },
]

const mockQuarters: Quarter[] = [
  { value: "bastos", label: "Bastos", cityValue: "yaounde" },
  { value: "mvan", label: "Mvan", cityValue: "yaounde" },
  { value: "mvog-mbi", label: "Mvog-Mbi", cityValue: "yaounde" },
  { value: "akwa", label: "Akwa", cityValue: "douala" },
  { value: "bonanjo", label: "Bonanjo", cityValue: "douala" },
  { value: "bonapriso", label: "Bonapriso", cityValue: "douala" },
  { value: "up-station", label: "Up Station", cityValue: "bamenda" },
  { value: "down-town", label: "Down Town", cityValue: "bamenda" },
  { value: "banengo", label: "Banengo", cityValue: "bafoussam" },
  { value: "tamdja", label: "Tamdja", cityValue: "bafoussam" },
  { value: "molyko", label: "Molyko", cityValue: "buea" },
  { value: "great-soppo", label: "Great Soppo", cityValue: "buea" },
  { value: "mile-4", label: "Mile 4", cityValue: "limbe" },
  { value: "mile-2", label: "Mile 2", cityValue: "limbe" },
  { value: "bibemiré", label: "Bibemiré", cityValue: "garoua" },
  { value: "roumdé-adjia", label: "Roumdé Adjia", cityValue: "garoua" },
  { value: "dang", label: "Dang", cityValue: "ngaoundere" },
  { value: "mbideng", label: "Mbideng", cityValue: "ngaoundere" },
  { value: "domayo", label: "Domayo", cityValue: "maroua" },
  { value: "djarengol", label: "Djarengol", cityValue: "maroua" },
  { value: "fiango", label: "Fiango", cityValue: "kumba" },
  { value: "mbonge-road", label: "Mbonge Road", cityValue: "kumba" },
]

/**
 * Fetches cities from GeoNames API with fallback to mock data
 */
export async function fetchCities(): Promise<City[]> {
  try {
    // Using GeoNames API to fetch cities in Cameroon
    const response = await fetch(
      `${GEONAMES_API_BASE}/searchJSON?country=CM&featureClass=P&featureCode=PPL&featureCode=PPLA&featureCode=PPLC&maxRows=1000&orderby=population&username=${GEONAMES_USERNAME}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // 5 second timeout
        signal: AbortSignal.timeout(5000),
      }
    )
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.geonames) {
      throw new Error('Invalid response format from GeoNames API')
    }

    // Transform and validate the data
    const cities = data.geonames
      .filter((city: any) => city.population > 20000) // Only include major cities
      .map((city: any) => ({
        value: normalizeString(city.name),
        label: city.name,
      }))
      .sort((a: City, b: City) => a.label.localeCompare(b.label))

    return z.array(citySchema).parse(cities)
  } catch (error) {
    console.warn('Error fetching cities, using mock data:', error)
    return mockCities
  }
}

/**
 * Fetches quarters/neighborhoods for a specific city with fallback to mock data
 * Note: Since GeoNames doesn't provide quarter-level data, we'll use OpenStreetMap's Nominatim API
 * as a fallback for mock data when available
 */
export async function fetchQuartersByCity(cityValue: string): Promise<Quarter[]> {
  if (!cityValue) return []
  
  try {
    // First try to get city details from GeoNames to get the bounding box
    const cityResponse = await fetch(
      `${GEONAMES_API_BASE}/searchJSON?q=${cityValue}&country=CM&maxRows=1&username=${GEONAMES_USERNAME}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      }
    )
    
    if (!cityResponse.ok) {
      throw new Error(`Failed to fetch city details: ${cityResponse.status}`)
    }
    
    const cityData = await cityResponse.json()
    
    if (!cityData.geonames?.[0]) {
      throw new Error(`City ${cityValue} not found`)
    }
    
    const city = cityData.geonames[0]
    
    // Use the city's coordinates to find nearby quarters/neighborhoods
    // Note: In a production environment, you would want to use a more robust source
    // for quarters/neighborhoods data, possibly your own database
    const quarterResponse = await fetch(
      `${GEONAMES_API_BASE}/neighbourhoodJSON?lat=${city.lat}&lng=${city.lng}&username=${GEONAMES_USERNAME}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      }
    )
    
    if (!quarterResponse.ok) {
      throw new Error(`Failed to fetch quarters: ${quarterResponse.status}`)
    }
    
    const quarterData = await quarterResponse.json()
    
    // Transform the data
    const quarters = (quarterData.neighbourhood || [])
      .map((quarter: any) => ({
        value: normalizeString(quarter.name),
        label: quarter.name,
        cityValue: cityValue,
      }))
      .sort((a: Quarter, b: Quarter) => a.label.localeCompare(b.label))
    
    return z.array(quarterSchema).parse(quarters)
  } catch (error) {
    console.warn(`Error fetching quarters for ${cityValue}, using mock data:`, error)
    // Fallback to mock data filtered by city
    const cityQuarters = mockQuarters.filter(quarter => quarter.cityValue === cityValue)
    return cityQuarters.length > 0 ? cityQuarters : generateMockQuarters(cityValue)
  }
}

/**
 * Generates mock quarters for a city that doesn't have predefined mock data
 */
function generateMockQuarters(cityValue: string): Quarter[] {
  const genericQuarters = [
    { suffix: "Center", label: "Centre" },
    { suffix: "Downtown", label: "Downtown" },
    { suffix: "Uptown", label: "Uptown" },
    { suffix: "Market", label: "Market Area" },
    { suffix: "New Layout", label: "New Layout" },
    { suffix: "Old Town", label: "Old Town" },
  ]

  return genericQuarters.map(({ suffix, label }) => ({
    value: `${normalizeString(cityValue)}-${normalizeString(suffix)}`,
    label: `${label} (${cityValue})`,
    cityValue: cityValue,
  }))
}