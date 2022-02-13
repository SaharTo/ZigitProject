import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BasicTable } from "./BasicTable";


export const Info = () => {
    const [projects, setProjects] = useState([])

    // Fetch the data from redux store using useSelector
    const { user } = useSelector((state) =>
        state.login
    )
    console.log("value of user from redux store : ", user);

    const logout = () => {
        window.location.replace('/');
    }

    return (
        <div>
            <button dir="right" className="logoutBtn" onClick={logout}>Log out</button>
            <div className="personalDetails">
                <img className="avatar" src={user[0].personalDetails.avatar} alt="avatr image"></img>
                <h1>{user[0].personalDetails.name}</h1>
                <p>Joined At: {user[0].personalDetails.joinedAt}</p>
                <p>Team: {user[0].personalDetails.Team}</p>
                <p>Token: {user[0].token}</p>
            </div>
            <BasicTable></BasicTable>
        </div >
    )



}