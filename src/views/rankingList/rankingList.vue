<template>
  <div>
    rankingList
  </div>
</template>

<script>
import {toplistDetail} from "@/utils/api";

export default {
  name: "rankingList",
  mounted() {
    this.getToplistDetail()
  },
  methods: {
    getToplistDetail() {
      toplistDetail().then(res => {
        console.log(res)
      })
    },
  }
}
</script>

<style scoped>

</style>
