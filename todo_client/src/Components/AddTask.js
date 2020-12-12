import React, { Component } from 'react';
import axios from 'axios';

export class AddTask extends Component {
    constructor(props) {
        super(props)
    
        this.state =
        {
            title: '',
            description: '',
            taskStatus:'',
            currentUser: {}
        }
    }
    componentDidMount(){
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

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (event)=>{
        event.preventDefault();

        const task = {
            title: this.state.title,
            description: this.state.description,
            user: this.state.currentUser.id
        }
        axios.post('http://localhost:1337/task/addTask', {task})
        .then((res)=>{
            console.log(res)
            alert(`Task added successfully`)
        })
        .catch((err)=>{
            alert(err.message);
        })

        this.setState({
            title: '',
            description: ''
        })
        this.props.history.push(`/displayTask/${this.state.currentUser.id}`);
    }
    updateHandler = (e) =>{
        e.preventDefault();

        console.log(e.target.value);
        console.log(this.props.location.state)
    }

    render() {
        return (
            <div className='container'>
                <center>
                    <h2 style={{padding: '20px'}}> Welcome {this.state.currentUser.fName}</h2>
                    
                    <h1> Add Task</h1>

                    <form className='form'>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' className='form-control' name='title' value={this.state.title} onChange={this.changeHandler} />
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <input type='text' className='form-control' name='description' value={this.state.description} onChange={this.changeHandler} />
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-primary' onClick={this.handleSubmit} disabled={!this.state.title }>Add task</button>
                            <button className='btn btn-primary' style={{float: 'right'}} disabled={!this.state.title }onClick={this.updateHandler}>Update task</button>
                        </div>
                    </form>

                </center>
            </div>
        )
    }
}

export default AddTask;
