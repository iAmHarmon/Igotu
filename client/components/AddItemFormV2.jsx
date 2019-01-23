import React from 'react';
import Cards from '../containers/CardsContainer.jsx';

  const AddItemForm = props => {
    function handleChange(e) {
      //console.log(e.target.value);
      console.log(props.input);
      console.log('this is the fetched items',props.returnObjArr);
      props.getSearchInput(e.target.value);
    }
  
  let cardArr = [];
  if(props.returnObjArr){
    for(let i = 0; i < props.returnObjArr.length; i++){
      let info ={};
      info.item_name = props.returnObjArr[i].title;
      info.price = Math.floor((props.returnObjArr[i].highest_recorded_price)/10);
      info.item_details = '';
      if(props.returnObjArr[i].images[0]){
        info.photo = props.returnObjArr[i].images[0];
      }else{
        info.photo = '';
      }
      cardArr.push(info);
    }
  }
  console.log('this is the cardArr ', cardArr);
  let ItemCards = <div></div>;
  if(cardArr.length > 0){
    ItemCards = (
      <div>
        <Cards items={cardArr}/>
        <button>Add Item</button>
      </div>
    )
  }

    return (
      <div>
      <form onSubmit={e => {
        e.preventDefault();
        //console.log('event: ', props.input);
        props.fetchReturnedItems(props.input);
      }}
      onChange={handleChange}
      >
         <label>
         Add Item by UPC or Name:
        <input type="text" size="50"/>
        </label>
       <input type="submit" value="Submit" />
     </form>
     {ItemCards}
     </div>
    );
  }

export default AddItemForm;

