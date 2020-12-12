import React, { Component } from 'react'
import axios from 'axios';

export class DisplayTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            tasks : [],
            error: '' ,
            currentUser: {},
            currentTask: {}
        }
    }
    fetchData = () =>{
        axios.get('http://localhost:1337/tasks')
        .then((res)=>{
            this.setState({
                loading: false,
                tasks: res.data,
                error: ''
            })
            return res.data;
        })
        .catch((err)=>{
            this.setState({
                loading: false,
                tasks: [],
                error: err.message
            })
            console.log(err);

        })
    }
    componentDidMount()
    {
        this.fetchData();
        axios.get('http://localhost:1337/users')
        .then((res)=>{
            res.data.map(user =>{
                console.log('logged is as: ',user);
                this.setState({
                    currentUser: user
                })
            })
        })
        .catch((err) =>{console.log(err)});
    }

    componentDidUpdate()
    {
        this.fetchData();
    }
    
    addNew = () =>{
        this.props.history.push({pathname:`/addTask/${this.state.currentUser.id}`, state:this.state.currentTask.title});
    }

    edit = (taskId) =>{
        axios.get(`http://localhost:1337/task/${taskId}`)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    currentTask: res.data
                })
            })
        
           this.addNew();

        // axios.put(`http://localhost:1337/task/update/${taskId}`)
        //     .then((res)=>{
        //         this.props.history.push(`/addTask/${this.state.currentUser.id}`);
        //         console.log('task updated successfully', res);

        //     })
        //     .catch((err)=>console.log('error in task update ', err))

    }

    delete(taskId){
        alert('are you sure?');
        axios.delete(`http://localhost:1337/task/delete/${taskId}`)
            .then((res) => 
            {
                alert('task deleted successfully')
            })
            .catch((err) => console.log('error while deleting task', err));
    }
    render() {
        return (
            <div className='container'>
                <center>
                    <h1>Tasks Data</h1>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Edit Task</th>
                                <th>Delete Task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tasks.map( task => {
                                    return(
                                        <tr key={task.id}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.status}</td>
                                            <td><button className='btn btn-success' onClick={()=>this.edit(task.id)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={()=>this.delete(task.id)}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    
                    </table>
                    <button className='btn btn-primary' onClick={this.addNew}> Add New task</button>
                    
                </center>
                
                
            </div>
        )
    }
}

export default DisplayTask
