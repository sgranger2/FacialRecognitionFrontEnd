import React from 'react';
import ImageLinkForm from './ImageLinkForm';
import FaceRecognition from './FaceRecognition';
import Demographics from './Demographics';

const Home = (props) => {   
    let errormsg = null;
    if (props.error) {
        errormsg = <h1>Bad Request! Try another link.</h1>
    }

    let displayImage = null;
    let demographicInfo = null;
    if (props.imageUrl && errormsg === null) {
        displayImage = <FaceRecognition activeFace={props.activeFace} selectFace={props.selectFace} boxes={props.faceData} imageUrl={props.imageUrl} />
        demographicInfo = <Demographics age={props.displayDemographics.age} gender={props.displayDemographics.gender} ethnicity={props.displayDemographics.ethnicity} />
    }
    
    return (
        <div>
            <h2>Hello, {props.userName}!</h2>
            <h3>This application draws boxes around human faces in photos and tells you each person's approximate age, gender, and ethnicity</h3>
            <input
            type="submit"
            value="Try It Out!"
            style={{width: '130px'}}
            className="searchImage b ph3 pv2 input-reset ba b--black black bg-transparent grow pointer f6 dib br2" 
            onClick={props.onTryItOutButton}
            />
            <h3>OR</h3>
            <h3 className="example-link">Enter your own image link below:</h3>
            <ImageLinkForm
                onInputChange={props.onInputChange}
                onSubmitButton={props.onSubmitButton}
            />
            {demographicInfo} 
            {displayImage}
            {errormsg}
        </div>
    );
}

export default Home;