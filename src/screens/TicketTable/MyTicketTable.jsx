import React, { useState } from 'react';
import '../../assets/css/main.css'
import { Button } from 'react-bootstrap';


const MyTicketTable = ({ data, myFunc }) => {
	return (
		<div>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Team</th>
						<th>Time</th>
						<th>Team</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{(data.length > 0) &&
						data.map((units, index) => {
							return (
								<tr key={index}>
									<td className='mytable'>
										<div>{units.leftTeam}&nbsp;{units.leftFirstPercentage}</div>
										<div>Over&nbsp;{units.leftSecondPercentage}</div>
									</td>
									<td className='mytable'>
										<div>{units.gameTitle}</div>
										<div>{units.day}</div>
										<div>{units.time}</div>
									</td>
									<td className='mytable'>
										<div>{units.rightTeam}&nbsp;{units.rightFirstPercentage}</div>
										<div>Under&nbsp;{units.rightSecondPercentage}</div>
									</td>
									<td className='mytable'>
										<Button variant="secondary" onClick={()=>myFunc(index)}>Edit</Button>
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	);
}

export default MyTicketTable;