import { menudb } from "../localdb/menudb"
import { ReturnObjectGenerator } from "../utils/returnObjectGenerator"
import { getMealsForTheDayById } from "./meals"
import "../utils/convertFirstLetterCap"


function makeErrorString(errors = []) {
    if (errors[0]) {
        errors[0] = errors[0].capitalize()
    }
    return "Unable to process: " + errors.join(", ")
}

export const placeOrder = (meal = "", orders = []) => {
    const returnObj = new ReturnObjectGenerator()
    let errors = []
    if (!meal) {
        errors.push("Meal is required to place order")
    }

    // initial error handling
    if (errors.length) {
        returnObj.message = makeErrorString(errors)
        return returnObj
    }

    if (orders) {
        let orderJson = {}
        // i am not going the sort the array since the order ids are number
        // when put them in an object {}, javascript automatically maintains the sorting
        // this filter servers to 2 - 1. it will remove error values eg- 1,,2,,3. 2. tempJson will have order ids in sorted order with the count as well eg 1,1,1 => {1:3} where 1 is the order id and 3 is the order count
        orders?.split(",")?.forEach((ele) => {
            if (ele) {
                if (!orderJson[ele]) {
                    orderJson[ele] = 0
                }
                orderJson[ele] += 1 // this will increment the count of order by 1
            }
        })
        orders = orderJson
    }

    let mealDetails = getMealsForTheDayById(meal)
    if (mealDetails.status == 200 && mealDetails.data) {
        mealDetails = mealDetails.data

        let orderLevelRuleMandatory = (menudb?.orderLevelRule?.mandatory) || {}
        let orderLevelRuleMandatoryKeys = Object.keys(orderLevelRuleMandatory)
        // check if any order is present
        // since order has become an object now, check for object.keys
        if (!Object.keys(orders).length) {
            // if no order is present
            // check 2 things
            //  1. If there is any mandatory order level rule
            //  2. If not then return a custom error since this condition is not mentioned in the assignment
            if (orderLevelRuleMandatoryKeys.length) {
                // their is mandatory rule, throw this error
                for (let i of orderLevelRuleMandatoryKeys) {
                    errors.push(orderLevelRuleMandatory[i])
                }
                if (errors[0]) {
                    errors[0] = errors[0].capitalize()
                }

                returnObj.status = 400
                returnObj.message = makeErrorString(errors)
                return returnObj
            } else {
                // mandatory rules are not present, but default logic is that an order can not be place if even a single order id is missing
                returnObj.status = 400
                returnObj.message = makeErrorString(errors) // is the default message when no order is given 
                return returnObj
            }
        }

        // at this point we know that certain order is present
        // but it could be that the order given might still not be the ones in the mandatory values

        // identifier will be our internal way of fetching the values from DB, not exposed to the front end
        let identifier = mealDetails.identifier

        // this will give the return order of item. this is a json
        let returningOrder = menudb.returningOrder

        // this is an json and will give us the incoming order after the values are sorted order
        let incomingOrder = menudb.incomingOrder
        let orderSortedArray = Object.keys(orders)

        let loopNumber = 0
        let successArray = []
        errors = []

        // this is not asked in the assignment, but i noticed that ordering can be only done when the orders are in proper, if a person tries to order
        // side,drink- it should throw error like main is missing, but since everything depends on order of order placed it does not work as expected
        // below for loop is an extra overhead but fixes this issue
        /*
        for(let orderId in orders){
            menudb?.menu?.item?
        }*/

        for (let currentItem of incomingOrder) {
            // current item will contain value like main,side
            let returnArrayOrderNumer = returningOrder[currentItem]
            if (returnArrayOrderNumer == undefined) {
                // this item is not present in the return order
                // we can skip this
                continue
            }


            // we can leverage the missing of order id from the order and use the or option to substitute it
            // this is only possible due to desert being mandatory, if that was not the case the output for an order like 1,2,4 would have screwed the logic
            let orderId = orderSortedArray[loopNumber] || "substitue"
            let orderCount = orders[orderId] || 1

            // by default all the items are not mandatory
            // mimimum order rule taken care above
            let mandatoryForOrder = false
            let meallevelMandatoryRule = (mealDetails?.rulesForOrder?.mandatory) || {}

            // since they are json, we can combine them to form a single json with meal level error message having high priority 
            // that is the reason why meal level is 2nd object
            let combinedRule = {
                ...orderLevelRuleMandatory,
                ...meallevelMandatoryRule
            }

            if (combinedRule && combinedRule[currentItem] != undefined) {
                // this item becomes mandatory
                mandatoryForOrder = true
            }


            let mealsInThisItem = (menudb?.menu?.item[currentItem]?.meals?.[identifier]) || null
            let foodLabel = ""
            if (mealsInThisItem && mealsInThisItem?.[orderId]) {
                let foodDetailsJson = mealsInThisItem[orderId]
                foodLabel = foodDetailsJson.label
                if (foodDetailsJson && !foodDetailsJson.canOrderMoreThanOne) {
                    // count of the order cant be more then one in this case
                    if (orderCount > 1) {
                        // this is an error behaviour, since the item cant be ordered more then once in a single order
                        errors.push(`${foodLabel} cannot be ordered more than once`)
                    }
                }
            } else {
                // this order id is not in the menu db, check if this item is mandatory and is missing
                if (mandatoryForOrder) {
                    // so the item is mandatory but its missing in the db
                    errors.push(combinedRule[currentItem])
                }
            }

            successArray[returnArrayOrderNumer] = `${foodLabel}${orderCount > 1 ? `(${orderCount})` : ''}`
            loopNumber += 1
        }
        if (errors.length) {
            // the input has error
            // ignore succes array
            returnObj.status = 400
            returnObj.data = ""
            returnObj.message = makeErrorString(errors)
        } else {
            if (returningOrder['default'] != undefined) {
                // this means default value has to be added to this success array
                let checkIfTheMenuHasDefault = (menudb?.menu?.default?.meals?.[identifier]) || []
                if (checkIfTheMenuHasDefault && checkIfTheMenuHasDefault.length) {
                    successArray[returningOrder.default] = checkIfTheMenuHasDefault.join(", ")
                } else {
                    successArray = successArray.filter(Boolean)
                }
            }
            returnObj.status = 200
            returnObj.data = ""
            returnObj.message = successArray.join(", ")
        }
        return returnObj

    } else {
        return mealDetails
    }

}