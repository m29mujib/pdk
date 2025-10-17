<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';

const pricingPlans = ref([
    {
        name: 'Starter',
        price: 29,
        period: 'month',
        popular: false,
        description: 'Perfect for small businesses and startups',
        features: [
            'Up to 5 Projects',
            '10GB Storage',
            'Basic Support',
            'Standard Templates',
            'Email Integration'
        ],
        buttonText: 'Get Started',
        color: 'primary'
    },
    {
        name: 'Professional',
        price: 79,
        period: 'month',
        popular: true,
        description: 'Ideal for growing businesses and teams',
        features: [
            'Up to 25 Projects',
            '100GB Storage',
            'Priority Support',
            'Premium Templates',
            'Advanced Analytics',
            'API Access',
            'Team Collaboration'
        ],
        buttonText: 'Start Free Trial',
        color: 'success'
    },
    {
        name: 'Enterprise',
        price: 199,
        period: 'month',
        popular: false,
        description: 'For large organizations and enterprises',
        features: [
            'Unlimited Projects',
            '1TB Storage',
            '24/7 Premium Support',
            'Custom Templates',
            'Advanced Analytics',
            'Full API Access',
            'Advanced Security',
            'Custom Integrations',
            'Dedicated Account Manager'
        ],
        buttonText: 'Contact Sales',
        color: 'warning'
    }
]);

const faqs = ref([
    {
        question: 'Can I change my plan at any time?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
        question: 'Is there a free trial available?',
        answer: 'Yes, we offer a 14-day free trial for the Professional plan with no credit card required.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
    },
    {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 30-day money-back guarantee for all our plans.'
    },
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Absolutely! You can cancel your subscription at any time without any cancellation fees.'
    }
]);

const testimonials = ref([
    {
        name: 'John Doe',
        company: 'Tech Startup Inc.',
        rating: 5,
        comment: 'Excellent service and great value for money. Highly recommended!',
        avatar: '/public/assets/images/users/1.jpg'
    },
    {
        name: 'Jane Smith',
        company: 'Creative Agency',
        rating: 5,
        comment: 'The professional plan has everything we need to manage our projects efficiently.',
        avatar: '/public/assets/images/users/2.jpg'
    },
    {
        name: 'Bob Johnson',
        company: 'Enterprise Corp',
        rating: 5,
        comment: 'Outstanding support and enterprise features. Perfect for our organization.',
        avatar: '/public/assets/images/users/3.jpg'
    }
]);
</script>

<template>
    <div>
        <!-- Hero Section -->
        <v-row class="mb-8">
            <v-col cols="12">
                <UiParentCard>
                    <div class="text-center pa-8">
                        <h1 class="text-h2 mb-4 text-primary">Choose Your Plan</h1>
                        <p class="text-h6 mb-6 text-subtitle-1">
                            Flexible pricing options to fit your needs
                        </p>
                        <p class="text-body-1 mx-auto" style="max-width: 600px;">
                            Whether you're a startup, growing business, or enterprise, we have the perfect plan
                            to help you succeed. All plans come with our core features and dedicated support.
                        </p>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Pricing Cards -->
        <v-row class="mb-8">
            <v-col cols="12" md="4" v-for="plan in pricingPlans" :key="plan.name">
                <UiParentCard :class="plan.popular ? 'elevation-8' : ''">
                    <div class="pa-6 text-center position-relative">
                        <!-- Popular Badge -->
                        <v-chip v-if="plan.popular" color="success" size="small" class="position-absolute"
                            style="top: -10px; right: 20px;">
                            Most Popular
                        </v-chip>

                        <!-- Plan Name and Price -->
                        <h2 class="text-h4 mb-2">{{ plan.name }}</h2>
                        <p class="text-body-2 mb-4">{{ plan.description }}</p>

                        <div class="mb-6">
                            <span class="text-h2 font-weight-bold" :class="`text-${plan.color}`">
                                ${{ plan.price }}
                            </span>
                            <span class="text-body-1">/ {{ plan.period }}</span>
                        </div>

                        <!-- Features List -->
                        <v-list density="compact" class="mb-6">
                            <v-list-item v-for="feature in plan.features" :key="feature" class="px-0">
                                <template v-slot:prepend>
                                    <v-icon color="success" size="small">mdi-check</v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">{{ feature }}</v-list-item-title>
                            </v-list-item>
                        </v-list>

                        <!-- Action Button -->
                        <v-btn :color="plan.color" :variant="plan.popular ? 'flat' : 'outlined'" size="large" block>
                            {{ plan.buttonText }}
                        </v-btn>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Features Comparison -->
        <v-row class="mb-8">
            <v-col cols="12">
                <UiParentCard title="Feature Comparison">
                    <v-table class="pa-4">
                        <thead>
                            <tr>
                                <th>Features</th>
                                <th class="text-center">Starter</th>
                                <th class="text-center">Professional</th>
                                <th class="text-center">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="feature in [
                                { name: 'Projects', starter: '5', professional: '25', enterprise: 'Unlimited' },
                                { name: 'Storage', starter: '10GB', professional: '100GB', enterprise: '1TB' },
                                { name: 'Support', starter: 'Basic', professional: 'Priority', enterprise: '24/7 Premium' },
                                { name: 'API Access', starter: false, professional: true, enterprise: true },
                                { name: 'Analytics', starter: false, professional: true, enterprise: true },
                                { name: 'Custom Integrations', starter: false, professional: false, enterprise: true }
                            ]" :key="feature.name">
                                <td class="font-weight-medium">{{ feature.name }}</td>
                                <td class="text-center">
                                    <span v-if="typeof feature.starter === 'boolean'">
                                        <v-icon :color="feature.starter ? 'success' : 'error'">
                                            {{ feature.starter ? 'mdi-check' : 'mdi-close' }}
                                        </v-icon>
                                    </span>
                                    <span v-else>{{ feature.starter }}</span>
                                </td>
                                <td class="text-center">
                                    <span v-if="typeof feature.professional === 'boolean'">
                                        <v-icon :color="feature.professional ? 'success' : 'error'">
                                            {{ feature.professional ? 'mdi-check' : 'mdi-close' }}
                                        </v-icon>
                                    </span>
                                    <span v-else>{{ feature.professional }}</span>
                                </td>
                                <td class="text-center">
                                    <span v-if="typeof feature.enterprise === 'boolean'">
                                        <v-icon :color="feature.enterprise ? 'success' : 'error'">
                                            {{ feature.enterprise ? 'mdi-check' : 'mdi-close' }}
                                        </v-icon>
                                    </span>
                                    <span v-else>{{ feature.enterprise }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- Testimonials -->
        <v-row class="mb-8">
            <v-col cols="12">
                <h2 class="text-h3 text-center mb-6">What Our Customers Say</h2>
            </v-col>
            <v-col cols="12" md="4" v-for="testimonial in testimonials" :key="testimonial.name">
                <UiParentCard>
                    <div class="pa-6 text-center">
                        <v-avatar size="60" class="mb-4">
                            <v-img :src="testimonial.avatar" :alt="testimonial.name"></v-img>
                        </v-avatar>
                        <div class="mb-4">
                            <v-rating :model-value="testimonial.rating" color="warning" density="compact"
                                readonly></v-rating>
                        </div>
                        <p class="text-body-2 mb-4">"{{ testimonial.comment }}"</p>
                        <h4 class="text-subtitle-1 font-weight-bold">{{ testimonial.name }}</h4>
                        <p class="text-caption">{{ testimonial.company }}</p>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>

        <!-- FAQ -->
        <v-row>
            <v-col cols="12">
                <UiParentCard title="Frequently Asked Questions">
                    <v-expansion-panels class="pa-4">
                        <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
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