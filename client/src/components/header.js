import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import '../styles/header.scss';
import Search from '../components/search';
import logo from '../assets/sasmiyaLogo.png';

export default function Header(props) {
	return (
		<div className='root'>
			<AppBar className='appBar' position='static' elevation={0}>
				<Toolbar className='toolB' style={{ height: '120px' }}>
					{props.show === 1 && (
						<>
							<NavLink to='/'>
								<Typography
									variant='h5'
									style={{
										color: '#539B1E',
										marginRight: '0.3rem',
									}}>
									{' '}
									SasMiya{' '}
								</Typography>
							</NavLink>
							<div className='logo'>
								<NavLink to='/'>
									<img
										src={logo}
										alt='logo'
										style={{
											height: '60px',
											width: '60px',
											float: 'left',
											marginRight: '1rem',
										}}
									/>
								</NavLink>
								<div>
									{props.show === 1 && (
										<Search onSubmit={() => {}} />
									)}
								</div>
							</div>{' '}
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
