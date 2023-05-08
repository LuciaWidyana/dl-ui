import { inject, bindable, computedFrom } from 'aurelia-framework'

var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');
var GradeLoader = require('../../../../loader/packing-sku-inventory-grade-loader');
var UomLoader = require('../../../../loader/uom-loader');
var TrackLoader = require("../../../../loader/track-loader");
export class StockItem {
    @bindable product;

    activate(context) {

        this.packType = ["WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT", "PRINTING MAKLOON", "PRINTING SUBCON", "DYEING MAKLOON", "DYEING SUBCON", "GINGHAM", "YARN DYED"];
        this.packUnit = ["ROLL", "PIECE", "POTONGAN"];
        this.grade = [
            "A", "B", "C", "BS", "A1", "B1", "C1", "Aval 1"
        ];
        this.context = context;
        this.data = context.data;
        
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.contextOptions.isEdit;
        this.isCreate = this.contextOptions.isCreate;

        console.log(this.contextOptions);
        if (this.data.uom) {

            this.selectedUom = {};
            this.selectedUom.Unit = this.data.uom.unit;

        } else if (this.data.packagingUnit) {
            this.selectedUom = {};
            this.selectedUom.Unit = this.data.packagingUnit;
        }

        this.selectedTrack = this.data.track;
        if (this.data.gradeProduct) {
            this.selectedGrade = {};
            this.selectedGrade.type = this.data.gradeProduct.type;
            this.selectedGrade.code = this.data.gradeProduct.code;
        } else if (this.data.grade) {
            this.selectedGrade = {};
            this.selectedGrade.code = this.data.grade;
            this.selectedGrade.type = this.data.grade;
        }

        if(this.data.trackId){
            this.selectedTrack = {};
            this.selectedTrack.Id = this.data.trackId;
            this.selectedTrack.Type = this.data.trackType;
            this.selectedTrack.Name = this.data.trackName;
            this.selectedTrack.Box = this.data.trackBox;
        }

        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;

            this.selectedProductionOrder.OrderType = {};
            this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
            this.selectedProductionOrder.Construction = this.data.construction;

            this.selectedProductionOrder.Material = {};
            this.selectedProductionOrder.Material.Id = this.data.material.id;
            this.selectedProductionOrder.Material.Name = this.data.material.name;
            this.selectedProductionOrder.Material.Code = this.data.material.code;

            this.selectedProductionOrder.MaterialConstruction = {};
            this.selectedProductionOrder.MaterialConstruction.Id = this.data.materialConstruction.id;
            this.selectedProductionOrder.MaterialConstruction.Name = this.data.materialConstruction.name;

            this.selectedProductionOrder.MaterialWidth = this.data.materialWidth;
            this.selectedProductionOrder.FinishWidth = this.data.finishWidth;

            this.selectedProductionOrder.Buyer = {};
            this.selectedProductionOrder.Buyer.Id = this.data.buyerId;
            this.selectedProductionOrder.Buyer.Name = this.data.buyer;

            this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;

            this.selectedProductionOrder.Details = [];
            this.selectedProductionOrder.Details.push({});
            this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;

            this.selectedProductionOrder.DesignCode = this.data.motif;

            this.selectedProductionOrder.Uom = {};
            this.selectedProductionOrder.Uom.Unit = this.data.uomUnit;

            this.selectedProductionOrder.OrderQuantity = this.data.productionOrder.orderQuantity;

            this.selectedProductionOrder.ProcessType = {};
            this.selectedProductionOrder.ProcessType.Id = this.data.processType.id;
            this.selectedProductionOrder.ProcessType.Name = this.data.processType.name;

            this.selectedProductionOrder.YarnMaterial = {};
            this.selectedProductionOrder.YarnMaterial.Id = this.data.yarnMaterial.id;
            this.selectedProductionOrder.YarnMaterial.Name = this.data.yarnMaterial.name;

            this.selectedProductionOrder.ProcessType.Unit = this.data.unit;

        }
    }




    @bindable balance;
    get totalBalance() {
        if (this.data.packagingQty * this.data.quantity <= 0) {
            this.balance = this.data.balance
        } else {
            this.data.balance = this.data.packagingQty * this.data.quantity;
            this.balance = this.data.balance;
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    sPPFormatter = (spp) => {
        return `${spp.OrderNo}`
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get gradeLoader() {
        return GradeLoader;
    }

    gradeFormatter = (grade) => {
        return `${grade.type}`
    }



    @bindable selectedGrade;
    selectedGradeChanged(newValue) {

        if (this.selectedGrade && this.selectedGrade.type) {
            this.data.grade = newValue.type;

            this.data.gradeProduct = {}
            this.data.gradeProduct.type = newValue.type
            this.data.gradeProduct.code = newValue.code
        }
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (uom) => {

        return uom.Unit
    }

    get trackLoader(){
        return TrackLoader;
    }

    // trackView = (track) => {
    //     console.log(track);
    //     if(track.Type === undefined){

    //         return `${track.type} - ${track.name} - ${track.box}` ; 
    //       }else{
      
    //         return `${track.Type} - ${track.Name} - ${track.Box}`;
    //       }
    // }

    trackView = (track) => {
        console.log(track);
        if(track.Type === undefined){
    
          if(track.box === null){
            return `${track.type} - ${track.name}` ; 
          } else{
            return `${track.type} - ${track.name} - ${track.box}` ; 
          }
          
        }else{
          if(track.Box === null){
            return `${track.Type} - ${track.Name}`;
          }else{
            return `${track.Type} - ${track.Name} - ${track.Box}`;
          }
          
        } 
      }

    @bindable selectedUom;
    selectedUomChanged(newValue) {

        if (this.selectedUom && this.selectedUom.Unit) {
            this.data.uom = {};
            this.data.packagingUnit = newValue.Unit;
            this.data.uom.unit = newValue.Unit;
        }
    }


    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        console.log(this.selectedProductionOrder);
        if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.Id;
            this.data.productionOrder.no = this.selectedProductionOrder.OrderNo;
            this.data.productionOrder.type = this.selectedProductionOrder.OrderType.Name;
            this.data.productionOrder.createdUtc = this.selectedProductionOrder.CreatedUtc;

            if (this.selectedProductionOrder.Construction) {
                this.data.construction = this.selectedProductionOrder.Construction;
            } else {
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.FinishWidth} / ${this.selectedProductionOrder.YarnMaterial.Name}`
            }
            this.data.material = {};
            this.data.material.id = this.selectedProductionOrder.Material.Id;
            this.data.material.name = this.selectedProductionOrder.Material.Name;
            this.data.material.code = this.selectedProductionOrder.Material.Code;

            this.data.materialConstruction = {};
            this.data.materialConstruction.id = this.selectedProductionOrder.MaterialConstruction.Id;
            this.data.materialConstruction.name = this.selectedProductionOrder.MaterialConstruction.Name;
            this.data.materialConstruction.code = this.selectedProductionOrder.MaterialConstruction.Code;

            this.data.materialWidth = this.selectedProductionOrder.MaterialWidth;
            this.data.finishWidth = this.selectedProductionOrder.FinishWidth;

            this.data.buyerId = this.selectedProductionOrder.Buyer.Id;
            this.data.buyer = this.selectedProductionOrder.Buyer.Name;

            this.data.packingInstruction = this.selectedProductionOrder.PackingInstruction;
            this.data.color = this.selectedProductionOrder.Details[0].ColorRequest;
            this.data.motif = this.selectedProductionOrder.DesignCode;
            this.data.uomUnit = this.selectedProductionOrder.Uom.Unit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.OrderQuantity;
            this.data.inputQuantity = this.selectedProductionOrder.OrderQuantity;

            this.data.processType = {};
            this.data.processType.id = this.selectedProductionOrder.ProcessType.Id;
            this.data.processType.name = this.selectedProductionOrder.ProcessType.Name;

            this.data.yarnMaterial = {};
            this.data.yarnMaterial.id = this.selectedProductionOrder.YarnMaterial.Id;
            this.data.yarnMaterial.name = this.selectedProductionOrder.YarnMaterial.Name;

            if (this.selectedProductionOrder.ProcessType.Unit) {

                this.data.unit = this.selectedProductionOrder.ProcessType.Unit;
            }
            else {
                if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                    this.data.unit = "PRINTING"
                } else {
                    this.data.unit = "DYEING"
                }
            }
        }
        else {
            this.data.productionOrder = {};
        }

        if( this.selectedProductionOrder.ProcessType.SPPCode == "SPW"
            || this.selectedProductionOrder.ProcessType.SPPCode == "SPWT")
        {
            //this.packType = ["WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT", "PRINTING MAKLOON", "PRINTING SUBCON", "DYEING MAKLOON", "DYEING SUBCON", "GINGHAM", "YARN DYED"];
            this.packType = [ "WHITE"];
        }

        else if( this.selectedProductionOrder.ProcessType.SPPCode == "SPD" 
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPDT"
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPDM"
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPDS"   )
        {
            //this.packType = ["WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT", "PRINTING MAKLOON", "PRINTING SUBCON", "DYEING MAKLOON", "DYEING SUBCON", "GINGHAM", "YARN DYED"];
            this.packType = [ "DYEING", "DYEING MAKLOON", "DYEING SUBCON", "GINGHAM", "YARN DYED"];
        } 
        
        else if( this.selectedProductionOrder.ProcessType.SPPCode == "SPP"
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPPT"
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPPM"
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPPS"
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPDP"
                || this.selectedProductionOrder.ProcessType.SPPCode == "SPTP")
        {
            //this.packType = ["WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT", "PRINTING MAKLOON", "PRINTING SUBCON", "DYEING MAKLOON", "DYEING SUBCON", "GINGHAM", "YARN DYED"];
            this.packType = [ "BATIK", "TEKSTIL", "DIGITAL PRINT", "TRANSFER PRINT", "PRINTING MAKLOON", "PRINTING SUBCON"];
        } else{
            this.packType = ["WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT", "PRINTING MAKLOON", "PRINTING SUBCON", "DYEING MAKLOON", "DYEING SUBCON", "GINGHAM", "YARN DYED"];
        }
        
    }


    @bindable selectedTrack;
    selectedTrackChanged(newValue) {
        console.log(newValue);
        if (this.selectedTrack ) {
            //this.data.productionOrder = {};
            this.data.trackId = newValue.Id;
            this.data.trackType = newValue.Type;
            this.data.trackName = newValue.Name;
            this.data.trackBox = newValue.Box;

            
        }
        // else {
        //     this.data.productionOrder = {};
        // }
    }
}