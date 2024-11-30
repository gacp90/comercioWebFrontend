import { Product } from "./products.model";

interface _item{
    sku: string,
    quantity: number,
    price: number,
    cost: number,
    description: string,
    product: Product
    taxes?: any,
}

export class Pedido{

    constructor(
        public amount: number,
        public saldo: number,
        public items: _item[],
        public estado?: string,
        public pedido?: string,
        public client?: string,
        public nota?: string,
        public status?: boolean,
        public fecha?: Date,
        public peid?: string,
        public _id?: string,
    ){}

}