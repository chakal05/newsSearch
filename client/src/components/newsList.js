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
	Button,
} from '@material-ui/core';

export default function NewsList(props) {
	return (
		<div>
			<List className='root'>
				{props.data.map((item) => {
					const image = item.image.url
						? item.image.url
						: Avat;
					return (
						<>
							<ListItem alignItems='flex-start' key={item.id}>
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

								<Button hidden value={props.action} />
							</ListItem>

							<Divider variant='inset' component='li' />
						</>
					);
				})}
			</List>
		</div>
	);
}
