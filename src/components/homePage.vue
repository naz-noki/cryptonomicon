<template>
  <div class="homePage" v-if="loading">
    <addTicker />
    <listTicker />
  </div>
  <div v-else
    :class="{loadingPage: !loading}"
    style="padding-top:100.000%;position:relative;"><iframe src="https://gifer.com/embed/ZC9Y" width="100px" height="100px" style='position:absolute;top:400px;left:900px;' frameBorder="0">
  </iframe></div>
</template>

<script>
import addTicker from './addTicker.vue'
import listTicker from './listTicker.vue'

export default{
  components:{
    addTicker, listTicker
  },

  data(){
    return{
      loading: false,
    }
  },

  created(){
    setTimeout(()=>{
      this.loading = true;
    },1000);
  },
}    
</script>

<style>
.homePage{
  width: 1440px;
  height: max-content;
  padding-top: 21px;
  margin: 0 auto;
}
.loadingPage{
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>