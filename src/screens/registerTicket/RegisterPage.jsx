import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'react-time-picker';
import jsPDF from "jspdf";
// pages I made
import MyTicketTable from '../TicketTable/MyTicketTable';
import MyPreviewFirstPage from '../TicketTable/MyPreviewFirstPage';
import MyPreviewSecondPage from '../TicketTable/MyPreviewSecondPage';

export default function Register() {
    const radioGroup = ["NFL", "NBA", "MLB", "NHL", "WNBA", "NCAA-88/F8", "USFL", "XFL"];
    const teamGroup = ["Wizards",
    "Pistons",
    "Cavaliers",
    "Hornets",
    "Raptors",
    "Nuggets",
    "Lakers",
    "Pelicans",
    "Magic",
    "Spurs",
    "Thunder",
    "Nets",
    "Bucks",
    "Suns",
    "Knicks",
    "Trail Balzers",
    
    "Michigan",
    "UAB",
    "Vanderbilt",
    "Liberty",
    "MississippiState",
    "Wisconsin",
    "Washington State",
    "Toledo",
    "Southern Miss",
    "Yale",
    "Vaillanova",
    "Pittsburgh",
    "Bradley",
    "Eastern Washington"];
    // const percentages = [...new Array(101)].map((each, index) => index);

    const [inputFromNo, setInputFromNo] = useState(51);
    const [inputToNo, setInputToNo] = useState(100);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [gameTitle, SetGameTitle] = useState('');

    const [leftTeam, setLeftTeam] = useState("Northwestern");
    const [startDate, setStartDate] = useState('');
    const [rightTeam, setRightTeam] = useState("Pern State");

    const [leftFirstPercentage, setLeftFirstPercentage] = useState(-13);
    const [rightFirstPercentage, setRightFirstPercentage] = useState(13);
    const [leftSecondPercentage, setLeftSecondPercentage] = useState(221);
    const [rightSecondPercentage, setRightSecondPercentage] = useState(221);
    const [startTime, setStartTime] = useState('');

    const printPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const data = await document.querySelector("#mypdf");
        pdf.html(data).then(async () => {
            pdf.save("1.pdf");
            //   const data1 =  await document.querySelector("#pdf2");
            //   pdf.html(data1).then(() => {
            //     pdf.save("1.pdf");
            //   })
        });
    }
     // const [ticketData, setTicketData] = useState([{leftTeam: "Northwestern", rightTeam: "Pern-State", leftFirstPercentage: "-4", rightFirstPercentage: "-4", leftSecondPercentage: "147", rightSecondPercentage:"147", gameTitle: "CollegeBasketBall", day: "03/10/23",  time: "01:00 PM"},
    //  {leftTeam: "UConn", rightTeam: "Marquettle", leftFirstPercentage: "-1.5", rightFirstPercentage: "1.5", leftSecondPercentage: "130", rightSecondPercentage:"130", gameTitle: "CollegeBasketBall", day: "03/10/23", time: "05:30 PM" }
    //  ]);
    const [ticketData, setTicketData] = useState([]);
    const btnAddGame = () => {
        console.log('AddGame');
        //setTicketData(ticketData.concat({leftTeam: "Wizards", rightTeam: "Pistons", leftFirstPercentage: "-13", rightFirstPercentage: "+13", leftSecondPercentage: "221", rightSecondPercentage:"221", gameTitle: "Pro BasketBall", day: "03/10/23", time: "06:00 PM"}));
        const temp = { leftTeam: "", rightTeam: "", leftFirstPercentage: "", rightFirstPercentage: "", leftSecondPercentage: "", rightSecondPercentage: "", gameTitle: "", day: "", time: "" };
        temp.leftTeam = leftTeam;
        temp.rightTeam = rightTeam;
        temp.leftFirstPercentage = leftFirstPercentage;
        temp.rightFirstPercentage = rightFirstPercentage;
        temp.leftSecondPercentage = leftSecondPercentage;
        temp.rightSecondPercentage = rightSecondPercentage;
        temp.gameTitle = gameTitle;
        //eg: "03/10/2023";
        temp.day = (new Date(startDate).getMonth() + 1) + "/" + new Date(startDate).getDate() + "/" + new Date(startDate).getFullYear(); // const d = new Date(date).toLocaleDateString('fr-FR');
        //eg: "05:00 PM";
        temp.time = "05:00 PM";
        setTicketData(ticketData.concat(temp));
    }
    return (
        <div>
            <Row>
                <div className="col-4">
                    <h3 fontStyle="bold"> Ticket No</h3>
                    <div>
                        <span>From : </span>
                        <input type="number" name="fromNo" id="fromNo" value={inputFromNo} onChange={e => setInputFromNo(e.target.value)} />
                    </div>
                    <div>
                        <span>&nbsp;To &nbsp;&nbsp;&nbsp;&nbsp;: </span>
                        <input type="number" name="toNo" id="toNo" value={inputToNo} onChange={e => setInputToNo(e.target.value)} />
                    </div>
                    <Row className="my-3">
                        <Col>
                            <h3> Title </h3>
                            <div>
                                <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <h3> Subtitle </h3>
                            <div>
                                <input type="text" name="subtitle" id="subtitle" value={subTitle} onChange={e => setSubTitle(e.target.value)} />
                            </div>
                        </Col>
                        <Col>
                            <h3>Group Select</h3>
                            <div className="radio-buttons">
                                {radioGroup.map(i =>
                                    <div key={i}>
                                        <input type="radio" name="myGroupSelect" id="myGroupSelect" value={i} /> {i}
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <h3> Team Select</h3>
                        <div>
                            <div>
                                <span>Games&nbsp;&nbsp;</span>
                                <input type="text" name="gameTitle" id="gameTitle" value={gameTitle} onChange={e => SetGameTitle(e.target.value)} style={{width: "82%"}} />
                            </div>

                            <Row className="d-flex my-2" >
                                <div className="col-4">
                                    <DropdownButton id="dropdown-item-button" title={leftTeam} value={leftTeam} className="mx-2">
                                        {
                                            teamGroup.map(i =>
                                                <Dropdown.Item key={i} as="button" value={i} onClick={e => setLeftTeam(e.target.value)}>{i}</Dropdown.Item>
                                            )
                                        }

                                    </DropdownButton>
                                </div>
                                <div className="col-4" style={{marginTop: "3px", paddingLeft: "30px"}}>
                                    <DatePicker selected={startDate} onChange={e => setStartDate(e)} placeholderText={'dd/mm/yy'} showYearDropdown scrollableYearDropdown className="customDatePickerWidth"/>
                                </div>
                                <div className="col-4">
                                    <DropdownButton id="dropdown-item-button" title={rightTeam} value={rightTeam}  style={{ textAlign: "center" }}>
                                        {
                                            teamGroup.map(i =>
                                                <Dropdown.Item key={i} as="button" value={i} onClick={e => setRightTeam(e.target.value)}>{i}</Dropdown.Item>
                                            )
                                        }
                                    </DropdownButton>
                                </div>
                            </Row>
                            <Row className="d-flex my-2" >
                                {/* ********* -100 ~ 100 ***********/}
                                {/* <DropdownButton id="dropdown-item-button" title={leftFirstPercentage} value={leftFirstPercentage} className="mx-2">
                                    {
                                        percentages.map(i =>
                                            <Dropdown.Item key={i} as="button" value={i} onClick={e => setLeftFirstPercentage(e.target.value)}>{i}</Dropdown.Item>
                                        )
                                    }
                                </DropdownButton> */}
                                <div className="col-4">
                                    <input type="number" name="leftFirstPercentage" id="leftFirstPercentage" value={leftFirstPercentage} onChange={e => setLeftFirstPercentage(e.value)} className="mx-1"  style={{width: "100%"}}/>
                                </div>
                                <div className="col-4">
                                    <TimePicker onChange={setStartTime} value={startTime} className="mx-3 customTimePickerWidth"/>
                                </div>
                                <div className="col-4">
                                    <input type="number" name="rightFirstPercentage" id="rightFirstPercentage" value={rightFirstPercentage} onChange={e => setRightFirstPercentage(e.value)} className="mx-1" style={{width: "100%"}}/>
                                </div>

                            </Row>
                            <Row className="d-flex my-2" >
                                <div className="col-4">
                                    <input type="number" name="leftSecondPercentage" id="leftSecondPercentage" value={leftSecondPercentage} onChange={e => setLeftSecondPercentage(e.value)} className="mx-1" style={{width: "100%"}} />
                                </div>
                                <div className="col-4">

                                </div>
                                <div className="col-4">
                                    <input type="number" name="rightSecondPercentage" id="rightSecondPercentage" value={rightSecondPercentage} onChange={e => setRightSecondPercentage(e.value)} className="mx-1" style={{width: "100%"}}/>
                                </div>
                            </Row>
                            <Row className="d-flex my-2" >
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <Button variant="primary" onClick={btnAddGame}>Add Game</Button>
                                </div>
                                <div className="col-4"></div>
                            </Row>
                            <Row className="d-flex my-2" >
                                <MyTicketTable data={ticketData} />
                            </Row>
                        </div>
                    </div>
                </div>
                <div className="col-8" >
                    <div style={{ width: "100%" }}>
                        <Button onClick={printPDF} variant="primary" className="my-2" style={{ width: "100%", textAlign: "center" }}>Print</Button>
                    </div>
                    <Row id="mypdf">
                        {/* Preview First Page */}

                        <div className="col-6" id="pdf1">
                            <MyPreviewFirstPage from={inputFromNo} title={title} subTitle={subTitle} gameTitle={gameTitle} startDate={startDate} ticketData={ticketData}></MyPreviewFirstPage>
                        </div>
                        {/* Preview Second Page */}
                        <div className="col-6" id="pdf2" style={{ textAlign: "center" }}>
                            <MyPreviewSecondPage />
                        </div>
                    </Row>
                </div>

            </Row>
        </div>
    );
} 