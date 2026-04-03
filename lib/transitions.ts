// lib/transitions.ts
export const triggerPageTransition = () => {
  // Old page sliding up and fading out
  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateY(0)" },
      { opacity: 0.5, scale: 0.95, transform: "translateY(-100px)" }
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  // New page sliding up from bottom
  document.documentElement.animate(
    [
      { transform: "translateY(100%)" },
      { transform: "translateY(0%)" }
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};