//react imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Slice imports
import { fetchCarDetail } from '../Slice/carDetailSlice';

//hookType Imports
import { useAppDispatch,useAppSelector } from '../HookTypes/HookTypes';

//Css imports
import '../App.css';

//MUI imports
import Container from '@mui/material/Container';


const Collections = () => {
	
	const companys = new Set();

	const dispatch = useAppDispatch();

	const carDetail = useAppSelector((state) => state.carDetails);

	console.log(carDetail);

	const [ company, setcompany ] = useState([ ...companys ]);
	const [ searchResult, setsearchResult ] = useState([ ...companys ]);
	const [ carDetails, setcarDetails ] = useState([]);
	const [ filterCarDetails, setfilterCarDetails ] = useState([]);

	useEffect(() => {
		dispatch(fetchCarDetail());
	}, []);

	useEffect(
		() => {
			
			setfilterCarDetails(carDetail.carDetail);

			setcarDetails(carDetail.carDetail);

			console.log('filter', filterCarDetails)

			carDetail.carDetail.map((details) => companys.add(details.company));

			setcompany([ ...companys ]);

			setsearchResult([ ...companys ]);

		}, [ carDetail ]);

	console.log('filter', filterCarDetails);

	const searchDropdown = (e) => {
		const search = e.target.value;

		const searchResult = company.filter((items) => items.includes(search.toUpperCase()));
		setsearchResult(searchResult);
		if (!search) {
			setsearchResult(company);
		}
	};

	const handleMenu = (e) => {
		console.log(e.target.getAttribute('data'))
		const search = e.target.getAttribute('data')
		const searchResult = carDetails.filter( details => Object.values(details).join('').toLowerCase().includes(search.toLowerCase()))
		setfilterCarDetails(searchResult)
		console.log('car',searchResult)
	};

	const handleReset = () => {
		setfilterCarDetails(carDetails);
	};

	return (
		<Container component="main" maxWidth="lg">
			<div className="row">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									id="navbarDropdownMenuLink"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									All Auction
								</a>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									id="navbarDropdownMenuLink"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Maker
								</a>

								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<input
										type="text"
										className="dropdown-item"
										id="dropdown-input"
										onKeyUp={searchDropdown}
									/>
									{searchResult.map((details) => (
										<a className="dropdown-item" data={details} onClick={handleMenu} key={details}>
											{details}
										</a>
									))}
								</div>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link"
									data="reset"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
									onClick={handleReset}
								>
									Reset Menu
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
			<div className="row">
				{filterCarDetails.map((details) => (
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
export default Collections;
