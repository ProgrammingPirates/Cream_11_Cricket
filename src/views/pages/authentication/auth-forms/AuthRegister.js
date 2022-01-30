import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, ref, set } from 'firebase/database';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const firebaseConfig = {
		apiKey: 'AIzaSyBTEdS5J1bVN9rE92LxnvdESpUv4-SQS_o',
		authDomain: 'cream11-54582.firebaseapp.com',
		projectId: 'cream11-54582',
		storageBucket: 'cream11-54582.appspot.com',
		messagingSenderId: '1037476703629',
		appId: '1:1037476703629:web:a34eaf9ecc223d13a521c4',
		measurementId: 'G-PRPMTEKQF5',
	};

	// Initialize Firebase
	const app = firebase.initializeApp(firebaseConfig);

	function writeUserData(userId, firstName, lastName, email, password) {
		console.log('checkuser', userId, firstName, lastName, email, password);

		const db = getDatabase();
		set(ref(db, 'users/' + userId), {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		});
	}

	const signUpWithEmail = () => {
		console.log('user is', user);

		firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((users) => {
				console.log('user after auth', users);
				writeUserData(
					user.firstName + user.lastName,
					user.firstName,
					user.lastName,
					user.email,
					user.password
				);
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
				// ..
			});
	};

	const theme = useTheme();
	const scriptedRef = useScriptRef();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
	const customization = useSelector((state) => state.customization);
	const [showPassword, setShowPassword] = useState(false);
	const [checked, setChecked] = useState(true);

	const [strength, setStrength] = useState(0);
	const [level, setLevel] = useState();

	const googleHandler = async () => {
		console.error('Register');
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const changePassword = (value) => {
		const temp = strengthIndicator(value);
		setStrength(temp);
		setLevel(strengthColor(temp));
	};

	useEffect(() => {
		changePassword('123456');
	}, []);

	return (
		<>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item xs={12}>
					<AnimateButton>
						<Button
							variant="outlined"
							fullWidth
							onClick={googleHandler}
							size="large"
							sx={{
								color: 'grey.700',
								backgroundColor: theme.palette.grey[50],
								borderColor: theme.palette.grey[100],
							}}>
							<Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
								<img
									src={Google}
									alt="google"
									width={16}
									height={16}
									style={{ marginRight: matchDownSM ? 8 : 16 }}
								/>
							</Box>
							Sign up with Google
						</Button>
					</AnimateButton>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ alignItems: 'center', display: 'flex' }}>
						<Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
						<Button
							variant="outlined"
							sx={{
								cursor: 'unset',
								m: 2,
								py: 0.5,
								px: 7,
								borderColor: `${theme.palette.grey[100]} !important`,
								color: `${theme.palette.grey[900]}!important`,
								fontWeight: 500,
								borderRadius: `${customization.borderRadius}px`,
							}}
							disableRipple
							disabled>
							OR
						</Button>
						<Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
					</Box>
				</Grid>
				<Grid item xs={12} container alignItems="center" justifyContent="center">
					<Box sx={{ mb: 2 }}>
						<Typography variant="subtitle1">Sign up with Email address</Typography>
					</Box>
				</Grid>
			</Grid>
			<Grid container spacing={matchDownSM ? 0 : 2}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="First Name"
						margin="normal"
						name="fname"
						type="text"
						defaultValue=""
						sx={{ ...theme.typography.customInput }}
						onChange={(e) => setUser({ ...user, firstName: e.target.value })}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Last Name"
						margin="normal"
						name="lname"
						type="text"
						defaultValue=""
						sx={{ ...theme.typography.customInput }}
						onChange={(e) => setUser({ ...user, lastName: e.target.value })}
					/>
				</Grid>
			</Grid>
			<FormControl fullWidth sx={{ ...theme.typography.customInput }}>
				<InputLabel htmlFor="outlined-adornment-email-register">
					Email Address / Username
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-email-register"
					type="email"
					name="email"
					inputProps={{}}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ ...theme.typography.customInput }}>
				<InputLabel htmlFor="outlined-adornment-password-register">
					Password
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password-register"
					type={showPassword ? 'text' : 'password'}
					name="password"
					label="Password"
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
								size="large">
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
					inputProps={{}}
				/>
			</FormControl>
			<Box sx={{ mt: 2 }}>
				<AnimateButton>
					<Button
						disableElevation
						fullWidth
						size="large"
						type="submit"
						variant="contained"
						color="secondary"
						onClick={() => {
							signUpWithEmail();
						}}>
						Sign up
					</Button>
				</AnimateButton>
			</Box>
		</>
	);
};

export default FirebaseRegister;
