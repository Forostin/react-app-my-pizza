import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import qs from 'qs'
import { useNavigate } from "react-router-dom";

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Sceleton from '../components/pizzaBlock/Sceleton';
import { SearchContext } from "../App";

import { setCategoryId, setFilters } from "../redux/slices/filterSlice";


const Home = ()=>{
      const categoryId = useSelector((state) => state.filter.categoryId);
      const sortType = useSelector((state) => state.filter.sort)
      const isSearch = React.useRef(false)
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const onChangeCategory = (id)=>{
              dispatch(setCategoryId(id))
      }
      
      const [items, setItems] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(true);
     
      const {searchValue} = React.useContext(SearchContext);
      const order = sortType.sortProperty.includes('-') ? 'ask' : 'desc';
      const search = searchValue ? `&search=${searchValue}`: '';

  React.useEffect(()=>{
    if(window.location.search){
         const params = qs.parse(window.location.search.substring(1))
         const sort = list.find(list => list.sortProperty === params.sortProperty )

        //  dispatch(
        //      setFilters({
        //          ...params,
        //             sort
        //      })
        //  )

        isSearch.carent = true
        console.log(sort)
    }
  })

    // Если изменили параметры и был первый рендер
    // React.useEffect(() => {
    //   if (isMounted.current) {
    //     const queryString = qs.stringify({
    //       sortProperty: sort.sortProperty,
    //       categoryId,
    //       currentPage,
    //     });
  
    //     navigate(`?${queryString}`);
    //   }
    //   isMounted.current = true;
    // }, [categoryId, sort.sortProperty, currentPage]);
  
    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
    // React.useEffect(() => {
    //   if (window.location.search) {
    //     const params = qs.parse(window.location.search.substring(1));
  
    //     const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
  
    //     dispatch(
    //       setFilters({
    //         ...params,
    //         sort,
    //       }),
    //     );
    //     isSearch.current = true;
    //   }
    // }, []);
  
    // Если был первый рендер, то запрашиваем пиццы
    // React.useEffect(() => {
    //   window.scrollTo(0, 0);
  
    //   if (!isSearch.current) {
    //     fetchPizzas();
    //   }
  
    //   isSearch.current = false;
    // }, [categoryId, sort.sortProperty, searchValue, currentPage]);
// ++++++++++++++++++++++++++

  React.useEffect(()=>{
    setIsLoading(true)
    // fetch(`https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
    //                     categoryId>0 ? `category=${categoryId}`:''
    //                   }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
    // )
    //  .then((res)=>{
    //     return res.json() 
    //   })
    //  .then((arr)=>{
    //    setTimeout(()=>{
    //       setItems(arr);
    //       setIsLoading(false)},300)
    //   })
      axios.get(`https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
                  categoryId>0 ? `category=${categoryId}`:''
                  }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
                )
                .then((res)=>{
                   setItems(res.data);
                   setIsLoading(false);
                })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, search, order])

  React.useEffect(()=>{
     const qeryString = qs.stringify({
         sortProperty: sortType.sortProperty,
         categoryId
     })
     navigate(`?${qeryString}`)
  }, [categoryId, sortType]  )

   const pizzas = items.map((obj)=><PizzaBlock {...obj} key={obj.id} />)
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