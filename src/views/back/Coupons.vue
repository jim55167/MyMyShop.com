<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click.prevent="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary btn-sm" style="border-radius:0.2rem;"
              @click.prevent="openCouponModal(false, item)">編輯</button>
            <button type="button" class="btn btn-outline-danger btn-sm" style="border-radius:0.2rem;"
              @click.prevent="deleteCouponModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click.prevent="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete coupon modal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>DELETE COUPON</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            DELETE
            <strong class="text-danger">{{ tempCoupon.title }}</strong> ( COUPON CANNOT BE RESTORE AFTER DELETION )
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-third" data-dismiss="modal">CANCEL</button>
            <button type="button" class="btn btn-danger" @click.prevent="deleteCoupon">ACCEPT</button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @changePage="getCoupons"></Pagination>
  </div>
</template>

<script>

import $ from 'jquery'
import Pagination from '@/components/Pagination'

export default {
  props: {
    config: Object
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      due_date: new Date(),
      isNew: false,
      isLoading: false,
      pagination: {}
    }
  },
  watch: {
    due_date () {
      const timestamp = Math.floor(new Date(this.due_date) / 1000)
      this.tempCoupon.due_date = timestamp
    }
  },
  methods: {
    openCouponModal (isNew, item) {
      $('#couponModal').modal('show')
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {}
        this.isLoading = false
      } else {
        this.tempCoupon = { ...item }
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
        this.due_date = dateAndTime[0]
      }
    },
    getCoupons (page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.coupons = response.data.coupons
        this.pagination = response.data.pagination
        this.isLoading = false
      })
    },
    updateCoupon () {
      if (this.isNew) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
        this.$http.post(url, { data: this.tempCoupon }).then((response) => {
          $('#couponModal').modal('hide')
          this.getCoupons()
          this.isLoading = false
        })
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempCoupon.id}`
        this.due_date = new Date(this.tempCoupon.due_date * 1000)
        this.$http.put(url, { data: this.tempCoupon }).then((response) => {
          $('#couponModal').modal('hide')
          this.getCoupons()
          this.isLoading = false
        })
      }
    },
    deleteCouponModal (item) {
      $('#delCouponModal').modal('show')
      this.tempCoupon = item
    },
    deleteCoupon () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(url, {
        data: this.tempCoupon
      }).then((response) => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          this.getCoupons()
        }
      })
    }
  },
  created () {
    this.getCoupons()
  },
  components: {
    Pagination
  }
}
</script>
