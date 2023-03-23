<template>
    <div class="alertPopup" @click="closePopup">
    <div class="popup" @click.stop>
        <button
            @click="closePopup"
            >X</button>
        Тут явно написан какой-то текст... Тут явно написан какой-то текст... Тут явно написан какой-то текст... Тут явно написан какой-то текст... Тут явно написан какой-то текст... Тут явно написан какой-то текст... Тут явно написан какой-то текст... Тут явно написан какой-то текст... Тут явно написан какой-то текст... 
        <input 
            :placeholder="confirmation__text"
            v-model="confirmation"
            type="text">
        <button
            :disabled="confirmPopup"
            @click="confirmPopup"
            >Click</button>
        <slot name="popupSlot"></slot>   
    </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            confirmation: "",
            confirmation__text: 'ПОДТВЕРЖДАЮ',
        }
    },
    methods:{
        confirmPopup(){
            this.confirmation == this.confirmation__text
        }
    }
}
</script>

<style>
.alertPopup{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(59, 59, 59, 0.548);
}
.popup{
    width: 500px;
    height: 200px;
    background-color: aliceblue;
    border-radius: 25px;
    margin: 0 auto;
    margin-top: 300px;
}
</style>