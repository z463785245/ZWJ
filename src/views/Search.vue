<template>
  <div class="panel panel-default list-panel search-results">
      <div class="panel-heading">
          <h3 class="panel-title">
              <i class="fa fa-search"></i>
              关于 “<span class="highlight">{{ keyword }}</span>” 的搜索结果, 共 {{ results.length }} 条
              <!-- 排序方式列表 -->
              <div class="pull-right" style="margin-top:-10px;">
                  <button v-for="item in filters" 
                    :key="item.index" 
                    :disabled="item.filter === filter" 
                    class="btn btn-default btn-sm" 
                    href="javascript:;" 
                    @click="getArticlesByKeyword(keyword,item.filter)"
                  >
                    <i :class="`fa fa-${item.icon}`"></i>
                    {{item.title}}
                  </button>
              </div>
          </h3> 
      </div>
      <div class="panel-body">
          <div class="result" v-for="result in results" :key="result.index">
              <h2 class="title">
                  <router-link :to="`/articles/${result.articleId}/content`">
                    <span v-html="result.title"></span>
                  </router-link>
                  <small>by</small>
                  <router-link :to="`/${result.uname}`">
                    <img :src="result.uavatar" alt="" class="avatar avatar-small">
                    <small>{{result.uname}}</small>
                  </router-link>
              </h2>
              <div class="info">
                  <span class="url">
                      <router-link :to="`/articles/${result.articleId}/content`">
                        {{result.url}}
                      </router-link>
                  </span>
                  <span class="date">
                      {{result.date | moment('from', { startOf: 'minute' })}}
                        <i class="fa fa-thumbs-o-up"></i> {{ result.likeUsers && result.likeUsers.length || 0 }} ⋅
                        <i class="fa fa-comments-o"></i> {{ result.comments && result.comments.length || 0 }}
                  </span>
              </div>
              <div class="desc" v-html="result.content"></div>
              <hr>
          </div>
          <div class="empty-block" v-if="!results.length">
              没有任何数据~~
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Search',
    data () {
        return {
            keyword:'',//关键词
            results:[],//搜索结果
            filter:'default',//默认排序方式
            filters:[//排序方式列表
                {
                    filter: 'default',
                    title: '相关性排序',
                    icon: 'random'
                },
                {
                    filter: 'vote',
                    title: '点赞数排序',
                    icon: 'thumbs-up'
                }
            ]
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm =>{
            // 确认渲染该组件的对应路由时，获取搜索结果
            vm.getArticlesByKeyword(to.query.q)
        })
    },
    // 当前路由改变，该组件被复用时，获取搜索结果
    beforeRouteUpdate (to,from,next) {
        this.getArticlesByKeyword(to.query.q)
        next()
    },
    //// 离开该组件的对应路由时，清空搜索值
    beforeRouteLeave(to, from, next){
        this.$store.commit('UPDATE_SEARCH_VALUE', '')
        next()
    },
    methods: {
        // 使用关键字 keyword 获取搜索结果
        // 添加 filter 参数，以按指定方式排序
        getArticlesByKeyword(keyword,filter){
            if(keyword){
                this.keyword = keyword
                //更新排序方式
                if(filter) this.filter = filter
                // 需要提交事件类型，以更新搜索框的值
                this.$store.commit('UPDATE_SEARCH_VALUE',keyword) 
                // 传入 filter 参数
                this.results = this.$store.getters.getArticlesByKeyword(keyword,filter)
            }
        }
    }
}
</script>

<style scoped>
.result a:hover, .result a:focus { color: #d6514d; transition: color .15s ease;}
.panel-title .btn { margin-left: 5px;}
</style>