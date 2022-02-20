// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  isTokenGroupKey,
  TokenGroups,
  getFormat,
  getPrefix,
  sendTokens,
} from '../../../src/designTokens'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const format = getFormat(req, res)
    const prefix = getPrefix(req)

    const tokenGroupParam = req.query['token-group']

    if (!isTokenGroupKey(tokenGroupParam)) {
      return res.status(400).json({
        error: `Invalid token-group: ${tokenGroupParam}`,
      })
    }

    const tokenGroupModule = await import(
      `../../../src/designTokens/token-groups/${tokenGroupParam}`
    )

    const tokenGroup = tokenGroupModule[
      tokenGroupParam
    ] as TokenGroups[typeof tokenGroupParam]

    sendTokens({
      res,
      tokens: { [tokenGroupParam]: tokenGroup },
      format,
      prefix,
    })
  } catch (error) {
    // console.log('error:', error)
  }
}
