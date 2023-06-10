import { carService } from './services/car.service.js'
import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

console.log('Simple driver to test some API calls')

window.onLoadCars = onLoadCars
window.onLoadUsers = onLoadUsers
window.onAddCar = onAddCar
window.onGetCarById = onGetCarById
window.onRemoveCar = onRemoveCar

async function onLoadCars() {
    const cars = await carService.query()
    render('Cars', cars)
}
async function onLoadUsers() {
    const users = await userService.query()
    render('Users', users)
}

async function onGetCarById() {
    const id = prompt('Car id?')
    if (!id) return
    const car = await carService.getById(id)
    render('Car', car)
}

async function onRemoveCar() {
    const id = prompt('Car id?')
    if (!id) return
    await carService.remove(id)
    render('Removed Car')
}

async function onAddCar() {
    await userService.login({ username: 'puki', password: '123' })
    const savedCar = await carService.save(carService.getEmptyCar())
    render('Saved Car', savedCar)
}


