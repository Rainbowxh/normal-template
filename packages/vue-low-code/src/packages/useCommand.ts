import { onUnmounted } from "vue";
import { events } from "./event";
import deepcopy from "deepcopy";

export function useCommand(data: any) {
  // 前进后退需要指针
  /**
   * 使用 current 的原因是为了重做功能,
   * 记录当前后退的步骤
   * current: 指向当前操作对象的索引值
   * queue: 记录当前所有的操作记录
   */
  const state: any = {
    current: -1, //前进后退的索引值
    queue: [], // 存放所有的操作命令
    commands: {}, // 制作指令的命令和执行功能映射表
    commandArray: [], // 存放所有的命令
    destroyArray: []
  }

  const registry = (command: any) => {
    state.commandArray.push(command);
    state.commands[command.name] = () => {
      // 命令名字对应的执行函数
      const result = command.execute();
      result.redo();
      if(command.pushQueue) {
        // 考虑以下几种情况 a -> b -> c 撤回 ->d
        // 栈里面的情况 a -> b -> d
        // 需要将栈里面的 c 清空,
        let { queue, current } = state
        if(queue.length > 0) {
          queue = queue.slice(0, current + 1); //可能在防止过程中由撤销操作, 所以根据当前最新的current值俩计算新的值
          state.queue = queue;
        }

        // 保存当前指令的前进和后退
        state.queue.push(result)
        console.log(state.queue)
        state.current += 1
      }
    }
   }

  registry({ 
    name: 'redo',
    keyboard: 'ctrl+y',
    execute() {
      return {
        redo() {
          // 找到下一步从撤销
          const item = state.queue[state.current + 1]
          if(item) {
            item.redo && item.redo();
            state.current += 1
          }
        }
      }
    }
  })

  registry({ 
    name: 'undo',
    keyboard: 'ctrl+z',
    execute() {
      return {
        redo() {
          if(state.current === -1) return;
          // 撤销当前的操作, 不立即清空当前执行队列是因为需要执行重做
          const item = state.queue[state.current]
          if(item ) {
            item.undo && item.undo();
            state.current -= 1
          }
        }
      }
    }
  })
  
  registry({ 
    name: 'drag', // 如果希望将操作放到队列中可以增加一个属性 标识等会操作要放到
    pushQueue:  true,
    before: null,
    after: null,
    init() { //初始化操作 默认会执行
      this.before = null;
      // 监控拖拽开始事件, 保存状态
      const start = () => {
        this.before = deepcopy(data.value.blocks)
      }
      // 监控拖拽结束事件, 
      const end = () => state.commands.drag();

      events.on('start', start);
      events.on('end', end);
      return () => {
        events.off('start', start)
        events.off('end', end)
      }
    },
    execute() {
      console.log('doing??????')
      const before = this.before;
      const after = data.value.blocks
      return {
        before,
        after,
        // 可能有多个问题
        redo() { // 放当前的状态
          console.log("=====",after)
          data.value = {...data.value, blocks: after }
        },
        undo() { // 放之后的状态
          data.value = {...data.value, blocks: before}
        }
      }
    }
  })

  const keyboardEvent = (() => {
    const keyCodes: any = {
      KeyZ: 'z',
      KeyY: 'y'
    }

    const onKeydown = (e: KeyboardEvent) => {
      const {ctrlKey, code: keyCode} = e
      let keyString: any[] = []

      if(ctrlKey) keyString.push('ctrl')
      keyString.push(keyCodes[keyCode])
      let str = keyString.join('+')
      state.commandArray.forEach((command: any) => {
        if(!command.keyboard) {
          return;
        }
        if(command.keyboard === str) {
          state.commands[command.name]();
          e.preventDefault();
        }
      })
    }

    const init = () => {
      window.addEventListener('keydown', onKeydown)
      return () => window.removeEventListener('keydown', onKeydown)
    }

    return init();
  })

  ;(() => {
    state.destroyArray.push(keyboardEvent())
    state.commandArray.forEach((command: any) => {
      command.init && state.destroyArray.push(command.init());
    })

    const cpy = deepcopy(data.value.blocks)
    setTimeout(() => {
      data.value.blocks[0].xxxx = '123'
      console.log(cpy)
      console.log(data.value.blocks)
    },100)


  })()

  onUnmounted(() => {
    state.destroyArray.forEach((func: any) => {
      func && func();
    })
  }) 

  return state
}


