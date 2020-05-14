<!-- <template>
	<div>
		<div class="div_movie" v-for="(item0, index0) in active" :key="index0">
			<h3>{{movieType[index0]}}</h3>
			<el-tabs v-model="$data[item0.name]" @tab-click="">
				<el-tab-pane :label="movieLabel[index0][index].label" :name="movieLabel[index0][index].name" v-for="(item, index) in movieLabel[index0].length"
				 :key="item">
					<div v-loading="loading1" style="min-height: 510px;">
						<div class="item_a" v-for="(item1, index1) in (movieLabel[index0][index].img.length)<10?(movieLabel[index0][index].img.length):10"
						 :key="index1" @click="search(movieLabel[index0][index].id[index1+numberChange(index0)])">
							<el-card :body-style="{ padding: '0px'}" v-if="movieLabel[index0][index].title[index1+numberChange(index0)] != undefined">
								<el-popover placement="right" title="" trigger="hover">
									<el-image slot="reference" :src="movieLabel[index0][index].img[index1+numberChange(index0)]||defaultImg"
									 style="max-width: 150px" alt="找不到图片"></el-image>
									<img :src="movieLabel[index0][index].img[index1+numberChange(index0)]||defaultImg" alt="找不到图片">
								</el-popover>
								<span style="font-size: 12px;padding: 10px;" class="hidden_span" :title="movieLabel[index0][index].title[index1+numberChange(index0)]|| '暂无'">{{movieLabel[index0][index].title[index1+numberChange(index0)] || "暂无"}}</span>
							</el-card>
						</div>
					</div>
					<el-pagination layout="prev, pager, next" :total="movieLabel[index0][index].total" @current-change="MarvelChange(index0)"></el-pagination>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['active','movieType','movieLabel'],
		computed: {
			
		},
		created() {
			
		},
		methods:{
		}
	}
</script>

<style scoped>
	.div_movie {
		min-height: 500px;
	}
</style>
 -->