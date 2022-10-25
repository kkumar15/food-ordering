// this file could be a json file
// since json file does not let comments to be added, I have changed this file to .js
export const menudb = {

    // orderLevelRule that defines rules that is needed for a person to place order on a whole order level
    "orderLevelRule": {
        // this is json with key being the menu?.items keys, value being the error message when the rule is missing
        // even if this json was made empty, One order id is needed to pass for the order to be placed
        "mandatory": {
            "main": "main is missing", // main becomes mandatory for every meal by default
            "side": "side is missing" // side behaves same as main
        }
    },
    // this is made json so that when the key is passed from front end its super quick to access
    "offering": {
        // these keys can be anything and front end needs to pass this
        "Breakfast": {
            "label": "Breakfast", // label serves as text for the front end and serves only that purpose
            "identifier": "br", // used identifier as a way to fetch everything in menu, so if the Breakfast key is changed to xyz, it still wont break the code
            "desc": "a meal eaten in the morning, the first of the day.",
            "rulesForOrder": {
                "mandatory": {}
            }
        },
        "Lunch": {
            "label": "Lunch",
            "identifier": "lu",
            "desc": "a meal eaten in the middle of the day, typically one that is lighter or less formal than an evening meal.",
            "rulesForOrder": {
                "mandatory": {
                    //"drink": "drink is missing"
                }
            }
        },
        "Dinner": {
            "label": "Dinner",
            "identifier": "dn",
            "desc": "the main meal of the day, taken either around midday or in the evening.",
            "rulesForOrder": {
                "mandatory": {
                    "desert": "desert is missing" // this is a meal level rule, So desert is mandatory for dinner meal but not fore lunch and breakfast
                }
            }
        }
    },
    "menu": {
        "item": {
            // these are the menu items which can be ordered in the resturant
            "main": {
                "meals": {
                    // these keys represent the identifier in the above object, so if you change identifier make sure to change it in these below keys as well
                    "br": {
                        "1": {
                            "label": "Eggs", // Label for front end and the out put
                            "availableQuantity": 1000, // just a key which is not being used but can be used as a way to track quantity available in the future
                            "canOrderMoreThanOne": false // this acts like a rule that says can this item be ordered more then once together
                        }
                    },
                    "lu": {
                        "1": {
                            "label": "Sandwich",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": false
                        }
                    },
                    "dn": {
                        "1": {
                            "label": "Steak",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": false
                        }
                    }
                }
            },
            "side": {
                "meals": {
                    "br": {
                        "2": {
                            "label": "Toast",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": false
                        }
                    },
                    "lu": {
                        "2": {
                            "label": "Chips",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": true
                        }
                        // if subsitute key is added to this 
                        // then it behaves like - sides in lunch when not ordered, some value will be picked from the subsitute key
                    },
                    "dn": {
                        "2": {
                            "label": "Potatoes",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": false
                        }
                    }
                },
            },
            "drink": {
                "meals": {
                    "br": {
                        "3": {
                            "label": "Coffee",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": true
                        },
                        // acts as subsitute when the order is missing from the user
                        // since their is a clause in assignment that shows that water has be given if drink is not ordered
                        // this is used
                        "substitue": {
                            "label": "Water",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": true
                        }
                    },
                    "lu": {
                        "3": {
                            "label": "Soda",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": false
                        },
                        "substitue": {
                            "label": "Water",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": true
                        }
                    },
                    "dn": {
                        "3": {
                            "label": "Wine",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": false
                        },
                        "substitue": {
                            "label": "Water",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": true
                        }
                    }
                }
            },
            "desert": {
                "meals": {
                    "br": {},
                    "lu": {},
                    "dn": {
                        "4": {
                            "label": "Cake",
                            "availableQuantity": 1000,
                            "canOrderMoreThanOne": false
                        }
                    }
                }
            }
        },

        // this key acts like default value, which get added to all the order
        "default": {
            "meals": {
                "br": [],
                "lu": [],
                "dn": [
                    "Water" // since in the assignment water is always needed to be served with food, it comes under default key
                ]
            }
        }
    },

    // this is very important as the incoming order is not mentioned in the input
    // ideally the Input should be breakfast main=1,side=2,drink=3
    "incomingOrder": [
        "main",
        "side",
        "drink",
        "desert"
    ],
    // when tweaked here the output order can be changed, acccording to assignment the order should be like - main,side,drink,default,desert
    // the test case has water for dinner before desert so I have created this output order json
    "returningOrder": {
        "main": 0,
        "side": 1,
        "drink": 2,
        "default": 3,
        "desert": 4
    }
}