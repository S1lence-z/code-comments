/** Matches Tailwind's `max-md` range (< 768px). */
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Reactive flag for the mobile layout breakpoint.
 * Must be called from a component or composable `setup` context.
 */
export const useIsMobile = () => {
	const isMobile = ref(false);
	let mediaQuery: MediaQueryList | null = null;

	const update = () => {
		isMobile.value = mediaQuery?.matches ?? false;
	};

	onMounted(() => {
		mediaQuery = window.matchMedia(MOBILE_QUERY);
		update();
		mediaQuery.addEventListener("change", update);
	});

	onUnmounted(() => {
		mediaQuery?.removeEventListener("change", update);
	});

	return { isMobile };
};
