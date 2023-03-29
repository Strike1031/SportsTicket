import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import moment from "moment/moment";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import TimePicker from 'react-time-picker';
import jsPDF from "jspdf";
// pages I made
import MyTicketTable from '../TicketTable/MyTicketTable';
import MyPreviewFirstPage from '../TicketTable/MyPreviewFirstPage';
import MyPreviewSecondPage from '../TicketTable/MyPreviewSecondPage';
import html2canvas from 'html2canvas';

function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function tConvertReverse(time) {
    const dt = moment(time, ["h:mm A"]).format("HH:mm");
    return dt;
}

export default function Register() {
    const radioGroup = ["NFL", "NBA", "MLB", "NHL", "WNBA", "NCAA-88/F8", "USFL", "XFL"];
    const [country, setCountry] = useState("NFL");
    const teamGroup = {"NFL":["A","B","C"], "NBA":["D","E","F"], "MLB":["G","H","I"], "NHL":["j","k","L"], "WNBA":["N","O","P"], "NCAA-88/F8":["Q","R","S"], "USFL":["T","U","V"], "XFL":["W","Y","Z"]};
    // const teamGroup = ["Wizards",
    //     "Pistons",
    //     "Cavaliers",
    //     "Hornets",
    //     "Raptors",
    //     "Nuggets",
    //     "Lakers",
    //     "Pelicans",
    //     "Magic",
    //     "Spurs",
    //     "Thunder",
    //     "Nets",
    //     "Bucks",
    //     "Suns",
    //     "Knicks",
    //     "Trail Balzers",

    //     "Michigan",
    //     "UAB",
    //     "Vanderbilt",
    //     "Liberty",
    //     "MississippiState",
    //     "Wisconsin",
    //     "Washington State",
    //     "Toledo",
    //     "Southern Miss",
    //     "Yale",
    //     "Vaillanova",
    //     "Pittsburgh",
    //     "Bradley",
    //     "Eastern Washington"];
    // const percentages = [...new Array(101)].map((each, index) => index);

    const [inputFromNo, setInputFromNo] = useState(51);
    const [inputToNo, setInputToNo] = useState(100);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [gameTitle, SetGameTitle] = useState('');

    const [leftTeam, setLeftTeam] = useState("");
    const [startDate, setStartDate] = useState('');
    const [rightTeam, setRightTeam] = useState("");

    const [leftFirstPercentage, setLeftFirstPercentage] = useState(-13);
    const [rightFirstPercentage, setRightFirstPercentage] = useState(13);
    const [leftSecondPercentage, setLeftSecondPercentage] = useState(221);
    const [rightSecondPercentage, setRightSecondPercentage] = useState(221);
    const [startTime, setStartTime] = useState('');

    const [ticketData, setTicketData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    function changeEachTicketInfo(index) {
        console.log("!!!!change ticket info!!!!!");
        console.log(index);
        setCurrentIndex(index);
        // Initialize current input fields to selected item's data
        setLeftTeam(ticketData[index].leftTeam);
        setRightTeam(ticketData[index].rightTeam);
        setLeftFirstPercentage(ticketData[index].leftFirstPercentage);
        setLeftSecondPercentage(ticketData[index].leftSecondPercentage);
        setRightFirstPercentage(ticketData[index].rightFirstPercentage);
        setRightSecondPercentage(ticketData[index].rightSecondPercentage);
        setStartTime(tConvertReverse(ticketData[index].time));//tConvert(ticketData[index].time)
        setStartDate(ticketData[index].day);
        SetGameTitle(ticketData[index].gameTitle);
    }

    const printPDF = async () => {
        const doc = new jsPDF('p', 'px', 'a4');

        /**-------------Front----------------- */
        const input = document.getElementById("pdf1");
        const input1 = document.getElementById("pdf2");
        html2canvas(input, {
            useCORS: true,
            allowTaint: true,
            scrollY: -window.scrollY,
        }).then(canvas => {
            const image = canvas.toDataURL('image/jpeg', 1.0);

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;

            const marginX = (pageWidth - canvasWidth) / 2;
            const marginY = (pageHeight - canvasHeight) / 2;

            doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
            //doc.output('dataurlnewwindow');
            /**-------------Back----------------- */
            doc.addPage();
            html2canvas(input1, {
                useCORS: true,
                allowTaint: true,
                scrollY: -window.scrollY,
            }).then(canvas1 => {
                const image1 = canvas1.toDataURL('image/jpeg', 1.0);

                const pageWidth1 = doc.internal.pageSize.getWidth();
                const pageHeight1 = doc.internal.pageSize.getHeight();
                const widthRatio1 = pageWidth1 / canvas1.width;
                const heightRatio1 = pageHeight1 / canvas1.height;
                const ratio1 = widthRatio1 > heightRatio1 ? heightRatio1 : widthRatio1;

                const canvasWidth1 = canvas1.width * ratio1;
                const canvasHeight1 = canvas1.height * ratio1;

                const marginX1 = (pageWidth1 - canvasWidth1) / 2;
                const marginY1 = (pageHeight1 - canvasHeight1) / 2;

                doc.addImage(image1, 'JPEG', marginX1, marginY1, canvasWidth1, canvasHeight1);
                // doc.output('dataurlnewwindow');
                doc.save("test.pdf");
            });

            
        });


    };

    const printPDF1 = async () => {
        // const pdf = new jsPDF("portrait", "pt", "a4");
        // const data = await document.querySelector("#mypdf");
        // pdf.html(data).then(async () => {
        //     pdf.save("1.pdf");
        // });

        const input = document.getElementById("pdf1");
        // const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        const pdf = new jsPDF("portrait", "pt", "a4");
        pdf.html(input, { html2canvas: { scale: 0.52 } }).then(() => {
            // var pageCount = pdf.internal.getNumberOfPages();
            // for (let i = pageCount-1; i > 1; i--) {
            //     pdf.deletePage(i);
            // }
            pdf.save("test.pdf");
        });


    }
    // const [ticketData, setTicketData] = useState([{leftTeam: "Northwestern", rightTeam: "Pern-State", leftFirstPercentage: "-4", rightFirstPercentage: "-4", leftSecondPercentage: "147", rightSecondPercentage:"147", gameTitle: "CollegeBasketBall", day: "03/10/23",  time: "01:00 PM"},
    //  {leftTeam: "UConn", rightTeam: "Marquettle", leftFirstPercentage: "-1.5", rightFirstPercentage: "1.5", leftSecondPercentage: "130", rightSecondPercentage:"130", gameTitle: "CollegeBasketBall", day: "03/10/23", time: "05:30 PM" }
    //  ]);
    const btnSaveItem = () => {
        if (currentIndex >= 0) {
            setTicketData((prev) => {
                prev[currentIndex] = { leftTeam: leftTeam, rightTeam: rightTeam, leftFirstPercentage: leftFirstPercentage, rightFirstPercentage: rightFirstPercentage, leftSecondPercentage: leftSecondPercentage, rightSecondPercentage: rightSecondPercentage, gameTitle: gameTitle, day: startDate, time: startTime };
                return prev;
            });
        }

    }

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
        temp.time = tConvert(startTime);
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
                                        <input type="radio" name="myGroupSelect" id="myGroupSelect" value={i} onChange={e => setCountry(e.target.value)}/> {i}
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
                                <input type="text" name="gameTitle" id="gameTitle" value={gameTitle} onChange={e => SetGameTitle(e.target.value)} style={{ width: "82%" }} />
                            </div>

                            <Row className="d-flex my-2" >
                                <div className="col-4">
                                    <DropdownButton id="dropdown-item-button" title={leftTeam} value={leftTeam} className="mx-2">
                                        {
                                            teamGroup[country].map(i =>
                                                <Dropdown.Item key={i} as="button" value={i} onClick={e => setLeftTeam(e.target.value)}>{i}</Dropdown.Item>
                                            )
                                        }

                                    </DropdownButton>
                                </div>
                                <div className="col-4" style={{ marginTop: "3px", paddingLeft: "30px" }}>
                                    <DatePicker dateFormat="dd/MM/yyyy" value={startDate} onChange={e => { const d = new Date(e).toLocaleDateString('fr-FR'); setStartDate(d); }} placeholderText={'dd/mm/yyyy'} showYearDropdown scrollableYearDropdown className="customDatePickerWidth" />
                                </div>
                                <div className="col-4">
                                    <DropdownButton id="dropdown-item-button" title={rightTeam} value={rightTeam} style={{ textAlign: "center" }}>
                                        {
                                            teamGroup[country].map(i =>
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
                                    <input type="number" name="leftFirstPercentage" id="leftFirstPercentage" value={leftFirstPercentage} onChange={e => setLeftFirstPercentage(e.target.value)} className="mx-1" style={{ width: "100%" }} />
                                </div>
                                <div className="col-4">
                                    <TimePicker onChange={e => setStartTime(e)} value={startTime} className="mx-3 customTimePickerWidth" />
                                </div>
                                <div className="col-4">
                                    <input type="number" name="rightFirstPercentage" id="rightFirstPercentage" value={rightFirstPercentage} onChange={e => setRightFirstPercentage(e.target.value)} className="mx-1" style={{ width: "100%" }} />
                                </div>

                            </Row>
                            <Row className="d-flex my-2" >
                                <div className="col-4">
                                    <input type="number" name="leftSecondPercentage" id="leftSecondPercentage" value={leftSecondPercentage} onChange={e => setLeftSecondPercentage(e.target.value)} className="mx-1" style={{ width: "100%" }} />
                                </div>
                                <div className="col-4">

                                </div>
                                <div className="col-4">
                                    <input type="number" name="rightSecondPercentage" id="rightSecondPercentage" value={rightSecondPercentage} onChange={e => setRightSecondPercentage(e.target.value)} className="mx-1" style={{ width: "100%" }} />
                                </div>
                            </Row>
                            <Row className="d-flex my-2" >
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <Button variant="primary" onClick={btnAddGame}>Add Game</Button>
                                </div>
                                <div className="col-4">
                                    <Button variant="primary" onClick={btnSaveItem}>Save</Button>
                                </div>
                            </Row>
                            <Row className="d-flex my-2" >
                                <MyTicketTable data={ticketData} myFunc={changeEachTicketInfo} />
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