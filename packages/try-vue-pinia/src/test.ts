import { computed, defineComponent, h, ref, watch } from "vue";

export default defineComponent({
  name: "test",
  setup(props) {
    const count = ref(0);
    const computedCount = computed(() => {
      console.log("computed start", count.value);
      return count.value * 2;
    });
    watch(
      count,
      (value, oldValue) => {
        console.log("watch start");
      }
    );

    setTimeout(() => {
      count.value = count.value + 1
    },1000)

    return () => {
      console.log('render start')
      return h("div", {}, [
        h("div", {}, count.value),
        h("div", {}, computedCount.value),
      ]);
    };
  },
});
