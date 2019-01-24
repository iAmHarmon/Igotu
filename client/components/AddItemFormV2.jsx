import React from 'react';
import Cards from '../containers/CardsContainer.jsx';
import Card from './Card.jsx';

  const AddItemForm = props => {
    function handleChange(e) {
      //console.log(e.target.value);
      console.log(props.input);
      console.log('this is the fetched items',props.returnObjArr);
      props.getSearchInput(e.target.value);
    }
    function addItemtoDB(e) {
      let hello = 'hello';
      fetch('/addItem', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(cardArr[e.target.id])
        body: JSON.stringify(cardArr[e.target.id])
      }).then(()=> console.log('completed fetch'))
    }
  //create a card array to display information returned from the api call
  let cardArr = [];
  if(props.returnObjArr){
    for(let i = 0; i < props.returnObjArr.length; i++){
      let info ={};
      info.item_name = props.returnObjArr[i].title;
      info.price = Math.floor((props.returnObjArr[i].highest_recorded_price)/10);
      info.item_details = '';
      info.created_at = new Date();
      if(props.returnObjArr[i].images[0]){
        info.photo = props.returnObjArr[i].images[0];
      }else{
        info.photo = '';
      }
      cardArr.push(info);
    }
  }
  console.log('this is the cardArr ', cardArr);
  //create the element to display the cards
  let ItemCards = <div></div>;
  // if(cardArr.length > 0){
  //   ItemCards = (
  //     <div>
  //       <Cards items={cardArr}/>
  //       <button>Add Item</button>
  //     </div>
  //   )
  // }
  if(cardArr.length > 0){
    let cardDiv = [];
    for(let i = 0; i < cardArr.length; i ++){
       let cardItem = <div><button onClick={addItemtoDB} id={i}>Add Item</button><Card info={cardArr[i]}/></div>
       cardDiv.push(cardItem);
    }
    ItemCards = (
      <div>
        {cardDiv}
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
        <input type="text"  size="50"/>
        </label>
       <input type="submit" value="Submit" />
     </form>
     {ItemCards}
     </div>
    );
  }

export default AddItemForm;

