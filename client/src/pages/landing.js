import React from 'react';
import Search from '../components/search';
import Grid from '@material-ui/core/Grid';
import '../styles/landing.scss';
import logo from '../assets/sasmiyaLogo.png';
import MyHeader from '../components/header';

function Landing(props) {
	return (
        <div >
        <MyHeader logo={''} />
			<section className='landing'>
				<Grid className='container' container align='center'>
					<Grid item xs={12} className='box'>
                    <div className='logo'>
                    <img src={logo} alt='logo' className='imag' />
                    <br/>
                    <h1 className='topTxt'>
                    SasMiya
                </h1>
                    </div>
						<Search
							onSubmit={() => {
								props.history.push('/results');
							}}
						/>
					</Grid>
				</Grid>
			</section>
		</div>
	);
}

export default Landing;
