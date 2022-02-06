import { useState, useEffect, Component } from "react";

export default class Info extends Component {
    state = {
        user: null,
        projects: null,
    };

    componentDidMount() {
        //firstly, fetching both the personal information and the projects
        this.getPersonalInfo()
        this.getProjects()
    }
    //fetching the project data using GET request
    getProjects() {
        fetch(`https://private-052d6-testapi4528.apiary-mock.com/info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    //I use this console log to check the result data
                    console.log("this is the fetched data : ", data)
                    this.setState({ projects: data })

                });
            } else res.text().then((data) => alert(data));
        });
    }


    getPersonalInfo() {
        //fetching the personal info from session
        const user = {
            name: sessionStorage.getItem('name').replaceAll('"', ''),
            avatar: sessionStorage.getItem('avatar').replaceAll('"', ''),
            joinedAt: sessionStorage.getItem('joinedAt').replaceAll('"', ''),
            Team: sessionStorage.getItem('Team').replaceAll('"', ''),
            token: sessionStorage.getItem('token').replaceAll('"', ''),
        }
        this.setState({ user })
    }
    filterFunction() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        console.log("filter: ", filter)
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];//array[1] so the search query apply on the prooject name field
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    logout() {
        sessionStorage.clear();
        window.location.replace('/');
    }

    render() {
        const { user, projects } = this.state
        //loading indicator
        if (!user || !projects) {
            return (<h1>Loading...</h1>)
        }
        return (
            <div dir="ltr">
                <button dir="right" className="logoutBtn" onClick={this.logout}>Log out</button>
                <div className="personalDetails">
                    <img className="avatar" src={user.avatar} alt="avatr image"></img>
                    <h1>{user.name}</h1>
                    <p>Joined At: {user.joinedAt}</p>
                    <p>Team: {user.Team}</p>
                    <p>Token: {user.token}</p>
                </div>

                <div className="projects">
                    <h1 className="projectsTitle">Projects</h1>
                    <input autoComplete="off" className="searchInput" type="text" id="myInput" onKeyUp={this.filterFunction} placeholder="Search for names.."></input>

                    <table id="myTable">
                        <tbody >
                            <tr key={"header"}>
                                {Object.keys(projects[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>

                            {projects.map((item) => (
                                <tr key={item.id}>
                                    {
                                        //Im using toString() method because of the bool value
                                    }
                                    {item.score > 90 ?
                                        Object.values(item).map((val) => (
                                            <td className="over90" key={val}>{val.toString()}</td>
                                        ))
                                        :
                                        item.score < 70 ?
                                            Object.values(item).map((val) => (
                                                <td className="under70" key={val}>{val.toString()}</td>
                                            ))
                                            :
                                            Object.values(item).map((val) => (
                                                <td className="regular" key={val}>{val.toString()}</td>
                                            ))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}