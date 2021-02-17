import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-purchasing-book-reports";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    info.isImportSupplier = true;
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    let endpoint = `${serviceUri}/downloads/xls?billNo=${info.billNo}&paymentBill=${info.paymentBill}&category=${info.category}&startDate=${info.startDate}&endDate=${info.endDate}&isForeignCurrency=${false}&isImportSupplier=${true}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    let endpoint = `${serviceUri}/downloads/pdf?billNo=${info.billNo}&paymentBill=${info.paymentBill}&category=${info.category}&startDate=${info.startDate}&endDate=${info.endDate}&isForeignCurrency=${false}&isImportSupplier=${true}`;
    return super.getPdf(endpoint);
  }
}
