<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="banner_open_line">
      <a href="https://line.me/ti/p/dKAzJfqWhb"
        ><img alt="line" src="~@/assets/calendar/LINEAPP.png"
      /></a>
    </div>
    <div class="banner_open_shoppingcart">
      <router-link to="/shopping_cart/front_cart_items">
        <span class="badge">{{ cart.carts.length }}</span>
        <img alt="購物車" src="~@/assets/calendar/shoppingCart.jpg" />
      </router-link>
    </div>
    <div class="swiper-slide games">
      <img
        src="~@/assets/calendar/NORMCORE.jpg"
        alt="Banner"
      />
    </div>

    <div class="row">
      <div class="bg">
        <div class="content">
          <div class="h6 content-nav">
            <div class="bt21">
              <router-link to="/morestyle">
                Normcore 新風格支線
              </router-link>
              <div class="btlist">
                <tr>
                  商品分類：
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '全部商品' }"
                      @click.prevent="visibility = '全部商品'"
                      >全部商品</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '上衣' }"
                      @click.prevent="visibility = '上衣'"
                      >上衣</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '長褲' }"
                      @click.prevent="visibility = '長褲'"
                      >長褲</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '外套' }"
                      @click.prevent="visibility = '外套'"
                      >外套</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '洋裝' }"
                      @click.prevent="visibility = '洋裝'"
                      >洋裝</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '襯衫' }"
                      @click.prevent="visibility = '襯衫'"
                      >襯衫</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '背心' }"
                      @click.prevent="visibility = '背心'"
                      >背心</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '吊帶褲' }"
                      @click.prevent="visibility = '吊帶褲'"
                      >吊帶褲</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '穿搭配件' }"
                      @click.prevent="visibility = '穿搭配件'"
                      >穿搭配件</a
                    >
                  </td>
                </tr>
              </div>
            </div>
          </div>
          <ul class="girl clearfix">
            <li
              v-for="(item, key) in categoryData.slice(
                pageStart,
                pageStart + countPage
              )"
              :key="key"
            >
              <a href="#" @click.prevent="getProduct(item.id)" target="_parent">
                <div
                  class="bodycard"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                ></div>
                <div class="overlay-girl">
                  <h1>{{ item.title }}</h1>
                  <div class="align-items-baseline">
                    <del class="h6" v-if="item.price"
                      >原價 {{ item.origin_price | currency }} 元</del
                    >
                    <div class="h5" v-if="item.price">
                      優惠價 {{ item.price | currency }} 元
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- bootstrap pagination -->
    <div class="page-box">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: current_page === 1 }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="getPage(current_page - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in totalPage"
            :key="page"
            :class="{ active: current_page === page }"
          >
            <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: current_page === totalPage }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="getPage(current_page + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <GoTop></GoTop>
  </div>
</template>

<script>

import GoTop from '@/components/GoTop'
import $ from 'jquery'

export default {
  data () {
    return {
      current_page: 1,
      countPage: 6,
      normcore: [],
      visibility: '全部商品',
      products: []
    }
  },
  methods: {
    getAllProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        this.products = response.data.products
        this.$store.dispatch('updateLoading', false)
        const NormcoreProducts = this.products.filter((item) => {
          return item.category.indexOf('normcore') !== -1
        })
        this.normcore = NormcoreProducts
      })
    },
    getProduct (id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$store.dispatch('updateLoading', true)
      localStorage.setItem('filteredList', JSON.stringify(this.products))
      this.$http.get(url).then(response => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading', false)
          this.$router.push(
            `../front_single_product/${response.data.product.id}`
          )
        }
      })
    },
    getPage (page) {
      $('html, body').animate({ scrollTop: 0 }, 600)
      if (page <= 0 || page > this.totalPage) {
        return
      }
      this.current_page = page
    },
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    cart () {
      return this.$store.state.cart
    },
    pageStart () {
      return (this.current_page - 1) * this.countPage
    },
    totalPage () {
      return Math.ceil(this.categoryData.length / this.countPage)
    },
    categoryData () {
      let data = []
      if (this.visibility === '全部商品') {
        data = this.normcore
      } else if (this.visibility === '上衣') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/上衣') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === '長褲') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/長褲') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === '外套') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/外套') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === '背心') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/背心') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === '吊帶褲') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/吊帶褲') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === '穿搭配件') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/穿搭配件') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === '襯衫') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/襯衫') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === '洋裝') {
        const categoryList = []
        this.normcore.forEach((item) => {
          if (item.category === 'normcore/洋裝') {
            categoryList.push(item)
          }
        })
        data = categoryList
      }
      return data
    }
  },
  created () {
    this.getAllProducts()
  },
  components: {
    GoTop
  }
}
</script>
