//react imports
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

//Slice imports
import { fetchCarDetail } from '../Slice/Cardetails/carDetailApi';

//hookType imports
import { useAppDispatch, useAppSelector } from '../HookTypes/HookTypes';

//MUI imports
import { Container } from '@mui/system';

const Search = () => {
	

	const location = useLocation();

	console.log('loaction',location);

	const state = location.state as any // coz type is unknown

	console.log('state',typeof state);


	const dispatch = useAppDispatch();

	const carDetails = useAppSelector((state) => state.carDetails);
	console.log(carDetails);

	type carDetail = {
		id: string;
		model: string;
		year: string;
		company: string;
		auctionEndTime: string;
	};

	const [ searchCarResult, setsearchCarResult ] = useState([] as carDetail[]);

	useEffect(() => {
		dispatch(fetchCarDetail());
	}, []);

	useEffect(
		() => {
			const searchCarResult = carDetails.carDetail.filter((details) =>
				Object.values(details).join('').toLowerCase().includes(state.toLowerCase())
			);
			console.log('searchSearch', searchCarResult);
			setsearchCarResult(searchCarResult);
		},
		[ state ]
	);

	return (
		<Container component="main" maxWidth="lg">
			<div className="row">
				{searchCarResult.map((details: carDetail) => (
					<div className="col-lg-4 col-sm-6 col-xs-12" key={details.id}>
						<div className="">
							<div className="">
								<img
									className="car_collection"
									src="https://s3.amazonaws.com/car.app.prod.bucket/production/1653352176877.jpeg"
									alt="post"
								/>
							</div>
							<div className="block_txt mb-0">
								<h6>
									<br />
									{`${details.year} ${details.model} ${details.company} `}
								</h6>
								<h6>Auction-End-Date {`${details.auctionEndTime}`}</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

export default Search;
