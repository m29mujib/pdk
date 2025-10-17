<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';

const blogPosts = ref([
    {
        id: 1,
        title: 'Getting Started with Vue 3 and Vuetify',
        excerpt: 'Learn how to build modern web applications with Vue 3 and Vuetify components',
        author: 'John Doe',
        date: '2024-01-15',
        category: 'Development',
        image: '/public/assets/images/users/u1.jpg',
        tags: ['Vue', 'Vuetify', 'Frontend']
    },
    {
        id: 2,
        title: 'Best Practices for Dashboard Design',
        excerpt: 'Discover the key principles for creating effective and user-friendly dashboards',
        author: 'Jane Smith',
        date: '2024-01-12',
        category: 'Design',
        image: '/public/assets/images/users/u2.jpg',
        tags: ['Design', 'UX', 'Dashboard']
    },
    {
        id: 3,
        title: 'TypeScript in Modern Web Development',
        excerpt: 'Why TypeScript is becoming essential for large-scale web applications',
        author: 'Bob Johnson',
        date: '2024-01-10',
        category: 'Development',
        image: '/public/assets/images/users/u3.jpg',
        tags: ['TypeScript', 'JavaScript', 'Web Development']
    },
    {
        id: 4,
        title: 'Performance Optimization Techniques',
        excerpt: 'Advanced strategies for optimizing web application performance',
        author: 'Alice Brown',
        date: '2024-01-08',
        category: 'Performance',
        image: '/public/assets/images/users/1.jpg',
        tags: ['Performance', 'Optimization', 'Web']
    },
    {
        id: 5,
        title: 'Mobile-First Design Principles',
        excerpt: 'How to create responsive designs that work perfectly on all devices',
        author: 'Charlie Wilson',
        date: '2024-01-05',
        category: 'Design',
        image: '/public/assets/images/users/2.jpg',
        tags: ['Mobile', 'Responsive', 'Design']
    },
    {
        id: 6,
        title: 'API Integration Best Practices',
        excerpt: 'Essential techniques for integrating third-party APIs in your applications',
        author: 'Diana Lee',
        date: '2024-01-03',
        category: 'Development',
        image: '/public/assets/images/users/3.jpg',
        tags: ['API', 'Integration', 'Backend']
    }
]);

const categories = ref([
    { name: 'All', count: blogPosts.value.length, active: true },
    { name: 'Development', count: 3, active: false },
    { name: 'Design', count: 2, active: false },
    { name: 'Performance', count: 1, active: false }
]);

const featuredPost = ref({
    title: 'The Future of Web Development in 2024',
    excerpt: 'Exploring emerging trends and technologies that will shape the web development landscape',
    author: 'Tech Editor',
    date: '2024-01-20',
    image: '/public/assets/images/background/u1.jpg'
});

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
        <!-- Hero/Featured Post Section -->
        <v-row class="mb-8">
            <v-col cols="12">
                <UiParentCard>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-img :src="featuredPost.image" height="300" cover class="rounded-s"></v-img>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="pa-6 d-flex flex-column justify-center h-100">
                                <v-chip color="primary" size="small" class="mb-4">Featured</v-chip>
                                <h1 class="text-h4 mb-4">{{ featuredPost.title }}</h1>
                                <p class="text-body-1 mb-4">{{ featuredPost.excerpt }}</p>
                                <div class="d-flex align-center mb-4">
                                    <span class="text-body-2">By {{ featuredPost.author }}</span>
                                    <v-divider vertical class="mx-3"></v-divider>
                                    <span class="text-body-2">{{ new Date(featuredPost.date).toLocaleDateString()
                                        }}</span>
                                </div>
                                <v-btn color="primary" class="align-self-start">Read More</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Blog Header and Categories -->
        <v-row class="mb-6">
            <v-col cols="12">
                <h1 class="text-h3 text-center mb-6">Our Blog</h1>
                <div class="text-center">
                    <v-chip v-for="category in categories" :key="category.name"
                        :color="category.active ? 'primary' : 'default'"
                        :variant="category.active ? 'flat' : 'outlined'" class="ma-1"
                        @click="filterByCategory(category.name)">
                        {{ category.name }} ({{ category.count }})
                    </v-chip>
                </div>
            </v-col>
        </v-row>

        <!-- Blog Posts Grid -->
        <v-row>
            <v-col cols="12" md="6" lg="4" v-for="post in blogPosts" :key="post.id">
                <UiParentCard>
                    <v-img :src="post.image" height="200" cover class="mb-4"></v-img>
                    <div class="pa-4">
                        <v-chip :color="post.category === 'Development' ? 'primary' :
                            post.category === 'Design' ? 'success' : 'warning'" size="small" class="mb-3">
                            {{ post.category }}
                        </v-chip>
                        <h2 class="text-h6 mb-3">{{ post.title }}</h2>
                        <p class="text-body-2 mb-4">{{ post.excerpt }}</p>

                        <!-- Tags -->
                        <div class="mb-4">
                            <v-chip v-for="tag in post.tags" :key="tag" size="x-small" variant="outlined"
                                class="me-1 mb-1">
                                {{ tag }}
                            </v-chip>
                        </div>

                        <!-- Author and Date -->
                        <div class="d-flex align-center justify-space-between mb-4">
                            <div class="d-flex align-center">
                                <v-avatar size="32" class="me-2">
                                    <v-img :src="post.image" alt="author"></v-img>
                                </v-avatar>
                                <div>
                                    <p class="text-body-2 mb-0">{{ post.author }}</p>
                                    <p class="text-caption">{{ new Date(post.date).toLocaleDateString() }}</p>
                                </div>
                            </div>
                        </div>

                        <v-btn color="primary" variant="outlined" block>
                            Read More
                        </v-btn>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Load More Section -->
        <v-row class="mt-8">
            <v-col cols="12" class="text-center">
                <v-btn color="primary" size="large" variant="outlined">
                    Load More Posts
                </v-btn>
            </v-col>
        </v-row>

        <!-- Newsletter Signup -->
        <v-row class="mt-12">
            <v-col cols="12">
                <UiParentCard>
                    <div class="text-center pa-8">
                        <h2 class="text-h4 mb-4">Stay Updated</h2>
                        <p class="text-body-1 mb-6">
                            Subscribe to our newsletter and get the latest updates on web development, design trends,
                            and industry insights.
                        </p>
                        <v-row class="justify-center">
                            <v-col cols="12" md="6" lg="4">
                                <v-text-field label="Email Address" variant="outlined" append-inner-icon="mdi-send"
                                    density="comfortable"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-btn color="success" size="large">
                            Subscribe Now
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
</style>