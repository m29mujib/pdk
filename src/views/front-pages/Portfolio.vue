<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';

const portfolioItems = ref([
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'Web Development',
        description: 'Modern online shopping platform with advanced features',
        image: '/public/assets/images/products/u1.jpg',
        technologies: ['Vue.js', 'Node.js', 'MongoDB'],
        link: '#'
    },
    {
        id: 2,
        title: 'Mobile Banking App',
        category: 'Mobile Development',
        description: 'Secure and user-friendly banking application',
        image: '/public/assets/images/products/u2.jpg',
        technologies: ['React Native', 'Firebase', 'TypeScript'],
        link: '#'
    },
    {
        id: 3,
        title: 'Corporate Dashboard',
        category: 'UI/UX Design',
        description: 'Analytics dashboard for business intelligence',
        image: '/public/assets/images/products/u3.jpg',
        technologies: ['Figma', 'Vue.js', 'Chart.js'],
        link: '#'
    },
    {
        id: 4,
        title: 'Healthcare Portal',
        category: 'Web Development',
        description: 'Patient management system for healthcare providers',
        image: '/public/assets/images/users/1.jpg',
        technologies: ['React', 'Express.js', 'PostgreSQL'],
        link: '#'
    },
    {
        id: 5,
        title: 'Social Media App',
        category: 'Mobile Development',
        description: 'Social networking platform with real-time messaging',
        image: '/public/assets/images/users/2.jpg',
        technologies: ['Flutter', 'Firebase', 'WebRTC'],
        link: '#'
    },
    {
        id: 6,
        title: 'Learning Management System',
        category: 'Web Development',
        description: 'Online education platform with interactive features',
        image: '/public/assets/images/users/3.jpg',
        technologies: ['Vue.js', 'Laravel', 'MySQL'],
        link: '#'
    }
]);

const categories = ref([
    { name: 'All', active: true },
    { name: 'Web Development', active: false },
    { name: 'Mobile Development', active: false },
    { name: 'UI/UX Design', active: false }
]);

const filterByCategory = (categoryName: string) => {
    categories.value.forEach(cat => cat.active = false);
    const selectedCategory = categories.value.find(cat => cat.name === categoryName);
    if (selectedCategory) {
        selectedCategory.active = true;
    }
};
</script>

<template>
    <div>
        <!-- Hero Section -->
        <v-row class="mb-8">
            <v-col cols="12">
                <UiParentCard>
                    <div class="text-center pa-8">
                        <h1 class="text-h2 mb-4 text-primary">Our Portfolio</h1>
                        <p class="text-h6 mb-6 text-subtitle-1">
                            Showcasing our best work and successful projects
                        </p>
                        <p class="text-body-1 mx-auto" style="max-width: 600px;">
                            Explore our diverse portfolio of web applications, mobile apps, and design projects
                            that have helped our clients achieve their business goals.
                        </p>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Category Filter -->
        <v-row class="mb-6">
            <v-col cols="12" class="text-center">
                <v-chip v-for="category in categories" :key="category.name"
                    :color="category.active ? 'primary' : 'default'" :variant="category.active ? 'flat' : 'outlined'"
                    class="ma-1" @click="filterByCategory(category.name)">
                    {{ category.name }}
                </v-chip>
            </v-col>
        </v-row>

        <!-- Portfolio Grid -->
        <v-row>
            <v-col cols="12" md="6" lg="4" v-for="item in portfolioItems" :key="item.id">
                <UiParentCard>
                    <v-img :src="item.image" height="200" cover class="mb-4">
                        <div class="overlay d-flex align-center justify-center">
                            <v-btn :href="item.link" color="white" variant="outlined" prepend-icon="mdi-eye">
                                View Project
                            </v-btn>
                        </div>
                    </v-img>
                    <div class="pa-4">
                        <v-chip :color="item.category === 'Web Development' ? 'primary' :
                            item.category === 'Mobile Development' ? 'success' : 'warning'" size="small" class="mb-3">
                            {{ item.category }}
                        </v-chip>
                        <h2 class="text-h6 mb-3">{{ item.title }}</h2>
                        <p class="text-body-2 mb-4">{{ item.description }}</p>

                        <!-- Technologies -->
                        <div class="mb-4">
                            <p class="text-caption mb-2">Technologies:</p>
                            <v-chip v-for="tech in item.technologies" :key="tech" size="x-small" variant="outlined"
                                class="me-1 mb-1">
                                {{ tech }}
                            </v-chip>
                        </div>

                        <v-btn color="primary" variant="outlined" block :href="item.link">
                            View Details
                        </v-btn>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Call to Action -->
        <v-row class="mt-12">
            <v-col cols="12">
                <UiParentCard>
                    <div class="text-center pa-8">
                        <h2 class="text-h3 mb-4">Ready to Start Your Project?</h2>
                        <p class="text-body-1 mb-6 mx-auto" style="max-width: 500px;">
                            Let's discuss how we can help bring your vision to life with our expertise
                            and innovative solutions.
                        </p>
                        <v-btn color="primary" size="large" class="me-4">
                            Get Started
                        </v-btn>
                        <v-btn variant="outlined" size="large">
                            View All Projects
                        </v-btn>
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

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.v-img:hover .overlay {
    opacity: 1;
}
</style>