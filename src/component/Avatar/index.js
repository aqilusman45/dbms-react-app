import React from "react";
import { Avatar } from "antd";

export const AvatarSideBar = ({ userPhoto, userName, collapsed }) => (
  <div className={`avatar-side ${collapsed ? "hidden": "" }`}>
    <Avatar size="large" icon={userPhoto || "user"} />
    <span className={`avatar-username ${collapsed ? "hidden": ""}`}>{userName || "User name"}</span>
  </div>
);
