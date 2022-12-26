import React from "react";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Sceleton from '../components/pizzaBlock/Sceleton';

const Home = ()=>{
      const [items, setItems] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(true);
      const [categoryId, setCategoryId] = React.useState(0);
      const [sortType, setSortType]= React.useState(0);

  React.useEffect(()=>{
    setIsLoading(true)
   fetch(`https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
                        categoryId>0 ? `category=${categoryId}`:''}`)
     .then((res)=>{
        return res.json()
      })
     .then((arr)=>{
       setTimeout(()=>{
          setItems(arr);
          setIsLoading(false)},300)
      })
    window.scrollTo(0, 0)
  }, [categoryId])
 
    return (<>
               <div className="container">
                   <div className="content__top">
                     <Categories value={categoryId} onClickCategory={(i)=>setCategoryId(i)}/>
                     <Sort value={sortType} onChangeCategory={()=> setSortType()} />        
                   </div>
                <h2 className="content__title">Все пиццы {isLoading && " Загрузка ..."}</h2>
                <div className="content__items">
                {
                  isLoading ? [...new Array(6)].map((_ , index)=><Sceleton key={index}/> )
                  : items.map((obj)=><PizzaBlock {...obj} key={obj.id} />)
                }
                       {/* // items.map((obj)=>
                       {/* //  <PizzaBlock {...obj} key={obj.id} */}
                       {/* // Применяем spread оператор, чтобы сократить код :
                      //  key={obj.id} 
                      //  title={obj.title}
                      //  price={obj.price} 
                      //  imageUrl={obj.imageUrl} 
                      //  sizes={obj.sizes}  
                      //  types={obj.types} */}
                    </div>
                </div>
        </>)}

export default Home