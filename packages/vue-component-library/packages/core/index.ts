import components from "./components";
import { makeInstaller } from "@vue-component-library/utils";

const installer = makeInstaller(components)

export * from "@vue-component-library/components";
export default installer
