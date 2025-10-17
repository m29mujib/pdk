<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiTextfieldPrimary from '@/components/shared/UiTextfieldPrimary.vue';
import { ref } from 'vue';

const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
});

const contactInfo = ref([
    {
        title: 'Address',
        details: '123 Business Street, Tech City, TC 12345',
        icon: 'mdi-map-marker'
    },
    {
        title: 'Phone',
        details: '+1 (555) 123-4567',
        icon: 'mdi-phone'
    },
    {
        title: 'Email',
        details: 'contact@company.com',
        icon: 'mdi-email'
    },
    {
        title: 'Working Hours',
        details: 'Mon - Fri: 9:00 AM - 6:00 PM',
        icon: 'mdi-clock'
    }
]);

const submitForm = () => {
    // Handle form submission
    console.log('Form submitted:', contactForm.value);
};
</script>

<template>
    <div>
        <!-- Hero Section -->
        <v-row class="mb-8">
            <v-col cols="12">
                <UiParentCard>
                    <div class="text-center pa-8">
                        <h1 class="text-h2 mb-4 text-primary">Contact Us</h1>
                        <p class="text-h6 mb-6 text-subtitle-1">
                            We'd love to hear from you. Get in touch with our team.
                        </p>
                        <p class="text-body-1 mx-auto" style="max-width: 600px;">
                            Whether you have a question about our services, need support, or want to discuss a project,
                            our team is ready to answer all your questions.
                        </p>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <v-row>
            <!-- Contact Information -->
            <v-col cols="12" md="4">
                <UiParentCard title="Get in Touch">
                    <div class="pa-4">
                        <div v-for="info in contactInfo" :key="info.title" class="d-flex align-center mb-6">
                            <v-icon :color="'primary'" size="24" class="me-4">
                                {{ info.icon }}
                            </v-icon>
                            <div>
                                <h3 class="text-subtitle-1 font-weight-bold mb-1">{{ info.title }}</h3>
                                <p class="text-body-2">{{ info.details }}</p>
                            </div>
                        </div>

                        <!-- Social Media -->
                        <v-divider class="my-6"></v-divider>
                        <h3 class="text-subtitle-1 font-weight-bold mb-4">Follow Us</h3>
                        <div class="d-flex">
                            <v-btn v-for="social in ['facebook', 'twitter', 'linkedin', 'instagram']" :key="social"
                                :icon="`mdi-${social}`" variant="outlined" size="small" class="me-2"></v-btn>
                        </div>
                    </div>
                </UiParentCard>
            </v-col>

            <!-- Contact Form -->
            <v-col cols="12" md="8">
                <UiParentCard title="Send us a Message">
                    <v-form @submit.prevent="submitForm" class="pa-4">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <UiTextfieldPrimary v-model="contactForm.name" label="Full Name" :required="true" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <UiTextfieldPrimary v-model="contactForm.email" label="Email Address" type="email"
                                    :required="true" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <UiTextfieldPrimary v-model="contactForm.phone" label="Phone Number" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <UiTextfieldPrimary v-model="contactForm.subject" label="Subject" :required="true" />
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="contactForm.message" label="Message" variant="outlined" rows="5"
                                    :required="true"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-btn type="submit" color="primary" size="large" class="me-4">
                                    Send Message
                                </v-btn>
                                <v-btn variant="outlined" size="large"
                                    @click="contactForm = { name: '', email: '', phone: '', subject: '', message: '' }">
                                    Reset
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Map Section -->
        <v-row class="mt-8">
            <v-col cols="12">
                <UiParentCard title="Our Location">
                    <div class="pa-4">
                        <div class="bg-grey-lighten-3 rounded d-flex align-center justify-center"
                            style="height: 300px;">
                            <div class="text-center">
                                <v-icon size="48" color="primary" class="mb-4">mdi-map-marker</v-icon>
                                <h3 class="text-h6 mb-2">Interactive Map</h3>
                                <p class="text-body-2">Map integration would go here</p>
                            </div>
                        </div>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- FAQ Section -->
        <v-row class="mt-8">
            <v-col cols="12">
                <UiParentCard title="Frequently Asked Questions">
                    <v-expansion-panels class="pa-4">
                        <v-expansion-panel v-for="(faq, index) in [
                            {
                                question: 'What services do you offer?',
                                answer: 'We offer web development, mobile app development, UI/UX design, and digital marketing services.'
                            },
                            {
                                question: 'How long does a typical project take?',
                                answer: 'Project timelines vary depending on complexity, but most projects are completed within 4-12 weeks.'
                            },
                            {
                                question: 'Do you provide ongoing support?',
                                answer: 'Yes, we offer maintenance and support packages for all our projects.'
                            },
                            {
                                question: 'What is your pricing structure?',
                                answer: 'We offer flexible pricing based on project requirements. Contact us for a custom quote.'
                            }
                        ]" :key="index">
                            <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
                            <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
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