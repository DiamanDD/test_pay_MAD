import { useState } from 'react'

export const usePayState = (sum: string, city_name: string, name: string) => {
    const [stateSpanName, setSpanName] = useState<boolean>(true)
    const [stateSpanCityName, setSpanCityName] = useState<boolean>(true)
    const [stateSpanSum, setSpanSum] = useState<boolean>(true)
    const [userName, setUserName] = useState(name)
    const [userCityName, setCityName] = useState(city_name)
    const [userSum, setSum] = useState(sum)

    return {
        stateSpanName,
        stateSpanCityName,
        stateSpanSum,
        userName,
        userCityName,
        userSum,
        setSpanName,
        setSpanCityName,
        setSpanSum,
        setUserName,
        setCityName,
        setSum,
    }
}
