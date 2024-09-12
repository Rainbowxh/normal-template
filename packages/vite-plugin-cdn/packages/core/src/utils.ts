export function parseVueRequest(id: string) {
  const [filename] = id.split('?', 2)
  // 借用URL方法来生成解析，解析当前vue文件的
  const url = new URL(id, 'http://domain.inspector')
  const query = Object.fromEntries((url.searchParams as any).entries()) as any
  if (query.vue != null)
    query.vue = true

  if (query.src != null)
    query.src = true

  if (query.index != null)
    query.index = Number(query.index)

  if (query.raw != null)
    query.raw = true

  if (query.hasOwnProperty('lang.tsx') || query.hasOwnProperty('lang.jsx'))
    query.isJsx = true

  return {
    filename,
    query,
  }
}
