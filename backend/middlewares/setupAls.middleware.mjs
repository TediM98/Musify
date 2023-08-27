import { authService } from "../api/auth/auth.service.mjs"
import { asyncLocalStorage } from "../services/als.service.mjs"

export async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
  asyncLocalStorage.run(storage, () => {
    next()
  })
}
