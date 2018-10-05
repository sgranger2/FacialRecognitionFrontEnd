import React from 'react';

const Navigation = ({ isSignedIn, onRouteChange }) => {
    if (isSignedIn) {
        return (
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('logout')} className='signout f3 black ma4 pointer pa2 ba br3'>Sign Out</p>
                </nav>
            </div>
        );
    } else {
        return (
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('login')} className=' signin f3 black pointer pa2 ba br3'>Log In</p>
                    <p onClick={() => onRouteChange('signup')} className=' register f3 black pointer pa2 ba br3'>Sign Up</p>
                </nav>
            </div>
        );
    }

}

export default Navigation;