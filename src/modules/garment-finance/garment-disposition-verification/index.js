export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Verifikasi Disposisi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Verifikasi Disposisi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Verifikasi Disposisi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Verifikasi Disposisi' }
        ]);

        this.router = router;
    }
}
