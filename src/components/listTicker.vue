<template>
    <div class="tickers" v-if="Tickers.length">
        <div class="btn_page" >
            <button 
                v-if="page > 1"
                class="btn_page_minus"
                @click="--page"
                >Пред.</button>
            <button 
                v-if="hasNextPage"
                class="btn_page_plus"
                @click="++page"
                >След.</button>
            <input 
                type="text" 
                class="searchTicker" 
                v-model="inpSearchTicker" 
                @input="SearchTicker"
                placeholder="Фильтр">
        </div>        
        <div class="listTicker">
            <div 
                v-for="(ticker, idx) of SearchTicker()"
                :key="idx"
                @click="addSelectedTicker(ticker)" 
                :class="{
                            listTicker__itemSel: SelectedTicker == ticker,
                            listTicker__item: SelectedTicker != ticker
                        }"
                >
                    <div class="listTicker__title">{{ticker.name}} - USD</div>
                    <div class="listTicker__price">{{ticker.price}}</div>
                    <button class="listTicker__delete" @click.stop="DelTicker(idx)">
                        <img class="listTicker__del_img" src="../assets/img/listTicker__del_img.png" alt="">
                        Удалить 
                    </button>
            </div>
        </div>
    </div>
    <div v-if="SelectedTicker.name" class="listTicker__graph_block">
        <div class="listTicker__graph">
            <div 
                v-for="(bar, idx) of normalizeGraph()"
                :key="idx"
                class="listTicker__graph_item"
                :style="{height: `${bar}%`}"></div>
        </div>
        <button 
            @click="DelSelectedTicker"
            class="listTicker__graph_close"
            >X</button>
        <div class="listTicker__graph_title">{{SelectedTicker.name}} - USD</div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            inpSearchTicker: '',
            SelectedTicker : {},
            Graph: [],
            page: 1,
            hasNextPage: false,
            FilteredTickers: []
        }
    },

    computed:{
        Tickers(){
            return this.$store.getters.getTickers
        },
    },

    methods:{
        DelTicker(idx){
            this.$store.dispatch('actDelTicker', idx);
            this.SelectedTicker = {};
            this.Graph = [];
        },

        DelSelectedTicker(){
            this.SelectedTicker = {};
            this.Graph = [];
        },

        addSelectedTicker(ticker){
            this.SelectedTicker = ticker;
            if(this.SelectedTicker.name){
                this.Graph.length >0? this.Graph = [] : '';
                setInterval(async()=>{
                    
                        const f = await fetch (
                            `https://min-api.cryptocompare.com/data/price?fsym=${this.SelectedTicker.name}&tsyms=USD&api_key=35da9492a5a96a09ba0b1e010f56910b8382e78eac418f9a904df889b527e735`
                        );
                        const data = await f.json();
                        this.SelectedTicker.price = data.USD > 1 ? data.USD.toFixed(2) : data.USD; 
                        if(this.Graph.length > 30){
                            this.Graph.shift();
                            this.Graph.push(data.USD);
                        } else {
                            this.Graph.push(data.USD);
                        }
                    },5000);
            }
        },

        normalizeGraph(){
            const maxValue = Math.max(...this.Graph);
            const minValue = Math.min(...this.Graph);
            return this.Graph.map(
                price=>5+((price - minValue)*95) / (maxValue - minValue)
            )
        },

        SearchTicker(){
            const start = (this.page-1) *12;
            const end = this.page*12;
            
            this.FilteredTickers.length > end ? this.hasNextPage=true : this.hasNextPage=false;

            this.FilteredTickers = this.Tickers.filter(t => t.name.includes(this.inpSearchTicker.toUpperCase()));

            return this.FilteredTickers.slice(start, end);
        }
    },

    watch:{
        inpSearchTicker(){
            this.page = 1
        }
    }
}
</script>