<template>
  <div class="websocket-wrapper">
    <Row class="connect-wrapper margin-top-20">
      <i-col>
        <Card title="WeSocket连接">
          <Row type="flex" justify="space-between" :gutter='24'>
            <i-col :xs="24" :sm="24" :md="24" :lg="12">
              <Row class="server-wrapper">
                <i-col>
                  <div class="host-wrapper">
                    <p><span class="bold">Post：</span><i-input class="input-content" v-model="host"></i-input></p>
                    
                  </div>
                  <div class="port-wrapper">
                    <p><span class="bold">Port：</span><i-input v-model="port"></i-input></p>
                  </div>
                  <div class="cleanSession-wrapper">
                    <p>
                      <span class="bold">CleanSession：</span>
                      <i-switch  :value='cleanSession'  class="margin-5" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                      </i-switch>
                    </p>
                  </div>
                  <div class="SSL-wrapper">
                    <p>
                      <span class="bold">SSL：</span>
                      <i-switch  :value='SSLValue'  class="margin-5" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                      </i-switch>
                    </p>
                  </div>
                  <div class="connect-button-content">
                    <ButtonGroup class="margin-top-10">
                      <i-button type="success" :disabled='disabled' class="margin-5">连接</i-button>
                      <i-button type="error" :disabled='!disabled' class="margin-5">断开连接</i-button>
                        
                    </ButtonGroup>
                  </div>
                </i-col>
              </Row>
            </i-col>
            <i-col :xs="24" :sm="24" :md="24" :lg="12">
              <div class="info-wrapper">
                <i-input class="margin-10">
                  <span slot="prepend" class="bold">Client Id</span>
                </i-input>
                <i-input class="margin-10">
                  <span slot="prepend" class="bold">userName</span>
                </i-input>
                <i-input class="margin-10">
                  <span slot="prepend" class="bold">password</span>
                </i-input>
              </div>
            </i-col>
          </Row>
        </Card>
      </i-col>
    </Row>
    <Row class="sub_pub-wrapper margin-top-20" type="flex" justify="space-between" :gutter='24'>
      <i-col :xs="24" :sm="24" :md="24" :lg="12">
        <Row class="sub-wrapper">
          <i-col>
            <Card title="订阅主题">
              //
            </Card>
          </i-col>
        </Row>
      </i-col>
      <i-col :xs="24" :sm="24" :md="24" :lg="12">
        <Row class="pub-wrapper">
          <i-col>
            <Card title="发布主题">
              //
            </Card>
          </i-col>
        </Row>
      </i-col>
    </Row>
    <Row class="outLog-wrapper margin-top-20">
      <i-col>
        <Card title="Log日志输出">
          //
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name:'WebSocket',
  data(){
    return{
      host,
      port,
      disabled:false,
      cleanSession:true,
      SSLValue
    }
  }
}
</script>

<style lang="less">
.websocket-wrapper{
  .connect-wrapper{
    .ivu-card-head{
      background-color: #DFF0DD;
      
    }
  }
  .sub_pub-wrapper{
    .sub-wrapper{
      .ivu-card-head{
        background-color: #DEE8F2;
      }
    }
    .pub-wrapper{
      .ivu-card-head{
        background-color: #F2DEED;
      }
    }
  }
  .outLog-wrapper{
    .ivu-card-head{
      background-color: #F2DEE1;
    }
  }
}
.input-content{
  display: inline;
  }
.server-wrapper{
  .host-wrapper{}
  .port-wrapper{
    margin-top: 20px;
  }
  .cleanSession-wrapper{
    margin-top: 20px;
  }
}
.info-wrapper{
  .ivu-input-group-prepend{
    padding: 0 12px;
  }
}
.margin-top-20{
  margin-top: 20px;
}
.margin-top-10{
  margin-top: 10px;
}
.margin-5{
  margin: 5px;
}
.margin-5{
  margin: 10px;
}
.bold{
  font-weight: bold;
}
.padding-5{
  padding: 5px; 
}
</style>
