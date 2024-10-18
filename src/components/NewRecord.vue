<template>
	<div class="main-container">
		<div class="form-body">
			<el-form :model="form">
				<el-text class="mx-1">{{ props.message }} Record</el-text>
				<el-divider />

				<el-form-item v-for="(column, index) in columns" :key="index" :label="getColumnLabel(column)">
					<el-input class="custom-input" v-model="form[column]"/>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">{{ props.message }}</el-button>
					<el-button @click="onCancel">Cancel</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import StudentsService from '@/services/StudentsService';
import { reactive, defineEmits, defineProps, onMounted } from 'vue';

const props = defineProps<{
	message: string,
	suicideData?: any
}>();

const columns = ['country', 'year', 'gender', 'age_group', 'suicide_count', 'population', 'gdp_for_year', 'gdp_per_capita', 'generation']

const defaultFormValues = {
	country: undefined,
	year: undefined,
	gender: undefined,
	age_group: undefined,
	suicide_count: undefined,
	population: undefined,
	gdp_for_year: undefined,
	gdp_per_capita: undefined,
	generation: undefined
};

let form = reactive({ ...defaultFormValues });

const emit = defineEmits(['close']);

const getColumnLabel = (column: string) => {
	return column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const onSubmit = async () => {
	if (props.message == "Add New")
		await StudentsService.addStudent(form);
	else
		await StudentsService.editStudent(form);

	Object.assign(form, { ...defaultFormValues });
	emit('close');
}

const onCancel = () => {
	Object.assign(form, { ...defaultFormValues });
	emit('close');
}

onMounted(() => {
	if (props.suicideData) form = props.suicideData;
})
</script>

<style scoped>
.main-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
}

.form-body {
	background-color: #fff;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	width: 30%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.custom-input {
	padding-left: 20px;
}
</style>