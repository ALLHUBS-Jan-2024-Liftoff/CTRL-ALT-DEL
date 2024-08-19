import React from "react";
import '../App.css';

const UserBage = ({initials,isSeller,isVerifiedSeller}) => {

    return (
        <div className="user-badge">
            <div className="user-initials">{initials}</div>
            <span className="user-initials">{initials}</span>
            {isSeller && isVerifiedSeller && (
                <span className="verified-check">✔️</span>
            )}
        </div>
    );
            
};

export default UserBage