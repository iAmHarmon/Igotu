/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationContainer from './NavigationContainer.jsx';
import Cards from './CardsContainer.jsx';
import types from '../constants/actionTypes';
import * as actions from '../actions/actions';
import AddItemForm from '../components/AddItemForm.jsx';
import Login from '../components/Login';
import Account from './Account';

// use this.props.cards to access state in our components below
const mapStateToProps = store => ({
  cards: store.cards,
  addItem: store.addItem
  // search: store.search
});

// need to add all our action creators here
const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => {
    dispatch(actions.fetchItemsData());
  },
  fetchSearchedItems: value => {
    dispatch(actions.fetchSearchedItems(value));
  },
  searchBoxChange: value => {
    dispatch(actions.searchValueChange(value));
  },
  fetchCategory: value => {
    dispatch(actions.fetchCategoryItems(value));
  },
  fetchReturnedItems: value => {
    dispatch(actions.fetchReturnedItems(value));
  },
  getSearchInput: value => {
    dispatch(actions.getSearchInput(value));
  }

});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllItems();
  }

  render() {
    // console.log('here are ur props ',this.props.cards.items);
    return (
      <Router>
        <div>
          <div id="navdiv">
            <NavigationContainer
              fetchSearchedItems={this.props.fetchSearchedItems}
              fetchCategory={this.props.fetchCategory}
              searchValue={this.props.cards.searchBoxValue}
              searchBoxChange={this.props.searchBoxChange}
            />
          </div>

          <Switch>
            <Route exact path="/Login" render={() => <Login />} />
            <Route exact path="/Account" render={() => <Account fetchReturnedItems={this.props.fetchReturnedItems}
            getSearchInput={this.props.getSearchInput}
            input={this.props.addItem.input}
            returnObjArr={this.props.addItem.returnObjArr}/>} />
            <Route
              exact
              path="/"
              render={() => (
                <div id="cardsdiv">
                  <Cards
                    items={this.props.cards.items}
                    fetchFlag={this.props.cards.fetching}
                    loading={this.props}
                  />
                </div>
              )}
            />
          </Switch>

          {/* <AddItemForm /> */}
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
