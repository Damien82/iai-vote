declare module "jspdf-autotable" {
  import "jspdf";

  declare module "jspdf" {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
  }

  export default function autoTable(doc: any, options: any): any;
}
