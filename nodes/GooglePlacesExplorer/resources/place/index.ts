import type { IExecuteSingleFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { textSearchDescription } from './textSearch';

const showOnlyForPlace = {
	resource: ['place'],
};

export const placeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPlace,
		},
		options: [
			{
				name: 'Text Search',
				value: 'textSearch',
				action: 'Search places by text',
				description: 'Search for places using a text query',
				routing: {
					request: {
						method: 'POST',
						url: '/places:searchText',
					},
					output: {
						postReceive: [
							async function (
								this: IExecuteSingleFunctions,
								data: INodeExecutionData[],
							): Promise<INodeExecutionData[]> {
								if (!data.length) return [];

								const body = data[0].json;
								const places = (body.places as INodeExecutionData['json'][]) ?? [];

								return places.map((place) => ({ json: place }));
							},
						],
					},
				},
			},
		],
		default: 'textSearch',
	},
	...textSearchDescription,
];
