import { Field,ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Article extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Field(() => String)
    @Column()
    title: String;

    @Field(() => String)
    @Column()
    description: String;

    @Field(() => String)
    @Column()
    image: String;
}