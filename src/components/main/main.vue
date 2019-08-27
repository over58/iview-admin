<template>
  <div class="layout">
    <Layout class="h-100">
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="50"
        :value="isCollapsed"
        class="sider"
      >
        <Menu
          :active-name="activeName"
          :open-names="openNames"
          accordion
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          @on-select="selectMenu"
        >
          <template v-for="item in menus">
            <Submenu
              v-if="item.children && item.children.length"
              :name="item.name"
              :key="item.name"
            >
              <template slot="title">
                <Tooltip
                  v-if="isCollapsed"
                  :content="item.meta.label"
                  placement="right-start"
                  transfer
                >
                  <i :class="['iconfont', `icon-${item.meta.icon}`]" />
                </Tooltip>
                <i v-else :class="['iconfont', `icon-${item.meta.icon}`]" />

                <span>{{ item.meta.label }}</span>
              </template>
              <MenuItem
                v-for="second in item.children"
                :name="second.name"
                :key="second.name"
              >
                <Tooltip
                  v-if="isCollapsed"
                  :content="second.meta.label"
                  placement="right-start"
                  transfer
                >
                  <i :class="['iconfont', `icon-${second.meta.icon}`]" />
                </Tooltip>
                <i v-else :class="['iconfont', `icon-${second.meta.icon}`]" />
                <span>{{ second.meta.label }}</span>
              </MenuItem>
            </Submenu>
            <MenuItem v-else :name="item.name" :key="item.name">
              <Tooltip
                v-if="isCollapsed"
                :content="item.meta.label"
                placement="right-start"
                transfer
              >
                <i :class="['iconfont', `icon-${item.meta.icon}`]" />
              </Tooltip>
              <i v-else :class="['iconfont', `icon-${item.meta.icon}`]" />
              <span>{{ item.meta.label }}</span>
            </MenuItem>
          </template>
        </Menu>
      </Sider>
      <Layout style="display:flex;flex-direction:column;overflow:hidden">
        <Head></Head>
        <History></History>
        <Content
          :style="{
            margin: '10px',
            background: '#fff',
            flex: 1,
            overflow: 'auto'
          }"
        >
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import _ from "lodash";
import History from "./history";
import Head from "./head";
import menus from "@/router/routes";
export default {
  components: {
    History,
    Head
  },
  data() {
    return {
      menus: menus
    };
  },
  computed: {
    activeName() {
      return this.$route.name;
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    isCollapsed() {
      return this.$store.state.isCollapsed;
    },
    openNames() {
      return this.isCollapsed
        ? []
        : this.menus
            .filter(
              item =>
                item.name === this.activeName ||
                (item.children &&
                  item.children.find(x => x.name === this.activeName))
            )
            .map(x => x.name);
    },
    throttleResize() {
      return _.throttle(this.handleResize, 400, {
        leading: true,
        trailing: true
      });
    }
  },
  watch: {
    isCollapsed: {
      handler(val) {
        val && this.$refs.side1.toggleCollapse();
      },
      immediate: true
    }
  },
  methods: {
    // collapsedSider() {
    //   this.$refs.side1.toggleCollapse();
    //   this.$store.commit("setCollapsed", true);
    // },
    selectMenu(name) {
      if (name === "github") {
        window.open("https://github.com/xuyongchaos/iview-admin", "_blank");
      } else {
        this.$router.push({ name });
      }
    },
    handleResize() {
      if (window.innerWidth < 1000) {
        this.$store.commit("setCollapsed", true);
      } else {
        this.$store.commit("setCollapsed", false);
      }
    }
  },
  created() {
    window.addEventListener(
      "resize",
      () => {
        this.throttleResize();
      },
      false
    );
    this.handleResize();
  }
};
</script>

<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.sider {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item {
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu {
  span {
    width: 0px;
    transition: width 0.2s ease;
  }
  i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
  /deep/.ivu-menu-submenu-title {
    padding: 10px;
  }
  /deep/.ivu-menu-submenu-title-icon {
    display: none;
  }
  /deep/.ivu-menu-item {
    padding: 10px;
  }
  /deep/.ivu-menu-submenu .ivu-menu-item {
    padding-left: 10px !important;
  }
}
</style>
