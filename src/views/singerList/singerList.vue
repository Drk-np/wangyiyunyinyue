<template>
  <div class="page">
    <div class="language">
      <div class="title">语种：</div>
      <ul>
        <li @click="tagChange(item.type)" :class="{active:item.type === tag}"
            v-for="(item,index) in list" :key="index">{{ item.name }}
        </li>
      </ul>
    </div>
    <div class="singer-list">
      <div class="singer-item" v-for="(item,index) in singerlist" :key="index" fit="fill">
        <el-image lazy :src="item.img1v1Url"></el-image>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>


import {toplistArtist} from "@/utils/api";

export default {
  name: "musicMenu",
  data() {
    return {
      tag: 1,
      list: [
        {
          name: '华语',
          type: 1
        },
        {
          name: '欧美',
          type: 2
        }, {
          name: '韩国',
          type: 3
        }, {
          name: '日本',
          type: 4
        },
      ],
      singerlist: []
    }
  },
  computed: {},
  props: {
    baseContent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    this.getToplistArtist()
  },
  methods: {
    tagChange(tag) {
      this.tag = tag
      this.getToplistArtist()
    },
    getToplistArtist() {
      toplistArtist(this.tag).then(res => {
        if (res.code == 200) {
          this.singerlist = res.list.artists
        }
      })
    }
  },
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  color: #b3b3b3;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.language {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.language .title {
  width: 50px;
}

.language ul {
  flex: 1;
  display: flex;
  align-items: center;
  color: #878787;
}

.language ul li {
  padding: 0 20px;
  cursor: pointer;
}

.language ul li:hover {
  color: #b3b3b3;
}

.active {
  background: #2e2625 !important;
  color: #d33a31 !important;

}

.language ul li:not(:first-child) {
  border-left: 1px solid #303030;
}

.singer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}


.singer-item p {
  color: #878787;
  line-height: 14px;
  height: 14px;
  font-size: 12px;
  margin-top: 0;
}

.singer-item p:hover {
  color: #b3b3b3;
}

.singer-item {
  width: 18%;
  min-height: 40px;
  cursor: pointer;
  margin-bottom: 10px;
}

.el-image {
  width: 100%;
  border-radius: 10px;
}


</style>
