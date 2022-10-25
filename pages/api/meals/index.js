import { getMealsForTheDay } from "../../../services/meals"

export default async function handler(req, res) {
    try {
        let offerings = getMealsForTheDay()
        return res.status(offerings.status).json(offerings)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: []
        })
    }
}