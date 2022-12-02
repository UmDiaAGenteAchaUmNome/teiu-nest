import { CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class Timestamps {
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        name: 'created_at'
    })
    createdAt?: Date

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        name: 'updated_at'
    })
    updatedAt?: Date
}