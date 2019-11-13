<template>
  <div class="container">
    <Timeline>
      <TimelineItem v-for="(item, index) in records" :key="index">
        <p class="time">{{ item.create_time }}</p>
        <p class="content">{{ item.commit_message }}</p>
        <p class="content"><a :href="'https://github.com/xuyongchaos/iview-admin/commit/'+item.commit_id" target="_blank">{{ item.commit_id }}</a></p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
import records from "@/data/record";
export default {
  data() {
    return {
      records: records
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
</style>
