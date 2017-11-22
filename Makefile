style:
	node_modules/.bin/eslint '**/*.js'

styled:
	node_modules/.bin/prettier '**/*.js' --write
	node_modules/.bin/eslint '**/*.js' --fix

testd:
	node_modules/.bin/karma start karma.conf.js

web:
	node_modules/.bin/webpack \
		--config=./example/webpack.config.js

webd:
	node_modules/.bin/webpack-dev-server \
		--config=./example/webpack.config.js
