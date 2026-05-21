import { apiUrl } from '../config/env'

const getAccessToken = () => localStorage.getItem('accessToken') || ''

const createHeaders = (headers = {}) => {
  const accessToken = getAccessToken()

  return {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers
  }
}

const parseResponseBody = async (response) => {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const request = async (path, options = {}) => {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: createHeaders(options.headers)
  })
  const body = await parseResponseBody(response)
  const isApiFailure = body && typeof body === 'object' && body.success === false

  if (!response.ok || isApiFailure) {
    const error = new Error(body?.message || `API 요청 실패 (${response.status})`)
    error.status = response.status
    error.code = body?.code
    error.data = body?.data
    throw error
  }

  if (body && typeof body === 'object' && 'data' in body) {
    return body.data
  }

  return body
}

const jsonRequest = (path, method, body) => {
  return request(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

export const createInterviewSession = () => {
  return request('/api/v1/sessions', { method: 'POST' })
}

export const startInterviewSession = (sessionId, setting) => {
  return jsonRequest(`/api/v1/sessions/${sessionId}/start`, 'POST', setting)
}

export const getInterviewSession = (sessionId) => {
  return request(`/api/v1/sessions/${sessionId}`)
}

export const updateInterviewSessionStatus = (sessionId, status) => {
  return jsonRequest(`/api/v1/sessions/${sessionId}/status`, 'PATCH', { status })
}

export const getInterviewSetting = (sessionId) => {
  return request(`/api/v1/preparation/settings/${sessionId}`)
}

export const getInterviewResult = (sessionId) => {
  return request(`/api/v1/interviews/${sessionId}/result`)
}

export const getInterviewHistory = () => {
  return request('/api/v1/interviews/history')
}

export const getInterviewReport = (sessionId) => {
  return request(`/api/v1/interviews/${sessionId}/report`)
}

export const getPresignedUrl = (sessionId, fileType) => {
  return jsonRequest(`/api/v1/sessions/${sessionId}/presigned`, 'POST', { fileType })
}

export const saveInterviewContentUrl = (sessionId, contentUrl, type = 'video') => {
  return jsonRequest(`/api/v1/sessions/${sessionId}/save`, 'POST', { type, contentUrl })
}
