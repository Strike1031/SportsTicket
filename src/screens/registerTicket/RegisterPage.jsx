import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import moment from "moment/moment";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/main.css';

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
    //console.log("time", time);
    const dt = moment(time, ["h:mm A"]).format("HH:mm");
    return dt;
}

export default function Register() {
    //const radioGroup = ["NFL", "NBA", "MLB", "NHL", "WNBA", "NCAA-88/F8", "USFL", "XFL"];
    const radioGroup = ["NFL FOOTBALL", "NBA BASKETBALL", "MLB BASEBALL", "NHL HOCKEY", "WNBA BASKETBALL", "NCAA FOOTBALL/BASKETBALL"];
    const [country, setCountry] = useState("NFL FOOTBALL");
    const teamGroup = {
        "NFL FOOTBALL": ["Cardinals",
            "Falcons",
            "Ravens",
            "Bills",
            "Panthers",
            "Bears",
            "Bengals",
            "Browns",
            "Cowboys",
            "Broncos",
            "Lions",
            "Packers",
            "Texans",
            "Colts",
            "Jaguars",
            "Chiefs",
            "Raiders",
            "Chargers",
            "Rams",
            "Dolphins",
            "Vikings",
            "Patriots",
            "Saints",
            "Giants",
            "Jets",
            "Eagles",
            "Steelers",
            "49ers",
            "Seahawks",
            "Buccaneers",
            "Titans",
            "Commanders"],
        "NBA BASKETBALL": ["Hawks",
            "Celtics",
            "Nets",
            "Hornets",
            "Bulls",
            "Cavaliers",
            "Mavericks",
            "Nuggets",
            "Pistons",
            "Warriors",
            "Rockets",
            "Pacers",
            "Clippers",
            "Lakers",
            "Grizzlies",
            "Heat",
            "Bucks",
            "Timberwolves",
            "Pelicans",
            "Knicks",
            "Thunder",
            "Magic",
            "76ers",
            "Suns",
            "Trail Blazers",
            "Kings",
            "Spurs",
            "Raptors",
            "Jazz",
            "Wizards"],
        "MLB BASEBALL": ["Diamondbacks",
            "Braves",
            "Orioles",
            "Red Sox",
            "White Sox",
            "Cubs",
            "Reds",
            "Guardians",
            "Rockies",
            "Tigers",
            "Astros",
            "Royals",
            "Angels",
            "Dodgers",
            "Marlins",
            "Brewers",
            "Twins",
            "Yankees",
            "Mets",
            "Athletics",
            "Phillies",
            "Pirates",
            "Padres",
            "Giants",
            "Mariners",
            "Cardinals",
            "Rays",
            "Rangers",
            "Blue Jays",
            "Nationals"],
        "NHL HOCKEY": ["Anaheim Ducks",
            "Arizona Coyotes",
            "Boston Bruins",
            "Buffalo Sabres",
            "Calgary Flames",
            "Carolina Hurricanes",
            "Chicago Blackhawks",
            "Colorado Avalanche",
            "Columbus Blue Jackets",
            "Dallas Stars",
            "Detroit Red Wings",
            "Edmonton Oilers",
            "Florida Panthers",
            "Los Angeles Kings",
            "Minnesota Wild",
            "Montreal Canadiens",
            "Nashville Predators",
            "New Jersey Devils",
            "New York Islanders",
            "New York Rangers",
            "Ottawa Senators",
            "Philadelphia Flyers",
            "Pittsburgh Penguins",
            "San Jose Sharks",
            "Seattle Kraken",
            "St Louis Blues",
            "Tampa Bay Lightning",
            "Toronto Maple Leafs",
            "Vancouver Canucks",
            "Vegas Golden Knights",
            "Washington Capitals",
            "Winnipeg Jets"],
        "WNBA BASKETBALL": ["Atlanta Dream",
            "Chicago Sky",
            "Connecticut Sun",
            "Dallas Wings",
            "Indiana Fever",
            "Las Vegas Aces",
            "Los Angeles Sparks",
            "Minnesota Lynx",
            "New York Liberty",
            "Phoenix Mercury",
            "Seattle Storm",
            "Washington Mystics"],
        "NCAA FOOTBALL/BASKETBALL": ["Abilene Christian",
            "Air Force",
            "Akron",
            "Alabama",
            "Alabama State",
            "Alabama at Birmingham",
            "Albany",
            "Alcorn State",
            "American",
            "Army",
            "Appalachian State",
            "Arizona",
            "Arizona State",
            "Arkansas State",
            "Arkansas",
            "Arkansas at Little Rock",
            "Arkansas at Pine Bluff",
            "Austin Peay State",
            "Auburn",
            "Ball State",
            "Butler",
            "Baylor",
            "Bellarmine",
            "Belmont",
            "Bethune-Cookman",
            "Binghamton",
            "Bowling Green",
            "Boston College",
            "Boston",
            "Brigham Young",
            "Bradley",
            "Brown",
            "Bryant",
            "Boise State",
            "Bucknell",
            "Buffalo",
            "California Baptist",
            "Cal-Polytechnic State",
            "Cal-State , Bakersfield",
            "Cal-State , Fresno",
            "Cal-State , Fullerton",
            "Cal-State , Long Beach",
            "Cal-State , Northridge",
            "Cal-State , Sacramento",
            "Cal- Berkeley",
            "Cal- Davis",
            "Cal- Irvine",
            "Cal- Los Angeles",
            "Cal- Riverside",
            "Cal- Santa Barbara",
            "Cal- San Diego",
            "Canisius College",
            "Campbell",
            "Chicago State",
            "Central Florida",
            "Central Arkansas",
            "Central Michigan",
            "Charleston Southern",
            "Cincinnati",
            "Cleveland State",
            "Clemson",
            "Colgate",
            "College of the Holy Cross",
            "Columbia -Barnard College",
            "Cornell Central Connecticut State",
            "Connecticut",
            "Colorado State",
            "Colorado",
            "Coppin State",
            "College of Charleston",
            "Coastal Carolina",
            "Creighton",
            "Dartmouth",
            "Dayton",
            "Davidson College",
            "Detroit Mercy",
            "DePaul",
            "Denver",
            "Delaware",
            "Delaware State",
            "Dixie State",
            "Drexel",
            "Drake",
            "Duke",
            "Duquesne",
            "Eastern Illinois",
            "East Tennessee State",
            "Eastern Washington",
            "Eastern Kentucky",
            "Eastern Michigan",
            "East Carolina",
            "Elon",
            "Evansville",
            "Fairleigh Dickinson",
            "Fairfield",
            "Florida",
            "Florida A&M",
            "Florida Atlantic",
            "Florida Gulf Coast",
            "Florida International",
            "Florida State",
            "Fordham",
            "Furman",
            "Gardner-Webb",
            "Georgia",
            "George Mason",
            "George Washington",
            "Georgetown",
            "Georgia Southern",
            "Georgia State",
            "Gonzaga",
            "Grand Canyon",
            "Grambling State",
            "Hampton",
            "Hawaii",
            "Hartford",
            "Harvard",
            "High Point",
            "Houston",
            "Howard",
            "Hofstra",
            "Houston Christian",
            "Idaho",
            "Idaho State",
            "Illinois State",
            "Illinois Urbana-Champaign",
            "Illinois at Chicago",
            "Incarnate Word",
            "Indiana State",
            "Indiana - Bloomington",
            "Indiana - Purdue",
            "Iona College",
            "Iowa",
            "Iowa State",
            "Jacksonville State",
            "Jacksonville",
            "Jackson State",
            "James Madison",
            "Kansas",
            "Kansas State",
            "Kennesaw State",
            "Kentucky",
            "Kent State",
            "Lamar",
            "La Salle",
            "Lafayette College",
            "Lehigh",
            "Liberty",
            "Lindenwood",
            "Lipscomb Longwood",
            "Louisville",
            "Long Beach State",
            "Louisiana- Lafayette",
            "Louisiana- Monroe",
            "Louisiana State",
            "Louisiana Tech",
            "Loyola-Maryland",
            "Loyola Marymount",
            "Loyola-Chicago",
            "Long Island -Brooklyn",
            "Maine",
            "Marist College",
            "Manhattan College",
            "Marshall",
            "Marquette",
            "Maryland-Eastern Shore",
            "Maryland-Baltimore County",
            "Maryland-College Park",
            "Massachusetts-Amherst",
            "Massachusetts-Lowell",
            "McNeese State",
            "Merrimack College",
            "Memphis",
            "Mercer",
            "Michigan",
            "Michigan State",
            "Minnesota",
            "Mississippi State",
            "Mississippi Valley State",
            "Mississippi",
            "Missouri, Columbia",
            "Missouri-Kansas City",
            "Miami  (Ohio)",
            "Missouri State",
            "Miami (Florida)",
            "Middle Tennessee State",
            "Morgan State",
            "Mount St. Mary`s",
            "Morehead State",
            "Murray State",
            "Montana",
            "Montana State -Bozeman",
            "Monmouth",
            "Navy",
            "Nebraska Omaha",
            "Nebraska",
            "Nevada-Las Vegas",
            "New Orleans",
            "New Mexico",
            "New Mexico State",
            "New Hampshire",
            "Nicholls State",
            "Niagara",
            "Northeastern",
            "North Carolina-Asheville",
            "North Carolina A&T State",
            "North Carolina Central",
            "North Carolina State",
            "North Carolina",
            "North Carolina-Wilmington",
            "North Carolina- Charlotte",
            "North Carolina- Greensboro",
            "Northwestern State",
            "Northern Kentucky",
            "Northern Arizona",
            "Northern Colorado",
            "North Texas",
            "North Florida",
            "Northern Illinois",
            "Northwestern",
            "Notre Dame",
            "Northern Iowa",
            "Norfolk State",
            "North Dakota",
            "North Dakota State",
            "Ohio State",
            "Ohio",
            "Old Dominion",
            "Oakland",
            "Oklahoma",
            "Oklahoma State",
            "Oral Roberts",
            "Oregon",
            "Oregon State",
            "Pacific",
            "Pennsylvania",
            "Pennsylvania State",
            "Pepperdine",
            "Pittsburgh",
            "Portland",
            "Portland State",
            "Presbyterian College",
            "Princeton",
            "Prairie View A&M",
            "Providence College",
            "Purdue",
            "Purdue- Fort Wayne",
            "Quinnipiac",
            "Rhode Island",
            "Rice",
            "Rider",
            "Rutgers",
            "Radford",
            "Richmond",
            "Robert Morris",
            "Sam Houston State",
            "Saint Mary's",
            "San Diego State",
            "San Jose State",
            "Santa Clara",
            "Saint Francis",
            "Saint Joseph`s",
            "Sacred Heart",
            "Samford",
            "Seton Hall",
            "Saint Peter`s",
            "San Diego",
            "San Francisco",
            "Seattle",
            "Siena College",
            "S Illinois - Carbondale",
            "S Illinois - Edwardsville",
            "Southern Indiana",
            "Southeastern Louisiana",
            "Southern Mississippi",
            "Southern- Baton Rouge",
            "Stonehill College",
            "Southern Methodist",
            "Southern California",
            "South Alabama",
            "South Florida",
            "Southern Utah",
            "South Carolina-Columbia",
            "South Carolina State",
            "South Carolina Upstate",
            "South Dakota",
            "South Dakota State",
            "Stetson",
            "St. Bonaventure",
            "St. Francis",
            "St. John`s",
            "Stony Brook",
            "St. Thomas",
            "Stanford",
            "Stephen F. Austin",
            "Syracuse",
            "Troy",
            "Tarleton State",
            "Temple",
            "Tennessee State",
            "Tennessee -Chattanooga",
            "Tennessee",
            "Tennessee- Martin",
            "The Citadel",
            "Texas A&M",
            "Texas A&M -Commerce",
            "Texas A&M -Corpus Christi",
            "Texas Christian",
            "Texas Southern",
            "Texas State",
            "Texas Tech",
            "Texas- Rio Grande Valley",
            "Texas at Arlington",
            "Texas at Austin",
            "Texas at El Paso",
            "Texas at San Antonio",
            "Towson",
            "Toledo",
            "Tulsa",
            "Tulane",
            "Utah",
            "Utah State",
            "Utah Valley",
            "Valparaiso",
            "Villanova",
            "Virginia",
            "Virginia Commonwealth",
            "Virginia Military",
            "Virginia Polytechnic",
            "Vermont",
            "Vanderbilt",
            "Wake Forest",
            "Washington",
            "Washington State",
            "Western Carolina",
            "West Virginia",
            "Wagner College",
            "Western Michigan",
            "Weber State",
            "Western Kentucky",
            "Western Illinois",
            "Winthrop",
            "Wofford College",
            "Wichita State",
            "William and Mary",
            "Wisconsin-Green Bay",
            "Wisconsin-Madison",
            "Wisconsin",
            "Wright State",
            "Wyoming",
            "Xavier"]
    };
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
    const [gameTitle2, SetGameTitle2] = useState('');

    const [leftTeam, setLeftTeam] = useState("");
    const [startDate, setStartDate] = useState('');
    const [initialDate, setInitialDate] = useState('');
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
        let realindex = -1;
        ticketData.map((units, i) => {
            if (ticketData[i].index == index) {
                realindex = i;
            }
        });
        if (realindex == -1)
            return;

        setCurrentIndex(realindex);
        if (ticketData[realindex].leftFirstPercentage <= 0) {
            setLeftFirstPercentage(ticketData[realindex].leftFirstPercentage);
            //setRightFirstPercentage(ticketData[index].rightFirstPercentage);
            setRightFirstPercentage(0 - ticketData[realindex].leftFirstPercentage);
        }
        else
            return;
        // Initialize current input fields to selected item's data
        setLeftTeam(ticketData[realindex].leftTeam);
        setRightTeam(ticketData[realindex].rightTeam);
        setLeftSecondPercentage(ticketData[realindex].leftSecondPercentage);
        setRightSecondPercentage(ticketData[realindex].rightSecondPercentage);
        console.log('time', ticketData[realindex].time);
        // setStartTime(tConvert(ticketData[realindex].time));// tConvertReverse(ticketData[realindex].time)
        setStartDate(ticketData[realindex].day);
        if (realindex >= 9) {
            console.log('realindex', realindex);
            SetGameTitle2(ticketData[realindex].gameTitle);
        }
        else {
            console.log('realindex', realindex);
            SetGameTitle(ticketData[realindex].gameTitle);
        }
    }

    function removeEachTicketInfo(index) {
        console.log("!!!!remove ticket info!!!!!");

        let realindex = -1;

        ticketData.map((units, i) => {
            if (ticketData[i].index == index) {
                setCurrentIndex(i);
                realindex = i;
            }
        });
        console.log(realindex);
        if (realindex != -1) {
            // setTicketData((prev) => {
            //     console.log("setTicketdata----------");
            //     prev.splice(realindex, 1);
            //     return [...prev];
            // });
            let _ticketData = [...ticketData];
            _ticketData.splice(realindex, 1);
            setTicketData(_ticketData);
        }

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
            const ratio = (widthRatio > heightRatio ? heightRatio : widthRatio) * 1.6; //scale image

            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio / 1.6; //height not scale

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
                const ratio1 = (widthRatio1 > heightRatio1 ? heightRatio1 : widthRatio1) * 1.6 ; //scale image

                const canvasWidth1 = canvas1.width * ratio1;
                const canvasHeight1 = canvas1.height * ratio1 / 1.6; ////height not scale

                const marginX1 = (pageWidth1 - canvasWidth1) / 2;
                const marginY1 = (pageHeight1 - canvasHeight1) / 2;

                doc.addImage(image1, 'JPEG', marginX1, marginY1, canvasWidth1, canvasHeight1);
                // doc.output('dataurlnewwindow');
                doc.save("result.pdf");
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
            pdf.save("result.pdf");
        });


    }
    // const [ticketData, setTicketData] = useState([{leftTeam: "Northwestern", rightTeam: "Pern-State", leftFirstPercentage: "-4", rightFirstPercentage: "-4", leftSecondPercentage: "147", rightSecondPercentage:"147", gameTitle: "CollegeBasketBall", day: "03/10/23",  time: "01:00 PM"},
    //  {leftTeam: "UConn", rightTeam: "Marquettle", leftFirstPercentage: "-1.5", rightFirstPercentage: "1.5", leftSecondPercentage: "130", rightSecondPercentage:"130", gameTitle: "CollegeBasketBall", day: "03/10/23", time: "05:30 PM" }
    //  ]);
    const btnSaveItem = () => {
        if (currentIndex >= 0) {
            setTicketData((prev) => {
                console.log("Hello");
                prev[currentIndex] = { index: currentIndex, leftTeam: leftTeam, rightTeam: rightTeam, leftFirstPercentage: leftFirstPercentage, rightFirstPercentage: rightFirstPercentage, leftSecondPercentage: leftSecondPercentage, rightSecondPercentage: rightSecondPercentage, gameTitle: gameTitle, day: startDate, time: tConvert(startTime) };
                return [...prev];
            });
        }

    }

    const btnAddGame = () => {
        console.log('AddGame');
        //setTicketData(ticketData.concat({leftTeam: "Wizards", rightTeam: "Pistons", leftFirstPercentage: "-13", rightFirstPercentage: "+13", leftSecondPercentage: "221", rightSecondPercentage:"221", gameTitle: "Pro BasketBall", day: "03/10/23", time: "06:00 PM"}));
        const temp = { index: -1, leftTeam: "", rightTeam: "", leftFirstPercentage: "", rightFirstPercentage: "", leftSecondPercentage: "", rightSecondPercentage: "", gameTitle: "", day: "", time: "" };

        temp.index = ticketData.length > 0 ? (ticketData[ticketData.length - 1].index + 1) : 0;
        temp.leftTeam = leftTeam;
        temp.rightTeam = rightTeam;
        temp.leftFirstPercentage = leftFirstPercentage;
        temp.rightFirstPercentage = rightFirstPercentage;
        temp.leftSecondPercentage = leftSecondPercentage;
        temp.rightSecondPercentage = rightSecondPercentage;
        temp.gameTitle = gameTitle;
        //eg: "03/10/2023";
        temp.day = (new Date(startDate).getMonth() + 1) + "/" + new Date(startDate).getDate() + "/" + new Date(startDate).getFullYear(); // const d = new Date(date).toLocaleDateString('fr-FR');
        console.log("temp.day", startDate);
        //eg: "05:00 PM";
        temp.time = tConvert(startTime);
        if (ticketData.length == 9)
        {
            SetGameTitle2(gameTitle);
        }
        setTicketData(ticketData.concat(temp));
       
    }

    const SetCurrentDay = () => {
        const d = new Date().toLocaleDateString('fr-FR');
        setStartDate(d);
        setInitialDate(d);
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
                                        <input type="radio" name="myGroupSelect" id="myGroupSelect" value={i} onChange={e => setCountry(e.target.value)} /> {i}
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
                                <input type="text" name="gameTitle" id="gameTitle" value={gameTitle} onChange={e => {
                                    
                                    if (currentIndex >= 8) {
                                        SetGameTitle2(e.target.value);
                                    }
                                    else {
                                        SetGameTitle(e.target.value);
                                    }
                                    SetCurrentDay();
                                }} style={{ width: "82%" }} />
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
                                    <input type="number" name="leftFirstPercentage" id="leftFirstPercentage" value={leftFirstPercentage} onChange={e => { if (e.target.value <= 0) { setLeftFirstPercentage(e.target.value); setRightFirstPercentage(0 - e.target.value) } }} className="mx-1" style={{ width: "100%" }} />
                                </div>
                                <div className="col-4">
                                    <TimePicker onChange={e => { setStartTime(e); }} value={startTime} className="mx-3 customTimePickerWidth" />
                                </div>
                                <div className="col-4">
                                    <input type="number" name="rightFirstPercentage" id="rightFirstPercentage" value={rightFirstPercentage} onChange={e => { if (e.target.value > 0) { setRightFirstPercentage(e.target.value); setLeftFirstPercentage(0 - e.target.value); } }} className="mx-1" style={{ width: "100%" }} />
                                </div>

                            </Row>
                            <Row className="d-flex my-2" >
                                <div className="col-4">
                                    <input type="number" name="leftSecondPercentage" id="leftSecondPercentage" value={leftSecondPercentage} onChange={e => { setLeftSecondPercentage(e.target.value); setRightSecondPercentage(e.target.value); }} className="mx-1" style={{ width: "100%" }} />
                                </div>
                                <div className="col-4">

                                </div>
                                <div className="col-4">
                                    <input type="number" name="rightSecondPercentage" id="rightSecondPercentage" value={rightSecondPercentage} onChange={e => { setRightSecondPercentage(e.target.value); setLeftSecondPercentage(e.target.value); }} className="mx-1" style={{ width: "100%" }} />
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
                                <MyTicketTable data={ticketData} myFunc={changeEachTicketInfo} myFunc1={removeEachTicketInfo} />
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
                            <MyPreviewFirstPage from={inputFromNo} title={title} subTitle={subTitle} gameTitle={gameTitle} gameTitle2={gameTitle2} startDate={startDate} initialDate={initialDate} ticketData={ticketData}></MyPreviewFirstPage>
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