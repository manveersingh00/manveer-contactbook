<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { BForm, BFormGroup, BFormInput, BFormSelect, BButton, BInputGroup, BInputGroupText } from 'bootstrap-vue-next';

const router = useRouter();
const route = useRoute();
const contacts = ref([]);
const contact = ref({ firstName: '', lastName: '', phone: '', email: '', country: '', image: '' });
const countries = ['USA', 'Canada', 'UK', 'India', 'Australia'];
const defaultImage = '/default-avatar.png';

onMounted(() => {
    contacts.value = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactId = route.params.id;
    const foundContact = contacts.value.find(c => c.id === contactId);

    if (!foundContact) {
        alert('Contact not found!');
        router.push('/');
        return;
    }

    contact.value = { ...foundContact };
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            contact.value.image = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

const handleUpdateContact = () => {
    if (!contact.value.firstName || !contact.value.lastName || !contact.value.phone || !contact.value.email || !contact.value.country) {
        alert('All fields are required except the image.');
        return;
    }

    const index = contacts.value.findIndex(c => c.id === contact.value.id);
    if (index !== -1) {
        contacts.value[index] = { ...contact.value };
        localStorage.setItem('contacts', JSON.stringify(contacts.value));
    }

    router.push(`/contact/${contact.value.id}`);
};
</script>

<template>
    <div class="main-container">
        <h2 class="mb-4 title"><i class="bi bi-pencil-square"></i> Edit Contact</h2>

        <BForm @submit.prevent="handleUpdateContact" class="w-50 mx-auto shadow p-4 rounded bg-light">

            <BFormGroup class="mb-3">
                <BInputGroup>
                    <BInputGroupText><i class="bi bi-person"></i></BInputGroupText>
                    <BFormInput v-model="contact.firstName" placeholder="Enter first name" />
                </BInputGroup>
            </BFormGroup>

            <BFormGroup class="mb-3">
                <BInputGroup>
                    <BInputGroupText><i class="bi bi-person"></i></BInputGroupText>
                    <BFormInput v-model="contact.lastName" placeholder="Enter last name" />
                </BInputGroup>
            </BFormGroup>

            <BFormGroup class="mb-3">
                <BInputGroup>
                    <BInputGroupText><i class="bi bi-telephone"></i></BInputGroupText>
                    <BFormInput v-model="contact.phone" placeholder="Enter phone number" />
                </BInputGroup>
            </BFormGroup>

            <!-- New Email Field -->
            <BFormGroup class="mb-3">
                <BInputGroup>
                    <BInputGroupText><i class="bi bi-envelope-fill"></i></BInputGroupText>
                    <BFormInput v-model="contact.email" type="email" placeholder="Enter email" />
                </BInputGroup>
            </BFormGroup>

            <BFormGroup class="mb-3">
                <BInputGroup>
                    <BInputGroupText><i class="bi bi-globe"></i></BInputGroupText>
                    <BFormSelect v-model="contact.country">
                        <option disabled value="">Select a country</option>
                        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
                    </BFormSelect>
                </BInputGroup>
            </BFormGroup>

            <BFormGroup class="mb-3">
                <BInputGroup>
                    <BInputGroupText><i class="bi bi-image"></i></BInputGroupText>
                    <input type="file" class="form-control" @change="handleFileUpload">
                </BInputGroup>
                <div v-if="contact.image" class="mt-2 text-center">
                    <img :src="contact.image || defaultImage" alt="Preview" class="rounded-circle contact-image"
                        width="100">
                </div>
            </BFormGroup>

            <BButton type="submit" variant="warning" class="w-100"><i class="bi bi-save"></i> Update Contact</BButton>
        </BForm>
    </div>
</template>

<style scoped></style>
