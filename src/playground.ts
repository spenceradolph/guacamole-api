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

	// const result = await session.create_user('test45user', 'test3pass', { 'guac-full-name': 'fullnametest5' });
	// const result = await session.create_user('test6user', 'test3pass', { 'guac-full-name': 'testfull' });
	// console.log(`${JSON.stringify(result, null, 4)}`);

	// await session.update_user('testtest', { 'guac-organization': 'testorg' });
	const result = await session.create_rdp_connection('test_rdp');
	console.log(`${JSON.stringify(result, null, 4)}`);
})();
