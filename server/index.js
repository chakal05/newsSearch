const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS middleware
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
	})
);

// Helmet middleware
app.use(helmet());

// Handle request
app.get('/', (req, res) => {
	if (req)
		res.send([
			{
				id: 1,
				first_name: 'Kelly',
				last_name: 'Teager',
				email: 'kteager0@cnn.com',
				gender: 'Male',
				ip_address: '44.255.42.201',
			},
			{
				id: 2,
				first_name: 'Prescott',
				last_name: 'Bartrum',
				email: 'pbartrum1@mashable.com',
				gender: 'Male',
				ip_address: '29.214.6.234',
			},
			{
				id: 3,
				first_name: 'Ashlen',
				last_name: 'Erwin',
				email: 'aerwin2@adobe.com',
				gender: 'Female',
				ip_address: '99.150.168.56',
			},
			{
				id: 4,
				first_name: 'Karissa',
				last_name: 'Humpherson',
				email: 'khumpherson3@fc2.com',
				gender: 'Female',
				ip_address: '126.113.225.214',
			},
		]);
});

//Port

const port = process.env.port || 4000;
app.listen(port, () => console.log('APP RUNNING ON PORT 4000'));
