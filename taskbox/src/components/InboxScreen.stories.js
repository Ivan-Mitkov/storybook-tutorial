import React from "react";

import { PureInboxScreen } from "./InboxScreen";
// for the PureInboxScreen we have a problem because although the PureInboxScreen itself is presentational, its child, the TaskList, is not. In a sense the PureInboxScreen has been polluted by “container-ness”. So when we setup our stories in InboxScreen.stories.js:
//One way to sidestep this problem is to never render container components anywhere in your app except at the highest level and instead pass all data-requirements down the component hierarchy.
export default {
  component: PureInboxScreen,
  title: "InboxScreen",
};

const Template = (args) => <PureInboxScreen {...args} />;

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: "Something",
};
