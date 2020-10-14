import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '3rem',
		// display: 'flex',
		// flexWrap: 'wrap',
	},
	form: {
		width: '70%',
		margin: '0 auto',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
	},
}));

export default function Annonser() {
	const classes = useStyles();
	return (
        <div className={classes.root}>
        <h1> Add annons </h1>
			<form className={classes.form}>
				<Grid container spacing={2} justify='center'>
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Title'
							fullWidth
							placeholder='Enter post title'
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Headline'
							fullWidth
							placeholder='Enter post headline'
						/>
					</Grid>
				
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Location'
							fullWidth
							placeholder='Enter location'
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Surface'
							fullWidth
							placeholder='Surface'
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Rent'
							fullWidth
							placeholder='Rent per month'
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Guests'
							fullWidth
							placeholder='Number of roommates'
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Rooms'
							fullWidth
							placeholder='Number of available rooms'
						/>
                    </Grid>
                    <Grid item xs={5}>
                    <p style={{margin:0}}> Picture  </p>
                    <TextField
                        type='file'
                        variant='outlined'
                     //   label='Picture'
                        fullWidth
                    />
                </Grid>
                    <Grid item xs={5}>
                
						<TextField
							type='text'
							variant='outlined'
							label='Move in'
							fullWidth
							placeholder='When can they move in'
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							type='text'
							variant='outlined'
							label='Move out'
							fullWidth
							placeholder='When should they move out'
						/>
                    </Grid>
                    <Grid item xs={10}>
                    <TextField
                        id='outlined-multiline-static'
                        label='Description'
                        multiline
                        rows={4}
                        fullWidth
                        defaultValue='Enter post description'
                        variant='outlined'
                    />
                </Grid>
				</Grid>
			</form>
		</div>
	);
}
