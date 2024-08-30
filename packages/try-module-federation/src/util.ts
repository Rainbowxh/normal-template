export function convertImportsToRequire(code: string) {
  // 正则表达式匹配 import 语句
  const importRegex = /import\s*\{\s*([^}]*)\s*\}\s*from\s*["']([^"']+)["'];/g;
  
  return code.replace(importRegex, (match: any, imports: string, module: any) => {
    // 处理导入的变量
    const variables = imports.split(',').map((part: string) => part.trim());
    const destructuredVars = variables.map((variable: any) => {
      const [name, alias] = variable.split(/\s+as\s+/).map((part: string) => part.trim());
      return `${name}: ${alias}`;
    }).join(', ');

    // 返回转换后的 require 语句
    return `const { ${destructuredVars} } = '${module}';`;
  });
}
