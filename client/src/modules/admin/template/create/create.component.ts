import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { format } from 'sql-formatter';
import { TemplateService } from '../template.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from 'modules/portal/login/login.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public dataType: string[];
  public typeValue: string;
  templateForm: FormGroup;
  editorOptions = { theme: 'vs-dark', language: 'sql' };
  beforeQueryFormat: string = ""
  query: string = '';
  jsonGenerate: string = null;
  data = [];
  public dataSourcePlatformType: string[];
  ReportTypes: FormControl[] = [];
  selectedSourceType: string;
  public typeSourcePlatformValue: string;


  editorOptionsJson1 = {
    language: 'json',
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true
  };

  editorOptionsJson = {
    theme: 'vs-dark',
    language: 'json',
    wordWrap: 'on',
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    formatOnSave: true
  }
  constructor(
    private titleService: Title,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private templateService: TemplateService,
    private router: Router
  ) {
    this.loadingService.isLoading.next(true);
    this.titleService.setTitle("List Template");
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      version: ['', Validators.required],
      enabled: [true],
      warehouse_type: [''],
      source_type: [''],
      report_type: [''],
      source_platform_type: [''],
    });
  }
  ngOnInit(): void {
    this.fetchDataType();
    this.fetchDataSourcePlatformType();
    this.fetchDataConnector();
  }
  onSourceTypeChange(selectedId: string) {
    const selectedSourceType = this.data.find((item) => item.id === selectedId);
    const data = this.extractReportTypes(selectedSourceType['reports']);
    this.ReportTypes = [];
    data.forEach((reportType) => {
      this.ReportTypes.push(new FormControl(reportType));
    });
  }
  extractReportTypes(inputString: any) {
    inputString = inputString.replaceAll('\\"', '')
    const matches = inputString.matchAll(/report-type\s+([a-z-]+)/g);
    const reportTypes = [];
    for (const match of matches) {
      reportTypes.push(match[1]);
    }
    return reportTypes;
  }
  fetchDataConnector() {
    this.templateService.getConnector()
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      )
      .subscribe(
        {
          next: (response) => {
            if (!response) return;
            this.data = response?.data ?? [];
          },
          error: (error: any) => {
            this.notifyService.pushNotify.next({
              type: 'error',
              message: error?.message ?? 'error'
            });
          }
        }
      );
  }
  public saveType(e): void {
    let find: any = this.dataType.find((x: any) => x?.role === e.target.value);
    this.typeValue = find.role;
  }
  public saveSourcePlatformType(e): void {
    let find: any = this.dataSourcePlatformType.find((x: any) => x?.role === e.target.value);
    this.typeSourcePlatformValue = find.role;
  }

  fetchDataSourcePlatformType() {
    this.loadingService.isLoading.next(true);
    this.templateService.getDataSourcePlatformType()
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      )
      .subscribe(
        {
          next: (response) => {
            if (!response) return;
            this.dataSourcePlatformType = response?.data ?? [];
          },
          error: (error: any) => {
            this.notifyService.pushNotify.next({
              type: 'error',
              message: error?.message ?? 'error'
            });
          }
        }
      );
  }

  fetchDataType() {
    this.loadingService.isLoading.next(true);
    this.templateService.getDataWarehouseType()
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      )
      .subscribe(
        {
          next: (response) => {
            if (!response) return;
            this.dataType = response?.data ?? [];
          },
          error: (error: any) => {
            this.notifyService.pushNotify.next({
              type: 'error',
              message: error?.message ?? 'error'
            });
          }
        }
      );
  }

  onSubmit() {
    if (!this.templateForm.valid) return;
    this.loadingService.isLoading.next(true);
    const body = {
      name: this.templateForm.get('name').value,
      version: this.templateForm.get('version').value,
      enabled: this.templateForm.get('enabled').value,
      sql_template: this.query,
      definition: this.jsonGenerate,
      warehouse_type: this.templateForm.get('warehouse_type')?.value ?? '',
      source_type: this.templateForm.get('source_type')?.value ?? '',
      report_type: this.templateForm.get('report_type')?.value ?? '',
      source_platform_type: this.templateForm.get('source_platform_type')?.value ?? '',
      user_id: localStorage.getItem('user_id'),
    };
    let notify = {};
    this.templateService
      .store(body)
      .pipe(
        finalize(() => {
          this.notifyService.pushNotify.next(notify);
        })
      )
      .subscribe({
        next: () => {
          notify = {
            type: 'success',
            message: 'create template success',
          };
          this.templateForm.reset();
          this.router.navigate(['/admin/template/'])
        },
        error: (error: any) => {
          notify = {
            type: 'error',
            message: error?.message ?? 'error',
          };
          this.loadingService.isLoading.next(false);
        },
      });
  }

  format() {
    if(!this.query) return;
    try {
      this.query = "";
      setTimeout(() => {
        let input = format(
          this.formatWithRule(this.beforeQueryFormat)
        );
        input = input.replace(':i :table - identifier - x',':i:table-identifier-x')
        input = input.replaceAll(' :: ','::')
        this.query = input.replaceAll(' :','\\\:')
      }, 100);
    } catch (error) {
      this.notifyService.pushNotify.next({
        type: 'error',
        message: error.toString(),
      });
    }
  }

  getColumnWidths(input) {
    const rows = input.trim().split('\n');
    const widths = [];
    rows.forEach((row) => {
      const cols = row.split(/\s+/);
      cols.forEach((col, i) => {
        widths[i] = Math.max(widths[i] || 0, col.length);
      });
    });
    return widths;
  }

  formatOutput(input) {
    const widths = this.getColumnWidths(input);
    const formattedRows = input
      .trim()
      .split('\n')
      .map((row) => {
        const cols = row.split(/as\s+/);
        return cols
          .map((col, i) => {
            if (i === 0) {
              return col;
            } else {
              const paddingLength = widths[i] - col.length;
              const padding =
                paddingLength > 0 ? ' '.repeat(paddingLength) : '';
              return '  as ' + col + padding;
            }
          })
          .join(' ');
      });
    return formattedRows.join('\n');
  }

  formatWithRule(input) {
    input = input.replace(/--(.*)/g, '/*$1*/');
    // input = input.replace(/'/g, "''");
    input = input.replace(/,\s*/g, ', ');
    input = input.replace(/(\S+)\s+as\s+(\S+)/g, ', $1 as $2\n');
    input = input.replace(/(\bSELECT\b)',/g, '$1 ');
    input = this.formatOutput(input);

    return input;
  }

  generateDefinetion2(input) {
    const inputTables = {
      type: "",
      values: []
    };
    const outputTables = [];
    const inputTableMatches = input.match(/FROM\s+(\S+)/i);
    if (inputTableMatches) {
      inputTables.type = "extract";
      inputTables.values.push(inputTableMatches[1]);
    } else {
      inputTables.type = "plain-values";
    }

    // Extract output table name from SQL query
    const outputTableMatches = input.match(/CREATE\s+OR\s+REPLACE\s+TABLE\s+(\S+)/i);
    if (outputTableMatches) {
      outputTables.push(outputTableMatches[1]);
    }
    const additionalTableMatches = input.match(/\bjoin\s+(\S+)/gi);
    if (additionalTableMatches) {
      const tableNames = additionalTableMatches.map(match => match.replace(/\bjoin\s+/i, ''));
      inputTables.values.push(...tableNames);
    }
  
    // Construct the output object
    const output = {
      "input-tables": inputTables,
      "output-tables": outputTables
    };
    return output;
  }

  queryChange(query) {
    if (query) {
      this.beforeQueryFormat = query;
    }
  }

  clickGenerateDefine() {
    if (!this.query) {
      this.jsonGenerate = "";
    }
    else {
      this.jsonGenerate = JSON.stringify(this.generateDefinetion2(this.beforeQueryFormat), null, '\t');
    }
  }

  clean() {
    try {
      this.query = '';
      setTimeout(() => {
        this.query =
          format(`CREATE OR REPLACE TABLE CLEAN.table_name_CLEANED
        AS

        WITH UNIONED AS
        (
        :i:table-identifier-x
        )

        SELECT
             *
          ,  _kleene_extract_date
          ,  _kleene_metadata_id
          ,  current_timestamp                                                                                             AS _last_run_timestamp
          FROM UNIONED`);
      }, 100);

    } catch (error) {
      this.notifyService.pushNotify.next({
        type: 'error',
        message: error.toString(),
      });
    }
  }

  subentity() {
    try {
      this.query = '';
      setTimeout(() => {
        this.query = format(
          `CREATE OR REPLACE TABLE SUBENTITY.table_name_SUBENTITY
            AS

            SELECT
                 *
            FROM
              CLEAN.table_name_CLEANED`
        )
      }, 100);

    } catch (error) {
      this.notifyService.pushNotify.next({
        type: 'error',
        message: error.toString(),
      });
    }
  }
}
