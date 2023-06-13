import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateService } from '../template.service';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { EMPTY, Observable, catchError, finalize, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { format } from 'sql-formatter';

@Component({
  selector: 'app-template-edit-item',
  templateUrl: './edit.component.html',
})
export class EditItemComponent implements OnInit {
  @Input() model: any = null;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onOk = new EventEmitter<boolean>();
  public dataType: string[];
  public typeValue: string;
  public ngSourceType: string;
  public ngReportType: string;
  editorOptions = { theme: 'vs-dark', language: 'sql' };
  editorOptionsJson = {
    theme: 'vs-dark',
    language: 'json',
    wordWrap: 'on',
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    formatOnSave: true
  }
  templateForm: FormGroup;
  ngSelect = 1;
  query = ``;
  beforeQueryFormat: string = ''
  jsonGenerate = '';

  public isHandling: boolean = false;

  private backDrop = document.querySelector('.modal-backdrop') as HTMLElement;
  constructor(
    private fb: FormBuilder,
    private mainService: TemplateService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private router: Router,
  ) {
  }
  data = [];
  public dataSourcePlatformType: string[];
  ReportTypes: FormControl[] = [];
  selectedSourceType: string;
  public typeSourcePlatformValue: string;

  ngOnInit(): void {
    this.fetchDataType();
    this.fetchDataSourcePlatformType();
    this.fetchDataConnector();
    this.backDrop.style.display = 'block';

    this.templateForm = this.fb.group({
      name: [this.model.name, Validators.required],
      version: [this.model.version, Validators.required],
      sql_template: [this.model.sql_template],
      definition: [this.formatJson(JSON.stringify(this.model.definition))],
      warehouse_type: [this.model.warehouse_type ?? ''],
      source_type: [this.model.source_type ?? ''],
      report_type: [this.model.report_type ?? ''],
      source_platform_type: [this.model.source_platform_type ?? '']
    });
    this.typeValue = this.model.warehouse_type;
    this.jsonGenerate = this.formatJson(JSON.stringify(this.model.definition));
    this.ngSourceType = this.model.source_type
    this.ngReportType = this.model.report_type
    this.typeSourcePlatformValue = this.model.source_platform_type;

    if (this.model.source_type !== '') {
      this.fetchDataConnector()
        .pipe(
          tap(() => {
            this.onSourceTypeChange(this.model.source_type);
          }),
          finalize(() => {
            this.backDrop.style.display = 'none';
          })
        )
        .subscribe();
    }

  }
  formatJson(jsonString: string): string {
    const json = JSON.parse(jsonString);
    return JSON.stringify(json, null, 2);
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
  fetchDataConnector(): Observable<any> {
    this.loadingService.isLoading.next(true);
    return this.mainService.getConnector().pipe(
      finalize(() => {
        this.loadingService.isLoading.next(false);
      }),
      tap((response) => {
        if (!response) return;
        this.data = response?.data ?? [];
      }),
      catchError((error: any) => {
        this.notifyService.pushNotify.next({
          type: 'error',
          message: error?.message ?? 'error'
        });
        return EMPTY;
      })
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
  fetchDataType() {
    this.mainService.getDataWarehouseType()
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
  fetchDataSourcePlatformType() {
    this.mainService.getDataSourcePlatformType()
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

  handleSubmit() {

    if (!this.templateForm.valid) return;
    this.loadingService.isLoading.next(true);
    const body = {
      template_id: this.model.template_id,
      name: this.templateForm.get('name').value,
      version: this.templateForm.get('version').value,
      sql_template: this.templateForm.get('sql_template').value,
      definition: this.templateForm.get('definition').value,
      warehouse_type: this.templateForm.get('warehouse_type').value,
      source_type: this.templateForm.get('source_type').value,
      report_type: this.templateForm.get('report_type').value,
      source_platform_type: this.templateForm.get('source_platform_type').value,
      user_id: localStorage.getItem('user_id'),
    };

    let notify = {};

    this.mainService.edit(body)
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
          this.notifyService.pushNotify.next(notify);
        })
      )
      .subscribe({
        next: () => {
          notify = {
            type: 'success',
            message: 'update template success'
          }

          for (const key in body) {
            this.model[key] = body[key];
            if (key == 'definition') {
              this.model[key] = JSON.parse(body[key]);
            }

          };
          this.model['updated_at'] = (new Date()).toISOString();

          this.onClose.emit(true);
          this.router.navigate(['/admin/template/'])
        },
        error: (error: any) => {
          notify = {
            type: 'error',
            message: error?.message ?? 'error'
          }
        }, complete: () => {
          this.isHandling = true;
          this.removeValidators();
          this.templateForm.reset();
        },
      });
  }

  closeModal() {
    this.onClose.emit(true);
  }

  ngOnDestroy(): void {
    this.backDrop.style.display = 'none';
  }
  removeValidators() {
    for (const key in this.templateForm.controls) {
      this.templateForm.get(key)?.clearValidators();
      this.templateForm.get(key)?.updateValueAndValidity();
    }
  }
  format() {
    if(!this.query) return;
    try {
      if (!this.isCreateOrReplaceTable(this.templateForm.get('sql_template').value)) {
        throw ('statement starts with the "CREATE OR REPLACE TABLE" prefix');
      }
      const temp = format(this.formatWithRule(this.templateForm.get('sql_template').value));
      const input = temp.replace(':i :table - identifier - x',':i:table-identifier-x')
      const ab = input.replaceAll(' :: ','::')
      this.query = ab.replaceAll(' :','\:')
    }
    catch (error) {
      this.notifyService.pushNotify.next({
        type: 'error',
        message: error.toString()
      });
    }
  }
  formatWithRule(input) {
    // Add :i: before each table name
    input = input.replace(/\b(TABLE|FROM)\s+(\w+)/gi, '$1 :i:$2');

    // Replace -- comments with /*...*/
    input = input.replace(/--(.*)/g, '/*$1*/');

    // Escape single quotes by doubling them
    input = input.replace(/'/g, '"');

    // Add backslash before colon in parse_json()
    input = input.replace(/parse_json\((.*?)\):/g, 'parse_json($1)\\:');

    // Add line breaks and indentation
    input = input.replace(/,/g, ',\n    ');
    input = input.replace(/as /g, 'as\n    ');

    // Add semicolon at the end of the query
    input += ';';
    return input;
  }

  isCreateOrReplaceTable(sql) {
    const prefix = 'CREATE OR REPLACE TABLE';
    return sql.startsWith(prefix);
  }
  generateDefinetion(sqlQuery) {
    const outputTables = [];
    const inputTables = [];

    // Regular expression patterns to match different types of table names
    const cleanedTablePattern = /(\w+_)?(CLEANED|cleaned)$/;
    const subentityTablePattern = /(\w+_)?(SUBENTITY|subentity)$/;
    const dwTablePattern = /(\w+_)?(DW|dw)$/;

    // Extract the output table name from the SQL query
    const outputTableMatch = sqlQuery.match(/CREATE\s+OR\s+REPLACE\s+TABLE\s+(\w+)/i);
    if (outputTableMatch) {
      const outputTableName = outputTableMatch[1];
      let outputLabel = '';

      // Determine the output table label based on the table name
      if (cleanedTablePattern.test(outputTableName)) {
        outputLabel = 'cleaned-table';
      } else if (subentityTablePattern.test(outputTableName)) {
        outputLabel = 'subentity-table';
      } else if (dwTablePattern.test(outputTableName)) {
        outputLabel = 'dw-table';
      }

      outputTables.push({
        identifier: outputTableName,
        meta: {
          label: outputLabel
        }
      });
    }
  }

  generateDefinetion2(input) {
    const inputTables = {
      type: "",
      values: []
    };
    const outputTables = [];

    // Extract input table name from SQL query
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
    } else {
      this.beforeQueryFormat = '';
    }
  }

  clickGenerateDefine() {
    if (this.beforeQueryFormat == "") {
      this.jsonGenerate = "";
    } else {
      this.jsonGenerate = this.formatJson(JSON.stringify(this.generateDefinetion2(this.beforeQueryFormat)));
    }
  }

  clean() {
    try {
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
    } catch (error) {
      this.notifyService.pushNotify.next({
        type: 'error',
        message: error.toString(),
      });
    }
  }
  subentity() {
    try {
      this.query = format(
        `CREATE OR REPLACE TABLE SUBENTITY.table_name_SUBENTITY 
        AS
        
        SELECT
             *
        FROM
          CLEAN.table_name_CLEANED`
      )
    } catch (error) {
      this.notifyService.pushNotify.next({
        type: 'error',
        message: error.toString(),
      });
    }
  }
}
