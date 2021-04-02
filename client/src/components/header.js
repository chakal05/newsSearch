import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import '../styles/header.scss';
import Search from '../components/search';
import logo from '../assets/sasmiyaLogo.png';

export default function Header(props) {
	return (
		<div className='main'>
			<AppBar className='appBar' position='static' elevation={0}>
				<Toolbar className='toolB' style={{ height: '120px' }}>
					{props.show === 1 && (
						<>
							{' '}
							<NavLink to='/'>
								<Typography
									variant='h5'
									className='title'
									style={{
										marginRight: '0.3rem',
									}}>
									{' '}
									SasMiya{' '}
								</Typography>
							</NavLink>
							<NavLink to='/'>
								<img src={logo} alt='logo' className='logo' />
							</NavLink>
							<div className='boxSearch'>
								{props.show === 1 && (
									<Search onSubmit={() => {}} />
								)}
							</div>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
