import { ref, onMounted, onUnmounted, watch } from "vue";

export function useThemeContext() {
  const isDark = ref(false);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  //watches and updates the DOM when the theme hhas been changed from dark to light
  watch(
    isDark,
    (newVal) => {
      if (newVal) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    },
    { immediate: true },
  );

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  const handleSystemChange = (event: MediaQueryListEvent) => {
    if (!localStorage.getItem("theme")) {
      isDark.value = event.matches;
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = mediaQuery.matches;
    }

    mediaQuery.addEventListener("change", handleSystemChange);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handleSystemChange);
  });

  return { isDark, toggleTheme };
}
