import React, { useState } from 'react';
const MyPreviewFirstPage = ({ title, subTitle, gameTitle, startDate }) => {
    return (<>
        <div style={{width: "100%", textAlign: "center"}}>
            <h2>{title}</h2>
            <h4>{subTitle}</h4>
            <u>{gameTitle},{new Date(startDate).getDay()==0 ? "Sun" : new Date(startDate).getDay()==1 ? "Mon" : new Date(startDate).getDay()==2 ? "Tue" : new Date(startDate).getDay()==3 ? "Wed" : new Date(startDate).getDay()==4 ? "Thu" : new Date(startDate).getDay()==5 ? "Fri": new Date(startDate).getDay()==6 ? "Sat" : ""}, {new Date(startDate).getMonth()+1}/{new Date(startDate).getDate()}</u>
        </div>
    </>);
}

export default MyPreviewFirstPage;