import React from "react";
import { Link } from "react-router-dom";
import cartEmptyPng from '../assets/img/empty-cart.png';
const CartEmpty = ()=>{
    return (
        <>
        <div className="cart cart--empty">
           <h2>Кошик пустий</h2>
           <img src={cartEmptyPng} alt="Empty Cart"></img>
           <Link to ="/" className="button button--outline button--add go-back-btn">
                  <span>Повернутися на головну сторінку</span>
           </Link>
        </div>
        </>
    )
}

export default CartEmpty;