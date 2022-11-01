 
import order from "./pages/api/order/[orderStr]"
import { expect, jest, test } from '@jest/globals';


const testInputOutputJson = {
    // Testing Breakfast scenarios
    "Breakfast 1,2,3": 'Eggs, Toast, Coffee',
    "Breakfast 2,3,1": 'Eggs, Toast, Coffee',
    "Breakfast 1": "Unable to process: Side is missing", 
    "Breakfast" : "Unable to process: Main is missing, side is missing",
    // Testing Lunch Scenarios 
    "Lunch 1,2,3" : "Sandwich, Chips, Soda",
    "Lunch 1,1,2, 3": "Unable to process: Sandwich cannot be ordered more than once",
    "Lunch 1,2" :"Sandwich, Chips, Water",
    "Lunch 1,2,2" : "Sandwich, Chips(2), Water",
    "Lunch" : "Unable to process: Main is missing, side is missing",
    // Tesing Dinner Scenarios
    "Dinner 1,2,3,4" : "Steak, Potatoes, Wine, Water, Cake",
    "Dinner 4,3,2,1" : "Steak, Potatoes, Wine, Water, Cake",
    "Dinner 1,2,3" : "Unable to process: Desert is missing",
    "Dinner": "Unable to process: Main is missing, side is missing",

    
}

describe(" Validating breakfast rules ", () => {
  for (let i in testInputOutputJson) {
    test(i, () => {
        const req = {
            query: {
                orderStr: i
            }
        };
        const json = jest.fn();
        const status = jest.fn(() => {
            return {
                json
            }
        })
        const res = {
            status
        }
        order(req, res);
        expect(json.mock.calls[0][0].message).toBe(testInputOutputJson[i]);
    });
}});