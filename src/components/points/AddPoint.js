import React, { useEffect, useState } from "react";
import PointDataService from "../../services/PointService"
import BusinessDataService from "../../services/BusinessService"

import Select from 'react-select'
import axios from "axios";

const data = [
  {label:'Facebook', value:'Facebook'},
  {label:'Instagram', value:'Instagram'},
  {label:'Youtube', value:'Youtube'}
]

const AddPoint = () => {

  const [pointName, setPointName] = useState('')
  const [pointDescription, setDescriptionPoint] = useState('')

  const [business, setBusiness] = useState([]);

  const handleSelectedChange = (e) => {
    console.log(e);
  }

  useEffect(() => {
    retrieveBusiness();
  }, []);

  const handleSubmit = (e) => {
    console.log(e)
  }

  const retrieveBusiness = () => {
    BusinessDataService.getAll()
      .then((response) => {
        setBusiness(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="col-md-8">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <h1><b>Add Point</b></h1>
          </div>
        </div>

        <hr />

        <form onSubmit={handleSubmit} className="card card-body" method="POST">

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'left' }}>
              <div>
                <h5><b>Select Business</b></h5>
              </div>
            </div>

            <Select
              options = {business}
              onChange = {handleSelectedChange}
            />

           

          </div>

          <div className="form-group">
            <div>
              <h5><b>Point Name</b></h5>
            </div>
            <input
              type="text"
              onChange={e => setPointName(e.target.value)}
              value={pointName}
              className="form-control"
              autoFocus
            />
          </div>

          <div className="form-group">
            <div>
              <h5><b>Description</b></h5>
            </div>
            <input
              type="text"
              onChange={e => setDescriptionPoint(e.target.value)}
              value={pointDescription}
              className="form-control"
              autoFocus
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

export default AddPoint;