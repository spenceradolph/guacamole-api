import axios from 'axios';

type SessionOptions = {
	host: string;
	datasource: string;
	username: string;
	password: string;
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

		const token = data.authToken;

		return new Session(host, datasource, token);
	};
}

/**
 * Currently authenticated guacamole session.
 */
export class Session {
	readonly host: string;
	readonly datasource: string;
	readonly token: string;

	constructor(host: string, datasource: string, token: string) {
		this.host = host;
		this.datasource = datasource;
		this.token = token;
	}

	/**
	 * Helper function to automatically add the token to api requests
	 */
	private authGet = async (url: string) => {
		const { data } = await axios.get(`${this.host}${url}`, { params: { token: this.token } });
		return data;
	};

	list_users = async () => {
		type usersObjectResponse = {
			[username: string]: {
				username: string;
				attributes: {
					'guac-email-address': string | null;
					'guac-organizational-role': string | null;
					'guac-full-name': string | null;
					expired: string | null;
					timezone: string | null;
					'access-window-start': string | null;
					'guac-organization': string | null;
					'access-window-end': string | null;
					disabled: string | null;
					'valid-until': string | null;
					'valid-from': string | null;
				};
				lastActive: number;
			};
		};
		const usersObject: usersObjectResponse = await this.authGet(`/api/session/data/${this.datasource}/users`);
		return usersObject;
	};
}
