import axios from 'axios';

type SessionOptions = {
	host: string;
	datasource: string;
	username: string;
	password: string;
};

type UserAttributes = {
	'guac-email-address'?: string | null;
	'guac-organizational-role'?: string | null;
	'guac-full-name'?: string | null;
	expired?: string | null;
	timezone?: string | null;
	'access-window-start'?: string | null;
	'guac-organization'?: string | null;
	'access-window-end'?: string | null;
	disabled?: string | null;
	'valid-until'?: string | null;
	'valid-from'?: string | null;
};

type ConnectionAttributes = {
	'max-connections'?: string | null;
	'max-connections-per-user'?: string | null;
	weight?: string | null;
	'failover-only'?: string | null;
	'guacd-port'?: string | null;
	'guacd-encryption'?: string | null;
	'guacd-hostname'?: string | null;
};

type SSHConnectionParameters = {
	port?: string | null;
	'read-only'?: string | null;
	'swap-red-blue'?: string | null;
	cursor?: string | null;
	'color-depth'?: string | null;
	'clipboard-encoding'?: string | null;
	'disable-copy'?: string | null;
	'disable-paste'?: string | null;
	'dest-port'?: string | null;
	'recording-exclude-output'?: string | null;
	'recording-exclude-mouse'?: string | null;
	'recording-include-keys'?: string | null;
	'create-recording-path'?: string | null;
	'enable-sftp'?: string | null;
	'sftp-port'?: string | null;
	'sftp-server-alive-interval'?: string | null;
	'enable-audio'?: string | null;
	'color-scheme'?: string | null;
	'font-size'?: string | null;
	scrollback?: string | null;
	timezone?: string | null;
	'server-alive-interval'?: string | null;
	backspace?: string | null;
	'terminal-type'?: string | null;
	'create-typescript-path'?: string | null;
	hostname?: string | null;
	'host-key'?: string | null;
	'private-key'?: string | null;
	username?: string | null;
	password?: string | null;
	passphrase?: string | null;
	'font-name'?: string | null;
	command?: string | null;
	locale?: string | null;
	'typescript-path'?: string | null;
	'typescript-name'?: string | null;
	'recording-path'?: string | null;
	'recording-name'?: string | null;
	'sftp-root-directory'?: string | null;
};

type RDPConnectionParameters = {
	port?: string | null;
	'read-only'?: string | null;
	'swap-red-blue'?: string | null;
	cursor?: string | null;
	'color-depth'?: string | null;
	'clipboard-encoding'?: string | null;
	'disable-copy'?: string | null;
	'disable-paste'?: string | null;
	'dest-port'?: string | null;
	'recording-exclude-output'?: string | null;
	'recording-exclude-mouse'?: string | null;
	'recording-include-keys'?: string | null;
	'create-recording-path'?: string | null;
	'enable-sftp'?: string | null;
	'sftp-port'?: string | null;
	'sftp-server-alive-interval'?: string | null;
	'enable-audio'?: string | null;
	security?: string | null;
	'disable-auth'?: string | null;
	'ignore-cert'?: string | null;
	'gateway-port'?: string | null;
	'server-layout'?: string | null;
	timezone?: string | null;
	console?: string | null;
	width?: string | null;
	height?: string | null;
	dpi?: string | null;
	'resize-method'?: string | null;
	'console-audio'?: string | null;
	'disable-audio'?: string | null;
	'enable-audio-input'?: string | null;
	'enable-printing'?: string | null;
	'enable-drive'?: string | null;
	'create-drive-path'?: string | null;
	'enable-wallpaper'?: string | null;
	'enable-theming'?: string | null;
	'enable-font-smoothing'?: string | null;
	'enable-full-window-drag'?: string | null;
	'enable-desktop-composition'?: string | null;
	'enable-menu-animations'?: string | null;
	'disable-bitmap-caching'?: string | null;
	'disable-offscreen-caching'?: string | null;
	'disable-glyph-caching'?: string | null;
	'preconnection-id'?: string | null;
	hostname?: string | null;
	username?: string | null;
	password?: string | null;
	domain?: string | null;
	'gateway-hostname'?: string | null;
	'gateway-username'?: string | null;
	'gateway-password'?: string | null;
	'gateway-domain'?: string | null;
	'initial-program'?: string | null;
	'client-name'?: string | null;
	'printer-name'?: string | null;
	'drive-name'?: string | null;
	'drive-path'?: string | null;
	'static-channels'?: string | null;
	'remote-app'?: string | null;
	'remote-app-dir'?: string | null;
	'remote-app-args'?: string | null;
	'preconnection-blob'?: string | null;
	'load-balance-info'?: string | null;
	'recording-path'?: string | null;
	'recording-name'?: string | null;
	'sftp-hostname'?: string | null;
	'sftp-host-key'?: string | null;
	'sftp-username'?: string | null;
	'sftp-password'?: string | null;
	'sftp-private-key'?: string | null;
	'sftp-passphrase'?: string | null;
	'sftp-root-directory'?: string | null;
	'sftp-directory'?: string | null;
};

type TelnetConnectionParameters = {
	port?: string | null;
	'read-only'?: string | null;
	'swap-red-blue'?: string | null;
	cursor?: string | null;
	'color-depth'?: string | null;
	'clipboard-encoding'?: string | null;
	'disable-copy'?: string | null;
	'disable-paste'?: string | null;
	'dest-port'?: string | null;
	'recording-exclude-output'?: string | null;
	'recording-exclude-mouse'?: string | null;
	'recording-include-keys'?: string | null;
	'create-recording-path'?: string | null;
	'enable-sftp'?: string | null;
	'sftp-port'?: string | null;
	'sftp-server-alive-interval'?: string | null;
	'enable-audio'?: string | null;
	'color-scheme'?: string | null;
	'font-size'?: string | null;
	scrollback?: string | null;
	backspace?: string | null;
	'terminal-type'?: string | null;
	'create-typescript-path'?: string | null;
	hostname?: string | null;
	username?: string | null;
	password?: string | null;
	'username-regex'?: string | null;
	'password-regex'?: string | null;
	'login-success-regex'?: string | null;
	'login-failure-regex'?: string | null;
	'font-name'?: string | null;
	'typescript-path'?: string | null;
	'typescript-name'?: string | null;
	'recording-path'?: string | null;
	'recording-name'?: string | null;
};

type ConnectionGroupAttributes = {
	'max-connections'?: string | null;
	'max-connections-per-user'?: string | null;
	'enable-session-affinity'?: string | null;
};

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

	private authPatch = async <GenericReturnType>(endpoint: string, patchdata: any) => {
		const { data } = await axios.patch<GenericReturnType>(`${this.host}${endpoint}`, patchdata, { params: { token: this.token } });
		return data;
	};

	private authDelete = async <GenericReturnType>(endpoint: string) => {
		const { data } = await axios.delete<GenericReturnType>(`${this.host}${endpoint}`, { params: { token: this.token } });
		return data;
	};

	// TODO: add return types
	list_schema_users = async () => await this.authGet(`/api/session/data/${this.datasource}/schema/userAttributes`);
	list_schema_groups = async () => await this.authGet(`/api/session/data/${this.datasource}/schema/userGroupAttributes`);
	list_schema_connections = async () => await this.authGet(`/api/session/data/${this.datasource}/schema/connectionAttributes`);
	list_schema_sharing = async () => await this.authGet(`/api/session/data/${this.datasource}/schema/sharingProfileAttributes`);
	list_schema_connection_group = async () => await this.authGet(`/api/session/data/${this.datasource}/schema/connectionGroupAttributes`);
	list_schema_protocols = async () => await this.authGet(`/api/session/data/${this.datasource}/schema/protocols`);
	list_patches = async () => await this.authGet(`/api/patches`);
	list_languages = async () => await this.authGet(`/api/languages`);
	detail_extensions = async () => await this.authGet(`/api/session/ext/${this.datasource}`);
	list_history_users = async () => await this.authGet(`/api/session/data/${this.datasource}/history/users`);
	list_history_connections = async () => await this.authGet(`/api/session/data/${this.datasource}/history/connections`);
	detail_user = async (user: string) => await this.authGet(`/api/session/data/${this.datasource}/users/${user}`);
	detail_user_permissions = async (user: string) => await this.authGet(`/api/session/data/${this.datasource}/users/${user}/permissions`);
	detail_user_effective_permissions = async (user: string) => await this.authGet(`/api/session/data/${this.datasource}/users/${user}/effectivePermissions`);
	detail_user_groups = async (user: string) => await this.authGet(`/api/session/data/${this.datasource}/users/${user}/userGroups`);
	detail_user_history = async (user: string) => await this.authGet(`/api/session/data/${this.datasource}/users/${user}/history`);
	detail_self = async () => await this.authGet(`/api/session/data/${this.datasource}/self`);
	delete_user = async (user: string) => await this.authDelete(`/api/session/data/${this.datasource}/users/${user}`);
	list_usergroups = async () => await this.authGet(`/api/session/data/${this.datasource}/userGroups`);
	detail_usergroup = async (groupname: string) => await this.authGet(`/api/session/data/${this.datasource}/userGroups/${groupname}`);
	delete_usergroup = async (id: string) => await this.authDelete(`/api/session/data/${this.datasource}/userGroups/${id}`);
	list_tunnels = async () => await this.authGet(`/api/session/tunnels`);
	detail_tunnels = async (tunId: number) => await this.authGet(`/api/session/tunnels/${tunId}/activeConnection/connection/sharingProfiles`);
	list_connections = async () => await this.authGet(`/api/session/data/${this.datasource}/connections`);
	list_active_connections = async () => await this.authGet(`/api/session/data/${this.datasource}/activeConnections`);
	list_sharing_profile = async () => await this.authGet(`/api/session/data/${this.datasource}/sharingProfiles`);
	details_sharing_profile = async (sharingId: number) => await this.authGet(`/api/session/data/${this.datasource}/sharingProfiles/${sharingId}`);
	delete_sharing_profile = async (id: number) => await this.authDelete(`/api/session/data/${this.datasource}/sharingProfiles/${id}`);
	delete_connection = async (id: number) => await this.authDelete(`/api/session/data/${this.datasource}/connections/${id}`);
	list_connection_groups = async () => await this.authGet(`/api/session/data/${this.datasource}/connectionGroups`);
	list_connection_group_connections = async () => await this.authGet(`/api/session/data/${this.datasource}/connectionGroups/ROOT/tree`);
	details_connection_group = async (id: string) => await this.authGet(`/api/session/data/${this.datasource}/connectionGroups/${id}`);
	details_connection_group_connections = async (id: string) => await this.authGet(`/api/session/data/${this.datasource}/connectionGroups/${id}/tree`);
	delete_connection_group = async (group: string) => await this.authDelete(`/api/session/data/${this.datasource}/connectionGroups/${group}`);
	detail_connection = async (id: string) => await this.authGet(`/api/session/data/${this.datasource}/connections/${id}`);
	detail_connection_parameters = async (id: string) => await this.authGet(`/api/session/data/${this.datasource}/connections/${id}/parameters`);
	detail_connection_history = async (id: string) => await this.authGet(`/api/session/data/${this.datasource}/connections/${id}/history`);
	detail_connection_sharing = async (id: string) => await this.authGet(`/api/session/data/${this.datasource}/connections/${id}/sharingProfiles`);

	list_users = async () => {
		return await this.authGet<{
			[username: string]: {
				username: string;
				attributes: UserAttributes;
				lastActive: number;
			};
		}>(`/api/session/data/${this.datasource}/users`);
	};

	create_user = async (username: string, password: string, attributes?: UserAttributes) => {
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

	update_user = async (username: string, attributes: UserAttributes) => {
		return await this.authPut(`/api/session/data/${this.datasource}/users/${username}`, {
			username,
			attributes,
		});
	};

	update_user_password = async (username: string, oldPassword: string, newPassword: string) => {
		return await this.authPut(`/api/session/data/${this.datasource}/users/${username}/password`, {
			oldPassword,
			newPassword,
		});
	};

	user_add_group = async (username: string, groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/users/${username}/userGroups`, {
			op: 'add',
			path: '/',
			value: groupname,
		});
	};

	user_remove_group = async (username: string, groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/users/${username}/userGroups`, {
			op: 'remove',
			path: '/',
			value: groupname,
		});
	};

	group_add_user = async (username: string, groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/userGroups/${groupname}/memberUsers`, {
			op: 'add',
			path: '/',
			value: username,
		});
	};

	group_remove_user = async (username: string, groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/userGroups/${groupname}/memberUsers`, {
			op: 'remove',
			path: '/',
			value: username,
		});
	};

	create_usergroup = async (identifier: string, attributes: { disabled: any }) => {
		return await this.authPost(`/api/session/data/${this.datasource}/userGroups`, {
			identifier,
			attributes,
		});
	};

	update_usergroup = async (identifier: string, attributes: { disabled: any }) => {
		return await this.authPut(`/api/session/data/${this.datasource}/userGroups/${identifier}`, {
			identifier,
			attributes,
		});
	};

	kill_active_connection = async (connection_id: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/activeConnections`, {
			op: 'remove',
			path: `/${connection_id}`,
		});
	};

	create_ssh_connection = async (
		name: string,
		parameters: SSHConnectionParameters = {},
		attributes: ConnectionAttributes = {},
		parentIdentifier: string = 'ROOT'
	) => {
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

	create_rdp_connection = async (
		name: string,
		parameters: RDPConnectionParameters = {},
		attributes: ConnectionAttributes = {},
		parentIdentifier: string = 'ROOT'
	) => {
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

	create_telnet_connection = async (
		name: string,
		parameters: TelnetConnectionParameters = {},
		attributes: ConnectionAttributes = {},
		parentIdentifier: string = 'ROOT'
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

	create_connection_group = async (name: string, attributes: ConnectionGroupAttributes, parentIdentifier: string = 'ROOT') => {
		return await this.authPost(`/api/session/data/${this.datasource}/connectionGroups`, {
			name,
			parentIdentifier,
			type: 'ORGANIZATIONAL', // TODO: also could do 'balancing'
			attributes,
		});
	};

	create_sharing_profile = async (name: string, connectionId: number, readonly: boolean) => {
		return await this.authPost(`/api/session/data/${this.datasource}/sharingProfiles`, {
			name,
			primaryConnectionIdentifier: connectionId,
			parameters: {
				'read-only': readonly ? 'true' : '',
			},
			attributes: {},
		});
	};

	update_connection_group = async (id: number, name: string, attributes: ConnectionAttributes, parentIdentifier: string = 'ROOT') => {
		return await this.authPut(`/api/session/data/${this.datasource}/connectionGroups/${id}`, {
			name,
			parentIdentifier,
			type: 'ORGANIZATIONAL', // TODO: also could do 'balancing'
			attributes,
		});
	};

	// TODO: the rest of these...(and possibly more not known about...)
	// create / manage / update things
	update_user_connection = async (username: string) => {};
	update_user_permissions = async (username: string) => {};
	update_usergroup_membergroup = async (usergroup: string) => {};
	update_usergroup_parentgroup = async (usergroup: string) => {};
	update_usergroup_permissions = async (usergroup: string) => {};
	update_usergroup_connection = async (usergroup: string) => {};
}
