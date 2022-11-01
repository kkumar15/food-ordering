import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function MealsView() {
    const router = useRouter()
    const [data, setData] = useState([])
    const orderUrl = process.env.NEXT_PUBLIC_ORDER_API
    useEffect(async () => {
        if (router.isReady) {
            let id = router.query.id
            let url = process.env.NEXT_PUBLIC_MENU_API.replace(":id", id)
            let jsonResponse = await (await fetch(url)).json()
            setData(jsonResponse.data)
            console.log(jsonResponse)
        }

    }, [router.query.id])
    const orders = {}
    const quantityJson = {}
    const quantityChange = (e) => {
        let id = e.target.id
        if (orders[id]) {
            orders[id] = e.target.value
        }
        quantityJson[id] = e.target.value
    }
    const selectItem = (e) => {
        let id = e.target.id
        if (e.target.checked) {
            if (!quantityJson[id]) {
                quantityJson[id] = 1
            }
            orders[id] = quantityJson[id]
        } else {
            delete orders[id]
        }
    }
    const callOrder = async () => {
        let id = router.query.id
        let tempArray = []
        for (let order in orders) {
            let count = orders[i]
            for (let j = 0; j < count; j++) {
                tempArray.push(order)
            }
        }
        let url = orderUrl.replace(":id", `${id} ${tempArray.join(",")}`)
        let response = await (await fetch(url)).json()
        alert(response.message)
    }

    return (
        <>
            <table className="border-collapse table-auto w-[50%] text-sm mx-auto mt-6">
                <thead>
                    <tr>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"> food </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"> Quantity </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"> Select </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                    {
                        Object.keys(data).map(item => {
                            return (
                                <>
                                    <tr>
                                        {data[item].map(foodDetail => {
                                            return (
                                                <>

                                                    <td key={foodDetail.id} id={foodDetail.id}>{foodDetail.label}&nbsp;({item})</td>
                                                    <td><input placeholder="1" id={foodDetail.id} key={item + " " + foodDetail.id} type="number" min={1} max={10} onChange={quantityChange} /></td>
                                                    <td><input key={item + " " + foodDetail.id} type="checkbox" onChange={selectItem} id={foodDetail.id} /></td>
                                                </>
                                            )
                                        })}
                                    </tr>
                                </>
                            )
                        })
                    }
                    <tr>
                        <td></td>
                        <td>
                            <button onClick={callOrder} className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}