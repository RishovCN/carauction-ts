//React imports
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

//slice imports
import { setUser } from '../Slice/userSlice';

import { useAppDispatch, useAppSelector } from '../HookTypes/HookTypes';

//Third Party imports
import axios from 'axios';

//MUI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

	const [ userLogin, setuserLogin ] = useState<User>({
		email: '',
		password: ''
	});

	const user = useAppSelector( state => state.user)

	console.log('outSide:', user)

	let navigate = useNavigate();

	let dispatch = useAppDispatch()

	const handleInput = (event: { target: { name: string; value: string; }; }) => {

		const name = event.target.name;
		const value = event.target.value;

		console.log(name, value);
		
		setuserLogin({ ...userLogin, [name]: value });
	};

	const handleSignIn = (event: React.MouseEvent<HTMLFormElement>) => {
			event.preventDefault()
			
	
		 	axios.post(
			'https://car-auction-assignment.herokuapp.com/loginProfile',userLogin
		  ).then( res => {
			  sessionStorage.setItem('token',res.data.token)
			  dispatch(setUser(res.data))
			  navigate('/collections')
			  console.log('signIN',res)
			
		  })
		  .catch( err => console.log(err))
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
				<Typography component="h1" variant="h3" >
					Sign in to car auction
				</Typography>
				<Typography>
					No car auction account yet?
					<Link href="/signUp" variant="body2" sx={{ textDecoration: 'none', color: '#b3916b' }}>
						{'Create an account'}
					</Link>
				</Typography>

				<Box component="form" onSubmit={handleSignIn} noValidate  sx={{ mt: 1}}>
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
          <Grid container>
						<Grid item xs>
							<Link href="#" variant="h6" sx={{ textDecoration: 'none', color: '#b3916b' }}>
								Forgot password?
							</Link>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor:'#b3916b' }}>
						Sign In
					</Button>
					
				</Box>
			</Box>
		</Container>
	);
}
