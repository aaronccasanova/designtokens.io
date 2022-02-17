import fs from 'fs'
import path from 'path'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseToVars } from '../../../src/designTokens'

const tokenGroupsDir = 'src/designTokens/token-groups'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tokenGroupParam = req.query['token-group']
  const format = req.query.format || 'json'
  // if format=css, optionally accept a prefix
  // e.g. 'prefix=theme' and token [color, red] becomes '--theme-color-red'
  // const tokenPrefix = req.query.prefix || 'theme'

  const tokenGroupFiles = await fs.promises.readdir(
    path.resolve(tokenGroupsDir),
  )

  const tokenGroupIds = tokenGroupFiles.map((file) =>
    path.basename(file, '.ts'),
  )

  if (
    typeof tokenGroupParam !== 'string' ||
    !tokenGroupIds.includes(tokenGroupParam)
  ) {
    return res.status(404).json({
      error: `Token group '${tokenGroupParam}' not found.`,
    })
  }

  // Safe assertion after the above check.
  const tokenGroupId = tokenGroupIds.find((id) => id === tokenGroupParam)!

  const { [tokenGroupId]: tokenGroup } = await import(
    `../../../src/designTokens/token-groups/${tokenGroupId}`
  )

  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(tokenGroup)
  } else if (format === 'css') {
    res.setHeader('Content-Type', 'text/css')
    res.status(200).send(parseToVars(tokenGroup))
  } else {
    res.status(400).json({
      error: `Invalid format '${format}'.`,
    })
  }
}
