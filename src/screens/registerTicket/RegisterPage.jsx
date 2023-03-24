import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Register() {
    const radioGroup = ["NFL", "NBA", "MLB", "NHL", "WNBA", "NCAA-88/F8", "USFL", "XFL"];
    const teamGroup = ["Northwestern", "Pern State", "UConn", "Marquette"];

    const [inputFromNo, setInputFromNo] = useState(1);
    const [inputToNo, setInputToNo] = useState(50);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [games, SetGames] = useState("");

    const [leftTeam, setLeftTeam] = useState("Northwestern");
    const [rightTeam, setRightTeam] = useState("Pern State");
    return (
        <div>
            <Row>
                <div className="col-4">
                    <h3 fontStyle="bold"> Ticket No</h3>
                    <div>
                        <span>From : </span>
                        <input type="number" name="fromNo" id="fromNo" value={inputFromNo} onChange={e => setInputFromNo(e.value)} style={{width: "4rem"}}/>
                        <span>&nbsp;To : </span>
                        <input type="number" name="toNo" id="toNo" value={inputToNo} onChange={e => setInputToNo(e.value)}  style={{width: "4rem"}}/>
                    </div>
                    <Row className="my-3">
                        <Col>
                            <h3> Title </h3>
                            <div>
                                <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.value)} />
                            </div>
                            <h3> Subtitle </h3>
                            <div>
                                <input type="text" name="subtitle" id="subtitle" value={subTitle} onChange={e => setSubTitle(e.value)} />
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
                            <span>Games&nbsp;&nbsp;</span>
                            <input type="text" name="games" id="games" value={games} onChange={e => SetGames(e.value)} width="17rem" />
                            <div className="d-flex">
                                <DropdownButton id="dropdown-item-button" title={leftTeam} value={leftTeam} className="mx-2 my-1">
                                    {
                                        teamGroup.map(i =>
                                            <Dropdown.Item key={i} as="button" value={i} onClick={e => setLeftTeam(e.target.value)}>{i}</Dropdown.Item>
                                        )
                                    }
                                </DropdownButton>
                                <DropdownButton id="dropdown-item-button" title={rightTeam} value={rightTeam} className="mx-2 my-2">
                                    {
                                        teamGroup.map(i =>
                                            <Dropdown.Item key={i} as="button" value={i} onClick={e => setRightTeam(e.target.value)}>{i}</Dropdown.Item>
                                        )
                                    }
                                </DropdownButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8"></div>
            </Row>
        </div>
    );
} 