import React from 'react';

  const AddItemForm = props => {
    function handleChange(e) {
      //console.log(e.target.value);
      console.log(props.input);

      props.getSearchInput(e.target.value);
    }

    return (
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
    );
  }

export default AddItemForm;

