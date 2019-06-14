import { LineaPedido } from './linea-pedido';

export class Pedido {
    idPedido:number;
    nombreUsuario:String;
    fechaServicio:Date;
    state:String;
    estado:String;
    lineas:LineaPedido[];
    total:number;
}
