<script setup lang="ts">
import { ref, shallowRef } from 'vue';
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

const sidebarMenu = shallowRef(sidebarItems);
const logoutMenuItem = shallowRef(logoutItem);
const sDrawer = ref(true);
const miniSidebar = ref(false);

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
            <div class="pa-5">
                <Logo />
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
    <v-app-bar elevation="0" height="70" class="top-header">
        <div class="d-flex align-center justify-space-between w-100">
            <div class="d-flex align-center">
                <!-- Sidebar Toggle Button -->
                <v-btn class="ms-md-3 ms-sm-5 ms-3 text-muted sidebar-toggle-btn" @click="toggleSidebar" icon
                    variant="flat" size="small">
                    <MenuIcon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Mobile Menu Button -->
                <v-btn class="hidden-lg-and-up ms-2 text-muted" @click="sDrawer = !sDrawer" icon variant="flat"
                    size="small">
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Notification -->
                <NotificationDD />
            </div>
            <div>
                <!-- User Profile -->
                <ProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>
