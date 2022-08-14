<template>
  <div class="page">
    <div class="scroll">
      <div class="list-item" v-for="(item,index) in list" :key="index">
        <el-image :src="item.coverImgUrl" fit="fill"  @click="getMore(item.id)">
        </el-image>
        <el-table :row-style="rowStyle" v-loading="item.loading" :data="item.tableData" :show-header="false"
                  highlight-current-row @row-dblclick="addMusic">
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              prop="name"
              min-width="200px"
          >
          </el-table-column>
          <el-table-column
              prop="ar[0].name"
              min-width="100px"
              align="right"
          >
          </el-table-column>
        </el-table>
        <div class="get-more" @click="getMore(item.id)">查看更多>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {playlistTrackAll, toplistDetail} from "@/utils/api";
import {mapActions} from "vuex";

export default {
  name: "rankingList",
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getToplistDetail()
  },
  methods: {
    ...mapActions(['addToMusicList']),
    getMore(id) {
      this.$router.push({
        name: 'menuMusicList',
        query: {
          id
        }
      })
    },
    rowStyle({row, rowIndex}) {
      let stylejson = {}
      if (rowIndex % 2 == 0) {
        stylejson.backgroundColor = '#252525 !important'
      } else {
        stylejson.backgroundColor = '#292929 !important'
      }
      return stylejson
    },
    getToplistDetail() {
      toplistDetail().then(res => {
        let data = res.list.slice(0, 5)
        data.forEach((item, index) => {
          item.loading = true
          item.tableData = []
          this.getMusicMenu(item.id, index)
        })
        this.list = data
      })
    },
    // 发送替换音乐事件
    addMusic(row, column, event) {
      this.$bus.$emit('setNewMusic', row)
      let currentIndex = null
      let tableIndex = null
      //替换当前播放列表
      this.list.forEach((item,index)=>{
        item.tableData.forEach((i,j) =>{
          if(i.id === row.id){
            currentIndex = j
            tableIndex = index
          }
        })
      })
      this.addToMusicList({
        musicList: this.list[tableIndex].musicData,
        index: currentIndex,
        musicMenuId: this.list[tableIndex].id
      })
    },
    //获取歌单
    async getMusicMenu(id, index) {
      //获取歌单歌曲列表
      playlistTrackAll(id).then(res => {

        this.$set(this.list[index], 'loading', false)
        this.list[index].tableData = res.songs.slice(0, 5)
        this.list[index].musicData = res.songs

      }).finally(_ => {
        this.$set(this.list[index], 'loading', false)
      })
    },
  }
}
</script>

<style scoped>
.page {
  color: #b5b5b5;
  padding-bottom: 50px;
  text-align: left;
}

.list-item {
  width: 100%;
  display: flex;
  position: relative;
}

.list-item:not(:first-child) {
  margin-top: 50px;
}

.el-image {
  width: 180px;
  height: 180px;
  border-radius: 10px;
  cursor: pointer;
}

.el-table {
  margin-left: 50px;
  font-size: 10px;
}

.page >>> .el-tabs__nav-wrap::after {
  background-color: #2d2d2d;
}

.page >>> .el-tabs__active-bar {
  background-color: #d33a31;
}

.page >>> .el-tabs__item.is-active {
  color: #d33a31 !important;
}

.page >>> .el-tabs__item:hover {
  color: #ece2e2;
}

.page >>> .el-tabs__item {
  color: #b3b3b3;

}

.page >>> .el-table tbody tr:hover > td {
  background-color: #4d4a4a;
  color: white;
  height: 10px;
}

.page >>> .el-table tbody tr > td {
  background-color: inherit;
  border: none;
}

.page >>> .el-table, .el-table__expanded-cell {
  background-color: #252525;
}

.page >>> .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #252525;
}

.page >>> .el-table td, .el-table th {
  padding: 6px 0;
}


.page >>> .el-icon-loading {
  font-size: 30px;
  color: #4B4B4B;
}

.page >>> .el-loading-mask {
  background: rgba(0, 0, 0, .05);
}

.get-more {
  position: absolute;
  left: 252px;
  bottom: -20px;
  cursor: pointer;
  font-size: 14px;
}
</style>
