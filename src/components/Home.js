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
        displayImage = <FaceRecognition box={props.box} imageUrl={props.imageUrl} />
        demographicInfo = <Demographics age={props.age} gender={props.gender} ethnicity={props.ethnicity} />
    }
    
    return (
        <div>
            <h2>Hello, {props.userName}!</h2>
            <h3>This application finds one human face in a photo and calculates the approximate age, sex, and race of that person.</h3>
            <h3>Enter a link to any image below to try it out!</h3>
            <ImageLinkForm
                onInputChange={props.onInputChange}
                onSubmitButton={props.onSubmitButton}
            />
            {displayImage}
            {demographicInfo}
            {errormsg}
        </div>
    );
}

export default Home;