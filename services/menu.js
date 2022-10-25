import { ReturnObjectGenerator } from "../utils/returnObjectGenerator"
import { getMealsForTheDayById } from "./meals"
import { menudb } from "../localdb/menudb"
import "../utils/convertFirstLetterCap"

export const getMenuForMeals = (menuId) => {
    let meal = getMealsForTheDayById(menuId)
    if (meal.status != 200) {
        return meal
    }
    let data = {}
    if (meal.data && meal.data.identifier) {
        let identifier = meal.data.identifier
        let labelForMessage = meal.data.label
        for (let eachMenuItem in menudb.menu.item) {
            let item = menudb.menu.item[eachMenuItem]
            let eachMenuItemLabel = eachMenuItem.capitalize()
            if (item)
                if (item && item.meals && item.meals[identifier]) {
                    let itemsForEachitems = item.meals[identifier]
                    for (let id in itemsForEachitems) {
                        // this i have done as to skip the subsitute value
                        if (isNaN(id)) {
                            continue // skip if the order id is not a number
                        }
                        if (!data[eachMenuItemLabel]) {
                            data[eachMenuItemLabel] = []
                        }
                        let object = {
                            id,
                            label: itemsForEachitems[id].label
                        }
                        data[eachMenuItemLabel].push(object)
                    }
                }
        }
        const returnObj = new ReturnObjectGenerator()
        returnObj.status = 200
        returnObj.message = `Menu for ${labelForMessage} retireved successfully`
        returnObj.data = data
        return returnObj

    } else {
        meal.message = "Unable to process: Could not find the identifier"
        return meal
    }
}