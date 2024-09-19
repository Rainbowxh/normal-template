import { App, getCurrentInstance, inject, reactive, ref, watch, toRef, computed } from "vue"
export const PiniaSymbol = Symbol();

export function createPinia() {
  const pinia = {
    install(app: App) {
      if(!app.config.globalProperties.$pinia) {
        app.config.globalProperties.$pinia = pinia
        app.provide(PiniaSymbol, pinia)
      }
    },
    use() {

    },
    state: ref({}),
    store: new Map(),
    plugins: []
  }
  return pinia
}


export function defineStore(id: string, options: any) {
  const pinia: any = inject(PiniaSymbol)
  pinia.state.value[id] = pinia.state.value[id] || {}

  function useStore() {
    const currentInstance = getCurrentInstance();
    if(!pinia || !currentInstance) {
      console.warn('cannot use out of current instance');
    }

    let store = null;

    if(typeof options === 'function') {
      store = createSetupStore(id, options, pinia)
    }else {
      store = createOptionsStore(id, options, pinia)
    }

    return store;
  }

  return useStore
}


function createOptionsStore(id: string, options: any, pinia: any) {
  const store = reactive({})
  const { state, getters, actions } = options;
  pinia.state.value[id] = store;
  // transfer state
  Object.assign(store, state() || {});

  // transfer computed;
  let computeds: Record<string, any> = {}
  for(let prop in getters) {
    computeds[prop] = computed(() => {
      return getters[prop](store)
    })
  }
  Object.assign(store, computeds)

  // transfer actions
  Object.assign(store, actions)


  return store;
}

function createSetupStore(id: string, setup: () => Record<string, any> , pinia: any) {
  function merge(target: any, stateOrMutator: any) {
    for(let prop in target) {
      if(!target.hasOwnProperty(prop)) continue;
      const patch = stateOrMutator[prop]
      if(patch !== null && typeof patch === 'object') {
        target[prop] = merge(target[prop], patch);
      }else {
        target[prop] = stateOrMutator[prop]
      }
    }
    return target;
  }

  function $patch(stateOrMutator: any) {
    if(typeof stateOrMutator === 'function') {
      stateOrMutator(pinia)
    }else {
      merge(pinia.state.value[id], stateOrMutator)
    }
  }

  function $subscribe(callback: Function) {
    watch(store, (newValue, oldValue) => {
      callback(id, newValue);
    }, {
      deep: true
    })
  }

  const partialStore: any = {
    $patch,
    $subscribe
  }

  const store = reactive<Record<string, any>>(partialStore);

  const setupResult = setup();

  pinia.state.value[id] = pinia.state.value[id] || {}

  for(let prop in setupResult) {
    if(!setupResult.hasOwnProperty(prop)) continue
    store[prop] = setupResult[prop];
    pinia.state.value[id][prop] = setupResult[prop]; 
  }

  pinia.plugins.forEach((plugin: any) => plugin(id, store));

  if(!pinia.store.has(id)) {
    pinia.store.set(id, store);
  }

  return store;
}
