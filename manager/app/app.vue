<script setup lang="ts">
import { useAuthStore } from "../../base/app/stores/authStore";
import { navigationLinks } from "./core/routes";

const authStore = useAuthStore();
const isAppReady = ref(false);
const { t } = useI18n();
const route = useRoute();
const pinFooter = computed(() => route.meta.pinFooter === true);

onMounted(() => {
	authStore.loadAuthToken();
	isAppReady.value = true;
});
</script>

<template>
	<div
		v-if="isAppReady"
		class="flex flex-col"
		:class="pinFooter ? 'h-screen overflow-hidden' : 'min-h-screen'"
	>
		<!-- Navigation Bar -->
		<AppNavigationBar
			:title="t('appNavigationBar.title')"
			:navigation-routes="navigationLinks"
			max-width="max-w-7xl"
		/>
		<!-- Main Content -->
		<main
			class="flex-1 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
			:class="{ 'min-h-0 overflow-y-auto': pinFooter }"
		>
			<NuxtPage />
		</main>
		<!-- Footer -->
		<AppFooter
			:repo-url="t('appFooter.githubRepoUrl')"
			:contact-email="t('appFooter.contactEmail')"
		/>
		<ToastContainer />
	</div>
</template>
