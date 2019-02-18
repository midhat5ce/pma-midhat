import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
      const { user } = this.props.auth;
      const { profile } = this.props.profile;

      let dashboardContet = <h5>{user.name}</h5>
    return (
      <div>
        {dashboardContet}
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