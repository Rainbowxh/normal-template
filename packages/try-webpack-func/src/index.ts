
//@ts-ignore
import('remoteApp').then((module) => {
  const { add } = module
  console.log(add);
});

function main() {
  console.log('main has been doing>>>')
}

main();
