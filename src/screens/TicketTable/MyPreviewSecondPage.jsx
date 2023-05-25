import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';

const MyPreviewSecondPage = () => {
    // const [data, setData] = useState("For AMUSEMENT ONLY\n<br/><div>PLEASE READ OUR RULES BEFORE PLAY</div>");
    return (<>
        {/* <textarea name="Text1" cols="100" rows="30" style={{border: "none"}} value={data} onChange={e => setData(e.target.value)}>
        </textarea> */}
        <div id="fake_textarea">
            <br/> <br/>
            <h3>FOR AMUSEMENT ONLY</h3>
            <br/>
            <h5>PLEASE READ OUR RULES BEFORE PLAY</h5>
            <div>No BET BACK HERE. Play at your own risk.</div>
            <div>We both Lost if PD took our tickets. You must have your top</div>
            <div>ticket to claim your PRIZE. No IF or BUTabout it. Your PRIZE</div>
            <div>will beheld for 2 Days ONLY.</div>
            <div>Game Suspend or postpone W/O make-up within a week is</div>
            <div>cancelled</div>
            <br/>
            <div>All picks must cover the point spread shown for</div>
            <div>the card to win</div>
            <br/>
            <div>Games that are canceled or rescheduled</div>
            <div>have no action and reduce the play the next lower</div>
            <div>number of picks</div>
            <br/>
            <div>Minimum Play: 10 points</div>
            <div>Maximum Play: 1000 points</div>
            <br/>
            <u><b>List of Payoff Odds</b></u>
            <div>2 out of 2 pays........ 2.5 for 1</div>
            <div>3 out of 3 pays........   6 for 1</div>
            <div>4 out of 4 pays........  11 for 1</div>
            <div>5 out of 5 pays........  22 for 1</div>
            <div>6 out of 6 pays........  39 for 1</div>
            <div>7 out of 7 pays........  69 for 1</div>
            <div>8 out of 8 pays........  99 for 1</div>
            <div>9 out of 9 pays........ 149 for 1</div>
            <div>0 out of 10 pays......   19 for 1</div>
            <div>9 out of 10 pays......   19 for 1</div>
            <div>10 out of 10 pays...... 299 for 1</div>
            <div>10 out of 11 pays......  19 for 1</div>
            <div>11 out of 11 pays...... 399 for 1</div>
            <div>11 out of 12 pays......  19 for 1</div>
            <div>12 out of 12 pays...... 499 for 1</div>
            <br/>
            <div>Maximum payoff per card: 7000.00 points</div>
            <br/><br/><br/>
            <div>__________________________________________________</div>
            <br/>
            <div>Detach and submit this portion of the card</div>
            <br/><br/><br/>
            <div>Name:_________________________</div>
            <br/><br/><br/><br/>
            <div>Points Wagered:________ No. of Picks:__________</div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    </>);
};
export default MyPreviewSecondPage;