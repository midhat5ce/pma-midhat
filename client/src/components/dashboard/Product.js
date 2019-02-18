
import { withRouter } from 'react-router-dom';

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import { deleteExperience } from '../../actions/profileActions';

class Product extends Component{

    

       
    render(){
      
        console.log(this.props);

        return(
            <div>
                <h4 className="mb-4"> Products</h4>
                <table className="table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Base Price</th>
                    <th>Tax Price</th>
                    <th>Sale Price</th>
                    <th />
                    </tr>
                    
                    {/* {prod} */}
                </thead>
                </table>

            </div>
        )
    }
}

export default connect(null)(withRouter(Product));