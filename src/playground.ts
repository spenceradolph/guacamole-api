// This file used during testing.
// To run this code from command line, use the following command
// pnpm dlx ts-node ./src/playground.ts

import Guacamole from './guacamole';

(async () => {
	const session = await Guacamole.session({
		host: 'http://10.0.1.100:8080/guacamole',
		datasource: 'mysql',
		username: 'guacadmin',
		password: 'guacadmin',
	});

	const users = await session.list_users();
	console.log(`${JSON.stringify(users, null, 4)}`);
})();
