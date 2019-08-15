<template>
  <div class="container">
    <Timeline>
      <TimelineItem v-for="(item, index) in records" :key="index">
        <p class="time">{{ item.time }}</p>
        <p class="content">{{ item.content }}</p>
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
