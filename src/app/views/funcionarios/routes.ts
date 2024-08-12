import { Routes } from '@angular/router';
export const routes: Routes = [
    {      
        path: '',
        data: {
      title: 'Base'
    },
    children: [
        {
          path: '',
          redirectTo: 'cards',
          pathMatch: 'full'
        },
        {
          path: 'funcionario',
          loadComponent: () => import('./funcionario/funcionario.component').then(m => m.FuncionarioComponent),
          data: {
            title: 'Funcionarios'
          }
        },
        {
        path: 'reportes',
        loadComponent: () => import('./reportes/reportes.component').then(m => m.ReportesComponent),
        data: {
        title: 'Reportes'
        }
        },
    ]
    }
]