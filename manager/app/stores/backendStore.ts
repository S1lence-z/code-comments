import type { BackendProvider } from "../types/interfaces/backend-provider";
import { StandardBackendProvider } from "../providers/backend/standard-backend-provider";

/**
 * Holds the active backend provider for the configured server.
 *
 * The provider is built once from the server form and kept here so it survives
 * client-side navigation (e.g. switching between Setup and About). It is held in
 * memory only and is intentionally not persisted across full page reloads.
 */
export const useBackendStore = defineStore("backend", {
	state: () => ({
		provider: null as BackendProvider | null,
		serverBaseUrl: "",
	}),
	getters: {
		isConfigured: (state): boolean => state.provider !== null,
	},
	actions: {
		// Build and store the provider for the given server. markRaw keeps the class
		// instance out of Vue's reactivity system (it is a plain service, not state).
		configure(serverBaseUrl: string, token?: string) {
			this.provider = new StandardBackendProvider(serverBaseUrl, token);
			this.serverBaseUrl = serverBaseUrl;
		},
		setAuthToken(token: string) {
			this.provider?.setAuthToken(token);
		},
		reset() {
			this.provider = null;
			this.serverBaseUrl = "";
		},
	},
});
