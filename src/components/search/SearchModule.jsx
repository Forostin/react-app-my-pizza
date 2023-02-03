import React from "react";
import { useRef } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";
import styles from './Search.module.scss'
import { useState } from "react";

const Search = ()=>{
    const [value, setValue] = useState('')
    const {setSearchValue} = React.useContext(SearchContext);
    const inputRef = useRef(null);
    const onClickClear = ()=>{
              setSearchValue('');
              setValue('');
              inputRef.current.focus();
    }
    const updateSearchValue = React.useCallback(
       debounce((str)=>{
          console.log(str);
          setSearchValue(str);
       }, 1000),
       [],
    )
    const onChangeInput = (event)=>{
          //     setSearchValue(event.target.value)
          setValue(event.target.value)
          updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
          <svg className={styles.icon}
               enableBackground="new 0 0 26 26" id="Слой_1" version="1.1" viewBox="0 0 26 26"  xmlns="http://www.w3.org/2000/svg"><path d="M14.9462891,1C9.4033203,1,4.8935547,5.5097656,4.8935547,11.0532227  c0,2.5022583,0.9248047,4.7885132,2.4428101,6.5498657l-6.1166382,6.1166382c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266l6.1165771-6.1165771  c1.7612305,1.5180054,4.0474243,2.442749,6.5494385,2.442749C20.4902344,21.1064453,25,16.5966797,25,11.0532227  S20.4902344,1,14.9462891,1z M14.9462891,19.6064453c-4.7158203,0-8.5527344-3.8369141-8.5527344-8.5532227  S10.2304688,2.5,14.9462891,2.5C19.6630859,2.5,23.5,6.3369141,23.5,11.0532227S19.6630859,19.6064453,14.9462891,19.6064453z" fill="#1D1D1B"/>
          </svg>     
          <input 
               ref = {inputRef}
               value={value}
               onChange={onChangeInput}
               className={styles.input} 
               placeholder="Поиск пиццы..." 
          />
           {value && (  
                <svg onClick={()=> onClickClear() }               
                     className={styles.iconClear}
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></g>
                </svg>   
           )}
        </div>
    )
}
export default Search