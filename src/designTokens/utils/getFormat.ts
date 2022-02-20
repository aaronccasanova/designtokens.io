import type { NextApiRequest, NextApiResponse } from 'next'

import { ParseToVarsFormat } from '../parsers'

export type Format = 'json' | ParseToVarsFormat

export const defaultFormat: Format = 'json'

const formats: Format[] = ['json', 'css']

export function isFormat(format: unknown): format is Format {
  return formats.includes(format as Format)
}

export function getFormat(req: NextApiRequest, res: NextApiResponse) {
  const format = req.query.format || defaultFormat

  if (!isFormat(format)) {
    const error = `Invalid format: ${format}`

    res.status(400).json({ error })
    // Note: We do not wrap this function in a try/catch block
    // to allow the error to be caught by the API handler
    throw new Error(error)
  }

  return format
}
