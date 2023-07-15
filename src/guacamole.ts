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
		const { data } = await axios.post(
			`${host}/api/tokens`,
			{ username, password },
			{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
		);

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

	list_schema_users = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/schema/userAttributes`);
	};

	list_schema_groups = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/schema/userGroupAttributes`);
	};

	list_schema_connections = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/schema/connectionAttributes`);
	};

	list_schema_sharing = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/schema/sharingProfileAttributes`);
	};

	list_schema_connection_group = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/schema/connectionGroupAttributes`);
	};

	list_schema_protocols = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/schema/protocols`);
	};

	list_patches = async () => {
		return await this.authGet(`/api/patches`);
	};

	list_languages = async () => {
		return await this.authGet(`/api/languages`);
	};

	detail_extensions = async () => {
		return await this.authGet(`/api/session/ext/${this.datasource}`);
	};

	list_history_users = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/history/users`);
	};

	list_history_connections = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/history/connections`);
	};

	list_users = async () => {
		type ListUsersResponse = {
			[username: string]: {
				username: string;
				attributes: UserAttributes;
				lastActive: number;
			};
		};
		return await this.authGet<ListUsersResponse>(`/api/session/data/${this.datasource}/users`);
	};

	detail_user = async (username: string) => {
		return await this.authGet(`/api/session/data/${this.datasource}/users/${username}`);
	};

	detail_user_permissions = async (username: string) => {
		return await this.authGet(`/api/session/data/${this.datasource}/users/${username}/permissions`);
	};

	detail_user_effective_permissions = async (username: string) => {
		return await this.authGet(`/api/session/data/${this.datasource}/users/${username}/effectivePermissions`);
	};

	detail_user_groups = async (username: string) => {
		return await this.authGet(`/api/session/data/${this.datasource}/users/${username}/userGroups`);
	};

	detail_user_history = async (username: string) => {
		return await this.authGet(`/api/session/data/${this.datasource}/users/${username}/history`);
	};

	detail_self = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/self`);
	};

	create_user = async (username: string, password: string, attributes?: UserAttributes) => {
		return await this.authPost(`/api/session/data/${this.datasource}/users`, {
			username,
			password,
			attributes: {
				disabled: '', // TODO: get these attributes from function parameters (with types)
				expired: '',
				'access-window-start': '',
				'access-window-end': '',
				'valid-from': '',
				'valid-until': '',
				timezone: '',
				'guac-full-name': '',
				'guac-email-address': '',
				'guac-organization': '',
				'guac-organizational-role': '',
			},
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

	update_user_group = async (username: string, action: 'add' | 'remove', groupname: string) => {
		return await this.authPatch(`/api/session/data/${this.datasource}/users/${username}/userGroups`, {
			op: action,
			path: '/',
			value: groupname,
		});
	};

	delete_user = async (username: string) => {
		return await this.authDelete(`/api/session/data/${this.datasource}/users/${username}`);
	};

	list_usergroups = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/userGroups`);
	};

	detail_usergroup = async (groupname: string) => {
		return await this.authGet(`/api/session/data/${this.datasource}/userGroups/${groupname}`);
	};

	update_usergroup_member = async (username: string, groupname: string, operation: 'add' | 'remove') => {
		return await this.authPatch(`/api/session/data/${this.datasource}/userGroups/${groupname}/memberUsers`, {
			op: operation,
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

	delete_usergroup = async (identifier: string) => {
		return await this.authDelete(`/api/session/data/${this.datasource}/userGroups/${identifier}`);
	};

	list_tunnels = async () => {
		return await this.authGet(`/api/session/tunnels`);
	};

	detail_tunnels = async (tunnelId: number) => {
		return await this.authGet(`/api/session/tunnels/${tunnelId}/activeConnection/connection/sharingProfiles`);
	};

	list_connections = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/connections`);
	};

	list_active_connections = async () => {
		return await this.authGet(`/api/session/data/${this.datasource}/activeConnections`);
	};

	// create_ssh_connection = async () => {
	//     return await this.authPost(``, {

	//     });
	// }

	// TODO: the rest of these...(and possibly more not known about...)
	update_user_connection = async (username: string) => {};
	update_user_permissions = async () => {};
	update_usergroup_membergroup = async () => {};
	update_usergroup_parentgroup = async () => {};
	update_usergroup_permissions = async () => {};
	update_usergroup_connection = async () => {};
	detail_connection = async () => {};
	kill_active_connection = async () => {};
	manage_connection = async () => {};
	delete_connection = async () => {};
	list_connection_groups = async () => {};
	list_connection_group_connections = async () => {};
	details_connection_group = async () => {};
	details_connection_group_connections = async () => {};
	create_connection_group = async () => {};
	update_connection_group = async () => {};
	delete_connection_group = async () => {};
	list_sharing_profile = async () => {};
	details_sharing_profile = async () => {};
	create_sharing_profile = async () => {};
	delete_sharing_profile = async () => {};
}
