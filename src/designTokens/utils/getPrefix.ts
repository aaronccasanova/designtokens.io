import type { NextApiRequest } from 'next'

export function getPrefix(req: NextApiRequest): string | undefined {
  let prefix = req.query.prefix

  if (Array.isArray(prefix)) {
    prefix = prefix.join('-')
  }

  return prefix
}
