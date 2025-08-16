import { ref, onUpdated } from "vue";

export function useIsScrollAble() {
  const isScrollAble = ref(false);

  const checkScroll = (el = document.documentElement) => {
    isScrollAble.value = el.scrollHeight > el.clientHeight;
  };

  onUpdated(() => {
    const el = document.documentElement;
    checkScroll(el);
  });

  return { isScrollAble };
}
