import { posthog } from 'posthog-js';
import { browser, dev } from '$app/environment';

if (browser && !dev) {
	posthog.init('phc_IaK96dVLTQYy3rsouvrEb9LcT59EpIkqmMhwK7dwouO', {
		api_host: 'https://app.posthog.com',
	});
}

export const ssr = true;
