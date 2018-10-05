import React from 'react';

const ImageLinkForm = ({onInputChange, onSubmitButton}) => {
    return (
        <div>
            <input
                className="image-link input-reset ba bg-transparent br4"
                type="text"
                name="image-link"
                id="image-link"
                placeholder="Paste link to image here"
                onChange={onInputChange}
            />
            <div>
                <input
                    onClick={onSubmitButton}
                    className="searchImage b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2"
                    type="submit"
                    value="Search Image"
                    style={{width: '130px'}}
                />
            </div>
        </div>
    );
}

export default ImageLinkForm;