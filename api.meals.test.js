import meals from "./pages/api/meals/index"
import meals from "./pages/api/menu/[id]"
test('calculates order total', () => {
    const req = {};

    const res = {
        status: function (status) {
            console.log(status, "status")
            return this
        },
        json: function (object) {
            console.log(object, "object")
            return this
        }
    }
    meals(req, res);
    
});

test('calculates order total', () => {
    const req = {
        query: {
            id: "Breakfast"
        }
    };

    const res = {
        status: function (status) {
            console.log(status, "status")
            return this
        },
        json: function (object) {
            console.log(object, "object")
            return this
        }
    }
    meals(req, res);
});