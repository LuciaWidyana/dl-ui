import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    {
      field: "month",
      title: "Bulan"
    },
    {
      field: "yearPeriode",
      title: "Tahun"
    },
    {
      field: "createdDate",
      title: "Tanggal Update"
    }
  ];

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.search(arg).then(result => {
      if (result.data && result.data.length > 0) {
        console.log(result);
        return {
          total: result.info.total,
          data: result.data
        };
      } else {
        return {
          total: 0,
          data: {}
        };
      }
    });
  }
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { month: data.month, yearPeriode : data.yearPeriode });
        break;
    }
  }
  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
    pagination: true,
  };

  upload() {
    this.router.navigateToRoute("upload");
  }
}
