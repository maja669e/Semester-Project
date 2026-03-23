<script>
import GenstandCard from './GenstandCard.vue'
import GenstandDetail from './GenstandDetail.vue'

export default {
    name: 'GenstandPage',
    components: {
        GenstandCard,
        GenstandDetail
    },
    data() {
        return {
            // Holder styr på hvilken genstand der er valgt
            selectedItem: null,
            // Mock-data - falske genstande til at teste kortet med
            items: [
                {
                    id: 1,
                    title: 'Boremaskine',
                    category: 'Elektronik',
                    brand: 'Bosch',
                    status: 'Tilgængelig',
                    image: 'https://placehold.co/64x64',
                    condition: 'Ny',
                    maxDays: 7,
                    accessories: 'Extra batteri, bits sæt, oplader',
                    totalLoans: 12,
                    activeLoans: 1,
                    rating: 4.9
                },
                {
                    id: 2,
                    title: 'Cykel',
                    category: 'Sport',
                    brand: null,
                    status: 'Udlånt',
                    image: 'https://placehold.co/64x64',
                    condition: 'Brugt',
                    maxDays: 3,
                    accessories: null,
                    totalLoans: 5,
                    activeLoans: 1,
                    rating: 4.2
                },
                {
                    id: 3,
                    title: 'Hammer',
                    category: 'Værktøj',
                    brand: 'Stanley',
                    status: 'Inaktiv',
                    image: 'https://placehold.co/64x64',
                    condition: 'Slidt',
                    maxDays: 1,
                    accessories: null,
                    totalLoans: 8,
                    activeLoans: 0,
                    rating: 3.8
                }
            ],
        }
    },
    props: {
    },
    computed: {
    },
    methods: {
        // Kaldes når et kort klikkes - finder den valgte genstand ud fra id
        visDetaljer(id) {
            this.selectedItem = this.items.find(item => item.id === id)
        }
    },
    watch: {
    },
    emits: [
    ]
}
</script>

<template>
    <main class="page">

        <!-- Vis detaljesiden og send alle oplysninger ind som props -->
        <GenstandDetail
            v-if="selectedItem"
            :title="selectedItem.title"
            :category="selectedItem.category"
            :brand="selectedItem.brand"
            :status="selectedItem.status"
            :image="selectedItem.image"
            :condition="selectedItem.condition"
            :maxDays="selectedItem.maxDays"
            :accessories="selectedItem.accessories"
            :totalLoans="selectedItem.totalLoans"
            :activeLoans="selectedItem.activeLoans"
            :rating="selectedItem.rating"
            @gåTilbage="selectedItem = null"
        />

        <!-- Liste af kort - skjules når en genstand er valgt -->
        <div v-else>
            <!-- Sidetitel -->
            <h1 class="page-title">Dine genstande</h1>

            <!-- Liste af kort -->
            <div class="card-list">
                <!-- Loop gennem genstande og vis et kort for hver -->
                <GenstandCard
                    v-for="item in items"
                    :key="item.id"
                    :id="item.id"
                    :title="item.title"
                    :category="item.category"
                    :brand="item.brand"
                    :status="item.status"
                    :image="item.image"
                    @cardClicked="visDetaljer"
                />
            </div>
        </div>

    </main>
</template>

<style scoped>

/* Sidebaggrund - varm off-white */
.page {
    background: #f5f3ef;
    min-height: 100vh;
    padding: 24px 16px;
}

/* Sidetitel */
.page-title {
    font-family: 'Newsreader', serif;
    font-size: 28px;
    font-weight: 600;
    color: #2d2b2a;
    margin-bottom: 24px;
    text-align: center;
}

/* Kort stablet lodret med mellemrum imellem */
.card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

</style>