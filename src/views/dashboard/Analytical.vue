<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';

// Sample data for analytical dashboard
const analyticsData = ref({
    totalUsers: 12543,
    totalRevenue: 98765,
    conversionRate: 23.5,
    bounceRate: 34.2
});

const chartData = ref([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 }
]);
</script>

<template>
    <div>
        <v-row>
            <!-- Analytics Cards -->
            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Total Users">
                    <div class="text-center pa-4">
                        <h2 class="text-primary mb-2">{{ analyticsData.totalUsers.toLocaleString() }}</h2>
                        <p class="text-subtitle-1">Active Users</p>
                        <v-chip color="success" size="small">+12.5%</v-chip>
                    </div>
                </UiParentCard>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Total Revenue">
                    <div class="text-center pa-4">
                        <h2 class="text-success mb-2">${{ analyticsData.totalRevenue.toLocaleString() }}</h2>
                        <p class="text-subtitle-1">This Month</p>
                        <v-chip color="success" size="small">+8.2%</v-chip>
                    </div>
                </UiParentCard>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Conversion Rate">
                    <div class="text-center pa-4">
                        <h2 class="text-warning mb-2">{{ analyticsData.conversionRate }}%</h2>
                        <p class="text-subtitle-1">This Month</p>
                        <v-chip color="warning" size="small">+2.1%</v-chip>
                    </div>
                </UiParentCard>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Bounce Rate">
                    <div class="text-center pa-4">
                        <h2 class="text-error mb-2">{{ analyticsData.bounceRate }}%</h2>
                        <p class="text-subtitle-1">This Month</p>
                        <v-chip color="error" size="small">-1.3%</v-chip>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <v-row>
            <!-- Traffic Sources Chart -->
            <v-col cols="12" md="8">
                <UiParentCard title="Traffic Analytics">
                    <div class="pa-4">
                        <v-row>
                            <v-col cols="12" sm="6" md="3" v-for="item in chartData" :key="item.name"
                                class="text-center">
                                <div class="mb-2">
                                    <h4>{{ item.name }}</h4>
                                    <p class="text-h6">{{ item.value }}</p>
                                </div>
                                <v-progress-linear :model-value="(item.value / 800) * 100" color="primary" height="8"
                                    rounded></v-progress-linear>
                            </v-col>
                        </v-row>
                    </div>
                </UiParentCard>
            </v-col>

            <!-- Top Performing Pages -->
            <v-col cols="12" md="4">
                <UiParentCard title="Top Pages">
                    <v-list density="compact">
                        <v-list-item v-for="(page, index) in [
                            { title: '/dashboard', views: 12543 },
                            { title: '/products', views: 8921 },
                            { title: '/analytics', views: 6234 },
                            { title: '/settings', views: 4567 },
                            { title: '/profile', views: 3456 }
                        ]" :key="index">
                            <template v-slot:prepend>
                                <v-avatar size="small" :color="`primary`">
                                    {{ index + 1 }}
                                </v-avatar>
                            </template>
                            <v-list-item-title>{{ page.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ page.views.toLocaleString() }} views</v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </UiParentCard>
            </v-col>
        </v-row>

        <v-row>
            <!-- User Engagement -->
            <v-col cols="12" md="6">
                <UiParentCard title="User Engagement">
                    <div class="pa-4">
                        <v-row class="text-center">
                            <v-col cols="4">
                                <div>
                                    <h3 class="text-primary">5.2m</h3>
                                    <p class="text-caption">Page Views</p>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div>
                                    <h3 class="text-success">2.1m</h3>
                                    <p class="text-caption">Sessions</p>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div>
                                    <h3 class="text-warning">3:24</h3>
                                    <p class="text-caption">Avg. Time</p>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </UiParentCard>
            </v-col>

            <!-- Device Analytics -->
            <v-col cols="12" md="6">
                <UiParentCard title="Device Breakdown">
                    <v-list>
                        <v-list-item v-for="device in [
                            { name: 'Desktop', percentage: 45, color: 'primary' },
                            { name: 'Mobile', percentage: 35, color: 'success' },
                            { name: 'Tablet', percentage: 20, color: 'warning' }
                        ]" :key="device.name">
                            <template v-slot:prepend>
                                <v-icon :color="device.color">mdi-{{ device.name.toLowerCase() }}</v-icon>
                            </template>
                            <v-list-item-title>{{ device.name }}</v-list-item-title>
                            <template v-slot:append>
                                <span class="text-subtitle-2">{{ device.percentage }}%</span>
                            </template>
                        </v-list-item>
                    </v-list>
                </UiParentCard>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.text-center {
    text-align: center;
}
</style>