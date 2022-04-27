import * as axios from 'axios'

export const BaseURI = 'http://localhost:8888'

export async function auth(address: string, timestamp: number, signature: string) {
  const json = JSON.stringify({
    address,
    timestamp,
    signature
  })
  const res = await axios.default.post(`${BaseURI}/api/auth`, json, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res
}

export async function getMe(accessToken: string) {
}