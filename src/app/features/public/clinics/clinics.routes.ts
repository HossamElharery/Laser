import { Route } from "@angular/router";

export default [
    {
        path: '', loadComponent: () => import('./main-clinics/main-clinics.component')
            .then(mod => mod.MainClinicsComponent), children: [
                {
                    path: '', loadComponent: () => import('./pages/clinics/clinics.component')
                        .then(mod => mod.ClinicsComponent)
                },
                {
                    path: ':slug', loadComponent: () => import('./pages/single-clinic/single-clinic.component')
                        .then(mod => mod.SingleClinicComponent)
                },
            ]
    },


] as Route[];
