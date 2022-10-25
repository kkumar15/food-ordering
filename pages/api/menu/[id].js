import { getMenuForMeals } from "../../../services/menu"

export default async function handler(req, res) {
    try {
        const id = req.query.id
        let menuForMeal = getMenuForMeals(id)
        return res.status(menuForMeal.status).json(menuForMeal)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: []
        })
    }
}