import React from 'react';

const Search = props => {
  function handleChange(e) {
    console.log(e.target.value);
    props.searchBoxChange(e.target.value);
  }
  return (
    <div id="search-bar">
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('event: ', props.searchValue);
          props.fetchSearchedItems(props.searchValue);
        }}
        onChange={handleChange}
      >
        <input type="search" name="searchbox" defaultValue={props.searchValue} size="35" />
      </form>
    </div>
  );
};

export default Search;
