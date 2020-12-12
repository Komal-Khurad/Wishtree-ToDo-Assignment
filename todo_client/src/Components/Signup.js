import React, { Component } from 'react'
import axios from 'axios';

export class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fName:'',
            lName:'',
            gender:'',
            dob:'',
            email:'',
            password:'',

            fNameError: '',
            lNameError: '',
            dobError: '',
            emailError:'',
            passwordError: ''
        }
    }

    validateForm = async () =>{
        const {fName, lName, dob, email, password} = this.state;

        var isValid = true;

        if(fName===''){
            this.setState({
                fNameError: 'First name is required'
            })
            isValid = false
        }
       
        else if(fName!==''){
            this.setState({
                fNameError: ''
            })
            isValid = true
        }

        if(lName===''){
            console.log('inside lNamw validation')
            this.setState({
                lNameError: 'Last name is required'
            })
            isValid = false
        }
        else if(lName!==''){
            this.setState({
                lNameError: ''
            })
            isValid = true
        }
        if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/)){
            this.setState({
                emailError: 'Email should contain @ and .'
            })
            isValid = false
            
        }
        else if(email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/)){
            this.setState({
                emailError: ''
            })
            isValid = true
        }
        if(!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/))
        {
            this.setState({
                passwordError: 'Password must have 1 special symbol, 1 capital and length must be 8 charactr or greater '
            })
            isValid = false
        }
        else if(password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)){
            this.setState({
                passwordError: ''
            })
            isValid = true
        }
       
        return isValid;
    }

    changeHandler = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = async (e) =>{
        e.preventDefault();
        const { fName, lName, gender, dob, email, password } = this.state;

        // const users = await axios.get('http://localhost:1337/users');
        // console.log('users in db', users);

        const validForm = this.validateForm();
    
        if(validForm) {
            const user = {
                fName,
                lName,
                gender,
                dob,
                email,
                password,
                isActive: true,
            }
           
            axios.post('http://localhost:1337/user/register', user)
                .then( (res)=>{
                    alert('User Registred successfully! Check Your email to confirm your account')

                    this.props.history.push('/login');
                })
                .catch( (err)=> console.log(err))
        }
        
        this.setState({
            fName:'',
            lName:'',
            gender:'',
            dob:'',
            email:'',
            password:'',
        })
    }

    render() {
        return (
            <div className='container'>
                
                <center>
                <h2>User Signup</h2>
                    <form className='form' onSubmit={this.submitHandler} autoComplete='off'>

                        <div className='form-group'>
                            <label>First Name</label>
                            <input type='text' className='form-control' name='fName' value={this.state.fName} onChange={this.changeHandler}/>
                            <pre>{this.state.fNameError}</pre>
                        </div>
                        <div className='form-group'>
                            <label>Last Name</label>
                            <input type='text' className='form-control' name='lName' value={this.state.lName} onChange={this.changeHandler}/>
                            <pre>{this.state.lNameError}</pre>
                        </div>
                        <div className='form-group'>
                            <select name="gender" value={this.state.gender} onChange={this.changeHandler} placeholder="Gender">
                                <option>--Gender--</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        
                        <div className='form-group'>
                            <label>DOB</label>
                            <input type='date' className='form-control' name='dob' value={this.state.dob} onChange={this.changeHandler}/>
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type='email' className='form-control' name='email' value={this.state.email} onChange={this.changeHandler}/>
                            <pre>{this.state.emailError}</pre>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password' className='form-control' name='password' value={this.state.password} onChange={this.changeHandler}/>
                            <pre>{this.state.passwordError}</pre>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary'>Sign Up</button>&nbsp;&nbsp;&nbsp;
                            <button type='submit' className='btn btn-primary'>Login</button>
                        </div>

                    </form>
            </center>
            </div>
        )
    }
}

export default Signup
