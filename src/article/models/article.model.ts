import { Field, ObjectType } from "@nestjs/graphql";
import { Node } from "src/pagination/models/node.model";
import {  Column, Entity } from "typeorm";

@Entity()
@ObjectType()
export class Article extends Node {

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