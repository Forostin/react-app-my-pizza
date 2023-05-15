import React from "react"

type CategoriiesProps = {
    value: number;
    onClickCategory: (i: number) => void; 
};
const Categories: React.FC<CategoriiesProps> = ({value, onClickCategory})=>{

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Ассорти']

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