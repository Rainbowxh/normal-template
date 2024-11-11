import { withInstall } from "@try-component-library/utils"

import _form from "./src/form.vue";
import _formItem from "./src/formItem.vue"

const Form = withInstall(_form as any)
const FormItem = withInstall(_formItem as any)

export {
  Form,
  FormItem,
}
