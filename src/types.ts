export type SessionOptions = {
	host: string;
	datasource: string;
	username: string;
	password: string;
};

export type UserAttributes = {
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

export type ConnectionAttributes = {
	'max-connections'?: string | null;
	'max-connections-per-user'?: string | null;
	weight?: string | null;
	'failover-only'?: string | null;
	'guacd-port'?: string | null;
	'guacd-encryption'?: string | null;
	'guacd-hostname'?: string | null;
};

export type SSHConnectionParameters = {
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

export type RDPConnectionParameters = {
	port?: string | null;
	'read-only'?: string | null; // TODO: change this string into 'true' or ''
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

export type TelnetConnectionParameters = {
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

export type ConnectionGroupAttributes = {
	'max-connections'?: string | null;
	'max-connections-per-user'?: string | null;
	'enable-session-affinity'?: string | null;
};

export type SchemaAttributes = {
	name: string;
	fields: {
		name: string;
		type: string;
		options?: string[];
	}[];
};

export type UserPermissions = {
	connectionPermissions: any;
	connectionGroupPermissions: any;
	sharingProfilePermissions: any;
	activeConnectionPermissions: any;
	userPermissions: {
		[username: string]: string[];
	};
	userGroupPermissions: {
		[groupname: string]: string[];
	};
	systemPermissions: string[];
};

export type UserHistory = {
	startDate: number;
	endDate: any;
	remoteHost: string;
	username: string;
	active: boolean;
	identifier: string;
	uuid: string;
	attributes: any;
	logs: any;
}[];

export type ConnectionInfo = {
	name: string;
	identifier: string;
	parentIdentifier: string;
	protocol: string;
	attributes: ConnectionAttributes;
};

export type ConnectionHistory = {
	startDate: number;
	endDate: number;
	remoteHost: string;
	username: string;
	active: boolean;
	identifier: string;
	uuid: string;
	attributes: any;
	logs: any;
	connectionIdentifier: any;
	connectionName: string;
	sharingProfileIdentifier: any;
	sharingProfileName: any;
}[];
