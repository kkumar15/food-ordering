import { placeOrder } from "../../../services/order"


export default async function handler(req, res) {
    try {
        const orderStr = req.query.orderStr
        if (!orderStr) {
            return res.status(400).json({
                status: 400,
                data: '',
                message: 'Mandatory param order-str missing, Cannot place order'
            })
        }
        let [meal, order] = orderStr.split(" ")
        let orderDetails = placeOrder((meal || ""), (order || ""))
        return res.status(orderDetails.status).json(orderDetails)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: ""
        })
    }
}