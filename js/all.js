const api_path = 'david777'
const apiUrl = 'https://vue3-course-api.hexschool.io/v2'

const { createApp } = Vue

import myModal from './modal.js'

const app = Vue.createApp({
    data() {
      return {
        products: [],
        tempProduct: {},
        carts: [],
        totalPrice: {},
        isLoading: false,
        states: {
          loadingItem: ''
        },
        form: {
            user: {
                name: '',
                email: '',
                tel: '',
                address: ''
            },
            message: ''
        }
      }
    },
    components: {
        myModal
    },
    methods: {
      getProducts (){
        this.isLoading = true
        const api = `${apiUrl}/api/${api_path}/products`
        axios.get(api).then((res) => {
            this.products = res.data.products
            this.isLoading = false
        })
      },
      getCarts () {
        const api = `${apiUrl}/api/${api_path}/cart`
        axios.get(api).then((res) => {
            this.carts = res.data.data.carts
            this.totalPrice = {
                final_total: res.data.data.final_total,
                total: res.data.data.total
            }
            console.log(this.carts);
        })
      },
      openModal (product) {
          this.tempProduct = product
        this.$refs.productModal.openModal()
      },
      hideModal () {
        this.$refs.productModal.hideModal()
      },
      delCart (cart) {
        this.states.loadingItem = cart.id
        const api = `${apiUrl}/api/${api_path}/cart/${cart.id}`
        axios.delete(api).then((res) => {
          this.getCarts()
        })
      },
      delAllCart () {
        const api = `${apiUrl}/api/${api_path}/carts`
        axios.delete(api).then((res) => {
          alert('已清空購物車')
          this.getCarts()
        }).catch((error) => {
            alert('購物車無資料')
        }) 
      },
      updateNum (cart, qty = 1) {
        this.states.loadingItem = cart.id
        const api = `${apiUrl}/api/${api_path}/cart/${cart.id}`
        const cartData = {
            product_id: cart.product_id,
            qty
        }
        axios.put(api, { data: cartData }).then((res) => {
            this.states.loadingItem = ''
            this.getCarts()
        })
      },
      addCart (product) {
        this.states.loadingItem = product.id
        const api = `${apiUrl}/api/${api_path}/cart`
        const cart = {
          product_id: product.id,
          qty: 1
        }
          axios.post(api, { data: cart }).then((res) => {
              alert('成功加入購物車')
              this.states.loadingItem = ''
              this.getCarts()
          })
      },
        updateCart (num, product) {
            const url = `${apiUrl}/api/${api_path}/cart`
            const cartData = {
                product_id: product.id,
                qty: num
            }
            axios.post(url, { data: cartData }).then((res) => {
                this.getCarts()
            })
      },
      sendOrder () {
        const api = `${apiUrl}/api/${api_path}/order`
        axios.post(api, { data: this.form }).then((res) => {
            console.log(res)
            alert('表單已送出')
            this.getCarts()
        }).catch((error) => {
            alert('購物車無產品')
        })
          this.$refs.form.resetForm()
      },
      isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        }
    },
    mounted() {
      this.getProducts()  
      this.getCarts()
    },
});

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    // validateOnInput: true, 
});
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.component('loading', VueLoading.Component)
app.mount('#app')