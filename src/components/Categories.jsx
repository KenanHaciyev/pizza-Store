import { useState } from "react"

function Categories() {
    const [activeIndx, setActiveIndex] = useState(0)
    const categories = ["Все", "Мясные", "Вегетерианская", "Гриль", "Острые", "Закрытые"]

    function onClickCategory(i) {
        setActiveIndex(i)
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, i) => {
                        return (
                            <li key={i} onClick={() => onClickCategory(i)} className={activeIndx === i ? "active" : null}>{value}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Categories