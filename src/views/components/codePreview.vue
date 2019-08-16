<template>
  <div>
    <code-preview :code="code">
      <Button>click</Button>
      <Button style="display:block;margin-top: 5px;" type="primary"
        >click</Button
      >
      <Button style="display:block;margin-top: 5px;" type="warning"
        >click</Button
      >
      <Button style="display:block;margin-top: 5px;" type="error">click</Button>
      <Button style="display:block;margin-top: 5px;" type="text">click</Button>
      <Button style="display:block;margin-top: 5px;" type="primary" size="small"
        >click</Button
      >
      <Button style="display:block;margin-top: 5px;" type="primary" size="large"
        >click</Button
      >
      <Button style="display:block;margin-top: 5px;" type="primary" long
        >click</Button
      >
    </code-preview>
  </div>
</template>

<script>
import codePreview from "com/code/index";

export default {
  components: {
    codePreview
  },
  data() {
    return {
      code: `
      <Button>click</Button>
      <Button type="primary">click</Button>
      <Button type="warning">click</Button>
      <Button type="error">click</Button>
      <Button type="text">click</Button>
      <Button type="primary" size="small">click</Button>
      <Button type="primary" size="large">click</Button>
      <Button type="primary" long>click</Button>
      `
    };
  }
};
</script>

<style></style>
