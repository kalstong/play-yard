import { Entity, Column, OneToMany, ManyToMany } from "typeorm"
import { Base } from "./Base";
import { Transaction } from "./Transaction";
import { Banker } from "./Banker";

@Entity('clients')
export class Client extends Base {

    @Column({
        type: 'numeric'
    })
    balance: number;

    @Column({
        default: true,
        name: 'active'
    })
    isActive: boolean;

    @Column({
        type: 'simple-json',
        nullable: true
    })
    metadata: {
        age: number,
        hairColor: string,
    }

    @Column({
        type: 'simple-array',
        default: []
    })
    familyMembers: string[];

    @OneToMany(
        () => Transaction,
        transaction => transaction.client
    )
    transactions: Transaction[];

    @ManyToMany(
        () => Banker,
    )
    banekers: Banker[];
}