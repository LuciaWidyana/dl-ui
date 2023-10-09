import { computedFrom } from "aurelia-framework";

export class Detail {
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.readOnly = context.context.options.readOnly;
    this.isCutSew = context.context.options.isCutSew;
  }
}
