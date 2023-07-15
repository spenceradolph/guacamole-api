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

	// const result = await session.list_schema_users();
	// console.log(`${JSON.stringify(result, null, 4)}`);

	// const result = await session.create_user('test1user', 'test1pass');
	// console.log(`${JSON.stringify(result, null, 4)}`);

	await session.update_user('testtest', { 'guac-organization': 'testorg' });
})();
