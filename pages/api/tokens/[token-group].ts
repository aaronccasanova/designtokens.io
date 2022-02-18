// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseToVars, isTokenGroupKey } from '../../../src/designTokens'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tokenGroupParam = req.query['token-group']
  const format = req.query.format || 'json'
  // if format=css, optionally accept a prefix
  // e.g. 'prefix=theme' and token [color, red] becomes '--theme-color-red'
  // const tokenPrefix = req.query.prefix || 'theme'

  if (!isTokenGroupKey(tokenGroupParam)) {
    return res.status(400).json({
      error: `Invalid token-group: ${tokenGroupParam}`,
    })
  }

  const { [tokenGroupParam]: tokenGroup } = await import(
    `../../../src/designTokens/token-groups/${tokenGroupParam}`
  )

  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(tokenGroup)
  } else if (format === 'css') {
    res.setHeader('Content-Type', 'text/css')
    res.status(200).send(parseToVars({ [tokenGroupParam]: tokenGroup }))
  } else {
    res.status(400).json({
      error: `Invalid format '${format}'.`,
    })
  }
}
