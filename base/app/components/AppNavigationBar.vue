<script setup lang="ts">
import type { NavigationRoute } from "../types/navigation-routes";
import { Icon } from "@iconify/vue";

interface NavigationBarProps {
	title: string;
	navigationRoutes: NavigationRoute[];
	maxWidth?: string;
}
const props = defineProps<NavigationBarProps>();

// Composables
const route = useRoute();

// Mobile menu state
const isMobileMenuOpen = ref(false);
const closeMobileMenu = () => {
	isMobileMenuOpen.value = false;
};

// Close the mobile menu on navigation
watch(() => route.path, closeMobileMenu);
</script>

<template>
	<nav class="relative border-b border-white/10 bg-modern-black">
		<div :class="['mx-auto px-6 py-4', props.maxWidth]">
			<div class="flex items-center justify-between h-full">
				<!-- Logo and Navigation -->
				<div class="flex items-center gap-3">
					<Icon icon="mdi:code" class="text-blue-400 w-8 h-8" />
					<NuxtLink
						to="/"
						class="max-md:hidden text-white text-xl font-bold transition-colors duration-200 hover:text-blue-300 whitespace-nowrap"
					>
						{{ props.title }}
					</NuxtLink>
					<!-- Navigation Links -->
					<div class="nav-tabs">
						<div
							v-for="link in props.navigationRoutes"
							:key="link.path"
							class="nav-tab"
							:class="{
								active: route.path === link.path,
								inactive: route.path !== link.path,
							}"
						>
							<NuxtLink :to="{ path: link.path, query: { ...route.query } }" class="block">
								{{ link.label }}
							</NuxtLink>
						</div>
					</div>
				</div>
				<!-- Placeholder for Right Side Content (desktop) -->
				<div class="max-md:hidden">
					<slot></slot>
				</div>

				<!-- Mobile Right Side -->
				<div
					v-if="$slots['mobile-bar'] || $slots['mobile-menu']"
					class="md:hidden flex items-center gap-3"
				>
					<slot name="mobile-bar"></slot>
					<button
						v-if="$slots['mobile-menu']"
						type="button"
						class="p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer"
						:aria-expanded="isMobileMenuOpen"
						aria-label="Menu"
						@click="isMobileMenuOpen = !isMobileMenuOpen"
					>
						<Icon :icon="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Menu Click-Away Backdrop -->
		<div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 md:hidden" @click="closeMobileMenu"></div>

		<!-- Mobile Menu Dropdown -->
		<div
			v-if="isMobileMenuOpen"
			class="md:hidden absolute top-full inset-x-0 z-50 border-b border-white/10 bg-modern-black p-4 shadow-lg"
		>
			<slot name="mobile-menu" :close="closeMobileMenu"></slot>
		</div>
	</nav>
</template>
