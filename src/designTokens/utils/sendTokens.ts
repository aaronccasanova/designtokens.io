import type { NextApiResponse } from 'next'
import { Format, parseToVars, DesignTokens, DesignTokenGroup } from '../index'

export type SendTokensOptions = {
  res: NextApiResponse
  tokens: DesignTokens | DesignTokenGroup
  format: Format
  prefix?: string
}

export function sendTokens({ res, tokens, format, prefix }: SendTokensOptions) {
  if (format === 'css') {
    // res.setHeader('Content-Type', 'text/css')
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send(parseToVars(tokens, { prefix }))
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(tokens)
  }
}
