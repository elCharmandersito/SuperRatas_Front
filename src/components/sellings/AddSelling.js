import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import UserDataService from "../../services/UserService"
import PublicationDataService from "../../services/PublicationService"
import SellingDataService from "../../services/SellingService"
import axios from "axios";

const AddSelling = () => {

    // Busqueda de usuario
    const [searchRut, setSearchRut] = useState("");

    const [user, setUser] = useState("");
    const [pub, setPub] = useState("");

    // ATRIBUTOS DE LA VENTA
    const [setIdPub] = useState('')
    const [setMinimalPoints] = useState('')
    const [setClientRut] = useState('')
    const [setClientPoints] = useState('')
    const [setTypePoint] = useState('')
    const [userPoints, setUserPoints] = useState("");
    const [setConvertedRate] = useState('')

    let { IdPublicacion } = useParams();

    const handleSubmit = (e) => {

        e.preventDefault();
        const data = UserDataService.get(searchRut);

        UserDataService.get(searchRut)
            .then((response) => {
                setUser(response.data.usuario);
            }).catch((e) => {
                console.log(e);
            });
        console.log("Puntos cliente : ", user);

        PublicationDataService.get(IdPublicacion)
            .then((response) => {
                setPub(response.data.publicacion);
            }).catch((e) => {
                console.log(e);
            });
        console.log("Publicacion : ", pub);
    }

    const handleSaveSelling = async () => {
        console.log(window.location.href);

        console.log(JSON.stringify({
            IdPub: IdPublicacion,
            idMinimalPointsUser: document.getElementById("minPoints").value,
            ClientRut: document.getElementById("clientRut").value,
            ClientPoints: document.getElementById("clientPoints").value,
            TypePoint: document.getElementById("typePoint").value,
            userPoints: userPoints,
            ConvertedRate: document.getElementById("convertRate").value
        }));

        const selling = {
            IdPub: IdPublicacion,
            idMinimalPointsUser: document.getElementById("minPoints").value,
            ClientRut: document.getElementById("clientRut").value,
            ClientPoints: document.getElementById("clientPoints").value,
            TypePoint: document.getElementById("typePoint").value,
            userPoints: userPoints,
            ConvertedRate: document.getElementById("convertRate").value
        }

        await axios.post(`http://localhost:5000/sellings/add/${IdPublicacion}`, JSON.stringify(selling), {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response)).catch(error => {
            console.log(error);
        })

        window.location = '/sellings'
    }

    return (
        <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>

            <div className="col-md">

                {/* BUSQUEDA DEL CLIENTE */}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h1><b>Enter your rut</b></h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="card card-body" method="POST">
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={e => setSearchRut(e.target.value)}
                            value={searchRut}
                            className="form-control"
                            placeholder="Type rut with out dv"
                            autoFocus
                        />
                    </div>
                    <button className="btn btn-primary btn-block" disabled={!searchRut}>
                        Search Client
                    </button>
                </form>

                <hr />
                <br />

                {user ? (
                    <div>
                        {/* DATOS PARA LA VENTA */}

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h1><b>Selling Data</b></h1>
                            </div>
                        </div>

                        <br />

                        <form onSubmit={handleSaveSelling} className="card card-body" method="POST">
                            <div class="container">

                                <div class="row">

                                    <div class="col-sm-2">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <h5><b>ID PUBLICATION</b></h5>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                readOnly
                                                type="text"
                                                onChange={e => setIdPub(e.target.value)}
                                                value={pub.IdPublicacion}
                                                className="form-control"
                                                id="idPub"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <h5><b>MINIMAL POINTS</b></h5>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                onChange={e => setMinimalPoints(e.target.value)}
                                                value={pub.PuntosMinimos}
                                                id="minPoints"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <h5><b>CLIENT RUT</b></h5>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                onChange={e => setClientRut(e.target.value)}
                                                value={user.ClienteRut}
                                                id="clientRut"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <h5><b>CLIENT POINTS</b></h5>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                onChange={e => setClientPoints(e.target.value)}
                                                value={user.TotalPuntos}
                                                id="clientPoints"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">

                                    <div class="col-sm"></div>

                                    <div class="col-sm">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <h5><b>TYPE POINT</b></h5>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                onChange={e => setTypePoint(e.target.value)}
                                                value={pub.IdPunto}
                                                id="typePoint"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <h5><b>CONVERTED POINTS</b></h5>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                onChange={e => setUserPoints(e.target.value)}
                                                value={userPoints}
                                                className="form-control"
                                                placeholder="Points to convert"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <h5><b>CONVERTION RATE</b></h5>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                onChange={e => setConvertedRate(e.target.value)}
                                                value={pub.TasaCambio}
                                                id="convertRate"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-sm"></div>
                                </div>

                                <br />

                                <button className="btn btn-primary btn-block" disabled={!userPoints}>
                                    Redeem Points
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>
                            <h3><b>PLEASE ENTER YOUR RUT TO SHOW YOU THE PURCHASE INFORMATION</b></h3>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddSelling;