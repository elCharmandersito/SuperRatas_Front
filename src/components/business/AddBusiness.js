import React, { useState } from "react";
import BusinessDataSetvice from "../../services/BusinessService"

const AddBusiness = () => {

  const [businessName, setBusinessName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    BusinessDataSetvice.create(JSON.stringify({
      businessName: businessName
    }));

    var millisecondsToWait = 1000;
    setTimeout(function () {
      window.location = '/business'
    }, millisecondsToWait)
  }

  return (
    <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="col-md-8">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <h1><b>Add Business</b></h1>
          </div>
        </div>

        <hr />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <h4>Enter Name</h4>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card card-body" method="POST">
          <div className="form-group">
            <input
              type="text"
              onChange={e => setBusinessName(e.target.value)}
              value={businessName}
              className="form-control"
              placeholder="Enter Business Name"
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

export default AddBusiness;