import {L, save, st} from "../state.js";

/* Tema claro (padrão, no estilo Fluent) ou escuro (Hollowborn). Fica em <html data-theme>;
   o index.html já aplica antes de pintar, para não piscar. */
const root = document.documentElement;
const SUN = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const MOON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
export const theme = () => (st.theme === "dark" ? "dark" : "light");
export function applyTheme() {
  root.dataset.theme = theme();
  const m = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]'); if (m) m.content = theme() === "dark" ? "#120F17" : "#F6F5F8";
}
export function renderTheme() {
  const b = document.getElementById("themeBtn"); if (!b) return;
  const dark = theme() === "dark", lbl = L(dark ? "theme_to_light" : "theme_to_dark");
  b.innerHTML = dark ? SUN : MOON; b.setAttribute("aria-label", lbl); b.title = lbl;
}
document.addEventListener("click", e => {
  if (!(e.target as HTMLElement).closest("#themeBtn")) return;
  st.theme = theme() === "dark" ? "light" : "dark"; save(); applyTheme(); renderTheme();
});
applyTheme();
