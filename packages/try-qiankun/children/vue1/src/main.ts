
let instance: any = null

export function mount(tag: string) {
  console.log('test1')
}

export function unmount() { 
  console.log('test2')
}

console.log(mount, unmount)
