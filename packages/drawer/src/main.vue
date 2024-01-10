<template>
	<el-drawer
		:title="title"
		:visible="drawer"
		:before-close="handleClose"
		:direction="direction"
		:size="width"
		destroy-on-close
		:append-to-body="appendToBody"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<template slot="title">
			<slot name="title"></slot>
		</template>
		<div class="xbd-drawer-content">
			<div class="drawer-content-view">
				<slot></slot>
			</div>
			<div v-if="operates.length" class="drawer-content-footer">
				<template
					v-for="(
						{ size = 'default', click, loading, label, showTooltip, tooltipContent, ...item }, index
					) in operates"
				>
					<el-tooltip
						v-if="showTooltip"
						:key="`tooltip-${index}`"
						effect="dark"
						:content="tooltipContent"
						placement="top"
					>
						<el-button :size="size" :loading="loading" v-bind="item" @click="click">
							{{ label }}
						</el-button>
					</el-tooltip>
					<el-button
						v-else
						:key="index"
						:size="size"
						:loading="loading"
						v-bind="item"
						@click="click"
					>
						{{ label }}
					</el-button>
				</template>
			</div>
		</div>
	</el-drawer>
</template>

<script>
import { Drawer } from "element-ui";

export default {
	name: "XbdDrawer",
	components: {
		ElDrawer: Drawer,
	},
	inheritAttrs: false,
	props: {
		drawer: {
			type: Boolean,
			required: true,
			default: false,
		},
		title: {
			type: String,
		},
		direction: {
			type: String,
		},
		width: {
			type: String,
			default: "calc(100vw - 200px)",
		},
		operates: {
			type: Array,
			default: () => [],
		},
		appendToBody: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleClose() {
			this.$emit("update:drawer", false);
			this.$emit("handleClose");
		},
	},
};
</script>

<style scoped lang="scss">
::v-deep .el-drawer__header {
	padding: 16px 24px;
	margin: 0;
	border-bottom: 1px solid #e7e8eb;

	& > :first-child {
		color: #252a33;
		font-family: "PingFang SC";
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: 24px;
	}

	> :last-child {
		color: #74798a;
	}
}

::v-deep .el-drawer__body {
	overflow: hidden;
}
</style>
