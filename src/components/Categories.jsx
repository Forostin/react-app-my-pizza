import React from "react"

function Categories({value, onClickCategory}){

const categories = ['Всі', "M'ясні", 'Вегетаріанскі', 'Гріль', 'Гострі', 'Закриті']

return (
    <div className="categories">
        <ul>
            {
               categories.map((categoryName, i) =>
                  <li key={i} onClick={()=>onClickCategory(i)} 
                      className={value === i ? 'active' : ""} >{categoryName}
                  </li>
               ) 
            }  
        </ul>
    </div>
)
}

export default Categories