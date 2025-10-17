<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';

// Sample eCommerce data
const ecommerceData = ref({
    totalSales: 124567,
    totalOrders: 1234,
    totalProducts: 567,
    totalCustomers: 8901
});

const recentOrders = ref([
    { id: '#12345', customer: 'John Doe', product: 'iPhone 14', amount: 999, status: 'Completed' },
    { id: '#12346', customer: 'Jane Smith', product: 'MacBook Pro', amount: 1999, status: 'Processing' },
    { id: '#12347', customer: 'Bob Johnson', product: 'iPad Air', amount: 599, status: 'Shipped' },
    { id: '#12348', customer: 'Alice Brown', product: 'AirPods', amount: 179, status: 'Pending' },
]);

const topProducts = ref([
    { name: 'iPhone 14', sales: 234, revenue: 234000 },
    { name: 'MacBook Pro', sales: 123, revenue: 245700 },
    { name: 'iPad Air', sales: 89, revenue: 53211 },
    { name: 'AirPods Pro', sales: 167, revenue: 41750 },
]);

const salesData = ref([
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 48000 },
    { month: 'Apr', sales: 61000 },
    { month: 'May', sales: 55000 },
    { month: 'Jun', sales: 67000 }
]);

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed': return 'success';
        case 'processing': return 'warning';
        case 'shipped': return 'info';
        case 'pending': return 'error';
        default: return 'primary';
    }
};
</script>

<template>
    <div>
        <v-row>
            <!-- eCommerce Stats Cards -->
            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Total Sales">
                    <div class="text-center pa-4">
                        <h2 class="text-success mb-2">${{ ecommerceData.totalSales.toLocaleString() }}</h2>
                        <p class="text-subtitle-1">This Month</p>
                        <v-chip color="success" size="small">+15.3%</v-chip>
                    </div>
                </UiParentCard>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Total Orders">
                    <div class="text-center pa-4">
                        <h2 class="text-primary mb-2">{{ ecommerceData.totalOrders.toLocaleString() }}</h2>
                        <p class="text-subtitle-1">This Month</p>
                        <v-chip color="primary" size="small">+8.2%</v-chip>
                    </div>
                </UiParentCard>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Total Products">
                    <div class="text-center pa-4">
                        <h2 class="text-warning mb-2">{{ ecommerceData.totalProducts }}</h2>
                        <p class="text-subtitle-1">In Inventory</p>
                        <v-chip color="warning" size="small">+5</v-chip>
                    </div>
                </UiParentCard>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <UiParentCard title="Total Customers">
                    <div class="text-center pa-4">
                        <h2 class="text-info mb-2">{{ ecommerceData.totalCustomers.toLocaleString() }}</h2>
                        <p class="text-subtitle-1">Active Users</p>
                        <v-chip color="info" size="small">+12.1%</v-chip>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <v-row>
            <!-- Sales Chart -->
            <v-col cols="12" md="8">
                <UiParentCard title="Sales Overview">
                    <div class="pa-4">
                        <v-row>
                            <v-col cols="12" sm="6" md="2" v-for="item in salesData" :key="item.month"
                                class="text-center">
                                <div class="mb-2">
                                    <h4>{{ item.month }}</h4>
                                    <p class="text-h6">${{ (item.sales / 1000).toFixed(0) }}K</p>
                                </div>
                                <v-progress-linear :model-value="(item.sales / 70000) * 100" color="success" height="8"
                                    rounded></v-progress-linear>
                            </v-col>
                        </v-row>
                    </div>
                </UiParentCard>
            </v-col>

            <!-- Top Products -->
            <v-col cols="12" md="4">
                <UiParentCard title="Top Products">
                    <v-list density="compact">
                        <v-list-item v-for="(product, index) in topProducts" :key="index">
                            <template v-slot:prepend>
                                <v-avatar size="small" color="primary">
                                    {{ index + 1 }}
                                </v-avatar>
                            </template>
                            <v-list-item-title>{{ product.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ product.sales }} sales - ${{ product.revenue.toLocaleString()
                                }}</v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </UiParentCard>
            </v-col>
        </v-row>

        <v-row>
            <!-- Recent Orders -->
            <v-col cols="12">
                <UiParentCard title="Recent Orders">
                    <v-table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in recentOrders" :key="order.id">
                                <td>{{ order.id }}</td>
                                <td>{{ order.customer }}</td>
                                <td>{{ order.product }}</td>
                                <td>${{ order.amount }}</td>
                                <td>
                                    <v-chip :color="getStatusColor(order.status)" size="small">
                                        {{ order.status }}
                                    </v-chip>
                                </td>
                                <td>
                                    <v-btn size="small" variant="text" icon>
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                    <v-btn size="small" variant="text" icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </UiParentCard>
            </v-col>
        </v-row>

        <v-row>
            <!-- Sales by Category -->
            <v-col cols="12" md="6">
                <UiParentCard title="Sales by Category">
                    <v-list>
                        <v-list-item v-for="category in [
                            { name: 'Electronics', percentage: 45, amount: 45000, color: 'primary' },
                            { name: 'Clothing', percentage: 25, amount: 25000, color: 'success' },
                            { name: 'Books', percentage: 15, amount: 15000, color: 'warning' },
                            { name: 'Home & Garden', percentage: 15, amount: 15000, color: 'info' }
                        ]" :key="category.name">
                            <template v-slot:prepend>
                                <v-icon :color="category.color">mdi-tag</v-icon>
                            </template>
                            <v-list-item-title>{{ category.name }}</v-list-item-title>
                            <v-list-item-subtitle>${{ category.amount.toLocaleString() }}</v-list-item-subtitle>
                            <template v-slot:append>
                                <span class="text-subtitle-2">{{ category.percentage }}%</span>
                            </template>
                        </v-list-item>
                    </v-list>
                </UiParentCard>
            </v-col>

            <!-- Customer Analytics -->
            <v-col cols="12" md="6">
                <UiParentCard title="Customer Analytics">
                    <div class="pa-4">
                        <v-row class="text-center">
                            <v-col cols="6">
                                <div>
                                    <h3 class="text-primary">2,543</h3>
                                    <p class="text-caption">New Customers</p>
                                    <v-chip color="success" size="small">+12%</v-chip>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div>
                                    <h3 class="text-success">6,358</h3>
                                    <p class="text-caption">Returning Customers</p>
                                    <v-chip color="success" size="small">+8%</v-chip>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div>
                                    <h3 class="text-warning">$142</h3>
                                    <p class="text-caption">Avg. Order Value</p>
                                    <v-chip color="warning" size="small">+5%</v-chip>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div>
                                    <h3 class="text-info">4.2</h3>
                                    <p class="text-caption">Avg. Rating</p>
                                    <v-chip color="info" size="small">+0.2</v-chip>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
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