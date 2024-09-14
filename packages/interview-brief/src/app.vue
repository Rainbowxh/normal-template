<template>
  <div class="background">
    <div class="container">
      <div class="markdown-transform-html jufe reference-dom">
        <h1>徐皓简历</h1>
        <p>13162073226 ｜ elicxh@gmail.com ｜ 上海</p>
        <p>5年工作经验/在职 ｜ 前端开发工程师</p>
        <div class="resume-module">
          <h2>技能清单</h2>
          <ul>
            <li v-for="(text, index) in skill.data" v-html="text"></li>
          </ul>
        </div>
        <div class="resume-module">
          <h2>工作经历</h2>
          <div class="flex-layout">
            <div class="flex-layout-item">
              <p>
                <strong>上海丁满信息科技有限公司</strong><strong style="margin-left: 20px">前端开发工程师</strong>
              </p>
            </div>
            <div class="flex-layout-item">
              <p><strong>2019.07 - 至今</strong></p>
            </div>
          </div>
          <div v-html="company.brief" />
          <ul>
            <li v-for="(text, index) in company.data" v-html="text"></li>
          </ul>
        </div>
        <div class="resume-module">
          <h2>项目经历</h2>

          <div class="flex-layout">
            <div class="flex-layout-item">
              <p>
                <strong>一起装网页系统</strong>
              </p>
            </div>
          </div>
          <ul>
            <li>
              <strong>项目介绍</strong>：负责“智引万物”人工智能平台主题论坛信息咨询工作，引导、接待国内外嘉宾以及论坛、企业讲解。
            </li>
          </ul>
        </div>
        <div class="resume-module">
          <h2>教育背景</h2>
          <div class="flex-layout">
            <div class="flex-layout-item">
              <p>
                <strong style="margin-right: 20px;">上海海洋大学</strong>
                <strong style="margin-right: 20px;">空间信息与数字技术</strong>
                <strong style="margin-right: 20px;">统招本科</strong>
              </p>
            </div>
            <div class="flex-layout-item">
              <p><strong>2015.09-2019.06</strong></p>
            </div>
          </div>
          <ul>
            <li>
              <strong>GPA</strong>：3.87/4.0
              教育部社科青年项目《非公经济组织区域化党建然与意愿的影响因素和提升路径研究》
            </li>
            <li>
              <strong>相关课程</strong>：政沿科学研究方法
              STATA、党的建设专题研究。中国资本市场的政治学研究、当代中国的政治经济分析
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const skill = ref({
  data: [
  "熟练使用 <strong>Vue3</strong> 框架及相关组件进行开发,并对其源码有自己的理解",
  "熟练使用 <strong>JavaScript、HTML、CSS</strong>，能够快速、高效地进行前端开发",
  "熟练使用 <strong>Element-Plus<strong> 组件库并做相应的二次封装满足业务场景的需求",
  "熟练使用 <strong>uni-app</strong> 和 <strong>React Native</strong> 进行微信小程序和 App 开发的经验",
  "熟悉使用 Jenkins、Docker 等构建工具，负责前端项目的构建、打包及并与运维团队的协作部署",
  "和产品经理、后端工程师及设计师紧密合作，评估技术方案的可行性并高质量完成开发任务",
]
});

const company = ref({
  brief: "公司为中小型家装企业及集团公司（百胜、霸王茶姬）提供工地管理、工地安全及 AI 摄像头检测识别等业务。帮助集团公司",
  data: [
    "负责公司核心项目的开发与维护, 并完善现有项目的代码的开发和迭代优化",
    "和产品经理、后端工程师等进行技术的调研与分享",
    "规范前端团队的代码流程管理"
  ]
})


</script>

<style>
body {
  margin: 0px !important;
}
</style>

<style scoped>
@import "./main.css";

.resume-title {
  padding-bottom: 10px;
  color: #1f1e1e;
  border-bottom: none;
}

.resume-module h2 {
  border-bottom: 2px #1f1e1e;
}

.background {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}

.container {
  width: 820px;
  min-height: 1160px;
  background-color: white;
  margin: 100px;
}
</style>
