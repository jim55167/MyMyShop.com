(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9829cfb2"],{1073:function(t,i,a){t.exports=a.p+"img/LIFESTYLE.141ac987.jpg"},"3d1f":function(t,i,a){t.exports=a.p+"img/LINEAPP.c00a0760.png"},"5d88":function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(i){t.isLoading=i}}}),t._m(0),e("div",{staticClass:"banner_open_shoppingcart"},[e("router-link",{attrs:{to:"/shopping_cart/front_cart_items"}},[e("span",{staticClass:"badge"},[t._v(t._s(t.cart.carts.length))]),e("img",{attrs:{alt:"購物車",src:a("688c")}})])],1),t._m(1),e("div",{staticClass:"row"},[e("div",{staticClass:"bg"},[e("div",{staticClass:"content"},[e("div",{staticClass:"h6 content-nav"},[e("div",{staticClass:"bt21"},[e("router-link",{attrs:{to:"/morestyle"}},[t._v(" MyMyShop COMFY AND STYLISH ")]),e("div",{staticClass:"btlist"},[e("tr",[t._v(" 商品分類： "),e("td",[e("a",{staticClass:"nav-linl",class:{active:"全部商品"==t.visibility},attrs:{href:"#"},on:{click:function(i){i.preventDefault(),t.visibility="全部商品"}}},[t._v("全部商品")])]),e("td",[e("a",{staticClass:"nav-linl",class:{active:"上衣"==t.visibility},attrs:{href:"#"},on:{click:function(i){i.preventDefault(),t.visibility="上衣"}}},[t._v("上衣")])]),e("td",[e("a",{staticClass:"nav-linl",class:{active:"長褲"==t.visibility},attrs:{href:"#"},on:{click:function(i){i.preventDefault(),t.visibility="長褲"}}},[t._v("長褲")])]),e("td",[e("a",{staticClass:"nav-linl",class:{active:"外套"==t.visibility},attrs:{href:"#"},on:{click:function(i){i.preventDefault(),t.visibility="外套"}}},[t._v("外套")])]),e("td",[e("a",{staticClass:"nav-linl",class:{active:"洋裝"==t.visibility},attrs:{href:"#"},on:{click:function(i){i.preventDefault(),t.visibility="洋裝"}}},[t._v("洋裝")])])])])],1)]),e("ul",{staticClass:"girl clearfix"},t._l(t.categoryData.slice(t.pageStart,t.pageStart+t.countPage),(function(i,a){return e("li",{key:a},[e("a",{attrs:{href:"#",target:"_parent"},on:{click:function(a){return a.preventDefault(),t.getProduct(i.id)}}},[e("div",{staticClass:"bodycard",style:{backgroundImage:"url("+i.imageUrl+")"}}),e("div",{staticClass:"overlay-girl"},[e("h1",[t._v(t._s(i.title))]),e("div",{staticClass:"align-items-baseline"},[i.price?e("del",{staticClass:"h6"},[t._v("原價 "+t._s(t._f("currency")(i.origin_price))+" 元")]):t._e(),i.price?e("div",{staticClass:"h5"},[t._v(" 優惠價 "+t._s(t._f("currency")(i.price))+" 元 ")]):t._e()])])])])})),0)])])]),e("div",{staticClass:"page-box"},[e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination"},[e("li",{staticClass:"page-item",class:{disabled:1===t.current_page}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(i){return i.preventDefault(),t.getPage(t.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.totalPage,(function(i){return e("li",{key:i,staticClass:"page-item",class:{active:t.current_page===i}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.getPage(i)}}},[t._v(t._s(i))])])})),e("li",{staticClass:"page-item",class:{disabled:t.current_page===t.totalPage}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(i){return i.preventDefault(),t.getPage(t.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])]),e("GoTop")],1)},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"banner_open_line"},[e("a",{attrs:{href:"https://line.me/ti/p/dKAzJfqWhb"}},[e("img",{attrs:{alt:"line",src:a("3d1f")}})])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"swiper-slide games"},[e("img",{attrs:{src:a("1073"),alt:"Banner"}})])}],n=(a("99af"),a("4de4"),a("4160"),a("c975"),a("159b"),a("c12c")),c=a("1157"),r=a.n(c),l={data:function(){return{products:[],current_page:1,countPage:6,lifestyle:[],visibility:"全部商品"}},methods:{getAllProducts:function(){var t=this,i="".concat("https://vue-course-api.hexschool.io","/api/").concat("jim55167","/products/all");this.$store.dispatch("updateLoading",!0),this.$http.get(i).then((function(i){t.products=i.data.products,t.$store.dispatch("updateLoading",!1);var a=t.products.filter((function(t){return-1!==t.category.indexOf("lifestyle")}));t.lifestyle=a}))},getProduct:function(t){var i=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("jim55167","/product/").concat(t);this.$store.dispatch("updateLoading",!0),localStorage.setItem("filteredList",JSON.stringify(this.products)),this.$http.get(a).then((function(t){t.data.success&&(i.$store.dispatch("updateLoading",!1),i.$router.push("../front_single_product/".concat(t.data.product.id)))}))},getPage:function(t){r()("html, body").animate({scrollTop:0},600),t<=0||t>this.totalPage||(this.current_page=t)},getCart:function(){this.$store.dispatch("getCart")}},computed:{isLoading:function(){return this.$store.state.isLoading},cart:function(){return this.$store.state.cart},pageStart:function(){return(this.current_page-1)*this.countPage},totalPage:function(){return Math.ceil(this.categoryData.length/this.countPage)},categoryData:function(){var t=[];if("全部商品"===this.visibility)t=this.lifestyle;else if("上衣"===this.visibility){var i=[];this.lifestyle.forEach((function(t){"lifestyle/上衣"===t.category&&i.push(t)})),t=i}else if("長褲"===this.visibility){var a=[];this.lifestyle.forEach((function(t){"lifestyle/長褲"===t.category&&a.push(t)})),t=a}else if("外套"===this.visibility){var e=[];this.lifestyle.forEach((function(t){"lifestyle/外套"===t.category&&e.push(t)})),t=e}else if("洋裝"===this.visibility){var s=[];this.lifestyle.forEach((function(t){"lifestyle/洋裝"===t.category&&s.push(t)})),t=s}return t}},created:function(){this.getAllProducts()},components:{GoTop:n["a"]}},o=l,u=a("2877"),f=Object(u["a"])(o,e,s,!1,null,null,null);i["default"]=f.exports},"688c":function(t,i,a){t.exports=a.p+"img/shoppingCart.a5f583f3.jpg"},c12c:function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("div",{staticClass:"goTop",class:{btnFlag:t.btnFlag},on:{click:function(i){return i.preventDefault(),t.goTop(i)}}})])},s=[],n={name:"GoTop",data:function(){return{btnFlag:!0}},methods:{goTop:function(){window.scrollTo({top:0,behavior:"smooth"})}},mounted:function(){var t=this;document.body.onscroll=function(){document.documentElement.scrollTop>200?t.btnFlag=!0:t.btnFlag=!1}}},c=n,r=a("2877"),l=Object(r["a"])(c,e,s,!1,null,null,null);i["a"]=l.exports},c975:function(t,i,a){"use strict";var e=a("23e7"),s=a("4d64").indexOf,n=a("a640"),c=a("ae40"),r=[].indexOf,l=!!r&&1/[1].indexOf(1,-0)<0,o=n("indexOf"),u=c("indexOf",{ACCESSORS:!0,1:0});e({target:"Array",proto:!0,forced:l||!o||!u},{indexOf:function(t){return l?r.apply(this,arguments)||0:s(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-9829cfb2.044aacd7.js.map