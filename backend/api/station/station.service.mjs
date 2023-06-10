import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy = { txt: '' }) {
    try {
        const criteria = {
            title: { $regex: filterBy.txt, $options: 'i' }
        }
        const collection = await dbService.getCollection('station')
        var stationCursor = await collection.find(criteria)
        const stations = stationCursor.toArray()
        return stations
    } catch (err) {
        logger.error('cannot find stations', err)
        throw err
    }
}

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        const station = collection.findOne({ _id: ObjectId(stationId) })
        return station
    } catch (err) {
        logger.error(`while finding station ${stationId}`, err)
        throw err
    }
}

async function remove(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.deleteOne({ _id: ObjectId(stationId) })
        return stationId
    } catch (err) {
        logger.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}

async function add(station) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.insertOne(station)
        return station
    } catch (err) {
        logger.error('cannot insert station', err)
        throw err
    }
}

async function update(station) {
    try {
        const stationToSave = {
            title: station.title,
        }
        const collection = await dbService.getCollection('station')
        await collection.updateOne({ _id: ObjectId(station._id) }, { $set: stationToSave })
        return station
    } catch (err) {
        logger.error(`cannot update station ${stationId}`, err)
        throw err
    }
}


export const stationService = {
    remove,
    query,
    getById,
    add,
    update,
}
