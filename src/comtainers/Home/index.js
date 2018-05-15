import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import './Home.scss';
import LOVE from '../'
class IndexSearch extends Component {
  state = {
  };
  render() {
    return (
      <div>
        <div className="box-title flex-row-space-between">
          <h2 className="title-left">xxxx</h2>
          <div className="right-box-title">
            <div className="pin-category">
            </div>
            <a className="right-box-title-link" to='/'>
              <span>Đọc thêm</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexSearch;