import React, { Component } from 'react';
var moment = require('moment');
import CompletedMilestonetaskItem from 'CompletedMilestonetaskItem';

export default class MissionAndTaskItem extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        };
    }
	render(){
		const { id, title, description, milestones, milestonetasks, completedOn, isCompleted } = this.props;
		var singleMilestone = () => {
			return milestones.map((milestone, index) => {
				var filteredMilestonetask = milestonetasks.filter((milestonetask) => milestonetask.milestoneName === milestone.milestone);
				return (
					<div>
						<li>
							<p>Milestone</p>
							<p id="taskText">{milestone.milestone}</p>
							<CompletedMilestonetaskItem
								milestonetasks={filteredMilestonetask}
                        	/>
						</li>
					</div>
				)
			})
		}
		return (
			<div>
				<p>Title: {title}</p>
				<p>Description: {description}</p>
				{singleMilestone()}
				<p>Completed On: {completedOn}</p>
			</div>
		)
	}
}