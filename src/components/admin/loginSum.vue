<template>
	<div :style="sumheight" class="sum">
		<h1 style="text-align: left;margin-left:50px">登录统计</h1>
		<div style="display: flex;margin-left:20px">
			<el-date-picker v-model="value" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期" :picker-options="pickerOptions">
			</el-date-picker>
		<el-button style="margin:0 0 0 20px" icon="el-icon-search" type="primary" @click="search">查询</el-button>
		</div>
		<highcharts :options="chartOptions" v-loading="load"></highcharts>
	</div>
</template>

<script>
import Allminxins from '@/mixins/Allminxins.js';
	export default {
		mixins: [Allminxins],
		data() {
			return {
				load:false,
				value: ['',''],
				start:"",
				end:"",
				list:[],
				list1:[],
				list2:[],
				list3:[],
				chartOptions: {
					title: {
						text: ''
					},
					subtitle: {
						text: ''
					},
				},
			}
		},
		computed: {
			sumheight() {
				return {
					height: document.documentElement.clientHeight - 60 + "px"
				}
			},
		},
		created() {
			this.value[0] = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
			this.value[1] = new Date();
			this.search();
		},
		methods: {
			search(){
				if(this.value == null) return this.$message.warning("搜索条件为空")
				let a = Date.parse(this.value[0])
				let b = Date.parse(this.value[1])
				let time = new Date(a)
				let time1 = new Date(b)
				this.start = this.formatDate(time).split(' ')[0]
				this.end = this.formatDate(time1).split(' ')[0]
				this.getData();
			},
			getData(){
				this.load = true;
				this.list = [];
				this.list1 = [];
				this.list2 = [];
				this.list3 = [];
				this.$utils.http.call(this, {
					url: '/?s=App.Statistics.GetDailyLoginReport',
					parameter: {
						start_date:this.start,
						end_date:this.end,
					},
					success: resp => {
						const Ary =  resp.data.data.items
						Ary.forEach((val,index,arr)=>{
							// this.list.push(val.date.split('-')[1]+'月'+val.date.split('-')[2]+'日')
							this.list.push(val.date)
							this.list1.push(val.total_times)
							this.list2.push(val.success_times)
							this.list3.push(val.fail_times)
						})
						this.chartOptions = {
							chart: {
								type: 'column',
								events: {
								        load: this.search // 图表加载完毕后执行的回调函数
								      }
							},
							credits: {
							     enabled: false
							},
							title: {
								text: ''
							},
							subtitle: {
								text: ''
							},
							xAxis: {
								categories: this.list,
								crosshair: true,
							},
							yAxis: {
								min: 0,
								title: {
									text: '登陆次数'
								}
							},
							tooltip: {
								// head + 每个 point + footer 拼接成完整的 table
								headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
								pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
									'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
								footerFormat: '</table>',
								shared: true,
								useHTML: true
							},
							plotOptions: {
								column: {
									borderWidth: 0
								}
							},
							series: [{
								name: '登录次数',
								data: this.list1
							},{
								name: '成功次数',
								data: this.list2
							},{
								name: '失败次数',
								data: this.list3
							}]
						}
						this.load = false;
					},
				})
			},
		}
	}
</script>

<style>
</style>
