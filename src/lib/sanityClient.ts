import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: 'cytjpxnv', // Replace with your Sanity project ID
	dataset: 'production', // Replace with your dataset name
	apiVersion: '2023-01-01', // Use a specific API version
	useCdn: true // `true` for faster, cached responses
});

export default client;
