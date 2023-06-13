import { Component, OnInit }    from '@angular/core';
import { format } from 'sql-formatter';
@Component({
    selector: 'app-bridge',
    styleUrls: ['./bridge.component.scss'],
    template: ''
})
export class BridgeComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'sql'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

    ngOnInit() {

      console.log(format(`
      SELECT e.employee_id AS "Employee #" , e.first_name || ' ' || e.last_name AS "Name" , e.email AS "Email" , e.phone_number AS "Phone" , TO_CHAR(e.hire_date, 'MM/DD/YYYY') AS "Hire Date"
      , TO_CHAR(e.salary, 'L99G999D99', 'NLS_NUMERIC_CHARACTERS = ''.,'' NLS_CURRENCY = ''$''') AS "Salary"
      , e.commission_pct AS "Comission %"
      , 'works as ' || j.job_title || ' in ' || d.department_name || ' department (manager: '
        || dm.first_name || ' ' || dm.last_name || ') and immediate supervisor: ' || m.first_name || ' ' || m.last_name AS "Current Job"
      , TO_CHAR(j.min_salary, 'L99G999D99', 'NLS_NUMERIC_CHARACTERS = ''.,'' NLS_CURRENCY = ''$''') || ' - ' ||
          TO_CHAR(j.max_salary, 'L99G999D99', 'NLS_NUMERIC_CHARACTERS = ''.,'' NLS_CURRENCY = ''$''') AS "Current Salary"
      , l.street_address || ', ' || l.postal_code || ', ' || l.city || ', ' || l.state_province || ', '
        || c.country_name || ' (' || r.region_name || ')' AS "Location"
      , jh.job_id AS "History Job ID"
      , 'worked from ' || TO_CHAR(jh.start_date, 'MM/DD/YYYY') || ' to ' || TO_CHAR(jh.end_date, 'MM/DD/YYYY') ||
        ' as ' || jj.job_title || ' in ' || dd.department_name || ' department' AS "History Job Title"


      `, { language: 'sql' }));

    }
}

