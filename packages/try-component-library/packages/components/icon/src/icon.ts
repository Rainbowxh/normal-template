// 准备组件相关的属性 和 ts类型
import { ExtractPropTypes, PropType } from "vue"
export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>
}

type IconProps = ExtractPropTypes<typeof iconProps>
