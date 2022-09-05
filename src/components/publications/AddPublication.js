import React, { useState, Route } from "react";
import UserDataService from "../../services/UserService"

const AddPublication = () => {

    const [idPoint, setidPoint] = useState('')
    const [idUser, setIdUser] = useState('')
    const [pubName, setPubName] = useState('')
    const [pubDescription, setPubDescription] = useState('')
    const [pubPoints, setPubPopint] = useState('')
    const [pubRate, setPubRate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(JSON.stringify({
            IdPoint: idPoint,
            idUser: idUser,
            PubName: pubName,
            PubDescrip: pubDescription,
            PubPoints: pubPoints,
            PubRate: pubRate
        }))

        UserDataService.create(JSON.stringify({
            IdPoint: idPoint,
            idUser: idUser,
            PubName: pubName,
            PubDescrip: pubDescription,
            PubPoints: pubPoints,
            PubRate: pubRate
        })); 
        window.location = '/publication'
    }

    return (
        <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-8">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h1><b>Add Publication</b></h1>
                    </div>
                </div>

                <hr />

                <form onSubmit={handleSubmit} className="card card-body" method="POST">
                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>Type Point</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setidPoint(e.target.value)}
                            value={idPoint}
                            className="form-control"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>Client Rut</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setIdUser(e.target.value)}
                            value={idUser}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>Publication Name</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setPubName(e.target.value)}
                            value={pubName}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>Description</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setPubDescription(e.target.value)}
                            value={pubDescription}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>Minimus Points</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setPubPopint(e.target.value)}
                            value={pubPoints}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h4>Convertion Rate</h4>
                            </div>
                        </div>
                        <input
                            type="text"
                            onChange={e => setPubRate(e.target.value)}
                            value={pubRate}
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

export default AddPublication;