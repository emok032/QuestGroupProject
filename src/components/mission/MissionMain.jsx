import React, { Component, cloneElement } from 'react';
var {Link, IndexLink} = require('react-router');
import UserHomePage from 'UserHomePage';
import CreateMission from 'CreateMission';
import CreateTask from 'CreateTask';
import MissionMainList from 'MissionMainList';

export default class MissionMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            missions: []
        };
    }
    createMission(description) {
        const { missions } = this.state;
        
        const newMiss = {
            description
        }
        fetch('/mission/create', {
            method: 'post',
            body: JSON.stringify(newMiss),
            headers: {
                Auth: localStorage.getItem('token'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
        }).then((response) => response.json())
            .then((results) => {
                this.setState({
                    missions: missions.concat(results)
                });
            });
    }
    deleteMission(id){
        const { missions } = this.state;

        const deleteMission = _.remove(missions, mission => mission.id === id);

        fetch(`/mission/delete/${deleteMission[0].id}`,{
            method: 'DELETE',
            body: JSON.stringify(deleteMission),
            headers: {
                Auth: localStorage.getItem('token'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
        }).then((response) => response.json())
        .then((results) => {
            this.setState({
                missions: missions
            })
        }); 
    }
    toggleTask(task) {
        const foundtask= _.find(this.state.missions, mission => mission.task === task);
        foundtask.isCompleted = !foundtask.isCompleted;
        this.setState({ missions: this.state.missions});
    }
    // toggleTask(taskId) {
    //     const { missions } = this.state;

    //     // find the first item in our state which has the ID we're looking for (itemId)
    //     const foundtask = missions.find((foundTask) => foundtask._id === taskId);

    //     // if we found an item w/ that id, we toggle its `isCompleted` property
    //     if (foundtask) {
    //         foundtask.isCompleted = !foundtask.isCompleted;

    //         fetch(`/api/task/${foundtask._id}`, {
    //             method: 'PUT',
    //             body: JSON.stringify(foundtask),
    //             headers: { 'content-type': 'application/json' }
    //         }).then((response) => response.json())
    //             .then((json) => {
    //                 // then we update our state with the updated items array. note that
    //                 // `item` has the item by reference, meaning that when we changed its
    //                 // isCompleted property, the array `items` was updated as well
    //                 this.setState({
    //                     missions: missions
    //                 });
    //             });
    //     }
    // }
    saveTask(oldTask, newTask, oldDate, newDate) {
        const foundtask=_.find(this.state.missions, mission=> mission.task ===oldTask);
        foundtask.task=newTask;
        foundtask.date=newDate;
        this.setState({missions: this.state.missions});
    }
    handleCreateTask(task) {
        const { tasks } = this.state;
        
        const newTask = {
            task
        }
        fetch('/task/create/', {
            method: 'post',
            body: JSON.stringify(newTask),
            headers: {
                Auth: localStorage.getItem('token'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
        }).then((response) => response.json())
            .then((results) => {
                this.setState({
                    tasks: tasks.concat(results)
                });
            });
    }
    componentWillMount(){
        fetch('/home', {
            credentials: 'include',
            headers: {
                Auth: localStorage.getItem('token')
            }
        }).then((response) => response.json())
        .then((results) => {
            this.setState({
                missions: results.missions
            });
        });
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-warning"><Link to="/home">Back Home</Link></button>
                    </div>
                </div>
                <h1 id="pageTitle">Missions Home</h1>
                <CreateMission
                    missions={this.props.missions}
                    createMission={this.createMission.bind(this)}
                />
                <MissionMainList
                    missions={this.state.missions}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteMission={this.deleteMission.bind(this)}
                />
            </div>
         );
    }
}