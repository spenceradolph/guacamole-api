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

	// tested, these api work
	// const getUserAttributes = await session.getUserAttributes();
	// console.log(`${JSON.stringify(getUserAttributes, null, 4)}`);

	// const getUserGroupAttributes = await session.getUserGroupAttributes();
	// console.log(`${JSON.stringify(getUserGroupAttributes, null, 4)}`);

	// const getConnectionAttributes = await session.getConnectionAttributes();
	// console.log(`${JSON.stringify(getConnectionAttributes, null, 4)}`);

	// const getSharingProfileAttributes = await session.getSharingProfileAttributes();
	// console.log(`${JSON.stringify(getSharingProfileAttributes, null, 4)}`);

	// const getConnectionGroupAttributes = await session.getConnectionGroupAttributes();
	// console.log(`${JSON.stringify(getConnectionGroupAttributes, null, 4)}`);

	// const getProtocols = await session.getProtocols();
	// console.log(`${JSON.stringify(getProtocols, null, 4)}`);

	// const getPatches = await session.getPatches();
	// console.log(`${JSON.stringify(getPatches, null, 4)}`);

	// const getLanguages = await session.getLanguages();
	// console.log(`${JSON.stringify(getLanguages, null, 4)}`);

	// const getConnectionHistory = await session.getConnectionHistory();
	// console.log(`${JSON.stringify(getConnectionHistory, null, 4)}`);

	// const getUser = await session.getUser('guacadmin');
	// console.log(`${JSON.stringify(getUser, null, 4)}`);

	// const getUsers = await session.getUsers();
	// console.log(`${JSON.stringify(getUsers, null, 4)}`);

	// const getUsersEffectivePermissions = await session.getUsersEffectivePermissions('guacadmin');
	// console.log(`${JSON.stringify(getUsersEffectivePermissions, null, 4)}`);

	// const getUsersPermissions = await session.getUsersPermissions('guacadmin');
	// console.log(`${JSON.stringify(getUsersPermissions, null, 4)}`);

	// const getUsersGroups = await session.getUsersGroups('guacadmin');
	// console.log(`${JSON.stringify(getUsersGroups, null, 4)}`);

	// const getUsersHistory = await session.getUsersHistory('guacadmin');
	// console.log(`${JSON.stringify(getUsersHistory, null, 4)}`);

	// const getSelf = await session.getSelf();
	// console.log(`${JSON.stringify(getSelf, null, 4)}`);

	// const getSelfEffectivePermissions = await session.getSelfEffectivePermissions();
	// console.log(`${JSON.stringify(getSelfEffectivePermissions, null, 4)}`);

	// const deleteUser = await session.deleteUser('test3user');
	// console.log(`${JSON.stringify(deleteUser, null, 4)}`);

	// const getUsergroups = await session.getUsergroups();
	// console.log(`${JSON.stringify(getUsergroups, null, 4)}`);

	// const getUsergroup = await session.getUsergroup('testgroup');
	// console.log(`${JSON.stringify(getUsergroup, null, 4)}`);

	// const deleteUsergroup = await session.deleteUsergroup('testgroup');
	// console.log(`${JSON.stringify(deleteUsergroup, null, 4)}`);

	// const createUsergroup = await session.createUsergroup('testgroup');
	// console.log(`${JSON.stringify(createUsergroup, null, 4)}`);

	// const getSelfUsergroups = await session.getSelfUsergroups();
	// console.log(`${JSON.stringify(getSelfUsergroups, null, 4)}`);

	// const getTunnels = await session.getTunnels();
	// console.log(`${JSON.stringify(getTunnels, null, 4)}`);

	// const getConnections = await session.getConnections();
	// console.log(`${JSON.stringify(getConnections, null, 4)}`);

	// const getActiveConnections = await session.getActiveConnections();
	// console.log(`${JSON.stringify(getActiveConnections, null, 4)}`);

	const getActiveConnections = await session.getActiveConnections();
	console.log(`${JSON.stringify(getActiveConnections, null, 4)}`);
})();
