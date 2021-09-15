import React from "react";

import Task from "./Task";

export default {
  component: Task,
  title: "Task",
};

/**
 * To tell Storybook about the component we are documenting, we create a default export that contains:

component -- the component itself,
title -- how to refer to the component in the sidebar of the Storybook app
 */

const Template = (args) => <Task {...args} />;
//As we have multiple permutations of our component, it's convenient to assign it to a Template variable. Introducing this pattern in your stories will reduce the amount of code you need to write and maintain.
export const Default = Template.bind({});
//Arguments or args for short, allow us to live edit our components with the controls addon without restarting Storybook. Once an args value changes so does the component.
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2021, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
};
const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = Template.bind({});
LongTitle.args = {
  task: {
    ...Default.args.task,
    title: longTitleString,
  },
};
