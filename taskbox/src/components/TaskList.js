import React from "react";
import PropTypes from "prop-types";

import Task from "./Task";

import { connect } from "react-redux";
import { archiveTask, pinTask } from "../lib/redux";
//the TaskList component is a container that renders the PureTaskList presentational component. By definition container components cannot be simply rendered in isolation; they expect to be passed some context or to connect to a service. What this means is that to render a container in Storybook, we must mock (i.e. provide a pretend version) the context or service it requires.

// When placing the TaskList into Storybook, we were able to dodge this issue by simply rendering the PureTaskList and avoiding the container. We'll do something similar and render the PureInboxScreen in Storybook also.
export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  /* previous implementation of TaskList */
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

PureTaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func.isRequired,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func.isRequired,
};

PureTaskList.defaultProps = {
  loading: false,
};

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    ),
  }),
  (dispatch) => ({
    onArchiveTask: (id) => dispatch(archiveTask(id)),
    onPinTask: (id) => dispatch(pinTask(id)),
  })
)(PureTaskList);
