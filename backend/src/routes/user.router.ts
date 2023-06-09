import StatusCodes from 'http-status-codes'
import { Request, Response, Router } from 'express'

import userService from '@services/user.service'
import { ParamMissingError } from '@shared/errors'

// Constants
const router = Router()
const { CREATED, OK } = StatusCodes

// Paths
export const p = {
  get: '/all',
  add: '/add',
  update: '/update',
  delete: '/delete/:id',
} as const

/**
 * Get all users.
 */
router.get(p.get, async (_: Request, res: Response) => {
  const users = await userService.getAll()
  return res.status(OK).json({ users })
})

/**
 * Update one user.
 */
router.put(p.update, async (req: Request, res: Response) => {
  const { user } = req.body
  // Check param
  if (!user) {
    throw new ParamMissingError()
  }
  // Fetch data
  await userService.updateOne(user)
  return res.status(OK).end()
})

// Export default
export default router
