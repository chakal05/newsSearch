const User = require('../../../server/routes/testUser');
const Article = require('../../../server/routes/testArticle');

describe('Creating new user', () => {
	it('Create a new user', (done) => {
		const user = new User({
			email: 'test@email.com',
			password: 'resl',
		});
		user.save().then(() => {
			done();
		});
	});
});

describe('Adding new article', () => {
	it('Add a new article', (done) => {
		const user = new Article({
			user: 'test',
			title: 'test',
			description: 'test',
			content: 'test',
			url: 'test',
			image: 'test',
			author: 'test',
			pubilshedAt: 'test',
		});
		user.save().then(() => {
			done();
		});
	});
});

describe('Removes user from dB',() => {
    it('Removes test user from dB', (done) => {
        User.deleteOne({email: 'test@email.com'}).then(() => {
            done();
        }
        )
    }
    )
}
)


describe('Removes article from dB',() => {
    it('Removes article from dB', (done) => {
        Article.deleteOne({title: 'test'}).then(() => {
            done();
        }
        )
    }
    )
}
)

