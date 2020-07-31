import React, {useState, useEffect} from 'react';
import APIManager from "../../modules/APIManager";
import './OwnerDetails.css';

const OwnerDetail = props => {
    const [owner, setOwner] = useState({name:"", experience: "", picture: ""})
    const [ kennel, setKennel ] = useState({ kennel: "" })
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //get(id) from OwnerManager and hang on to data, put it into state
        APIManager.getWithExpandedLocation(props.ownerId,"owners")
            .then(owner => {
                setOwner({
                    name: owner.name,
                    experience: owner.experience,
                    picture: owner.picture,
                    location: owner.locationId
                });
                setKennel(owner.location)
        setIsLoading(false);
        });
    },[props.ownerId]);

    return (
        (!isLoading) ? 
        <div className="card">
            <div className="card-content">
                {(!isLoading) ?
                    <picture>
                    <img src={require(`${owner.picture}`)} alt="Owner" />
                    </picture> : <img src={require("./owner.png")} alt="Owner" />
                }
                <h3>Name: <span style={{ color: 'darkslategrey' }}>{owner.name}</span></h3>
                <div className="div__detail">
                    <p>Experience: {owner.experience}</p>
                    <p>Location: {kennel.name}</p>
                </div>
            </div>
        </div>
        
        :null
        
    );
}

export default OwnerDetail;
