import React from "react"

type CategoriesProps = {
    value : number;
    onClickCategory: (i: number)=>void
}

const categories = ['Всі', "M'ясні", 'Вегетаріанскі', 'Гріль', 'Гострі', 'Асорті']
const Categories : React.FC<CategoriesProps> = ({value, onClickCategory})=>{

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