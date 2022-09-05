import React, { useState, Route } from "react";
import UserDataService from "../../services/UserService"

const AddUser = () => {

    const [userRut, setUserRut] = useState('')
    const [userDv, setUserDv] = useState('')
    const [userName, setUserName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userPoints, setUserPoints] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(JSON.stringify({
            userRut: userRut,
            userDv: userDv,
            userName: userName,
            userLastName: userLastName,
            userPoints: userPoints
        }))

        const res = UserDataService.create(JSON.stringify({
            userRut: userRut,
            userDv: userDv,
            userName: userName,
            userLastName: userLastName,
            userPoints: userPoints
        })); 
        console.log(res);

        var millisecondsToWait = 1000;
        setTimeout(function(){
            window.location = '/user'
        }, millisecondsToWait)        
    }

    return (
        <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-8">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h1><b>Add User</b></h1>
                    </div>
                </div>

                <hr />

                <form onSubmit={handleSubmit} className="card card-body" method="POST">
                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>Rut</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setUserRut(e.target.value)}
                            value={userRut}
                            className="form-control"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>DV</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setUserDv(e.target.value)}
                            value={userDv}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>User Name</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setUserName(e.target.value)}
                            value={userName}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>User LastName</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setUserLastName(e.target.value)}
                            value={userLastName}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>User Points</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setUserPoints(e.target.value)}
                            value={userPoints}
                            className="form-control"
                        />
                    </div>

                    <button className="btn btn-primary btn-block">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddUser;