import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import Product from './Product';

class Dashboard extends Component {
  componentDidUpdate() {
    this.props.getCurrentProfile();
    
  }   
  

  render() {
      const { user } = this.props.auth;
      const { profile } = this.props.profile;
  
       
     

       
    return (
      <div>
        <h5>Name : {user.name}</h5>
        <Link to="/add-product" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Product
      </Link>
      
      <Product products={profile} />

      </div>
    );
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);