import React, { useState } from 'react';
import { Row, Col } from "react-bootstrap";
import '../../assets/css/main.css';

const MyPreviewFirstPage = ({ from, title, subTitle, gameTitle, gameTitle2, startDate, initialDate, ticketData }) => {
    let day, month, mydate;
    if (startDate == '') {
        const [day1, month1, year1] = startDate.split('/');
        const tempdate = new Date(+year1, +month1-1, +day1);
        console.log("tempdate", tempdate);
        mydate = tempdate.getDate();
        day = tempdate.getDay();
        month = tempdate.getMonth();
    }
    else {
        /**
         * const str = '06/15/2022';

            const [month, day, year] = str.split('/');

            console.log(month); // 06
            console.log(day); // 15
            console.log(year); // 2022

            const date = new Date(+year, +month - 1, +day);
         */
        const [day1, month1, year1] = initialDate.split('/');
        const tempdate = new Date(+year1, +month1-1, +day1);
        console.log("tempdate", tempdate);
        mydate = tempdate.getDate();
        day = tempdate.getDay();
        month = tempdate.getMonth();
    }
    return (<>
        <div style={{ width: "100%", textAlign: "center" }}>
            <br />
            <div style={{ textAlign: "right" }}>No. {from}</div>
            <h2>{title}</h2>
            <h4>{subTitle}</h4>
            {gameTitle != '' && <u>{gameTitle},{day == 0 ? "Sun" : day == 1 ? "Mon" : day == 2 ? "Tue" : day == 3 ? "Wed" : day == 4 ? "Thu" : day == 5 ? "Fri" : day == 6 ? "Sat" : ""}, {month == 0 ? "Jan" : month == 1 ? "Feb" : month == 2 ? "Mar" : month == 3 ? "Apr" : month == 4 ? "May" : month == 5 ? "Jun" : month == 6 ? "Jul" : month == 7 ? "Aug" : month == 8 ? "Sep" : month == 9 ? "Oct" : month == 10 ? "Nov" : month == 11 ? "Dec" : ""}&nbsp;{mydate}</u>}
            {ticketData.map((key, index) => (
                index < 8 ? <div key={index}>
                    <div style={{ justifyContent: "space-between", display: "flex" }}>
                        <div>
                            <span style={{ border: "solid 1px black" }}> {(index * 4 + 1) < 10 ? (index * 4 + 1 + '_') : (index * 4 + 1)}</span>
                            &nbsp;{ticketData[index].leftTeam} {ticketData[index].leftFirstPercentage}
                        </div>
                        <div style={{ textAlign: "center" }}>
                            {ticketData[index].time}
                        </div>
                        <div>
                            {ticketData[index].rightTeam} +{ticketData[index].rightFirstPercentage}
                            &nbsp;<span style={{ border: "solid 1px black" }}> {(index * 4 + 2) < 10 ? (index * 4 + 2 + '_') : (index * 4 + 2)}</span>
                        </div>
                    </div>
                    <div style={{ justifyContent: "space-between", display: "flex", marginBottom: "2px" }}>
                        <div>
                            <span style={{ border: "solid 1px black" }}> {(index * 4 + 3) < 10 ? (index * 4 + 3 + '_') : (index * 4 + 3)}</span>
                            &nbsp;Over {ticketData[index].leftSecondPercentage}
                        </div>
                        <div>
                            Under {ticketData[index].rightSecondPercentage}
                            &nbsp;<span style={{ border: "solid 1px black" }}> {(index * 4 + 4) < 10 ? (index * 4 + 4 + '_') : (index * 4 + 4)}</span>
                        </div>
                    </div>
                </div> : index == 8 ? <div> <u>{gameTitle2},{day == 0 ? "Sun" : day == 1 ? "Mon" : day == 2 ? "Tue" : day == 3 ? "Wed" : day == 4 ? "Thu" : day == 5 ? "Fri" : day == 6 ? "Sat" : ""}, {month == 0 ? "Jan" : month == 1 ? "Feb" : month == 2 ? "Mar" : month == 3 ? "Apr" : month == 4 ? "May" : month == 5 ? "Jun" : month == 6 ? "Jul" : month == 7 ? "Aug" : month == 8 ? "Sep" : month == 9 ? "Oct" : month == 10 ? "Nov" : month == 11 ? "Dec" : ""}&nbsp;{mydate}</u> <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <div>
                        <span style={{ border: "solid 1px black" }}> {((index - 8) * 2 + 33)}</span>
                        &nbsp;{ticketData[index].leftTeam} {ticketData[index].leftFirstPercentage}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {ticketData[index].time}
                    </div>
                    <div>
                        {ticketData[index].rightTeam} {ticketData[index].rightFirstPercentage}
                        &nbsp;<span style={{ border: "solid 1px black" }}> {(index - 8) * 2 + 34}</span>
                    </div>
                </div></div> : <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <div>
                        <span style={{ border: "solid 1px black" }}> {((index - 8) * 2 + 33)}</span>
                        &nbsp;{ticketData[index].leftTeam} {ticketData[index].leftFirstPercentage}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {ticketData[index].time}
                    </div>
                    <div>
                        {ticketData[index].rightTeam} {ticketData[index].rightFirstPercentage}
                        &nbsp;<span style={{ border: "solid 1px black" }}> {(index - 8) * 2 + 34}</span>
                    </div>
                </div>
            ))}
            <div>______  ______  ______  ______  ______  _____  _____  _____  ______  ______    </div>
            <div style={{ textAlign: "center", fontSize: "18px" }}><b>ALL PICKS MUST BE BLACKED OUT</b></div>
            <table className='table mynumbertable'>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>31</td>
                        <td>32</td>
                        <td>33</td>
                        <td>34</td>
                        <td>35</td>
                        <td>36</td>
                    </tr>
                    <tr>
                        <td>37</td>
                        <td>38</td>
                        <td>39</td>
                        <td>40</td>
                        <td>41</td>
                        <td>42</td>
                    </tr>
                    <tr>
                        <td>43</td>
                        <td>44</td>
                        <td>45</td>
                        <td>46</td>
                    </tr>
                </tbody>

            </table>
            <div style={{ textAlign: "right" }}>No. {from}</div>
        </div>
    </>);
}

export default MyPreviewFirstPage;