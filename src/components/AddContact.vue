<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { BForm, BFormInput, BFormSelect, BButton, BInputGroup, BInputGroupText } from 'bootstrap-vue-next';

const router = useRouter();
const firstName = ref('');
const lastName = ref('');
const phone = ref('');
const email = ref('');
const country = ref('');
const image = ref(null);
const countries = ['USA', 'Canada', 'UK', 'India', 'Australia'];
const defaultImage = '/default-avatar.png';

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            image.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

const handleValidateForm = () => {
    if (!firstName.value || !lastName.value || !phone.value || !email.value || !country.value) {
        alert('All fields are required except the image.');
        return false;
    }
    return true;
};

const handleAddNewContact = () => {
    if (!handleValidateForm()) return;

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const newContact = {
        id: crypto.randomUUID(),
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        email: email.value,
        country: country.value,
        image: image.value || defaultImage
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    router.push('/');
};

const handleBackPath = () => {
    router.push('/');
};

</script>

<template>
    <div class="main-container">
        <h2 class="mb-4 title"><i class="bi bi-person-plus-fill"></i> Add Contact</h2>

        <BForm @submit.prevent="handleAddNewContact" class="w-50 mx-auto shadow p-4 rounded bg-light">

            <BInputGroup class="mb-3">
                <BInputGroupText><i class="bi bi-person"></i></BInputGroupText>
                <BFormInput v-model="firstName" placeholder="First name" />
            </BInputGroup>

            <BInputGroup class="mb-3">
                <BInputGroupText><i class="bi bi-person"></i></BInputGroupText>
                <BFormInput v-model="lastName" placeholder="Last name" />
            </BInputGroup>

            <BInputGroup class="mb-3">
                <BInputGroupText><i class="bi bi-telephone"></i></BInputGroupText>
                <BFormInput v-model="phone" placeholder="Phone number" />
            </BInputGroup>

            <!-- New Email Field -->
            <BInputGroup class="mb-3">
                <BInputGroupText><i class="bi bi-envelope-fill"></i></BInputGroupText>
                <BFormInput v-model="email" type="email" placeholder="Email" />
            </BInputGroup>

            <BInputGroup class="mb-3">
                <BInputGroupText><i class="bi bi-globe"></i></BInputGroupText>
                <BFormSelect v-model="country">
                    <option disabled value="">Select a country</option>
                    <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
                </BFormSelect>
            </BInputGroup>

            <BInputGroup class="mb-3">
                <BInputGroupText><i class="bi bi-image"></i></BInputGroupText>
                <input type="file" class="form-control" @change="handleFileUpload">
            </BInputGroup>

            <div v-if="image" class="mt-2 text-center">
                <img :src="image" alt="Preview" class="rounded-circle border contact-image" width="100">
            </div>

            <BButton type="submit" variant="success" class="w-100 mt-3"><i class="bi bi-save"></i> Save Contact
            </BButton>
        </BForm>
        <BButton variant="light" class="add-contact-btn" @click="handleBackPath">
            <i class="bi bi-arrow-left add-icon"></i>
        </BButton>
    </div>
</template>

<style scoped>
.add-contact-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 50%;
    background: #ffcc00;
    color: #1e3c72;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-contact-btn:hover {
    background: #ffdd33;
    color: #1e3c72;
}

.add-icon {
    font-size: 28px;
    font-weight: 700;
    color: white;
}
</style>
