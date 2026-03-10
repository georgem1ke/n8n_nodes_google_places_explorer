import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GooglePlacesExplorerApi implements ICredentialType {
	name = 'googlePlacesExplorerApi';

	displayName = 'Google Places Explorer API';

	icon = { light: 'file:../nodes/GooglePlacesExplorer/googlePlacesExplorer.svg', dark: 'file:../nodes/GooglePlacesExplorer/googlePlacesExplorer.dark.svg' } as const;

	documentationUrl =
		'https://developers.google.com/maps/documentation/places/web-service/get-api-key';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Goog-Api-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://places.googleapis.com/v1',
			method: 'POST',
			url: '/places:searchText',
			headers: {
				'Content-Type': 'application/json',
				'X-Goog-FieldMask': 'places.id',
			},
			body: {
				textQuery: 'test',
				maxResultCount: 1,
			},
		},
	};
}
