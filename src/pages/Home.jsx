import React from "react";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Sceleton from '../components/pizzaBlock/Sceleton';
import { SearchContext } from "../App";

const Home = ()=>{
      const [items, setItems] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(true);
      const [categoryId, setCategoryId] = React.useState(0);

      const [sortType, setSortType]= React.useState({
        name:'популярности', sortProperty: 'rating'
      });
      const {searchValue} = React.useContext(SearchContext);
      const order = sortType.sortProperty.includes('-') ? 'ask' : 'desc';
      const search = searchValue ? `&search=${searchValue}`: '';
  React.useEffect(()=>{
    setIsLoading(true)
    fetch(`https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
                        categoryId>0 ? `category=${categoryId}`:''
                      }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
    )
     .then((res)=>{
        return res.json() 
      })
     .then((arr)=>{
       setTimeout(()=>{
          setItems(arr);
          setIsLoading(false)},300)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue])

   const pizzas = items.map((obj)=><PizzaBlock {...obj} key={obj.id} />);
     {/* // items.map((obj)=>
                      //  <PizzaBlock {...obj} key={obj.id}
                      // Применяем spread оператор, чтобы сократить код :
                      //  key={obj.id} 
                      //  title={obj.title}
                      //  price={obj.price} 
                      //  imageUrl={obj.imageUrl} 
                      //  sizes={obj.sizes}  
                      //  types={obj.types} */}
    return (<>
               <div className="container">
                   <div className="content__top">
                     <Categories value={categoryId} onClickCategory={(i)=>setCategoryId(i)}/>
                     <Sort value={sortType} onChangeSort={(i)=> setSortType(i)} />        
                   </div>
                <h2 className="content__title">Все пиццы {isLoading && " Загрузка ..."}</h2>
                <div className="content__items">
                {
                  isLoading ? [...new Array(6)].map((_ , index)=><Sceleton key={index}/> )
                  : pizzas
                }
                     
                    </div>
                </div>

               
                 
                
        </>)}

export default Home