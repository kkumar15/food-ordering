import { useEffect, useState } from "react"

export const ShowMealsComponent = ({ }) => {
    const [data, setData] = useState([])
    useEffect(async () => {
        let response = await fetch(process.env.NEXT_PUBLIC_MEAL_API)
        let jsonResponse = await response.json()
        if (jsonResponse.status = 200 && jsonResponse.data) {
            setData(jsonResponse.data)
        }
    }, [])
    return (<>
        {
            data.map(eachItem => {
                return (<a href={"/meals/" + eachItem.id} id={eachItem.id} className="card">
                    <h3>{eachItem.label}</h3>
                    <p>{eachItem.description}</p>
                </a>)
            })
        }
    </>)
}