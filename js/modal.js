export default {
    props: {
        product: {
            type: Object,
            default() { return {} }
        }
    },
    data () {
      return {
        myModal: null,
        tempProduct: {
        },
        tempProductNum: 1
      }
    },
    template: `<div class="modal fade" id="productModal" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" ref="productModal">
     <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>{{ tempProduct.title }}</span>
      </h5>
        <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6">
            <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
      </div>
          <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
            <p>商品描述：{{ tempProduct.description }}</p>
            <p>商品內容：{{ tempProduct.content  }}</p>
            <div class="h5" v-if="!tempProduct.price">{{ tempProduct.origin_price  }} 元</div>
            <del class="h6" v-if="tempProduct.price">原價 {{ tempProduct.origin_price }} 元</del>
            <div class="h5" v-if="tempProduct.price">現在只要 {{ tempProduct.price }} 元</div>
            <div>
              <div class="input-group">
                <input type="number" class="form-control"
                       min="1" v-model.number="this.tempProductNum">
                <button type="button" class="btn btn-primary" @click="addCartData(tempProduct)">加入購物車</button>
      </div>
      </div>
      </div>`,
    methods: {
      openModal () {
        this.tempProductNum = 1
        this.myModal.show()
      },
      hideModal () {
        this.myModal.hide()
      },
        addCartData(product) {
            this.$emit('updateData', this.tempProductNum, product)
            this.tempProductNum = 1
            this.myModal.hide()
      }
    },
    watch: {
        product() {
            this.tempProduct = this.product
        },
    },
    mounted() {
        this.myModal = new bootstrap.Modal(this.$refs.productModal)
    },
}
