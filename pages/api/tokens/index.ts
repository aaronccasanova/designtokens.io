// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFormat, getPrefix, sendTokens } from '../../../src/designTokens'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const format = getFormat(req, res)
    const prefix = getPrefix(req)

    const { tokenGroups: tokens } = await import(
      `../../../src/designTokens/token-groups`
    )

    sendTokens({
      res,
      tokens,
      format,
      prefix,
    })
  } catch (error) {
    // console.log('error:', error)
  }
}
