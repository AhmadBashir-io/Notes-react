import React from 'react';
import PropTypes from 'prop-types';
import { Form , Button, } from 'semantic-ui-react';
import Validator from 'validator';
import InLineError from '../messages/InLineError';
class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: '',
        },
        loading: false,
        errors:{}
    };

    onChange = e =>
    this.setState({
        data:{ ...this.state.data, [e.target.name]: e.target.value}
    })

    onSubmit = () =>{
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email, Please try again"
        if(!data.password) errors.password = "Fields must be completed please."
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
          <Form onSubmit={this.onSubmit}>
              <Form.Field error={!!errors.email}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@site.com"
                    value={data.email}
                    onChange={this.onChange}
                  />
                  {errors.email && <InLineError text={errors.email} />}
              </Form.Field>
              
              <Form.Field error={!!errors.password}>
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Secret Password here"
                    value={data.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <InLineError text={errors.password} />}
              </Form.Field>

            <Button primary>Login</Button>
          </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
export default LoginForm;