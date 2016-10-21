import React, { Component } from 'react';
import { Router , browserHistory } from 'react-router';
var {Link, IndexLink} = require('react-router');
var _ = require('lodash');
import QuestMain from "QuestMain";
import Logout from 'Logout';
import MainNav from 'MainNav';
import MissionTaskSearchItem from 'MissionTaskSearchItem';
import MissionSearchList from 'MissionSearchList';

export default class SearchAllPage extends React.Component {
  	
    constructor(props) {
		super(props);
		this.state = {
			loginUser: '',
			fullLoginUser: '',
			missions: [],
			quests: [],
            tasks: [],
            milestones: [],
            dropdownQuest: '',
            dropdownMission: '',
			createdOn: ''
		};
	}

    handleDropdownChange(e){
        this.setState({
            dropdownMission: e.target.value
        })
    }

  	componentWillMount(){
		fetch('/search', {
            headers: {
                Auth: localStorage.getItem('token'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
		}).then((response) => response.json())
		.then((results) => {
			this.setState({
                missions: results.missions,
                quests: results.quests,
                missiontasks: results.missiontasks,
                milestones: results.milestones,
                milestonetasks: results.milestonetasks
			});
		});
	}

	render() {

        const { missions, quests, missiontasks, dropdownMission } = this.state;

        var renderMissionDropdown = () => {
            return missions.map((mission, index) => {
                return (
                    <option value={mission.title} className="dropdown-item">{mission.title}</option>
                );  
            });
        }

    	return (
      		<div className="row">
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-warning"><Link to="/home">Back Home</Link></button>
                    </div>
                </div>

                <select name="Please Select Mission to add Task to" value={this.state.dropdownMission} onChange={this.handleDropdownChange.bind(this)}>
                    <option selected disabled>Choose Mission to add Task to</option>
                    {renderMissionDropdown()}
                </select>

                <div className="row">
                    <div className="panel panel-success col-md-3 qmbox">
                        <MissionSearchList
                            missions={missions}
                            missiontasks={missiontasks}
                        />
                    </div>
                </div>
            </div>
		);
	}
}