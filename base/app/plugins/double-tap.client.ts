/**
 * Handle @dblclick on touch devices
 */
const DOUBLE_TAP_MS = 350;
const DOUBLE_TAP_SLOP_PX = 24;

export default defineNuxtPlugin(() => {
	let lastTap = { time: 0, x: 0, y: 0 };

	document.addEventListener(
		"touchend",
		(event) => {
			// Ignore multi-touch gestures (pinch)
			if (event.touches.length > 0 || event.changedTouches.length !== 1) return;

			// Let native double-tap word selection work in text inputs
			const target = event.target;
			if (target instanceof Element && target.closest("input, textarea, select")) return;

			const touch = event.changedTouches[0]!;
			const isDoubleTap =
				event.timeStamp - lastTap.time <= DOUBLE_TAP_MS &&
				Math.abs(touch.clientX - lastTap.x) <= DOUBLE_TAP_SLOP_PX &&
				Math.abs(touch.clientY - lastTap.y) <= DOUBLE_TAP_SLOP_PX;

			if (!isDoubleTap) {
				lastTap = { time: event.timeStamp, x: touch.clientX, y: touch.clientY };
				return;
			}

			lastTap = { time: 0, x: 0, y: 0 };
			// Suppress the native double-tap gesture (word selection/zoom)
			event.preventDefault();
			target?.dispatchEvent(
				new MouseEvent("dblclick", {
					bubbles: true,
					cancelable: true,
					clientX: touch.clientX,
					clientY: touch.clientY,
				})
			);
		},
		{ passive: false }
	);
});
