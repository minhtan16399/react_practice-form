import React, { Component } from 'react'
import StudenForm from './StudenForm'

export default class ReactForm extends Component {
    state = {
        arrStudent: [
        ],
        studentEdit: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },
        findStudent: []
    }

    addStudent = (newStudent) => {
        this.state.arrStudent.push(newStudent)

        this.setState({
            arrStudent: this.state.arrStudent,
            findStudent: this.state.arrStudent
        })
    }

    updateStudent = (studentUpdate) => {

        let student = this.state.arrStudent.find(pro => pro.id === studentUpdate.id);

        if (student) {
            for (let key in student) {
                student[key] = studentUpdate[key]
            }
        }

        this.setState({
            arrStudent: this.state.arrStudent
        })

    }

    deleteStudent = (studentID) => {

        this.state.arrStudent = this.state.arrStudent.filter(prod => prod.id !== studentID)

        this.setState({
            arrStudent: this.state.arrStudent
        })
    }

    editStudent = (studentClick) => {
        this.setState({
            studentEdit: studentClick
        })
    }

    findStudent = (studentName) => {
        this.state.findStudent = this.state.arrStudent.filter(stud => {
            return stud.name.toLowerCase().includes(studentName.toLowerCase());
        })
        this.setState({
            findStudent: this.state.findStudent,
            // arrStudent: this.state.findStudent,
        })
        console.log(this.state.findStudent);
        console.log(this.state.arrStudent);
    }

    render() {
        return (
            <div className='container'>
                <h3 className="text-center my-3">Student management</h3>
                <StudenForm updateStudent={this.updateStudent} studentEdit={this.state.studentEdit} addStudent={this.addStudent} />
                <div className="container-fluid mt-5 w-50">
                    <form className="d-flex " role="Find">
                        <input className="form-control me-2" type="find" id="Find" placeholder="Find . . ." aria-label="Find" onChange={(e) => {
                            let keySearch = e.target.value;
                            this.findStudent(keySearch)
                        }} />
                    </form>
                </div>
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th className='bg-dark text-white'>Student ID</th>
                            <th className='bg-dark text-white'>Full name</th>
                            <th className='bg-dark text-white'>Phone number</th>
                            <th className='bg-dark text-white'>Email</th>
                            <th className='bg-dark text-white'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.findStudent.map((student) => {
                            return <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.phone}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button onClick={() => {
                                        this.deleteStudent(student.id)
                                    }} className='btn btn-danger'><i className='fa fa-close'></i></button>

                                    <button onClick={() => {
                                        this.editStudent(student);
                                    }} className='btn btn-primary mx-2'><i className='fa fa-edit'></i></button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
