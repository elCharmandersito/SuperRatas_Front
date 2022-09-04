import React, { useState, useEffect } from "react";
import BusinessDataService from "../../services/BusinessService";

const Business = props => {
  const initialBusinessState = {
    IdEmpresa: null,
    Nombre: "",
    Desactivado: 0
  };

  const [currentBusiness, setCurrentBusiness] = useState(initialBusinessState);
  const [message, setMessage] = useState("");

  const getBusiness = id => {
    BusinessDataService.get(id)
      .then(response => {
        setCurrentBusiness(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBusiness(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBusiness({ ...currentBusiness, [name]: value });
  };

  const updateBusiness = () => {
    BusinessDataService.update(currentBusiness.IdEmpresa, currentBusiness)
      .then(response => {
        console.log(response.data);
        setMessage("The business was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBusiness = () => {
    BusinessDataService.remove(currentBusiness.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/business");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBusiness ? (
        <div className="edit-form">
          <h4>Business</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentBusiness.Nombre}
                onChange={this.handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteBusiness}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBusiness}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Business...</p>
        </div>
      )}
    </div>
  );
};

export default Business;
