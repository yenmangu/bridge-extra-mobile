import { TableConfig } from '../interfaces/table-details';

export const baseTableConfig: TableConfig = {
	dataTypeString: '',
	tableName: '',
	visibleRows: 10,
	rowsPerPage: [5, 10, 15, 20],
	extraClasses: ['p-datatable-striped'],
	minWidth: ''
};
