<template>
  <div>
    <div class="service-box">
      <div class="service-item">
        <div class="service">
          <p class="service_title">會員服務</p>
          <div class="question">
            <ul class="mtree" v-for="(item, index) in dataList" :key="index" @click="clickItem(index)">
              <li class="tree-node">
                <h1>{{ item.title }}</h1>
                <p v-show="index === limit">{{ item.test }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { id: 0, title: 'Q1 如何加入MyMyShop會員？', test: '點選網頁右上方會員登入按鈕，填寫基本資料後即可成為MyMy永久網路會員。' },
        { id: 1, title: 'Q2 缺貨商品會追加嗎？', test: '官網上顯示為缺貨的商品由於銷售季節及製作日程等考量，MyMyShop不一定會進行追加，建議您若有喜歡的款式請提早購買，避免錯過該項商品留下遺憾。' },
        { id: 2, title: 'Q3 完成結帳的訂單可以修改內容嗎？', test: '完成結帳的商品在包裹，出貨前若想進行修改或取消訂單，可至【會員中心】的【訂單查詢】中取消訂單；若您訂購的商品已經出貨完成，則該筆訂單就不能進行修改的動作。' },
        { id: 3, title: 'Q4 訂購商品幾天內可以到貨？', test: '完成訂購並付款成功後，商品將在3天內到貨。' },
        { id: 4, title: 'Q5 內衣褲可以申請退貨嗎？', test: '貼身衣物因衛生考量，售出後恕不提供退換貨服務。' }
      ],
      limit: -1
    }
  },
  methods: {
    clickItem (index) {
      if (index === this.limit) {
        this.limit = -1
      } else {
        this.limit = index
      }
    }
  }
}
</script>
