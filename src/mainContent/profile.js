import React from "react";

//this is a simple textArea where the user can add a short description.

const Profile = (props) => {
    const profile = props.profile
    const profileDescription = props.profileDescription

    return<>
    <form className="profile">
        <label htmlFor="profileInput"> Voeg een profiel toe</label>
        <textarea
        onChange={profile}
        value={profileDescription}
        type='text'
        id="profileInput"
        />
    </form>
    </>
}

export default Profile;