<script setup lang="ts">
/*Call Components*/

import HeaderNotification from '@/components/dashboard/HeaderNotification.vue';
</script>
<template>
    <v-row>
        <div class="pl-2">
            <h1>Dashboard</h1>
            <p>Selamat Datang Di Dashboard Sistem Managemen</p>
        </div>
        
        <v-col cols="12">
            <v-row>
                <!-- Header Notification -->
                 <v-col cols="12" >
                    <HeaderNotification />
                </v-col>
                <!-- Sales overview -->
                <!-- <v-col cols="12" >
                    <SalesOverview />
                </v-col> -->

                <!-- Recent transaction -->
                <!-- <v-col cols="12" lg="4">
                    <RecentTransaction />
                </v-col> -->
                <!-- Product performence -->
                <!-- <v-col cols="12" lg="8">
                    <ProductPerformance />
                </v-col> -->
                <!-- Product Cards -->
                <!-- <v-col cols="12">
                    <ProductCards />
                </v-col> -->
            </v-row>
        </v-col>
    </v-row>
</template>