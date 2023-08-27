import express from "express"
import { log } from "../../middlewares/logger.middleware.mjs"
import {
  getStations,
  getStationById,
  addStation,
  updateStation,
  removeStation,
} from "./station.controller.mjs"

const router = express.Router()

router.get("/", log, getStations)
router.get("/:id", getStationById)
router.post("/", addStation)
router.put("/:id", updateStation)
router.delete("/:id", removeStation)

export const stationRoutes = router
