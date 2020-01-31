// Itens do Pedido conforme backend - armazenar pedido no database - Relaciona com PedidoDTO
import { RefDTO } from "./ref.dto";

export interface ItemPedidoDTO {
    quantidade: number;
    produto: RefDTO;
} 