module.exports=[
   {
        route: "master/garment-shipping-staff",
        name: "garment-shipping-staff",
        moduleId: "modules/master/garment-shipping-staff/index",
        nav: true,
        title: "Staff Shipping",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-fabric-type",
        name: "garment-fabric-type",
        moduleId: "modules/master/garment-fabric-type/index",
        nav: true,
        title: "Jenis Fabric",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/packing-list",
        name: "garment-shipping/packing-list",
        moduleId: "modules/garment-shipping/packing-list/index",
        nav: true,
        title: "Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/shipping-instruction",
        name: "garment-shipping/shipping-instruction",
        moduleId: "modules/garment-shipping/shipping-instruction/index",
        nav: true,
        title: "Shipping Instruction",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/cover-letter",
        name: "garment-shipping/cover-letter",
        moduleId: "modules/garment-shipping/cover-letter/index",
        nav: true,
        title: "Surat Pengantar",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/credit-note",
        name: "garment-shipping/credit-note",
        moduleId: "modules/garment-shipping/credit-note/index",
        nav: true,
        title: "Nota Kredit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/debit-note",
        name: "garment-shipping/debit-note",
        moduleId: "modules/garment-shipping/debit-note/index",
        nav: true,
        title: "Nota Debet",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/letter-of-credit",
        name: "garment-shipping/letter-of-credit",
        moduleId: "modules/garment-shipping/letter-of-credit/index",
        nav: true,
        title: "Letter Of Credit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
]