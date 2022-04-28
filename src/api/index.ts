import * as axios from 'axios'
import { isUndefined } from 'lodash'

export const BaseURI = 'http://localhost:8888'

export interface User {
  id: number,
  open_id: string,
  project_id: string
  transports: Array<Transport>
}

export interface Transport {
  type: string
  chat_id?: string,
  connected: boolean
}

export interface Response {
  ok: boolean,
  error_code?: number,
  description?: string,
  result?: any
}

function formatResponse(res: axios.AxiosResponse<any, any>) {
  if (isUndefined(res.data)) {
    return null
  }
  if (isUndefined(res.data.ok)) {
    return null
  }
  return res.data as Response
}

export async function getMe(accessToken: string) {
  const res = await axios.default.get(`${BaseURI}/api/get_me`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    validateStatus: function (status) {
      return true
    }
  })

  let response = formatResponse(res)
  if (!response) {
    throw new Error(`status: ${res.statusText}`)
  }
  return response
}

export async function pushMessage(projectId: string, title: string, content: string) {
  const json = JSON.stringify({
    title,
    content
  })
  const res = await axios.default.post(`${BaseURI}/api/push/${projectId}`, json, {
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: function (status) {
      return true
    }
  })

  let response = formatResponse(res)
  if (!response) {
    throw new Error(`status: ${res.statusText}`)
  }
  return response
}

export async function authentication(address: string, timestamp: number, signature: string) {
  const json = JSON.stringify({
    address,
    timestamp,
    signature
  })
  const res = await axios.default.post(`${BaseURI}/api/auth`, json, {
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: function (status) {
      return true
    }
  })

  let response = formatResponse(res)
  if (!response) {
    throw new Error(`status: ${res.statusText}`)
  }
  return response
}
