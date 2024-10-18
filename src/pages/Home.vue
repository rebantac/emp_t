<template>
	<div class="main">
		<div class="kudo">
			<el-text class="mx-1">SUICIDE IDEATION PREDICTOR</el-text>
			<el-button type="primary" @click="addNewHandler">Add New</el-button>
		</div>

		<el-table :data="suicideData" style="width: 100%">
			<template v-for="(column, index) in columns" :key="index">
				<el-table-column :prop="column.prop" :label="column.label" />
			</template>

			<el-table-column>
				<template #default="scope">
					<div class="lee">
						<el-dropdown trigger="click">
							<el-icon size="30"><Operation /></el-icon>
							<template #dropdown>
								<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click="editHandler(scope.row)">Edit</el-dropdown-item>
								<!-- <el-dropdown-item @click="predictHandler(scope.row)">Predict</el-dropdown-item> -->
								<el-dropdown-item @click="deleteHandler(scope.row.id)">Delete</el-dropdown-item>
							</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<NewRecord v-if="isFormVisible" @close="closeHandler" :message="message" :suicideData="selectedSuicideData" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Operation } from '@element-plus/icons-vue'

import StudentsService from '@/services/StudentsService.ts';
import NewRecord from '@/components/NewRecord.vue';

interface ISuicideData {
	id: number,
	country: number;
	year: number;
	gender: number;
	age_group: number;
	suicide_count: number;
	population: number;
	gdp_for_year: number;
	gdp_per_capita: number;
	generation: number;
	suicide_rate: number;
}

const columns = [
	{ prop: 'country', label: 'Country' },
	{ prop: 'year', label: 'Year' },
	{ prop: 'gender', label: 'Gender' },
	{ prop: 'age_group', label: 'Age Group' },
	{ prop: 'suicide_count', label: 'Suicide Count' },
	{ prop: 'population', label: 'Population' },
	{ prop: 'gdp_for_year', label: 'GDP for Year' },
	{ prop: 'gdp_per_capita', label: 'GDP per Capita' },
	{ prop: 'generation', label: 'Generation' },
	{ prop: 'suicide_rate', label: 'Suicide Rate' }
]

let suicideData = ref<ISuicideData[]>([]);
const isFormVisible = ref<boolean>(false);
const message = ref<string>('');
const selectedSuicideData = ref<ISuicideData>({
	country: undefined,
	year: undefined,
	gender: undefined,
	age_group: undefined,
	suicide_count: undefined,
	population: undefined,
	gdp_for_year: undefined,
	gdp_per_capita: undefined,
	generation: undefined,
	suicide_rate: 0
});

const fetchData = async () => {
	suicideData.value = await StudentsService.getStudents();
}

const addNewHandler = () => {
	isFormVisible.value = true;
	message.value = 'Add New';
}

const deleteHandler = async (id: number) => {
	await StudentsService.deleteStudent(id);
	fetchData();
}

const closeHandler = () => {
	isFormVisible.value = false;
	fetchData();
}

const editHandler = (data: ISuicideData) => {
	message.value = 'Update';
	selectedSuicideData.value = data;
	isFormVisible.value = true;
}

const predictHandler = async (data: ISuicideData) => {
	console.log(data);

	const { id, suicide_rate, ...predictionData } = data;

	const dataFromFlask = await StudentsService.predictRate(predictionData);
	const predictedSuicideRate = dataFromFlask.suicide_rate_prediction

	await StudentsService.addSuicideRate({ id, predictedSuicideRate});

	fetchData();
}

onMounted(() => {
	fetchData();
})
</script>

<style scoped>
.main {
	margin: 20px;
}

.kudo {
	display: flex;
	justify-content: space-between;
	background-color: rgb(196, 221, 233);
	padding: 20px;
	margin-bottom: 20px;
	border-radius: 5px;
}

.lee {
	display: flex;
	justify-content: flex-end;
}
</style>