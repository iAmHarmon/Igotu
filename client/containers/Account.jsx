import React from 'react';

import MyListings from '../components/MyListings.jsx';
import UserInfo from '../components/UserInfo.jsx';
import AddItemFormV2 from '../components/AddItemFormV2.jsx';

const Account = props => {
  return (
    <div>
      <div>
        <UserInfo />
        <MyListings />
      </div>
      <div>
        <button>Add Item</button>
      </div>
      <AddItemFormV2 fetchReturnedItems={props.fetchReturnedItems}
      getSearchInput={props.getSearchInput}
      input={props.input} />
    </div>
  );
};

export default Account;
