import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent, ICellRendererParams, IFilterOptionDef,
  IServerSideDatasource,
} from 'ag-grid-community';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoadSuccessParams } from 'ag-grid-community/dist/lib/rowNodeCache/rowNodeBlock';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button (click)="btnClickedHandler($event)">Edit</button>
    <button (click)="btnClickedHandler($event)">Delete</button>
  `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler($event: MouseEvent) {
    this.params.clicked(this.params.value);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}

export interface PokemonResponse {
    id: string,
    name: { english: string },
    type: string[],
    base: { HP: number, Attack: number, Defense: number }
}

export interface PokemonRow {
  id: string,
  'name.english': string,
  type: string[],
  HP: number,
  Attack: number,
  Defense: number,
}

function convertData(response: HttpResponse<PokemonResponse[]>): LoadSuccessParams {
  return {
    rowData: response.body || [],
    rowCount: +(response.headers.get('X-Total-Count') || 0),
  }
}

@Component({
  selector: 'app-cypher-helper',
  templateUrl: './cypher-helper.component.html',
  styleUrls: ['./cypher-helper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CypherHelperComponent {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'id',
      minWidth: 220,
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['contains'],
      },
    },
    {
      field: 'name.english',
      minWidth: 200,
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains'],
      },
    },
    {field: 'type',
      minWidth: 200,
      filter: 'agSetColumnFilter',
      filterParams: {
        applyMiniFilterWhileTyping: true,
        values: [
          'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying',
          'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'
        ],
      },
    },
    {
      field: 'base.HP',
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: [{
          numberOfInputs: 0,
          displayKey: 'azaza',
          displayName: 'ololo',
        }] as IFilterOptionDef[],
      },
    },
    {
      field: 'base.Attack',
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['equals'],
      },
    },
    {
      field: 'base.Defense', filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['equals'],
      },
    },
    {
      field: 'Action',
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: (field: any) => {
          alert(`${field} was clicked`);
        }
      },
    }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: false,
    floatingFilter: true,
    filterParams: {
      maxNumConditions: 1,
    }
  };

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {
  }

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    params.api!.setServerSideDatasource(this.createServerSideDatasource());
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  pagination = true;

  paginationPageSize = 10;
  cacheBlockSize: number = 10;

  private createServerSideDatasource(): IServerSideDatasource {
    return {
      getRows: (params) => {
        const pageSize = (params.request.endRow || 0) - (params.request.startRow || 0);
        const currentPage = (params.request.startRow || 0) / pageSize;
        const queryParams: any = {
          '_page': currentPage,
          '_limit': pageSize,
        };
        Object.entries(params.request.filterModel).forEach(([key, value]: [string, any]) => {
          switch (value.filterType) {
            case 'number': case 'text':
              if (value.type === 'contains') { key = key + '_like' }
              queryParams[key] = value.filter;
              break;
            case 'set':
              queryParams[key] = value.values;
              break;
          }
        })
        const sort: string[] = [];
        const order: string[] = [];
        params.request.sortModel.forEach((item) => {
          sort.push(item.colId)
          order.push(item.sort)
        })
        if (sort.length && order.length) {
          queryParams._sort = sort.join(',');
          queryParams._order = order.join(',');
        }
        console.log(params.request)
        this.http
          .get<PokemonResponse[]>(
            'http://localhost:3000/data',
            { params: queryParams, observe: 'response' }
          )
          .subscribe((response) => {
            const result: LoadSuccessParams = convertData(response);
            params.success(result)
          });
      }
    };
  }

  onPageSizeChanged($event: Event) {
    const value = ($event.target as HTMLSelectElement)?.value;
    this.agGrid.api.paginationSetPageSize(Number(value));
  }
}
