import { Route } from "@angular/router";

export default [
    {
        path: '', loadComponent: () => import('./blog.component')
            .then(mod => mod.BlogComponent), children: [
                {
                    path: '', loadComponent: () => import('./pages/all-blogs/all-blogs.component')
                        .then(mod => mod.AllBlogsComponent)
                },
                {
                    path: ':slug', loadComponent: () => import('./pages/single-blog/single-blog.component')
                        .then(mod => mod.SingleBlogComponent)
                },
            ]
    },


] as Route[];
