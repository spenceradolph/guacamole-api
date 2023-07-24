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

	// using these calls in a pretty vanilla guacamole install
	// whatever returns and is printed to the console is where the 'types' from

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

	// const getHistoryConnections = await session.getHistoryConnections();
	// console.log(`${JSON.stringify(getHistoryConnections, null, 4)}`);

	// const getUser = await session.getUser('guacadmin');
	// console.log(`${JSON.stringify(getUser, null, 4)}`);

	// const getUsers = await session.getUsers();
	// console.log(`${JSON.stringify(getUsers, null, 4)}`);

	// const getUserUsergroups = await session.getUserUsergroups('guacadmin');
	// console.log(`${JSON.stringify(getUserUsergroups, null, 4)}`);

	// const getUserEffectivePermissions = await session.getUserEffectivePermissions('guacadmin');
	// console.log(`${JSON.stringify(getUserEffectivePermissions, null, 4)}`);

	// const getUserPermissions = await session.getUserPermissions('guacadmin');
	// console.log(`${JSON.stringify(getUserPermissions, null, 4)}`);

	// const getUsersGroups = await session.getUsersGroups('guacadmin');
	// console.log(`${JSON.stringify(getUsersGroups, null, 4)}`);

	// const getUserHistory = await session.getUserHistory('guacadmin');
	// console.log(`${JSON.stringify(getUserHistory, null, 4)}`);

	// const createUser = await session.createUser('testuser1', 'password', { 'guac-full-name': 'fullname' });
	// console.log(`${JSON.stringify(createUser, null, 4)}`);

	// const updateUser = await session.updateUser('testuser1', { 'guac-full-name': 'newfulname' });
	// console.log(`${JSON.stringify(updateUser, null, 4)}`);

	// const updateUserPassword = await session.updateUserPassword('testuser1', 'newpassword', 'sssss');
	// console.log(`${JSON.stringify(updateUserPassword, null, 4)}`);

	// const updateUserAddUsergroups = await session.updateUserAddUsergroups('testuser1', 'testgroup');
	// console.log(`${JSON.stringify(updateUserAddUsergroups, null, 4)}`);

	// const updateUserRemoveUsergroups = await session.updateUserRemoveUsergroups('testuser1', 'testgroup');
	// console.log(`${JSON.stringify(updateUserRemoveUsergroups, null, 4)}`);

	// const getSelf = await session.getSelf();
	// console.log(`${JSON.stringify(getSelf, null, 4)}`);

	// const getSelfEffectivePermissions = await session.getSelfEffectivePermissions();
	// console.log(`${JSON.stringify(getSelfEffectivePermissions, null, 4)}`);

	// const deleteUser = await session.deleteUser('testtest');
	// console.log(`${JSON.stringify(deleteUser, null, 4)}`);

	// const getUsergroups = await session.getUsergroups();
	// console.log(`${JSON.stringify(getUsergroups, null, 4)}`);

	// const getUsergroup = await session.getUsergroup('testgroup');
	// console.log(`${JSON.stringify(getUsergroup, null, 4)}`);

	// const deleteUsergroup = await session.deleteUsergroup('testgroup');
	// console.log(`${JSON.stringify(deleteUsergroup, null, 4)}`);

	// const createUsergroup = await session.createUsergroup('testgroup', { disabled: true });
	// console.log(`${JSON.stringify(createUsergroup, null, 4)}`);

	// const updateUsergroup = await session.updateUsergroup('testgroup', { disabled: false });
	// console.log(`${JSON.stringify(updateUsergroup, null, 4)}`);

	// const updateUsergroupAddUser = await session.updateUsergroupAddUser('testuser1', 'testgroup');
	// console.log(`${JSON.stringify(updateUsergroupAddUser, null, 4)}`);

	// const updateUsergroupRemoveUser = await session.updateUsergroupRemoveUser('testuser1', 'testgroup');
	// console.log(`${JSON.stringify(updateUsergroupRemoveUser, null, 4)}`);

	// const getSelfUsergroups = await session.getSelfUsergroups();
	// console.log(`${JSON.stringify(getSelfUsergroups, null, 4)}`);

	// const getTunnels = await session.getTunnels();
	// console.log(`${JSON.stringify(getTunnels, null, 4)}`);

	const getConnections = await session.getConnections();
	console.log(`${JSON.stringify(getConnections, null, 4)}`);

	// const getConnection = await session.getConnection('8');
	// console.log(`${JSON.stringify(getConnection, null, 4)}`);

	// const getConnectionHistory = await session.getConnectionHistory('8');
	// console.log(`${JSON.stringify(getConnectionHistory, null, 4)}`);

	// const getConnectionSharingProfiles = await session.getConnectionSharingProfiles('8');
	// console.log(`${JSON.stringify(getConnectionSharingProfiles, null, 4)}`);

	// const getConnectionParameters = await session.getConnectionParameters('8');
	// console.log(`${JSON.stringify(getConnectionParameters, null, 4)}`);

	// const deleteConnection = await session.deleteConnection(8);
	// console.log(`${JSON.stringify(deleteConnection, null, 4)}`);

	// const getActiveConnections = await session.getActiveConnections();
	// console.log(`${JSON.stringify(getActiveConnections, null, 4)}`);

	const killActiveConnections = await session.killActiveConnections(['0c6cab5d-887b-3329-b174-fef96daac96e']);
	console.log(`${JSON.stringify(killActiveConnections, null, 4)}`);

	// const getSharingProfiles = await session.getSharingProfiles();
	// console.log(`${JSON.stringify(getSharingProfiles, null, 4)}`);

	// const getSharingProfile = await session.getSharingProfile(4);
	// console.log(`${JSON.stringify(getSharingProfile, null, 4)}`);

	// const getSharingProfileParameters = await session.getSharingProfileParameters(4);
	// console.log(`${JSON.stringify(getSharingProfileParameters, null, 4)}`);

	// const deleteSharingProfile = await session.deleteSharingProfile(4);
	// console.log(`${JSON.stringify(deleteSharingProfile, null, 4)}`);

	// const createSharingProfile = await session.createSharingProfile('testnameshare', 9, true);
	// console.log(`${JSON.stringify(createSharingProfile, null, 4)}`);

	// const getConnectionGroups = await session.getConnectionGroups();
	// console.log(`${JSON.stringify(getConnectionGroups, null, 4)}`);

	// const getConnectionGroup = await session.getConnectionGroup('3');
	// console.log(`${JSON.stringify(getConnectionGroup, null, 4)}`);

	// const getConnectionGroupTree = await session.getConnectionGroupTree('3');
	// console.log(`${JSON.stringify(getConnectionGroupTree, null, 4)}`);

	// const updateConnectionGroup = await session.updateConnectionGroup(3, 'newgroupname', {}, 'ROOT');
	// console.log(`${JSON.stringify(updateConnectionGroup, null, 4)}`);

	// const createConnectionGroup = await session.createConnectionGroup('newgsdfroupname', {}, 'ROOT');
	// console.log(`${JSON.stringify(createConnectionGroup, null, 4)}`);

	// const deleteConnectionGroup = await session.deleteConnectionGroup('3');
	// console.log(`${JSON.stringify(deleteConnectionGroup, null, 4)}`);
})();
