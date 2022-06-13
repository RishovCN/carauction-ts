//react imports
import React, { useState} from 'react';

import { useNavigate } from "react-router-dom";

//third party imports
import axios, { AxiosResponse } from 'axios';

//api imports
import { CAR_AUCTION_HEROKU_API } from '../API/CarApi';

//MUI imports
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function SignIn() {

    type User = {
        email: string,
        password: string
    }

	let user : User = {
		email: '',
		password: ''
	} 

	const [ userRegistration, setuserRegistration ] = useState<AxiosResponse | User>(user);

	let navigate = useNavigate();


	const handleInput = (event: { currentTarget: { name: string; value: string | number; }; }) => {

		const name  = event.currentTarget.name; // change the type
		const value = event.currentTarget.value;

		console.log(name, value);

		setuserRegistration({ ...userRegistration, [name]: value });
	};


	const handleSignUp = (event:React.MouseEvent<HTMLFormElement>) => {

			event.preventDefault()

		 	
		  axios.post<User>(
			`${CAR_AUCTION_HEROKU_API}registerProfile`,
			userRegistration
		  ).then( () => {
			setuserRegistration(user),
			navigate("/")
		  }
		  ).catch(
			  err => console.log(err)
		  )
	  };



	return (
		<Container component="main" maxWidth="lg">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography component="h1" variant="h3">
					Sign Up To car auction
				</Typography>
				<Typography>
					Have car auction account.
					<Link href="/" variant="body2" sx={{ textDecoration: 'none', color: '#b3916b' }}>
						{'Sign in'}
					</Link>
				</Typography>
				<Grid />
				<form onSubmit={handleSignUp} >
				<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleInput}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleInput}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2, backgroundColor: '#b3916b' }}
					>
						Sign Up
					</Button>
				</form>	
			</Box>
		</Container>
	);
}
