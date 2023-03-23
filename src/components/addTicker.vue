<template>
    <form class="addTicker__form">
        <div class="addTicker__title">Тикер</div>
        <input 
            v-model="tickerName"
            type="text" 
            class="addTicker__inp" 
            placeholder="Введите ваш тикер">
        <div 
            v-if="err"
            class="addTicker__error"
            >Тикер с таким названием уже добавлен.</div>
        <button class="addTicker__btn" @click="addNewTicker">
            <div class="addTicker__btnPl">+</div>
            Добавить
        </button>
    </form>
</template>

<script>
export default{
    data(){
        return{
            tickerName: '',
            err: null,
        }
    },

    computed:{
        Tickers(){
            return this.$store.getters.getTickers
        },
    },  

    methods:{
        addNewTicker(){
            if(this.Tickers.find(t => t.name == this.tickerName.toUpperCase())){
                this.err = true;
            } else if(this.tickerName!=''){
                    const NewTicker = {
                    name: this.tickerName.toUpperCase(),
                    price: '-'
                };

                this.Tickers.push(NewTicker);

                setInterval(async()=>{
                    const f = await fetch (
                        `https://min-api.cryptocompare.com/data/price?fsym=${NewTicker.name}&tsyms=USD&api_key=35da9492a5a96a09ba0b1e010f56910b8382e78eac418f9a904df889b527e735`
                    );
                    const data = await f.json();
                    this.Tickers.find(t => t.name == NewTicker.name).price = data.USD > 1 ? data.USD.toFixed(2) : data.USD; 
                },5000);

                this.err = null;
                this.tickerName = '';
            }
        }
    },
}
</script>