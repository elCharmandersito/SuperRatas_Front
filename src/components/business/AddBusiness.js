import React, { useState, Route } from "react";
import BusinessDataSetvice from "../../services/BusinessService"

const AddBusiness = () => {

  const [businessName, setBusinessName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    BusinessDataSetvice.create(JSON.stringify(businessName));
    <Route exact path="/business"></Route>
  }

  return (
    <div className="row">
      <div className="col-md-4">
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