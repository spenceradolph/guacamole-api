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

	add_user_group = async (username: string, groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/users/${username}/userGroups`, {
			op: 'add',
			path: '/',
			value: groupname,
		});
	};

	remove_user_group = async (username: string, groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/users/${username}/userGroups`, {
			op: 'remove',
			path: '/',
			value: groupname,
		});
	};

	add_usergroup_member = async (username: string, groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/userGroups/${groupname}/memberUsers`, {
			op: 'add',
			path: '/',
			value: username,
		});
	};

	remove_usergroup_member = async (username: string, groupname: string, operation: 'add' | 'remove') => {
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

	// TODO: the rest of these...(and possibly more not known about...)
	// create / manage / update things
	update_user_connection = async (username: string) => {};
	update_user_permissions = async (username: string) => {};
	update_usergroup_membergroup = async (usergroup: string) => {};
	update_usergroup_parentgroup = async (usergroup: string) => {};
	update_usergroup_permissions = async (usergroup: string) => {};
	update_usergroup_connection = async (usergroup: string) => {};
	manage_connection = async () => {};
	create_connection_group = async () => {};
	update_connection_group = async () => {};
	create_sharing_profile = async () => {};
}
