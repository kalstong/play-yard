import { Entity, Column, ManyToMany, JoinTable } from "typeorm"
import { Base } from "./Base";
import { Client } from "./Client";

@Entity('bankers')
export class Banker extends Base {

    @Column({
        unique: true,
        length: 10
    })
    employeeNumber: string;

    @ManyToMany(
        () => Client,
    )
    @JoinTable({
        name: 'bankers_clients',
        joinColumn: {
            name: 'banker_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'client_id',
            referencedColumnName: 'id'
        }
    })
    clients: Client[];
}