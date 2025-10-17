<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';

const companyInfo = ref({
    name: 'Our Company',
    founded: '2020',
    employees: '100+',
    mission: 'To empower businesses with cutting-edge technology solutions',
    vision: 'To be the leading provider of innovative web solutions worldwide'
});

const teamMembers = ref([
    {
        name: 'John Doe',
        position: 'CEO & Founder',
        bio: 'Experienced leader with 15+ years in tech industry',
        avatar: '/public/assets/images/users/1.jpg'
    },
    {
        name: 'Jane Smith',
        position: 'CTO',
        bio: 'Tech visionary with expertise in full-stack development',
        avatar: '/public/assets/images/users/2.jpg'
    },
    {
        name: 'Bob Johnson',
        position: 'Lead Designer',
        bio: 'Creative designer with passion for user experience',
        avatar: '/public/assets/images/users/3.jpg'
    },
    {
        name: 'Alice Brown',
        position: 'Marketing Director',
        bio: 'Strategic marketer with proven track record',
        avatar: '/public/assets/images/users/4.jpg'
    }
]);

const values = ref([
    {
        title: 'Innovation',
        description: 'We constantly push the boundaries of what\'s possible',
        icon: 'mdi-lightbulb-on'
    },
    {
        title: 'Quality',
        description: 'We deliver excellence in everything we do',
        icon: 'mdi-star'
    },
    {
        title: 'Integrity',
        description: 'We maintain the highest standards of honesty',
        icon: 'mdi-shield-check'
    },
    {
        title: 'Customer Focus',
        description: 'Our customers are at the heart of our decisions',
        icon: 'mdi-account-heart'
    }
]);

const timeline = ref([
    { year: '2020', event: 'Company Founded', description: 'Started with a vision to transform web development' },
    { year: '2021', event: 'First Major Client', description: 'Secured partnership with Fortune 500 company' },
    { year: '2022', event: 'Team Expansion', description: 'Grew to 50+ employees across multiple countries' },
    { year: '2023', event: 'Product Launch', description: 'Released flagship platform to market' },
    { year: '2024', event: 'Global Recognition', description: 'Won industry excellence award' }
]);
</script>

<template>
    <div>
        <!-- Hero Section -->
        <v-row class="mb-8">
            <v-col cols="12">
                <UiParentCard>
                    <div class="text-center pa-8">
                        <h1 class="text-h2 mb-4 text-primary">About {{ companyInfo.name }}</h1>
                        <p class="text-h6 mb-6 text-subtitle-1">{{ companyInfo.mission }}</p>
                        <v-row class="justify-center">
                            <v-col cols="12" md="8">
                                <p class="text-body-1">
                                    We are a passionate team of innovators, designers, and developers dedicated to
                                    creating
                                    exceptional digital experiences. Since our founding in {{ companyInfo.founded }}, we
                                    have
                                    been committed to helping businesses succeed in the digital world.
                                </p>
                            </v-col>
                        </v-row>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Mission & Vision -->
        <v-row class="mb-8">
            <v-col cols="12" md="6">
                <UiParentCard title="Our Mission">
                    <div class="pa-4">
                        <v-icon size="48" color="primary" class="mb-4">mdi-target</v-icon>
                        <p class="text-body-1">{{ companyInfo.mission }}</p>
                    </div>
                </UiParentCard>
            </v-col>
            <v-col cols="12" md="6">
                <UiParentCard title="Our Vision">
                    <div class="pa-4">
                        <v-icon size="48" color="success" class="mb-4">mdi-eye</v-icon>
                        <p class="text-body-1">{{ companyInfo.vision }}</p>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Company Values -->
        <v-row class="mb-8">
            <v-col cols="12">
                <h2 class="text-h3 text-center mb-6">Our Values</h2>
            </v-col>
            <v-col cols="12" sm="6" md="3" v-for="value in values" :key="value.title">
                <UiParentCard>
                    <div class="text-center pa-6">
                        <v-icon size="48" color="primary" class="mb-4">{{ value.icon }}</v-icon>
                        <h3 class="text-h5 mb-3">{{ value.title }}</h3>
                        <p class="text-body-2">{{ value.description }}</p>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Team Section -->
        <v-row class="mb-8">
            <v-col cols="12">
                <h2 class="text-h3 text-center mb-6">Meet Our Team</h2>
            </v-col>
            <v-col cols="12" sm="6" md="3" v-for="member in teamMembers" :key="member.name">
                <UiParentCard>
                    <div class="text-center pa-6">
                        <v-avatar size="80" class="mb-4">
                            <v-img :src="member.avatar" alt="Team member"></v-img>
                        </v-avatar>
                        <h3 class="text-h6 mb-1">{{ member.name }}</h3>
                        <p class="text-subtitle-2 text-primary mb-3">{{ member.position }}</p>
                        <p class="text-body-2">{{ member.bio }}</p>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Company Timeline -->
        <v-row class="mb-8">
            <v-col cols="12">
                <UiParentCard title="Our Journey">
                    <v-timeline side="end" class="pa-4">
                        <v-timeline-item v-for="item in timeline" :key="item.year" dot-color="primary" size="small">
                            <template v-slot:opposite>
                                <span class="text-h6 font-weight-bold text-primary">{{ item.year }}</span>
                            </template>
                            <div class="py-4">
                                <h3 class="text-h6 mb-2">{{ item.event }}</h3>
                                <p class="text-body-2">{{ item.description }}</p>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Stats -->
        <v-row>
            <v-col cols="12">
                <UiParentCard title="By the Numbers">
                    <v-row class="pa-4">
                        <v-col cols="6" md="3" class="text-center">
                            <h2 class="text-h3 text-primary">{{ companyInfo.employees }}</h2>
                            <p class="text-body-2">Team Members</p>
                        </v-col>
                        <v-col cols="6" md="3" class="text-center">
                            <h2 class="text-h3 text-success">500+</h2>
                            <p class="text-body-2">Projects Delivered</p>
                        </v-col>
                        <v-col cols="6" md="3" class="text-center">
                            <h2 class="text-h3 text-warning">50+</h2>
                            <p class="text-body-2">Happy Clients</p>
                        </v-col>
                        <v-col cols="6" md="3" class="text-center">
                            <h2 class="text-h3 text-info">98%</h2>
                            <p class="text-body-2">Satisfaction Rate</p>
                        </v-col>
                    </v-row>
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