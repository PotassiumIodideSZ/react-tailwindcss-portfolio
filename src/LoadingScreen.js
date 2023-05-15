import './css/LoadingScreen.css';
import gameFrame from './assets/gameFrame.png';
import React from 'react';

const LoadingScreen = () => {



    return (
        <div>
            <div style={{ backgroundImage: `url(${gameFrame})`, width: '100%', height: '100%', position: 'absolute', backgroundRepeat:'no-repeat', zIndex: 5}} >  
                
            </div>
            <div style={{padding: 39, position:'absolute', width:'100%', height:'100%',zIndex: 4,marginTop: 25}}>
                <div className="loadindScreenHolder" style={{position:'relative'}}>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    
                </div>
            </div>
            
        </div>
        
    );
};

export default LoadingScreen;