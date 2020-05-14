<template>
		<el-container :style="dheight">
			<el-header height="100px">
				<div class="d1">
					<el-row>
						<el-col :span="20">
							<div class="d3">
								<img src="../../assets/images/logo.jpg" alt="" style="width: 100px;">
								<slot name="header"></slot>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="d2">
								<slot name="footer"></slot>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-header>
			<el-main>
				<slot name="main"></slot>
			</el-main>
		</el-container>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			dheight() {
				return {
					height: document.documentElement.clientHeight + "px"
				}
			},
		},
	}
</script>

<style scoped>
	
</style>
