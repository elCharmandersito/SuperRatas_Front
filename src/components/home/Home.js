import React, { useState, useEffect } from "react";
import PublicationDataService from "../../services/PublicationService";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        <br/>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            key={index}
          >
            <Typography><h3><p>{pub.NombrePublicacion}</p></h3></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {pub.Descripcion}
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
      <br/>
    {publication.map(renderAccordion)}
  </div>
};

export default PublicationList;
