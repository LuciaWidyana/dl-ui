import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.title = "Detail Status Order";
    }

    formOptions = {
        cancelText: "Kembali"
    }

    textOptions = {
        label: {
            length: 3,
            align: "left"
        },
        control: {
            length: 3,
            align: "right"
        }
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    columns = [
        { field: "no", title: "No." },
        { field: "orderNo", title: "No. SPP" },
        { field: "constructionComposite", title: "Konstruksi" },
        { field: "processType", title: "Jenis Process" },
        { field: "designCode", title: "Motif" },
        { field: "colorRequest", title: "Warna" },
        { field: "buyerName", title: "Buyer" },
        { field: "accountName", title: "Sales" },
        {
            field: "_createdDate", title: "Tgl Terima Order", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "deliveryDate", title: "Permintaan Delivery", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "orderQuantity", title: "Panjang SPP (m)" },
        { field: "notInKanbanQuantity", title: "Sisa Belum Turun Kanban (m)" },
        { field: "preProductionQuantity", title: "Belum Produksi (m)" },
        { field: "onProductionQuantity", title: "Sedang Produksi (m)" },
        { field: "inspectingQuantity", title: "Sedang Inspecting (m)" },
        { field: "afterProductionQuantity", title: "Sudah Produksi (m)" },
        { field: "storageQuantity", title: "Kirim Ke Gudang (m)" },
        { field: "shipmentQuantity", title: "Kirim Ke Buyer (m)" },
        { field: "diffOrderShipmentQuantity", title: "Sisa Belum Kirim Ke Buyer (m)" },
    ]

    async activate(params) {
        this.year = params.year;
        this.month = params.month;
        this.orderType = params.orderType ? params.orderType : "-";

        this.info = {
            year: this.year,
            month: this.month,
            orderType: this.orderType
        };

        this.data = await this.service.detail(this.info);

        let orderTotal = 0, preTotal = 0, onTotal = 0, inspectingTotal = 0, afterTotal = 0, storageTotal = 0, shipmentTotal = 0, notInKanbanTotal = 0, diffOrderShipmentTotal = 0;

        for(let datum of this.data) {

            orderTotal += Number(datum.orderQuantity);
            datum.orderQuantity = numeral(datum.orderQuantity).format('0,000.00');
            
            preTotal += Number(datum.preProductionQuantity);
            datum.preProductionQuantity = numeral(datum.preProductionQuantity).format('0,000.00');

            onTotal += Number(datum.onProductionQuantity);
            datum.onProductionQuantity = numeral(datum.onProductionQuantity).format('0,000.00');

            inspectingTotal += Number(datum.inspectingQuantity);
            datum.inspectingQuantity = numeral(datum.inspectingQuantity).format('0,000.00');

            afterTotal += Number(datum.afterProductionQuantity);
            datum.afterProductionQuantity = numeral(datum.afterProductionQuantity).format('0,000.00');

            storageTotal += Number(datum.storageQuantity);
            datum.storageQuantity = numeral(datum.storageQuantity).format('0,000.00');

            shipmentTotal += Number(datum.shipmentQuantity);
            datum.shipmentQuantity = numeral(datum.shipmentQuantity).format('0,000.00');

            notInKanbanTotal += Number(datum.notInKanbanQuantity);
            datum.notInKanbanQuantity = numeral(datum.notInKanbanQuantity).format('0,000.00');

            diffOrderShipmentTotal += Number(datum.diffOrderShipmentQuantity);
            datum.diffOrderShipmentQuantity = numeral(datum.diffOrderShipmentQuantity).format('0,000.00');
        }

        // this.preTotal = preTotal.toFixed(2);

        // for(let on of this.data.onProductionData) {
        //     onTotal += Number(on.quantity);
        //     on.quantity = numeral(on.quantity).format('0,000.00');
        // }

        // this.onTotal = onTotal.toFixed(2);

        // for(let storage of this.data.storageData) {
        //     storageTotal += Number(storage.quantity);
        //     storage.quantity = numeral(storage.quantity).format('0,000.00');
        // }

        // this.storageTotal = storageTotal.toFixed(2);

        // for(let shipment of this.data.shipmentData) {
        //     shipmentTotal += Number(shipment.quantity);
        //     shipment.quantity = numeral(shipment.quantity).format('0,000.00');
        // }

        // this.shipmentTotal = shipmentTotal.toFixed(2);

        // for(let spp of this.data.productionOrdersNotInKanban) {
        //     sppNotInKanbanTotal += Number(spp.orderQuantity);
        //     spp.orderQuantity = numeral(spp.orderQuantity).format('0,000.00');
        // }

        // this.sppNotInKanbanTotal = sppNotInKanbanTotal.toFixed(2);

        this.orderTotal = orderTotal.toFixed(2);
        this.preTotal = preTotal.toFixed(2);
        this.onTotal = onTotal.toFixed(2);
        this.inspectingTotal = inspectingTotal.toFixed(2);
        this.afterTotal = afterTotal.toFixed(2);
        this.storageTotal = storageTotal.toFixed(2);
        this.shipmentTotal = shipmentTotal.toFixed(2);
        this.notInKanbanTotal = notInKanbanTotal.toFixed(2);
        this.diffOrderShipmentTotal = diffOrderShipmentTotal.toFixed(2);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    exportToExcel() {
        this.service.generateDetailXls(this.info);
    }

    cancelCallback(event) {
        this.list();
    }
}