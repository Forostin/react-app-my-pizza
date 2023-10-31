import React  from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import qs from 'qs'
import { useNavigate } from "react-router-dom";
// import { SearchContext } from "../App";
// import Sort, { list }  from '../components/Sort';
// import { setCategoryId, setFilters } from "../redux/slices/filterSlice";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Sceleton from '../components/pizzaBlock/Sceleton';

import { setCategoryId} from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/pizzasSlice";
import { RootState } from "../redux/store";
import { current } from "@reduxjs/toolkit";

const Home: React.FC = ()=>{
      const items = useSelector((state: RootState) => state.pizzas.items)
      const categoryId = useSelector((state: RootState) => state.filter.categoryId);
      const sortType = useSelector((state : RootState) => state.filter.sort)
      const searchValue = useSelector ((state :RootState) => state.filter.searchValue)

      const isSearch = React.useRef(false)
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const isMounted = React.useRef(false);
      const onChangeCategory = (id : number) => {
              dispatch( setCategoryId(id) )
      }
      const [isLoading, setIsLoading] = React.useState(true);
     
      // const {searchValue} = React.useContext(SearchContext);
      const order = sortType.sortProperty.includes('-') ? 'ask' : 'desc';
      const search = searchValue ? `&search=${searchValue}`: '';
  
    // Если первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);
            if (!isSearch.current) {
            fetchPizzas();
            }
        isSearch.current = false;
    }, [categoryId, searchValue, sortType, search, order]);
  
 
    const fetchPizzas = async () => {    
          setIsLoading(true)
    // fetch(`https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
    //                     categoryId>0 ? `category=${categoryId}`:''
    //                   }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
    // )  .then((res)=>{
    //     return res.json() 
    //     })
    //    .then((arr)=>{
    //       setTimeout(()=>{
    //       setItems(arr);
    //       setIsLoading(false)},300)
    //     }),    [categoryId, sortType, search, order])
        try {
           const res = await  axios.get(`https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
                     categoryId>0 ? `category=${categoryId}`:''
                     }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
                     )   
                dispatch(setItems(res.data))  
                setIsLoading(false);
        } catch (error){ alert("Помилка при отримаанні піц. Спробуйте пизніше") }      
        window.scrollTo(0, 0)
    }

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, search , order, navigate]);

    
  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = list.find(list => list.sortProperty === params.sortProperty);
  //     // const name = list.find(list => list.nameSort === params.sortProperty)
  //     console.log(params)
  //     if(sort){
  //       params.sort = sort
  //     }
  //     dispatch(
  //       setFilters({
  //       params,
  //       // name,
  //       // sort,
  //       }),
  //     );
  //     // isSearch.current = true;
  //     isMounted.current = true;
  //   }
  // }, []);

   const pizzas = items.map((obj: any)=><PizzaBlock {...obj} key={obj.id} />)
    //  {/* // items.map((obj)=>
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
                   <h2 className="content__title">Всі піци {isLoading && " Завантаження ..."}</h2>
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