import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from '../components/Categories';
import {Sort} from '../components/Sort';
import {list} from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Sceleton from '../components/pizzaBlock/Sceleton';
import { SearchContext } from "../App";
import { setCategoryId } from "../redux/slices/filterSlice";
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = ()=>{
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const categoryId = useSelector((state) => state.filter.categoryId);    
      const items = useSelector((state) => state.pizzaS.items);

      // const sort = useSelector(selectrFilter); уже не нужен используем редукс.
      const isSearch = React.useRef(false);
      const isMounted = React.useRef(false);

      const {searchValue} = React.useContext(SearchContext);
      const sortType = useSelector((state) => state.filter.sort);
      const [isLoading, setIsLoading] = React.useState(true);

      const onChangeCategory = (id)=>{
              dispatch(setCategoryId(id))
      }   
      const order = sortType.sortProperty.includes('-') ? 'ask' : 'desc';
      const search = searchValue ? `&search=${searchValue}`: '';

      
const getPizzas = async ()=>{
      setIsLoading(true)      
try{
  // const res = await axios.get(`https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
  //               categoryId>0 ? `category=${categoryId}`:''
  //               }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
  //             )
      dispatch( fetchPizzas({order, search, sortType, categoryId}) )
                          
      setIsLoading(false);
}
catch(error){
     setIsLoading(false);
     alert("Ошибка при загрузке.")
}

};
 // Если был первый рендер, то запрашиваем пиццы
React.useEffect(() => {
  window.scrollTo(0, 0);

  if (!isSearch.current) {
    getPizzas();
  } 
  isSearch.current = false;
}, [categoryId, sortType, searchValue]);

 // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
 React.useEffect(() => {
  if (window.location.search) {
    const params = qs.parse(window.location.search.substring(1));

    const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

    dispatch(
      setFilters({
        ...params,
        sort,
      }),
    );
    isSearch.current = true;
  }
}, []);


 // Если изменили параметры и был первый рендер
 React.useEffect(() => {
  if (isMounted.current) {
    const queryString = qs.stringify({
      sortType: sortType,
      // ????????????????????????????????
      categoryId,
    });

    navigate(`?${queryString}`);
  }
  isMounted.current = true;
}, [categoryId, sortType]);

// _________________________________________________________________
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
  
    return (
            <>
               <div className="container">
                   <div className="content__top">
                     <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                     <Sort />        
                   </div>
                   <h2 className="content__title">Все пиццы {isLoading && " Загрузка ..."}</h2>
                   <div className="content__items">
                       {
                         isLoading ? [...new Array(6)].map((_ , index)=><Sceleton key={index}/> )
                         : pizzas
                       }
                    </div>
                </div>        
            </>
        )}

export default Home