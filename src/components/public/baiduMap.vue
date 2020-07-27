<template>
	<baidu-map id="map" class="baidumap"></baidu-map>
</template>

<script>
	export default {
		data() {
			return {
				baidumap: "",
				local: "",
			}
		},
		computed: {},
		created() {

		},
		mounted() {
			let map = new BMap.Map("map", {
				minZoom: 5
			}); // 创建地图实例  滚动范围大小
			let point = new BMap.Point(116.404, 39.915); // 创建点坐标  
			this.getMap(map);
			this.getTool(map);
			this.getMix(map);
			this.getCity(map);
		},
		methods: {
			getMap(map) { // 确定起始点zindex和是否可以滚动
				map.centerAndZoom("长沙", 15);
				map.enableScrollWheelZoom(true);
			},
			getTool(map) { // 比例尺工具
				let top_left_control = new BMap.ScaleControl({
					anchor: BMAP_ANCHOR_TOP_LEFT
				}); // 左上角，添加比例尺
				let top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
				let top_right_navigation = new BMap.NavigationControl({
					anchor: BMAP_ANCHOR_TOP_RIGHT,
					type: BMAP_NAVIGATION_CONTROL_SMALL
				}); //右上角，仅包含平移和缩放按钮
				/*缩放控件type有四种类型:
				BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
				map.addControl(top_left_control);
				map.addControl(top_left_navigation);
				map.addControl(top_right_navigation);
			},
			getMix(map) {// 是否显示真实地图
			var size = new BMap.Size(1000, 20);	//	设置位置
				let mapType1 = new BMap.MapTypeControl({
					mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
					anchor: BMAP_ANCHOR_TOP_LEFT,
					offset: size
				});
				map.addControl(mapType1);
			},
			getCity(map){//	获取城市列表
				var size = new BMap.Size(180, 20);	//	设置位置
				map.addControl(new BMap.CityListControl({
				    anchor: BMAP_ANCHOR_TOP_LEFT,
				    offset: size,
				}));
			},
			getLength(map){
				var myDis = new BMapLib.DistanceTool(map);
					map.addEventListener("load",function(){
						myDis.open();  //开启鼠标测距
						//myDis.close();  //关闭鼠标测距
					});
			}
		}
	}
</script>

<style scoped>
	.BMap_cpyCtrl {
		display: none;
	}

	.anchorBL {
		display: none;
	}

	.baidumap {
		width: 100%;
		height: 500px;
	}
</style>
