<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { BCard, BButton, BContainer, BRow, BCol } from 'bootstrap-vue-next';

const router = useRouter();
const route = useRoute();
const contact = ref(null);

onMounted(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactId = route.params.id;
    contact.value = contacts.find(c => c.id === contactId);

    if (!contact.value) {
        alert('Contact not found!');
        router.push('/');
    }
});
</script>

<template>
    <div class="main-container">
        <BContainer class="d-flex justify-content-center align-items-center">
            <BRow>
                <BCol>
                    <BCard v-if="contact" class="p-4 text-center shadow-lg rounded custom-card">
                        <!-- Profile Image -->
                        <div class="profile-img mx-auto">
                            <img :src="contact.image || '/default-avatar.png'" alt="Profile" class="rounded-circle" />
                        </div>

                        <!-- Contact Details -->
                        <h2 class="mt-3 fw-bold text-primary">{{ contact.firstName }} {{ contact.lastName }}</h2>

                        <div class="text-start mt-4">
                            <p><strong><i class="bi bi-envelope"></i> Email:</strong> {{ contact.email || 'N/A' }}</p>
                            <p><strong><i class="bi bi-telephone"></i> Phone:</strong> {{ contact.phone }}</p>
                            <p><strong><i class="bi bi-globe"></i> Country:</strong> {{ contact.country }}</p>
                        </div>

                        <!-- Buttons -->
                        <div class="mt-4">
                            <BButton variant="outline-primary" class="me-2 px-4" @click="router.push('/')">
                                <i class="bi bi-arrow-left"></i> Back
                            </BButton>
                            <BButton variant="warning" class="px-4" @click="router.push(`/edit/${contact.id}`)">
                                <i class="bi bi-pencil"></i> Edit
                            </BButton>
                        </div>
                    </BCard>
                </BCol>
            </BRow>
        </BContainer>
    </div>
</template>

<style scoped>
.custom-card {
    max-width: 400px;
    border-radius: 15px;
    background: white;
}

.profile-img img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 3px solid #007bff;
    padding: 5px;
}
</style>
