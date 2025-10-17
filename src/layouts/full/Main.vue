<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import Logo from './logo/Logo.vue';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import sidebarItems, { logoutItem } from './vertical-sidebar/sidebarItem';
// Icon Imports
import { Menu2Icon, MenuIcon } from 'vue-tabler-icons';
// dropdown imports
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';
import NavCollapse from './vertical-sidebar/NavCollapse/NavCollapse.vue';
import { useRoute } from 'vue-router';

const sidebarMenu = shallowRef(sidebarItems);
const logoutMenuItem = shallowRef(logoutItem);
const sDrawer = ref(true);
const miniSidebar = ref(false);

const route = useRoute()

const breadcrumb = computed(() => {
  const parent = route.meta.parent as string || ''
  const title = route.meta.title as string || 'Dashboard'

  return parent ? `${parent} / ${title} /` : `${title} /`
})

const toggleSidebar = () => {
    miniSidebar.value = !miniSidebar.value;
};
</script> m

<template>
    <!------Sidebar-------->
    <v-navigation-drawer left elevation="0" app class="leftSidebar" :class="{ 'mini-sidebar': miniSidebar }"
        :width="miniSidebar ? 80 : 270" :expand-on-hover="miniSidebar" :permanent="true" v-model="sDrawer">

        <!-- Sidebar Content Container -->
        <div class="d-flex flex-column h-100">
            <!---Logo part -->
            <div class="pa-5 flex">
                <div >
                     <Logo />
                </div>
                <div style="margin-left: 5px; margin-top: 1px;" v-if="!miniSidebar">
                    <p class="text-warning" style="font-weight: bold;">Managemen</p>
                    <p class="text-[#02386A]" style="font-weight: bold; margin-top: -18px;">Pemanfaatan Data</p>
                </div>      
            </div>

            <!-- ---------------------------------------------- -->
            <!---Navigation - Scrollable Area -->
            <!-- ---------------------------------------------- -->
            <div class="flex-grow-1" style="overflow: hidden;">
                <perfect-scrollbar class="scrollnavbar h-100">
                    <v-list class="px-6 pb-0">
                        <!---Menu Loop -->
                        <template v-for="(item, i) in sidebarMenu">
                            <!---Item Sub Header -->
                            <NavGroup :item="item" v-if="item.header" :key="item.title" />

                            <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                            <!---Single Item-->
                            <NavItem :item="item" v-else class="leftPadding" />
                        
                            <!---End Single Item-->
                        </template>
                    </v-list>
                </perfect-scrollbar>
            </div>

            <!-- ---------------------------------------------- -->
            <!---Fixed Logout Section at Bottom -->
            <!-- ---------------------------------------------- -->
            <div class="logout-section"
                style="border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));">
                <v-list class="px-6 py-2">
                    <NavItem :item="logoutMenuItem" class="leftPadding" />
                </v-list>
            </div>
        </div>

    </v-navigation-drawer>
    <!------Header-------->
   <v-app-bar
  app
  elevation="0"
  height="70"
  class="top-header bg-white px-4"
>
  <div class="d-flex align-center justify-space-between w-100">
    <!-- KIRI: Sidebar Toggle + Breadcrumb -->
    <div class="d-flex align-center">
      <!-- Sidebar Toggle -->
      <v-btn
        class="text-muted sidebar-toggle-btn me-2"
        @click="toggleSidebar"
        icon
        variant="flat"
        size="small"
      >
        <MenuIcon size="20" stroke-width="1.5" />
      </v-btn>

      <!-- Mobile Toggle -->
      <v-btn
        class="hidden-lg-and-up text-muted me-3"
        @click="sDrawer = !sDrawer"
        icon
        variant="flat"
        size="small"
      >
        <Menu2Icon size="20" stroke-width="1.5" />
      </v-btn>

      <!-- Breadcrumb -->
      <div class="d-flex align-center breadcrumb-text text-body-2">
        <span v-html="breadcrumb" class="text-muted" />
      </div>

    </div>

    <!-- KANAN: Notification + Profile -->
    <div class="d-flex align-center ms-auto">
      <!-- Notification di kanan -->
      <v-btn icon variant="text" class="text-muted me-2">
        <v-icon size="22">mdi-bell-outline</v-icon>
      </v-btn>

      <!-- Profile Dropdown -->
      <ProfileDD />
    </div>
  </div>
</v-app-bar>

</template>
<style scoped>
.top-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb; /* abu-abu lembut */
}

.text-muted {
  color: #6b7280 !important;
}

.breadcrumb-text {
  color: #6b7280;
}

.font-weight-medium {
  font-weight: 500;
}
</style>