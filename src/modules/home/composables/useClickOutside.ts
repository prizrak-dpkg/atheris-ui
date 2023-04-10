import { Ref } from "vue";

export default (reference: Ref<HTMLElement | undefined>) => {
  const getNodeFromEventTarget = (
    target: EventTarget | null
  ): HTMLElement | null => {
    const node = target as HTMLElement | null;
    while (
      node !== null &&
      node !== document.body &&
      node !== reference.value
    ) {
      if (node instanceof HTMLElement) {
        return node;
      }
    }
    return null;
  };
  const onClickOutside = (event: Event) => {
    const node = getNodeFromEventTarget(event.target);
    if (reference.value && node) {
      if (!reference.value.contains(node)) {
        return true;
      }
    }
    return false;
  };
  return {
    onClickOutside,
  };
};
