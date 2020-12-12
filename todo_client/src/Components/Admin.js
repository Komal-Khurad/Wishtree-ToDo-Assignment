import React, { Component } from 'react'
import axios from 'axios';

export class Admin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: []
        }
    }
    changeStatus(userId) {
        this.state.users.map(user=>{
            if(user.id === userId)   
            {       
                console.log('active status', user.isActive)
                // let updatedUser = !user.isActive;

                axios.put(`http://localhost:1337/user/update/${userId}`)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }
        })
    }

    fetchUsers(){
        axios.get('http://localhost:1337/users')
        .then((res)=>{
            this.setState({
                users: res.data
            })
        })
        .catch((err)=>{
            console.log('admin catch error', err);
        })
    }
    componentDidMount()
    {
        this.fetchUsers();
    }
    componentDidUpdate()
    {
        this.fetchUsers();
    }
    
    render() {
        return (
            <div className='container'>
                <center>
                    <h1>Welcom Admin</h1>
                    <h3 style={{padding: '10px 0px'}}>List of Users</h3>
                </center>
                
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Active Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(user =>{
                                return(
                                    <tr key={user.id}>
                                        <td>
                                            {user.fName + " "+user.lName}
                                            {
                                                user.isActive ? 
                                                    <svg width="1.8em" height="2em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" style={{color: 'green'}}/>
                                                    </svg> 
                                                : <svg width="1.8em" height="2em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" style={{color: 'red'}}/>
                                                </svg>
                                            }
                                            
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={()=>this.changeStatus(user.id)}>Deactive</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Admin
