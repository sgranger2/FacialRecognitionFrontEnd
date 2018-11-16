import React from 'react';

const Demographics = (props) => {
    return (
        <div className="demographic-info">
            <div className=' dem-info ba b--black-10 br3 shadow-1 h5'>
                <h3><span className="lighter">Gender Appearance:</span> {props.gender} </h3>
                <h3><span className="lighter">Age Appearance:</span> {props.age}</h3>
                <h3><span className="lighter">Multicultural Appearance:</span> {props.ethnicity}</h3>
            </div>
        </div>
    );
}

export default Demographics;