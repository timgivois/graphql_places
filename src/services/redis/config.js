require('dotenv').config()

export const host = process.env.REDIS_HOST || '127.0.0.1'
export const port = process.env.REDIS_PORT || '6379'
export const nearbyTreshold = process.env.REDIS_NEAR_TRESHOLD
