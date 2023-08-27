import { dbService } from "../../services/db.service.mjs"
import { logger } from "../../services/logger.service.mjs"
import mongodb from "mongodb"
const { ObjectId } = mongodb

export const userService = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection("user")
    var users = await collection.find(criteria).toArray()
    users = users.map((user) => {
      delete user.password
      user.createdAt = ObjectId(user._id).getTimestamp()
      return user
    })
    return users
  } catch (err) {
    logger.error("cannot find users", err)
    throw err
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection("user")
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    logger.error(`while finding user by id: ${userId}`, err)
    throw err
  }
}
async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection("user")
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    logger.error(`while finding user by username: ${username}`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection("user")
    await collection.deleteOne({ _id: ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user) {
  try {
    const userToSave = {
      _id: ObjectId(user._id),
      fullname: user.fullname,
      score: user.score,
    }
    const collection = await dbService.getCollection("user")
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user) {
  try {
    const userToAdd = {
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      imgUrl: user.imgUrl,
      score: 100,
    }
    const collection = await dbService.getCollection("user")
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    logger.error("cannot add user", err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: "i" }
    criteria.$or = [
      {
        username: txtCriteria,
      },
      {
        fullname: txtCriteria,
      },
    ]
  }
  if (filterBy.minBalance) {
    criteria.score = { $gte: filterBy.minBalance }
  }
  return criteria
}
