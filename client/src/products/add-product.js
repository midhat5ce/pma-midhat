import React ,{ Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../c/TextFieldGroup';
import {addProduct} from '../actions/profileActions';

class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            description: '',
            quantity: '',
            basePrice: '',
            taxRate: '',
            salePrice: '',
            created: '',
            errors:{}

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


 
    onSubmit(e){
        e.preventDefault();

        const productData = {
            name: this.state.name,
            description: this.state.description,
            quantity: this.state.quantity,
            basePrice: this.state.basePrice,
            taxRate: this.state.taxRate,
            salePrice: this.state.salePrice
        };

        // this.props.addProduct(productData,this.props.history);

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        const { errors } = this.state;
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                            Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Product</h1>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                errors={errors.name}
                                />
                                <TextFieldGroup
                                placeholder="Description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                errors={errors.description}
                                />
                                <TextFieldGroup
                                placeholder="Quantity"
                                type="number"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={this.onChange}
                                errors={errors.quantity}
                                />
                                <TextFieldGroup
                                placeholder="Base Price"
                                name="basePrice"
                                value={this.state.basePrice}
                                onChange={this.onChange}
                                errors={errors.basePrice}
                                />
                                <TextFieldGroup
                                placeholder="Tax Rate"
                                name="taxRate"
                                value={this.state.taxRate}
                                onChange={this.onChange}
                                errors={errors.taxRate}
                                />
                                <TextFieldGroup
                                placeholder="Sale Price"
                                name="salePrice"
                                value={this.state.salePrice}
                                onChange={this.onChange}
                                errors={errors.salePrice}
                                />
                                

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addProduct})(withRouter(AddProduct));