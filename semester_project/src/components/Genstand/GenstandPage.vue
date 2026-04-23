<script>
import GenstandCard from './GenstandCard.vue'
import GenstandDetail from './GenstandDetail.vue'
import GenstandFilter from './GenstandFilter.vue'
import { getAllItems } from '@/services/itemservice.js'

export default {
    name: 'GenstandPage',
    components: {
        GenstandCard,
        GenstandDetail,
        GenstandFilter
    },
    data() {
        return {
            selectedItem: null,
            activeFilter: 'Alle',
            items: [],
            loading: false,
            error: null
        }
    },
    props: {
    },
    computed: {
        // Filtrerer genstande baseret på aktivt filter
        // Hvis Alle er valgt vises alle genstande
        filteredItems() {
            if (this.activeFilter === 'Alle') return this.items
            return this.items.filter(item =>
                item.status === this.activeFilter
            )
        }
    },
    methods: {
        async fetchItems() {
            this.loading = true
            try {
                const data = await getAllItems()
                // Map API data til det format komponenterne forventer
                this.items = data.map(item => ({
                    id: item.ItemID,
                    title: item.ItemName,
                    category: item.CategoryID,
                    brand: item.Brand,
                    status: item.IsActive ? 'Tilgængelig' : 'Inaktiv',
                    image: item.images?.[0]?.ImageURL || 'https://placehold.co/64x64',
                    condition: item.Condition,
                    maxDays: item.MaxRentPeriodDays,
                    accessories: item.accessories?.map(a => a.AccessoryName).join(', ') || null,
                    totalLoans: 0,
                    activeLoans: 0,
                    rating: null
                }))
            } catch (err) {
                this.error = 'Kunne ikke hente genstande. Prøv igen.'
                console.error('Fejl ved hentning af genstande:', err)
            } finally {
                this.loading = false
            }
        },
        visDetaljer(id) {
            this.selectedItem = this.items.find(item => item.id === id)
        }
    },
    mounted() {
        // Hent genstande når komponenten er klar
        this.fetchItems()
    },

    watch: {
    },
    emits: []
}
</script>

<template>
    <main class="page">

        <!-- Vis detaljesiden når en genstand er valgt -->
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

        <!-- Liste visning - skjules når en genstand er valgt -->
        <section v-else>

            <!-- Sidetitel -->
            <h1 class="page-title">Dine genstande</h1>

            <!-- Filter tabs - activeFilter opdateres når brugeren klikker -->
            <GenstandFilter
                :activeFilter="activeFilter"
                @filterChanged="activeFilter = $event"
            />
            <!--- Loading state -->
            <p v-if="loading" class="loading-state" aria-live="polite">
                <v-progress-circular indeterminate color="primary" />
            </p>

            <!-- Error state -->
            <p v-else-if="error" class="error-text" role="alert">{{ error }}</p>

            <!-- Liste af filtrerede kort -->
            <ul v-else class="card-list">
                <li v-for="item in filteredItems" :key="item.id">
                    <GenstandCard
                        :id="item.id"
                        :title="item.title"
                        :category="item.category"
                        :brand="item.brand"
                        :status="item.status"
                        :image="item.image"
                        @cardClicked="visDetaljer"
                    />
                </li>
            </ul>

            <!-- Vises når ingen genstande matcher det valgte filter -->
            <p
                v-if="filteredItems.length === 0"
                class="ingen-resultater"
                role="status"
                aria-live="polite"
            >
                Ingen genstande matcher det valgte filter
            </p>

        </section>

        <footer class="opret-knap-wrapper">
            <v-btn
                color="primary"
                rounded="lg"
                class="opret-knap"
                @click="$emit('go-to-page-one')"
            >
                Opret ny genstand
            </v-btn>
        </footer>

    </main>
</template>

<style scoped>

/* Sidebaggrund - varm off-white som fylder hele skærmen */
.page {
    background: var(--color-bg);
    min-height: 100vh;
    padding: var(--space-6) var(--space-4);
}

/* Sidetitel */
.page-title {
    font-family: var(--font-display);
    font-size: var(--text-h1);
    font-weight: 600;
    color: var(--color-neutral);
    margin-bottom: var(--space-4);
    text-align: center;
}

/* Kort stablet lodret med mellemrum imellem */
.card-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    list-style: none;
    padding: 0;
    margin: 0;
}

/* Besked når ingen genstande matcher filteret */
.ingen-resultater {
    font-family: var(--font-body);
    font-size: var(--text-label);
    color: var(--color-secondary);
    text-align: center;
    margin-top: var(--space-8);
}
.opret-knap-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  border-top: 1px solid var(--color-border);
}

.opret-knap {
  width: 100%;
  height: 48px !important;
  text-transform: none;
}

.page {
  background: var(--color-bg);
  min-height: 100vh;
  padding: var(--space-6) var(--space-4);
  padding-bottom: 90px;
}
.loading-state {
    text-align: center;
    margin-top: var(--space-8);
}

.error-text {
    color: red;
    font-family: var(--font-body);
    font-size: var(--text-label);
    text-align: center;
    margin-top: var(--space-8);
}
</style>