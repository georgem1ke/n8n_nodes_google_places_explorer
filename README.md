# n8n-nodes-google-places-explorer

This is an n8n community node that lets you use the **Google Places API (New)** in your n8n workflows to search for places using text queries.

[Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) provides detailed information about places and points of interest.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Place

- **Text Search** — Search for places using a text query (e.g. "restaurants in Sydney"). Supports filtering by location bias, language, region, and more. Returns detailed place information including name, address, rating, and location coordinates.

## Credentials

You need a **Google Places API key** to use this node.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the **Places API (New)**
4. Go to **APIs & Services → Credentials** and create an API key
5. In n8n, add a new **Google Places Explorer API** credential and paste your API key

## Compatibility

Tested with n8n v1.x. Minimum required version: n8n v1.0.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Google Places API (New) documentation](https://developers.google.com/maps/documentation/places/web-service/text-search)
