import React from 'react';

const FaceRecognition = (props) => {
    return (
        <div className='image-center ma'>
            <div className='absolute row'>
                <img
                    id='inputimage'
                    src={props.imageUrl}
                    className='image shadow-1'
                    alt="Facial recognition" />
                    <div className='face-recognition-box' style={{top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;