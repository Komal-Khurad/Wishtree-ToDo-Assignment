import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email:'',
            password:'',
            allUsers: [],
            adminEmail:'khuradkomal22@yahoo.com',
        }
    }

    componentDidMount(){
        axios.get('http://localhost:1337/users')
        .then((res)=>{
            this.setState({
                allUsers: res.data
            })
        })
        .catch((err) =>{console.log(err)});

    }

    changeHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    submitHandler = (e) =>{
        e.preventDefault();

        const {email, password, allUsers} = this.state;

        const user = {
            email,
            password,
        }
        axios.post('http://localhost:1337/user/login', user)
            .then( (res)=>{
                console.log('res=', res.data)
                let authToken = res.data.token;

                Cookies.set('token', authToken);

                console.log(Cookies.get())

                // Adds the token to the header
                axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
                alert(res.data.message);

                if(this.state.adminEmail === res.data.data.email)
                {
                    this.props.history.push('/admin');
                }
                else{
                    console.log('id: ', res.data.data.id)
                    this.props.history.push(`/displayTask/${res.data.data.id}`);
                }
            })
            .catch( (err)=> alert(err.message))

        this.setState({
            email: '',
            password: ''
        })
    }
    signUp = () =>{
        this.props.history.push('/signup')
    }
    render() {
        return (
            <div className='container'>
                <center>
                    <h2>Log In</h2>
                    <div>
                    <form className='form'  autoComplete='off' onSubmit={this.submitHandler}>

                        <div className='form-group'>
                            <label>Email</label>
                            <input type='email' className='form-control validate' name='email' value={this.state.email} onChange={this.changeHandler}/>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password' className='form-control' name='password' value={this.state.password} onChange={this.changeHandler}/>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary'>LogIn</button>&nbsp;&nbsp;&nbsp;
                            <button type='submit' className='btn btn-primary' onClick={this.signUp}>SignUp</button>
                        </div>
                    </form>
                    </div>
                </center> 
            </div>
        )
    }
}

export default Login
