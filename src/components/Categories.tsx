import React from "react"

type CategoriiesProps = {
    value: number;
    onClickCategory: (i: number) => void; 
};
const Categories: React.FC<CategoriiesProps> = ({value, onClickCategory})=>{

const categories = ["Всі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Асорті"]

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