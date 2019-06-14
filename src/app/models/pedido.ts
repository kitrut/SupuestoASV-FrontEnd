import { LineaPedido } from './linea-pedido';

export class Pedido {
    idPedido:number;
    nombreUsuario:String;
    fechaServicio:Date;
    state:Estado;
    lineas:LineaPedido[];
}
class Estado{
    state:String;
}
