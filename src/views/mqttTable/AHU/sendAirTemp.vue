<template>
  <check-connected>
    <Card class="margin-10" slot>
      <Tabs>
          <TabPane label="AHU1" icon="logo-apple">
            
          </TabPane>
          <TabPane label="AHU2" icon="logo-windows">
            
          </TabPane>
      </Tabs>
    </Card>
  </check-connected>
</template>

<script>
import checkConnected from '_c/checkConnected'
export default {
  name:'sendAirTemp',
  components:{
    checkConnected
  },
  data(){
    return{
    }
  },
  computed:{
    
  },
  watch:{
    
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>

<style lang="less">
.margin-10{
  margin: 10px;
}
</style>
