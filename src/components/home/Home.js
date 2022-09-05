import React, { useState, useEffect } from "react";
import PublicationDataService from "../../services/PublicationService";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

const PublicationList = (props) => {

  const [publication, setPublication] = useState([]);

  useEffect(() => {
    retrievePublication();
  }, []);

  const retrievePublication = () => {
    PublicationDataService.getAll()
      .then((response) => {
        setPublication(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  const renderAccordion = (pub, index) => {
    return (
      <div>
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            key={index}
          >
            <Typography><h1><p><b><u>{pub.NombrePublicacion}</u></b></p></h1></Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              <div class="container">
                <div class="row">
                  <div class="col-sm">
                    <h3><b>Description Point</b></h3> {pub.Descripcion}
                  </div>
                  <div class="col-sm">
                    <h3><b>Minimus Point</b></h3> {pub.PuntosMinimos}
                  </div>
                  <div class="col-sm">
                    <h3><b>Convertion Rate</b></h3> {pub.TasaCambio}
                  </div>
                  <div class="col-sm">
                    <Link to={`/sellings/add/${pub.IdPublicacion}`}>
                      <button type="button" class="btn btn-outline-success">
                        <h3><b>Redeem Points</b></h3>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  return <div className="Home">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2><b>Enjoy our list of publications</b></h2>
      </div>
    </div>
    <br />
    {publication.map(renderAccordion)}
  </div>
};

export default PublicationList;
