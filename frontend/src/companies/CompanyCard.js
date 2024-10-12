import React from "react";
import { Card, CardBody, CardTitle, CardText, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/CompanyCard.css";

const CompanyCard = ({ name, handle, description, logoUrl }) => {
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            <Link to={`/companies/${handle}`} key={handle}>
              <ListGroupItem>{name}</ListGroupItem>
            </Link>
          </CardTitle>
          <CardText className="font-italic">{description}</CardText>
          {logoUrl ? <img src={logoUrl} alt={`${name} logo`} /> : "no image"}
        </CardBody>
      </Card>
    </section>
  );
};

export default CompanyCard;
