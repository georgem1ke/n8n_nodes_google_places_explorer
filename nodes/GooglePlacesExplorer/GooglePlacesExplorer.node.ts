import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { placeDescription } from './resources/place';

export class GooglePlacesExplorer implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Google Places Explorer',
		name: 'googlePlacesExplorer',
		icon: { light: 'file:googlePlacesExplorer.svg', dark: 'file:googlePlacesExplorer.dark.svg' },
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Search and explore places using the Google Places API (New)',
		defaults: {
			name: 'Google Places Explorer',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'googlePlacesExplorerApi', required: true }],
		requestDefaults: {
			baseURL: 'https://places.googleapis.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Place',
						value: 'place',
					},
				],
				default: 'place',
			},
			...placeDescription,
		],
	};
}
