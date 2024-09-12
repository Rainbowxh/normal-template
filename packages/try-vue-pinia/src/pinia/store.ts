import { computed, getCurrentInstance, inject, isRef, reactive, toRefs, watch } from "vue";
import { PiniaSymbol } from "./rootState";

export function defineStore(idOrOptions: any, setup?: any) {
  let id: string;
  let options: any;
  // deal different realize way
  if(typeof idOrOptions === 'string') {
    id = idOrOptions
    options = setup
  }else {
    id = idOrOptions.id,
    options = idOrOptions
  }

  const isSetupStore = typeof setup === 'function'

  function useStore() {
    // useStore 只能在组件中使用,需要在全局中记录当前组件
    const instance = getCurrentInstance();

    if(!instance) {
      return
    }
    const pinia: any = inject(PiniaSymbol);

    let store: any = null;

    if(!pinia._s.has(id)) {
      if(isSetupStore) {
        store = createSetupStore(id, options, pinia, isSetupStore)
      }else {
        store = createOptionStore(id, options, pinia, isSetupStore)
      }
    }else {
      store = pinia._s.get(id)
    }
    return store
  }
  return useStore;
}

function createOptionStore(id: string, options: any, pinia: any, isSetupStore: boolean) {
  const { state, actions, getters } = options;
  // pinia core generate reactive value

  function setup() {
    /**
     * pinia state 是一个ref的引用，当值被保存的时候, pinia.state.value[id]获取的值会自动变为相应
     */
    pinia.state.value[id] = state ? state() : {}

    /**
     * toRefs 将 reactive 对象转换成为每个值转换为响应式的对象
     * 假设 const obj = reactive({ name: '123' })
     * 如果进行解构赋值的时候 则会变为 const { name } = obj;
     * 那么 name = obj.name;
     * 如果 name = '123' 这样则会失去响应式
     * 所以进行处理
     * obj.name = {
     *  get value() {
     *    return obj.name
     *  }
     *  set value(value) {
     *    return obj.name = value; 
     *  }
     * }
     */
    const localState = toRefs(pinia.state.value[id])

    const result =  Object.assign(
      localState, 
      actions, // 用户提供的行文
      Object.keys(getters).reduce((computeds: any, getterKey) => {
        computeds[getterKey] = computed(() => {
          const store = pinia._s.get(id);
          return getters[getterKey].call(store)
        })
        return computeds
      }, {}),
    )
    return result
  }

  let _init = {}

  const store: any = createSetupStore(id, setup, pinia, isSetupStore);

  store.$reset = function() {
    const newState = state ? state() : {}
    this.$patch(newState);
  }

  return store;
}

function isObject(v: any) {
  return typeof v === 'object' && v !== null;
}

// 创建一个setupStore
function createSetupStore(id: string, setup: any, pinia: any, isSetupStore: boolean) {
    function merge(target: any ,partialState: any) {
      for(const key in partialState) {

        if(!partialState.hasOwnProperty(key)) {
          continue
        }

        const targetValue = target[key]
        const patchValue = partialState[key]

        if(isObject(targetValue) && isObject(patchValue) && !isRef(patchValue)) {
          target[key] = merge(targetValue, patchValue)          
        }else {
          target[key] = patchValue;
        }
      }
      return target;
    }
 
    function $patch(partialStateOrMutator: any) {
      if(typeof partialStateOrMutator !== 'function') {
        merge(pinia.state.value[id], partialStateOrMutator)
      }else {
        // 自定义函数进行修改
        partialStateOrMutator(pinia.state.value[id]);
      }
    }


    function $subscribe(callback: any) {
      watch(pinia.state.value[id],(newValue, oldValue, onCleanUp) => {
        // 订阅 traverse 遍历订阅
        callback({ id }, newValue)
      }, {deep: true})
    }
  
    const partialStore = {
      $patch,
      $subscribe,
    }

    const store = reactive(partialStore)

    if(isSetupStore) {
      pinia.state.value[id] = pinia.state.value[id] || {}
    }

    function wrapperAction(action: any) {
      return function() {
        return action.call(store, ...arguments)
      }
    }

    const setupStore = setup();
    
    for(let prop in setupStore) {
      if(typeof setupStore[prop] === 'function') {
        setupStore[prop] = wrapperAction(setupStore[prop])
      } else if(isSetupStore) {
        pinia.state.value[id][prop] = setupStore[prop]; // 同步更新 state 属性
      }
    } 

    /**
     * 同时将值放入store当中
     * Object.assgin 
     * 相当于 store[key] = setupStore[key]
     * 由于 store 是reactive, reactive进行赋值的时候会自动的将setupStore[key].value 进行赋值
     * 相当于 store.key = setupStore.(get value)()
     */
    Object.assign(store, setupStore)
    pinia._p.forEach((plugin: any) => {
      plugin(store, id)
    })
    pinia._s.set(id, store);
    return store
}
