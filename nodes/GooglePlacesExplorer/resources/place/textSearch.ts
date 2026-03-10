import type {
	IHttpRequestOptions,
	INodeProperties,
	IExecuteSingleFunctions,
} from 'n8n-workflow';

const showForTextSearch = {
	resource: ['place'],
	operation: ['textSearch'],
};

async function locationBiasPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const additionalFields = this.getNodeParameter('additionalFields', {}) as {
		locationBiasLatitude?: number;
		locationBiasLongitude?: number;
		locationBiasRadius?: number;
	};

	const { locationBiasLatitude, locationBiasLongitude, locationBiasRadius } = additionalFields;

	if (
		locationBiasLatitude !== undefined &&
		locationBiasLongitude !== undefined &&
		locationBiasRadius !== undefined
	) {
		const body = (requestOptions.body ?? {}) as Record<string, unknown>;
		body.locationBias = {
			circle: {
				center: {
					latitude: locationBiasLatitude,
					longitude: locationBiasLongitude,
				},
				radius: locationBiasRadius,
			},
		};
		requestOptions.body = body;
	}

	return requestOptions;
}

export const textSearchDescription: INodeProperties[] = [
	{
		displayName: 'Text Query',
		name: 'textQuery',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showForTextSearch,
		},
		description: 'The text query to search for places, e.g. "restaurants in New York"',
		routing: {
			send: {
				type: 'body',
				property: 'textQuery',
			},
		},
	},
	{
		displayName: 'Field Mask',
		name: 'fieldMask',
		type: 'string',
		required: true,
		default: 'places.displayName,places.formattedAddress,places.id',
		displayOptions: {
			show: showForTextSearch,
		},
		description:
			'Comma-separated list of place fields to return. See <a href="https://developers.google.com/maps/documentation/places/web-service/text-search#fieldmask">Google docs</a> for available fields.',
		routing: {
			request: {
				headers: {
					'X-Goog-FieldMask': '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Max Results',
		name: 'maxResultCount',
		type: 'number',
		default: 10,
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
		displayOptions: {
			show: showForTextSearch,
		},
		description: 'Maximum number of results to return (1-20)',
		routing: {
			send: {
				type: 'body',
				property: 'maxResultCount',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showForTextSearch,
		},
		options: [
			{
				displayName: 'Language Code',
				name: 'languageCode',
				type: 'string',
				default: '',
				description: 'Language code for results, e.g. "en"',
				routing: {
					send: {
						type: 'body',
						property: 'languageCode',
					},
				},
			},
			{
				displayName: 'Location Bias Latitude',
				name: 'locationBiasLatitude',
				type: 'number',
				default: 0,
				typeOptions: {
					numberPrecision: 7,
				},
				description: 'Latitude of the center point for location bias',
				routing: {
					send: {
						preSend: [locationBiasPreSend],
					},
				},
			},
			{
				displayName: 'Location Bias Longitude',
				name: 'locationBiasLongitude',
				type: 'number',
				default: 0,
				typeOptions: {
					numberPrecision: 7,
				},
				description: 'Longitude of the center point for location bias',
			},
			{
				displayName: 'Location Bias Radius',
				name: 'locationBiasRadius',
				type: 'number',
				default: 5000,
				typeOptions: {
					minValue: 0,
				},
				description: 'Radius in meters for the location bias circle',
			},
			{
				displayName: 'Page Token',
				name: 'pageToken',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description:
					'Token from a previous response to get the next page of results. Connect this from the previous node output.',
				routing: {
					send: {
						type: 'body',
						property: 'pageToken',
					},
				},
			},
			{
				displayName: 'Region Code',
				name: 'regionCode',
				type: 'string',
				default: '',
				description: 'Region code to bias results, e.g. "US"',
				routing: {
					send: {
						type: 'body',
						property: 'regionCode',
					},
				},
			},
		],
	},
];
