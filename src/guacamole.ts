import axios from 'axios';
import {
	ConnectionAttributes,
	ConnectionGroupAttributes,
	ConnectionHistory,
	ConnectionInfo,
	RDPConnectionParameters,
	SSHConnectionParameters,
	SchemaAttributes,
	SessionOptions,
	TelnetConnectionParameters,
	UserAttributes,
	UserHistory,
	UserPermissions,
} from './types';

/**
 * Helper class to create guacamole sessions.
 */
export default class Guacamole {
	/**
	 * Uses the username and password to grab a token from /api/tokens and use on subsequent api calls.
	 */
	static session = async ({ host, username, password, datasource }: SessionOptions) => {
		// TODO: add try/catch or throw errors if username/password is incorrect
		const { data } = await axios.post(`${host}/api/tokens`, { username, password }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

		return new Session(host, datasource, data.authToken);
	};
}

/**
 * Currently authenticated guacamole session.
 */
class Session {
	readonly host: string;
	readonly datasource: string;
	readonly token: string;

	constructor(host: string, datasource: string, token: string) {
		this.host = host;
		this.datasource = datasource;
		this.token = token; // provided by Guacamole class static function
	}

	// Helpers (automatically add the token to the request, and forward generic for optional return typing)
	// Also destruct the data out of the response and return it
	private authGet = async <GenericReturnType>(endpoint: string) => {
		const { data } = await axios.get<GenericReturnType>(`${this.host}${endpoint}`, { params: { token: this.token } });
		return data;
	};

	private authPost = async <GenericReturnType>(endpoint: string, postdata: any) => {
		const { data } = await axios.post<GenericReturnType>(`${this.host}${endpoint}`, postdata, { params: { token: this.token } });
		return data;
	};

	private authPut = async <GenericReturnType>(endpoint: string, putdata: any) => {
		const { data } = await axios.put<GenericReturnType>(`${this.host}${endpoint}`, putdata, { params: { token: this.token } });
		return data;
	};

	private authPatch = async (endpoint: string, patchdata: any) => {
		const { data } = await axios.patch<''>(`${this.host}${endpoint}`, patchdata, { params: { token: this.token } });
		return data; // TODO: confirm if patch and delete always return '' as the type (no more need for generic if true)
	};

	private authDelete = async (endpoint: string) => {
		const { data } = await axios.delete<''>(`${this.host}${endpoint}`, { params: { token: this.token } });
		return data;
	};

	// TODO: add return types
	// /patches
	getPatches = async () => await this.authGet<string[]>(`/api/patches`);

	// /languages
	getLanguages = async () => await this.authGet<{ [lang_code: string]: string }>(`/api/languages`);

	// /history
	getHistoryConnections = async () => await this.authGet<ConnectionHistory>(`/api/session/data/${this.datasource}/history/connections`);
	// TODO: investigate /history/connections/${id}

	// /schema
	getProtocols = async () =>
		await this.authGet<{
			[conn_type: string]: {
				name: string;
				connectionForms: SchemaAttributes[];
				sharingProfileForms: SchemaAttributes[];
			};
		}>(`/api/session/data/${this.datasource}/schema/protocols`);
	getUserAttributes = async () => await this.authGet<SchemaAttributes[]>(`/api/session/data/${this.datasource}/schema/userAttributes`);
	getUserGroupAttributes = async () => await this.authGet<SchemaAttributes[]>(`/api/session/data/${this.datasource}/schema/userGroupAttributes`);
	getConnectionAttributes = async () => await this.authGet<SchemaAttributes[]>(`/api/session/data/${this.datasource}/schema/connectionAttributes`);
	getSharingProfileAttributes = async () => await this.authGet<SchemaAttributes[]>(`/api/session/data/${this.datasource}/schema/sharingProfileAttributes`);
	getConnectionGroupAttributes = async () => await this.authGet<SchemaAttributes[]>(`/api/session/data/${this.datasource}/schema/connectionGroupAttributes`);

	// /users
	getUsers = async () => {
		return await this.authGet<{
			[username: string]: {
				username: string;
				attributes: UserAttributes;
				lastActive: number;
			};
		}>(`/api/session/data/${this.datasource}/users`);
	};
	getUser = async (user: string) =>
		await this.authGet<{ username: string; attributes: UserAttributes; lastActive: number }>(`/api/session/data/${this.datasource}/users/${user}`);
	getUserUsergroups = async (user: string) => await this.authGet<string[]>(`/api/session/data/${this.datasource}/users/${user}/userGroups`);
	getUserPermissions = async (user: string) => await this.authGet<UserPermissions>(`/api/session/data/${this.datasource}/users/${user}/permissions`);
	getUserEffectivePermissions = async (user: string) =>
		await this.authGet<UserPermissions>(`/api/session/data/${this.datasource}/users/${user}/effectivePermissions`);
	getUserHistory = async (user: string) => await this.authGet<UserHistory>(`/api/session/data/${this.datasource}/users/${user}/history`);
	deleteUser = async (user: string) => await this.authDelete(`/api/session/data/${this.datasource}/users/${user}`);
	createUser = async (username: string, password: string, attributes?: UserAttributes) => {
		return await this.authPost<{
			username: string;
			password: string;
			attributes: UserAttributes;
		}>(`/api/session/data/${this.datasource}/users`, {
			username,
			password,
			attributes: attributes ?? {},
		});
	};
	updateUser = async (username: string, attributes: UserAttributes) => {
		return await this.authPut<''>(`/api/session/data/${this.datasource}/users/${username}`, {
			username,
			attributes,
		});
	};
	updateUserPassword = async (username: string, oldPassword: string, newPassword: string) => {
		return await this.authPut<''>(`/api/session/data/${this.datasource}/users/${username}/password`, {
			oldPassword,
			newPassword,
		});
	};
	updateUserAddUsergroups = async (username: string, groupnames: string[]) => {
		return await this.authPatch(
			`/api/session/data/${this.datasource}/users/${username}/userGroups`,
			groupnames.map((groupname) => ({ op: 'add', path: '/', value: groupname }))
		);
	};
	updateUserRemoveUsergroups = async (username: string, groupnames: string[]) => {
		return await this.authPatch(
			`/api/session/data/${this.datasource}/users/${username}/userGroups`,
			groupnames.map((groupname) => ({ op: 'remove', path: '/', value: groupname }))
		);
	};

	// /self
	getSelf = async () => await this.authGet<{ username: string; attributes: UserAttributes; lastActive: number }>(`/api/session/data/${this.datasource}/self`);
	getSelfEffectivePermissions = async () => await this.authGet<UserPermissions>(`/api/session/data/${this.datasource}/self/effectivePermissions`);
	getSelfUsergroups = async () => await this.authGet<string[]>(`/api/session/data/${this.datasource}/self/userGroups`);

	// /userGroups
	getUsergroups = async () =>
		await this.authGet<{ [groupname: string]: { identifier: string; attributes: { disabled: any } } }>(`/api/session/data/${this.datasource}/userGroups`);
	getUsergroup = async (id: string) =>
		await this.authGet<{ identifier: string; attributes: { disabled: any } }>(`/api/session/data/${this.datasource}/userGroups/${id}`);
	deleteUsergroup = async (id: string) => await this.authDelete(`/api/session/data/${this.datasource}/userGroups/${id}`);
	createUsergroup = async (identifier: string, attributes: { disabled?: boolean } = {}) => {
		return await this.authPost<{ identifier: string; attributes: { disabled?: any } }>(`/api/session/data/${this.datasource}/userGroups`, {
			identifier,
			attributes,
		});
	};
	updateUsergroup = async (identifier: string, attributes: { disabled: boolean }) => {
		return await this.authPut<''>(`/api/session/data/${this.datasource}/userGroups/${identifier}`, {
			identifier,
			attributes,
		});
	};
	updateUsergroupAddUser = async (groupname: string, usernames: string[]) => {
		return await this.authPatch(
			`/api/session/data/${this.datasource}/userGroups/${groupname}/memberUsers`,
			usernames.map((username) => ({ op: 'add', path: '/', value: username }))
		);
	};
	updateUsergroupRemoveUser = async (groupname: string, usernames: string[]) => {
		return await this.authPatch(
			`/api/session/data/${this.datasource}/userGroups/${groupname}/memberUsers`,
			usernames.map((username) => ({ op: 'remove', path: '/', value: username }))
		);
	};

	// /tunnels
	getTunnels = async () => await this.authGet<any[]>(`/api/session/tunnels`);

	// /connections
	getConnections = async () =>
		await this.authGet<{
			[identifier: string]: ConnectionInfo;
		}>(`/api/session/data/${this.datasource}/connections`);
	getConnection = async (id: string) => await this.authGet<ConnectionInfo>(`/api/session/data/${this.datasource}/connections/${id}`);
	getConnectionHistory = async (id: string) => await this.authGet<ConnectionHistory>(`/api/session/data/${this.datasource}/connections/${id}/history`);
	getConnectionSharingProfiles = async (id: string) =>
		await this.authGet<{ [profileId: string]: { name: string; identifier: string; primaryConnectionIdentifier: string; attributes: any } }>(
			`/api/session/data/${this.datasource}/connections/${id}/sharingProfiles`
		);
	getConnectionParameters = async (id: string) =>
		await this.authGet<SSHConnectionParameters | RDPConnectionParameters | TelnetConnectionParameters>(
			`/api/session/data/${this.datasource}/connections/${id}/parameters`
		); // TODO: all the other connection parameter types
	deleteConnection = async (id: number) => await this.authDelete(`/api/session/data/${this.datasource}/connections/${id}`);
	createSSHConnection = async (name: string, parameters: SSHConnectionParameters = {}, attributes: ConnectionAttributes = {}, parentIdentifier: string) => {
		return await this.authPost<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			protocol: 'ssh';
			parameters: SSHConnectionParameters;
			attributes: ConnectionAttributes;
			activeConnections: number;
		}>(`/api/session/data/${this.datasource}/connections`, {
			name,
			protocol: 'ssh',
			parentIdentifier,
			parameters,
			attributes,
		});
	};
	createRDPConnection = async (name: string, parameters: RDPConnectionParameters = {}, attributes: ConnectionAttributes = {}, parentIdentifier: string) => {
		return await this.authPost<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			protocol: 'rdp';
			parameters: RDPConnectionParameters;
			attributes: ConnectionAttributes;
			activeConnections: number;
		}>(`/api/session/data/${this.datasource}/connections`, {
			name,
			protocol: 'rdp',
			parentIdentifier,
			parameters,
			attributes,
		});
	};
	createTelnetConnection = async (
		name: string,
		parameters: TelnetConnectionParameters = {},
		attributes: ConnectionAttributes = {},
		parentIdentifier: string
	) => {
		// TODO: consider using zod to verify results are what we think they are
		return await this.authPost<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			protocol: 'telnet';
			parameters: TelnetConnectionParameters;
			attributes: ConnectionAttributes;
			activeConnections: number;
		}>(`/api/session/data/${this.datasource}/connections`, {
			name,
			protocol: 'rdp',
			parentIdentifier,
			parameters,
			attributes,
		});
	};
	updateSSHConnection = async (
		id: number,
		name: string,
		parameters: SSHConnectionParameters = {},
		attributes: ConnectionAttributes = {},
		parentIdentifier: string
	) => {
		return await this.authPut<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			protocol: 'ssh';
			parameters: SSHConnectionParameters;
			attributes: ConnectionAttributes;
			activeConnections: number;
		}>(`/api/session/data/${this.datasource}/connections/${id}`, {
			name,
			protocol: 'ssh',
			parentIdentifier,
			parameters,
			attributes,
		});
	};
	updateTelnetConnection = async (
		id: number,
		name: string,
		parameters: TelnetConnectionParameters = {},
		attributes: ConnectionAttributes = {},
		parentIdentifier: string
	) => {
		return await this.authPut<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			protocol: 'telnet';
			parameters: TelnetConnectionParameters;
			attributes: ConnectionAttributes;
			activeConnections: number;
		}>(`/api/session/data/${this.datasource}/connections/${id}`, {
			name,
			protocol: 'ssh',
			parentIdentifier,
			parameters,
			attributes,
		});
	};
	updateRDPConnection = async (
		id: number,
		name: string,
		parameters: RDPConnectionParameters = {},
		attributes: ConnectionAttributes = {},
		parentIdentifier: string
	) => {
		return await this.authPut<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			protocol: 'rdp';
			parameters: RDPConnectionParameters;
			attributes: ConnectionAttributes;
			activeConnections: number;
		}>(`/api/session/data/${this.datasource}/connections/${id}`, {
			name,
			protocol: 'ssh',
			parentIdentifier,
			parameters,
			attributes,
		});
	};

	// /activeConnections
	getActiveConnections = async () =>
		await this.authGet<{
			[uuid: string]: {
				identifier: string;
				connectionIdentifier: string;
				startDate: string;
				remoteHost: string;
				username: string;
				connectable: boolean;
			};
		}>(`/api/session/data/${this.datasource}/activeConnections`);
	killActiveConnections = async (identifiers: string[]) =>
		await this.authPatch(
			`/api/session/data/${this.datasource}/activeConnections`,
			identifiers.map((id) => ({
				op: 'remove',
				path: `/${id}`,
			}))
		);

	// /sharingProfile
	getSharingProfiles = async () =>
		await this.authGet<{
			[identifier: string]: {
				name: string;
				identifier: string;
				primaryConnectionIdentifier: string;
				attributes: any;
			};
		}>(`/api/session/data/${this.datasource}/sharingProfiles`);
	getSharingProfile = async (sharingId: number) =>
		await this.authGet<{
			name: string;
			identifier: string;
			primaryConnectionIdentifier: string;
			attributes: any;
		}>(`/api/session/data/${this.datasource}/sharingProfiles/${sharingId}`);
	getSharingProfileParameters = async (sharingId: number) =>
		await this.authGet<{ [parameter: string]: any }>(`/api/session/data/${this.datasource}/sharingProfiles/${sharingId}/parameters`);
	deleteSharingProfile = async (id: number) => await this.authDelete(`/api/session/data/${this.datasource}/sharingProfiles/${id}`);
	createSharingProfile = async (name: string, connectionId: number, readonly: boolean) => {
		return await this.authPost<{
			name: string;
			identifier: string;
			primaryConnectionIdentifier: string;
			parameters: { 'read-only': string }; // TODO: if this shouldn't be less typed (unsure/unknown what parameters might exist...)
			attributes: any;
		}>(`/api/session/data/${this.datasource}/sharingProfiles`, {
			name,
			primaryConnectionIdentifier: connectionId,
			parameters: {
				'read-only': readonly ? 'true' : '', // TODO: determine if this is always the parameter (or just happens to be there during testing ssh connections...)
			},
			attributes: {},
		});
	};

	// /connectionGroups
	getConnectionGroups = async () =>
		await this.authGet<{
			[identifier: string]: {
				name: string;
				identifier: string;
				parentIdentifier: string;
				type: string;
				activeConnections: string;
				attributes: {
					'max-connections': any;
					'max-connections-per-user': any;
					'enable-session-affinity': string; // TODO: determine if some of the strings "true" can be safely 'typed' as true booleans when using the api
				};
			};
		}>(`/api/session/data/${this.datasource}/connectionGroups`);
	getConnectionGroup = async (groupId: string) =>
		await this.authGet<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			type: string;
			activeConnections: string;
			attributes: {
				'max-connections': any;
				'max-connections-per-user': any;
				'enable-session-affinity': string; // TODO: determine if some of the strings "true" can be safely 'typed' as true booleans when using the api
			};
		}>(`/api/session/data/${this.datasource}/connectionGroups/${groupId}`);
	// TODO: this function returns identical information as getConnectionGroup
	getConnectionGroupTree = async (group: string) =>
		await this.authGet<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			type: string;
			activeConnections: string;
			attributes: {
				'max-connections': any;
				'max-connections-per-user': any;
				'enable-session-affinity': string;
			};
		}>(`/api/session/data/${this.datasource}/connectionGroups/${group}/tree`);
	updateConnectionGroup = async (id: number, name: string, attributes: ConnectionGroupAttributes, parentIdentifier: string) => {
		return await this.authPut<''>(`/api/session/data/${this.datasource}/connectionGroups/${id}`, {
			name,
			parentIdentifier,
			type: 'ORGANIZATIONAL',
			attributes,
		});
	};
	createConnectionGroup = async (name: string, attributes: ConnectionGroupAttributes, parentIdentifier: string) => {
		return await this.authPost<{
			name: string;
			identifier: string;
			parentIdentifier: string;
			type: string;
			activeConnections: number;
			attributes: any;
		}>(`/api/session/data/${this.datasource}/connectionGroups`, {
			name,
			parentIdentifier,
			type: 'ORGANIZATIONAL', // TODO: also could do 'balancing'
			attributes,
		});
	};
	deleteConnectionGroup = async (groupId: string) => {
		return await this.authDelete(`/api/session/data/${this.datasource}/connectionGroups/${groupId}`);
	};

	/////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////

	// detail_tunnels = async (tunId: number) => await this.authGet(`/api/session/tunnels/${tunId}/activeConnection/connection/sharingProfiles`);

	// TODO: the rest of these...(and possibly more not known about...)
	// and document things that have changed / no longer available
	// create / manage / update things
	// update_user_connection = async (username: string) => {};
	// update_user_permissions = async (username: string) => {};
	// update_usergroup_membergroup = async (usergroup: string) => {};
	// update_usergroup_parentgroup = async (usergroup: string) => {};
	// update_usergroup_permissions = async (usergroup: string) => {};
	// update_usergroup_connection = async (usergroup: string) => {};
	// list_connection_group_connections = async () => await this.authGet(`/api/session/data/${this.datasource}/connectionGroups/ROOT/tree`);

	// NOT FOUND https://github.com/ridvanaltun/guacamole-rest-api-documentation/blob/master/docs/EXTENTIONS.md
	// detail_extensions = async () => await this.authGet(`/api/session/ext/${this.datasource}`);

	// likely depricated? (not in javascript source code...)
	// list_history_users = async () => await this.authGet(`/api/session/data/${this.datasource}/history/users`);

	// getSelfEffectivePermissions was new (tested and worked...)
	// getSelfUsergroups is new
	// getActiveConnection is new
}
