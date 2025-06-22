import {ColDef, GridApi, ColumnState} from 'ag-grid-community';
import {storageServices} from './storageServices';
import {STORAGE_SERVICES, IGridState} from '../type';

export class GridStateService {
	/**
	 * Save the current grid state to storage
	 */
	static saveGridState(gridApi: GridApi, storageKey: string): void {
		try {
			const columnState = gridApi.getColumnState();
			const columnGroupState = gridApi.getColumnGroupState();
			const filterModel = gridApi.getFilterModel();

			const gridState: IGridState = {
				columnState,
				columnGroupState,
				sortModel: [], // Sort model is handled differently in v33
				filterModel,
			};

			storageServices.set(STORAGE_SERVICES.LOCAL, storageKey, gridState);
		} catch (error) {
			console.error('Error saving grid state:', error);
		}
	}

	/**
	 * Load and apply grid state from storage
	 */
	static loadGridState(gridApi: GridApi, storageKey: string): void {
		try {
			const savedState = storageServices.get(
				STORAGE_SERVICES.LOCAL,
				storageKey
			) as IGridState | null;

			if (savedState) {
				// Apply column state (visibility, width, order, pinning)
				if (savedState.columnState) {
					gridApi.applyColumnState({
						state: savedState.columnState as ColumnState[],
						applyOrder: true,
					});
				}

				// Apply column group state
				if (savedState.columnGroupState) {
					gridApi.setColumnGroupState(
						savedState.columnGroupState as {groupId: string; open: boolean}[]
					);
				}

				// Apply filter model
				if (savedState.filterModel) {
					gridApi.setFilterModel(savedState.filterModel);
				}
			}
		} catch (error) {
			console.error('Error loading grid state:', error);
		}
	}

	/**
	 * Clear saved grid state
	 */
	static clearGridState(storageKey: string): void {
		try {
			storageServices.set(STORAGE_SERVICES.LOCAL, storageKey, null);
		} catch (error) {
			console.error('Error clearing grid state:', error);
		}
	}

	/**
	 * Get saved column visibility state
	 */
	static getSavedColumnVisibility(
		storageKey: string
	): Record<string, boolean> | null {
		try {
			const savedState = storageServices.get(
				STORAGE_SERVICES.LOCAL,
				storageKey
			) as IGridState | null;

			if (savedState?.columnState) {
				const visibility: Record<string, boolean> = {};
				savedState.columnState.forEach((col: unknown) => {
					const columnState = col as ColumnState;
					visibility[columnState.colId] = !columnState.hide;
				});
				return visibility;
			}
			return null;
		} catch (error) {
			console.error('Error getting saved column visibility:', error);
			return null;
		}
	}

	/**
	 * Update column definitions with saved state
	 */
	static updateColumnDefsWithSavedState(
		columnDefs: ColDef[],
		storageKey: string
	): ColDef[] {
		try {
			const savedState = storageServices.get(
				STORAGE_SERVICES.LOCAL,
				storageKey
			) as IGridState | null;

			if (savedState?.columnState) {
				const stateMap = new Map<string, ColumnState>();
				savedState.columnState.forEach((state: unknown) => {
					const columnState = state as ColumnState;
					stateMap.set(columnState.colId, columnState);
				});

				return columnDefs.map((colDef) => {
					const savedColState = stateMap.get(colDef.field || '');
					if (savedColState) {
						return {
							...colDef,
							hide: savedColState.hide ?? undefined,
							width: savedColState.width,
							pinned: savedColState.pinned ?? undefined,
						};
					}
					return colDef;
				});
			}
			return columnDefs;
		} catch (error) {
			console.error(
				'Error updating column definitions with saved state:',
				error
			);
			return columnDefs;
		}
	}

	/**
	 * Auto-save grid state with debouncing
	 */
	static createAutoSaveHandler(
		gridApi: GridApi,
		storageKey: string,
		debounceMs: number = 500
	): () => void {
		let timeoutId: number;

		return () => {
			clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				GridStateService.saveGridState(gridApi, storageKey);
			}, debounceMs);
		};
	}
}
