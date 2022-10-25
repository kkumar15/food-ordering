import { menudb } from "../localdb/menudb"
import { ReturnObjectGenerator } from "../utils/returnObjectGenerator"


export const getMealsForTheDay = () => {
    const returnObj = new ReturnObjectGenerator()
    let mealsOfferedForTheDay = []
    for (let mealsOferred in menudb.offering) {
        let eachItem = menudb.offering[mealsOferred]
        let eachMeal = {
            id: mealsOferred,
            label: eachItem.label,
            description: eachItem.desc
        }
        mealsOfferedForTheDay.push(eachMeal)
    }
    if (mealsOfferedForTheDay.length) {
        returnObj.status = 200
        returnObj.message = "Offering for the day retrieved successfully"
        returnObj.data = mealsOfferedForTheDay
    } else {
        returnObj.message = "No offering found in menu"
    }
    return returnObj
}

export const getMealsForTheDayById = (id) => {
    const returnObj = new ReturnObjectGenerator()
    if (!id) {
        returnObj.status = 400
        returnObj.message = 'Unable to process: Required param ID is missing'
        returnObj.data = ""
        return returnObj
    }
    let item = menudb.offering[id]
    if (!item) {
        returnObj.message = `Unable to process: ${id} is not offered at our resturant`
    } else {
        returnObj.status = 200
        returnObj.message = "Item retirived succesfully"
        returnObj.data = item
    }
    return returnObj
}
