import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avat from  '../assets/image.png';
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
} from '@material-ui/core';

export default function NewsList(props) {
	return (
		<>
			<List className='main'>
				{props.data.map((item) => {
					const image = item.image.url
						? item.image.url
						: Avat;
					return (
						<div key={item.id} >
							<ListItem alignItems='flex-start' >
								<ListItemAvatar>
									<Avatar
										className='avatar'
										alt='Remy Sharp'
										src={image}
									/>
								</ListItemAvatar>
								<a
									href={item.url}
									target='_blank'
									rel='noopener noreferrer'>
									<ListItemText
										primary={item.title}
										secondary={
											<React.Fragment>
												<Typography
													component='span'
													variant='body2'
													className='inline'
													color='textPrimary'>
													Source:{' '}
													{props.action === 0
														? item.provider
														: item.provider.name}
												</Typography>{' '}
												<br />
												<Typography
													component='span'
													variant='body1'
													className='inline'
													color='textPrimary'>
													{item.description}
												</Typography>{' '}
												<br />
												{`Published:  ${item.datePublished
													.split('T')
													.shift()} at ${item.datePublished
													.split('T')
													.pop()}`}
											</React.Fragment>
										}
									/>
								</a>

							</ListItem>

							<Divider variant='inset' component='li' />
						</div>
					);
				})}
			</List>
		</>
	);
}
