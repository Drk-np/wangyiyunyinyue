<template>
  <div class="page">
    <div style="display: flex">
      <el-image :src="musicMessage.coverImgUrl"></el-image>
      <div style="flex: 1">
        <div>
          <el-tag effect="plain" hit size="mini" color="#252525">
            歌单
          </el-tag>
          {{ musicMessage.name }}
        </div>
        <div class="button">
          <el-button-group>
            <el-button class="playingAll " icon="el-icon-video-play" size="mini" round>播放全部</el-button>
            <el-button class="playingAll" icon="el-icon-plus" size="mini" round></el-button>
          </el-button-group>
          <el-button class="button pusu" icon="el-icon-folder-add" size="mini" round>
            收藏({{ musicMessage.subscribedCount }})
          </el-button>
          <el-button class="button pusu" icon="el-icon-share" size="mini" round>分享({{ musicMessage.shareCount }})
          </el-button>
          <el-button class="button pusu" icon="el-icon-download" size="mini" round>下载全部</el-button>
        </div>
        <div class="introduction">
          <p>标&nbsp&nbsp&nbsp签：</p> {{ musicMessage.tags ? musicMessage.tags.join(' / ') : '' }}
          <div>
            <p>歌曲数：</p> {{ musicMessage.trackCount }} <p>播放数：</p> {{ musicMessage.playCount }}
          </div>
          <div style="display: flex;width: 100%">
            <!--                <div style="flex: 1;overflow: hidden; text-overflow:ellipsis;">-->
            <div class="introduce"
                 :style="{whiteSpace:(showMore? 'normal' : 'nowrap')}">
              简&nbsp&nbsp&nbsp介：{{ musicMessage.description }}
            </div>
            <div @click="showMore = !showMore" class="el-icon-caret-bottom showMoreMessage"></div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="musiclist">
        <el-table
            :data="musicList"
            :header-cell-style="{
              background: '#252525',
              color: '#606266',
              fontsize:'8px'
            }"
            :row-style="{

              color: '#606266',
              fontsize:'8px'
            }"
            style="width: 100%"
        >
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              prop="name"
              label="音乐标题"
              min-width="80px">
          </el-table-column>
          <el-table-column
              prop="ar[0].name"
               width="110px"
              label="歌手">
          </el-table-column>
          <el-table-column
              prop="al.name"
              label="专辑">
          </el-table-column>
          <el-table-column
              prop="sq.size"
              label="时长"
              width="70px"
              :formatter="transTime">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="'评论('+ musicMessage.commentCount +')'" name="comments">评论
      </el-tab-pane>
      <!--      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
import {playlistDetail, playlistTrackAll} from "@/utils/api";

export default {
  name: "musicMenu",
  data() {
    return {
      musicMessage: {},
      musicList: [],
      showMore: false,
      activeName: 'musiclist'
    }
  },
  props: {
    baseContent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  async mounted() {
    let id = this.$route.query.id
    let res = await playlistDetail(id)
    this.musicMessage = res.playlist
    console.log(res)
    res = await playlistTrackAll(id)
    this.musicList = res.songs
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //格式化时间
    transTime(UnixTime) {
      var a = UnixTime.dt
      var date = new Date(parseInt(a));
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return minute + ':' + second;
    },
  }


}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  color: #b3b3b3;
  text-align: left;
  box-sizing: border-box;
}


.button {
  margin-top: 10px;
  color: #b3b3b3;
}

.playingAll {
  background-color: #d33a31;
  border-color: #d33a31;
  color: #dcd8d8;
}

.el-button-group {
  margin-right: 10px;
}

.playingAll:hover {
  background-color: #e36c65;
}

.pusu {
  background-color: #252525;
  border-color: #6b6969;
}

.pusu:hover {
  background-color: #6b6969;

}

.el-image {
  width: 200px;
  height: 200px;
  display: block;
  border-radius: 10px;
  margin-right: 30px;
}

.el-tag--plain {
  color: #d33a31;
  border-color: #d33a31;
}

.el-tag {
  margin-right: 10px;
}

.introduction {
  width: 100%;
  margin-top: 20px;
  font-size: 10px;
  cursor: text;
}

.showMoreMessage {
  width: 30px;
  font-size: 20px;
  cursor: pointer;
}

.introduce {
  flex: 1;
  height: 70px;
  width: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  text-overflow: ellipsis
}

.introduce::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.introduce::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
}

.introduce::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #252525;
  border-radius: 10px;
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

.page >>> .el-table td, .page >>> .el-table th.is-leaf {
  border-bottom: none;
}

.page >>> .el-table th, .page >>> .el-table tr {
  background: #252525;
}

.page >>> .el-table th:hover, .page >>> .el-table tr:hover {
  background: #4d4a4a !important;
}

.page >>> .el-table tbody tr:hover > td {
  background-color:  #4d4a4a;
  color: white;
}
.page >>> .el-table tbody tr > td {
  background-color:  #252525;

}


</style>
