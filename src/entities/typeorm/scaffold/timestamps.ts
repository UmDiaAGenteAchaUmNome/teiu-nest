import { CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class Timestamps {
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        name: 'criado_em'
    })
    criadoEm: Date
    
    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        name: 'atualizado_em'
    })
    atualizadoEm: Date
}