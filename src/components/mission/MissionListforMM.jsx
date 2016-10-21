import React, { Component } from 'react';
import MissionsListItem from 'MissionsListItem';
import MissionAndTaskItem from 'MissionAndTaskItem';

export default class MissionListforMM extends React.Component {
    render() {
        const { missions, missiontasks, toggleMissionTask, deleteMission, deleteMissionTask } = this.props;
        
        var renderMissions = () => {
            return missions.map((mission, index) => {
                return (
                    <MissionAndTaskItem
                        title={mission.title}
                        description={mission.description}
                        deleteMission={deleteMission}
                        deleteMissionTask={deleteMissionTask}
                        toggleMissionTask={toggleMissionTask}
                        missiontasks={missiontasks}
                        id={mission.id}
                        key={index}
                    />
                );
            });
        }
        return (
            <div>
                <p className="missionsTitle">Missions</p>
                {renderMissions()}
            </div>
        );
    } 
}