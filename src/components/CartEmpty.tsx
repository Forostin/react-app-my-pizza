import React from "react";
import { Link } from "react-router-dom";
import cartEmptyPng from '../assets/img/empty-cart.png';
const CartEmpty : React.FC = ()=>{
    return (
        <>
        <div className="cart cart--empty">
           <h2>Корзина пустая</h2>
           <img src={cartEmptyPng} alt="Empty Cart"></img>
           <Link to ="/" className="button button--outline button--add go-back-btn">
                  <span>Вернуться на главную страницу</span>
           </Link>
        </div>
        </>
    )
}

export default CartEmpty;