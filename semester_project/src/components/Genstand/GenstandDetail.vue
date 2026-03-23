<script>
export default {
    name: 'GenstandDetail',
    components: {
    },
    data() {
        return {
        }
    },
    props: {
        // Alle oplysninger om den valgte genstand
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            default: null
        },
        status: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        // Genstandens stand - viser hvor god stand genstanden er i
        condition: {
            type: String,
            default: null
        },
        // Maksimalt antal dage genstanden kan lånes
        maxDays: {
            type: Number,
            default: null
        },
        // Tilbehør til genstanden - kun vist hvis der er noget
        accessories: {
            type: String,
            default: null
        },
        // Statistik - kun synlig for ejeren
        totalLoans: {
            type: Number,
            default: 0
        },
        activeLoans: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: null
        },
    },
    computed: {
        // Returnerer den korrekte CSS-klasse baseret på status
        statusClass() {
            if (this.status === 'Tilgængelig') return 'status-tilgaengelig'
            if (this.status === 'Udlånt') return 'status-udlaant'
            if (this.status === 'Inaktiv') return 'status-inaktiv'
        },
        // Opdeler tilbehør string til en liste
        // fx "Extra batteri, bits sæt" bliver til ["Extra batteri", "bits sæt"]
        accessoriesList() {
            if (!this.accessories) return []
            return this.accessories.split(',').map(item => item.trim())
        }
    },
    methods: {
    },
    watch: {
    },
    emits: ['gåTilbage']
}
</script>

<template>
    <div class="detalje-side">

        <!-- Topbar med tilbage-knap og rediger-knap -->
        <header class="detalje-header">
            <!-- Tilbage-knap - sender gåTilbage event op til forælderen -->
            <button class="tilbage-knap" @click="$emit('gåTilbage')">
                ← Tilbage
            </button>
            <!-- Rediger-knap - funktionalitet laves af en anden i gruppen -->
            <button class="rediger-knap">
                ✏️ Rediger
            </button>
        </header>

        <!-- Stort billede med status tag i hjørnet -->
        <figure class="detalje-billede-wrapper">
            <img
                :src="image"
                :alt="`Billede af ${title}`"
                class="detalje-billede"
            />
            <!-- Status tag oven på billedet i nederste højre hjørne -->
            <span class="detalje-status" :class="statusClass">
                <span class="detalje-status-prik" aria-hidden="true"></span>
                {{ status }}
            </span>
        </figure>

        <!-- Genstandens informationer -->
        <section class="detalje-info">
            <!-- Titel på genstanden -->
            <h1 class="detalje-titel">{{ title }}</h1>
            <!-- Kategori, mærke og stand på samme linje -->
            <p class="detalje-meta">
                {{ category }}
                <span v-if="brand"> · {{ brand }}</span>
                <span v-if="condition"> · {{ condition }}</span>
            </p>
        </section>

        <!-- To informationsbokse - max låneperiode og tilbehør -->
        <section class="detalje-bokse" aria-label="Genstandsdetaljer">

            <!-- Max låneperiode boks - label øverst, stort tal i midten, enhed nederst -->
            <div class="detalje-boks">
                <span class="detalje-boks-label-top">Maks. lån</span>
                <span class="detalje-boks-tal">{{ maxDays }}</span>
                <span class="detalje-boks-enhed">dage</span>
            </div>

            <!-- Tilbehør boks - vises kun hvis der er tilbehør -->
            <div v-if="accessories" class="detalje-boks detalje-boks-tilbehoer">
                <!-- Ikon og overskrift side om side øverst i boksen -->
                <div class="detalje-boks-top">
                    <span class="detalje-boks-ikon" aria-hidden="true">📦</span>
                    <h3 class="detalje-boks-overskrift">Tilbehør</h3>
                </div>
                <!-- Hvert tilbehør vises som en chip -->
                <div class="detalje-chips">
                    <span
                        v-for="item in accessoriesList"
                        :key="item"
                        class="detalje-chip"
                    >
                        {{ item }}
                    </span>
                </div>
            </div>

        </section>

        <!-- Ejer sektion - viser hvem der ejer genstanden -->
        <section class="detalje-ejer" aria-label="Ejeroplysninger">
            <!-- Avatar cirkel med initialer - erstattes med rigtigt billede når login tilføjes -->
            <div class="detalje-ejer-avatar" aria-hidden="true">DG</div>
            <div class="detalje-ejer-info">
                <p class="detalje-ejer-navn">Din genstand</p>
                <p class="detalje-ejer-dato">Oprettet 12. marts 2026</p>
            </div>
            <!-- Status tag ved siden af ejer info -->
            <span class="detalje-ejer-status" :class="statusClass">
                <span class="detalje-status-prik" aria-hidden="true"></span>
                {{ status }}
            </span>
        </section>

        <!-- Statistik sektion - kun synlig for ejeren -->
        <section class="detalje-stats" aria-label="Statistik for din genstand">
            <!-- Lån i alt -->
            <div class="detalje-stat-boks">
                <span class="detalje-stat-tal">{{ totalLoans }}</span>
                <span class="detalje-stat-label">Lån i alt</span>
            </div>
            <!-- Aktive lån -->
            <div class="detalje-stat-boks">
                <span class="detalje-stat-tal">{{ activeLoans }}</span>
                <span class="detalje-stat-label">Aktive lån</span>
            </div>
            <!-- Vurdering med stjerne -->
            <div class="detalje-stat-boks">
                <span class="detalje-stat-tal">{{ rating }} ⭐</span>
                <span class="detalje-stat-label">Vurdering</span>
            </div>
        </section>

    </div>
</template>

<style scoped>

/* Hele detaljesiden - varm baggrund som fylder hele skærmen */
.detalje-side {
    background: #f5f3ef;
    min-height: 100vh;
    padding: 16px;
    box-sizing: border-box;
}

/* Topbar - tilbage og rediger knapper side om side */
.detalje-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

/* Tilbage-knap - gennemsigtig baggrund */
.tilbage-knap {
    background: transparent;
    color: #2d2b2a;
    border: none;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    padding: 12px 0;
    min-height: 44px;
}

/* Rediger-knap - grøn baggrund med hvid tekst */
.rediger-knap {
    background: #546a41;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    padding: 12px 20px;
    min-height: 44px;
}

/* Billedwrapper - position relative så status tag kan placeres i hjørnet */
.detalje-billede-wrapper {
    position: relative;
    margin: 0 0 20px 0;
    border-radius: 12px;
    overflow: hidden;
    background: #eae8e4;
}

/* Billedet fylder hele bredden */
.detalje-billede {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
}

/* Status tag placeret i nederste højre hjørne af billedet */
.detalje-status {
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Manrope', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 5px 11px;
    border-radius: 9999px;
    min-height: 32px;
}

/* Lille farvet prik ved siden af status teksten */
.detalje-status-prik {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
}

/* Tilgængelig - grøn */
.status-tilgaengelig {
    background: #e8f0e3;
    color: #2d4a1e;
}
.status-tilgaengelig .detalje-status-prik {
    background: #3d6b27;
}

/* Udlånt - orange */
.status-udlaant {
    background: #f7e8d8;
    color: #7a3810;
}
.status-udlaant .detalje-status-prik {
    background: #a84f1a;
}

/* Inaktiv - grå */
.status-inaktiv {
    background: #eceae8;
    color: #3a3836;
}
.status-inaktiv .detalje-status-prik {
    background: #5a5855;
}

/* Genstandens titel */
.detalje-titel {
    font-family: 'Newsreader', serif;
    font-size: 28px;
    font-weight: 600;
    color: #2d2b2a;
    margin: 0 0 6px 0;
}

/* Kategori, mærke og stand tekst */
.detalje-meta {
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    color: #6b6763;
    margin: 0 0 20px 0;
}

/* To bokse side om side */
.detalje-bokse {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: stretch;
}

/* Basis boks styling - centreret indhold */
.detalje-boks {
    flex: 1;
    background: #ffffff;
    border: 1px solid #d5d2ce;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-align: center;
}

/* Tilbehør boksen er dobbelt så bred og venstrestillet */
.detalje-boks-tilbehoer {
    flex: 2;
    align-items: flex-start;
    text-align: left;
    justify-content: flex-start;
}

/* Ikon og overskrift side om side øverst i boksen */
.detalje-boks-top {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

/* Ikon i boksen */
.detalje-boks-ikon {
    font-size: 18px;
    flex-shrink: 0;
}

/* Overskrift ved siden af ikonet */
.detalje-boks-overskrift {
    font-family: 'Manrope', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #6b6763;
    margin: 0;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Lille grå label øverst i max lån boksen */
.detalje-boks-label-top {
    font-family: 'Manrope', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #6b6763;
}

/* Stort tal i midten af max lån boksen */
.detalje-boks-tal {
    font-family: 'Manrope', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #2d2b2a;
    line-height: 1;
}

/* Lille enhed under tallet - fx "dage" */
.detalje-boks-enhed {
    font-family: 'Manrope', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #6b6763;
}

/* Chips wrapper - viser chips på samme linje */
.detalje-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

/* Hver chip - lille afrundet tag */
.detalje-chip {
    font-family: 'Manrope', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #2d2b2a;
    background: #f5f3ef;
    border: 1px solid #d5d2ce;
    border-radius: 9999px;
    padding: 4px 10px;
}

/* Ejer sektion - hvid boks med avatar */
.detalje-ejer {
    background: #ffffff;
    border: 1px solid #d5d2ce;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    margin-top: 4px;
}

/* Ejer avatar - grøn cirkel med initialer */
.detalje-ejer-avatar {
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    background: #546a41;
    color: #ffffff;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

/* Ejer navn og dato fylder den resterende plads */
.detalje-ejer-info {
    flex: 1;
    min-width: 0;
}

/* Ejer navn */
.detalje-ejer-navn {
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2d2b2a;
    margin: 0 0 2px 0;
}

/* Oprettelsesdato */
.detalje-ejer-dato {
    font-family: 'Manrope', sans-serif;
    font-size: 12px;
    color: #6b6763;
    margin: 0;
    white-space: nowrap;
}

/* Status tag i ejer sektionen - sidder i rækken ikke over billedet */
.detalje-ejer-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Manrope', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 5px 11px;
    border-radius: 9999px;
    min-height: 32px;
    flex-shrink: 0;
}

/* Statistik sektion - tre bokse side om side */
.detalje-stats {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
}

/* Hver statistik boks */
.detalje-stat-boks {
    flex: 1;
    background: #ffffff;
    border: 1px solid #d5d2ce;
    border-radius: 12px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
}

/* Stort tal i statistik boksen */
.detalje-stat-tal {
    font-family: 'Manrope', sans-serif;
    font-size: 22px;
    font-weight: 600;
    color: #2d2b2a;
}

/* Label under tallet */
.detalje-stat-label {
    font-family: 'Manrope', sans-serif;
    font-size: 12px;
    color: #6b6763;
}

</style>