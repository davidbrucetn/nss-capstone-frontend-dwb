import React from "react";
import { Link } from "react-router-dom";


const OwnerCard = (props) => {
  return (
    <div className="card">
      <div className="card-content">
      <div className="card__inner">
          <picture>
            <img src={require(`${props.owner.picture}`)} alt="Kennel Owner" />
          </picture>
        </div>
        <div className="div__card__name">
          <h3>
            Name: <span className="card-ownerName">{props.owner.name}</span>
          </h3>
        </div>
            <p>Location:  {props.kennel}</p>
            <p>Experience: {props.owner.experience}</p>
            <Link to={`/owners/${props.owner.id}`}>
              <button>Details</button>
            </Link>
      </div>
    </div>
  );
};

export default OwnerCard;