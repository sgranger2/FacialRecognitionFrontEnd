import React from 'react';
import Demographics from './Demographics';

const FaceRecognition = (props) => {

    return (
        <div className='image-center ma'>
            <div className='absolute row'>
                <img
                    id='inputimage'
                    src={props.imageUrl}
                    className='image shadow-1'
                    alt="Facial recognition" />
                    {
                        props.boxes.map((box, index) => {
                            return <div key={index} onClick={() => {props.selectFace(index)}} className={props.activeFace === index ? "activeFace" : "face-recognition-box"} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>               
                        })
                    }
            </div>
        </div>
    );
}

export default FaceRecognition;