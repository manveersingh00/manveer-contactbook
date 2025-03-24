<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { BButton, BCard, BRow, BCol, BFormInput } from 'bootstrap-vue-next';

const router = useRouter();
const contacts = ref([]);
const searchQuery = ref('');

onMounted(() => {
    contacts.value = JSON.parse(localStorage.getItem('contacts')) || [];
});

const handleSearchResult = computed(() => {
    return contacts.value
        .filter(contact =>
            `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
});

const handleDetailPath = (id) => {
    router.push(`/contact/${id}`);
};

const handleAddNewPath = () => {
    router.push('/add');
};

const handleEditPath = (id) => {
    router.push(`/edit/${id}`);
};

const handleDelete = (id) => {
    contacts.value = contacts.value.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
};
</script>
<template>
    <div class="main-container">
        <div class="header">
            <h2 class="title mb-3">Contact Book</h2>
            <BFormInput v-model="searchQuery" placeholder="Search contacts..." class="search-bar mb-3" />
        </div>

        <div class="contact-list">
            <BRow>
                <BCol v-for="contact in handleSearchResult" :key="contact.id" cols="12" md="6" lg="4">
                    <BCard class="contact-card" @click="handleDetailPath(contact.id)">
                        <div class="d-flex align-items-center">
                            <img :src="contact.image || '/default-avatar.png'" class="contact-img" />
                            <div class="contact-info">
                                <h5 class="mb-1 name">{{ contact.firstName }} {{ contact.lastName }}</h5>
                                <p class="phone"><i class="bi bi-telephone-fill"></i> {{ contact.phone }}</p>
                                <p class="country"><i class="bi bi-globe"></i> {{ contact.country }}</p>
                                <div class="button-group">
                                    <BButton size="sm" variant="warning" @click.stop="handleEditPath(contact.id)">
                                        <i class="bi bi-pencil"></i> Edit
                                    </BButton>
                                    <BButton size="sm" class="ms-2" variant="danger"
                                        @click.stop="handleDelete(contact.id)">
                                        <i class="bi bi-trash"></i> Delete
                                    </BButton>
                                </div>
                            </div>
                        </div>
                    </BCard>
                </BCol>
            </BRow>
        </div>

        <BButton variant="light" class="add-contact-btn" @click="handleAddNewPath">
            <i class="bi bi-plus-lg add-icon"></i>
        </BButton>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
    font-weight: bold;
}

.search-bar {
    max-width: 400px;
    margin: 0 auto 20px;
    padding: 12px;
    border-radius: 25px;
    border: 2px solid #ffffff;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    text-align: center;
}

.search-bar::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.contact-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 15px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    color: white;
    backdrop-filter: blur(10px);
}

.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.contact-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
    border: 3px solid #ffcc00;
}

.contact-info {
    flex-grow: 1;
    text-align: left;
}

.name {
    font-size: 18px;
    font-weight: bold;
}

.phone,
.country {
    font-size: 14px;
    color: white;
}

.button-group {
    margin-top: 10px;
}

.button-group .btn {
    font-size: 13px;
    padding: 5px 10px;
}

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
