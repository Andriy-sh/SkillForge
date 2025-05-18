import React from "react";
import UserIdForm from "./UserIdForm";
import UserEmailForm from "./UserEmailForm";
// import UserPasswordForm from "./UserPasswordForm";
import UserNameForm from "./UserNameForm";
import UserPasswordForm from "./UserPasswordForm";
import UserBioForm from "./UserBioForm";
import UserCityForm from "./UserCityForm";

export default function ProfileSettings() {
  return (
    <div className="bg-white flex flex-col border-1 p-6 border-black">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <div className="flex flex-col space-y-4">
        <UserNameForm />
        <UserEmailForm />
        <UserIdForm />
        <UserBioForm />
        <UserPasswordForm />
        <UserCityForm />
      </div>
      {/* <UserAvatarForm user={user} /> */}
      {/* <UserBioForm user={user} /> */}
      {/* <UserLocationForm user={user} /> */}
      {/* <UserWebsiteForm user={user} /> */}
    </div>
  );
}
