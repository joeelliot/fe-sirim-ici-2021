<template>
  <div>
    <div class="box1 box">
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; z-index: 1;">
        <!-- <span style="font-size: 32px; color: $color3; margin-bottom: 20px;">USD $9.99 per year</span>
        <el-button @click="subscribe" type="primary">Subscribe</el-button> -->
        <div class="priceContainer">
          <div class="sidePrice">
            <div class="sideHeader"></div>
            <div class="sideContainer">
              <p class="priceSlot grey side">Wranger Jeans</p>
              <p class="priceSlot white side">Wranger Jeans</p>
              <p class="priceSlot grey side">Wranger Jeans</p>
              <p class="priceSlot white side">Wranger Jeans</p>
              <p class="priceSlot grey side">Wranger Jeans</p>
              <p class="priceSlot white side">Wranger Jeans</p>
              <p class="priceSlot grey side">Wranger Jeans</p>
              <p class="priceSlot white side">Wranger Jeans</p>
              <p class="priceSlot grey side">Wranger Jeans</p>
            </div>
            <div class="sideFooter"></div>
          </div>
          <div class="contentPrice">
            <div class="contentGroup">
              <div class="sidePrice2">
                <div class="sideHeader"></div>
                <div class="sideContainer">
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                </div>
                <div class="sideFooter"></div>
              </div>
              <div class="contentColumn">
                <div class="contentHeader">
                  <h3 class="contentType">BASIC PLAN</h3>
                  <h2 class="contentTitle">Free</h2>
                  <span class="contentSub">No Charge</span>
                </div>
                <div class="contentBody">
                  <p class="priceSlot grey content">Schlitz single-origin</p>
                  <p class="priceSlot white content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">Feature</p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </p>
                  <p class="priceSlot grey content">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </p>
                  <p class="priceSlot white content">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </p>
                  <p class="priceSlot grey content">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </p>
                </div>
                <div class="contentFooter">
                  <!-- <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Button
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button> -->
                  <el-button class="contentSubscribe" type="primary">Subscribe</el-button>
                  <p class="contentFooterSub">Sponsored by Wrangler Jeans</p>
                </div>
              </div>
            </div>
            <div class="contentGroup">
              <div class="sidePrice2">
                <div class="sideHeader"></div>
                <div class="sideContainer">
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                </div>
                <div class="sideFooter"></div>
              </div>
              <div class="contentColumn">
                <div class="contentHeader">
                  <h3 class="contentType">INTERMEDIATE PLAN</h3>
                  <h2 class="contentTitle">$10<span class="contentGrey">/mo</span></h2>
                  <span class="contentSub">Charge every 3 months</span>
                </div>
                <div class="contentBody">
                  <p class="priceSlot grey content">Schlitz single-origin</p>
                  <p class="priceSlot white content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">Feature</p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </p>
                  <p class="priceSlot grey content">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </p>
                </div>
                <div class="contentFooter">
                  <!-- <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Button
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button> -->
                  <el-button class="contentSubscribe" type="primary">Subscribe</el-button>
                  <p class="contentFooterSub">Sponsored by Wrangler Jeans</p>
                </div>
              </div>
            </div>
            <div class="contentGroup">
              <div class="sidePrice2">
                <div class="sideHeader"></div>
                <div class="sideContainer">
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                  <p class="priceSlot white side">Wranger Jeans</p>
                  <p class="priceSlot grey side">Wranger Jeans</p>
                </div>
                <div class="sideFooter"></div>
              </div>
              <div class="contentColumn">
                <div class="contentHeader">
                  <h3 class="contentType">ADVANCE PLAN</h3>
                  <h2 class="contentTitle">$5<span class="contentGrey">/mo</span></h2>
                  <span class="contentSub">Charge every 12 month</span>
                </div>
                <div class="contentBody">
                  <p class="priceSlot grey content">Schlitz single-origin</p>
                  <p class="priceSlot white content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">Feature</p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot white content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                  <p class="priceSlot grey content">
                    <span class="priceIcon">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                  </p>
                </div>
                <div class="contentFooter">
                  <!-- <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Button
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button> -->
                  <el-button class="contentSubscribe" type="primary">Subscribe</el-button>
                  <p class="contentFooterSub">Sponsored by Wrangler Jeans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    subscribe() {
      if (!this.token) {
        this.$store.dispatch('OpenSignInPopup', { subscribe: true })
      } else {
        window.open('https://stripe.com/en-my')
      }
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.box {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: $color1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .w-3 {
    height: .75rem;
  }
  .h-3 {
    height: .75rem;
  }
  .w-5 {
    height: 1.25rem;
  }
  .h-5 {
    height: 1.25rem;
  }
  .priceContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    background-color: $color3;
    padding: 10px;
    width: 90%;
    .priceSlot {
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
      height: 45px;
      margin: 0px 0px;
    }
    .priceSlot.grey {
      background-color: $color2;
    }
    .priceSlot.white {
      background-color: $color3;
    }
    .priceSlot.side {
      justify-content: flex-start;
    }
    .priceSlot.content {
      justify-content: center;
      color: $color1;
    }
    .priceIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 1.25rem;
      height: 1.25rem;
      background-color: $color1;
      color: $color3;
    }
    .sidePrice {
      display: flex;
      flex-direction: column;
      width: 320px;
      // flex: 1;
      .sideHeader {
        width: 100%;
        height: 160px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: $color1;
      }
      .sideContainer {
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: $color1;
        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: $color1;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: $color1;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: $color1;
      }
      .sideFooter {
        width: 100%;
        height: 120px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: $color1;
      }
    }
    .contentPrice {
      display: flex;
      flex-direction: row;
      .contentGroup {
        display: flex;
        flex-direction: row;
        justify-items: center;
        align-items: flex-start;
        .sidePrice2 {
          display: none;
          flex-direction: column;
          .sideHeader {
            width: 100%;
            height: 160px;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: $color1;
          }
          .sideContainer {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: $color1;
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: $color1;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: $color1;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: $color1;
          }
          .sideFooter {
            width: 100%;
            height: 120px;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: $color1;
          }
        }
        .contentColumn {
          display: flex;
          flex-direction: column;
          justify-items: center;
          align-items: flex-start;
          min-width: 230px;
          flex: 1;
          .contentHeader {
            width: 100%;
            height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: $color1;
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: $color1;
            .contentType {
              font-size: 13px;
              color: $color1;
              margin: 0px;
            }
            .contentTitle {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 42px;
              color: #000;
              margin: 10px 0px;
            }
            .contentGrey {
              color: $color1;
              font-size: 13px;
              margin-left: 4px;
            }
            .contentSub {
              font-size: 13px;
              color: $color1;
              margin: 0px 0px;
            }
          }
          .contentBody {
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: flex-start;
            width: 100%;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: $color1;
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: $color1;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: $color1;
          }
          .contentFooter {
            width: 100%;
            height: 120px;
            padding: 20px;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: $color1;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: $color1;
            .contentSubscribe {
              width: 100%;
            }
            .contentFooterSub {
              text-align: center;
              color: $color1;
              font-size: 11px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .box {
    .priceContainer {
      .sidePrice {
        display: none;
      }
      .contentPrice {
        flex-direction: column;
        .contentGroup {
          .sidePrice2 {
            display: flex;
          }
          .contentColumn {
            width: 100%;
            margin-bottom: 10px;
            // .contentHeader {
            //   border-left-width: 1px;
            //   border-left-style: solid;
            //   border-left-color: $color1;
            // }
            // .contentBody {
            //   border-left-width: 1px;
            //   border-left-style: solid;
            //   border-left-color: $color1;
            // }
            // .contentFooter {
            //   border-left-width: 1px;
            //   border-left-style: solid;
            //   border-left-color: $color1;
            // }
          }
        }
      }
    }
  }
}
</style>