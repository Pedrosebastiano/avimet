import style from './ViewUser.module.css';
import global from "../../global.module.css";
import default_picture from "../../assets/no-profile-picture.png";
import trash_icon from "../../assets/trash-icon.png";
//import { useState, useEffect } from 'react';


const ViewUser = ({userProfile, onDelete, onChangeType}) => {

    let profilePic = userProfile.profilePicture;

    if (profilePic == null) {
        profilePic = default_picture;
    } else {
        profilePic = `${profilePic}?t=${new Date().getTime()}`;
    }

    if (userProfile.userType == 'estudiante'){
        return (
            <div className={style.container}>
                <img className={style.profilePic} src={profilePic} alt="profile picture" />
                <p className={style.name}>{userProfile.name}</p>
                <button  className={`${global.btn2} ${style.changeType}`} onClick={onChangeType}> 
                    Cambiar a guia 
                </button>
                <button className={style.delete} onClick={onDelete}>
                    <img src={trash_icon} alt="delete icon" />
                </button>
                
            </div>
        )

    } else {
        return (
            <div className={style.container}>
                <img className={style.profilePic} src={profilePic} alt="profile picture" />
                <p className={style.name}>{userProfile.name}</p>
                <button  className={`${global.btn2} ${style.changeType}`} onClick={onChangeType}> 
                    Cambiar a estudiante 
                </button>
                <button className={style.delete} onClick={onDelete}>
                    <img src={trash_icon} alt="delete icon" />
                </button>
            </div>
        )
    }

  
};

export default ViewUser;