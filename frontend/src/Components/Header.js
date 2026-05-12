import React from 'react';

const Header = ({onToggleSettings}) => {
    return (
        <div className="header">

            <h1>Budget Tracker App</h1>

            <button 
               className="settings-btn"
               onClick={onToggleSettings}
               >
                 ☰
               </button>
               
        </div>
    );
};

export default Header;