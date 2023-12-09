import React, { Component } from 'react'

export default class StudenForm extends Component {
    state = {
        values: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },
        errors: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },
        isSubmit: false
    }

    handleChangeInput = (e) => {

        let tag = e.target;
        let dataType = e.target.getAttribute('data-type')

        let newValues = { ...this.state.values }
        newValues[tag.id] = tag.value;

        let newErrors = { ...this.state.errors }
        let messError = '';
        if (newValues[tag.id] === '') {
            messError = `${tag.id} cannot be blank !`
        } else {
            if (dataType) {
                switch (dataType) {
                    case 'number': {
                        let regexNumber = /^[0-9]{1,10}$/
                        if (!regexNumber.test(newValues[tag.id])) {
                            messError = `${tag.id} is invalid!`
                        }
                    }; break
                    case 'email': {
                        let regexEmail = /^\w+([\.-]\w+)*@\w+([\.-]\w+)*(\.\w{2,3})+$/
                        if (!regexEmail.test(newValues[tag.id])) {
                            messError = `${tag.id} is invalid!`
                        }
                    }; break
                    case 'name': {
                        let regexName = /^[a-zA-Z a-ỹ]+$/
                        if (!regexName.test(newValues[tag.id])) {
                            messError = `${tag.id} is invalid!`
                        }
                    }; break
                    default: { }
                }
            }
        }

        newErrors[tag.id] = messError

        let valid = true;
        for (let key in newErrors) {
            if (newErrors[key] !== '') {
                valid = false;
                break;
            }
        }
        for (let key in newValues) {
            if (newValues[key] === '') {
                valid = false;
                break;
            }
        }
        this.setState({
            values: newValues,
            errors: newErrors,
            isSubmit: valid
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let { addStudent } = this.props;

        addStudent(this.state.values);
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            values: newProps.studentEdit
        })
    }
    render() {

        // console.log(this.state);

        let { id, name, phone, email } = this.state.values;
        return (
            <form className='card' onSubmit={this.handleSubmit}>
                <div className='card-header bg-dark text-white'>Student information</div>
                <div className='card-body'>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="id">Student ID:</label>
                                <input
                                    data-type="number"
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    name="id"
                                    value={id}
                                    onInput={this.handleChangeInput} />
                                <p className='text text-danger'>{this.state.errors.id}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone">Phone number:</label>
                                <input value={phone} data-type="number" type="text" className="form-control" id="phone" name="phone" onInput={this.handleChangeInput} />
                                <p className='text text-danger'>{this.state.errors.phone}</p>

                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="name">Full name:</label>
                                <input type="text" data-type='name' className="form-control" id="name" name="name" onInput={this.handleChangeInput} value={name} />
                                <p className='text text-danger'>{this.state.errors.name}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email:</label>
                                <input type="text" data-type='email' className="form-control" id="email" name="email" onInput={this.handleChangeInput} value={email} />
                                <p className='text text-danger'>{this.state.errors.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <button disabled={!this.state.isSubmit} type="submit" className="btn btn-primary">Submit</button>

                    <button disabled={!this.state.isSubmit} type='button' className='btn btn-success mx-2' onClick={() => {
                        this.props.updateStudent(this.state.values)
                    }}>Update</button>
                </div>
            </form>
        )
    }
}