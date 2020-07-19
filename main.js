Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ strikethrough: !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <!-- @ is a shortcut for v-on: -->
        <div
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)"
        >
        </div>

        <button
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock, strikethrough: !inStock }"
        >Add to Cart</button>        
      </div>
    </div>
  `,
  data: function() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green-onWhite.jpg',
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0,
        }
      ],
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title: function() {
      return this.brand + ' ' + this.product;
    },
    image: function() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock: function() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping: function () {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: [],
  },
  methods: {
    updateCart: function(id) {
      this.cart.push(id);
    }
  }
});