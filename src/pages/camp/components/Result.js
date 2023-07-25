import React from 'react';
import {useLocation} from 'react-router-dom';

function Result() {
	const location = useLocation();
	const data = location.state.data;

	return (
		<div className='container'>
			<h1>검색 결과</h1>
			<div className='row'>
				{data.map((camping) => (
					<div className='col-md-4' key={camping.campId}>
						<div className='card'>
							<img
								src={camping.image}
								alt={camping.name}
								className='card-img-top'
							/>
							<div className='card-body'>
								<h5 className='card-title'>{camping.name}</h5>
								<p className='card-text'>{camping.address}</p>
								<a
									href={camping.url}
									target='_blank'
									rel='noreferrer'
								>
									캠핑장 사이트
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Result;
