import axios, { AxiosInstance, AxiosResponse } from 'axios'

const getNewAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      {
        client_id: process.env.REACT_APP_AMADEUS_API_KEY,
        client_secret: process.env.REACT_APP_AMADEUS_API_SECRET,
        grant_type: 'client_credentials',
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
    const { access_token: accessToken } = response.data
    localStorage.setItem('amadeus_token', accessToken)
    return accessToken
  } catch (error) {
    console.error('Failed to fetch new access token:', error)
    throw error
  }
}

const token = localStorage.getItem('amadeus_token')

const amadeusClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AMADEUS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

// Interceptor to handle token expiration
amadeusClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newToken = await getNewAccessToken()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return await amadeusClient(originalRequest)
      } catch (tokenError) {
        return Promise.reject(tokenError)
      }
    }
    return Promise.reject(error)
  }
)

// Example usage for Amadeus API
export const getCities = async (
  countryCode: string,
  keyword: string,
  max: number = 10
): Promise<{ data: any[] }> => {
  const url = '/v1/reference-data/locations/cities'
  const params = {
    countryCode,
    keyword,
    max,
    include: 'AIRPORTS',
  }
  try {
    const { data: responseData } = await amadeusClient.get(url, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    })
    return responseData
  } catch (error) {
    console.error('GET request failed:', error)
    throw error
  }
}

export const getNearbyAirports = async (
  latitude: number,
  longitude: number
): Promise<{ data: any[] }> => {
  const url = '/v1/reference-data/locations/airports'
  const params = {
    latitude,
    longitude,
  }
  try {
    const { data: responseData } = await amadeusClient.get(url, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    })
    return responseData
  } catch (error) {
    console.error('GET request for nearby airports failed:', error)
    throw error
  }
}

export const getDirectDestinations = async (
  departureAirportCode: string,
  max: number = 10
): Promise<{ data: any[] }> => {
  const url = '/v1/airport/direct-destinations'
  const params = {
    departureAirportCode,
    max,
  }
  try {
    const { data: responseData } = await amadeusClient.get(url, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    })
    return responseData
  } catch (error) {
    console.error('GET request for direct destinations failed:', error)
    throw error
  }
}

export const getFlightOffers = async (params: {
  originLocationCode: string
  destinationLocationCode: string
  adults: string
  max?: string
  departureDate: string
  returnDate?: string
}): Promise<any> => {
  try {
    const { data } = await amadeusClient.get('/v2/shopping/flight-offers', {
      params,
    })
    return data
  } catch (error) {
    console.error('Failed to fetch flight offers:', error)
    throw error
  }
}

export default amadeusClient
