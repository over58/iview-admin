<template>
  <div>
    <editor-json :data="records"></editor-json>
  </div>
</template>

<script>
import editorJson from "com/editor/editor-json";
import records from "@/data/record";
export default {
  components: {
    editorJson
  },
  data: function() {
    return {
      records: records
    };
  }
};
</script>

<style></style>
