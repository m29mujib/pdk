<script setup>
import { useRouter } from 'vue-router';
import Icon from '../Icon.vue';

const props = defineProps({ item: Object, level: Number });
const router = useRouter();

const handleClick = () => {
    if (props.item.title === 'Logout') {
        // Clear authentication state
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');

        // Redirect to login page
        router.push('/auth/login');
        return;
    }
};
</script>

<template>
    <!---Single Item-->
    <v-list-item :href="item.external ? item.to : undefined"
        :to="!item.external && item.title !== 'Logout' ? item.to : undefined" @click="handleClick" rounded class="mb-1"
        :disabled="item.disabled" :target="item.external === true ? '_blank' : undefined">
        <!---If icon-->
        <template v-slot:prepend>
            <Icon :item="item.icon" :level="level" />
        </template>
        <v-list-item-title>{{ item.title }}
            <span v-if="item.children">
                <span v-if="item.chip" class="ps-3">
                    <v-chip color="secondary" :size="item.chipIcon ? 'x-small' : 'x-small'" :variant="item.chipVariant"
                        :prepend-icon="item.chipIcon">
                        {{ item.chip }}
                    </v-chip>
                </span>
            </span>
        </v-list-item-title>

        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ item.subCaption }}
        </v-list-item-subtitle>
        <!---If any chip or label-->
        <template v-slot:append v-if="item.chip">
            <v-chip color="secondary" rounded="md" :size="item.chipIcon ? 'x-small' : 'x-small'"
                :variant="item.chipVariant" :prepend-icon="item.chipIcon">
                {{ item.chip }}
            </v-chip>
        </template>
    </v-list-item>
</template>
